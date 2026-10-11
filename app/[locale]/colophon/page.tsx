import type { Metadata } from "next";
import { locale as getLocale } from "next/root-params";
import { getTranslations } from "next-intl/server";
import { alternatesFor } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { colophon } from "@/data/colophon";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Colophon");
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor((await getLocale()) ?? "en", "/colophon"),
  };
}

/** How this site is built: a small case study of the portfolio itself. */
export default async function ColophonPage() {
  const t = await getTranslations("Colophon");
  const built = (process.env.NEXT_PUBLIC_BUILD_DATE ?? "").slice(0, 10);
  return (
    <Container className="py-12 sm:py-20">
      <h1 className="display text-4xl sm:text-6xl">{t("title")}</h1>
      <p className="prose-measure mt-4 text-lg text-fg-muted">{t("intro")}</p>

      <section className="mt-14" aria-labelledby="stack-title">
        <h2 id="stack-title" className="display text-3xl">
          {t("stack")}
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-x-8 md:grid-cols-2">
          {colophon.stack.map((s) => (
            <div key={s.name} className="border-t border-line py-4">
              <dt className="font-semibold text-fg">
                {s.name}{" "}
                <span className="font-mono text-[12px] font-normal text-fg-faint">
                  {s.version}
                </span>
              </dt>
              <dd className="mt-1 text-fg-muted">{s.why}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14" aria-labelledby="decisions-title">
        <h2 id="decisions-title" className="display text-3xl">
          {t("decisions")}
        </h2>
        <ol className="mt-6 space-y-5">
          {colophon.decisions.map((d, i) => (
            <li
              key={d.title}
              className="grid grid-cols-[2rem_1fr] gap-x-3 border-t border-line pt-4"
            >
              <span className="font-mono text-xs text-fg-faint" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold text-fg">{d.title}</h3>
                <p className="prose-measure mt-1 text-fg-muted">{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14" aria-labelledby="budget-title">
        <h2 id="budget-title" className="display text-3xl">
          {t("performance")}
        </h2>
        <p className="prose-measure mt-3 text-fg-muted">
          {t("performanceIntro")}
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {colophon.lighthouse.scores.map((s) => (
            <div key={s.label} className="rounded-md border border-line p-4">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                {s.label}
              </dt>
              <dd
                className="mt-1 text-3xl font-semibold tracking-tight text-fg"
                dir="ltr"
              >
                {s.value ?? "…"}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-mono text-[12px] text-fg-faint" dir="ltr">
          {colophon.lighthouse.note}{" "}
          {colophon.lighthouse.measuredOn
            ? `Measured ${colophon.lighthouse.measuredOn}.`
            : ""}{" "}
          Last build {built || "local"}.
        </p>
      </section>

      <section className="mt-14" aria-labelledby="a11y-title">
        <h2 id="a11y-title" className="display text-3xl">
          {t("accessibility")}
        </h2>
        <ul className="prose-measure mt-6 list-disc space-y-2 ps-5 text-fg-muted marker:text-accent">
          {colophon.accessibility.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section className="mt-14 border-t border-line pt-8">
        <p className="text-fg-muted">
          {t("source")}{" "}
          <a
            href={colophon.repo}
            className="text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
            dir="ltr"
          >
            {colophon.repo.replace("https://", "")}
          </a>
        </p>
      </section>
    </Container>
  );
}
