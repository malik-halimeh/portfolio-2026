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
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://malik-halimeh-portfolio.vercel.app",
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
    note: "Completed with a certificate, October 2026.",
  },
  availability: {
    status: "open" as "open" | "limited" | "closed",
    label: "Open to full-time and contract roles, remote or Lebanon",
    updated: "2026-10-11",
  },
  /** Last-known GitHub figures, used as the fallback when the live fetch fails. */
  githubFallback: {
    contributionsLastYear: 628,
    commitsLastYear: 577,
    fetchedOn: "2026-10-11",
  },
} as const;

/** Concept icons for skills that have no official logo (rendered with Phosphor). */
export type ConceptIcon =
  "database" | "cube" | "browsers" | "seal" | "layers" | "flow" | "chat";

export type Skill = {
  name: string;
  /** Short label for the core tiles. */
  short?: string;
  /** Simple Icons slugs (official brand logos, CC0). */
  icons?: string[];
  /** Fallback when no official logo exists. */
  concept?: ConceptIcon;
  /** Shown in the "core stack" row. */
  core?: boolean;
  /** Words a recruiter might type instead of the name. */
  aliases?: string[];
  usedIn: string[];
  lastUsed: number;
};

export type SkillGroup = { group: string; items: Skill[] };

/**
 * Skills with proof. `usedIn` holds project slugs from data/work-index.ts.
 * Only items that appear on the CV and are visible in a repo are listed.
 */
