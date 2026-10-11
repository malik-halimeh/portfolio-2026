import type { Metadata } from "next";
import Image from "next/image";
import { locale as getLocale } from "next/root-params";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { about } from "@/data/about";
import { profile } from "@/data/profile";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About");
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage() {
  const locale = (await getLocale()) === "ar" ? "ar" : "en";
  const t = await getTranslations("About");
  return (
    <Container className="py-12 sm:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="display text-4xl sm:text-6xl">{t("title")}</h1>
          <p className="prose-measure mt-6 text-xl text-fg">{about.intro[locale]}</p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <Image src="/malik.webp" alt={profile.name} width={640} height={640} sizes="(min-width: 1024px) 260px, 180px" className="h-44 w-44 rounded-md object-cover lg:h-64 lg:w-64" priority />
        </div>
      </div>

      <section aria-labelledby="timeline-title" className="mt-20">
        <h2 id="timeline-title" className="display text-3xl sm:text-4xl">
          {t("timeline")}
        </h2>
        <ol className="mt-8">
          {about.timeline.map((e) => (
            <li key={e.period} className="grid grid-cols-1 gap-2 border-t border-line py-7 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{locale === "ar" ? e.whenAr : e.when}</p>
                <p className="mt-1 font-mono text-sm text-fg-muted" dir="ltr">
                  {e.period}
                </p>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-xl font-semibold tracking-tight text-fg">{e.title[locale]}</h3>
                <p className="prose-measure mt-2 text-fg-muted">{e.body[locale]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="how-title" className="mt-20">
        <h2 id="how-title" className="display text-3xl sm:text-4xl">
          {about.howIWork.title[locale]}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {about.howIWork.items.map((i, n) => (
            <div key={n} className="border-t border-line py-6">
              <h3 className="text-lg font-semibold tracking-tight text-fg">{i.title[locale]}</h3>
              <p className="mt-2 max-w-[52ch] text-fg-muted">{i.body[locale]}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="ai-title" className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="ai-title" className="display text-3xl sm:text-4xl">
            {about.ai.title[locale]}
          </h2>
        </div>
        <div className="lg:col-span-8">
          {about.ai.body[locale].map((p, i) => (
            <p key={i} className="prose-measure mb-5 text-lg text-fg-muted first:text-fg">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-line pt-10">
        <p className="prose-measure text-lg text-fg-muted">{about.personal[locale]}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/resume" className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 font-semibold text-accent-fg">
            {t("resume")}
            <ArrowRightIcon size={16} aria-hidden className="rtl:-scale-x-100" />
          </Link>
          <Link href="/now" className="inline-flex h-11 items-center rounded-md border border-line px-5 font-medium text-fg hover:border-accent">
            {t("now")}
          </Link>
        </div>
      </section>
    </Container>
  );
}
