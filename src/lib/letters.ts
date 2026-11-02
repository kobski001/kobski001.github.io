// Seeded rows of letters for the background field. They are generated at build time and
// are the same on every load. Rows repeat a small set of lines, so the page compresses well.
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzàèéìòùâêîôûñü.,:;';
const SPACE_CHANCE = 0.05;
const UNIQUE_LINES = 20;
const COLUMNS = 320;
const ROWS = 64;
const MIN_NOISE = 12;
const NOISE_RANGE = 30;

// The other pages use numbers and symbols. Their field is shorter, so it needs fewer rows.
const SYMBOLS = '0123456789!#$%&*+-/<=>?@[]{}()|_~^;:.';
const SYMBOL_LINES = 8;
const SYMBOL_ROWS = 24;

// General vocabulary for texture, not a list of the owner's skills. No commas: they separate
// the words in the data-words attribute.
export const LETTER_WORDS = [
  // The owner's work
  'panoptes',
  'smishguard',
  'webguard',
  'never sends packets',
  'unknown is not zero',

  // Cybersecurity
  'zero trust',
  'threat model',
  'attack surface',
  'least privilege',
  'defense in depth',
  'phishing',
  'smishing',
  'malware',
  'ransomware',
  'exploit',
  'zero day',
  'vulnerability',
  'cve',
  'xss',
  'sql injection',
  'buffer overflow',
  'privilege escalation',
  'lateral movement',
  'osint',
  'reconnaissance',
  'penetration test',
  'red team',
  'blue team',
  'incident response',
  'forensics',
  'encryption',
  'hashing',
  'salt',
  'public key',
  'certificate',
  'authentication',
  'firewall',
  'sandbox',
  'siem',
  'threat intel',

  // Machine learning
  'neural network',
  'gradient descent',
  'backpropagation',
  'overfitting',
  'regularization',
  'cross-validation',
  'feature engineering',
  'embedding',
  'transformer',
  'attention',
  'random forest',
  'decision tree',
  'logistic regression',
  'support vector',
  'clustering',
  'classifier',
  'precision',
  'recall',
  'f1 score',
  'loss function',
  'learning rate',
  'dropout',
  'inference',
  'training set',
  'tf-idf',

  // Networking
  'tcp handshake',
  'udp',
  'dns',
  'dhcp',
  'bgp',
  'ospf',
  'subnet',
  'gateway',
  'router',
  'switch',
  'vlan',
  'nat',
  'latency',
  'bandwidth',
  'packet loss',
  'mtu',
  'ipv4',
  'ipv6',
  'tls',
  'ssh',
  'vpn',
  'load balancer',
  'osi model',

  // Computer science
  'algorithm',
  'recursion',
  'binary tree',
  'hash table',
  'linked list',
  'big o',
  'dynamic programming',
  'graph traversal',
  'concurrency',
  'mutex',
  'deadlock',
  'garbage collection',
  'compiler',
  'kernel',
  'virtual memory',
  'stack frame',
  'race condition',
  'distributed system',
  'consensus',
  'state machine',
  'turing machine',
  'bitwise',
];

const generator = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export function letterRows(seed = 7) {
  const random = generator(seed);
  const noise = (length: number) =>
    Array.from({ length }, () =>
      random() < SPACE_CHANCE ? ' ' : ALPHABET[Math.floor(random() * ALPHABET.length)],
    ).join('');

  // Deal words from a shuffled deck, so each one is used before any repeats.
  const deck = [...LETTER_WORDS];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  let dealt = 0;

  const lines = Array.from({ length: UNIQUE_LINES }, () => {
    let line = noise(Math.floor(random() * NOISE_RANGE));
    while (line.length < COLUMNS) {
      const word = deck[dealt % deck.length];
      // A word that won't fit waits for the next line instead of being cut off.
      if (line.length + word.length + 2 > COLUMNS) {
        line += noise(COLUMNS - line.length);
        break;
      }
      dealt++;
      line += ` ${word} ${noise(MIN_NOISE + Math.floor(random() * NOISE_RANGE))}`;
    }
    return line.slice(0, COLUMNS);
  });

  return Array.from({ length: ROWS }, (_, row) => {
    const line = lines[row % UNIQUE_LINES];
    const offset = (row * 37) % COLUMNS;
    return line.slice(offset) + line.slice(0, offset);
  }).join('\n');
}

export function symbolRows(seed = 11) {
  const random = generator(seed);
  const lines = Array.from({ length: SYMBOL_LINES }, () =>
    Array.from({ length: COLUMNS }, () =>
      random() < SPACE_CHANCE ? ' ' : SYMBOLS[Math.floor(random() * SYMBOLS.length)],
    ).join(''),
  );

  return Array.from({ length: SYMBOL_ROWS }, (_, row) => {
    const line = lines[row % SYMBOL_LINES];
    const offset = (row * 37) % COLUMNS;
    return line.slice(offset) + line.slice(0, offset);
  }).join('\n');
}
