# Decisions

Self-grill of `DESIGN.md`, answered without the owner. Every answer below is a default the owner can overrule. Personal details live in `src/data/site.ts`; project text lives in `src/content/projects/`.

## Questions and answers

### Identity and contact

| # | Question | Default chosen |
|---|---|---|
| 1 | Which display name? | `Jakob`, chosen by the owner and set once in `site.ts`. The Credly line always shows `Jakob Theodore Rios` so it matches the badge. |
| 2 | Which contact links? | Email, GitHub and LinkedIn, all supplied by the owner or taken from the repo URLs in `DESIGN.md`. |
| 3 | Contact page or home section? | Both, from one shared component. The nav links to `/contact/`. No form, because GitHub Pages has no backend. |
| 4 | Bio and personal line? | Bio is a placeholder. The personal line uses the stated facts: "Outside of code, I spend my time on fitness and basketball." Wording still needs confirming. |

### Structure

| # | Question | Default chosen |
|---|---|---|
| 5 | The Work nav item has no page. What does it link to? | A small `/work/` index was added, so the nav has a real page and trimming a `/work/[slug]` URL doesn't 404. |
| 6 | Where does Services sit? | In the main nav between Notes and Contact, as the owner asked. This overrides the footer link in `DESIGN.md` section 6. |
| 7 | Services pricing? | "Message me for a quote." No numbers. |
| 8 | Services must wait for a demo site. Is the page published anyway? | The page exists, as the brief asks, with sample work shown as "Coming soon". Section 10 says one labelled demo should exist before it goes live, so the owner should add one or remove the footer link before promoting it. |
| 9 | Site URL? | `https://kobski001.github.io` with no `base`, as requested. The repo is currently `my-portfolio`, so see "Deploying under a different repo name" below. |

### Projects

| # | Question | Default chosen |
|---|---|---|
| 10 | Panoptes has no live deployment, so `LIVE` would be false. Which badge? | `CODE ON GITHUB`. |
| 11 | SmishGuard badge? | `LIVE`, because a live demo exists. Its limitations say it is a proof of concept, not a live filter. |
| 12 | WebGuard status is dated Oct 2026. How is it worded? | "Dataset extraction was underway as of the October 2026 draft", so it stays true until the owner updates it. |
| 13 | Owner's role on WebGuard? | Placeholder. The page says "Team project with two other authors". |
| 14 | WebGuard and Panoptes have no limitations in section 7, but the template needs them. | Written only from stated facts: WebGuard is a proposal with no results, and its paper is unpublished. Panoptes only knows what its providers hold and accepts public addresses only. |
| 15 | WebGuard has no screenshots. What fills the media slot? | A small diagram built only from section 7.3, captioned as a planned design. No code claims. This also covers the "WebGuard diagram" item in section 10 unless the owner prefers their own. |
| 16 | How are SmishGuard teammates credited? | "Team project, 3 members, DLSU-D". No names are given in `DESIGN.md`. |
| 17 | Hero statement? | "Know what you know. Know what you don't. Return the truth", chosen by the owner. |
| 18 | "Problem" sections? | Section 7 describes what each project does, not a separate problem, so these state the purpose only. Nothing was added. |

### Design

| # | Question | Default chosen |
|---|---|---|
| 19 | The light accent `#0E8F80` fails AA (3.72:1 on the background, 3.99:1 with white text). Keep it? | Changed to `#0B7468` (5.28:1 and 5.66:1). `DESIGN.md` itself was left unchanged, and allows adjusting tokens. All other tokens are as written. |
| 20 | Fonts? | Bricolage Grotesque (display, using its condensed width for the big type), Instrument Sans (body), JetBrains Mono (labels). Self-hosted through Fontsource. |
| 21 | Which secondary touches, since `DESIGN.md` says not to do all? | Mono status badges and numbered mono section labels. Decision 56 covers card hover. |
| 22 | Scroll reveal? | Replaced by decision 44. |
| 23 | Numbered section labels? | Removed by the owner: chapter labels, focus cards, the chapter rail, Services steps and the project counter. This overrides `DESIGN.md` sections 4 and 6.1. |
| 24 | Pause control under `prefers-reduced-motion`? | Stays visible but disabled, showing `Paused`. |
| 25 | Does the pause choice persist? | Yes, in `localStorage` inside try/catch, the same as the theme. |
| 26 | Which skills are listed? | Exactly section 7.4, including the Cisco course under Security. This still needs the owner's confirmation. |