export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: [
      {
        name: "TypeScript",
        short: "TypeScript",
        icons: ["typescript"],
        core: true,
        aliases: ["ts", "typed javascript", "static typing"],
        usedIn: [
          "tawzeevo",
          "chargehub",
          "opticart",
          "insightflow",
          "interview-lab",
          "sobohnet",
        ],
        lastUsed: 2026,
      },
      {
        name: "JavaScript (ES6+)",
        icons: ["javascript"],
        aliases: ["js", "es6", "ecmascript", "vanilla"],
        usedIn: ["opticart", "sobohnet"],
        lastUsed: 2026,
      },
      {
        name: "Python",
        short: "Python",
        icons: ["python"],
        core: true,
        aliases: ["py", "python3"],
        usedIn: ["tawzeevo"],
        lastUsed: 2026,
      },
      {
        name: "SQL",
        concept: "database",
        aliases: ["queries", "relational", "database", "rdbms"],
        usedIn: ["tawzeevo"],
        lastUsed: 2026,
      },
      {
        name: "HTML5 and CSS3",
        icons: ["html5", "css"],
        aliases: ["html", "css", "markup", "semantic html", "responsive"],
        usedIn: ["sobohnet", "chargehub", "opticart"],
        lastUsed: 2026,
      },
    ],
  },
  {
    group: "Frontend",
    items: [
      {
        name: "React 19",
        short: "React",
        icons: ["react"],
        core: true,
        aliases: ["reactjs", "react.js", "hooks", "jsx", "frontend", "spa"],
        usedIn: ["tawzeevo", "opticart", "interview-lab"],
        lastUsed: 2026,
      },
      {
        name: "Next.js App Router",
        short: "Next.js",
        icons: ["nextdotjs"],
        core: true,
        aliases: [
          "next",
          "nextjs",
          "ssr",
          "ssg",
          "server components",
          "rsc",
          "app router",
          "seo",
        ],
        usedIn: ["chargehub", "tawzeevo", "sobohnet"],
        lastUsed: 2026,
      },
      {
        name: "Vue 3 and Nuxt 4",
        icons: ["vuedotjs", "nuxt"],
        aliases: ["vue", "vuejs", "nuxt", "nuxtjs", "composition api"],
        usedIn: ["insightflow"],
        lastUsed: 2026,
      },
      {
        name: "TanStack Query",
        icons: ["reactquery"],
        aliases: ["react query", "server state", "data fetching", "caching"],
        usedIn: ["tawzeevo"],
        lastUsed: 2026,
      },
      {
        name: "Zustand",
        concept: "cube",
        aliases: ["state management", "redux", "store"],
        usedIn: ["chargehub"],
        lastUsed: 2026,
      },
      {
        name: "Tailwind CSS",
        icons: ["tailwindcss"],
        aliases: ["tailwind", "css", "styling", "design system", "ui"],
        usedIn: ["chargehub", "sobohnet"],
        lastUsed: 2026,
      },
      {
        name: "PWA and offline-first",
        icons: ["pwa"],
        aliases: [
          "offline",
          "service worker",
          "indexeddb",
          "sync",
          "installable",
          "mobile web",
        ],
        usedIn: ["tawzeevo", "interview-lab"],
        lastUsed: 2026,
      },
      {
        name: "i18n and RTL",
        icons: ["i18next"],
        aliases: [
          "arabic",
          "rtl",
          "localization",
          "localisation",
          "internationalization",
          "bilingual",
          "translation",
          "i18next",
        ],
        usedIn: ["tawzeevo", "sobohnet"],
        lastUsed: 2026,
      },
      {
        name: "Core Web Vitals and SEO",
        icons: ["lighthouse"],
        aliases: [
          "performance",
          "seo",
          "lighthouse",
          "web vitals",
          "accessibility",
          "a11y",
        ],
        usedIn: ["sobohnet"],
        lastUsed: 2026,
      },
    ],
  },
  {
    group: "Backend and data",
    items: [
      {
        name: "FastAPI",
        short: "FastAPI",
        icons: ["fastapi"],
        core: true,
        aliases: [
          "fast api",
          "pydantic",
          "python api",
          "rest",
          "openapi",
          "swagger",
          "backend",
        ],
        usedIn: ["tawzeevo"],
        lastUsed: 2026,
      },
      {
        name: "Node.js and Express",
        short: "Node.js",
        icons: ["nodedotjs", "express"],
        core: true,
        aliases: [
          "node",
          "nodejs",
          "express",
          "expressjs",
          "rest api",
          "backend",
          "javascript backend",
          "mern",
        ],
        usedIn: ["opticart"],
        lastUsed: 2026,
      },
      {
        name: "Django REST Framework",
        icons: ["django"],
        aliases: ["drf", "django", "python backend"],
        usedIn: [],
        lastUsed: 2026,
      },
      {
        name: "PostgreSQL and row-level security",
        short: "PostgreSQL",
        icons: ["postgresql"],
        core: true,
        aliases: [
          "postgres",
          "pg",
          "psql",
          "rls",
          "row level security",
          "multi-tenant",
          "multitenant",
          "multitenancy",
          "relational",
          "sql",
        ],
        usedIn: ["tawzeevo", "interview-lab"],
        lastUsed: 2026,
      },
      {
        name: "SQLAlchemy 2 and Alembic",
        icons: ["sqlalchemy"],
        aliases: ["orm", "alembic", "migrations", "sqlalchemy"],
        usedIn: ["tawzeevo"],
        lastUsed: 2026,
      },
      {
        name: "MongoDB and Mongoose",
        short: "MongoDB",
        icons: ["mongodb", "mongoose"],
        core: true,
        aliases: [
          "mongo",
          "nosql",
          "atlas",
          "mongoose",
          "document database",
          "mern",
        ],
        usedIn: ["chargehub", "opticart", "insightflow"],
        lastUsed: 2026,
      },
      {
        name: "Supabase",
        icons: ["supabase"],
        aliases: ["edge functions", "baas", "auth", "postgres"],
        usedIn: ["interview-lab"],
        lastUsed: 2026,
      },
      {
        name: "JWT, secure cookies, RBAC",
        icons: ["jsonwebtokens"],
        aliases: [
          "auth",
          "authentication",
          "authorization",
          "security",
          "rbac",
          "roles",
          "permissions",
          "oauth",
          "sessions",
          "cookies",
          "jwt",
          "argon2",
        ],
        usedIn: ["tawzeevo", "opticart", "chargehub"],
        lastUsed: 2026,
      },
      {
        name: "Stripe-shaped payments and webhooks",
        icons: ["stripe"],
        aliases: ["payments", "checkout", "webhooks", "billing", "stripe"],
        usedIn: ["opticart", "chargehub"],
        lastUsed: 2026,
      },
    ],
  },
  {
    group: "Testing and architecture",
    items: [
      {
        name: "pytest against real PostgreSQL",
        icons: ["pytest"],
        aliases: [
          "python tests",
          "testing",
          "unit tests",
          "integration tests",
          "tdd",
          "pytest",
        ],
        usedIn: ["tawzeevo"],
        lastUsed: 2026,
      },
      {
        name: "Vitest and Testing Library",
        icons: ["vitest", "testinglibrary"],
        aliases: [
          "jest",
          "unit tests",
          "react testing library",
          "frontend tests",
          "testing",
          "tdd",
        ],
        usedIn: ["tawzeevo", "sobohnet"],
        lastUsed: 2026,
      },
      {
        name: "Playwright end-to-end",
        concept: "browsers",
        aliases: [
          "e2e",
          "end to end",
          "end-to-end",
          "cypress",
          "browser tests",
          "qa",
          "testing",
          "playwright",
        ],
        usedIn: ["tawzeevo", "sobohnet"],
        lastUsed: 2026,
      },
      {
        name: "Verification harnesses",
        concept: "seal",
        aliases: [
          "qa",
          "verification",
          "quality",
          "testing",
          "acceptance tests",
        ],
        usedIn: ["chargehub"],
        lastUsed: 2026,
      },
      {
        name: "Clean architecture and SOLID",
        concept: "layers",
        aliases: [
          "solid",
          "design patterns",
          "architecture",
          "ddd",
          "clean code",
          "system design",
          "oop",
        ],
        usedIn: ["tawzeevo", "chargehub"],
        lastUsed: 2026,
      },
      {
        name: "State machines and idempotency",
        concept: "flow",
        aliases: [
          "fsm",
          "xstate",
          "workflow",
          "concurrency",
          "idempotency",
          "exactly once",
          "distributed systems",
          "race conditions",
        ],
        usedIn: ["chargehub", "tawzeevo"],
        lastUsed: 2026,
      },
      {
        name: "mypy strict and TypeScript strict",
        icons: ["python", "typescript"],
        aliases: [
          "type safety",
          "static typing",
          "mypy",
          "strict mode",
          "types",
        ],
        usedIn: ["tawzeevo"],
        lastUsed: 2026,
      },
    ],
  },
  {
    group: "Delivery and AI",
    items: [
      {
        name: "Git and code review",
        icons: ["git", "github"],
        aliases: [
          "github",
          "version control",
          "code review",
          "pull requests",
          "prs",
          "branching",
          "collaboration",
          "teamwork",
        ],
        usedIn: ["tawzeevo", "insightflow", "opticart"],
        lastUsed: 2026,
      },
      {
        name: "GitHub Actions CI/CD",
        icons: ["githubactions"],
        aliases: [
          "ci",
          "cd",
          "ci/cd",
          "cicd",
          "pipelines",
          "devops",
          "automation",
        ],
        usedIn: ["tawzeevo"],
        lastUsed: 2026,
      },
      {
        name: "Docker Compose",
        icons: ["docker"],
        aliases: ["docker", "containers", "devops", "compose"],
        usedIn: ["tawzeevo"],
        lastUsed: 2026,
      },
      {
        name: "Jira and phase planning",
        icons: ["jira"],
        aliases: [
          "agile",
          "scrum",
          "planning",
          "project management",
          "kanban",
          "leadership",
        ],
        usedIn: ["opticart", "insightflow"],
        lastUsed: 2026,
      },
      {
        name: "Vercel, Render, Cloudflare Pages",
        icons: ["vercel", "render", "cloudflare"],
        aliases: [
          "deployment",
          "deploy",
          "hosting",
          "cloud",
          "devops",
          "edge",
          "cdn",
          "vercel",
          "render",
          "cloudflare",
        ],
        usedIn: ["tawzeevo", "interview-lab", "sobohnet"],
        lastUsed: 2026,
      },
      {
        name: "LLM integration with guardrails",
        concept: "chat",
        aliases: [
          "ai",
          "llm",
          "gpt",
          "openai",
          "groq",
          "prompt engineering",
          "generative ai",
          "genai",
          "rag",
          "chatbot",
        ],
        usedIn: ["chargehub", "tawzeevo"],
        lastUsed: 2026,
      },
      {
        name: "AI coding agents, review-led",
        icons: ["claude"],
        aliases: [
          "ai",
          "agents",
          "codex",
          "aider",
          "claude",
          "copilot",
          "cursor",
          "ai assisted",
          "ai-native",
        ],
        usedIn: ["tawzeevo", "chargehub", "sobohnet"],
        lastUsed: 2026,
      },
    ],
  },
];
