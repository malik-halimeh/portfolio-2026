/**
 * Single source of truth for identity, links, availability and skills.
 * Every fact here is verified in docs/CONTENT_FACTS.md. Do not add anything unverified.
 */

export const profile = {
  name: "Malik Halimeh",
  firstName: "Malik",
  title: "Full-Stack Developer",
  tagline: "I build systems that refuse to lose data.",
  summary:
    "Full-stack developer in Saida, Lebanon. TypeScript and Python. Multi-tenant SaaS, state machines, offline-first sync, bilingual interfaces.",
  location: { city: "Saida", country: "Lebanon", timeZone: "Asia/Beirut" },
  email: "malikhalimeh37@gmail.com",
  phoneE164: "+96176719893",
  phoneDisplay: "+961 76 719 893",
  whatsapp: "https://wa.me/96176719893",
  github: "https://github.com/malik-halimeh",
  githubLogin: "malik-halimeh",
  linkedin: "https://www.linkedin.com/in/malik-halimeh",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://malik-halimeh-portfolio.vercel.app",
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent" },
  ],
  education: {
    degree: "B.S. in Computer Science",
    school: "Lebanese International University",
    campus: "Saida",
    years: "2016-2020",
  },
  experience: {
    role: "Full-Stack Web Development & AI Intern",
    org: "The Digital Hub, UNRWA",
    period: "May 2026 - Oct 2026",
    note: "Certificate expected October 2026.",
  },
  availability: {
    status: "open" as "open" | "limited" | "closed",
    label: "Open to full-time and contract roles, remote or Lebanon",
    updated: "2026-10-11",
  },
  /** Last-known GitHub figures, used as the fallback when the live fetch fails. */
  githubFallback: { contributionsLastYear: 628, commitsLastYear: 577, fetchedOn: "2026-10-11" },
} as const;

export type SkillGroup = {
  group: string;
  items: { name: string; usedIn: string[]; lastUsed: number }[];
};

/**
 * Skills with proof. `usedIn` holds project slugs from data/work.ts.
 * Only items that appear on the CV and are visible in a repo are listed.
 */
export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: [
      { name: "TypeScript", usedIn: ["tawzeevo", "chargehub", "opticart", "insightflow", "interview-lab", "sobohnet"], lastUsed: 2026 },
      { name: "JavaScript (ES6+)", usedIn: ["opticart", "sobohnet"], lastUsed: 2026 },
      { name: "Python", usedIn: ["tawzeevo"], lastUsed: 2026 },
      { name: "SQL", usedIn: ["tawzeevo"], lastUsed: 2026 },
      { name: "HTML5 and CSS3", usedIn: ["sobohnet", "chargehub", "opticart"], lastUsed: 2026 },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React 19", usedIn: ["tawzeevo", "opticart", "interview-lab"], lastUsed: 2026 },
      { name: "Next.js App Router", usedIn: ["chargehub", "tawzeevo", "sobohnet"], lastUsed: 2026 },
      { name: "Vue 3 and Nuxt 4", usedIn: ["insightflow"], lastUsed: 2026 },
      { name: "TanStack Query", usedIn: ["tawzeevo"], lastUsed: 2026 },
      { name: "Zustand", usedIn: ["chargehub"], lastUsed: 2026 },
      { name: "Tailwind CSS", usedIn: ["chargehub", "sobohnet"], lastUsed: 2026 },
      { name: "PWA and offline-first", usedIn: ["tawzeevo", "interview-lab"], lastUsed: 2026 },
      { name: "i18n and RTL", usedIn: ["tawzeevo", "sobohnet"], lastUsed: 2026 },
      { name: "Core Web Vitals and SEO", usedIn: ["sobohnet"], lastUsed: 2026 },
    ],
  },
  {
    group: "Backend and data",
    items: [
      { name: "FastAPI", usedIn: ["tawzeevo"], lastUsed: 2026 },
      { name: "Node.js and Express", usedIn: ["opticart"], lastUsed: 2026 },
      { name: "Django REST Framework", usedIn: [], lastUsed: 2026 },
      { name: "PostgreSQL and row-level security", usedIn: ["tawzeevo", "interview-lab"], lastUsed: 2026 },
      { name: "SQLAlchemy 2 and Alembic", usedIn: ["tawzeevo"], lastUsed: 2026 },
      { name: "MongoDB and Mongoose", usedIn: ["chargehub", "opticart", "insightflow"], lastUsed: 2026 },
      { name: "Supabase", usedIn: ["interview-lab"], lastUsed: 2026 },
      { name: "JWT, secure cookies, RBAC", usedIn: ["tawzeevo", "opticart", "chargehub"], lastUsed: 2026 },
      { name: "Stripe-shaped payments and webhooks", usedIn: ["opticart", "chargehub"], lastUsed: 2026 },
    ],
  },
  {
    group: "Testing and architecture",
    items: [
      { name: "pytest against real PostgreSQL", usedIn: ["tawzeevo"], lastUsed: 2026 },
      { name: "Vitest and Testing Library", usedIn: ["tawzeevo", "sobohnet"], lastUsed: 2026 },
      { name: "Playwright end-to-end", usedIn: ["tawzeevo", "sobohnet"], lastUsed: 2026 },
      { name: "Verification harnesses", usedIn: ["chargehub"], lastUsed: 2026 },
      { name: "Clean architecture and SOLID", usedIn: ["tawzeevo", "chargehub"], lastUsed: 2026 },
      { name: "State machines and idempotency", usedIn: ["chargehub", "tawzeevo"], lastUsed: 2026 },
      { name: "mypy strict and TypeScript strict", usedIn: ["tawzeevo"], lastUsed: 2026 },
    ],
  },
  {
    group: "Delivery and AI",
    items: [
      { name: "Git, branching, pull requests, code review", usedIn: ["tawzeevo", "insightflow", "opticart"], lastUsed: 2026 },
      { name: "GitHub Actions CI/CD", usedIn: ["tawzeevo"], lastUsed: 2026 },
      { name: "Docker Compose", usedIn: ["tawzeevo"], lastUsed: 2026 },
      { name: "Jira and phase planning", usedIn: ["opticart", "insightflow"], lastUsed: 2026 },
      { name: "Vercel, Render, Cloudflare Pages", usedIn: ["tawzeevo", "interview-lab", "sobohnet"], lastUsed: 2026 },
      { name: "LLM integration with guardrails", usedIn: ["chargehub", "tawzeevo"], lastUsed: 2026 },
      { name: "Review-led coding agents (Codex, Aider, Claude)", usedIn: ["tawzeevo", "chargehub", "sobohnet"], lastUsed: 2026 },
    ],
  },
];
