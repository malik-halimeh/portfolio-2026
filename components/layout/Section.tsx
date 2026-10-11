import type { ReactNode } from "react";
import { Container } from "./Container";
import { cx } from "@/lib/utils";

/**
 * Section shell: heading optional, no eyebrow by default (eyebrows are rationed site-wide).
 */
export function Section({
  id,
  title,
  intro,
  children,
  className,
  titleAs: Title = "h2",
}: {
  id: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  titleAs?: "h1" | "h2";
}) {
  return (
    <section id={id} aria-labelledby={title ? `${id}-title` : undefined} className={cx("scroll-mt-20 py-16 sm:py-24", className)}>
      <Container>
        {title && (
          <header className="mb-10 sm:mb-12">
            <Title id={`${id}-title`} className="display text-3xl sm:text-5xl">
              {title}
            </Title>
            {intro && <p className="prose-measure mt-4 text-lg text-fg-muted">{intro}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
