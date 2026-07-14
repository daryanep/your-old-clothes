/**
 * Gallery + Lightbox Module — Your Old Clothes
 * Renders the masonry grid from data and powers an accessible
 * lightbox with keyboard navigation and focus trapping.
 */

import galleryData from '../data/gallery.js';
import { SELECTORS } from '../core/config.js';

export function initGallery() {
  const grid = document.querySelector(SELECTORS.galleryGrid);
  if (!grid) return;

  renderGrid(grid);
  initLightbox();
}

function renderGrid(grid) {
  grid.innerHTML = '';
  galleryData.forEach((item) => {
    const button = document.createElement('button');
    button.className = 'gallery__item';
    button.setAttribute('data-gallery-id', item.id);
    button.setAttribute('aria-label', `Open image: ${item.alt}`);
    if (item.span) {
      button.classList.add(`gallery__item--${item.span}`);
    }

    button.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" loading="lazy" />
      <span class="gallery__item-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7"/>
        </svg>
      </span>
      <div class="gallery__item-overlay">
        <span class="gallery__item-caption">${item.caption}</span>
      </div>
    `;

    button.addEventListener('click', () => openLightbox(item.id));
    grid.appendChild(button);
  });
}

// --- Lightbox State ---

let currentIndex = 0;
let lastFocused = null;

function initLightbox() {
  const lightbox = document.querySelector(SELECTORS.lightbox);
  if (!lightbox) return;

  const closeBtn = document.querySelector(SELECTORS.lightboxClose);
  const prevBtn = document.querySelector(SELECTORS.lightboxPrev);
  const nextBtn = document.querySelector(SELECTORS.lightboxNext);

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigate(-1);
        break;
      case 'ArrowRight':
        navigate(1);
        break;
    }
  });
}

function openLightbox(id) {
  const lightbox = document.querySelector(SELECTORS.lightbox);
  if (!lightbox) return;

  currentIndex = galleryData.findIndex((item) => item.id === id);
  if (currentIndex === -1) return;

  lastFocused = document.activeElement;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  renderLightboxContent();
  trapFocus(lightbox);
}

function closeLightbox() {
  const lightbox = document.querySelector(SELECTORS.lightbox);
  if (!lightbox) return;

  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';

  if (lastFocused) {
    lastFocused.focus();
  }
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + galleryData.length) % galleryData.length;
  renderLightboxContent();
}

function renderLightboxContent() {
  const image = document.querySelector(SELECTORS.lightboxImage);
  const caption = document.querySelector(SELECTORS.lightboxCaption);
  const counter = document.querySelector(SELECTORS.lightboxCounter);
  const item = galleryData[currentIndex];

  if (!image || !item) return;

  image.classList.remove('is-loaded');
  image.src = item.src;
  image.alt = item.alt;

  image.onload = () => image.classList.add('is-loaded');

  if (caption) caption.textContent = item.caption;
  if (counter) {
    counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(galleryData.length).padStart(2, '0')}`;
  }
}

function trapFocus(container) {
  const focusable = container.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  setTimeout(() => first.focus(), 100);
}
