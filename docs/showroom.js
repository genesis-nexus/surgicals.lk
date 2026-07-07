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
