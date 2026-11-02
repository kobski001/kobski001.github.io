import { runStream } from './letter-stream';

const field = document.querySelector<HTMLElement>('.hero [data-letters]');
const small = innerWidth < 720;

if (field) {
  runStream(field, {
    density: small ? 0.6 : 0.85,
    speed: 1,
    trail: small ? 36 : 60,
    colorMode: 'both',
  });
}
