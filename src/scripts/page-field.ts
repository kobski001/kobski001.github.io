import { runStream } from './letter-stream';

const field = document.querySelector<HTMLElement>('.page-field [data-letters]');

if (field) {
  runStream(field, { density: 0.7, speed: 0.8, trail: 40, colorMode: 'both', brightness: 0.6 });
}