### Technical

| # | Question | Default chosen |
|---|---|---|
| 27 | UI framework? | None. Plain scripts are enough, and Astro islands are not needed because there is no framework to hydrate. |
| 28 | Added beyond the brief? | A styled 404 page, `robots.txt`, a favicon, an Open Graph image, and `@astrojs/check` with `typescript` as dev dependencies. |
| 29 | Open Graph image? | Generated at `public/og.png` from the current hero line, on a plain background with no name on it. |
| 30 | Title Case for headings and buttons, as the web-design guideline suggests? | Not applied. Sentence case fits the writing rules in `DESIGN.md`. |

## Design update from the reference sites

Ideas were taken from christendijoux.com, asklionel.tech and robertoattanasio.com. Layouts, code and copy were not copied.

| # | Question | Default chosen |
|---|---|---|
| 31 | Hero? | Very large condensed uppercase statement, with a mono information strip above and a proof strip below. |
| 32 | Hero graphic? | Replaced by decisions 39 and 40. |
| 33 | Proof points? | Removed by the owner, along with the count-up animation from `DESIGN.md` section 5.4. |
| 34 | "The site, taken apart"? | A short section on About, listing checked facts about how the site is built. |
| 35 | Controls? | Text labels (`Pause`, `Light`) instead of icons. |
| 36 | Content width? | Raised from about 1100px to 1216px, so the header, hero and sections share one left edge. This departs from section 6 of `DESIGN.md`. |
| 37 | Project cards? | Ruled rows with large titles instead of boxed cards. |
| 38 | Left out? | Live clock, draggable world, assistant widget, "trusted inside" row and award badge. Decisions 39 to 50 replace the rest of this list. |

## Cinematic rebuild from the updated `DESIGN.md`

Library versions: `ogl` 1.0.11, `gsap` 3.15.0, `lenis` 1.3.27.

| # | Question | Default chosen |
|---|---|---|
| 39 | Three.js or OGL? | Replaced by decision 57. Neither is used now. |
| 40 | Hero fallback? | Replaced by decision 58. |
| 41 | Intro? | A loading bar for about 1.2s, once per session on the home page. Any key or the Skip button ends it, and CSS clears it after about 2.7s if scripts fail. |
| 42 | Astro view transitions or an equivalent? | Native cross-document view transitions, with the opt-in rule inline at the top of `<head>`. A layered reveal of 0.7s: the new page rises through a clean edge while the old one drifts up and dims, and the header stays still. No shapes, colours or script. Browsers without support navigate normally. |
| 43 | Smooth scroll on every page? | Home only, so reading pages stay light and calmer, as section 6.2 asks. |
| 44 | Chapter entrances? | Word reveals on headings, and content slides in from the right with a slight delay. Pinned projects slide sideways. Page entrance animations and the intro are skipped when arriving from another page on the site. The hero headline uses plain CSS, so a script failure can't hide it. |
| 45 | Pinned projects? | Only at 900px wide and 720px tall or more. Otherwise a plain list. Keyboard focus on a hidden card brings it forward. |
| 46 | What does Pause do? | Freezes the letter streams, removes Lenis and reverts every GSAP effect. Scroll progress and the chapter rail stay on, because they follow the reader's own scrolling. |
| 47 | Skills? | Grouped chips stay as the real list. A marquee below them is decorative and hidden from screen readers. |
| 48 | Terminal? | A native `<dialog>`, opened with the backtick key or the footer `>_` button. It prints the same facts as the pages. |
| 49 | Lab? | Sliders for streams, speed and trail length, plus a colour choice. With animations off it shows a still frame that still responds. |
| 50 | Sound? | Skipped. No royalty-free audio was supplied, as section 5.6 allows. |
| 51 | Light accent? | `DESIGN.md` still lists `#0E8F80`, which fails AA. `#0B7468` stays, as in decision 19. `--glow` uses the same colour. |
| 52 | Content width? | 1216px, which now fits the 1100–1200px range closely enough. Decision 36 still applies. |
| 53 | Hero copy? | The information strip was removed for the `whoami` line. The proof strip was later removed (decision 33). |

