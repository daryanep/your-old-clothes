/**
 * Main Entry Point — Your Old Clothes
 * Orchestrates all modules on DOMContentLoaded.
 */

import { initNavigation } from '../modules/navigation.js';
import { initAnimations } from '../modules/animations.js';
import { initEvents } from '../modules/events.js';
import { initGallery } from '../modules/gallery.js';
import { initRelease } from '../modules/release.js';
import { initButtons } from '../components/button.js';
import { initLoader } from '../components/loader.js';
import { initContactForm } from '../modules/contact.js';

function init() {
  initLoader();
  initNavigation();
  initAnimations();
  initEvents();
  initGallery();
  initRelease();
  initButtons();
  initContactForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
