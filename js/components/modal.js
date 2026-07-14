/**
 * Modal Component — Your Old Clothes
 * Generic accessible modal base. Used as foundation for the lightbox.
 * Supports: open/close transitions, focus trap, Esc to close, click-out to close.
 */

export class Modal {
  constructor(element, options = {}) {
    this.el = element;
    this.onOpen = options.onOpen || (() => {});
    this.onClose = options.onClose || (() => {});
    this.lastFocused = null;
    this.init();
  }

  init() {
    const closeBtn = this.el.querySelector('[data-modal-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    this.el.addEventListener('click', (e) => {
      if (e.target === this.el) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open() {
    this.lastFocused = document.activeElement;
    this.el.classList.add('is-open');
    this.el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    this.onOpen();
    this.trapFocus();
  }

  close() {
    this.el.classList.remove('is-open');
    this.el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.onClose();
    if (this.lastFocused) {
      this.lastFocused.focus();
    }
  }

  isOpen() {
    return this.el.classList.contains('is-open');
  }

  trapFocus() {
    const focusable = this.el.querySelectorAll(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    this.el.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    setTimeout(() => first.focus(), 100);
  }
}
