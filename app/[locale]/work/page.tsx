import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WorkList } from "@/components/home/WorkList";
import { Container } from "@/components/layout/Container";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Work");
  return { title: t("indexTitle"), description: t("indexIntro") };
}

export default async function WorkIndex() {
  const t = await getTranslations("Work");
  return (
    <Container className="py-12 sm:py-20">
      <h1 className="display text-4xl sm:text-6xl">{t("indexTitle")}</h1>
      <p className="prose-measure mt-4 text-lg text-fg-muted">{t("indexIntro")}</p>
      <div className="mt-12">
        <WorkList />
      </div>
    </Container>
  );
}
