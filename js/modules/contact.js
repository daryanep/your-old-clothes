/**
 * Contact Form Module — Your Old Clothes
 * Uses Web3Forms API to send form submissions to your email inbox.
 * Get your free access key at https://web3forms.com
 */

import { SELECTORS, CONFIG } from '../core/config.js';

export function initContactForm() {
  const form = document.querySelector(SELECTORS.contactForm);
  if (!form) return;

  const status = document.querySelector(SELECTORS.formStatus);
  const submitBtn = form.querySelector('[type="submit"]');
  const btnLabel = submitBtn ? submitBtn.textContent : '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      showStatus(status, 'Please fill in all fields before sending.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus(status, 'Please enter a valid email address.', 'error');
      return;
    }

    if (CONFIG.web3formsAccessKey === 'YOUR_ACCESS_KEY_HERE') {
      showStatus(status, 'Form not configured yet — see instructions below.', 'error');
      return;
    }

    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
    }

    try {
      const payload = {
        access_key: CONFIG.web3formsAccessKey,
        name,
        email,
        subject: `New message from ${name} — Your Old Clothes`,
        from_name: 'Your Old Clothes — Website',
        subject_line: `New message from ${name}`,
      };

      const subjectField = formData.get('subject');
      if (subjectField) {
        payload.message = `Subject: ${subjectField}\n\n${message}`;
      } else {
        payload.message = message;
      }

      const response = await fetch(CONFIG.web3formsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        showStatus(status, `Thanks ${name}! Your message has been sent.`, 'success');
        form.reset();
      } else {
        showStatus(status, 'Something went wrong. Please try again or email us directly.', 'error');
      }
    } catch (err) {
      showStatus(status, 'Network error. Please check your connection and try again.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.textContent = btnLabel;
        submitBtn.disabled = false;
      }
    }
  });
}

function showStatus(el, message, type) {
  if (!el) return;
  el.textContent = message;
  el.className = `form-status form-status--${type} is-visible`;

  if (type === 'success') {
    setTimeout(() => {
      el.classList.remove('is-visible');
    }, 6000);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
