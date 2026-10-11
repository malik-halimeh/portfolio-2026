"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowUpRightIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { workIndex as work } from "@/data/work-index";
import { StatusChip } from "@/components/ui/StatusChip";
import { cx } from "@/lib/utils";

/**
 * Editorial list, not cards. Desktop: a sticky preview on the right swaps the
 * screenshot of the hovered or focused row. Mobile: the screenshot sits under each row.
 */
export function WorkList() {
  const t = useTranslations("Home.work");
  const [active, setActive] = useState(work[0].slug);
  const reduce = useReducedMotion();
  const current = work.find((w) => w.slug === active) ?? work[0];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <ol className="lg:col-span-7">
        {work.map((w, i) => (
          <li key={w.slug} className="border-t border-line last:border-b">
            <Link
              href={`/work/${w.slug}`}
              onPointerEnter={() => setActive(w.slug)}
              onFocus={() => setActive(w.slug)}
              className={cx(
                "group block py-6 outline-none transition-colors focus-visible:bg-accent-soft/40 sm:py-7",
                active === w.slug && "lg:bg-bg-elevated/40",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                    {w.name}
                    <ArrowUpRightIcon
                      size={18}
                      aria-hidden
                      className="ms-1.5 inline-block -translate-y-0.5 text-fg-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-1 group-hover:text-accent rtl:-scale-x-100"
                    />
                  </h3>
                  <p className="mt-2 max-w-[60ch] text-fg-muted">{w.outcome}</p>
                  <p className="mt-3 font-mono text-[12px] text-fg-faint">
                    {w.role}, {w.period}
                  </p>
                  <p
                    className="mt-1 font-mono text-[12px] text-fg-faint"
                    dir="ltr"
                  >
                    {w.stack.slice(0, 4).join(", ")}
                  </p>
                </div>
                <StatusChip
                  kind={w.status.kind}
                  label={w.status.label}
                  className="mt-1 shrink-0"
                />
              </div>
              {i === 0 && (
                <p className="mt-4 max-w-[60ch] text-sm text-fg-muted">
                  {t("featuredNote")}
                </p>
              )}
              <div className="mt-5 overflow-hidden rounded-md border border-line lg:hidden">
                <Image
                  src={w.image.src}
                  alt={w.image.alt}
                  width={w.image.width}
                  height={w.image.height}
                  sizes="(max-width: 1024px) 100vw, 0px"
                  className="h-auto w-full"
                />
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-24">
          <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-bg-elevated">
            <AnimatePresence initial={false} mode="popLayout">
              <m.div
                key={current.slug}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image.src}
                  alt={current.image.alt}
                  fill
                  sizes="(min-width: 1024px) 480px, 0px"
                  className="object-cover object-top"
                  priority={current.slug === work[0].slug}
                />
              </m.div>
            </AnimatePresence>
          </div>
          <p className="mt-3 text-sm text-fg-muted">{current.oneLiner}</p>
          <Link
            href={`/work/${current.slug}`}
            className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-fg underline-offset-4 hover:underline"
          >
            {t("open", { name: current.name })}
            <ArrowRightIcon
              size={14}
              aria-hidden
              className="rtl:-scale-x-100"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
