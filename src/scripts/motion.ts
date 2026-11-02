import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power4.out';

let lenis: Lenis | undefined;
let context: gsap.Context | undefined;
let media: gsap.MatchMedia | undefined;
let raf: ((time: number) => void) | undefined;

const stageProjects = (section: HTMLElement) => {
  const list = section.querySelector<HTMLElement>('[data-stage]');
  const cards = gsap.utils.toArray<HTMLElement>('.card', list);
  if (!list || cards.length < 2) return;

  const setActive = (active: number) => {
    cards.forEach((card, index) => card.classList.toggle('is-active', index === active));
  };

  list.classList.add('is-staged');
  setActive(0);
  gsap.set(cards.slice(1), { opacity: 0, xPercent: 12 });

  const timeline = gsap.timeline({
    defaults: { ease: 'none', duration: 1 },
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: 'top top',
      end: () => `+=${innerHeight * (cards.length - 1) * 1.1}`,
      scrub: 0.5,
      onUpdate(self) {
        setActive(Math.min(cards.length - 1, Math.round(self.progress * (cards.length - 1))));
      },
    },
  });

  cards.slice(1).forEach((card, index) => {
    timeline
      .to(cards[index], { opacity: 0, xPercent: -12, duration: 0.5 }, index + 0.2)
      .to(card, { opacity: 1, xPercent: 0, duration: 0.5 }, index + 0.6);
  });

  // Cards behind the active one can still take keyboard focus, so bring them forward.
  const onFocus = (event: FocusEvent) => {
    const index = cards.findIndex((card) => card.contains(event.target as Node));
    const trigger = timeline.scrollTrigger;
    if (index < 0 || !trigger) return;
    const position = trigger.start + (trigger.end - trigger.start) * (index / (cards.length - 1));
    lenis?.scrollTo(position, { immediate: true });
  };
  list.addEventListener('focusin', onFocus);

  return () => {
    list.removeEventListener('focusin', onFocus);
    list.classList.remove('is-staged');
    cards.forEach((card) => card.classList.remove('is-active'));
    gsap.set(cards, { clearProps: 'all' });
  };
};

export function start() {
  if (context) return;

  lenis = new Lenis({ anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  raf = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  context = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-chapter]').forEach((chapter) => {
      const head = chapter.querySelector('.chapter__head');
      const words = chapter.querySelectorAll('.word > span');
      if (head && words.length) {
        gsap.from(words, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.05,
          ease: EASE,
          scrollTrigger: { trigger: head, start: 'top 88%', once: true },
        });
      }

      const reveals = chapter.querySelectorAll('[data-reveal]');
      if (reveals.length) {
        gsap.from(reveals, {
          x: 48,
          opacity: 0,
          duration: 1,
          delay: 0.15,
          stagger: 0.1,
          ease: EASE,
          scrollTrigger: { trigger: reveals[0], start: 'top 90%', once: true },
        });
      }
    });

  });

  media = gsap.matchMedia();
  const section = document.querySelector<HTMLElement>('[data-stage-section]');
  if (section) {
    media.add('(min-width: 900px) and (min-height: 720px)', () => stageProjects(section));
  }
}

export function stop() {
  media?.revert();
  context?.revert();
  if (raf) gsap.ticker.remove(raf);
  lenis?.destroy();
  lenis = undefined;
  context = undefined;
  media = undefined;
}
