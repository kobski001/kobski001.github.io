// Scroll progress and the current chapter. These follow the reader's own scrolling,
// so they stay on when animations are paused.
const bar = document.querySelector<HTMLElement>('[data-progress]');
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-chapter-link]')];
const chapters = links.map((link) => document.querySelector<HTMLElement>(link.hash));
const BOTTOM_TOLERANCE = 2;
const ACTIVE_LINE = 0.25;

let queued = false;

const update = () => {
  queued = false;
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  const progress = scrollable > 0 ? Math.min(scrollY / scrollable, 1) : 0;
  if (bar) bar.style.transform = `scaleX(${progress})`;

  // The current chapter is the last one past a line near the top. Short final chapters never
  // reach it, so the bottom of the page always selects the last one.
  let current = 0;
  chapters.forEach((chapter, index) => {
    if (chapter && chapter.getBoundingClientRect().top <= innerHeight * ACTIVE_LINE) current = index;
  });
  if (scrollY >= scrollable - BOTTOM_TOLERANCE) current = chapters.length - 1;

  links.forEach((link, index) => {
    if (index === current) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
};

const queueUpdate = () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(update);
};

addEventListener('scroll', queueUpdate, { passive: true });
addEventListener('resize', queueUpdate, { passive: true });
update();

export {};
