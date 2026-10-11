"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import {
  EVENT_INFO,
  REJECTIONS,
  STATE_INFO,
  TRANSITIONS,
  availableEvents,
  step,
  type EventName,
  type Rejection,
  type State,
  type Transition,
} from "@/lib/chargehub-machine";
import { LifecycleDiagram } from "./LifecycleDiagram";
import { cx } from "@/lib/utils";

type LogEntry =
  { kind: "ok"; t: Transition } | { kind: "rejected"; r: Rejection };

const ACTOR_ORDER: Array<"driver" | "staff" | "clock" | "gateway"> = [
  "driver",
  "gateway",
  "clock",
  "staff",
];

/**
 * The real reservation lifecycle as something you can drive. Legal events are
 * enabled; a few illegal moves are kept clickable on purpose so the rejection
 * (and its real error name) can be seen.
 */
export function LifecyclePlayground() {
  const t = useTranslations("Work.playground");
  const [state, setState] = useState<State>("PENDING_PAYMENT");
  const [last, setLast] = useState<Transition | null>(null);
  const [rejected, setRejected] = useState<Rejection | null>(null);
  const [visited, setVisited] = useState<State[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);

  const legal = availableEvents(state);
  const illegalShown = REJECTIONS.filter((r) => r.from === state).map(
    (r) => r.event,
  );
  const events = Array.from(new Set<EventName>([...legal, ...illegalShown]));

  const fire = (ev: EventName) => {
    const r = step(state, ev);
    if (r.ok) {
      setVisited((v) => [...v, state]);
      setState(r.t.to);
      setLast(r.t);
      setRejected(null);
      setLog((l) => [{ kind: "ok" as const, t: r.t }, ...l].slice(0, 12));
    } else {
      setRejected(r.r);
      setLast(null);
      setLog((l) => [{ kind: "rejected" as const, r: r.r }, ...l].slice(0, 12));
    }
  };

  const reset = () => {
    setState("PENDING_PAYMENT");
    setLast(null);
    setRejected(null);
    setVisited([]);
    setLog([]);
  };

  const info = STATE_INFO[state];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="rounded-lg border border-line bg-bg-sunken/60 p-3 sm:p-4">
          <LifecycleDiagram
            current={state}
            last={last}
            rejected={rejected}
            visited={visited}
            title={t("diagramTitle", { state })}
          />
        </div>
        <div
          className="mt-4 rounded-md border border-line p-4"
          aria-live="polite"
        >
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
            {t("currentState")}
          </p>
          <p className="mt-1 font-mono text-lg text-accent">{state}</p>
          <p className="mt-2 text-sm text-fg-muted">{info.summary}</p>
          {rejected && (
            <div className="mt-3 rounded-md border border-danger/40 bg-danger-soft p-3 text-sm">
              <p className="font-mono text-danger">
                throw new Error(&quot;{rejected.error}&quot;)
              </p>
              <p className="mt-1 text-fg-muted">{rejected.why}</p>
            </div>
          )}
          {last && !rejected && (
            <div className="mt-3 rounded-md border border-accent/30 bg-accent-soft p-3 text-sm">
              <p className="font-mono text-accent">
                {last.from} → {last.to}
                {last.emits ? `  emits ${last.emits}` : ""}
              </p>
              <p className="mt-1 text-fg-muted">{last.note}</p>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight">
            {t("fireEvent")}
          </h3>
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-line px-3 text-sm text-fg-muted hover:border-line-strong hover:text-fg"
          >
            <ArrowCounterClockwiseIcon size={14} aria-hidden />
            {t("reset")}
          </button>
        </div>
        <p className="mt-1 text-sm text-fg-muted">{t("fireHint")}</p>

        <div className="mt-4 space-y-4">
          {ACTOR_ORDER.map((actor) => {
            const evs = events.filter((e) => EVENT_INFO[e].actor === actor);
            if (evs.length === 0) return null;
            return (
              <div key={actor}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                  {t(`actor.${actor}`)}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {evs.map((e) => {
                    const isLegal = legal.includes(e);
                    return (
                      <li key={e}>
                        <button
                          type="button"
                          onClick={() => fire(e)}
                          className={cx(
                            "inline-flex min-h-10 items-center rounded-md border px-3 text-sm transition-colors active:translate-y-px",
                            isLegal
                              ? "border-accent/50 text-fg hover:bg-accent-soft"
                              : "border-dashed border-line text-fg-faint hover:border-danger/50 hover:text-danger",
                          )}
                          aria-label={
                            isLegal
                              ? EVENT_INFO[e].label
                              : t("illegalLabel", {
                                  label: EVENT_INFO[e].label,
                                })
                          }
                        >
                          {EVENT_INFO[e].label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          {events.length === 0 && (
            <p className="text-sm text-fg-muted">{t("terminal")}</p>
          )}
        </div>

        <h3 className="mt-8 text-lg font-semibold tracking-tight">
          {t("log")}
        </h3>
        <ol
          className="mt-2 max-h-64 space-y-1 overflow-y-auto font-mono text-[12px]"
          aria-label={t("log")}
        >
          {log.length === 0 && (
            <li className="text-fg-faint">{t("logEmpty")}</li>
          )}
          {log.map((e, i) => (
            <li
              key={i}
              className={cx(
                "rounded px-2 py-1",
                e.kind === "ok"
                  ? "text-fg-muted"
                  : "bg-danger-soft text-danger",
              )}
            >
              {e.kind === "ok"
                ? `${e.t.event}: ${e.t.from} → ${e.t.to}`
                : `${e.r.event}: ${e.r.error}`}
            </li>
          ))}
        </ol>

        <p className="mt-6 text-xs text-fg-faint">
          {t("source", { count: TRANSITIONS.length })}
        </p>
      </div>
    </div>
  );
}
