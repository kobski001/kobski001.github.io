const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const themeButton = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const motionButton = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');

const save = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked. The choice then lasts for this page only.
  }
};

const setLabel = (button: HTMLButtonElement, text: string, label: string) => {
  button.textContent = text;
  button.setAttribute('aria-label', label);
  button.title = label;
};

const renderTheme = () => {
  if (!themeButton) return;
  const dark = root.dataset.theme !== 'light';
  setLabel(themeButton, dark ? 'Light' : 'Dark', `Switch to ${dark ? 'light' : 'dark'} theme`);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', getComputedStyle(root).getPropertyValue('--bg').trim());
};

const renderMotion = () => {
  if (!motionButton) return;
  motionButton.disabled = reducedMotion.matches;
  if (reducedMotion.matches) {
    setLabel(motionButton, 'Paused', 'Paused: animations are off in your system settings');
  } else {
    const paused = root.dataset.motion === 'paused';
    setLabel(motionButton, paused ? 'Resume' : 'Pause', paused ? 'Resume animations' : 'Pause animations');
  }
};

themeButton?.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  save('theme', next);
  renderTheme();
  document.dispatchEvent(new Event('themechange'));
});

motionButton?.addEventListener('click', () => {
  const paused = root.dataset.motion !== 'paused';
  if (paused) root.dataset.motion = 'paused';
  else delete root.dataset.motion;
  save('motion', paused ? 'paused' : 'running');
  renderMotion();
  document.dispatchEvent(new Event('motionchange'));
});

reducedMotion.addEventListener('change', () => {
  renderMotion();
  document.dispatchEvent(new Event('motionchange'));
});

renderTheme();
renderMotion();

export {};
