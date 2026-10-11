# Research 03 — Unique interactive features (Oct 2026)

Compiled 2026-10-11 by a research agent (~30 web searches/fetches). Verdicts are synthesis; sources inline.

## 1. "AI-era" portfolio features

**"Ask my portfolio" chat** is now common; quality varies.
- Cheapest credible build: [Harshith5299's PR #18](https://github.com/Harshith5299/portfolio/pull/18): dependency-free BM25 retrieval over hand-written passages, top-4 passages sent to Claude Haiku 4.5, Vercel serverless function, proof-of-work bot challenge, caps of 200 model calls/day and 20/visitor/day, 400-token answers, inline `[n]` citations, and an extractive fallback that answers for free when no key or the cap is hit. Copy this design: it never breaks and spend is bounded.
- Cost: Haiku 4.5 ~ $1/M input, $5/M output; ~3k in / 400 out per turn is ~$0.005/turn, so a few hundred chats/month is $5-10. Rate-limit with [Upstash Ratelimit](https://ai-sdk.dev/docs/advanced/rate-limiting).
- Fully client-side (WebLLM) is impractical for recruiters (multi-GB download, WebGPU).
- Verdict: edge function + Haiku with citations and extractive fallback = useful; a vanilla "chat with my resume" with no citations = gimmick.

**llms.txt / llms-full.txt**: cheap, but weak evidence crawlers read it. [Ahrefs 137K-domain log study (June 2026)](https://ahrefs.com/de/blog/llmstxt-study/): 97% got zero requests. [SE Ranking](https://seranking.com/blog/llms-txt/): no effect on citations. Do it in 20 minutes, mostly as the source text for the chat widget and MCP server. Examples: [Bartosz Osiej](https://dev.to/bartoszosiej/i-made-my-portfolio-readable-to-ai-crawlers-llmstxt-json-ld-and-a-40-method-distribution-stack-144p), [jonothora](https://dev.to/jonothora/i-made-my-portfolio-site-ai-agent-ready-heres-every-file-i-added-51ga).

**JSON-LD ProfilePage/Person**: [Google documents ProfilePage with mainEntity Person](https://developers.google.com/search/docs/appearance/structured-data/profile-page), plus `jobTitle`, `knowsAbout`, `sameAs`. Add `SoftwareApplication`/`SoftwareSourceCode` nodes per project referencing the Person `@id`. Useful: this is what Google and AI answer engines actually parse.

**Resume as JSON endpoint**: serve `/resume.json` conforming to [JSON Resume v1.0.0](https://jsonresume.org/schema). The win is one source of truth for site, PDF, chat widget, MCP server.

**Portfolio as MCP server**: [dev-zaid/portfolio PR #1](https://github.com/dev-zaid/portfolio/pull/1) is the best reference: Streamable-HTTP server at `/mcp`, tools `get_profile`, `get_experience`, `list_projects`, `get_skills` (mapped to where used), `evaluate_job_fit` (paste a JD, get an evidence-based rubric), rate-limited `contact` tool via Resend, and an `/agents` page with a live console. Recruiters will not connect; engineering managers might; the page itself signals AI-native competence.

**Do recruiters use AI?** [Resume Genius 2026 (n=1,500)](https://resumegenius.com/blog/job-hunting/ai-impact-on-hiring-2026): 87% use AI somewhere, 58% to screen resumes, 82% worry about candidate AI use. [Paylocity 2026](https://www.paylocity.com/resources/learn/articles/state-of-employee-recruitment/): 91% use AI. [LinkedIn Hiring Assistant](https://business.linkedin.com/hire/product-update/wave1-2026) evaluates profiles and resumes; no source shows it opening external portfolio links. Implication: the portfolio is for the human second look and the engineering interviewer.

## 2. Interaction patterns: fresh vs overused

| Pattern | Evidence | 2026 verdict |
|---|---|---|
| Command palette (Cmd/Ctrl+K) | [cmdk 1.1.1](https://snyk.io/advisor/npm-package/cmdk) (~4.5M weekly downloads, powers shadcn Command); rare on portfolios | Fresh if actions are real (copy email, switch /ar, open project, download CV) |
| Terminal portfolio | Dozens of templates; 2026 roundups warn it "risks looking dated" | Overused as the whole site; fine as hidden mode |
| OS-desktop portfolio | [PortfolioOS](https://portfolio-os-beta.vercel.app/) | Overused, hostile to mobile and recruiter scanning |
| Interactive 3D hero | Bruno Simon won Awwwards SOTM Jan 2026, but thousands of template clones | Overused for full-stack; only if 3D is the job |
| Custom cursor | Reviewers consistently call it annoying | Avoid |
| Magnetic buttons, SplitText, ScrambleText | GSAP plugins free since 3.13 (Apr 2025); current 3.15 | Scramble on hero = borderline overused; one restrained SplitText reveal fine |
| Scroll-pinned horizontal case study | GSAP ScrollTrigger pattern | Agency-overused; hurts skimmability |
| Scroll-scrubbed video | WebP frame sequences on canvas | Heavy; only one flagship demo |
| Live widgets | react-github-calendar; Spotify now-playing; [Open-Meteo](https://open-meteo.com/) free, no key, `timezone=Asia/Beirut`; [Better Stack status badge](https://betterstack.com/docs/uptime/working-with-status-pages/embeddable-status-badge.md) | GitHub graph and Spotify overused; uptime of own apps fresh and credible |
| Easter eggs | Konami via small listener; styled console.log recruiting messages | Console message cheap and harmless; Konami to hidden terminal nice |

## 3. Projects as deep interactive case studies

- Clickable architecture diagrams: [@xyflow/react 12.10.x](https://www.npmjs.com/package/@xyflow/react) (MIT); nodes are React components. Use for the Tawzeevo tenant request path (tenant resolution → RLS policy → row). Static alternative: Mermaid 11.15+.
- State-machine visualizer: the ChargeHub 11-state lifecycle is the single strongest artifact. Hand-build in React Flow (or plain SVG) with a "fire event" panel so the visitor steps through states and sees illegal transitions rejected; show the unique-index concurrency guard.
- "Try it live" sandboxes: [@codesandbox/sandpack-react 2.20](https://classic.yarnpkg.com/en/package/@codesandbox/sandpack-react) (Apache-2.0, client-only in Next). Best fit: the Rasch scoring function from Interview Lab with editable inputs.
- API playground: [Scalar](https://github.com/scalar/scalar) one script tag with OpenAPI, built-in "send request".
- Schema explorer: [dbdiagram embed](https://docs.dbdiagram.io/) takes DBML in URL fragment; [Liam ERD](https://liambx.com/blog/liam-erd-introduction) generates interactive ERDs. Show RLS-protected tables with policy text on hover.
- Before/after sliders: [react-compare-slider](https://github.com/nerdyman/react-compare-slider) v3, zero-dependency, keyboard accessible. Good for InsightFlow (raw CSV → dashboard).
- Annotated hotspots: positioned `<button>` list over an `<img>` with a popover is enough.

## 4. Skills without bars or logo walls

- Personal tech radar: [tty4.dev skill radar](https://tty4.dev/no-category/skill-radar/) rings "Profound / Adopting / Interested"; qualitative labels beat "80% Kubernetes". [Dustin Ewers](https://dustinewers.com/building-tech-radars-for-fun-and-profit/).
- Proof-linked skills: hiring guides agree a skill list "without projects demonstrating their use is meaningless" ([index.dev](https://www.index.dev/blog/evaluate-freelance-developer-portfolio)). Each skill links to one file/commit/PR and carries a "last used" year.
- "What I'd reach for" decision table: no portfolio precedent found, which is exactly why it reads as senior ("Multi-tenant isolation → Postgres RLS over schema-per-tenant because...").
- Stack timeline: 2020 degree → 2026 UNRWA Digital Hub, with what each project forced him to learn.

## 5. About / story / AI workflow

- Honest career narrative: one-line through-line, neutral factual statement of the 2020→2026 gap tied to something built, no apology ([slategit](https://slategit.com/blog/portfolio-explaining-career-gap-without-apology), [hyperskill 2026](https://hyperskill.org/blog/post/building-a-developer-portfolio-in-2026-what-actually-gets-attention)).
- /now page: [sive.rs/now](https://sive.rs/now3), [nownownow.com](https://nownownow.com); automate a "last updated" stamp from git. /uses page: [uses.tech](https://uses.tech).
- "How I use AI" section, evidence it matters: [Stack Overflow 2026 survey](https://survey.stackoverflow.co/2026/ai): 83% of devs use AI, 73% daily; Claude Code 66% and Copilot 59% lead; only 48% trust AI when they can easily validate; 79% rate source attribution important. Hiring managers 82% concerned about candidate AI use. Practitioner guidance: show tool + one prompt that evolved after a bad output + validation method, never a logo badge. The differentiator is verification discipline, not usage.

## 6. Contact / CTA

- Cal.com: [@calcom/embed-react 1.5.x](https://npmjs.com/package/@calcom/embed-react), inline/modal/floating, prefill, theme.
- WhatsApp: `https://wa.me/961XXXXXXXX?text=<encoded>`; Pew: 84% of Lebanese adults use WhatsApp. Essential for MENA clients; secondary for international recruiters.
- Copy-email + toast, vCard (`.vcf` v4.0, UTF-8), PDF CV generated from the same JSON with a build-time "last updated" stamp.
- Availability indicator driven from a single `availability` field in the resume data so it cannot go stale.

## 7. Bilingual EN/AR

- Do it as a secondary track: Gulf IT hiring up 30% YoY ([foundit Aug 2026](https://www.founditgulf.com/career-advice/foundit-insights-tracker-gulf-aug-2026/)); for US/EU remote roles the Arabic version proves i18n/RTL competence. Translate shell + about + project summaries; keep deep case studies English with a note.
- Routes: `/en` and `/ar` prefixes via `app/[locale]/`, `lang` + `dir` set in the locale layout; cookie-only switching leaves Arabic un-indexed. next-intl 4.13.x.
- hreflang: `alternates.languages` in `generateMetadata`, absolute URLs, reciprocal, `x-default` → English.
- RTL: Tailwind logical utilities (`ms-/me-/ps-/pe-/text-start`), mirror only directional icons, `<bdi>` for Latin identifiers inside Arabic, larger line-height, one numeral convention via `Intl.NumberFormat`.
- Typography: one font per script via `next/font`, load only the active locale's. Readex Pro (Lexend-method Arabic), Noto Naskh Arabic for body, Cairo for headings; IBM Plex Sans Arabic considered overused by some. Pair a grotesque Latin with a sans Arabic.

## Ranked: 12 features for THIS portfolio

1. Interactive ChargeHub booking state machine (fire events, see rejected transitions and the concurrency guard).
2. Single resume/profile data source feeding site, `/resume.json`, PDF CV with "last updated", vCard, chat, MCP, JSON-LD.
3. "Ask my portfolio" with citations + extractive fallback (Haiku 4.5, BM25, caps, proof-of-work).
4. Proof-linked skills radar (Profound/Adopting/Interested; every item → file/commit; "last used" year; mobile list view).
5. "How I use AI" section with verification evidence.
6. Clickable Tawzeevo multi-tenant architecture + RLS schema explorer.
7. Live uptime badges for deployed apps.
8. Portfolio MCP server + `/agents` page with `evaluate_job_fit`.
9. Cmd+K command palette with real actions.
10. Bilingual `/ar` with proper hreflang/RTL.
11. Sandpack "try it" for the Rasch scoring function + Scalar playground against a seeded demo API.
12. Contact stack: Cal.com inline, copy-email toast, wa.me, vCard, availability driven by data; styled console.log and Konami → hidden terminal as the only easter eggs.

**Skip:** full terminal/OS-desktop UI, 3D hero, custom cursor, preloader, Spotify/GitHub-graph widgets, progress bars, logo walls, scroll-pinned horizontal case studies.
