/* ===================================================
   The Huntington — Main JS
   =================================================== */

(function () {
  'use strict';

  /* ---------- Auto-update copyright year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Navbar mobile menu ---------- */
  var hamburger = document.querySelector('[data-hamburger]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('mobile-menu-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      var spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0] && spans[0].classList.replace('-translate-y-1', 'rotate-45');
        spans[1] && spans[1].classList.replace('translate-y-1', '-rotate-45');
      } else {
        spans[0] && spans[0].classList.replace('rotate-45', '-translate-y-1');
        spans[1] && spans[1].classList.replace('-rotate-45', 'translate-y-1');
      }
    });

    /* Close menu on link click */
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('mobile-menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
        var spans = hamburger.querySelectorAll('span');
        spans[0] && spans[0].classList.replace('rotate-45', '-translate-y-1');
        spans[1] && spans[1].classList.replace('-rotate-45', 'translate-y-1');
      });
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('[data-faq-item]').forEach(function (item) {
    var trigger = item.querySelector('[data-faq-trigger]');
    var answer = item.querySelector('[data-faq-answer]');
    var icon = item.querySelector('[data-faq-icon]');

    if (!trigger) return;

    trigger.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-faq-open') === 'true';

      /* Close all other items */
      document.querySelectorAll('[data-faq-item]').forEach(function (other) {
        if (other !== item) {
          other.setAttribute('data-faq-open', 'false');
          var otherAnswer = other.querySelector('[data-faq-answer]');
          var otherIcon = other.querySelector('[data-faq-icon]');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      /* Toggle current item */
      item.setAttribute('data-faq-open', isOpen ? 'false' : 'true');
      if (answer) answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
      if (icon) icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(45deg)';
    });
  });

  /* ---------- Adaptive footer title ---------- */
  function resizeFooterTitle() {
    var title = document.querySelector('[data-footer-title]');
    if (!title) return;
    var container = title.parentElement;
    if (!container) return;
    var containerWidth = container.offsetWidth;
    if (containerWidth === 0) return;

    /* Binary search for the largest font size that fits */
    var min = 16, max = 300, best = min;
    while (min <= max) {
      var mid = Math.floor((min + max) / 2);
      title.style.fontSize = mid + 'px';
      if (title.scrollWidth <= containerWidth) {
        best = mid;
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }
    title.style.fontSize = best + 'px';
  }

  resizeFooterTitle();
  window.addEventListener('resize', resizeFooterTitle);

})();
