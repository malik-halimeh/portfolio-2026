import type { StatusKind } from "@/data/work";
import { cx } from "@/lib/utils";

const styles: Record<StatusKind, string> = {
  live: "border-accent/40 text-accent",
  source: "border-line-strong text-fg-muted",
  private: "border-line-strong text-fg-muted",
  offline: "border-line text-fg-faint",
};

export function StatusChip({ kind, label, className }: { kind: StatusKind; label: string; className?: string }) {
  return (
    <span className={cx("inline-flex min-h-6 items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] leading-tight", styles[kind], className)}>
      {kind === "live" && <span aria-hidden className="me-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />}
      {label}
    </span>
  );
}
