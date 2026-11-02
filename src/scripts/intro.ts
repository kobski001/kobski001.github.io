const root = document.documentElement;
const intro = document.querySelector<HTMLElement>('[data-intro-screen]');

if (intro && root.dataset.intro === 'on') {
  // Matches the bar's CSS animation.
  const DURATION = 1200;
  const skip = intro.querySelector<HTMLButtonElement>('[data-intro-skip]');
  let finished = false;

  const finish = (state: 'out' | 'skip') => {
    if (finished) return;
    finished = true;
    root.dataset.intro = state;
    removeEventListener('keydown', onKey);
    try {
      sessionStorage.setItem('intro-seen', '1');
    } catch {
      // Storage can be blocked. The intro then plays again next time.
    }
    setTimeout(() => intro.remove(), 600);
  };

  const onKey = () => finish('skip');

  skip?.addEventListener('click', () => finish('skip'));
  addEventListener('keydown', onKey);
  setTimeout(() => finish('out'), DURATION);
}

export {};
