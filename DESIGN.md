# DESIGN.md — Portfolio (Rios)

Design and content brief for Claude Code. Read this fully before writing any code. Where a value is marked **[confirm]**, ask the owner instead of guessing.

---

## 1. Purpose and audience

**Owner:** 3rd-year BS Computer Science student at De La Salle University–Dasmariñas, heading toward cybersecurity (networking, machine learning, data analysis, web development kept as a secondary options). Display name: **[confirm: Jakob Theodore Rios / Jakob Rios / other]**.

**Primary audience:** recruiters and hiring managers for internships/OJT and first jobs. Roles are kept broad for now (security, networking, ML/software).
**Secondary audience:** small-business owners, reached only through a separate `/services` page.

**What a recruiter should understand in 10 seconds:** a CS student with real, runnable security-related projects, honest about what is finished and what is in progress.

## 2. Design direction

**One line:** a quiet, dark, security-flavored portfolio with restrained, purposeful graphics. Minimal layout, not minimal personality.

Influences (take ideas, never copy layout, code or copy):
- **christendijoux.com** — page order and structure: intro, numbered focus areas, skills grouped by category, experience/credentials, selected projects with one-line summaries and their own detail pages, resume link.
- **asklionel.tech** — a four-item nav, a dark/light toggle, a "pause animations" control, a single bold statement in the hero, and a notes/blog page.
- **robertoattanasio.com** — a personal side shown as part of the site, not hidden in a footer. Do NOT copy the draggable-field navigation.

**Mood words:** dark, precise, calm, technical, a little playful. Not: neon-cyberpunk, hacker-movie green rain, purple gradients, generic template.

## 3. Theme and tokens (starting values, adjust by eye)

Dark is the default. Provide a light theme and a toggle. Respect `prefers-color-scheme` on first visit.

```css
:root {                      /* dark */
  --bg:       #0A0C10;
  --surface:  #11151B;
  --border:   #1E252E;
  --text:     #E6EAF0;
  --muted:    #8B95A5;
  --accent:   #3DDCC8;       /* single accent: cool teal */
  --accent-ink: #04201C;     /* text on accent */
}
:root[data-theme="light"] {
  --bg:       #F6F7F9;
  --surface:  #FFFFFF;
  --border:   #DDE1E7;
  --text:     #12161C;
  --muted:    #5B6472;
  --accent:   #0E8F80;
  --accent-ink: #FFFFFF;
}
```

Rules:
- One accent colour only. Status badges may use the accent and neutral greys; avoid red/green/yellow traffic lights.
- Body text contrast at least WCAG AA in both themes.
- Give `body` an explicit background. Define colours as tokens, never hard-coded in components.
- Theme choice stored in `localStorage`, wrapped in try/catch; the site must render correctly without it.

## 4. Typography

Three roles. Let the `frontend-design` skill choose specific families, within these constraints:
- **Display/headings:** a distinctive but readable sans, large, tight tracking, used sparingly.
- **Body:** a clean, highly readable sans at 16–18px, line-height about 1.6.
- **Mono:** for small labels, section numbers (`01`, `02`), tags and metadata. This is where the "security" flavour comes from.

Avoid default-looking stacks (plain system fonts, overused defaults). Self-host or load from Google Fonts with `display=swap`. Maximum 2 font families plus 1 mono.

## 5. Graphics and motion

The owner likes graphics, so v1 should have a few memorable visuals, kept lightweight.

**Hero graphic (the one signature visual):** a subtle animated network/graph background built with canvas or SVG, no WebGL. Nodes and faint lines that drift slowly, with one or two nodes that pulse in the accent colour. It sits behind the text and never reduces readability.

**Secondary touches (pick a few, do not do all):**
- Numbered section labels in mono (`01 / Projects`).
- Soft border glow or lift on project cards on hover.
- Gentle fade/slide-in on scroll, once per element.
- Project cards use real screenshots, with a mono status badge (`LIVE`, `RESEARCH IN PROGRESS`).

