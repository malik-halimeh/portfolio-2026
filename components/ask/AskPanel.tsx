"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRightIcon, ChatCircleDotsIcon, XIcon } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";

type Source = { id: string; title: string; url: string };
type Answer = { answer: string; sources: Source[]; mode: "model" | "extractive" | "none" };

const Ctx = createContext<{ ask: (q?: string) => void; close: () => void; isOpen: boolean } | null>(null);

export function useAsk() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAsk must be used inside AskProvider");
  return ctx;
}

export function AskProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [initial, setInitial] = useState("");
  const [session, setSession] = useState(0);
  const ask = useCallback((q?: string) => {
    setInitial(q ?? "");
    setSession((n) => n + 1);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ ask, close, isOpen }), [ask, close, isOpen]);
  return (
    <Ctx.Provider value={value}>
      {children}
      <AskPanel key={session} isOpen={isOpen} initial={initial} close={close} />
    </Ctx.Provider>
  );
}

const SUGGESTIONS = ["What did Malik build for Tawzeevo?", "How does ChargeHub prevent double booking?", "How does Malik use AI tools?", "Is Malik available for remote work?"];

function AskPanel({ isOpen, initial, close }: { isOpen: boolean; initial: string; close: () => void }) {
  const t = useTranslations("Ask");
  const reduce = useReducedMotion();
  const [q, setQ] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Answer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const id = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [isOpen, close]);

  const submit = async (question: string) => {
    if (question.trim().length < 3 || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }) });
      if (!res.ok) throw new Error(String(res.status));
      setResult((await res.json()) as Answer);
    } catch {
      setError(t("error"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="ask"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-bg-sunken/70 p-0 backdrop-blur-sm sm:items-start sm:px-4 sm:pt-[10vh]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ask-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-lg border border-line bg-bg-elevated p-5 shadow-card sm:rounded-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="ask-title" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                  <ChatCircleDotsIcon size={20} className="text-accent" aria-hidden />
                  {t("title")}
                </h2>
                <p className="mt-1 text-sm text-fg-muted">{t("intro")}</p>
              </div>
              <button type="button" onClick={close} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-fg-muted hover:text-fg" aria-label={t("close")}>
                <XIcon size={18} aria-hidden />
              </button>
            </div>

            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void submit(q);
              }}
            >
              <label htmlFor="ask-input" className="sr-only">
                {t("label")}
              </label>
              <input
                id="ask-input"
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                maxLength={400}
                placeholder={t("placeholder")}
                className="h-12 min-w-0 flex-1 rounded-md border border-line bg-bg px-4 text-fg outline-none placeholder:text-fg-faint focus:border-accent"
              />
              <button type="submit" disabled={busy || q.trim().length < 3} className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-4 font-semibold text-accent-fg disabled:opacity-50">
                {busy ? t("thinking") : t("ask")}
                {!busy && <ArrowRightIcon size={16} aria-hidden className="rtl:-scale-x-100" />}
              </button>
            </form>

            {!result && !busy && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => {
                        setQ(s);
                        void submit(s);
                      }}
                      className="inline-flex min-h-9 items-center rounded-md border border-line px-3 text-sm text-fg-muted hover:border-line-strong hover:text-fg"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div aria-live="polite" className="mt-5">
              {busy && <div className="h-16 animate-pulse rounded-md bg-bg-sunken" aria-hidden />}
              {error && <p className="text-sm text-danger">{error}</p>}
              {result && !busy && (
                <div>
                  <p className="text-[15px] leading-relaxed text-fg">{result.answer}</p>
                  {result.sources.length > 0 && (
                    <div className="mt-4">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">{t("sources")}</p>
                      <ol className="mt-2 space-y-1 text-sm">
                        {result.sources.map((s, i) => (
                          <li key={s.id}>
                            <span className="me-2 font-mono text-[11px] text-fg-faint">[{i + 1}]</span>
                            <Link href={s.url} onClick={close} className="text-fg underline decoration-line underline-offset-4 hover:decoration-accent">
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  <p className="mt-4 text-xs text-fg-faint">{result.mode === "model" ? t("modeModel") : t("modeExtractive")}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
