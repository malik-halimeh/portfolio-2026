import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locale as getLocale } from "next/root-params";
import { work, workBySlug } from "@/data/work";
import { profile } from "@/data/profile";
import { CaseStudy } from "@/components/work/CaseStudy";
import { AnnotationsProvider } from "@/components/annotations/Annotations";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = workBySlug[slug];
  if (!item) return {};
  return {
    title: `${item.name}: ${item.outcome}`,
    description: item.oneLiner,
    openGraph: { title: item.name, description: item.oneLiner, type: "article" },
  };
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const item = workBySlug[slug];
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: item.name,
    description: item.oneLiner,
    codeRepository: item.links.repo,
    programmingLanguage: item.stack.slice(0, 3),
    author: { "@type": "Person", name: profile.name, url: profile.siteUrl },
    url: `${profile.siteUrl}/work/${item.slug}`,
  };

  return (
    <AnnotationsProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <CaseStudy item={item} locale={locale ?? "en"} />
    </AnnotationsProvider>
  );
}