## Owner's changes after the cinematic rebuild

These come from the owner's direct feedback and override the matching parts of `DESIGN.md` sections 5.1, 5.2 and 5.4.

| # | Question | Default chosen |
|---|---|---|
| 54 | Loader? | A thin teal and blue bar instead of the number, driven by CSS, with the owner's quote "Knowledge is a never-ending journey" under it. |
| 55 | Cursor? | The circular cursor stays and the native cursor is hidden while it is active. The native cursor returns when animations are paused, under reduced motion, on touch devices, before the first pointer move on a page, and while the terminal is open. |
| 56 | Card hover? | Tilt, spotlight, glow, lift and zoom are removed. Hovering only turns the border and title to the accent colour, with no animation. |
| 57 | Background? | Nodes are gone. Dim letters fill the hero, and bright streams fade through them from left to right. It uses a 2D canvas, so neither WebGL nor OGL is needed. |
| 58 | Background fallback? | The dim letters are CSS text, so they show with no JavaScript. Under reduced motion or pause, the canvas draws one still frame. |
| 59 | Where does the background run? | The hero only, where the nodes were. Chapter text needs a clean background to stay readable. |
| 60 | Text over the letters? | Small hero text sits on a solid panel. The large headline uses a light scrim. |
| 61 | Colours? | Grey trails with a teal or blue head, from the theme tokens. Streams run sideways, which keeps them away from the "matrix rain" that `DESIGN.md` rules out. |
| 62 | Lab? | Now a playable version of the letter field, because the network it used is gone. |
| 64 | Background on other pages? | Every page but Home has numbers and symbols behind its heading, fading out before the body text. Small heading text sits on a solid backing, and the streams run dimmer than on Home. |
| 65 | Nav shifting between pages? | Caused by long pages having a scrollbar and short ones not. `scrollbar-gutter: stable` reserves the space, and the mono font is preloaded. |
| 63 | Real words in the letters? | General vocabulary from cybersecurity, machine learning, networking and computer science is mixed in, plus the project names (`src/lib/letters.ts`, `LETTER_WORDS`). It is background texture, so it does not count as a skills claim and section 7's fact rule applies to the skills list instead. Concepts are used rather than product names. When a trail passes one, it turns bold and accent-coloured on a soft backdrop, and stays bright longer than the letters around it. |

## Decrypting background

| # | Question | Default chosen |
|---|---|---|
| 66 | Dim characters? | Darker (10% opacity) and always changing, about 60% of them each second, on their own canvas. Under reduced motion or pause they hold still. Without JavaScript they stay as still CSS text. |
| 67 | Real words? | They stay scrambled in the dim layer and only show when a stream passes, so each stream decrypts them. |

## Page background

| # | Question | Default chosen |
|---|---|---|
| 68 | Where is the page background set? | On `html`, inline at the top of `<head>` and in `global.css`, and on `::view-transition`. `body` stays transparent, which differs from `DESIGN.md` section 3, because a background on `body` would hide the character field behind it. |

## Deploying under a different repo name

The site is set up for a repo named `kobski001.github.io`. To keep the repo as `my-portfolio` instead:

1. In `astro.config.mjs`, add `base: '/my-portfolio'` next to `site`.
2. In `public/robots.txt`, change the sitemap URL to `https://kobski001.github.io/my-portfolio/sitemap-index.xml`.

Internal links, images and assets pick up `base` automatically. This was tested with a build using that base. If the GitHub username differs, also update `site` and `robots.txt`.

## Adding content

- **Note:** copy `src/content/notes/_example.md` to `my-post.md` and set `draft: false`.
- **Project:** add one Markdown file to `src/content/projects/`.
- **Screenshots:** put images next to the project file and list them under `screenshots:` with `src` and `alt`. The placeholder then disappears.
- **CV:** put the PDF in `public/` and set `cv: '/cv.pdf'` in `site.ts`. The button then appears.
- **Remaining placeholders:** search the built site for `data-placeholder`.
