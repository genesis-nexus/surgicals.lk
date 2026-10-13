// surgicals.lk — interaction layer shared by every page.
// Springs (Apple damping-ratio + response model), momentum projection, rubber-banding,
// and draggable sheets: bottom sheet on phones, side panel / popover on larger screens.
// Everything animates from the live on-screen value, so any motion can be grabbed mid-flight.

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var wide = window.matchMedia("(min-width: 768px)");

  // ---------- Physics primitives ----------

  // Critically damped by default. `response` is how quickly the value reaches its target (s),
  // not a duration; settle time emerges from the parameters.
  function spring(opts) {
    var to = opts.to;
    var x = opts.from;
    var v = opts.velocity || 0;
    var damping = opts.damping == null ? 1 : opts.damping;
    var response = opts.response || 0.4;
    var precision = opts.precision || 0.5;
    var k = Math.pow((2 * Math.PI) / response, 2);
    var c = (4 * Math.PI * damping) / response;
    var raf = 0;
    var last = 0;
    var stopped = false;

    function frame(now) {
      if (stopped) return;
      var dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      // Fixed sub-steps keep stiff springs stable at any frame rate.
      while (dt > 0) {
        var h = Math.min(1 / 240, dt);
        v += (-k * (x - to) - c * v) * h;
        x += v * h;
        dt -= h;
      }
      if (Math.abs(x - to) < precision && Math.abs(v) < precision * 10) {
        x = to;
        v = 0;
        stopped = true;
        opts.onUpdate(x);
        if (opts.onComplete) opts.onComplete();
        return;
      }
      opts.onUpdate(x);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return {
      get value() { return x; },
      get velocity() { return v; },
      stop: function () { stopped = true; cancelAnimationFrame(raf); }
    };
  }

  // Reduced-motion stand-in: a short linear tween with the same handle shape as spring().
  function tween(opts) {
    var start = 0;
    var raf = 0;
    var stopped = false;
    var x = opts.from;
    var duration = opts.duration || 200;
    function frame(now) {
      if (stopped) return;
      if (!start) start = now;
      var t = Math.min((now - start) / duration, 1);
      x = opts.from + (opts.to - opts.from) * t;
      opts.onUpdate(x);
      if (t < 1) raf = requestAnimationFrame(frame);
      else { stopped = true; if (opts.onComplete) opts.onComplete(); }
    }
    raf = requestAnimationFrame(frame);
    return {
      get value() { return x; },
      get velocity() { return 0; },
      stop: function () { stopped = true; cancelAnimationFrame(raf); }
    };
  }

  // Where a flick would come to rest, using scroll-style exponential deceleration.
  function project(velocity, decelerationRate) {
    var d = decelerationRate || 0.998;
    return ((velocity / 1000) * d) / (1 - d);
  }

  // Progressive resistance past a boundary.
  function rubberband(overshoot, dimension, constant) {
    var c = constant || 0.55;
    return (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));
  }

  // Velocity from the last ~100ms of pointer samples, not just the final event.
  function VelocityTracker() { this.samples = []; }
  VelocityTracker.prototype.reset = function () { this.samples = []; };
  VelocityTracker.prototype.push = function (value, time) {
    this.samples.push({ v: value, t: time });
    while (this.samples.length > 2 && time - this.samples[0].t > 100) this.samples.shift();
  };
  VelocityTracker.prototype.velocity = function () {
    var s = this.samples;
    if (s.length < 2) return 0;
    var first = s[0];
    var last = s[s.length - 1];
    var dt = (last.t - first.t) / 1000;
    return dt > 0 ? (last.v - first.v) / dt : 0;
  };

  function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }

  // ---------- Sheets ----------

  var scrim = null;
  var lockCount = 0;
  var sheets = {};

  function ensureScrim() {
    if (scrim) return scrim;
    scrim = document.createElement("div");
    scrim.className = "sheet-scrim";
    scrim.hidden = true;
    scrim.addEventListener("click", function () {
      Object.keys(sheets).forEach(function (id) {
        if (sheets[id].isOpen && sheets[id].isModal()) sheets[id].close();
      });
    });
    document.body.appendChild(scrim);
    return scrim;
  }

  function lockScroll() {
    if (lockCount++ === 0) {
      var gap = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.classList.add("is-locked");
      if (gap > 0) document.documentElement.style.setProperty("--scrollbar-gap", gap + "px");
    }
  }
  function unlockScroll() {
    if (lockCount > 0 && --lockCount === 0) {
      document.documentElement.classList.remove("is-locked");
      document.documentElement.style.removeProperty("--scrollbar-gap");
    }
  }

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

  function Sheet(el) {
    this.el = el;
    this.id = el.id;
    this.desktopMode = el.getAttribute("data-sheet-desktop") || "bottom";
    this.dragArea = el.getAttribute("data-sheet-drag") || "header";
    this.p = 0;               // presentation progress: 0 hidden, 1 open (>1 = rubber-banded)
    this.anim = null;
    this.isOpen = false;
    this.opener = null;
    this.drag = null;
    this.tracker = new VelocityTracker();
    this.suppressClick = false;

    el.setAttribute("aria-hidden", "true");
    el.setAttribute("inert", "");
    el.hidden = true;
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");

    var self = this;
    // Moves are followed on window so a fast drag can't outrun the sheet before capture.
    this.handleMove = function (e) { self.onMove(e); };
    this.handleUp = function (e) { self.onUp(e); };
    this.handleCancel = function (e) { self.onUp(e, true); };
    el.addEventListener("pointerdown", function (e) { self.onDown(e); });
    // A drag must never also count as a tap on whatever was under the finger.
    el.addEventListener("click", function (e) {
      if (self.suppressClick) {
        e.preventDefault();
        e.stopPropagation();
        self.suppressClick = false;
      }
    }, true);
    el.addEventListener("keydown", function (e) { self.onKey(e); });
  }

  Sheet.prototype.mode = function () {
    return wide.matches ? this.desktopMode : "bottom";
  };
  Sheet.prototype.isModal = function () { return this.mode() !== "popover"; };
  // Travel distance from open to fully off-screen, including the floating inset and shadow.
  Sheet.prototype.size = function () {
    if (this.mode() === "side") {
      return this.el.offsetWidth + (parseFloat(getComputedStyle(this.el).right) || 0) + 32;
    }
    return this.el.offsetHeight;
  };

  Sheet.prototype.render = function (p) {
    this.p = p;
    var el = this.el;
    var mode = this.mode();
    var shown = clamp(p, 0, 1);
    if (reducedMotion.matches) {
      // Cross-fade only: no slides, no overshoot.
      el.style.transform = "none";
      el.style.opacity = String(shown);
    } else if (mode === "bottom") {
      el.style.transform = "translate3d(0," + ((1 - p) * this.size()).toFixed(2) + "px,0)";
      el.style.opacity = "";
    } else if (mode === "side") {
      el.style.transform = "translate3d(" + ((1 - p) * this.size()).toFixed(2) + "px,0,0)";
      el.style.opacity = "";
    } else {
      // Popover grows out of its trigger (transform-origin set in CSS).
      el.style.transform = "translate3d(0," + ((1 - p) * 10).toFixed(2) + "px,0) scale(" + (0.9 + 0.1 * p).toFixed(4) + ")";
      el.style.opacity = String(shown);
    }
    if (this.isModal() && scrim) scrim.style.opacity = String(shown);
  };

  Sheet.prototype.animateTo = function (target, opts) {
    var self = this;
    opts = opts || {};
    if (this.anim) this.anim.stop();
    var config = {
      from: this.p,
      to: target,
      velocity: opts.velocity || 0,
      damping: opts.damping == null ? 1 : opts.damping,
      response: opts.response || 0.36,
      precision: 0.0005,
      onUpdate: function (x) { self.render(x); },
      onComplete: function () { self.anim = null; if (opts.onComplete) opts.onComplete(); }
    };
    this.anim = reducedMotion.matches ? tween(config) : spring(config);
  };

  Sheet.prototype.setOpeners = function (expanded) {
    document.querySelectorAll('[data-sheet-open="' + this.id + '"]').forEach(function (btn) {
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  };

  Sheet.prototype.open = function (opener) {
    var self = this;
    Object.keys(sheets).forEach(function (id) {
      if (id !== self.id && sheets[id].isOpen) sheets[id].close({ restoreFocus: false });
    });
    if (this.isOpen) return;
    this.isOpen = true;
    this.opener = opener || document.activeElement;
    var el = this.el;
    el.hidden = false;
    el.removeAttribute("inert");
    el.setAttribute("aria-hidden", "false");
    el.setAttribute("data-mode", this.mode());
    el.classList.add("is-open");
    // Body-wide drags only when nothing inside needs to scroll.
    var body = el.querySelector(".sheet__body");
    el.classList.toggle("sheet--drag-all", this.dragArea === "all" && (!body || body.scrollHeight <= body.clientHeight + 1));
    if (this.isModal()) {
      ensureScrim();
      scrim.hidden = false;
      lockScroll();
      this.locked = true;
    }
    if (!this.anim) this.render(this.p); // place it off-screen before the first frame
    this.setOpeners(true);
    this.animateTo(1, { damping: 1, response: 0.38 });
    requestAnimationFrame(function () {
      var target = el.querySelector("[data-autofocus]") || el;
      target.focus({ preventScroll: true });
    });
    document.dispatchEvent(new CustomEvent("sheet:open", { detail: { id: this.id } }));
  };

  Sheet.prototype.close = function (opts) {
    if (!this.isOpen) return;
    opts = opts || {};
    var self = this;
    this.isOpen = false;
    this.el.classList.remove("is-open");
    this.setOpeners(false);
    if (this.locked) { unlockScroll(); this.locked = false; }
    this.animateTo(0, {
      velocity: opts.velocity,
      damping: 1,
      response: opts.response || 0.32,
      onComplete: function () { self.finishClose(); }
    });
    if (opts.restoreFocus !== false && this.opener && this.opener.focus) {
      this.opener.focus({ preventScroll: true });
    }
    document.dispatchEvent(new CustomEvent("sheet:close", { detail: { id: this.id } }));
  };

  Sheet.prototype.finishClose = function () {
    if (this.isOpen) return;
    this.el.hidden = true;
    this.el.setAttribute("inert", "");
    this.el.setAttribute("aria-hidden", "true");
    var anyModal = Object.keys(sheets).some(function (id) { return sheets[id].isOpen && sheets[id].isModal(); });
    if (scrim && !anyModal) scrim.hidden = true;
  };

  Sheet.prototype.toggle = function (opener) {
    if (this.isOpen) this.close(); else this.open(opener);
  };

  // --- Drag to dismiss (bottom sheets) ---

  Sheet.prototype.onDown = function (e) {
    if (this.mode() !== "bottom" || !this.isOpen) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (e.target.closest("input, textarea, select, .qty-stepper")) return;
    var inHandle = e.target.closest(".sheet__grabber, .sheet__header");
    if (!inHandle && !this.el.classList.contains("sheet--drag-all")) return;
    var grabbedMidFlight = !!this.anim;
    if (this.anim) { this.anim.stop(); this.anim = null; } // grab it where it is
    this.drag = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startOffset: (1 - this.p) * this.size(),
      active: grabbedMidFlight
    };
    this.tracker.reset();
    this.tracker.push(e.clientY, e.timeStamp);
    window.addEventListener("pointermove", this.handleMove);
    window.addEventListener("pointerup", this.handleUp);
    window.addEventListener("pointercancel", this.handleCancel);
    if (grabbedMidFlight) this.beginDrag(e);
  };

  Sheet.prototype.endTracking = function () {
    window.removeEventListener("pointermove", this.handleMove);
    window.removeEventListener("pointerup", this.handleUp);
    window.removeEventListener("pointercancel", this.handleCancel);
  };

  Sheet.prototype.beginDrag = function (e) {
    this.drag.active = true;
    this.el.classList.add("is-dragging");
    try { this.el.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
  };

  Sheet.prototype.onMove = function (e) {
    var d = this.drag;
    if (!d || e.pointerId !== d.id) return;
    var dy = e.clientY - d.startY;
    var dx = e.clientX - d.startX;
    if (!d.active) {
      // ~10px of hysteresis before committing to a vertical drag.
      if (Math.abs(dy) < 10 || Math.abs(dy) < Math.abs(dx)) return;
      this.beginDrag(e);
      d.startY = e.clientY; // start tracking from here so there's no jump
      dy = 0;
    }
    var h = this.size();
    var offset = d.startOffset + dy;
    if (offset < 0) offset = -rubberband(-offset, h);
    this.render(1 - offset / h);
    this.tracker.push(e.clientY, e.timeStamp);
  };

  Sheet.prototype.onUp = function (e, cancelled) {
    var d = this.drag;
    if (!d || e.pointerId !== d.id) return;
    this.drag = null;
    this.endTracking();
    if (!d.active) return;
    this.el.classList.remove("is-dragging");
    this.suppressClick = !cancelled;
    var self = this;
    setTimeout(function () { self.suppressClick = false; }, 0);

    var h = this.size();
    var velocity = cancelled ? 0 : this.tracker.velocity(); // px/s, + is downward
    var offset = (1 - this.p) * h;
    var projected = offset + project(velocity);
    var progressVelocity = -velocity / h;
    if (projected > h * 0.5) {
      this.close({ velocity: progressVelocity, response: 0.3 });
    } else {
      // Snap home with a touch of bounce — the gesture carried momentum.
      this.animateTo(1, { velocity: progressVelocity, damping: 0.8, response: 0.3 });
    }
  };

  Sheet.prototype.onKey = function (e) {
    if (e.key === "Escape") {
      e.stopPropagation();
      this.close();
      return;
    }
    if (e.key !== "Tab" || !this.isModal()) return;
    var items = Array.prototype.filter.call(this.el.querySelectorAll(FOCUSABLE), function (n) {
      return n.offsetParent !== null;
    });
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === this.el)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  function getSheet(id) { return sheets[id] || null; }

  function initSheets() {
    document.querySelectorAll("[data-sheet]").forEach(function (el) {
      if (el.id && !sheets[el.id]) sheets[el.id] = new Sheet(el);
    });

    document.addEventListener("click", function (e) {
      var opener = e.target.closest("[data-sheet-open]");
      if (opener) {
        var s = getSheet(opener.getAttribute("data-sheet-open"));
        if (s) { e.preventDefault(); s.toggle(opener); }
        return;
      }
      var closer = e.target.closest("[data-sheet-close]");
      if (closer) {
        var host = closer.closest("[data-sheet]");
        if (host && sheets[host.id]) sheets[host.id].close();
        return;
      }
      // In-page links inside a sheet close it, then let the browser scroll.
      var link = e.target.closest("[data-sheet] a[href]");
      if (link) {
        var owner = link.closest("[data-sheet]");
        if (owner && sheets[owner.id]) sheets[owner.id].close({ restoreFocus: false });
      }
    });

    // Popovers are non-blocking: a tap anywhere else dismisses them.
    document.addEventListener("pointerdown", function (e) {
      Object.keys(sheets).forEach(function (id) {
        var s = sheets[id];
        if (!s.isOpen || s.isModal()) return;
        if (s.el.contains(e.target) || e.target.closest('[data-sheet-open="' + id + '"]')) return;
        s.close({ restoreFocus: false });
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      Object.keys(sheets).forEach(function (id) { if (sheets[id].isOpen) sheets[id].close(); });
    });

    // Presentation changes with the viewport (bottom sheet <-> side panel / popover).
    var onModeChange = function () {
      Object.keys(sheets).forEach(function (id) {
        var s = sheets[id];
        if (!s.el.hidden) {
          s.el.setAttribute("data-mode", s.mode());
          s.render(s.p);
        }
      });
    };
    if (wide.addEventListener) wide.addEventListener("change", onModeChange);
  }

  // ---------- Header material ----------

  function initHeader() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var ticking = false;
    var update = function () {
      ticking = false;
      header.classList.toggle("is-scrolled", header.getBoundingClientRect().top <= 0 && window.scrollY > 0);
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // ---------- WhatsApp button: tuck on scroll down, return on scroll up ----------

  function initFab() {
    var fab = document.querySelector(".whatsapp-fab");
    if (!fab) return;
    var lastY = window.scrollY;
    var travel = 0;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      var dy = y - lastY;
      lastY = y;
      // Accumulate distance in one direction so small jitters don't toggle it.
      travel = (dy > 0) === (travel > 0) ? travel + dy : dy;
      if (fab.getAttribute("aria-expanded") === "true") return;
      if (travel > 48 && y > 240) fab.classList.add("is-tucked");
      else if (travel < -24 || y < 240) fab.classList.remove("is-tucked");
    }, { passive: true });
    fab.addEventListener("focus", function () { fab.classList.remove("is-tucked"); });
  }

  function init() {
    initSheets();
    initHeader();
    initFab();
  }

  window.SurgicalsUI = {
    spring: spring,
    tween: tween,
    project: project,
    rubberband: rubberband,
    VelocityTracker: VelocityTracker,
    reducedMotion: reducedMotion,
    sheet: getSheet
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
