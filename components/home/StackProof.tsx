"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { skills } from "@/data/profile";
import { workIndex } from "@/data/work-index";
import { cx } from "@/lib/utils";

/**
 * Skills as proof, not bars. Every chip is a button; selecting it shows which
 * projects used it, with links. Nothing unproven is listed.
 */
export function StackProof() {
  const t = useTranslations("Home.stack");
  const [selected, setSelected] = useState<{
    group: number;
    item: number;
  } | null>(null);
  const reduce = useReducedMotion();
  const panelId = useId();

  const current = selected ? skills[selected.group].items[selected.item] : null;

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, gi) => (
          <div key={g.group}>
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-sea">
              {g.group}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((item, ii) => {
                const isSel = selected?.group === gi && selected?.item === ii;
                return (
                  <li key={item.name}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelected(isSel ? null : { group: gi, item: ii })
                      }
                      aria-pressed={isSel}
                      aria-controls={panelId}
                      className={cx(
                        "inline-flex min-h-9 items-center rounded-md border px-3 text-sm transition-colors",
                        isSel
                          ? "border-accent bg-accent-soft text-fg"
                          : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
                      )}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div id={panelId} aria-live="polite" className="mt-8 min-h-14">
        <AnimatePresence mode="wait">
          {current ? (
            <m.div
              key={current.name}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-md border border-line bg-bg-elevated px-4 py-3 text-sm"
            >
              <span className="font-semibold text-fg">{current.name}</span>
              <span className="text-fg-muted">
                {" "}
                · {t("lastUsed", { year: current.lastUsed })}
              </span>
              {current.usedIn.length > 0 ? (
                <span className="text-fg-muted">
                  {" "}
                  · {t("usedIn")}{" "}
                  {current.usedIn.map((slug, i) => (
                    <span key={slug}>
                      <Link
                        href={`/work/${slug}`}
                        className="text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
                      >
                        {workIndex.find((w) => w.slug === slug)?.name ?? slug}
                      </Link>
                      {i < current.usedIn.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="text-fg-muted"> · {t("internship")}</span>
              )}
            </m.div>
          ) : (
            <m.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-fg-faint"
            >
              {t("hint")}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
