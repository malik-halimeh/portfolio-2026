# HANDOFF.md — Malik Halimeh portfolio rebuild (read this first)

> For any AI agent or human continuing this work. Written 2026-10-11 by Claude (Fable 5.1) after ~2 hours of discovery and research. Everything needed to continue at the same quality is here or linked from here. Keep this file current: update the **Progress checklist** at the end of every work session.

## 0. The ask, in Malik's words (paraphrased faithfully)

- The old portfolio (github.com/malik-halimeh/Portfolio, live at portfolio-portfolio-tau.vercel.app) is rejected entirely: he does not like it and its content is irrelevant (it was Replit-generated glassmorphism with fabricated "AI Engineer / RAG / n8n" projects and skill percentage bars). **Reuse nothing from it.**
- Build a totally new portfolio that is "one of a kind", that makes a visitor "want to dive more and more" and "really want to hire me". He calls it potentially life-changing.
- Work **section by section, detail by detail, button by button, text by text**. Nothing skipped. Every section fully finished (copy, states, mobile, accessibility, reduced motion, dark/light) before moving on.
- **Do not rely on model memory**: research current (2026) techniques, libraries and ideas; verify versions.
- Produce this handoff so a fresh agent can continue efficiently if his Fable 5.1 usage limit is hit.
- He authorized creating a new folder and a new GitHub repo.

## 1. Where things are

