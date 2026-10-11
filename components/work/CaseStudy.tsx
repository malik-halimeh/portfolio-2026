import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRightIcon, ArrowSquareOutIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { work, type Work } from "@/data/work";
import { Container } from "@/components/layout/Container";
import { StatusChip } from "@/components/ui/StatusChip";
import { DemoHealth } from "@/components/home/DemoHealth";
import { Annotated, AnnotationsToggle } from "@/components/annotations/Annotations";
import { LifecyclePlayground } from "@/components/lifecycle/LifecyclePlayground";
import { TawzeevoArchitecture } from "@/components/work/TawzeevoArchitecture";
import { CompareSlider } from "@/components/work/CompareSlider";
import { RaschSandbox } from "@/components/work/RaschSandbox";

/**
 * The fixed case-study structure: Problem, Guarantees, Decisions, Evidence,
 * optional interactive artifact, What I'd change. Margin notes attach by anchor.
 */
export async function CaseStudy({ item, locale }: { item: Work; locale: string }) {
  const t = await getTranslations("Work");
  const cs = item.caseStudy;
  const note = (anchor: string) => cs.notes.find((n) => n.anchor === anchor)?.text;
  const idx = work.findIndex((w) => w.slug === item.slug);
  const next = work[(idx + 1) % work.length];
  const isLive = item.status.kind === "live";
  const demoUrl = item.links.demo ?? item.links.preview;
  const healthTarget = item.slug === "tawzeevo" ? "tawzeevo" : item.slug === "sobohnet" ? "sobohnet" : null;

  return (
    <article className="pb-8">
      <Container className="pt-10 sm:pt-16">
        {locale === "ar" && <p className="mb-6 rounded-md border border-line bg-bg-elevated px-4 py-3 text-sm text-fg-muted">{t("englishOnly")}</p>}
        <p className="font-mono text-sm text-fg-muted">{item.name}</p>
        <h1 className="display mt-3 max-w-[22ch] text-4xl sm:text-6xl">{item.outcome}</h1>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm lg:col-span-7 lg:grid-cols-3">
            <Meta label={t("meta.role")}>{item.role}</Meta>
            <Meta label={t("meta.team")}>{item.team}</Meta>
            <Meta label={t("meta.period")}>{item.period}</Meta>
            <Meta label={t("meta.status")}>
              <StatusChip kind={item.status.kind} label={item.status.label} />
            </Meta>
            <div className="col-span-2 lg:col-span-2">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">{t("meta.stack")}</dt>
              <dd className="mt-1 text-fg-muted" dir="ltr">
                {item.stack.join(", ")}
              </dd>
            </div>
          </dl>
          <div className="flex flex-col gap-3 lg:col-span-5">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener"
                className="flex min-h-14 items-center justify-between gap-3 rounded-md bg-accent px-4 font-semibold text-accent-fg active:translate-y-px"
              >
                <span className="inline-flex items-center gap-2">
                  <ArrowSquareOutIcon size={18} aria-hidden />
                  {isLive ? t("openDemo") : t("openPreview")}
                </span>
                {healthTarget && <DemoHealth target={healthTarget} className="text-accent-fg/80 [&_span]:text-accent-fg/80" />}
              </a>
            )}
            {item.links.demoNote && <p className="text-sm text-fg-muted">{item.links.demoNote}</p>}
            {item.links.repo && (
              <a
                href={item.links.repo}
                target="_blank"
                rel="noopener"
                className="flex min-h-14 items-center gap-2 rounded-md border border-line px-4 font-medium text-fg hover:border-accent"
              >
                <GithubLogoIcon size={18} aria-hidden />
                {t("viewSource")}
                <span className="ms-auto truncate font-mono text-[11px] text-fg-faint" dir="ltr">
                  {item.links.repo.replace("https://github.com/", "")}
                </span>
              </a>
            )}
            <AnnotationsToggle className="self-start" />
          </div>
        </div>

        <figure className="mt-12 overflow-hidden rounded-md border border-line">
          <Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} sizes="(min-width: 1280px) 1200px, 100vw" priority className="h-auto w-full" />
        </figure>
      </Container>

      <Container className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Block id="problem" title={t("sections.problem")}>
            {cs.problem.map((p, i) => (
              <Annotated key={i} note={i === 0 ? note("problem") : undefined} className="mb-5">
                <p className="prose-measure text-lg text-fg">{p}</p>
              </Annotated>
            ))}
          </Block>

          <Block id="guarantees" title={t("sections.guarantees")} intro={t("sections.guaranteesIntro")}>
            <dl>
              {cs.guarantees.map((g, i) => (
                <Annotated key={g.title} note={note(`guarantee-${i}`)} className="border-t border-line py-5">
                  <dt className="font-semibold text-fg">{g.title}</dt>
                  <dd className="prose-measure mt-1.5 text-fg-muted">{g.detail}</dd>
                </Annotated>
              ))}
            </dl>
          </Block>

          <Block id="decisions" title={t("sections.decisions")} intro={t("sections.decisionsIntro")}>
            <ol className="space-y-8">
              {cs.decisions.map((d, i) => (
                <Annotated key={d.title} note={note(`decision-${i}`)}>
                  <li className="grid grid-cols-[2rem_1fr] gap-x-3">
                    <span className="pt-1 font-mono text-xs text-fg-faint" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-fg">{d.title}</h3>
                      <dl className="mt-3 grid grid-cols-1 gap-3 text-[15px] sm:grid-cols-3">
                        <div className="rounded-md border border-accent/30 bg-accent-soft/50 p-3">
                          <dt className="font-mono text-[10px] uppercase tracking-wider text-accent">{t("decision.choice")}</dt>
                          <dd className="mt-1 text-fg">{d.choice}</dd>
                        </div>
                        <div className="rounded-md border border-line p-3">
                          <dt className="font-mono text-[10px] uppercase tracking-wider text-fg-faint">{t("decision.alternative")}</dt>
                          <dd className="mt-1 text-fg-muted">{d.alternative}</dd>
                        </div>
                        <div className="rounded-md border border-line p-3">
                          <dt className="font-mono text-[10px] uppercase tracking-wider text-fg-faint">{t("decision.consequence")}</dt>
                          <dd className="mt-1 text-fg-muted">{d.consequence}</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                </Annotated>
              ))}
            </ol>
          </Block>

          <Block id="evidence" title={t("sections.evidence")}>
            <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {cs.evidence.map((e, i) => (
                <Annotated key={e.label} note={note(`evidence-${i}`)} className="border-t border-line py-5">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">{e.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-tight text-fg" dir="ltr">
                    {e.value}
                  </dd>
                  {e.detail && <dd className="mt-1 text-sm text-fg-muted">{e.detail}</dd>}
                </Annotated>
              ))}
            </dl>
          </Block>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {item.gallery?.map((g) => (
              <figure key={g.src} className="overflow-hidden rounded-md border border-line">
                <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 1024px) 380px, 100vw" className="h-auto w-full" />
                <figcaption className="px-3 py-2 text-xs text-fg-muted">{g.alt}</figcaption>
              </figure>
            ))}
            <nav aria-label={t("onThisPage")} className="hidden rounded-md border border-line p-4 text-sm lg:block">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">{t("onThisPage")}</p>
              <ul className="mt-2 space-y-1.5">
                {["problem", "guarantees", "decisions", "evidence", ...(cs.interactive ? ["playground"] : []), "retro"].map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-fg-muted hover:text-fg">
                      {t(`sections.${id}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </Container>

      {cs.interactive && (
        <Container className="mt-8">
          <Block id="playground" title={t("sections.playground")} intro={t(`interactive.${cs.interactive}`)}>
            {cs.interactive === "chargehub-machine" && <LifecyclePlayground />}
            {cs.interactive === "tawzeevo-architecture" && <TawzeevoArchitecture />}
            {cs.interactive === "insightflow-compare" && <CompareSlider />}
            {cs.interactive === "rasch-sandbox" && <RaschSandbox />}
          </Block>
        </Container>
      )}

      <Container className="mt-8">
        <Block id="retro" title={t("sections.retro")}>
          <ul className="prose-measure list-disc space-y-2 ps-5 text-fg-muted marker:text-accent">
            {cs.whatIdChange.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </Block>

        <div className="mt-16 border-t border-line pt-8">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">{t("next")}</p>
          <Link href={`/work/${next.slug}`} className="group mt-2 inline-flex items-center gap-2 text-2xl font-semibold tracking-tight text-fg">
            {next.name}
            <ArrowRightIcon size={20} aria-hidden className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
          </Link>
          <p className="prose-measure mt-1 text-fg-muted">{next.outcome}</p>
        </div>
      </Container>
    </article>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">{label}</dt>
      <dd className="mt-1 text-fg-muted">{children}</dd>
    </div>
  );
}

function Block({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-8 first:pt-0">
      <h2 id={`${id}-title`} className="display text-3xl sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="prose-measure mt-3 text-fg-muted">{intro}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}
