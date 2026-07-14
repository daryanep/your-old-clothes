/**
 * Global Config — Your Old Clothes
 * Central registry of selectors, breakpoints, and feature flags.
 */

export const SELECTORS = {
  header: '[data-header]',
  navLink: '[data-nav-link]',
  navToggle: '[data-nav-toggle]',
  mobileNav: '[data-mobile-nav]',
  mobileNavLink: '[data-mobile-nav-link]',
  mobileNavClose: '[data-mobile-nav-close]',
  backToTop: '[data-back-to-top]',
  reveal: '[data-reveal]',
  splitText: '[data-split-text]',
  eventsList: '[data-events-list]',
  eventsPastList: '[data-events-past-list]',
  eventsTab: '[data-events-tab]',
  eventsPanel: '[data-events-panel]',
  eventsPreview: '[data-events-preview]',
  eventsPreviewCount: '[data-events-preview-count]',
  galleryGrid: '[data-gallery-grid]',
  lightbox: '[data-lightbox]',
  lightboxImage: '[data-lightbox-image]',
  lightboxCaption: '[data-lightbox-caption]',
  lightboxCounter: '[data-lightbox-counter]',
  lightboxClose: '[data-lightbox-close]',
  lightboxPrev: '[data-lightbox-prev]',
  lightboxNext: '[data-lightbox-next]',
  releaseArtwork: '[data-release-artwork]',
  releaseTitle: '[data-release-title]',
  releaseSubtitle: '[data-release-subtitle]',
  releaseDescription: '[data-release-description]',
  releaseStreaming: '[data-release-streaming]',
  contactForm: '[data-contact-form]',
  formStatus: '[data-form-status]',
  preloader: '[data-preloader]',
  preloaderBar: '[data-preloader-bar]',
  section: '[data-section]',
};

export const BREAKPOINTS = {
  mobile: 520,
  tablet: 880,
  desktop: 980,
  wide: 1280,
};

export const CONFIG = {
  scrollThreshold: 60,
  scrollSpyOffset: 120,
  eventsPreviewLimit: 3,
  animationObserver: {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
  },
  reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  web3formsAccessKey: 'YOUR_ACCESS_KEY_HERE',
  web3formsEndpoint: 'https://api.web3forms.com/submit',
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Music', href: '#music' },
  { label: 'Shows', href: '#shows' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Merch', href: '#merch' },
  { label: 'Contact', href: '#contact' },
];
