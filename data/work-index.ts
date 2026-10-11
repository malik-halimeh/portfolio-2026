/**
 * Light project index, safe to import from client components (no case-study prose).
 * Every fact traces to docs/CONTENT_FACTS.md.
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

export type WorkIndex = {
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
  /** oklch hue taken from the product's own brand colour (see screenshots). */
  hue: number;
};

export const workIndex: WorkIndex[] = [
  {
    slug: "tawzeevo",
    hue: 110,
    name: "Tawzeevo",
    outcome:
      "A multi-tenant Cash Van SaaS where money is append-only and the van works offline with exactly-once sync",
    oneLiner:
      "Operations platform for Lebanese cash-van distributors: customers, catalog, invoicing, payments, deliveries, suppliers, analytics, and a bilingual storefront per business.",
    role: "Sole developer and product owner",
    team: "Solo",
    period: "2026, ongoing",
    stack: [
      "Python 3.13",
      "FastAPI",
      "SQLAlchemy 2",
      "PostgreSQL 16",
      "Alembic",
      "React 19",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Next.js",
      "i18next",
      "pytest",
      "Vitest",
      "Playwright",
    ],
    status: { kind: "live", label: "Live demo" },
    links: {
      repo: "https://github.com/malik-halimeh/Tawzeevo",
      demo: "https://tawzeevo-malik-halimeh.onrender.com/demo",
      demoNote:
        "Synthetic role gallery: Guest, Customer, Owner, Driver. Runs on a free Render instance, so the first load can take about 30 seconds.",
    },
    image: {
      src: "/work/tawzeevo.webp",
      alt: "Tawzeevo operations client showing the owner's invoice editor",
      width: 1600,
      height: 1000,
    },
    featured: true,
  },
  {
    slug: "chargehub",
    hue: 165,
    name: "ChargeHub",
    outcome:
      "EV charging reservations that are conflict-free by database constraint, with an 11-state lifecycle and 182/182 verification checks",
    oneLiner:
      "Duration-aware charger reservations with deposits, QR check-in, late-arrival, extension and overstay engines, and operator dashboards with 31 KPIs.",
    role: "Primary full-stack developer",
    team: "Team of 2, Digital Hub project (89 of 94 commits)",
    period: "2026",
    stack: [
      "Next.js",
      "TypeScript",
      "MongoDB Atlas",
      "Mongoose",
      "Tailwind CSS",
      "Zustand",
      "Groq API",
    ],
    status: { kind: "private", label: "Team repo public" },
    links: {
      repo: "https://github.com/AyaSulyman/EVCharging-System",
    },
    image: {
      src: "/work/chargehub.webp",
      alt: "ChargeHub flexible booking form asking for a time window, duration and acceptable stations",
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        src: "/work/chargehub-kpis.webp",
        alt: "ChargeHub admin schedule-quality dashboard with KPI tiles",
        width: 1600,
        height: 1000,
      },
      {
        src: "/work/chargehub-behaviour.webp",
        alt: "ChargeHub customer behaviour table with reliability scores",
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    slug: "opticart",
    hue: 35,
    name: "OptiCart",
    outcome:
      "A MERN appliances store with role-based administration, Stripe-shaped checkout, atomic inventory and a nightly recommendation engine",
    oneLiner:
      "E-commerce platform with access and refresh authentication, catalog, cart, coupons, webhooks, audit logs, email notifications and scheduled recommendations.",
    role: "Project lead and full-stack developer",
    team: "Team of 3, Digital Hub project",
    period: "2026",
    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "TypeScript",
      "Vite",
      "React Router 7",
      "Stripe",
      "node-cron",
    ],
    status: { kind: "source", label: "Source only" },
    links: {
      repo: "https://github.com/malik-halimeh/1stMERN",
    },
    image: {
      src: "/work/opticart.webp",
      alt: "OptiCart home page with a featured dishwasher collection and category grid",
      width: 1600,
      height: 1000,
    },
  },
  {
    slug: "insightflow",
    hue: 185,
    name: "InsightFlow",
    outcome:
      "Small-business intelligence from one CSV upload: dashboards, plain-language recommendations, a forecast and a public insight feed",
    oneLiner:
      "A Nuxt 4 workspace where an owner uploads sales data and gets dashboards, recommendations and forecasts; interesting findings go to a public feed anyone can read.",
    role: "Project lead and full-stack developer",
    team: "Team of 5, Digital Hub project (127 of 173 commits)",
    period: "2026",
    stack: [
      "Nuxt 4",
      "Vue 3",
      "TypeScript",
      "Nuxt UI",
      "Zod",
      "MongoDB Atlas",
      "Render",
    ],
    status: { kind: "source", label: "Source only" },
    links: {
      repo: "https://github.com/malik-halimeh/insightflow",
    },
    image: {
      src: "/work/insightflow.webp",
      alt: "InsightFlow dashboard showing revenue, items sold and revenue by weekday",
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        src: "/work/insightflow-forecast.webp",
        alt: "InsightFlow forecast chart with a shaded confidence band for the next seven days",
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    slug: "interview-lab",
    hue: 262,
    name: "Interview Lab",
    outcome:
      "An offline-first study PWA with 200 lessons and adaptive assessments scored with a Rasch model, built with no paid runtime",
    oneLiner:
      "Installable study app for Digital Hub colleagues: lessons with spaced repetition that work offline, plus secure twenty-item adaptive mock assessments with server-only answer keys.",
    role: "Sole developer",
    team: "Solo, for about 40 colleagues over a five-day event",
    period: "2026",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
      "PostgreSQL RLS",
      "Edge Functions",
      "IndexedDB",
      "PWA",
      "Cloudflare Pages",
      "Turnstile",
    ],
    status: { kind: "source", label: "Source only" },
    links: {
      repo: "https://github.com/malik-halimeh/interview-lab",
    },
    image: {
      src: "/work/interview-lab.webp",
      alt: "Interview Lab lesson view with a prompt, a private typed answer and a model response",
      width: 1600,
      height: 1000,
    },
  },
  {
    slug: "sobohnet",
    hue: 65,
    name: "SobohNet",
    outcome:
      "A bilingual fibre-internet website that forwards requests to WhatsApp, with no backend and a build that refuses to ship pending content",
    oneLiner:
      "Single-page, mobile-first English and Arabic site for a fibre provider near Saida: plans, documents, a guided request form that opens WhatsApp, map, call, and a printable flyer.",
    role: "Developer, client work",
    team: "Solo",
    period: "2026",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Playwright",
      "Vitest",
      "Cloudflare Pages",
    ],
    status: { kind: "live", label: "Preview live" },
    links: {
      repo: "https://github.com/malik-halimeh/sobohnet-preview",
      preview: "https://malik-halimeh.github.io/sobohnet-preview/",
      demoNote:
        "Design preview with a banner; the production site goes live when the client's content is final.",
    },
    image: {
      src: "/work/sobohnet.webp",
      alt: "SobohNet bilingual landing page with fibre plans",
      width: 1600,
      height: 1000,
    },
  },
];
