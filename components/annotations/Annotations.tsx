"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { NotePencilIcon } from "@phosphor-icons/react";
import { cx } from "@/lib/utils";

/**
 * Margin notes: Malik's first-person commentary beside case-study paragraphs.
 * One site-wide switch, persisted. Desktop renders true sidenotes in the right gutter;
 * mobile renders an inline note under the paragraph. Nothing is hidden from
 * screen readers when on; when off, notes are not rendered at all.
 */

const KEY = "mh-annotations";
const EVENT = "mh-annotations-change";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
function getSnapshot() {
  try {
    return localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
}
const getServerSnapshot = () => false;

const Ctx = createContext<{ on: boolean; toggle: () => void } | null>(null);

export function AnnotationsProvider({ children }: { children: ReactNode }) {
  const on = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggle = useCallback(() => {
    try {
      localStorage.setItem(KEY, getSnapshot() ? "off" : "on");
    } catch {
      /* private mode */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  const value = useMemo(() => ({ on, toggle }), [on, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAnnotations() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useAnnotations must be used inside AnnotationsProvider");
  return ctx;
}

export function AnnotationsToggle({ className }: { className?: string }) {
  const { on, toggle } = useAnnotations();
  const t = useTranslations("Work");
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className={cx(
        "inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm transition-colors",
        on
          ? "border-accent bg-accent-soft text-fg"
          : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      <NotePencilIcon size={16} aria-hidden />
      {t("marginNotes")}
      <span className="font-mono text-[11px] text-fg-faint">
        {on ? t("on") : t("off")}
      </span>
    </button>
  );
}

/** A paragraph (or block) that may carry a margin note. */
export function Annotated({
  note,
  children,
  className,
  as: Tag = "div",
}: {
  note?: string;
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const { on } = useAnnotations();
  const reduce = useReducedMotion();
  const t = useTranslations("Work");
  return (
    <Tag className={cx("relative", className)}>
      {children}
      <AnimatePresence initial={false}>
        {on && note && (
          <m.aside
            key="note"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            aria-label={t("marginNote")}
            className="mt-3 border-s-2 border-accent ps-4 text-[15px] leading-relaxed text-fg-muted xl:absolute xl:top-0 xl:mt-0 xl:w-64 xl:ps-4 xl:text-[14px] ltr:xl:left-full ltr:xl:ml-10 rtl:xl:right-full rtl:xl:mr-10"
          >
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-accent">
              {t("marginNote")}
            </span>
            {note}
          </m.aside>
        )}
      </AnimatePresence>
    </Tag>
  );
}
