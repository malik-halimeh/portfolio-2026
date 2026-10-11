"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@phosphor-icons/react";
import {
  HAPPY_PATH,
  STATE_INFO,
  step,
  type State,
  type Transition,
} from "@/lib/chargehub-machine";
import { LifecycleDiagram } from "./LifecycleDiagram";

type Frame = { state: State; last: Transition | null; visited: State[] };

const START: Frame = { state: "PENDING_PAYMENT", last: null, visited: [] };

/**
 * Hero artifact: the real lifecycle, stepping through the happy path on its own.
 * Pauses on hover, when off screen, when the tab is hidden, and under reduced motion.
 */
export function LifecycleAmbient({
  label,
  cta,
}: {
  label: string;
  cta: string;
}) {
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState<Frame>(START);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const idx = useRef(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setFrame((f) => {
        if (idx.current >= HAPPY_PATH.length) {
          idx.current = 0;
          return START;
        }
        const ev = HAPPY_PATH[idx.current];
        const r = step(f.state, ev);
        idx.current += 1;
        if (!r.ok) return f;
        return { state: r.t.to, last: r.t, visited: [...f.visited, f.state] };
      });
    }, 1700);
    return () => window.clearInterval(id);
  }, [reduce, paused, inView]);

  const info = STATE_INFO[frame.state];

  return (
    <div
      ref={root}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="group relative rounded-lg border border-line bg-bg-sunken/60 p-3 sm:p-4"
    >
      <div className="flex items-center justify-between gap-3 px-1 pb-2">
        <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
          {label}
        </p>
        <p className="font-mono text-[11px] text-fg-muted" aria-live="polite">
          <span className="text-accent">{frame.state}</span>
          {frame.last ? ` ← ${frame.last.event}` : ""}
        </p>
      </div>
      <LifecycleDiagram
        current={frame.state}
        last={reduce ? null : frame.last}
        visited={frame.visited}
        compact
      />
      <p className="mt-2 min-h-10 px-1 text-sm text-fg-muted">{info.summary}</p>
      <Link
        href="/work/chargehub#playground"
        className="mt-2 inline-flex min-h-10 items-center gap-1.5 px-1 text-sm font-medium text-fg underline-offset-4 hover:underline"
      >
        {cta}
        <ArrowRightIcon size={14} className="rtl:-scale-x-100" aria-hidden />
      </Link>
    </div>
  );
}