| Thing | Location |
|---|---|
| New project (this repo) | `C:\Users\malik\Desktop\DigitalHub\malik-halimeh-portfolio` |
| Verified facts about Malik and every project (single source of truth for copy) | `docs/CONTENT_FACTS.md` |
| Research reports (read before designing anything) | `docs/research/01-design-trends-and-hiring.md`, `docs/research/02-stack-2026.md`, `docs/research/03-interactive-features.md` |
| Source screenshots + headshot | `docs/assets-source/` (ChargeHub 5, InsightFlow 5, OptiCart 8, `ProfilePic.png` 1250x1250) |
| Old asset folder (not a git checkout) | `C:\Users\malik\Desktop\DigitalHub\Portfolio` (also has a 3.8 MB screen recording `Recording 2026-09-01 202810.mp4` of a project walkthrough, and two "taste" screenshots in `typography-screenshots/`) |
| Project source code for fact checking | `C:\Users\malik\Desktop\DigitalHub\{Tawzeevo, EVCharging-System\EVCharging-System, OptiCart, InsightFlow, InterviewMock, SobohNet}` |
| CV (docx + rendered PNG) | `C:\Users\malik\Desktop\DigitalHub\CV\` |
| Cedar wallpaper image + prompt (brand motif reference) | `C:\Users\malik\Desktop\DigitalHub\Images\cedar-of-possibility.png` |
| GitHub | `gh` CLI is authenticated as `malik-halimeh`. Git identity configured. |
| Tooling on this machine | Node 22.21.0, npm 11.14.1, no pnpm, Chrome installed (Lighthouse OK), Playwright Chromium present, Python available |

## 2. Design direction (decided; do not re-litigate without Malik)

**Design read:** solo full-stack engineer portfolio for hiring managers, engineering interviewers and MENA clients, with an editorial "engineering notebook" language, leaning toward Next.js 16 + Tailwind 4 + Motion, dark-first with one accent, distinctive typography, zero template look.

**Dials (design-taste skill):** DESIGN_VARIANCE 7, MOTION_INTENSITY 6, VISUAL_DENSITY 4.

**Concept: "The Ledger."** Malik's real engineering signature across every project is *guarantees*: append-only ledgers, state machines with explicit transitions, exactly-once sync, conflict-free-by-constraint, verification harnesses. The portfolio is built on the same idea. Each project is presented as a case study with four fixed parts:
1. **The problem** (one paragraph, plain language).
2. **Guarantees** (the invariants he enforced: "no double-booking by database constraint", "financial history is append-only").
3. **Decisions** (3-5 ADR-style entries: choice, rejected alternative, consequence).
4. **Evidence** (test counts, verification harness results, live demo or honest status, commit share in team repos).
Plus **margin notes** (toggleable annotations with his honest first-person commentary) and, where it earns its place, an **interactive artifact** (state machine, architecture diagram, before/after, sandbox).

Why this wins (from research 01): hiring managers say they want "how you think", process, outcomes first, and honesty about failures; the award-winning 3D sites lose on usability; Brittany-Chiang-style templates are imitated by thousands. Nobody in the 2026 roundups combines editorial typography + decision-log case studies + live proof + one signature interaction.

**Signature interactions (ship polished, in this priority):**
1. **ChargeHub lifecycle playground**: the real 11-state reservation machine; visitor fires events (commit deposit, check in, start charging, request extension, end early, sweep clock) and sees legal transitions animate and illegal ones rejected with the real error name (`INVALID_TRANSITION`, `USE_COMMITMENT_ENDPOINT`), plus the "why no double-booking" unique-index explainer. Transition facts are in section 6.
2. **Annotations toggle** (site-wide "Margin notes: on/off"): reveals Malik's first-person notes beside case-study paragraphs. Persisted in localStorage. Inspired by mariavasilyeva.com's Annotations On/Off.
3. **Cmd/Ctrl+K palette** with real actions: go to a project, copy email, download CV, switch English/Arabic, toggle theme, toggle annotations, open GitHub/LinkedIn, WhatsApp.
4. **Live proof strip**: GitHub contributions (cached route handler, GraphQL), health pings of deployed demos with honest "waking up on free tier, ~30 s" state, "last updated" stamp from git.

**Avoid list (hard):** purple/cyan gradients, glass cards, mesh/aurora blobs, generic noise overlay, bento homepage, three/six identical cards, typewriter hero, terminal or OS skin, skill bars or percentages, logo walls, custom cursor, preloader, contact form as the only contact, "coming soon", em-dashes anywhere in visible text, Inter as body font, section-number eyebrows, scroll cues, fake metrics, invented testimonials.

**Palette (dark-first, dual mode, semantic tokens in `app/globals.css` via Tailwind 4 `@theme`):**
- Dark: background ink `oklch(0.16 0.012 260)`, surface `oklch(0.20 0.012 260)`, text `oklch(0.95 0.005 80)` (warm off-white), muted text `oklch(0.70 0.01 260)`, hairline `oklch(0.30 0.01 260)`.
- Light: background paper `oklch(0.975 0.006 85)`, surface `oklch(0.95 0.008 85)`, text ink `oklch(0.20 0.012 260)`, muted `oklch(0.45 0.01 260)`.
- **One accent, cedar green** `oklch(0.74 0.16 158)` dark / `oklch(0.52 0.15 158)` light. Meaning: the Lebanon cedar (his wallpaper motif) and the colour of a passing check. Used for links, focus rings, the single primary CTA, state-machine "legal transition", status "live". Danger/rejection uses a desaturated red `oklch(0.65 0.18 25)` only inside the playground and error states.
- Never pure #000 or #fff. Shadows tinted to background. Corner radius system: **4px everywhere** (sharp-ish editorial), pills only for status chips.

**Typography (self-hosted via `next/font/google`, variable, `font-display: swap`, size-adjusted fallbacks):**
- Display + body Latin: **Archivo** (Google Fonts, variable with both `wght` 100-900 and `wdth` 62-125 axes, loaded via `next/font/google` with `axes: ['wdth']`). Headlines use weight 700-800 at width ~80-88 (condensed, poster-like: matches Malik's saved taste screenshot of a heavy condensed grotesk headline with light body), body uses width 100 at weight 400, 17px/1.6, `max-w-[65ch]`. One family, two axes, one font file. Research 02 flags Inter/Geist/Space Grotesk/Manrope/DM Sans/Outfit and now Bricolage Grotesque as template-looking; Archivo is mature, under-used on portfolios, and its width axis gives a distinctive voice.
- Mono (metadata, code, state names, numbers): **JetBrains Mono**.
- Arabic (`/ar` only): **Readex Pro** (Google Fonts, Lexend-method legibility, pairs with a grotesk). Load only for the active locale. Larger line-height for Arabic (1.8).
- Emphasis inside headlines: same family italic/weight, never a different family.
- One oversized type moment only: the hero headline. Elsewhere hierarchy by weight and colour, not scale.

**Motion rules:** Motion (`motion/react`) for UI and in-view reveals, GSAP only if a pinned sequence is truly needed (currently none planned). `transform`/`opacity` only. Every animation justified (hierarchy, storytelling, feedback, state). `useReducedMotion` everywhere; under reduced motion everything is instant. No scroll listeners; `useScroll`/IntersectionObserver/CSS scroll-driven only. Lenis smooth scroll is **not** used (hurts a11y and INP; research 02).

**Imagery:** real screenshots from `docs/assets-source/` (convert to AVIF/WebP, max 1600 px wide, `next/image` with explicit sizes). Headshot used once, small, in About. No AI-generated imagery on the site. The cedar wallpaper is a motif reference only (do not embed it).

## 3. Stack (verified 2026-10-11 against npm; see research 02 for reasoning)

| Package | Version | Use |
|---|---|---|
| next | 16.4.0 | App Router, Turbopack, static where possible, route handlers for GitHub/health/chat/MCP/OG |
| react / react-dom | 19.3.0 | |
| tailwindcss + @tailwindcss/postcss | 4.3.3 | CSS-first config, `@theme`, container queries |
| motion | 14.1.0 | `motion/react` |
| gsap | 3.15.0 | only if needed (free incl. SplitText) |
| next-intl | 4.14.9 | `/en` default (unprefixed) + `/ar` with `lang`/`dir`, hreflang |
| @xyflow/react | 12.12.0 | Tawzeevo architecture diagram (state machine is hand-built SVG + Motion, lighter) |
| cmdk | 1.1.1 | command palette |
| @phosphor-icons/react | 2.1.10 | the only icon family, `weight="regular"` |
| zod | 4.6.5 | validating route-handler inputs |
| @anthropic-ai/sdk | 0.133.0 | "Ask my portfolio" (optional, needs `ANTHROPIC_API_KEY`; must degrade to extractive answers without it) |
| @vercel/og (or `next/og`) | 1.0.3 | OG images per page |
| mcp-handler (Vercel) or @modelcontextprotocol/sdk | check latest | `/mcp` route exposing profile tools (phase 4) |

Deploy target: **Vercel** (free Hobby tier, Next.js native, OG + route handlers work). Custom domain is Malik's decision (suggest `malikhalimeh.dev` or `.com`). Analytics: Vercel Web Analytics (privacy-friendly) or none. Contact: no form; email as text with copy button, WhatsApp deep link, LinkedIn, optional Cal.com later.

Commands (Windows, PowerShell or Git Bash):
```bash
cd "C:/Users/malik/Desktop/DigitalHub/malik-halimeh-portfolio" && npm install && npm run dev
```
```bash
cd "C:/Users/malik/Desktop/DigitalHub/malik-halimeh-portfolio" && npm run build && npm run lint && npm run typecheck
```

## 4. Information architecture

```
/                     Home (single long page, the 10-second read + the deep hooks)
/work/tawzeevo        Case study 1 (flagship, live demo)
/work/chargehub       Case study 2 (lifecycle playground)
/work/opticart        Case study 3
/work/insightflow     Case study 4
/work/interview-lab   Case study 5
/work/sobohnet        Case study 6 (client work, live preview)
/about                Story (today / before / in the background), how I work, how I use AI, values
/now                  What I'm doing this month (dated, auto "last updated")
/resume               HTML resume + PDF download + vCard + JSON (/resume.json)
/colophon             How this site is built (stack, perf budget, a11y, the decisions) = mini case study
/ar, /ar/work/..., /ar/about   Arabic shell: nav, home, about, project summaries (deep case studies stay English with a note)
/api/github           cached contributions (GraphQL, 1 h revalidate)
/api/health?url=      cached health ping for demos (no user-supplied arbitrary URLs: allowlist)
/api/ask              Ask-my-portfolio (BM25 over docs/CONTENT_FACTS.md-derived passages, Haiku 4.5 if key present, extractive fallback, caps)
/mcp                  MCP server: get_profile, list_projects, get_project, get_skills, evaluate_job_fit (phase 4)
/opengraph-image      generated OG per route
/sitemap.xml, /robots.txt, /llms.txt, /resume.json, /.well-known (optional)
```

## 5. Section-by-section spec (home page)

Each section lists: purpose, exact content source, components, every interactive element and its states, mobile rule, motion, a11y. Section layout families must all differ (no two sections share a layout).

### 5.1 Navigation (sticky, 64px, one line)
- Left: wordmark "Malik Halimeh" (text, Bricolage 600). Right: Work, About, Now, Resume, then a `⌘K` button (shows "Ctrl K" on Windows), theme toggle (sun/moon Phosphor), language toggle "عربي" / "English".
- Mobile (<768): wordmark + palette button + hamburger opening a full-height sheet with the same links, large tap targets (48px).
- States: hover underline-offset animation on links; current route marked with accent underline and `aria-current="page"`; focus-visible ring in accent; the sticky bar gains a hairline + backdrop only after scrolling 24px (use IntersectionObserver sentinel, not scroll listener).
- Skip link "Skip to content" as first focusable element.

### 5.2 Hero (asymmetric split, fits viewport, max 4 text elements)
- Headline (2 lines max, the one oversized type moment): **"I build systems that refuse to lose data."** Alternative if Malik prefers less dramatic: "Full-stack engineer who ships guarantees, not just features."
- Subtext (≤ 20 words): "Full-stack developer in Saida, Lebanon. TypeScript and Python. Multi-tenant SaaS, state machines, offline-first sync, bilingual interfaces."
- CTAs: primary "See the work" (anchor to 5.3), secondary "Email me" (copies `malikhalimeh37@gmail.com` to clipboard with toast "Copied" and also `mailto:` fallback on long-press/keyboard).
- Right column (desktop): a live, *real* mini-artifact, not decoration: the ChargeHub state machine in "ambient" mode (auto-steps through the happy path slowly, pauses on hover, click opens the full playground on `/work/chargehub`). On mobile it sits below the text, reduced to a static diagram. Under reduced motion: static.
- Below the fold boundary, nothing else in the hero (no trust strip, no scroll cue).

### 5.3 Selected work (the 60-second read; layout: editorial list, not cards)
- Six entries, ordered: Tawzeevo, ChargeHub, OptiCart, InsightFlow, Interview Lab, SobohNet. Each row: outcome-led title line (e.g. "Tawzeevo: a multi-tenant Cash Van SaaS with append-only money and offline exactly-once sync"), one-line role + year + stack in mono, status chip (Live demo / Source / Private continuation / Offline), and a 16:10 screenshot that appears on hover (desktop) or inline (mobile).
- Whole row is a link to `/work/<slug>`; hover shifts the arrow icon 4px; focus ring visible.
- First entry (Tawzeevo) is expanded by default as a "featured" block with a 2-sentence summary and the live demo button (with the wake-up notice).

### 5.4 Guarantees I ship (how I think; layout: two-column definition list with margin notes)
- 5 items derived from real work, each with a one-line proof link to the project: "Conflict-free by constraint, not by hope" (ChargeHub unique occupancy index); "Money is append-only" (Tawzeevo ledgers); "Offline is a first-class state" (Tawzeevo outbox exactly-once); "Least privilege by default" (Tawzeevo driver scope, OptiCart roles); "Verified, not assumed" (182/182 checks, 388 backend tests, Playwright).
- This replaces any skills bars. Hiring managers read this to learn how he thinks.

### 5.5 Stack, with proof (layout: grouped chips; no logos, no bars)
- Groups from CV: Languages, Frontend, Backend and data, Testing and architecture, Delivery and AI. Each chip is a button that opens a small popover: "Used in: Tawzeevo, ChargeHub" with links and "last used 2026". Unproven items are simply not listed.
- Mobile: chips wrap; popover becomes a bottom sheet.

### 5.6 Live proof (layout: single horizontal strip of 3 facts)
- "628 contributions in the last year" (fetched, cached, falls back to the last known number at build time), "Tawzeevo demo: live" (health ping with waking state), "This site: last updated <date from git>, Lighthouse scores <from colophon>".
- Each fact links somewhere real (GitHub, demo, colophon). Loading state is a skeleton the same size; error state shows the last known value with "(cached)".

### 5.7 About, short (layout: text block + small headshot, left-aligned)
- 3-5 lines of value proposition (The Muse: 2-5 lines), honest timeline sentence "CS degree 2020, full-stack and AI intern at the UNRWA Digital Hub since May 2026", link to `/about`.

### 5.8 Contact (one CTA intent, not duplicated elsewhere)
- Headline "Hiring, or building something?" Email as visible text + copy button; WhatsApp link (`https://wa.me/96176719893`), LinkedIn, GitHub; "Download CV (PDF, updated <date>)"; availability line driven by `data/profile.ts` (`availability: "open"`). No form.