**Hard rules:**
- Honour `prefers-reduced-motion`: no animation at all in that mode (static hero graphic).
- Include a visible **pause animations** toggle.
- No scroll-jacking, no autoplay sound, no cursor-following effects that block clicks.
- Performance budget: home page under about 200 KB of JavaScript, Lighthouse performance 90+ on mobile, no layout shift from fonts or images.
- Heavy WebGL experiments are out of scope for v1. A future `/lab` page may hold them.

## 6. Layout and pages

Single content width of about 1100px max, generous whitespace, 16px minimum side gutter on mobile. Mobile-first; verify at 360px.

**Global nav:** Work · About · Notes · Contact, plus theme toggle and pause-animations control. `Services` is a small link in the footer only, not in the main nav **[confirm]**.

### 6.1 Home (`/`)
1. **Hero:** name, one bold statement about security and building tools, one supporting sentence, two buttons: `View projects` and `Download CV` (hide the CV button until a PDF exists). Hero graphic behind.
2. **Focus areas:** three numbered cards (`01`, `02`, `03`), one sentence each. Suggested: Security research with ML (SmishGuard, WebGuard) · Security tooling (Panoptes) · Systems and infrastructure (Docker/Kubernetes, homelab).
3. **Selected projects:** three cards in this order: Panoptes, SmishGuard, WebGuard. Each: title, one line, stack tags, status badge, link to detail page.
4. **Skills:** grouped by category (see 7.4). Plain chips, no progress bars or percentage ratings.
5. **Certifications:** Cisco Introduction to Cybersecurity, linking to the public Credly badge.
6. **About (short):** 2–3 sentences, a placeholder photo, and one personal line (fitness/basketball) **[confirm wording]**.
7. **Contact:** email, GitHub, LinkedIn **[confirm which to show]**. No phone number or home address.

### 6.2 Project detail (`/work/[slug]`)
Template: title and status badge · one-paragraph problem statement · my role · stack · key results or current status · screenshots · links (repo, live demo, paper where it exists) · **limitations** (short, honest).

### 6.3 About (`/about`)
Longer version of the bio, education (DLSU-D, BSCS), certifications, what the owner is working toward (cybersecurity, networking), interests. Keep one personal paragraph.

### 6.4 Notes (`/notes`)
Blog index. **Leave empty for now** with a short placeholder ("Write-ups on projects, labs and CTFs coming soon"). Structure the page so Markdown posts can be added later with no redesign.

### 6.5 Services (`/services`)
Separate audience (small-business owners), calmer tone, same visual system. Not linked from the hero.
- Three short blocks: **Websites**, **Short product videos (10–30s)**, **Ad creatives**.
- "How it works": discuss, quote, build, revise, deploy, hand over.
- "What's included": pages and features, number of revisions, deadline, deposit before starting, the client owns their domain and hosting.
- **Sample work:** show "Coming soon" until real demo sites exist. Demo sites must be clearly labelled as demos, never as client work.
- Prices: do not publish numbers until the owner decides **[confirm: starting-from price or "message for a quote"]**.
- One clear contact button.

### 6.6 Contact (`/contact`)
Simple page or home section with email, GitHub and LinkedIn. A form is optional and not required for v1.

## 7. Content (use only these facts; do not invent)

### 7.1 Panoptes (solo project)
Passive OSINT dashboard for IP addresses. Takes a public IPv4/IPv6 address, queries Shodan Host, Shodan InternetDB, VirusTotal and IPinfo Lite in parallel, normalises the results into one schema, caches them in SQLite, and shows a combined report in a Streamlit UI. Passive: it only reads data these services already hold and never sends packets to the target. Providers fail independently (one failing only affects its own card), stale cached data is labelled, unknown values are never shown as 0, and private/loopback IPs are rejected before any API call. Tests run in CI. Stack: Python, Streamlit, SQLite, pytest, GitHub Actions.
Repo: https://github.com/kobski001/panoptes

