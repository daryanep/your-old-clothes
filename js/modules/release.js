/**
 * Release Module — Your Old Clothes
 * Populates the latest release section from data.
 */

import releaseData from '../data/release.js';
import { SELECTORS } from '../core/config.js';

export function initRelease() {
  const artwork = document.querySelector(SELECTORS.releaseArtwork);
  const title = document.querySelector(SELECTORS.releaseTitle);
  const subtitle = document.querySelector(SELECTORS.releaseSubtitle);
  const description = document.querySelector(SELECTORS.releaseDescription);
  const streaming = document.querySelector(SELECTORS.releaseStreaming);

  if (artwork) {
    const img = artwork.querySelector('img');
    if (img) {
      img.src = releaseData.artwork;
      img.alt = `${releaseData.title} album artwork`;
    }
  }

  if (title) title.textContent = releaseData.title;
  if (subtitle) subtitle.textContent = releaseData.subtitle;
  if (description) description.textContent = releaseData.description;

  if (streaming) {
    const links = releaseData.links;
    const platforms = [
      { name: 'Spotify', url: links.spotify, icon: spotifyIcon() },
      { name: 'Apple Music', url: links.appleMusic, icon: appleMusicIcon() },
      { name: 'YouTube', url: links.youtube, icon: youtubeIcon() },
      { name: 'Bandcamp', url: links.bandcamp, icon: bandcampIcon() },
    ];

    streaming.innerHTML = '';
    platforms.forEach((p) => {
      const a = document.createElement('a');
      a.className = 'streaming-btn';
      a.href = p.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = `${p.icon}<span>Listen on ${p.name}</span>`;
      streaming.appendChild(a);
    });
  }
}

function spotifyIcon() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.55 14.43c-.18.27-.54.35-.81.17-2.22-1.36-5.02-1.66-8.32-.91-.32.07-.63-.13-.7-.45-.07-.32.13-.63.45-.7 3.6-.82 6.72-.47 9.2 1.05.28.18.36.54.18.81zm1.22-2.72c-.22.33-.66.43-.99.21-2.54-1.56-6.42-2.02-9.43-1.1-.38.12-.79-.09-.91-.47-.12-.38.09-.79.47-.91 3.45-1.05 7.72-.54 10.64 1.25.34.21.44.66.22.99zm.1-2.84C15.01 8.88 10.7 8.7 7.85 9.6c-.46.14-.94-.11-1.08-.57-.14-.46.11-.94.57-1.08 3.27-1 8.1-.8 11.3 1.29.41.25.54.79.3 1.2-.25.41-.79.54-1.2.3z"/></svg>`;
}

function appleMusicIcon() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>`;
}

function youtubeIcon() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 00.5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 002.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 002.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>`;
}

function bandcampIcon() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.63 3.9C.3 4.48 0 5.18 0 5.94v12.12c0 .76.3 1.46.63 2.04L11.44 12 .63 3.9zM12.56 12L1.74 20.1c.42.24.91.4 1.45.4h17.62c.54 0 1.03-.16 1.45-.4L12.56 12zM23.37 3.9L12.56 12l10.81 8.1c.33-.58.63-1.28.63-2.04V5.94c0-.76-.3-1.46-.63-2.04z"/></svg>`;
}
