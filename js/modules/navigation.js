/**
 * Navigation Module — Your Old Clothes
 * Handles: sticky header scroll state, mobile menu toggle, scroll spy,
 * and back-to-top button.
 */

import { SELECTORS, CONFIG } from '../core/config.js';

export function initNavigation() {
  const header = document.querySelector(SELECTORS.header);
  const navToggle = document.querySelector(SELECTORS.navToggle);
  const mobileNav = document.querySelector(SELECTORS.mobileNav);
  const mobileNavClose = document.querySelector(SELECTORS.mobileNavClose);
  const mobileNavLinks = document.querySelectorAll(SELECTORS.mobileNavLink);
  const navLinks = document.querySelectorAll(SELECTORS.navLink);
  const backToTop = document.querySelector(SELECTORS.backToTop);
  const sections = document.querySelectorAll(SELECTORS.section);

  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      if (header) {
        header.classList.toggle('is-scrolled', scrollY > CONFIG.scrollThreshold);
      }

      if (backToTop) {
        backToTop.classList.toggle('is-visible', scrollY > 600);
      }

      updateActiveNav(scrollY);
      ticking = false;
    });
  }

  function updateActiveNav(scrollY) {
    let currentId = '';
    sections.forEach((section) => {
      const top = section.offsetTop - CONFIG.scrollSpyOffset;
      if (scrollY >= top) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('is-active', href === `#${currentId}`);
    });
  }

  function openMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.add('is-open');
    navToggle.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const firstLink = mobileNav.querySelector(SELECTORS.mobileNavLink);
    if (firstLink) firstLink.focus();
  }

  function closeMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    document.body.style.overflow = '';
    if (navToggle) navToggle.focus();
  }

  function smoothScrollTo(href) {
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // --- Event Bindings ---

  window.addEventListener('scroll', onScroll, { passive: true });

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (mobileNav.classList.contains('is-open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      closeMobileNav();
      setTimeout(() => smoothScrollTo(href), 300);
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
    }
  });

  onScroll();
}
