/**
 * Loader Component — Your Old Clothes
 * Full-screen preloader with progress bar that fades out on load.
 */

import { SELECTORS } from '../core/config.js';

export function initLoader() {
  const preloader = document.querySelector(SELECTORS.preloader);
  const bar = document.querySelector(SELECTORS.preloaderBar);
  if (!preloader) return;

  const fill = bar ? bar.querySelector('.preloader__bar-fill') : null;

  function setProgress(percent) {
    if (fill) {
      fill.style.width = `${percent}%`;
    }
  }

  function hide() {
    setProgress(100);
    if (fill) fill.classList.add('is-complete');
    setTimeout(() => {
      preloader.classList.add('is-hidden');
    }, 400);
  }

  setProgress(30);

  window.addEventListener('load', () => {
    setProgress(70);
    setTimeout(hide, 200);
  });

  // Fallback: hide after 2.5s regardless
  setTimeout(hide, 2500);
}
