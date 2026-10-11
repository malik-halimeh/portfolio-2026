import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { LifecycleAmbient } from "@/components/lifecycle/LifecycleAmbient";
import { Container } from "@/components/layout/Container";

export function Hero() {
  const t = useTranslations("Home.hero");
  return (
    <section aria-labelledby="hero-title" className="relative">
      <Container className="grid min-h-[calc(100dvh-4rem)] grid-cols-1 items-center gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="display text-[clamp(2.75rem,7.5vw,6rem)]"
          >
            {t.rich("title", { em: (chunks) => <em>{chunks}</em> })}
          </h1>
          <p className="prose-measure mt-6 text-lg text-fg-muted sm:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#work"
              className="btn-primary inline-flex h-12 items-center gap-2 rounded-md px-5 font-semibold active:translate-y-px"
            >
              {t("cta")}
              <ArrowDownIcon size={16} aria-hidden />
            </Link>
            <CopyEmail />
          </div>
        </div>
        <div className="lg:col-span-5">
          <LifecycleAmbient label={t("artifactLabel")} cta={t("artifactCta")} />
        </div>
      </Container>
      <div aria-hidden className="horizon" />
    </section>
  );
}
