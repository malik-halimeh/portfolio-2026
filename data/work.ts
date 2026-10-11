/**
 * Project content. Every fact traces to docs/CONTENT_FACTS.md.
 * Case studies follow the site's fixed structure: Problem, Guarantees, Decisions, Evidence.
 * Margin notes are Malik's first-person commentary shown when annotations are on.
 */

export type StatusKind = "live" | "source" | "private" | "offline";

export type Decision = {
  title: string;
  choice: string;
  alternative: string;
  consequence: string;
};

export type MarginNote = {
  /** Which paragraph the note sits beside: "problem", "guarantee-0", "decision-2", "evidence-1" */
  anchor: string;
  text: string;
};

export type Work = {
  slug: string;
  name: string;
  /** Outcome-led title line used in lists. No marketing words. */
  outcome: string;
  oneLiner: string;
  role: string;
  team: string;
  period: string;
  stack: string[];
  status: { kind: StatusKind; label: string };
  links: { repo?: string; demo?: string; demoNote?: string; preview?: string };
  image: { src: string; alt: string; width: number; height: number };
  gallery?: { src: string; alt: string; width: number; height: number }[];
  featured?: boolean;
  caseStudy: {
    problem: string[];
    guarantees: { title: string; detail: string }[];
    decisions: Decision[];
    evidence: { label: string; value: string; detail?: string }[];
    interactive?: "chargehub-machine" | "tawzeevo-architecture" | "insightflow-compare" | "rasch-sandbox";
    whatIdChange: string[];
    notes: MarginNote[];
  };
};

