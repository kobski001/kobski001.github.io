// Loads the scroll libraries only when they will run. Pausing reverts every effect,
// which leaves the plain page that is already in the HTML.
const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motion: typeof import('./motion') | undefined;

const allowed = () => !reducedMotion.matches && root.dataset.motion !== 'paused';

const sync = async () => {
  if (allowed()) {
    try {
      motion ??= await import('./motion');
      if (allowed()) motion.start();
    } catch {
      // The page is complete without the scroll layer.
    }
  } else {
    motion?.stop();
  }
};

document.addEventListener('motionchange', sync);
reducedMotion.addEventListener('change', sync);

if ('requestIdleCallback' in window) requestIdleCallback(sync, { timeout: 1200 });
else setTimeout(sync, 200);

export {};
