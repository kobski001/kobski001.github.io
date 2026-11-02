export type ColorMode = 'both' | 'teal' | 'blue';
export type StreamOptions = {
  // Streams per row of letters.
  density: number;
  speed: number;
  trail: number;
  colorMode: ColorMode;
  brightness?: number;
};

type Stream = { row: number; head: number; speed: number; length: number; blue: boolean };

const FONT_SIZE = 12;
const LINE_HEIGHT = 20;
const FRAME_MS = 1000 / 30;
const MIN_CELLS_PER_SECOND = 8;
const CELL_SPEED_RANGE = 22;
const HOT_CELLS = 2;
const MAX_TRAIL_ALPHA = 0.9;
const TRAIL_CURVE = 1.4;
const DIM_ALPHA = 0.1;
// Share of the dim characters that change each second.
const SCRAMBLE_RATE = 0.6;
const WORD_HOLD = 2.4;
const WORD_BACKDROP_ALPHA = 0.2;

// Marks which cells of each row belong to a real word, so the trail can highlight them.
const markWords = (rows: string[], words: string[]) =>
  rows.map((row) => {
    const cells = new Uint8Array(row.length);
    for (const word of words) {
      if (!word) continue;
      let index = row.indexOf(word);
      while (index !== -1) {
        cells.fill(1, index, index + word.length);
        index = row.indexOf(word, index + word.length);
      }
    }
    return cells;
  });

