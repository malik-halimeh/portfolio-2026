import type { Metadata } from "next";
import { locale as getLocale } from "next/root-params";
import { getTranslations } from "next-intl/server";
import { alternatesFor } from "@/lib/seo";
import {
  DownloadSimpleIcon,
  FileJsIcon,
  IdentificationCardIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/layout/Container";
import { profile, skills } from "@/data/profile";
import { work } from "@/data/work";
import { Link } from "@/i18n/navigation";
import { CopyEmail } from "@/components/ui/CopyEmail";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Resume");
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor((await getLocale()) ?? "en", "/resume"),
  };
}

/** The resume as a page: same data as the site, PDF for printing, vCard and JSON for machines. */
export default async function ResumePage() {
  const t = await getTranslations("Resume");
  const cvDate = process.env.NEXT_PUBLIC_CV_UPDATED ?? "2026-09-03";
  return (
    <Container className="py-12 sm:py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="display text-4xl sm:text-6xl">{profile.name}</h1>
          <p className="mt-3 text-xl text-fg-muted">{profile.title}</p>
          <p className="mt-1 text-fg-muted">
            {profile.location.city}, {profile.location.country}
          </p>
          <div className="mt-5">
            <CopyEmail variant="inline" />
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:col-span-4">
          <a
            href="/Malik_Halimeh_CV.pdf"
            download="Malik_Halimeh_CV.pdf"
            className="flex min-h-12 items-center gap-2 rounded-md btn-primary px-4 font-semibold"
          >
            <DownloadSimpleIcon size={18} aria-hidden />
            {t("pdf")}
            <span
              className="ms-auto font-mono text-[11px] text-accent-fg/80"
              dir="ltr"
            >
              {cvDate}
            </span>
          </a>
          <a
            href="/vcard.vcf"
            download="Malik_Halimeh.vcf"
            className="flex min-h-12 items-center gap-2 rounded-md border border-line px-4 font-medium text-fg hover:border-accent"
          >
            <IdentificationCardIcon size={18} aria-hidden />
            {t("vcard")}
          </a>
          <a
            href="/resume.json"
            className="flex min-h-12 items-center gap-2 rounded-md border border-line px-4 font-medium text-fg hover:border-accent"
            dir="ltr"
          >
            <FileJsIcon size={18} aria-hidden />
            {t("json")}
          </a>
        </div>
      </div>

      <section className="mt-16" aria-labelledby="summary-title">
        <h2
          id="summary-title"
          className="font-mono text-[11px] uppercase tracking-wider text-fg-faint"
        >
          {t("summary")}
        </h2>
        <p className="prose-measure mt-3 text-lg text-fg">
          Full-stack developer and current full-stack web development and AI
          intern with a B.S. in Computer Science, building secure,
          production-style applications across TypeScript and Python stacks.
          Delivers multi-tenant systems, role-based access, concurrency-safe
          workflows, bilingual interfaces and automated validation. Leads
          collaborative delivery from architecture and task planning through
          review, testing and deployment.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="exp-title">
        <h2
          id="exp-title"
          className="font-mono text-[11px] uppercase tracking-wider text-fg-faint"
        >
          {t("experience")}
        </h2>
        <div className="mt-3 border-t border-line py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-fg">
              {profile.experience.role}
            </h3>
            <p className="font-mono text-sm text-fg-muted" dir="ltr">
              {profile.experience.period}
            </p>
          </div>
          <p className="text-fg-muted">{profile.experience.org}</p>
          <ul className="prose-measure mt-3 list-disc space-y-1.5 ps-5 text-fg-muted marker:text-accent">
            <li>
              Intensive programme on modern software architecture and
              production-ready applications with React, Next.js, TypeScript, Vue
              and Nuxt, Node.js, Express, FastAPI and Django REST Framework.
            </li>
            <li>
              Relational and NoSQL data layers with MySQL, PostgreSQL and
              MongoDB; CRUD, schema validation, JWT authentication, secure
              cookies, RBAC, end-to-end MERN and Python-stack integration.
            </li>
            <li>
              SOLID, clean architecture, reusable components, Agile and Scrum,
              Git branching and pull-request workflows, Jira, Jest and Vitest,
              GitHub Actions, Vercel and Render deployment, LLM and AI API
              integrations.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="proj-title">
        <h2
          id="proj-title"
          className="font-mono text-[11px] uppercase tracking-wider text-fg-faint"
        >
          {t("projects")}
        </h2>
        <ul className="mt-3">
          {work.map((w) => (
            <li key={w.slug} className="border-t border-line py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight text-fg">
                  <Link href={`/work/${w.slug}`} className="hover:text-accent">
                    {w.name}
                  </Link>
                  <span className="font-normal text-fg-muted"> · {w.role}</span>
                </h3>
                <p className="font-mono text-sm text-fg-muted" dir="ltr">
                  {w.period}
                </p>
              </div>
              <p className="mt-1 font-mono text-[12px] text-fg-faint" dir="ltr">
                {w.stack.slice(0, 6).join(", ")}
              </p>
              <p className="prose-measure mt-2 text-fg-muted">{w.oneLiner}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="skills-title">
        <h2
          id="skills-title"
          className="font-mono text-[11px] uppercase tracking-wider text-fg-faint"
        >
          {t("skills")}
        </h2>
        <dl className="mt-3 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          {skills.map((g) => (
            <div key={g.group} className="border-t border-line py-4">
              <dt className="font-semibold text-fg">{g.group}</dt>
              <dd className="mt-1 text-fg-muted">
                {g.items.map((i) => i.name).join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2"
        aria-label={t("education")}
      >
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
            {t("education")}
          </h2>
          <p className="mt-3 font-semibold text-fg">
            {profile.education.degree}
          </p>
          <p className="text-fg-muted">
            {profile.education.school}, {profile.education.campus}
          </p>
          <p className="font-mono text-sm text-fg-muted" dir="ltr">
            {profile.education.years}
          </p>
        </div>
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
            {t("languages")}
          </h2>
          <ul className="mt-3 text-fg-muted">
            {profile.languages.map((l) => (
              <li key={l.name}>
                <span className="font-semibold text-fg">{l.name}</span> ·{" "}
                {l.level}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Container>
  );
}
