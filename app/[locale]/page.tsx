import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { WorkList } from "@/components/home/WorkList";
import { Guarantees } from "@/components/home/Guarantees";
import { StackProof } from "@/components/home/StackProof";
import { LiveProof } from "@/components/home/LiveProof";
import { AboutShort } from "@/components/home/AboutShort";
import { Contact } from "@/components/home/Contact";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export default async function HomePage() {
  const t = await getTranslations("Home");
  return (
    <>
      <Hero />
      <Section id="work" title={t("work.title")} intro={t("work.intro")}>
        <WorkList />
      </Section>
      <Section id="guarantees" title={t("guarantees.title")} intro={t("guarantees.intro")}>
        <Guarantees />
      </Section>
      <Section id="stack" title={t("stack.title")} intro={t("stack.intro")}>
        <StackProof />
      </Section>
      <section id="proof" aria-label={t("proof.aria")} className="py-6">
        <Container>
          <LiveProof />
        </Container>
      </section>
      <Section id="about" title={t("about.title")}>
        <AboutShort />
      </Section>
      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <Contact />
        </Container>
      </section>
    </>
  );
}
