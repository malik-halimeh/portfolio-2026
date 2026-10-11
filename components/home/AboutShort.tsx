import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

export function AboutShort() {
  const t = useTranslations("Home.about");
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-3">
        <div className="relative inline-block md:block">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-md bg-gradient-to-br from-ember/60 via-accent/40 to-sea/50 rtl:-translate-x-3"
          />
          <Image
            src="/malik.webp"
            alt={t("photoAlt")}
            width={640}
            height={640}
            sizes="(min-width: 768px) 220px, 160px"
            className="relative h-40 w-40 rounded-md object-cover ring-1 ring-line md:h-auto md:w-full"
          />
        </div>
      </div>
      <div className="md:col-span-9">
        <p className="prose-measure text-lg text-fg sm:text-xl">{t("p1")}</p>
        <p className="prose-measure mt-4 text-fg-muted">{t("p2")}</p>
        <p className="prose-measure mt-4 text-fg-muted">{t("p3")}</p>
        <Link
          href="/about"
          className="mt-6 inline-flex min-h-10 items-center gap-1.5 font-medium text-fg underline-offset-4 hover:underline"
        >
          {t("more")}
          <ArrowRightIcon size={16} aria-hidden className="rtl:-scale-x-100" />
        </Link>
      </div>
    </div>
  );
}
