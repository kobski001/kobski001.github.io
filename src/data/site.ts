// The one file to edit for personal details. While a value is null, the site
// shows a marked placeholder (or hides the feature, for the CV).
export const site = {
  displayName: 'Jakob' as string | null,
  bio: null as string | null,
  email: 'theodorekob@gmail.com' as string | null,
  linkedin: 'https://www.linkedin.com/in/jakob-theodore-00i' as string | null,
  // Path of a file in public/, such as '/cv.pdf'. The button stays hidden while null.
  cv: null as string | null,
  // A file in public/, such as { src: '/photo.jpg', alt: '...', width: 800, height: 1000 }.
  photo: null as { src: string; alt: string; width: number; height: number } | null,
  github: 'https://github.com/kobski001',
  personalLine: 'Outside of code, I spend my time on fitness and basketball.',
  credential: {
    name: 'Cisco Introduction to Cybersecurity',
    issuedTo: 'Jakob Theodore Rios',
    url: 'https://www.credly.com/badges/d505b67c-67eb-4977-adec-d74e86e546ed/public_url',
  },
};

export const skills = [
  { group: 'Languages', items: ['Python', 'Java', 'Learning C'] },
  { group: 'Frameworks', items: ['Streamlit', 'pytest', 'Astro'] },
  {
    group: 'ML and data',
    items: [
      'scikit-learn',
      'TF-IDF',
      'Text classification',
      'Feature engineering',
      'Logistic Regression',
      'Decision Tree',
      'SVM',
      'Cross-validation',
      'Model evaluation',
      "McNemar's test",
    ],
    photo: {
    src: '/aboutmepicture.png',
    alt: 'Jakob',
    width: 800,
    height: 1000,
},
  },
  {
    group: 'Tools',
    items: ['Kali Linux', 'Git/GitHub', 'Docker', 'Kubernetes', 'Node.js', 'MySQL'],
  },
  { group: 'Security', items: ['Cisco Introduction to Cybersecurity'] },
];

export const statusLabels = {
  live: 'LIVE',
  code: 'CODE ON GITHUB',
  research: 'RESEARCH IN PROGRESS',
} as const;
