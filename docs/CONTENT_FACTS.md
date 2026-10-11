# CONTENT FACTS — single source of truth for Malik Halimeh's portfolio

Every claim below was verified on 2026-10-11 against the CV (`DigitalHub/CV/Malik_Halimeh_Full_Stack_Developer_CV.docx`), local project folders under `C:\Users\malik\Desktop\DigitalHub\`, and the GitHub API. **Never invent numbers, clients, or outcomes.** If a fact is not here, ask Malik or read the project repo.

## Identity

| Field | Value |
|---|---|
| Name | Malik Halimeh |
| Title (CV) | Full-Stack Developer |
| Location | Saida, Lebanon (Asia/Beirut, UTC+2/+3) |
| Email | malikhalimeh37@gmail.com |
| Phone | +961 76 719 893 (WhatsApp-capable; confirm before publishing phone publicly) |
| GitHub | https://github.com/malik-halimeh (user id 115508879, joined Oct 2022, 23 repos incl. private, 17 public) |
| LinkedIn | https://www.linkedin.com/in/malik-halimeh |
| Languages | Arabic (native), English (fluent) |
| Degree | B.S. Computer Science, Lebanese International University, Saida, 2016–2020 |
| Internship | Full-Stack Web Development & AI Intern, The Digital Hub (UNRWA), May 2026 – Oct 2026. **Completed; certificate received (told by Malik, 2026-10-11).** |
| Headshot | `DigitalHub/Portfolio/ProfilePic.png` (1250×1250, navy blazer, light-blue shirt, grey studio background) |
| GitHub activity (last 12 months, 2026-10-11) | 628 contributions, 577 commits |

## Positioning (derived from CV, confirmed by the repos)

- Builds **secure, production-style** applications across **TypeScript (React/Next.js/Vue/Nuxt/Node)** and **Python (FastAPI/Django)** stacks.
- Specialities that recur in every project: **multi-tenancy**, **role-based access**, **concurrency-safe workflows** (unique indexes, idempotency, exactly-once), **bilingual EN/AR + RTL interfaces**, **automated verification** (tests, CI gates, verification harnesses).
- Works **AI-native**: plans projects as phase documents + decision logs, uses review-led coding agents (Codex, Aider, Claude), and documents everything so any engineer or agent can continue (`AGENTS.md`, `CLAUDE.md`, `PHASE_xx.md` in every repo).
- Leads: project lead on InsightFlow (5 people) and OptiCart (3 people); primary developer on ChargeHub (89 of 94 commits).

## Skills (from CV — use only these)

- **Languages:** JavaScript (ES6+), TypeScript, Python, SQL, HTML5, CSS3 (+ PHP/Laravel in the private iStudy/cedra project, Oct 2026)
- **Frontend:** React, Next.js, Vue 3, Nuxt 4, Zustand, TanStack Query, Tailwind CSS, SSR/CSR/SSG, PWA, Core Web Vitals, SEO, i18n/RTL
- **Backend/Data/Security:** Node.js, Express.js, FastAPI, Django REST Framework, REST APIs, MySQL, PostgreSQL, MongoDB/Mongoose, Supabase, JWT, secure cookies, RBAC, PostgreSQL RLS
- **Testing/Architecture:** Jest, Vitest, pytest, React Testing Library, Playwright, unit/integration testing, SOLID, clean architecture, design patterns, scalable system design
- **Delivery/AI:** Git/GitHub, Jira, branching, PRs, code reviews, GitHub Actions, CI/CD, Docker Compose, Postman, Vercel, Render, Cloudflare; LLMs, prompt engineering, AI/Cognitive API integration; review-led Codex/Aider

## Projects (ordered by strength)

### 1. Tawzeevo — multi-tenant Cash Van operations SaaS (sole developer & product owner, 2026–present)
- Repo: https://github.com/malik-halimeh/Tawzeevo (public). Languages: Python 2.37 MB, TypeScript 1.63 MB.
- **Live demo (verified 200 on 2026-10-11):** https://tawzeevo-malik-halimeh.onrender.com/demo — a synthetic, frontend-only role gallery: Guest → Customer → Owner → Driver, with Arabic/RTL toggle and "Reset preview". Hosted on Render free tier (first load may take ~30–50 s to wake; show a "waking the server" notice).
- Stack: Python 3.13, FastAPI, SQLAlchemy 2, Alembic, Pydantic v2, PostgreSQL 16+ (psycopg 3), Argon2id (pwdlib), PyJWT; React 19 + TypeScript strict + Vite + React Router + TanStack Query + React Hook Form + Zod + i18next (operations PWA); Next.js App Router storefront (EN/AR); pytest against real PostgreSQL, Vitest + Testing Library, Playwright, Ruff, mypy strict.
- Scale: 10 phases planned, **phases 1–8 complete**, phase 9 (production hardening, CI/CD, staging, multi-tenant pilot) in progress; phase 10 (forecasting) planned.
- Verified on 2026-09-25 (from `03_IMPLEMENTATION_STATUS.md`): **backend 388 tests passing**, ruff/format/mypy clean; operations-web **149 unit tests**, lint/typecheck/build pass; **Playwright 11/11**. (CV's older figure: 70 backend tests, 94% statement coverage — superseded.)
- Key engineering facts worth showcasing:
  - Every business-owned table carries `business_id` and is protected by **PostgreSQL row-level security**.
  - **Financial history is append-only**: immutable invoice revisions, server-assigned official numbers `YYYY-000001`, append-only customer ledger per currency, compensating reversals, never sums across currencies, Decimal arithmetic only.
  - **Offline-first PWA with exactly-once sync**: device outbox, operation id + request fingerprint, replay returns stored result, conflicts surfaced not merged, ordered incremental pull with tombstones, device leases.
  - **Encrypted disaster-recovery backup** to the owner's own Google Drive: AES-256-GCM, per-business keys wrapped by a master key, retention, restore drills.
  - Driver least-privilege: drivers' API/sync/cache carry only assigned stops, never prices or profit.
  - Route assistance: OpenRouteService when configured, deterministic nearest-neighbour + 2-opt fallback.
  - Owner intelligence: daily priorities, 10 anomaly rule families, cash position/ageing; read-only AI assistant via Groq with masking and figure checks.
  - Bilingual EN/AR storefront per business at `/<slug>`, guest checkout with idempotency keys, personalized hashed customer links.
  - Product principles: no stock concept (schema-wide test guarantees it), customers never need accounts, corrections are new records.
- Honest framing: a solo, long-running product build (started 2026) for Lebanese cash-van distributors. **Update 2026-10-11 (from Malik): last touches before a production beta with a first real client who is waiting for it; next step is a Flutter app published on Google Play.** Do not name the client or give a launch date until Malik provides them. Flutter is a plan, not a shipped skill: do not add it to the stack until there is a repository.

### 2. ChargeHub — EV charging reservation platform (primary full-stack developer, team project, 2026)
- Team repo: https://github.com/AyaSulyman/EVCharging-System (public; contributors: malik-halimeh 89 commits, AyaSulyman 5). Malik's private continuation: `malik-halimeh/EVCharging-System` ("Independent ChargeHub EV charging system continuation").
- Local: `DigitalHub/EVCharging-System/EVCharging-System/`. Screenshots: `DigitalHub/Portfolio/EVChargingHub/*.png` (5 images; green brand, "Find me a slot" flexible booking form, stations Marina/Downtown/Airport).
- Stack: two Next.js apps (server-rendered client on :3000 + headless API route-handlers service on :4000), MongoDB Atlas + Mongoose, TypeScript, Tailwind CSS. No live deployment found.
- Facts:
  - Duration-aware reservations (15/30/45/60/90/120 min on a 15-minute grid), availability computed per duration, **conflict-free by database constraint** (occupancy atoms with unique indexes).
  - **11-state lifecycle**: `PENDING_PAYMENT` → `RESERVED` → `ARRIVED` → `CHARGING` → `COMPLETED`, with branches `LATE`, `AT_RISK`, `CANCELLED`, `NO_SHOW`, `RELEASED` (+ `EXPIRED` per README count). Check-in, charging start, charging end are explicit separate transitions.
  - Engines: Late Arrival (ON_TIME/EARLY/GRACE/LATE, automatic no-show), Extension Request (capped at 2, evaluated against the occupancy timeline), Overstay (WARNING → ESCALATED → ALERTED), Early-departure capacity release, Incident/Delay engines, deterministic multi-request scheduler with ranked options and reasoning, scheduler consent levels (STRICT → any time that day).
  - Deposits: Stripe-shaped mock gateway behind a swap seam, 10-minute hold window, refund policy 100% at 24h+ / 0% inside, operator-fault waiver, truthful refund quote computed by the same function that performs the refund.
  - Idempotent event consumers, 31 KPIs, operational dashboards, QR check-in, station-scoped staff access.
  - **182/182 database-backed verification checks** (`npm run ops:verify`) plus deterministic harnesses for the AI parser.
  - AI-assisted preference entry via Groq (`openai/gpt-oss-120b`): converts one message into an untrusted, editable flexible-request draft; model has no tools and no account data; scheduling stays deterministic.

### 3. OptiCart — MERN appliances e-commerce (project lead & full-stack dev, 3-person team, 2026)
- Repo: https://github.com/malik-halimeh/1stMERN (contributors: malik-halimeh 24, MahmoudSidawi 22). Also `OptiCartDH`, `OptiCart`, `1stMERNpresentation` repos.
- Local: `DigitalHub/OptiCart/`. Screenshots: `DigitalHub/Portfolio/OptiCart/*.png` (8 images; orange/rust brand "OptiCart", appliances).
- Previously deployed on Render (`opticart-client.onrender.com`, `opticart-api.onrender.com`) — **both return 404 as of 2026-10-11**; treat as offline unless redeployed.
- Stack: Express + TypeScript, Mongoose with full index strategy, JWT access + refresh via httpOnly cookies, Stripe payment intents + webhook handler (mock mode by default), node-cron; React + TypeScript + Vite, React Router v7, Context API, guest cart/wishlist in localStorage with merge-on-login.
- Facts: roles customer / inventory_manager / super_admin; catalog/cart/coupons (percentage and fixed, min-order, expiry); atomic inventory updates; audit logs; email notifications; low-stock alerts; **daily 02:00 recommendation engine** computing product co-occurrence with recency decay `1/(daysSince+1)`, top-10 per product; seed with 3 users, 4 categories, 12 products with variants, 5 orders, 8 verified-purchase reviews, 2 coupons; Jira import CSV used for planning.

### 4. InsightFlow — business intelligence for small businesses (project lead, 5-person team, 2026)
- Repo: https://github.com/malik-halimeh/insightflow (contributors: malik-halimeh 127, dalaaalsaid 19, mhmdabouchaheen 16, sumayyaabboud-dot 6, yasser199560-lab 5).
- Local: `DigitalHub/InsightFlow/`. Screenshots: `DigitalHub/Portfolio/InsightFlow/*.png` (5 images; teal/dark-navy dashboard: total revenue, items sold, best/worst seller, revenue over time, revenue by weekday).
- Previously at `insightflow.onrender.com` — **404 as of 2026-10-11**.
- Stack: Nuxt 4, Vue 3, TypeScript, Nuxt UI, Zod, MongoDB Atlas; Render deploy.
- Facts: owner uploads CSV sales data → dashboard + plain-language recommendations + forecast; public insight feed readable without an account; admin-approved sign-ups (pending by default), admins only from seed; `/api/health` reports DB state; one-owner-per-folder team workflow; planned three delivery phases, assigned code ownership; idempotent seeding (`seed -- --add`), privacy and account-scoped data; release verification.

### 5. Interview Lab — offline-first interview-prep PWA (sole developer, 2026)
- Repo: https://github.com/malik-halimeh/interview-lab. Local: `DigitalHub/InterviewMock/`.
- Stack: React, TypeScript, Vite, Supabase (PostgreSQL, Auth, Edge Functions, RLS), IndexedDB, PWA, Cloudflare Pages + Turnstile. No AI API or paid runtime dependency.
- Facts: exactly **200 study lessons** (JS 55, React 35, Next.js 15, APIs/Node/Express/PostgreSQL 40, full-stack 35, Git 20), each with prompt, private typed answer, model response, expected concepts, mistake, follow-up, reference; spaced repetition; offline caching and reconnect sync; **20-item adaptive assessments with Rasch EAP scoring**, server deadlines, idempotent responses, cryptographic randomization, delayed review; Google auth, pseudonyms, consent, RLS isolation, sanitized leaderboards; production bundle verified to contain no answer keys (`verify:bundle`). Built for Digital Hub colleagues (~40 candidates, 5-day event).

### 6. SobohNet — bilingual FTTH provider website (freelance-style client site, Sept–Oct 2026)
- Preview repo: https://github.com/malik-halimeh/sobohnet-preview. **Live preview (200):** https://malik-halimeh.github.io/sobohnet-preview/ (banner + noindex). Private source repo `SobohNet` empty on GitHub; source local at `DigitalHub/SobohNet/`.
- Stack: Next.js static export, TypeScript, Tailwind, Playwright e2e in EN and AR on phone and desktop, unit tests for phone numbers/WhatsApp message/prices, lint rule blocking non-RTL-safe classes, brand asset pipeline (Python fonttools), OG image generation, printable A5 flyer with QR, Cloudflare Pages target with security headers.
- Facts: single-page, mobile-first, EN/AR, requests forwarded to WhatsApp, no backend; all content in one JSON file; build refuses while content is pending.

### 7. Smaller / supporting
- **iStudy (repo `cedra`, private, Laravel/PHP, active Oct 2026):** multi-tenant educational management SaaS for Lebanese tutoring institutions; institution-scoped tables, soft deletes, append-only audit, DECIMAL money USD & LBP, i18n. Mention only as "in progress, private" if at all.
- **Pharmacy Management System** (Django, with MohammadHajeer; malik 56 commits of 124): Django + Tailwind, Gunicorn/WhiteNoise, Docker, Neon PostgreSQL.
- **Questions as Games** (Next.js, Supabase): geometry proof game foundation, Step 0 only — do not feature.
- **CheckoutFlow** (vanilla JS payment form, June 2026), **DHProject1**, **ExpressDB**, **CodeAcademy** — early internship exercises; may appear in a GitHub timeline, not as case studies.
- **karim-live-presentation**, **1stMERNpresentation** — self-contained animated HTML presentations (shows he builds motion UIs).

## Old portfolio (to be replaced)
- https://github.com/malik-halimeh/Portfolio → live at https://portfolio-portfolio-tau.vercel.app/ (React + Vite + Tailwind 4 + Framer Motion, Replit-generated, glassmorphism). Content was **fabricated AI-agency copy** (RAG system, n8n automation, "AI Engineer") and skill percentage bars. Malik dislikes it entirely. Nothing from it should be reused except possibly the favicon/OG as reference for what NOT to do.

## Taste hints
- `DigitalHub/Portfolio/typography-screenshots/`: two screenshots Malik saved as references — (1) black background, heavy condensed grotesk headline "-2026 / Vol:03" with one red accent word, centered light-weight body text; (2) a dark client logo wall separated by hairline rules. Reads as **dark, editorial, high-contrast, one accent colour, confident typography**.
- `DigitalHub/Images/cedar-of-possibility.png` + prompt: a cinematic 9:16 wallpaper of a programmer overlooking the Saida coast with an ancient cedar whose branches carry subtle emerald/cyan circuitry. Motif: **cedar + sea + subtle circuitry**, "nature-plus-systems". Potential brand motif (Lebanon cedar).
