/**
 * Events Engine Module — Your Old Clothes
 * Reads event data, compares dates to current date, splits into
 * upcoming/past, renders ticket-stub cards, and handles tab switching.
 */

import eventsData from '../data/events.js';
import { SELECTORS, CONFIG } from '../core/config.js';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function getCurrentDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseEventDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function sortEvents() {
  const today = getCurrentDate();

  const upcoming = eventsData
    .filter((e) => parseEventDate(e.date) >= today)
    .sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date));

  const past = eventsData
    .filter((e) => parseEventDate(e.date) < today)
    .sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date));

  return { upcoming, past };
}

function formatDateParts(dateStr) {
  const date = parseEventDate(dateStr);
  return {
    day: String(date.getDate()).padStart(2, '0'),
    month: MONTHS[date.getMonth()],
    year: date.getFullYear(),
  };
}

function statusClass(status) {
  const s = status.toLowerCase().replace(/\s+/g, '-');
  if (s.includes('sold')) return 'event-card__status--sold-out';
  if (s.includes('past')) return 'event-card__status--past';
  return 'event-card__status--on-sale';
}

function createEventCard(event, isPast = false) {
  const { day, month } = formatDateParts(event.date);
  const status = isPast ? 'Past' : event.status;
  const ticketHtml = event.ticketLink && !isPast
    ? `<a href="${event.ticketLink}" target="_blank" rel="noopener" class="btn btn--sm btn--primary">Get Tickets</a>`
    : `<span class="t-small t-color-muted">${isPast ? 'Thanks for coming!' : 'Sold out'}</span>`;

  const card = document.createElement('article');
  card.className = 'event-card anim-fade-up';
  card.innerHTML = `
    <div class="event-card__top">
      <div class="event-card__date">
        <span class="event-card__date-day">${day}</span>
        <span class="event-card__date-month">${month}</span>
      </div>
      <span class="event-card__status ${statusClass(status)}">${status}</span>
    </div>
    <div class="event-card__body">
      <h3 class="event-card__title">${event.title}</h3>
      <p class="event-card__venue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
        ${event.venue}
      </p>
      <p class="event-card__time">${event.time} WIB</p>
    </div>
    <div class="event-card__footer">
      <span class="event-card__city">${event.city}</span>
      ${ticketHtml}
    </div>
  `;
  return card;
}

function renderPreview() {
  const preview = document.querySelector(SELECTORS.eventsPreview);
  if (!preview) return;

  const { upcoming } = sortEvents();
  const previewItems = upcoming.slice(0, CONFIG.eventsPreviewLimit);

  if (previewItems.length === 0) {
    preview.innerHTML = '<p class="events__empty"><em>No upcoming shows right now — check back soon.</em></p>';
    return;
  }

  preview.innerHTML = '';
  previewItems.forEach((event, i) => {
    const card = createEventCard(event);
    card.style.setProperty('--reveal-delay', `${i * 100}ms`);
    preview.appendChild(card);
  });

  const countEl = document.querySelector(SELECTORS.eventsPreviewCount);
  if (countEl) {
    countEl.textContent = `${upcoming.length} show${upcoming.length !== 1 ? 's' : ''} total`;
  }
}

function renderEventsList() {
  const upcomingList = document.querySelector(SELECTORS.eventsList);
  const pastList = document.querySelector(SELECTORS.eventsPastList);

  if (!upcomingList) return;

  const { upcoming, past } = sortEvents();

  // Upcoming
  if (upcoming.length === 0) {
    upcomingList.innerHTML = '<div class="events__empty"><p>No upcoming shows scheduled. Check back soon!</p></div>';
  } else {
    upcomingList.innerHTML = '';
    upcoming.forEach((event, i) => {
      const card = createEventCard(event);
      card.style.setProperty('--reveal-delay', `${i * 80}ms`);
      upcomingList.appendChild(card);
    });
  }

  // Past
  if (pastList) {
    if (past.length === 0) {
      pastList.innerHTML = '<div class="events__empty"><p>No past shows yet.</p></div>';
    } else {
      pastList.innerHTML = '';
      past.forEach((event, i) => {
        const card = createEventCard(event, true);
        card.style.setProperty('--reveal-delay', `${i * 60}ms`);
        pastList.appendChild(card);
      });
    }
  }

  updateTabCounts(upcoming.length, past.length);
}

function updateTabCounts(upcomingCount, pastCount) {
  const tabs = document.querySelectorAll(SELECTORS.eventsTab);
  tabs.forEach((tab) => {
    const count = tab.dataset.eventsTab === 'upcoming' ? upcomingCount : pastCount;
    const countEl = tab.querySelector('.events__tab-count');
    if (countEl) countEl.textContent = count;
  });
}

function initTabs() {
  const tabs = document.querySelectorAll(SELECTORS.eventsTab);
  const panels = document.querySelectorAll(SELECTORS.eventsPanel);

  if (tabs.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.eventsTab;

      tabs.forEach((t) => t.classList.remove('is-active'));
      panels.forEach((p) => {
        p.classList.remove('is-active');
        p.hidden = true;
      });

      tab.classList.add('is-active');
      const panel = document.querySelector(`[data-events-panel="${target}"]`);
      if (panel) {
        panel.hidden = false;
        panel.classList.add('is-active');
      }
    });
  });
}

export function initEvents() {
  renderPreview();
  renderEventsList();
  initTabs();
}
