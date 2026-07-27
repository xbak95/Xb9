// Scroll-reveal animations
const animatedEls = document.querySelectorAll('[data-animate]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.getAttribute('data-delay') || 0;
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add('in-view');
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

animatedEls.forEach((el) => revealObserver.observe(el));

// Subtle parallax on hero illustration
const heroArt = document.querySelector('.hero-art');
if (heroArt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const offset = window.scrollY * 0.12;
        heroArt.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// Sticky header shrink + shadow on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 12 ? '0 8px 24px -18px rgba(36,30,24,0.4)' : 'none';
}, { passive: true });

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}