### 5.9 Footer
- Wordmark, Colophon link, Now link, language toggle, "Built with Next.js 16, deployed on Vercel" (plain, one line), no version footer.

Global: `⌘K` palette (5.10), annotations toggle (appears only on case-study pages and the Guarantees section), toast system (one at a time, bottom-center, 2.5 s, `aria-live="polite"`), 404 page with the state machine in "RELEASED" state as a joke, styled `console.log` hiring message, Konami code → terminal easter egg (phase 4, optional).

## 6. Case study spec (`/work/[slug]`)

Shared template: title + outcome line, meta table (role, team, period, stack, links, status), hero screenshot, then the four fixed parts (Problem, Guarantees, Decisions, Evidence), optional Interactive artifact, "What I'd do differently", "Next project" link. Margin notes appear beside paragraphs when annotations are on (on desktop as true sidenotes in a right gutter; on mobile as inline collapsible notes with a ⊕ button).

Per-project content source: `docs/CONTENT_FACTS.md` (sections 1-6). Draft copy lives in `content/work/*.mdx` or `data/work.ts` (decide once; MDX via `@next/mdx` is fine for prose + components).

**ChargeHub lifecycle facts (verified in `backend/src/models/reservationLifecycle.ts` and services):**
- States (11): `PENDING_PAYMENT`, `RESERVED`, `ARRIVED`, `CHARGING`, `LATE`, `AT_RISK`, `EXTENSION_REQUESTED`, `COMPLETED`, `CANCELLED`, `NO_SHOW`, `RELEASED`.
- Holding states (occupy the interval, mirrored by the partial unique index): `PENDING_PAYMENT, RESERVED, ARRIVED, CHARGING, LATE, AT_RISK, EXTENSION_REQUESTED`.
- Transitions observed in services: `PENDING_PAYMENT → RESERVED` (deposit committed via commitment endpoint; `pending → confirmed` through the plain update route throws `USE_COMMITMENT_ENDPOINT`); `PENDING_PAYMENT → CANCELLED` (decline, forfeit, or hold window of 10 minutes expires); `RESERVED → ARRIVED` (check-in; arrival classified ON_TIME/EARLY/GRACE/LATE); `RESERVED/LATE/AT_RISK → NO_SHOW` (automatic sweep after grace 15 min + threshold 30 min, or manual; atomic `findOneAndUpdate` claim conditioned on lifecycle still in `[RESERVED, LATE, AT_RISK]`); `RESERVED → LATE → AT_RISK` (time sweeps past scheduled start and past grace); `LATE/AT_RISK → ARRIVED` (late check-in); `ARRIVED → CHARGING` (start charging); `CHARGING → EXTENSION_REQUESTED → CHARGING` (extension request resolved: approved, partial, rejected; max 2 per reservation); `CHARGING → COMPLETED` (end charging; ending early emits `reservation.released` with reason `EARLY_DEPARTURE` and frees the remaining atoms); `RESERVED (and other pre-charging holding states) → CANCELLED` (driver cancel with truthful refund quote: 100% at 24 h+ notice, 0% inside, operator-fault waiver always refunds); cancelling while `CHARGING` is rejected (must end the session). `RELEASED` = interval deliberately returned to availability by staff/operator action. Legacy status map: PENDING_PAYMENT→pending; RESERVED/ARRIVED/CHARGING/LATE/AT_RISK/EXTENSION_REQUESTED→confirmed; COMPLETED→completed; NO_SHOW→no_show; CANCELLED/RELEASED→cancelled.
- Illegal examples to show: `COMPLETED → anything`, `CANCELLED → RESERVED`, `PENDING_PAYMENT → CHARGING`, `CHARGING → CANCELLED` (error: must end session), `pending → confirmed` via update route (error `USE_COMMITMENT_ENDPOINT`).
- Concurrency explainer: one row per 15-minute occupancy atom with a unique index (charger, atom); a second booking for an overlapping atom fails at the database, not in application code.