export function createLetterStream(field: HTMLElement, options: StreamOptions) {
  const canvas = field.querySelector<HTMLCanvasElement>('[data-letter-canvas]');
  const dimCanvas = field.querySelector<HTMLCanvasElement>('[data-letter-dim]');
  const ctx = canvas?.getContext('2d');
  const dimCtx = dimCanvas?.getContext('2d');
  if (!canvas || !dimCanvas || !ctx || !dimCtx) return null;

  const rows = (field.dataset.letters ?? '').split('\n');
  const wordCells = markWords(rows, (field.dataset.words ?? '').split(','));
  const alphabet = [...new Set(rows.join(''))].filter((letter) => letter !== ' ');
  const randomLetter = () => alphabet[Math.floor(Math.random() * alphabet.length)];

  // What the dim layer shows. Real words start scrambled, so a passing stream decrypts them.
  const scrambled = rows.map((row, index) =>
    [...row].map((letter, cell) => (wordCells[index][cell] && letter !== ' ' ? randomLetter() : letter)),
  );

  const family = getComputedStyle(field).fontFamily;
  const font = `400 ${FONT_SIZE}px ${family}`;
  const boldFont = `700 ${FONT_SIZE}px ${family}`;
  const settings = { brightness: 1, ...options };
  const colors = { dim: '', trail: '', accent: '', accent2: '' };

  let width = 0;
  let height = 0;
  let cellWidth = 7.2;
  let baseline = 14;
  let visibleRows = 0;
  let columns = 0;
  let streams: Stream[] = [];
  let frame = 0;
  let last = 0;
  let previous = 0;

  const place = (stream: Stream, anywhere: boolean) => {
    stream.row = Math.floor(Math.random() * visibleRows);
    stream.length = settings.trail * (0.5 + Math.random());
    stream.speed = MIN_CELLS_PER_SECOND + Math.random() * CELL_SPEED_RANGE;
    stream.head = anywhere ? Math.random() * columns * 1.2 : -Math.random() * columns * 0.4;
    stream.blue =
      settings.colorMode === 'blue' || (settings.colorMode === 'both' && Math.random() < 0.3);
  };

  const fillStreams = () => {
    const count = Math.round(visibleRows * settings.density);
    streams = streams.slice(0, count);
    while (streams.length < count) {
      const stream = { row: 0, head: 0, speed: 0, length: 0, blue: false };
      place(stream, true);
      streams.push(stream);
    }
  };

  const readColors = () => {
    const styles = getComputedStyle(document.documentElement);
    colors.dim = styles.getPropertyValue('--muted').trim();
    colors.trail = styles.getPropertyValue('--text').trim();
    colors.accent = styles.getPropertyValue('--accent').trim();
    colors.accent2 = styles.getPropertyValue('--accent-2').trim();
  };

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    width = field.clientWidth;
    height = field.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = font;
    dimCanvas.width = canvas.width;
    dimCanvas.height = canvas.height;
    dimCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dimCtx.font = font;

    const metrics = ctx.measureText('m');
    const ascent = metrics.fontBoundingBoxAscent;
    const descent = metrics.fontBoundingBoxDescent;
    cellWidth = metrics.width;
    baseline = (LINE_HEIGHT - (ascent + descent)) / 2 + ascent;
    visibleRows = Math.max(Math.ceil(height / LINE_HEIGHT), 1);
    columns = Math.ceil(width / cellWidth);
    streams.forEach((stream) => {
      if (stream.row >= visibleRows) place(stream, true);
    });
    fillStreams();
  };

  const paintDim = () => {
    dimCtx.clearRect(0, 0, width, height);
    dimCtx.fillStyle = colors.dim;
    dimCtx.globalAlpha = DIM_ALPHA;
    for (let row = 0; row < visibleRows; row++) {
      const line = scrambled[row % rows.length];
      const y = row * LINE_HEIGHT + baseline;
      for (let column = 0; column < columns; column++) {
        dimCtx.fillText(line[column % line.length], column * cellWidth, y);
      }
    }
  };

  const scramble = (seconds: number) => {
    const changes = Math.round(visibleRows * columns * SCRAMBLE_RATE * seconds);
    for (let change = 0; change < changes; change++) {
      const row = Math.floor(Math.random() * visibleRows);
      const column = Math.floor(Math.random() * columns);
      const line = scrambled[row % rows.length];
      const cell = column % line.length;
      if (line[cell] === ' ') continue;

      line[cell] = randomLetter();
      const left = Math.round(column * cellWidth);
      const right = Math.round((column + 1) * cellWidth);
      dimCtx.clearRect(left, row * LINE_HEIGHT, right - left, LINE_HEIGHT);
      dimCtx.fillText(line[cell], column * cellWidth, row * LINE_HEIGHT + baseline);
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    for (const stream of streams) {
      const line = rows[stream.row % rows.length];
      const cells = wordCells[stream.row % rows.length];
      const noise = scrambled[stream.row % rows.length];
      const head = Math.floor(stream.head);
      const hot = stream.blue ? colors.accent2 : colors.accent;
      const y = stream.row * LINE_HEIGHT + baseline;

      for (let distance = 0; distance < stream.length; distance++) {
        const column = head - distance;
        if (column < 0) break;
        if (column >= columns) continue;
        const cell = column % line.length;
        const letter = cells[cell] ? line[cell] : noise[cell];
        const fade = 1 - distance / stream.length;

        // Real words get a soft backdrop and stay bright longer as the trail passes.
        if (cells[cell]) {
          const left = Math.round(column * cellWidth);
          const right = Math.round((column + 1) * cellWidth);
          const strength = Math.min(fade * WORD_HOLD, 1);
          ctx.fillStyle = hot;
          ctx.globalAlpha = strength * WORD_BACKDROP_ALPHA;
          ctx.fillRect(left, stream.row * LINE_HEIGHT + 2, right - left, LINE_HEIGHT - 4);
          if (letter !== ' ') {
            ctx.font = boldFont;
            ctx.globalAlpha = strength;
            ctx.fillText(letter, column * cellWidth, y);
            ctx.font = font;
          }
          continue;
        }

        if (letter === ' ') continue;

        if (distance < HOT_CELLS) {
          ctx.fillStyle = hot;
          ctx.globalAlpha = settings.brightness;
        } else {
          ctx.fillStyle = colors.trail;
          ctx.globalAlpha = fade ** TRAIL_CURVE * MAX_TRAIL_ALPHA * settings.brightness;
        }
        ctx.fillText(letter, column * cellWidth, y);
      }
    }
    ctx.globalAlpha = 1;
  };

  const step = (seconds: number) => {
    for (const stream of streams) {
      stream.head += stream.speed * settings.speed * seconds;
      if (stream.head - stream.length > columns) place(stream, false);
    }
  };

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    if (now - last < FRAME_MS) return;
    last = now;
    const seconds = Math.min((now - previous) / 1000, 0.1);
    step(seconds);
    scramble(seconds);
    previous = now;
    draw();
  };

  const observer = new ResizeObserver(() => {
    resize();
    paintDim();
    draw();
  });

  readColors();
  resize();
  paintDim();
  draw();
  field.classList.add('is-live');
  observer.observe(field);

  return {
    start() {
      if (frame) return;
      previous = performance.now();
      frame = requestAnimationFrame(tick);
    },
    stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    },
    refreshTheme() {
      readColors();
      paintDim();
      draw();
    },
    update(next: Partial<StreamOptions>) {
      const lengthChanged = next.trail !== undefined && next.trail !== settings.trail;
      const colorChanged = next.colorMode !== undefined && next.colorMode !== settings.colorMode;
      Object.assign(settings, next);
      fillStreams();
      if (lengthChanged || colorChanged) {
        streams.forEach((stream) => {
          const { head } = stream;
          place(stream, false);
          stream.head = head;
        });
      }
      draw();
    },
  };
}

// Runs a field in the background. Under reduced motion or pause it draws one still frame,
// and if it never starts, the field keeps its dim characters.
export function runStream(field: HTMLElement, options: StreamOptions) {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let onScreen = true;

  const init = () => {
    const stream = createLetterStream(field, options);
    if (!stream) return;

    const sync = () => {
      const moving = !reducedMotion.matches && root.dataset.motion !== 'paused';
      if (moving && onScreen && !document.hidden) stream.start();
      else stream.stop();
    };

    new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    }).observe(field);

    document.addEventListener('visibilitychange', sync);
    document.addEventListener('motionchange', sync);
    document.addEventListener('themechange', () => stream.refreshTheme());
    sync();
  };

  // The canvas has to measure the same font the dim characters use.
  const family = getComputedStyle(field).fontFamily;
  document.fonts.load(`12px ${family}`, 'a').then(init, init);
}
