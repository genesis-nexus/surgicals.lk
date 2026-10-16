// Wheelchair showroom: product stage with exhibit switching and auto-advance.
(function () {
  var root = document.getElementById('wc-showroom');
  if (!root) return;

  var exhibits = Array.prototype.slice.call(root.querySelectorAll('.showroom__exhibit'));
  var infos = Array.prototype.slice.call(root.querySelectorAll('.showroom__info'));
  var thumbs = Array.prototype.slice.call(root.querySelectorAll('.showroom__thumb'));
  var ghost = document.getElementById('showroom-ghost');
  var counter = document.getElementById('showroom-counter');
  var prevBtn = document.getElementById('showroom-prev');
  var nextBtn = document.getElementById('showroom-next');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var active = 0;
  var timer = null;
  var inView = true;
  var AUTO_MS = 9000;

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function goTo(i, dir) {
    var n = exhibits.length;
    var idx = ((i % n) + n) % n;
    exhibits.forEach(function (ex, j) {
      var on = j === idx;
      ex.classList.toggle('is-active', on);
      ex.classList.toggle('is-leaving-back', !on && dir < 0);
      ex.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    infos.forEach(function (el, j) { el.classList.toggle('is-active', j === idx); });
    thumbs.forEach(function (t, j) {
      t.classList.toggle('is-active', j === idx);
      t.setAttribute('aria-selected', j === idx ? 'true' : 'false');
    });
    if (ghost) ghost.textContent = pad(idx + 1);
    if (counter) counter.innerHTML = '<strong>' + pad(idx + 1) + '</strong> / ' + pad(n);
    active = idx;
  }

  function startAuto() {
    stopAuto();
    if (reduced) return;
    timer = setInterval(function () { goTo(active + 1, 1); }, AUTO_MS);
  }
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  prevBtn && prevBtn.addEventListener('click', function () { goTo(active - 1, -1); startAuto(); });
  nextBtn && nextBtn.addEventListener('click', function () { goTo(active + 1, 1); startAuto(); });
  thumbs.forEach(function (t, i) {
    t.addEventListener('click', function () { goTo(i, i >= active ? 1 : -1); startAuto(); });
  });

  root.addEventListener('mouseenter', stopAuto);
  root.addEventListener('mouseleave', startAuto);
  root.addEventListener('focusin', stopAuto);
  root.addEventListener('focusout', startAuto);
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { goTo(active - 1, -1); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(active + 1, 1); startAuto(); }
  });

  // Swipe the stage: the chair follows the finger 1:1, a flick (projected momentum) changes
  // exhibit, anything shorter springs home carrying the release velocity.
  var stage = root.querySelector('.showroom__stage');
  var UI = window.SurgicalsUI;
  if (stage && UI) {
    var drag = null;
    var tracker = new UI.VelocityTracker();
    var setX = function (el, x) { el.style.transform = Math.abs(x) < 0.5 ? '' : 'translate3d(' + x.toFixed(1) + 'px,0,0)'; };
    var settle = function (el, from, velocity, damping) {
      if (reduced) { setX(el, 0); return; }
      UI.spring({ from: from, to: 0, velocity: velocity, damping: damping, response: 0.35, precision: 0.5, onUpdate: function (x) { setX(el, x); } });
    };
    var endDrag = function (e, cancelled) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag;
      drag = null;
      if (!d.active) return;
      var velocity = cancelled ? 0 : tracker.velocity();
      var projected = d.x + UI.project(velocity);
      if (Math.abs(projected) > stage.clientWidth * 0.25) {
        var dir = projected < 0 ? 1 : -1;
        goTo(active + dir, dir);
        settle(d.el, d.x, velocity, 1);
      } else {
        settle(d.el, d.x, velocity, 0.8);
      }
      startAuto();
    };
    stage.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, x: 0, active: false, el: exhibits[active].querySelector('.showroom__media-box') };
      tracker.reset();
      tracker.push(e.clientX, e.timeStamp);
    });
    stage.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id || !drag.el) return;
      var dx = e.clientX - drag.x0;
      if (!drag.active) {
        if (Math.abs(dx) < 10 && Math.abs(e.clientY - drag.y0) < 10) return;
        if (Math.abs(dx) <= Math.abs(e.clientY - drag.y0)) { drag = null; return; }
        drag.active = true;
        drag.x0 = e.clientX;
        dx = 0;
        stopAuto();
        try { stage.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
      }
      drag.x = dx;
      setX(drag.el, dx);
      tracker.push(e.clientX, e.timeStamp);
    });
    stage.addEventListener('pointerup', function (e) { endDrag(e, false); });
    stage.addEventListener('pointercancel', function (e) { endDrag(e, true); });
    stage.addEventListener('dragstart', function (e) { e.preventDefault(); });
  }

  // Only auto-advance while the showroom is on screen.
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        inView = entry.isIntersecting;
        if (inView) {
          goTo(active, 1);
          startAuto();
        } else {
          stopAuto();
        }
      });
    }, { rootMargin: '80px' });
    observer.observe(root);
  } else {
    goTo(0, 1);
    startAuto();
  }
})();
