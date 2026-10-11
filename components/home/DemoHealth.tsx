"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { Health } from "@/app/api/health/route";
import { cx } from "@/lib/utils";

type Phase = {
  status: "checking" | Health["status"];
  ms?: number;
  attempts: number;
};

/**
 * Honest status for a free-tier demo: "waking up" instead of looking dead.
 * Retries a cold start up to three times, 12 seconds apart.
 */
export function DemoHealth({
  target,
  className,
}: {
  target: "tawzeevo" | "sobohnet";
  className?: string;
}) {
  const t = useTranslations("Common");
  const [phase, setPhase] = useState<Phase>({
    status: "checking",
    attempts: 0,
  });

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const check = async (attempt: number) => {
      try {
        const res = await fetch(`/api/health?target=${target}`, {
          cache: "no-store",
        });
        const data = (await res.json()) as Health;
        if (cancelled) return;
        setPhase({ status: data.status, ms: data.ms, attempts: attempt });
        if (data.status === "waking" && attempt < 3) {
          timer = window.setTimeout(() => check(attempt + 1), 12000);
        }
      } catch {
        if (!cancelled) setPhase({ status: "down", attempts: attempt });
      }
    };
    void check(1);
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [target]);

  const label =
    phase.status === "checking"
      ? t("checking")
      : phase.status === "up"
        ? t("live")
        : phase.status === "waking"
          ? t("waking")
          : phase.status === "unknown"
            ? t("unknown")
            : t("offline");

  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 font-mono text-[12px]",
        className,
      )}
      role="status"
    >
      <span
        aria-hidden
        className={cx(
          "inline-block h-2 w-2 rounded-full",
          phase.status === "up" && "bg-accent",
          phase.status === "waking" && "bg-warn",
          phase.status === "down" && "bg-danger",
          phase.status === "checking" && "animate-pulse bg-fg-faint",
          phase.status === "unknown" && "bg-fg-faint",
        )}
      />
      <span
        className={cx(phase.status === "up" ? "text-accent" : "text-fg-muted")}
      >
        {label}
      </span>
    </span>
  );
}
