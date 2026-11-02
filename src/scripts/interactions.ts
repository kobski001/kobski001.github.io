// Pointer effects for mouse users. Every layer here uses pointer-events: none. The native
// cursor is only hidden while has-cursor is set, so it returns if motion goes off.
const root = document.documentElement;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const INTERACTIVE = 'a, button, input, label, summary, select';
const MAGNET_PULL = 0.25;

const enabled = () =>
  finePointer.matches && !reducedMotion.matches && root.dataset.motion !== 'paused';

if (finePointer.matches) {
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor cursor--dot';
  ring.className = 'cursor cursor--ring';
  document.body.append(dot, ring);

  const target = { x: 0, y: 0 };
  const lagged = { x: 0, y: 0 };
  let frame = 0;

  const follow = () => {
    lagged.x += (target.x - lagged.x) * 0.2;
    lagged.y += (target.y - lagged.y) * 0.2;
    ring.style.transform = `translate3d(${lagged.x}px, ${lagged.y}px, 0)`;
    const settled = Math.hypot(target.x - lagged.x, target.y - lagged.y) < 0.2;
    frame = settled ? 0 : requestAnimationFrame(follow);
  };

  const hideCursor = () => root.classList.remove('has-cursor');

  addEventListener(
    'pointermove',
    (event) => {
      if (!enabled()) {
        hideCursor();
        return;
      }
      target.x = event.clientX;
      target.y = event.clientY;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;

      // On first show, start the ring at the pointer instead of sliding in from the corner.
      if (!root.classList.contains('has-cursor')) {
        lagged.x = target.x;
        lagged.y = target.y;
        root.classList.add('has-cursor');
      }
      if (!frame) frame = requestAnimationFrame(follow);

      const over = (event.target as Element).closest?.(INTERACTIVE);
      ring.classList.toggle('is-over', Boolean(over));

      const button = (event.target as Element).closest?.<HTMLElement>('.btn');
      if (button) {
        const box = button.getBoundingClientRect();
        const x = (event.clientX - box.left - box.width / 2) * MAGNET_PULL;
        const y = (event.clientY - box.top - box.height / 2) * MAGNET_PULL;
        button.style.transform = `translate(${x}px, ${y}px)`;
      }
    },
    { passive: true },
  );

  root.addEventListener('mouseleave', hideCursor);
  document.addEventListener('motionchange', () => {
    if (!enabled()) hideCursor();
  });
  reducedMotion.addEventListener('change', () => {
    if (!enabled()) hideCursor();
  });

  document.addEventListener(
    'pointerout',
    (event) => {
      const button = (event.target as Element).closest?.<HTMLElement>('.btn');
      if (button && !button.contains(event.relatedTarget as Node)) button.style.transform = '';
    },
    { passive: true },
  );
}

export {};
