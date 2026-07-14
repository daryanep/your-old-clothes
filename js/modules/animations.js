/**
 * Animations Module — Your Old Clothes
 * Handles: scroll-triggered reveal animations, split-text hero heading,
 * and intersection observer setup.
 */

import { SELECTORS, CONFIG } from '../core/config.js';

export function initAnimations() {
  if (CONFIG.reduceMotion) {
    document.querySelectorAll(SELECTORS.reveal).forEach((el) => {
      el.classList.add('is-revealed');
    });
    document.querySelectorAll(SELECTORS.splitText).forEach((el) => {
      el.querySelectorAll('.split-letter').forEach((l) => l.classList.add('is-revealed'));
    });
    return;
  }

  initSplitText();
  initScrollReveal();
}

function initSplitText() {
  const splitElements = document.querySelectorAll(SELECTORS.splitText);

  splitElements.forEach((el) => {
    const text = el.textContent;
    el.textContent = '';
    el.setAttribute('aria-label', text);

    const wrapper = document.createElement('span');
    wrapper.className = 'split-line';
    wrapper.setAttribute('aria-hidden', 'true');

    [...text].forEach((char, index) => {
      const letter = document.createElement('span');
      letter.className = 'split-letter';
      letter.textContent = char === ' ' ? '\u00A0' : char;
      letter.style.setProperty('--letter-delay', `${index * 45}ms`);
      wrapper.appendChild(letter);
    });

    el.appendChild(wrapper);
  });

  const splitObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const letters = entry.target.querySelectorAll('.split-letter');
          letters.forEach((l) => l.classList.add('is-revealed'));
          splitObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(SELECTORS.splitText).forEach((el) => splitObserver.observe(el));
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(SELECTORS.reveal);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    CONFIG.animationObserver
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}
