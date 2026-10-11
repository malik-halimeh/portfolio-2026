"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/** Loads only the DOM animation features; components use `m.*` instead of `motion.*`. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
