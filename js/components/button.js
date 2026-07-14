/**
 * Button Component — Your Old Clothes
 * Adds ripple effect and loading state to buttons with [data-ripple].
 */

export function initButtons() {
  const buttons = document.querySelectorAll('[data-ripple]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', createRipple);
  });
}

function createRipple(e) {
  const button = e.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const rect = button.getBoundingClientRect();

  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
  circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
  circle.style.cssText += `
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transform: scale(0);
    animation: rippleExpand 600ms ease-out forwards;
    pointer-events: none;
  `;

  const existing = button.querySelector('.ripple-effect');
  if (existing) existing.remove();

  circle.classList.add('ripple-effect');
  button.appendChild(circle);

  setTimeout(() => circle.remove(), 600);
}

if (!document.getElementById('ripple-style')) {
  const style = document.createElement('style');
  style.id = 'ripple-style';
  style.textContent = `
    @keyframes rippleExpand {
      to { transform: scale(2.5); opacity: 0; }
    }
    [data-ripple] { position: relative; overflow: hidden; }
  `;
  document.head.appendChild(style);
}
