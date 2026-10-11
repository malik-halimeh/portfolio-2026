"use client";

import { m, useReducedMotion } from "motion/react";
import {
  STATES,
  TRANSITIONS,
  type State,
  type Transition,
  type Rejection,
  HOLDING,
} from "@/lib/chargehub-machine";
import { cx } from "@/lib/utils";

/** Hand-placed layout: three columns, four rows. viewBox 640 x 420. */
const W = 152;
const H = 34;
const COL = [24, 244, 464];
const ROW = [16, 122, 228, 334];
const POS: Record<State, { x: number; y: number }> = {
  PENDING_PAYMENT: { x: COL[0], y: ROW[0] },
  CANCELLED: { x: COL[1], y: ROW[0] },
  RELEASED: { x: COL[2], y: ROW[0] },
  RESERVED: { x: COL[0], y: ROW[1] },
  ARRIVED: { x: COL[1], y: ROW[1] },
  LATE: { x: COL[0], y: ROW[2] },
  CHARGING: { x: COL[1], y: ROW[2] },
  EXTENSION_REQUESTED: { x: COL[2], y: ROW[2] },
  AT_RISK: { x: COL[0], y: ROW[3] },
  NO_SHOW: { x: COL[1], y: ROW[3] },
  COMPLETED: { x: COL[2], y: ROW[3] },
};

type Pt = { x: number; y: number };
const center = (s: State): Pt => ({ x: POS[s].x + W / 2, y: POS[s].y + H / 2 });

/** Point on the node's rectangle border in the direction of `toward`. */
function border(s: State, toward: Pt): Pt {
  const c = center(s);
  const dx = toward.x - c.x;
  const dy = toward.y - c.y;
  if (dx === 0 && dy === 0) return c;
  const sx = dx !== 0 ? (W / 2 + 4) / Math.abs(dx) : Infinity;
  const sy = dy !== 0 ? (H / 2 + 4) / Math.abs(dy) : Infinity;
  const k = Math.min(sx, sy);
  return { x: c.x + dx * k, y: c.y + dy * k };
}

function edgePath(t: Transition): string {
  const a = center(t.from);
  const b = center(t.to);
  const sameCol = POS[t.from].x === POS[t.to].x;
  const sameRow = POS[t.from].y === POS[t.to].y;
  const reverse = t.from === "EXTENSION_REQUESTED" && t.to === "CHARGING";
  if (reverse) {
    // Loop back underneath the forward edge.
    const p1 = { x: a.x - W / 2, y: a.y + 10 };
    const p2 = { x: b.x + W / 2, y: b.y + 10 };
    return `M ${p1.x} ${p1.y} C ${p1.x - 30} ${p1.y + 26}, ${p2.x + 30} ${p2.y + 26}, ${p2.x} ${p2.y}`;
  }
  if (sameCol || sameRow) {
    const p1 = border(t.from, b);
    const p2 = border(t.to, a);
    // Parallel edges in the same direction (END_CHARGING and END_EARLY) get a small offset.
    const offset =
      t.event === "END_EARLY"
        ? 8
        : t.event === "DEPOSIT_DECLINED"
          ? -8
          : t.event === "HOLD_EXPIRED"
            ? 8
            : 0;
    if (offset && sameRow)
      return `M ${p1.x} ${p1.y + offset} L ${p2.x} ${p2.y + offset}`;
    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
  }
  // Diagonal: gentle curve so crossings read as curves rather than a tangle.
  const p1 = border(t.from, b);
  const p2 = border(t.to, a);
  const mx = (p1.x + p2.x) / 2;
  const my = (p1.y + p2.y) / 2;
  const bend = t.to === "CANCELLED" || t.to === "RELEASED" ? -40 : 24;
  return `M ${p1.x} ${p1.y} Q ${mx + bend} ${my - bend} ${p2.x} ${p2.y}`;
}

export type DiagramProps = {
  current: State;
  /** The transition that just happened; its edge is drawn in accent. */
  last?: Transition | null;
  /** A rejected attempt: the target state flashes danger and the error is shown. */
  rejected?: Rejection | null;
  /** States visited so far, drawn as "done". */
  visited?: State[];
  compact?: boolean;
  className?: string;
  title?: string;
};