export const work: Work[] = [
  {
    slug: "tawzeevo",
    name: "Tawzeevo",
    outcome: "A multi-tenant Cash Van SaaS where money is append-only and the van works offline with exactly-once sync",
    oneLiner: "Operations platform for Lebanese cash-van distributors: customers, catalog, invoicing, payments, deliveries, suppliers, analytics, and a bilingual storefront per business.",
    role: "Sole developer and product owner",
    team: "Solo",
    period: "2026, ongoing",
    stack: ["Python 3.13", "FastAPI", "SQLAlchemy 2", "PostgreSQL 16", "Alembic", "React 19", "TypeScript", "Vite", "TanStack Query", "Next.js", "i18next", "pytest", "Vitest", "Playwright"],
    status: { kind: "live", label: "Live demo" },
    links: {
      repo: "https://github.com/malik-halimeh/Tawzeevo",
      demo: "https://tawzeevo-malik-halimeh.onrender.com/demo",
      demoNote: "Synthetic role gallery: Guest, Customer, Owner, Driver. Runs on a free Render instance, so the first load can take about 30 seconds.",
    },
    image: { src: "/work/tawzeevo.webp", alt: "Tawzeevo operations client showing the owner's invoice editor", width: 1600, height: 1000 },
    featured: true,
    caseStudy: {
      problem: [
        "Cash-van distributors in Lebanon sell from a vehicle, in two currencies, often with no connection, and settle debts over weeks. Spreadsheets lose history, generic invoicing apps assume an internet connection and a single currency, and nothing handles a driver who should see delivery stops but never prices.",
        "Tawzeevo gives each business its own isolated workspace: customers with grades and per-grade prices, a catalog with barcodes and piece/box packaging, invoices with immutable revisions, receipts and refunds on an append-only ledger, supplier costs and payables, delivery tasks, and a public bilingual storefront with guest checkout. The platform team onboards tenants; the owner runs the business from an installable web app that keeps working offline.",
      ],
      guarantees: [
        { title: "Every business-owned row is isolated by PostgreSQL row-level security", detail: "Each tenant table carries the business id and an RLS policy. Isolation is enforced by the database, not by remembering to add a WHERE clause." },
        { title: "Financial history is append-only", detail: "Invoice revisions are immutable, official numbers are server-assigned per business and year, receipts and refunds are new records with compensating reversals, and currencies are never converted or summed together." },
        { title: "Offline operations sync exactly once", detail: "A device outbox stamps every command with an operation id and request fingerprint. Replays return the stored result. Conflicts surface for a human decision; nothing is merged silently." },
        { title: "Drivers get least privilege", detail: "A driver's API, sync bootstrap, change feed and local cache carry only assigned stops: contact, address, items, amount to collect. Never prices, costs, profit or other members' work." },
        { title: "No stock concept, by test", detail: "'Published' means visible in the catalog and nothing more. A schema-wide test fails if an inventory column ever appears." },
      ],
      decisions: [
        {
          title: "Row-level security over schema-per-tenant",
          choice: "One schema, a business id on every tenant table, and RLS policies enforced for the application role.",
          alternative: "A PostgreSQL schema per tenant, or filtering in the service layer.",
          consequence: "Migrations run once, backups are one database, and a missed filter cannot leak data. The cost is discipline around session variables, covered by tests that run against a real PostgreSQL.",
        },
        {
          title: "Immutable revisions instead of editable invoices",
          choice: "Post-confirmation edits create a new revision and write exact ledger deltas.",
          alternative: "Updating the invoice row in place and recomputing balances.",
          consequence: "Any balance can be explained from history. Owners accepted a slightly longer edit flow in exchange for an audit trail they can show a customer.",
        },
        {
          title: "Server-authoritative identifiers for offline work",
          choice: "Official invoice numbers, revision numbers and change sequence numbers are never produced on the device. A queued invoice shows a clearly pending reference until the server assigns the real one.",
          alternative: "Generating numbers client-side with a device prefix.",
          consequence: "No two vans can mint the same official number, and the legal numbering sequence stays gapless per business and year.",
        },
        {
          title: "Encrypted backup to the owner's own Google Drive",
          choice: "AES-256-GCM backups with per-business keys wrapped by an environment master key, written to a drive.file app folder the owner controls, with restore drills.",
          alternative: "Platform-held backups only.",
          consequence: "A business can leave with its data, and the platform never holds plaintext exports. The free hosting plan keeps no backups, so this is the disaster-recovery story.",
        },
        {
          title: "Deterministic routing fallback",
          choice: "OpenRouteService when configured, otherwise a nearest-neighbour plus 2-opt heuristic that runs offline. Both are labelled as suggestions.",
          alternative: "Requiring a paid routing API.",
          consequence: "Route help always exists, and only coordinates ever leave the server.",
        },
      ],
      evidence: [
        { label: "Backend tests", value: "388 passing", detail: "pytest against a disposable PostgreSQL 18, ruff, mypy strict, verified 2026-09-25" },
        { label: "Operations client", value: "149 unit tests", detail: "Vitest and Testing Library; lint, typecheck and build pass" },
        { label: "End-to-end", value: "Playwright 11/11", detail: "Real-browser flows in English and Arabic" },
        { label: "Delivered phases", value: "8 of 10", detail: "Phase 9 (production hardening, CI/CD, staging, multi-tenant pilot) in progress" },
        { label: "CI", value: "Deploys gated on green", detail: "Backend on PostgreSQL, both clients, real-browser flows, dependency audits" },
      ],
      interactive: "tawzeevo-architecture",
      whatIdChange: [
        "Start the storefront and the operations client from one shared UI package instead of letting them diverge for three phases.",
        "Write the authorization matrix test suite in phase 1, not phase 9. It found gaps that were cheaper to fix early.",
      ],
      notes: [
        { anchor: "problem", text: "This started as a favour for a family contact who runs a van. Most of the product rules came from watching one day of deliveries." },
        { anchor: "guarantee-1", text: "The hardest bug I never shipped: a refund that would have been allocated across two currencies. The ledger-per-currency rule exists because of it." },
        { anchor: "decision-2", text: "A pending reference that looks obviously temporary turned out to matter more than the sync protocol. Drivers trust what they can see." },
        { anchor: "evidence-0", text: "The CV still says 70 tests. The number kept moving faster than the PDF." },
      ],
    },
  },
  {
    slug: "chargehub",
    name: "ChargeHub",
    outcome: "EV charging reservations that are conflict-free by database constraint, with an 11-state lifecycle and 182/182 verification checks",
    oneLiner: "Duration-aware charger reservations with deposits, QR check-in, late-arrival, extension and overstay engines, and operator dashboards with 31 KPIs.",
    role: "Primary full-stack developer",
    team: "Team of 2, Digital Hub project (89 of 94 commits)",
    period: "2026",
    stack: ["Next.js", "TypeScript", "MongoDB Atlas", "Mongoose", "Tailwind CSS", "Zustand", "Groq API"],
    status: { kind: "private", label: "Source, private continuation" },
    links: {
      repo: "https://github.com/AyaSulyman/EVCharging-System",
    },
    image: { src: "/work/chargehub.webp", alt: "ChargeHub flexible booking form asking for a time window, duration and acceptable stations", width: 1600, height: 1000 },
    gallery: [
      { src: "/work/chargehub-kpis.webp", alt: "ChargeHub admin schedule-quality dashboard with KPI tiles", width: 1600, height: 1000 },
      { src: "/work/chargehub-behaviour.webp", alt: "ChargeHub customer behaviour table with reliability scores", width: 1600, height: 1000 },
    ],
    caseStudy: {
      problem: [
        "A charger is a scarce, time-bound resource. The usual booking app sells fixed hour slots, lets two drivers race for the last one, and only learns about no-shows when staff notice an empty bay.",
        "ChargeHub sells the minutes a driver actually needs, from 15 to 120 on a 15-minute grid, holds the bay with a deposit, and runs the floor automatically: late arrivals are classified, no-shows are detected, extensions are decided against real capacity, overstays escalate, and early departures put minutes back on sale.",
      ],
      guarantees: [
        { title: "Conflict-free by constraint, not by hope", detail: "Occupancy is stored as one row per 15-minute atom with a unique index on charger and atom. A second overlapping booking fails at the database, under any concurrency, before any application code can get it wrong." },
        { title: "Every transition is explicit", detail: "Eleven lifecycle states and one validated transition map. Check-in, charging start and charging end are three separate moves, so a driver who checked in but never plugged in is a different fact from one who charged." },
        { title: "The quote is the refund", detail: "The refund shown before a cancellation is computed by the same function that performs it. Policy: full refund at 24 hours or more, none inside, always refunded when the operator is at fault." },
        { title: "Automatic detection, one implementation", detail: "No-show, overstay and late arrival are detected by time-driven sweeps that share the exact code the manual staff actions use, so a manual and an automatic no-show can never produce different money or capacity outcomes." },
        { title: "AI never decides", detail: "The optional assistant turns one message into an editable draft request. The model has no tools, sees no account or booking data, and the scheduler stays deterministic." },
      ],
      decisions: [
        {
          title: "Occupancy atoms instead of slot rows",
          choice: "Decompose every reservation into 15-minute atoms and make each atom unique per charger.",
          alternative: "A stored 'available' flag per hour slot, or a transaction that checks for overlap before inserting.",
          consequence: "Availability is computed per requested duration (the same free hour offers four 15-minute starts and no 90-minute start), and double booking is impossible rather than unlikely.",
        },
        {
          title: "A parallel lifecycle field, not a replaced enum",
          choice: "Keep the legacy five-value status (which the partial unique index filters on) and add the richer eleven-state lifecycle alongside it, mapped back deterministically.",
          alternative: "Rewriting the enum and migrating every stored booking.",
          consequence: "Nothing that already worked had to change, and the two fields can never disagree because one is derived from the other.",
        },
        {
          title: "Grace of 15 minutes, not 10",
          choice: "Snapshot a 15-minute grace window onto each reservation at claim time.",
          alternative: "The 10 minutes the first spec proposed.",
          consequence: "Urban traffic alone eats 10 minutes. The longer grace trades a little utilization for fewer false at-risk flags and support incidents. Snapshotting means a later policy change never rewrites existing terms.",
        },
        {
          title: "Atomic claim for the no-show sweep",
          choice: "The sweep claims the booking with a single conditional update on lifecycle still being RESERVED, LATE or AT_RISK, and sets every terminal field in that same write.",
          alternative: "Read, check, then update.",
          consequence: "A driver checking in one second before the sweep wins cleanly: the sweep's update matches nothing and commits a no-op.",
        },
        {
          title: "Gateway calls stay outside transactions",
          choice: "A refund that would reach the payment gateway is never performed inside a database transaction.",
          alternative: "One big transaction for simplicity.",
          consequence: "A network call cannot be rolled back, so it is guarded structurally rather than by hoping it never fails mid-transaction.",
        },
      ],
      evidence: [
        { label: "Database-backed checks", value: "182 of 182", detail: "npm run ops:verify exercises every documented behaviour against the real database" },
        { label: "Lifecycle states", value: "11", detail: "PENDING_PAYMENT to COMPLETED with LATE, AT_RISK, EXTENSION_REQUESTED, CANCELLED, NO_SHOW, RELEASED branches" },
        { label: "Operator KPIs", value: "31", detail: "Preference match, utilization, arrival accuracy, extension approvals, overstay, capacity recovered, waitlist conversion" },
        { label: "Commits", value: "89 of 94", detail: "In the team repository" },
        { label: "AI boundaries", value: "2 deterministic harnesses", detail: "Parser and explanation boundaries verified without the model" },
      ],
      interactive: "chargehub-machine",
      whatIdChange: [
        "Ship the admin dashboards as a separate app from day one. The headless API and the client are already split; the admin screens should have been too.",
        "Model the extension request as its own entity earlier. Folding it into the lifecycle state worked, but the cap of two requests lives in the wrong place.",
      ],
      notes: [
        { anchor: "guarantee-0", text: "I rewrote the booking path three times. The first version checked for overlaps in code and passed every test until two requests arrived in the same millisecond." },
        { anchor: "decision-2", text: "The 15-minute grace came from a real argument with a teammate. We lost one percent of utilization in the simulation and gained a product people would tolerate." },
        { anchor: "evidence-0", text: "182 is the number of behaviours the spec documents, not a vanity count. Every one has a named check." },
      ],
    },
  },
  {
    slug: "opticart",
    name: "OptiCart",
    outcome: "A MERN appliances store with role-based administration, Stripe-shaped checkout, atomic inventory and a nightly recommendation engine",
    oneLiner: "E-commerce platform with access and refresh authentication, catalog, cart, coupons, webhooks, audit logs, email notifications and scheduled recommendations.",
    role: "Project lead and full-stack developer",
    team: "Team of 3, Digital Hub project",
    period: "2026",
    stack: ["MongoDB", "Express", "React", "Node.js", "TypeScript", "Vite", "React Router 7", "Stripe", "node-cron"],
    status: { kind: "source", label: "Source only" },
    links: {
      repo: "https://github.com/malik-halimeh/1stMERN",
    },
    image: { src: "/work/opticart.webp", alt: "OptiCart home page with a featured dishwasher collection and category grid", width: 1600, height: 1000 },
    caseStudy: {
      problem: [
        "The first team project of the internship: a complete store, three people, a few weeks, and a brief that asked for real commerce behaviour rather than a demo cart. The risk was the usual one: three developers, one database, and features that quietly assume they are the only writer.",
        "OptiCart ships three roles (customer, inventory manager, super admin), guest carts that merge on login, percentage and fixed coupons with minimum order and expiry, a Stripe-shaped checkout with a webhook handler, low-stock alerts, audit logs, email notifications, and a recommendation job that runs nightly from purchase co-occurrence.",
      ],
      guarantees: [
        { title: "Inventory updates are atomic", detail: "Stock changes happen in single conditional writes, so two checkouts cannot both take the last unit." },
        { title: "Sessions use short access tokens and httpOnly refresh cookies", detail: "No token in localStorage. The refresh path rotates, and roles are enforced on every protected route." },
        { title: "Admin actions leave an audit trail", detail: "Super-admin reads of the audit log show who changed what and when." },
        { title: "Payments are confirmed by webhook, not by the browser", detail: "The order state advances when Stripe says so, with signature verification. Mock mode exists so the whole flow runs without keys." },
      ],
      decisions: [
        {
          title: "Plan in Jira before the first commit",
          choice: "Wrote the backlog as a Jira import, assigned ownership per area, and reviewed every pull request.",
          alternative: "Starting with code and dividing work as it came.",
          consequence: "Three people shipped without stepping on each other. Commit share ended close to even between the two main contributors.",
        },
        {
          title: "Recommendations as a scheduled job, not a request-time query",
          choice: "A 02:00 cron computes product-pair weights from purchase events with recency decay of 1/(daysSince+1) and stores the top ten per product.",
          alternative: "Computing related products on every product page view.",
          consequence: "Product pages stay fast and the maths lives in one place that can be tested on its own.",
        },
        {
          title: "Guest cart in localStorage, merged on login",
          choice: "Guests keep a cart and wishlist locally; both merge into the account when they sign in.",
          alternative: "Forcing sign-in before adding to cart.",
          consequence: "No abandoned carts caused by a login wall, at the cost of a small merge rule set.",
        },
      ],
      evidence: [
        { label: "Roles", value: "3", detail: "customer, inventory_manager, super_admin" },
        { label: "Seed", value: "12 products with variants", detail: "4 categories, 5 orders in every status, 8 verified-purchase reviews, 2 coupons" },
        { label: "Commits", value: "24 of 46", detail: "Two main contributors, reviewed pull requests" },
        { label: "Deployment", value: "Render, now retired", detail: "Client and API were deployed; both instances are offline as of October 2026" },
      ],
      whatIdChange: [
        "Use a real Stripe test account from the start instead of the mock gateway; the swap seam worked, but the team never exercised the real webhook timing.",
        "Move from Context API to a small store earlier; the cart context re-rendered more than it should.",
      ],
      notes: [
        { anchor: "problem", text: "This was where I learned that a project lead's first job is to write things down before anyone opens an editor." },
        { anchor: "decision-1", text: "The recency-decay formula is deliberately simple. It is explainable to a shop owner in one sentence, which mattered more than accuracy." },
      ],
    },
  },
  {
    slug: "insightflow",
    name: "InsightFlow",
    outcome: "Business intelligence for small businesses: upload sales CSVs, get plain-language recommendations and a forecast, publish insights to a public feed",
    oneLiner: "A Nuxt 4 workspace where an owner uploads sales data and gets dashboards, recommendations and forecasts; interesting findings go to a public feed anyone can read.",
    role: "Project lead and full-stack developer",
    team: "Team of 5, Digital Hub project (127 of 173 commits)",
    period: "2026",
    stack: ["Nuxt 4", "Vue 3", "TypeScript", "Nuxt UI", "Zod", "MongoDB Atlas", "Render"],
    status: { kind: "source", label: "Source only" },
    links: {
      repo: "https://github.com/malik-halimeh/insightflow",
    },
    image: { src: "/work/insightflow.webp", alt: "InsightFlow dashboard showing revenue, items sold and revenue by weekday", width: 1600, height: 1000 },
    gallery: [{ src: "/work/insightflow-forecast.webp", alt: "InsightFlow forecast chart with a shaded confidence band for the next seven days", width: 1600, height: 1000 }],
    caseStudy: {
      problem: [
        "Five people, one shared database, and a product that only makes sense when every part works: upload, cleaning, dashboard, recommendations, forecast, and a public feed. The failure mode of student teams is a demo that works on one laptop.",
        "InsightFlow is a signed-in workspace: owners upload CSV sales data, see revenue by day and weekday, best and worst sellers, written recommendations and a seven-day forecast with its typical error. Findings can be published to a feed that needs no account. Sign-ups are pending until an admin approves them; admins exist only from the seed.",
      ],
      guarantees: [
        { title: "One owner per folder", detail: "Every folder in the codebase has a named owner. Anyone can import from anywhere; only the owner edits. Pull `main` and branch from it at the start of every session." },
        { title: "Seeding never destroys a teammate's data by accident", detail: "The additive seed is the default. The destructive one names what it will delete and asks for confirmation." },
        { title: "Health is observable", detail: "A dependency-free health route reports whether the database is reachable, so a broken Atlas allowlist is diagnosed in one request." },
        { title: "Account-scoped data", detail: "Every dataset, insight and recommendation is scoped to the owner's account; the public feed only ever shows what was explicitly published." },
      ],
      decisions: [
        {
          title: "Three delivery phases with written page inventories",
          choice: "Planned three phases, listed every page with its owner and what to replace, and documented the design system so no visual decisions were needed mid-build.",
          alternative: "A single backlog and ad-hoc design.",
          consequence: "Five people with different speeds produced one consistent product. The docs folder became the onboarding path for anyone who joined late.",
        },
        {
          title: "No static generation",
          choice: "Deliberately removed the generate script.",
          alternative: "Static export for a cheap deploy.",
          consequence: "Static export would silently strip every API route, the login and the upload. Removing the option prevented a confusing failure during the final week.",
        },
        {
          title: "Admin-approved sign-ups",
          choice: "New accounts are created pending and cannot sign in until approved; admins come only from the seed.",
          alternative: "Open registration.",
          consequence: "A small business tool with real uploads should not be open to anyone with an email address.",
        },
      ],
      evidence: [
        { label: "Commits", value: "127 of 173", detail: "Across a five-person team" },
        { label: "Pages documented", value: "Every page, with an owner", detail: "docs/PAGE-INVENTORY.md and docs/DESIGN-SYSTEM.md" },
        { label: "Forecast", value: "7 days, error stated", detail: "The typical error is measured over the last six days and shown next to the prediction" },
        { label: "Deployment", value: "Render, now retired", detail: "The instance is offline as of October 2026" },
      ],
      interactive: "insightflow-compare",
      whatIdChange: [
        "Keep a demo instance alive. A dead link is worse than no link, and the project deserves a live one.",
        "Write the CSV contract first. Half of the daily log is about column names.",
      ],
      notes: [
        { anchor: "guarantee-0", text: "The 'one owner per folder' rule came from a merge that cost us an afternoon. After that, nobody argued." },
        { anchor: "evidence-2", text: "Showing the forecast's own error next to the number was the single most appreciated detail in the final presentation." },
      ],
    },
  },
  {
    slug: "interview-lab",
    name: "Interview Lab",
    outcome: "An offline-first study PWA with 200 lessons and adaptive assessments scored with a Rasch model, built with no paid runtime",
    oneLiner: "Installable study app for Digital Hub colleagues: lessons with spaced repetition that work offline, plus secure twenty-item adaptive mock assessments with server-only answer keys.",
    role: "Sole developer",
    team: "Solo, for about 40 colleagues over a five-day event",
    period: "2026",
    stack: ["React", "TypeScript", "Vite", "Supabase", "PostgreSQL RLS", "Edge Functions", "IndexedDB", "PWA", "Cloudflare Pages", "Turnstile"],
    status: { kind: "source", label: "Source only" },
    links: {
      repo: "https://github.com/malik-halimeh/interview-lab",
    },
    image: { src: "/work/interview-lab.webp", alt: "Interview Lab lesson view with a prompt, a private typed answer and a model response", width: 1600, height: 1000 },
    caseStudy: {
      problem: [
        "Colleagues preparing for interviews needed something that worked on a bus with no signal, did not leak answer keys to anyone who opened dev tools, and did not cost money to run.",
        "Interview Lab has exactly 200 lessons across JavaScript, React, Next.js, APIs and databases, full-stack design and Git. Each lesson has a prompt, a private typed answer, a model response, expected concepts, a common mistake, a follow-up and a reference. Assessments are twenty items, four per topic family, scored with Rasch EAP, with server deadlines, idempotent responses and delayed answer review.",
      ],
      guarantees: [
        { title: "The production bundle contains no answer keys", detail: "A verification script fails the build if correct option ids, explanations or the item bank reach the client. The bank lives in the Edge Function only." },
        { title: "Study works fully offline", detail: "Lessons, progress and spaced repetition live in IndexedDB; the PWA caches the app; reconnect synchronizes; logout clears the cache." },
        { title: "Each candidate sees only their own data", detail: "Supabase row-level security isolates rows; leaderboards are sanitized and separate; real names are opt-in." },
        { title: "Zero paid dependencies", detail: "No AI API, no paid runtime. If a free quota nears, assessments switch off and study mode keeps working from the cache." },
      ],
      decisions: [
        {
          title: "Rasch scoring instead of percent correct",
          choice: "Twenty items with fixed difficulties, scored by expected a posteriori estimation; the grade is clamp(0, 100, round(50 + 10 * theta)) and is labelled provisional.",
          alternative: "Percent correct.",
          consequence: "Two candidates with different item sets can be compared, and the number is honest about what it is: a preparation estimate, not a hiring decision.",
        },
        {
          title: "Answer keys only on the server",
          choice: "Secure assessments are disabled entirely when Supabase variables are missing, rather than falling back to a local key.",
          alternative: "Shipping an obfuscated key for offline tests.",
          consequence: "Offline study is still complete, and there is no mode in which a key can be extracted from the browser.",
        },
        {
          title: "Freeze the deployed commit for the event",
          choice: "Item difficulties are pinned per event version so grades never move retroactively.",
          alternative: "Recalibrating live.",
          consequence: "Fairness across the five days; anonymous statistics can be exported later for calibration.",
        },
      ],
      evidence: [
        { label: "Lessons", value: "200", detail: "JavaScript 55, React 35, Next.js 15, APIs/Node/PostgreSQL 40, full-stack 35, Git 20" },
        { label: "Assessment", value: "20 items, Rasch EAP", detail: "Cryptographic randomization, recent-item avoidance, server deadlines" },
        { label: "Bundle check", value: "verify:bundle", detail: "Fails if any answer key reaches the client" },
        { label: "Runtime cost", value: "0", detail: "Free tiers only; quota alerts configured" },
      ],
      interactive: "rasch-sandbox",
      whatIdChange: [
        "Collect anonymous response statistics from day one so the second event can be calibrated properly.",
      ],
      notes: [
        { anchor: "decision-0", text: "I read more psychometrics for this than for any exam I took. The grade formula is deliberately simple so it can be explained in one line." },
        { anchor: "guarantee-0", text: "The bundle check exists because the first build leaked explanations through a lazy import. The test is the fix." },
      ],
    },
  },
  {
    slug: "sobohnet",
    name: "SobohNet",
    outcome: "A bilingual fibre-internet website that forwards requests to WhatsApp, with no backend and a build that refuses to ship pending content",
    oneLiner: "Single-page, mobile-first English and Arabic site for a fibre provider near Saida: plans, documents, a guided request form that opens WhatsApp, map, call, and a printable flyer.",
    role: "Developer, client work",
    team: "Solo",
    period: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Playwright", "Vitest", "Cloudflare Pages"],
    status: { kind: "live", label: "Preview live" },
    links: {
      repo: "https://github.com/malik-halimeh/sobohnet-preview",
      preview: "https://malik-halimeh.github.io/sobohnet-preview/",
      demoNote: "Design preview with a banner; the production site goes live when the client's content is final.",
    },
    image: { src: "/work/sobohnet.webp", alt: "SobohNet bilingual landing page with fibre plans", width: 1600, height: 1000 },
    caseStudy: {
      problem: [
        "A small internet provider wanted customers to understand plans, know which documents to bring, and send a request without creating an account. Their customers live on WhatsApp. The business content, prices and phone numbers would arrive late.",
        "The site is one page, English and Arabic, with every piece of business content in one JSON file. A short guided form composes a WhatsApp message. There is a YouTube demo of how to send it, a map with directions, one-tap call, and an A5 flyer with a QR code that prints from the same site.",
      ],
      guarantees: [
        { title: "The build refuses to ship pending content", detail: "Missing values show as red PENDING tags in development, and the production build fails while any remain." },
        { title: "RTL is enforced by lint", detail: "A lint rule blocks CSS classes that are not RTL-safe, so Arabic cannot regress silently." },
        { title: "Both languages are tested in real browsers", detail: "Playwright runs phone and desktop flows in English and Arabic; unit tests cover phone formats, the WhatsApp message, prices and hours." },
      ],
      decisions: [
        {
          title: "No backend at all",
          choice: "Static export, requests forwarded to WhatsApp, content from one JSON file.",
          alternative: "A small API and admin panel.",
          consequence: "Nothing to host or secure, and the code is structured so an admin or API can replace the content source later without rewriting the UI.",
        },
        {
          title: "Brand assets built by script",
          choice: "Every logo file and icon is regenerated by a Python pipeline; link-preview images are rebuilt after any price or text change.",
          alternative: "Exporting assets by hand.",
          consequence: "A price change is a one-line edit and one command.",
        },
      ],
      evidence: [
        { label: "Languages", value: "EN and AR", detail: "Arabic at /ar, mirrored layout, LTR phone numbers inside RTL text" },
        { label: "Tests", value: "Unit and end-to-end", detail: "Vitest plus Playwright in both languages on phone and desktop" },
        { label: "Content", value: "One JSON file", detail: "content/site.content.json with an intake form and update playbook" },
      ],
      whatIdChange: ["Ask for the content before writing the first component. Half of the project's calendar was waiting."],
      notes: [
        { anchor: "guarantee-0", text: "The PENDING tags saved the client from a launch with placeholder prices. They complained about the red boxes exactly once." },
      ],
    },
  },
];

export const workBySlug = Object.fromEntries(work.map((w) => [w.slug, w])) as Record<string, Work>;

export const featuredWork = work.filter((w) => w.featured);
