/* ============================================================
   e'vita — script.js  Mobile-First Responsive
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Elements ---------- */
  var header       = document.getElementById('site-header');
  var backToTop    = document.getElementById('back-to-top');
  var hamburger    = document.getElementById('offcanvas-toggle');
  var offcanvasBar = document.getElementById('offcanvas-bar');
  var overlay      = document.getElementById('offcanvas-overlay');
  var closeBtn     = document.getElementById('offcanvas-close');
  var navLinks     = document.querySelectorAll('.offcanvas-nav-link');

  /* ---------- Scroll handler ---------- */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (backToTop)  backToTop.classList.toggle('visible', y > 400);
    if (header)     header.classList.toggle('scrolled', y > 80);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Offcanvas ---------- */
  function openOffcanvas() {
    if (!offcanvasBar) return;
    offcanvasBar.classList.add('open');
    if (overlay)  overlay.classList.add('active');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeOffcanvas() {
    if (!offcanvasBar) return;
    offcanvasBar.classList.remove('open');
    if (overlay)  overlay.classList.remove('active');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openOffcanvas);
  if (closeBtn)  closeBtn.addEventListener('click', closeOffcanvas);
  if (overlay)   overlay.addEventListener('click', closeOffcanvas);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeOffcanvas);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeOffcanvas();
  });

  /* ---------- Smooth scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var headerH = header ? header.offsetHeight : 60;
      var top = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - headerH;
      window.scrollTo({ top: top, behavior: 'smooth' });
      closeOffcanvas();
    });
  });

  /* ---------- Hero Video ---------- */
  var heroVideo       = document.getElementById('hero-video');
  var heroPlaceholder = document.getElementById('hero-placeholder');
  var heroVideoBg     = document.getElementById('hero-video-bg');

  function showHeroVideo() {
    if (!heroVideo || !heroPlaceholder) return;
    heroVideo.classList.add('loaded');
    if (heroVideoBg) {
      heroVideoBg.classList.add('loaded');
      var pBg = heroVideoBg.play();
      if (pBg !== undefined) pBg.catch(function () {});
    }
    heroPlaceholder.classList.add('hidden');
    setTimeout(function () {
      heroPlaceholder.style.display = 'none';
    }, 900);
  }

  if (heroVideo) {
    if (heroVideo.readyState >= 3) {
      showHeroVideo();
    } else {
      heroVideo.addEventListener('canplay', showHeroVideo, { once: true });
    }
    heroVideo.muted = true;
    var p = heroVideo.play();
    if (p !== undefined) p.catch(function () { /* autoplay blocked */ });
  }

  /* ---------- Scroll fade-in (Intersection Observer) ---------- */
  var fadeTargets = document.querySelectorAll(
    '.concept-section, .menu-section, .info-section'
  );

  // js-fade クラスを付与
  fadeTargets.forEach(function (el) {
    el.classList.add('js-fade');
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    fadeTargets.forEach(function (el) { io.observe(el); });
  } else {
    /* Fallback */
    fadeTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Space Section Slider (5s interval) ---------- */
  var slides = document.querySelectorAll('#space-slider .space-slide');
  if (slides.length > 0) {
    var currentSlide = 0;
    setInterval(function () {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 5000);
  }

  /* ---------- モバイルバー: ページ読み込み時に safe area 対応 ---------- */
  /* CSS の env(safe-area-inset-bottom) が適用されていれば追加対応不要 */

})();