## 7. Content and copy rules

- Every number must come from `docs/CONTENT_FACTS.md`. If a better number exists in a repo, verify it, then update the facts file first.
- No em-dashes or en-dashes in visible text. Use periods, commas, colons, or a hyphen.
- Plain, confident, specific. No "passionate", "seamless", "cutting-edge", "elevate". One copy register across the site.
- Honest status everywhere: Tawzeevo demo is a synthetic role gallery (say so); OptiCart and InsightFlow Render deployments are offline (say "source only" unless redeployed); ChargeHub team repo is public, his continuation private.
- Arabic copy must be written by a competent Arabic writer (Malik is native: hand him the English strings in `messages/en.json` and ask him to review `messages/ar.json`, which the agent drafts).

## 8. Quality gates (every section, before marking done)

1. Copy self-audit: read every visible string; no broken grammar, no AI-cute phrasing.
2. Both themes checked in the browser; contrast AA (body 4.5:1, large 3:1).
3. 360px, 768px, 1280px, 1920px layouts checked; no horizontal scroll; tap targets ≥ 44px.
4. Keyboard: every control reachable and operable; visible focus; Escape closes overlays; focus trapped in palette/sheet and returned on close.
5. `prefers-reduced-motion`: nothing moves except opacity fades ≤ 150 ms.
6. Lighthouse (mobile) ≥ 95 performance, 100 accessibility, 100 best practices, 100 SEO on `/` and one case study. Record scores in `/colophon`.
7. `npm run build`, `npm run lint`, `npm run typecheck` clean.
8. Design-taste pre-flight (section 14 of the skill) run mentally: eyebrows ≤ ceil(sections/3), no duplicate CTA intent, no repeated layout family, no em-dashes.
9. Commit with a clear message after each section; push to the new GitHub repo.

