// surgicals.lk — shared motion system
// Calm, healthcare-appropriate scroll reveals. Fully inert when the visitor
// prefers reduced motion or the browser lacks IntersectionObserver.

(function () {
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var supported = "IntersectionObserver" in window;

  // CSS only hides [data-reveal] elements when this class is present, so a
  // failure anywhere in this file can never leave content invisible.
  if (reduced || !supported) {
    window.SurgicalsMotion = { observe: function () {} };
    return;
  }

  document.documentElement.classList.add("has-reveal");

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  function observe(el) {
    if (el && el.hasAttribute && !el.classList.contains("is-revealed")) {
      observer.observe(el);
    }
  }

  function scan(root) {
    (root || document).querySelectorAll("[data-reveal]").forEach(function (el, i) {
      // Stagger siblings that share a parent marked data-reveal-stagger.
      var parent = el.parentElement;
      if (parent && parent.hasAttribute("data-reveal-stagger") && !el.style.getPropertyValue("--reveal-delay")) {
        var index = Array.prototype.indexOf.call(parent.children, el);
        el.style.setProperty("--reveal-delay", Math.min(index, 7) * 70 + "ms");
      }
      observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { scan(); });
  } else {
    scan();
  }

  window.SurgicalsMotion = { observe: observe, scan: scan };
})();
