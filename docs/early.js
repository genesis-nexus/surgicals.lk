// surgicals.lk — early security & indexing controls (loaded first in <head>)

// Clickjacking defense: GitHub Pages cannot send X-Frame-Options /
// frame-ancestors headers, so break out of any framing attempt.
(function () {
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  } catch (_) {
    // Cross-origin parent blocked the redirect: hide the page instead.
    document.documentElement.style.display = "none";
  }
})();

// Query-param variants (?product=, ?q=) are in-page deep links, not separate
// pages. Mark them noindex so Google doesn't accumulate duplicate entries.
// Runs only on pages that declare a #robots-meta tag (the homepage).
(function () {
  var meta = document.getElementById("robots-meta");
  if (!meta) return;
  var params = new URLSearchParams(window.location.search);
  if (params.has("product") || params.has("q")) {
    meta.content = "noindex, follow";
  }
})();