## 9. Phases and progress checklist

Update the boxes. Keep notes short. Date each completed item.

### Phase 0: discovery and research (DONE 2026-10-11)
- [x] Inspected workspace, old repo, CV, every project folder and GitHub repo; wrote `docs/CONTENT_FACTS.md`.
- [x] Three research reports in `docs/research/`.
- [x] Design direction, stack, IA, section spec (this file).

### Phase 1: foundation (DONE 2026-10-11, commits f44aaf7..dcf851f)
- [x] Next.js 16.4 app (Cache Components, React Compiler, Turbopack Tailwind loader), tokens in `app/globals.css`, fonts in `lib/fonts.ts`, `data/profile.ts` + `data/work.ts`, Phosphor, Motion, toast, theme provider (data-theme attribute, inline init script, useSyncExternalStore), next-intl with `app/[locale]` root layout + `proxy.ts`, README, git initialised. GitHub repo NOT yet created (see Phase 4 deploy step).
- [x] Nav, Footer, SkipLink, Container, Section, ThemeToggle, Toast, CommandPalette (real actions).
- Note: the dev-server launch config lives in `DigitalHub/.claude/launch.json` (session cwd) and runs `npm run dev --prefix malik-halimeh-portfolio`.

### Phase 2: home page, section by section (DONE 2026-10-11 except gates)
- [x] 5.2 Hero with ambient lifecycle diagram (`components/lifecycle/*`, machine in `lib/chargehub-machine.ts`)
- [x] 5.3 Selected work list with sticky preview (`components/home/WorkList.tsx`); images in `public/work/*.webp` via `scripts/images.py` (Pillow)
- [x] 5.4 Guarantees, 5.5 Stack with proof, 5.6 Live proof (`lib/github.ts` with 'use cache', `app/api/health/route.ts` allowlisted), 5.7 About short, 5.8 Contact
- [ ] Home quality gates: Lighthouse not yet measured; 360/768/1280 checked visually in dev; keyboard pass pending
- Known local quirk: `/api/health` returns `unknown` on this Windows machine ("unable to verify the first certificate" from the dev server's fetch); works from plain Node and will work on Vercel. The UI shows "Status unavailable" in that case, never "offline".

### Phase 3: case studies and pages (DONE 2026-10-11, commit 582cf4a; polish pending)
- [x] Case study template (`components/work/CaseStudy.tsx`), margin notes (`components/annotations/Annotations.tsx`, localStorage key `mh-annotations`)
- [x] `/work/chargehub` lifecycle playground (`components/lifecycle/LifecyclePlayground.tsx`)
- [x] `/work/tawzeevo` architecture map (hand-built SVG, `components/work/TawzeevoArchitecture.tsx`; React Flow not installed, see D-09)
- [x] `/work/insightflow` CSV to dashboard compare slider, `/work/interview-lab` Rasch EAP sandbox (`components/work/RaschSandbox.tsx`, no Sandpack, see D-10), opticart, sobohnet
- [x] `/about` (`data/about.ts`, bilingual), `/now`, `/resume` (+ `/resume.json`, `/vcard.vcf`, PDF in `public/`), `/colophon` (`data/colophon.ts`, Lighthouse scores still null), 404
- [x] sitemap, robots, OG images (`opengraph-image.tsx` at locale and work level), SoftwareSourceCode JSON-LD per project, `public/llms.txt`
- [ ] Person/ProfilePage JSON-LD in the layout (not yet added)
- [ ] Malik to review: `data/about.ts` has a TODO about the 2020-2026 period (nothing invented); Arabic strings in `messages/ar.json` and `data/about.ts` are drafts

### Phase 4: Arabic, AI-era extras, polish (IN PROGRESS 2026-10-11)
- [x] `/ar` shell works (RTL verified in browser for home, about; nav mirrored; Readex Pro loads only on /ar). Deep RTL audit of every page still to do.
- [x] `/api/ask` (`lib/corpus.ts` + `lib/bm25.ts` + `app/api/ask/route.ts`): extractive answers without a key; with `ANTHROPIC_API_KEY`, model answers via `@anthropic-ai/sdk` (`claude-opus-5-5` by default per the claude-api skill rule; set `ASK_MODEL=claude-haiku-5-5` for the cheapest option; caps `ASK_DAILY_CAP` / `ASK_PER_IP_CAP`). UI: `components/ask/AskPanel.tsx`, opened from the palette ("Ask" group, or type a question). Model path NOT yet exercised with a real key.
- [x] `/mcp` (`app/mcp/route.ts`, `mcp-handler` 2.3 + `@modelcontextprotocol/server` 2): tools get_profile, list_projects, get_project, get_skills, get_about, search, evaluate_job_fit. Verified with a JSON-RPC tools/list call. No `/agents` page yet (optional; the console note and colophon mention /mcp).
- [x] Person/ProfilePage/WebSite JSON-LD (`components/layout/PersonJsonLd.tsx`), console note (`components/layout/ConsoleNote.tsx`). Konami egg skipped on purpose.
- [x] GitHub repo created and pushed: https://github.com/malik-halimeh/portfolio-2026
- [x] First Lighthouse run (mobile, production build, local Windows machine): home perf 74 / a11y 96 / bp 100 / seo 100; chargehub perf 67 / a11y 89 / bp 100 / seo 92. Fixed afterwards: `--fg-faint` contrast (dark 0.66, light 0.50), CopyEmail accessible name, `Annotated as="li"` so decision lists keep list semantics, per-page canonical + hreflang via `lib/seo.ts` (the layout no longer sets alternates), cmdk palette body and Ask panel body lazy-loaded with `next/dynamic` (`CommandPaletteBody.tsx`, `AskPanelBody.tsx`), Motion switched to `LazyMotion` + `m.*` (`components/theme/MotionProvider.tsx`, strict mode: never import `motion` again, use `m`), and `data/work-index.ts` (light, client-safe) split from `data/work.ts` (case studies, server only) so prose never ships to the browser.
- [x] Second local run (after fixes): seo 100 on both pages, best practices 100, a11y 96 (one remaining contrast fail: light-theme accent `#008145` at 4.26:1 on the Decisions "Chose" label; fixed by darkening the light accent to oklch(0.46 0.14 158)). Performance numbers on this laptop are NOT trustworthy: the trace shows a single 9 s "Unattributable" long task (not JavaScript; script evaluation is ~1.7 s under the 4x throttle, total JS 437 KB transferred, down from 525 KB). See the third run below.
- [x] Third local run (clean, no stray long task): home perf 70 / a11y 96 / bp 100 / seo 100 (LCP 2.65 s, TBT 1.37 s under 4x throttle); chargehub perf 72 / a11y 96 / bp 100 / seo 100. Remaining a11y fail was the light accent on the "Chose" labels (4.26:1); light accent lowered again to oklch(0.42 0.13 158). A fourth run was started to confirm a11y 100; its result goes here if the session continued, otherwise re-run: `npx next build && npx next start -p 3001`, then `lighthouse http://localhost:3001/ --form-factor=mobile --screenEmulation.mobile --output=json` (Lighthouse 13.5 was installed in the session scratchpad, install it again with `npm i -D lighthouse` if needed).
- [ ] After the Vercel deploy: measure `/` and `/work/chargehub` with PageSpeed Insights (mobile), then fill `data/colophon.ts` `lighthouse.scores` and `measuredOn`. The colophon deliberately shows "…" until a real measurement exists. If performance is below 95 there, the next levers are: (1) make the hero diagram's `m.rect`/`m.path` plain SVG with CSS transitions, (2) drop Motion from `Nav` and `Toast` (use CSS), (3) check `@phosphor-icons/react` tree-shaking in the bundle analyzer (`npx next build --analyze` is not available; use `experimental.turbopackBundleAnalyzer` per Next 16.4 docs).
- [ ] Keyboard pass (Tab through nav, palette, playground, ask panel), 360 px pass on every page, final copy audit, Malik review of Arabic drafts and `data/about.ts` TODO
- [ ] Analytics: none installed (decide: Vercel Web Analytics is one import, `@vercel/analytics`)
- [ ] Deploy on Vercel: Malik must either `npx vercel login` then `npx vercel --prod` from the repo, or import the GitHub repo in the Vercel dashboard. Set env vars `NEXT_PUBLIC_SITE_URL` (the real URL), optionally `GITHUB_TOKEN` (read-only), `ANTHROPIC_API_KEY`, `ASK_MODEL`. After deploy: update `profile.siteUrl` fallback and `colophon.repo` if the domain changes, re-check `/api/health?target=tawzeevo` returns `up`, and submit the sitemap in Google Search Console.

## 10. Decisions log (append; never rewrite history)

- D-01 (2026-10-11): New folder and new repo instead of reusing `malik-halimeh/Portfolio`; the old repo stays untouched so the old URL keeps working until Malik retires it.
- D-02: Next.js 16 over Astro: the site needs real interactive islands (playground, palette, chat) plus route handlers and OG generation on one free host; Next is also the framework Malik is hired for, so the repo itself is evidence.
- D-03: No Lenis/smooth-scroll, no 3D, no custom cursor: research shows these cost usability and accessibility points that hiring managers notice.
- D-04: Dark-first with cedar-green accent; Archivo (variable width) + JetBrains Mono; Readex Pro for Arabic (see D-08).
- D-05: Case studies are structured as Problem / Guarantees / Decisions / Evidence with margin notes; this is the site's identity.
- D-06: Contact has no form (hiring managers prefer a visible email); WhatsApp is included because the MENA audience expects it.
- D-07 (2026-10-11): Research 02 recommended Astro 7 on Cloudflare Workers (0 KB JS default, Beirut PoP, unmetered static). Rejected for this project because: the design is interaction-heavy on every page (palette, annotations, theme, playground, chat), so React ships anyway and Astro's main advantage shrinks; Next route handlers, `next/og`, ISR-style caching and Vercel deploy are mature and the Cloudflare path for Next 16.4 is broken; the roles Malik targets are React/Next, so the repo is evidence; continuing agents have the deepest, most reliable knowledge of Next App Router. Lighthouse 100 remains the gate; if it cannot be met, revisit. Astro remains the fallback if Vercel Hobby limits or MENA latency become a problem.
- D-08: Fonts changed from Bricolage Grotesque to Archivo (variable wdth+wght) after research 02 flagged Bricolage as trending toward overused.
- D-09: Tawzeevo architecture map is a hand-built SVG in the same visual language as the lifecycle diagram, not React Flow: no 100 KB dependency, consistent look, keyboard-operable nodes.
- D-10: The Interview Lab "try it" is a 20-item Rasch EAP calculator written in the page (no Sandpack): instant, offline, and it demonstrates the actual grade formula from the app.
- D-11: Case-study prose stays English on `/ar` with a notice; nav, home, about, now, resume chrome and colophon chrome are translated. Arabic drafts need Malik's review.
