"use client";

import { useMemo, useState } from "react";
import { cx } from "@/lib/utils";

/**
 * The Interview Lab scoring rule, runnable. Twenty items with fixed Rasch
 * difficulties (levels 1-5 map to -2..2). Toggle answers and watch the ability
 * estimate (EAP under a N(0,1) prior) and the scaled grade move.
 * grade = clamp(0, 100, round(50 + 10 * theta))
 */
const DIFFICULTIES = [-2, -2, -2, -2, -1, -1, -1, -1, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
const GRID = Array.from({ length: 121 }, (_, i) => -4 + i * (8 / 120));

function eap(answers: boolean[]): number {
  let num = 0;
  let den = 0;
  for (const th of GRID) {
    const prior = Math.exp(-0.5 * th * th);
    let like = 1;
    answers.forEach((correct, i) => {
      const p = 1 / (1 + Math.exp(-(th - DIFFICULTIES[i])));
      like *= correct ? p : 1 - p;
    });
    const w = prior * like;
    num += th * w;
    den += w;
  }
  return den === 0 ? 0 : num / den;
}

const grade = (theta: number) => Math.max(0, Math.min(100, Math.round(50 + 10 * theta)));

export function RaschSandbox() {
  const [answers, setAnswers] = useState<boolean[]>(() => DIFFICULTIES.map((d) => d <= 0));
  const theta = useMemo(() => eap(answers), [answers]);
  const correct = answers.filter(Boolean).length;
  const percent = Math.round((correct / answers.length) * 100);

  const toggle = (i: number) => setAnswers((a) => a.map((v, j) => (j === i ? !v : v)));
  const preset = (fn: (d: number, i: number) => boolean) => setAnswers(DIFFICULTIES.map(fn));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">20 items, difficulty by column</p>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {[-2, -1, 0, 1, 2].map((d) => (
            <div key={d} className="text-center font-mono text-[11px] text-fg-faint">
              b = {d > 0 ? `+${d}` : d}
            </div>
          ))}
          {Array.from({ length: 4 }).map((_, row) =>
            [-2, -1, 0, 1, 2].map((d, col) => {
              const i = col * 4 + row;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={answers[i]}
                  aria-label={`Item ${i + 1}, difficulty ${d}, ${answers[i] ? "correct" : "incorrect"}`}
                  className={cx(
                    "h-11 rounded-md border font-mono text-sm transition-colors active:translate-y-px",
                    answers[i] ? "border-accent bg-accent-soft text-fg" : "border-line text-fg-faint hover:border-line-strong",
                  )}
                >
                  {answers[i] ? "✓" : "✗"}
                </button>
              );
            }),
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Preset label="All easy only" onClick={() => preset((d) => d <= -1)} />
          <Preset label="Half of everything" onClick={() => preset((_, i) => i % 2 === 0)} />
          <Preset label="Only the hard ones" onClick={() => preset((d) => d >= 1)} />
          <Preset label="Everything" onClick={() => preset(() => true)} />
        </div>
      </div>
      <div className="lg:col-span-5">
        <dl className="grid grid-cols-2 gap-4">
          <Stat label="correct" value={`${correct} / 20`} />
          <Stat label="percent correct" value={`${percent}%`} muted />
          <Stat label="ability θ (EAP)" value={theta.toFixed(2)} />
          <Stat label="scaled grade" value={String(grade(theta))} accent />
        </dl>
        <p className="mt-4 text-sm text-fg-muted">
          Two candidates with the same percent correct can get different grades: answering the hard items is worth more than answering the easy ones, and the estimate is pulled toward the prior when the pattern is inconsistent. Compare &quot;Half of everything&quot; with &quot;Only the hard ones&quot;.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-md border border-line bg-bg-sunken p-3 font-mono text-[12px] leading-relaxed text-fg-muted" dir="ltr">
{`grade = clamp(0, 100, round(50 + 10 * theta))
theta = EAP over N(0,1) prior, 1PL model
P(correct) = 1 / (1 + exp(-(theta - b)))`}
        </pre>
        <p className="mt-3 text-xs text-fg-faint">Provisional preparation estimate, as in the app. Not a psychometric certification.</p>
      </div>
    </div>
  );
}

function Preset({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-9 items-center rounded-md border border-line px-3 text-sm text-fg-muted hover:border-line-strong hover:text-fg">
      {label}
    </button>
  );
}

function Stat({ label, value, accent, muted }: { label: string; value: string; accent?: boolean; muted?: boolean }) {
  return (
    <div className="rounded-md border border-line p-3">
      <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">{label}</dt>
      <dd className={cx("mt-1 text-2xl font-semibold tracking-tight", accent ? "text-accent" : muted ? "text-fg-muted" : "text-fg")} dir="ltr">
        {value}
      </dd>
    </div>
  );
}
