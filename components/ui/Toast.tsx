"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

type Toast = { id: number; message: string };

const ToastContext = createContext<{ toast: (message: string) => void } | null>(
  null,
);

/** One toast at a time, bottom-centre, 2.5 s, announced politely to screen readers. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Toast | null>(null);
  const timer = useRef<number | null>(null);
  const reduce = useReducedMotion();

  const toast = useCallback((message: string) => {
    if (timer.current) window.clearTimeout(timer.current);
    setCurrent({ id: Date.now(), message });
    timer.current = window.setTimeout(() => setCurrent(null), 2500);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      >
        <AnimatePresence>
          {current && (
            <m.div
              key={current.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-md border border-line bg-bg-elevated px-4 py-2 text-sm font-medium text-fg shadow-card"
            >
              {current.message}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