export function LifecycleDiagram({
  current,
  last,
  rejected,
  visited = [],
  compact,
  className,
  title,
}: DiagramProps) {
  const reduce = useReducedMotion();
  const edgeKey = (t: Transition) => `${t.from}-${t.event}-${t.to}`;
  const lastKey = last ? edgeKey(last) : null;

  return (
    <svg
      viewBox="0 0 640 388"
      role="img"
      aria-label={
        title ?? `ChargeHub reservation lifecycle. Current state: ${current}.`
      }
      className={cx("h-auto w-full", className)}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0.5 L8,4 L0,7.5 z" fill="var(--line-strong)" />
        </marker>
        <marker
          id="arrow-accent"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0.5 L8,4 L0,7.5 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* Edges */}
      <g fill="none" strokeWidth={1.25}>
        {TRANSITIONS.map((t) => {
          const active = lastKey === edgeKey(t);
          const d = edgePath(t);
          return (
            <g key={edgeKey(t)}>
              <path
                d={d}
                stroke="var(--line)"
                markerEnd="url(#arrow)"
                opacity={active ? 0 : 0.9}
              />
              {active && (
                <m.path
                  d={d}
                  stroke="var(--accent)"
                  strokeWidth={2}
                  markerEnd="url(#arrow-accent)"
                  initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </g>
          );
        })}
      </g>

      {/* Nodes */}
      {STATES.map((s) => {
        const { x, y } = POS[s];
        const isCurrent = s === current;
        const isVisited = visited.includes(s) && !isCurrent;
        const isRejectedTarget =
          rejected &&
          rejected.from === current &&
          s === rejectedTarget(rejected);
        const holding = HOLDING.includes(s);
        return (
          <g key={s} transform={`translate(${x} ${y})`}>
            <m.rect
              width={W}
              height={H}
              rx={4}
              fill={
                isCurrent
                  ? "var(--accent-soft)"
                  : isRejectedTarget
                    ? "var(--danger-soft)"
                    : "var(--bg-elevated)"
              }
              stroke={
                isCurrent
                  ? "var(--accent)"
                  : isRejectedTarget
                    ? "var(--danger)"
                    : isVisited
                      ? "var(--line-strong)"
                      : "var(--line)"
              }
              strokeWidth={isCurrent || isRejectedTarget ? 1.75 : 1}
              strokeDasharray={holding ? undefined : "3 3"}
              initial={false}
              animate={reduce ? {} : { scale: isCurrent ? 1.03 : 1 }}
              style={{ transformOrigin: `${W / 2}px ${H / 2}px` }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            />
            <text
              x={W / 2}
              y={H / 2 + 4}
              textAnchor="middle"
              fontSize={compact ? 10.5 : 11}
              fill={
                isCurrent
                  ? "var(--fg)"
                  : isRejectedTarget
                    ? "var(--danger)"
                    : "var(--fg-muted)"
              }
              fontWeight={isCurrent ? 600 : 500}
            >
              {s}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g fontSize={10} fill="var(--fg-faint)">
        <rect
          x={24}
          y={376}
          width={14}
          height={8}
          rx={2}
          fill="none"
          stroke="var(--line)"
        />
        <text x={44} y={384}>
          holds the interval
        </text>
        <rect
          x={150}
          y={376}
          width={14}
          height={8}
          rx={2}
          fill="none"
          stroke="var(--line)"
          strokeDasharray="3 3"
        />
        <text x={170} y={384}>
          terminal, interval free
        </text>
      </g>
    </svg>
  );
}

/** For a rejection we highlight the state the event would have led to, if it is a known target. */
function rejectedTarget(r: Rejection): State | null {
  const guess: Partial<Record<Rejection["event"], State>> = {
    CONFIRM_VIA_UPDATE_ROUTE: "RESERVED",
    START_CHARGING: "CHARGING",
    CANCEL: "CANCELLED",
    CHECK_IN: "ARRIVED",
    COMMIT_DEPOSIT: "RESERVED",
  };
  return guess[r.event] ?? null;
}
