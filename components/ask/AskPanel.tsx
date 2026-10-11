"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";

const Ctx = createContext<{
  ask: (q?: string) => void;
  close: () => void;
  isOpen: boolean;
} | null>(null);

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
      {isOpen && (
        <AskPanelBody
          key={session}
          isOpen={isOpen}
          initial={initial}
          close={close}
        />
      )}
    </Ctx.Provider>
  );
}

const AskPanelBody = dynamic(
  () => import("./AskPanelBody").then((m) => m.AskPanelBody),
  { ssr: false },
);
