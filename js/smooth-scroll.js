/*
  Smooth scroll init (Lenis 1.3.26, vendored locally in vendor/lenis/).
  - Skips entirely if the user prefers reduced motion: native scroll stays untouched.
  - Skips entirely if the Lenis script failed to load: native scroll stays untouched.
  - Touch devices keep native scroll (syncTouch left at its default: false).
  - Exposes the instance on window.__lenis so other inline scripts (anchor
    handling in index.html) can opt into lenis.scrollTo when it's available,
    and fall back to native scrollIntoView otherwise.
*/
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  if (typeof window.Lenis === 'undefined') {
    return;
  }

  var lenis;
  try {
    lenis = new window.Lenis({
      duration: 1.1,
      anchors: false,
      autoRaf: true
    });
  } catch (e) {
    return;
  }

  window.__lenis = lenis;

  ['siteMobilePanel', 'racontiSubmenu', 'racontiSubmenuMobile', 'amalga-card'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.setAttribute('data-lenis-prevent', '');
  });
  document.querySelectorAll('.modal-box').forEach(function (el) {
    el.setAttribute('data-lenis-prevent', '');
  });
})();
