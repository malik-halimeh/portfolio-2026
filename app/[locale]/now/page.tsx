import type { Metadata } from "next";
import { locale as getLocale } from "next/root-params";
import { getTranslations } from "next-intl/server";
import { alternatesFor } from "@/lib/seo";
import { Container } from "@/components/layout/Container";
import { now } from "@/data/about";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Now");
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor((await getLocale()) ?? "en", "/now"),
  };
}

export default async function NowPage() {
  const locale = (await getLocale()) === "ar" ? "ar" : "en";
  const t = await getTranslations("Now");
  return (
    <Container className="py-12 sm:py-20">
      <h1 className="display text-4xl sm:text-6xl">{t("title")}</h1>
      <p className="prose-measure mt-4 text-lg text-fg-muted">{t("intro")}</p>
      <p className="mt-2 font-mono text-sm text-fg-faint" dir="ltr">
        {t("updated")} {now.updated}
      </p>
      <ul className="mt-10 max-w-[65ch] space-y-0">
        {now.items[locale].map((item) => (
          <li
            key={item}
            className="border-t border-line py-5 text-lg text-fg last:border-b"
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-10 max-w-[65ch] text-sm text-fg-faint">{t("credit")}</p>
    </Container>
  );
}