### 7.2 SmishGuard (team project, 3 members, DLSU-D)
Streamlit app that detects banking and online-payment smishing in Filipino/Taglish SMS. Compares Logistic Regression, Decision Tree and SVM using TF-IDF plus 11 hand-built features (links, shorteners, suspicious TLDs, urgency and money words, sender type and others). Core dataset: 4,043 messages (2,582 smishing, 1,461 legitimate). In 5-fold cross-validation repeated 5 times, Logistic Regression scored F1 0.983; McNemar's test compares the models. Includes a live demo, a feedback/retrain tab and a feature-importance view.
Owner's role: **did most of the programming** (team credit still shown).
Honest limitation to include: the hand-built set includes sender features, which partly reflect which dataset a message came from; it is a proof of concept, not a live filter.
Repo: https://github.com/jel77/smishguard · Live demo: https://smishguardv1.streamlit.app/

### 7.3 WebGuard (research in progress, no code yet)
Research proposal on predicting how likely a published web-application vulnerability (CVE) is to be exploited. Uses NVD records as inputs and the CISA Known Exploited Vulnerabilities catalog as the label, plus Exploit-DB for public-exploit availability. Compares Logistic Regression, Decision Tree, Random Forest and XGBoost, with a time-aware train/test split and PR-AUC as the primary metric; EPSS is a benchmark to beat, not an input. Output is a probability that website owners could use to prioritise patching.
Status badge: **RESEARCH IN PROGRESS**. Proposal written; dataset extraction underway as of the Oct 2026 draft **[confirm current status before publishing]**. Do not link a repo (none exists). Do not publish the raw paper: it contains professor-facing notes and a revision log. Offer a clean summary page; a trimmed PDF is optional.
Team project with two other authors **[confirm owner's role]**.

### 7.4 Skills (confirm before publishing)
Languages: Python, Java; learning C. ML and data: scikit-learn, TF-IDF, model evaluation and statistical testing. Tools: Git/GitHub, Docker, Kubernetes, Node.js, MySQL, Streamlit, pytest. Security: Cisco Introduction to Cybersecurity. Do not list tools the owner has not used.

### 7.5 Not featured
CineSearch is an old project and must not appear on the site.

### 7.6 Credential
Cisco Introduction to Cybersecurity, issued to Jakob Theodore Rios: https://www.credly.com/badges/d505b67c-67eb-4977-adec-d74e86e546ed/public_url

## 8. Technical plan

- **Framework:** Astro, static output, deployed to GitHub Pages. If the repo is `username.github.io`, no `base` path is needed; otherwise set `site` and `base` in `astro.config`.
- **Content:** Astro content collections for `projects` and `notes` (Markdown). Adding a project or post means adding one file.
- **JavaScript:** minimal. Only the theme toggle, pause-animations control, hero graphic and scroll reveal. No UI framework unless a specific need appears.
- **Hero graphic:** vanilla canvas or inline SVG, pauses when the tab is hidden, scales down particle count on small screens.
- **SEO and sharing:** page titles of 2–4 words, meta descriptions, an Open Graph image, a sitemap.
- **Accessibility:** semantic HTML, visible focus states, alt text on screenshots, keyboard-operable nav, skip-to-content link.
- **Deploy:** GitHub Actions workflow using Astro's official Pages action.

## 9. Writing rules

- First person, plain, specific. Short sentences.
- No invented metrics, testimonials, logos or "trusted by" claims.
- Say what is finished and what is in progress. State limitations briefly.
- Team projects credit the team. The owner's own part is stated plainly.
- Demo content is always labelled as demo.
- Never publish a phone number, home address or private contact details.

## 10. Open items (owner to provide)

- [ ] Display name
- [ ] CV PDF (one page)
- [ ] Photo (placeholder until then)
- [ ] Email, LinkedIn, which contact links to show
- [ ] 2–3 sentence bio plus one personal line
- [ ] Screenshots for Panoptes, SmishGuard, and a WebGuard diagram
- [ ] Repo descriptions and topics on GitHub (`cybersecurity`, `osint`, `streamlit`, `machine-learning`)
- [ ] Rename or fix the leftover `untitled-1` path in Panoptes' clone instructions
- [ ] Decide on the services page link placement and pricing display
- [ ] At least one labelled demo website before the services page goes live
