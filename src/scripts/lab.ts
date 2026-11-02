import { createLetterStream, type ColorMode } from './letter-stream';

const field = document.querySelector<HTMLElement>('.lab__stage [data-letters]');
const form = document.querySelector<HTMLFormElement>('[data-lab-form]');
const status = document.querySelector<HTMLElement>('[data-lab-status]');

if (field && form && status) {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const read = () => {
    const values = new FormData(form);
    return {
      density: Number(values.get('density')),
      speed: Number(values.get('speed')),
      trail: Number(values.get('trail')),
      colorMode: values.get('color') as ColorMode,
    };
  };

  const showValues = () => {
    const { density, speed, trail } = read();
    const output = (name: string) => form.elements.namedItem(name) as HTMLOutputElement;
    output('densityOut').value = density.toFixed(1);
    output('speedOut').value = speed.toFixed(1);
    output('trailOut').value = String(trail);
  };

  const init = () => {
    const stream = createLetterStream(field, read());
    if (!stream) {
      status.hidden = false;
      status.textContent = 'This experiment needs canvas, which is not available in this browser.';
      form.querySelectorAll('input, button').forEach((item) => item.setAttribute('disabled', ''));
      return;
    }

    const syncMotion = () => {
      const still = reducedMotion.matches || root.dataset.motion === 'paused';
      status.hidden = !still;
      status.textContent = 'Animations are off, so this shows a still frame.';
      if (still || document.hidden) stream.stop();
      else stream.start();
    };

    const apply = () => {
      showValues();
      stream.update(read());
    };

    form.addEventListener('input', apply);
    // Reset fires before the fields change, so wait a tick.
    form.addEventListener('reset', () => setTimeout(apply));
    document.addEventListener('motionchange', syncMotion);
    document.addEventListener('visibilitychange', syncMotion);
    document.addEventListener('themechange', () => stream.refreshTheme());
    reducedMotion.addEventListener('change', syncMotion);
    syncMotion();
  };

  const family = getComputedStyle(field).fontFamily;
  document.fonts.load(`12px ${family}`, 'a').then(init, init);
}
