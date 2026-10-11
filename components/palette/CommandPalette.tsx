"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "motion/react";

const PaletteContext = createContext<{
  open: () => void;
  close: () => void;
  isOpen: boolean;
} | null>(null);

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette must be used inside PaletteProvider");
  return ctx;
}

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <PaletteContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen && <CommandPalette key="palette" />}
      </AnimatePresence>
    </PaletteContext.Provider>
  );
}

const CommandPalette = dynamic(
  () => import("./CommandPaletteBody").then((m) => m.CommandPaletteBody),
  { ssr: false },
);
