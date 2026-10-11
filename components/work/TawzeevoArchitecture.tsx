"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cx } from "@/lib/utils";

/**
 * Clickable architecture map of Tawzeevo. Hand-drawn SVG (same visual language as
 * the lifecycle diagram) so it costs no dependency. Each node opens a detail panel
 * with the guarantee that lives at that boundary.
 */

type NodeId = "ops" | "store" | "api" | "db" | "outbox" | "drive" | "route" | "groq";

const NODES: Record<NodeId, { x: number; y: number; w: number; label: string; sub: string }> = {
  ops: { x: 24, y: 30, w: 190, label: "Operations PWA", sub: "React 19, Vite, offline" },
  store: { x: 24, y: 250, w: 190, label: "Storefront", sub: "Next.js, EN/AR, guest checkout" },
  outbox: { x: 24, y: 140, w: 190, label: "Device outbox", sub: "IndexedDB, operation ids" },
  api: { x: 300, y: 140, w: 200, label: "FastAPI", sub: "SQLAlchemy 2, Pydantic v2, RBAC" },
  db: { x: 580, y: 140, w: 200, label: "PostgreSQL", sub: "RLS on every tenant table" },
  drive: { x: 580, y: 30, w: 200, label: "Owner's Google Drive", sub: "AES-256-GCM backups" },
  route: { x: 580, y: 250, w: 200, label: "OpenRouteService", sub: "optional, coordinates only" },
  groq: { x: 300, y: 300, w: 200, label: "Groq (read-only assistant)", sub: "masked figures, no writes" },
};

const EDGES: Array<[NodeId, NodeId, string]> = [
  ["ops", "outbox", "commands queue locally"],
  ["outbox", "api", "exactly-once replay"],
  ["store", "api", "idempotent orders"],
  ["api", "db", "SET business id, RLS"],
  ["api", "drive", "encrypted backup job"],
  ["api", "route", "stop-order suggestion"],
  ["api", "groq", "tools, masked data"],
];

const DETAIL: Record<NodeId, { title: string; body: string; code?: string }> = {
  ops: {
    title: "Operations client works without a connection",
    body: "The business is downloaded once per device. Customer search, barcode scan, invoice drafts, confirmations and receipts all work offline. Drivers get a least-privilege view: assigned stops only, never prices or profit.",
  },
  outbox: {
    title: "Every command carries an operation id and a request fingerprint",
    body: "Replays return the stored result. Conflicts surface for a human decision; nothing is merged silently. Official invoice numbers, revision numbers and change sequence numbers are never produced on the device.",
    code: "POST /api/v1/invoices/confirm\nIdempotency-Key: 7f3a…  X-Request-Fingerprint: sha256(body)",
  },
  store: {
    title: "One public bilingual storefront per business",
    body: "Shows only explicitly published products at current prices. Guest checkout creates one order per idempotency key with an immutable contact snapshot and a server-priced draft invoice. Personalized customer links are stored as hashes.",
  },
  api: {
    title: "Backend-authoritative pricing and money",
    body: "Grade price, else grade percentage discount, else normal price. Decimal arithmetic only. Invoice revisions are immutable; receipts, refunds and reversals are new records. Currencies are never converted or summed.",
  },
  db: {
    title: "Row-level security on every business-owned table",
    body: "Each tenant table carries the business id and an RLS policy for the application role. A query that forgets a filter still cannot read another tenant. A schema-wide test fails if any inventory column appears, because there is no stock concept.",
    code: "CREATE POLICY tenant_isolation ON invoices\n  USING (business_id = current_setting('app.business_id')::uuid);",
  },
  drive: {
    title: "The owner holds the backup, encrypted",
    body: "AES-256-GCM, per-business keys wrapped by an environment master key, written to a drive.file app folder the owner controls. Daily and monthly retention, restore drills, and a platform-only import into an empty recovery tenant.",
  },
  route: {
    title: "Routing help that always exists",
    body: "OpenRouteService when configured; otherwise a deterministic nearest-neighbour plus 2-opt heuristic that runs offline. Both are labelled as suggestions, and only coordinates ever leave the server.",
  },
  groq: {
    title: "An assistant that can read, never write",
    body: "Owner intelligence (daily priorities, ten anomaly rule families, cash position) is computed deterministically. The model only explains, with figures masked and checked. Real answers need the owner's own API key.",
  },
};

export function TawzeevoArchitecture() {
  const [sel, setSel] = useState<NodeId>("db");
  const reduce = useReducedMotion();
  const d = DETAIL[sel];
  const center = (id: NodeId) => ({ x: NODES[id].x + NODES[id].w / 2, y: NODES[id].y + 24 });

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="rounded-lg border border-line bg-bg-sunken/60 p-3 lg:col-span-7">
        <svg viewBox="0 0 804 360" role="group" aria-label="Tawzeevo architecture map" className="h-auto w-full" style={{ fontFamily: "var(--font-sans)" }}>
          <defs>
            <marker id="arch-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0.5 L8,4 L0,7.5 z" fill="var(--line-strong)" />
            </marker>
          </defs>
          <g fill="none" stroke="var(--line)" strokeWidth={1.25}>
            {EDGES.map(([a, b, label]) => {
              const p = center(a);
              const q = center(b);
              const dx = q.x - p.x;
              const dy = q.y - p.y;
              const horizontal = Math.abs(dx) > Math.abs(dy);
              const x1 = horizontal ? p.x + Math.sign(dx) * (NODES[a].w / 2 + 4) : p.x;
              const y1 = horizontal ? p.y : p.y + Math.sign(dy) * 28;
              const x2 = horizontal ? q.x - Math.sign(dx) * (NODES[b].w / 2 + 4) : q.x;
              const y2 = horizontal ? q.y : q.y - Math.sign(dy) * 28;
              const active = sel === a || sel === b;
              const d = horizontal && y1 !== y2 ? `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}` : `M ${x1} ${y1} L ${x2} ${y2}`;
              return (
                <g key={`${a}-${b}`}>
                  <path d={d} markerEnd="url(#arch-arrow)" stroke={active ? "var(--accent)" : "var(--line)"} strokeWidth={active ? 1.75 : 1.25} />
                  <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} textAnchor="middle" fontSize={9.5} fill={active ? "var(--accent)" : "var(--fg-faint)"} style={{ fontFamily: "var(--font-mono)" }}>
                    {label}
                  </text>
                </g>
              );
            })}
          </g>
          {(Object.keys(NODES) as NodeId[]).map((id) => {
            const n = NODES[id];
            const active = id === sel;
            return (
              <g key={id} transform={`translate(${n.x} ${n.y})`} role="button" tabIndex={0} aria-pressed={active} aria-label={n.label} onClick={() => setSel(id)} onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSel(id);
                }
              }} className="cursor-pointer outline-none focus-visible:[&>rect]:stroke-accent">
                <motion.rect
                  width={n.w}
                  height={48}
                  rx={4}
                  fill={active ? "var(--accent-soft)" : "var(--bg-elevated)"}
                  stroke={active ? "var(--accent)" : "var(--line-strong)"}
                  strokeWidth={active ? 1.75 : 1}
                  initial={false}
                  animate={reduce ? {} : { scale: active ? 1.02 : 1 }}
                  style={{ transformOrigin: `${n.w / 2}px 24px` }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
                <text x={12} y={20} fontSize={12.5} fontWeight={600} fill="var(--fg)">
                  {n.label}
                </text>
                <text x={12} y={36} fontSize={10} fill="var(--fg-muted)" style={{ fontFamily: "var(--font-mono)" }}>
                  {n.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="lg:col-span-5" aria-live="polite">
        <div className={cx("rounded-md border border-line p-5")}>
          <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{NODES[sel].label}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg">{d.title}</h3>
          <p className="mt-3 text-[15px] text-fg-muted">{d.body}</p>
          {d.code && (
            <pre className="mt-4 overflow-x-auto rounded-md border border-line bg-bg-sunken p-3 font-mono text-[12px] leading-relaxed text-fg-muted" dir="ltr">
              {d.code}
            </pre>
          )}
        </div>
        <p className="mt-3 text-xs text-fg-faint">Select any box. Nothing here is decorative: every node is a real service boundary in the repository.</p>
      </div>
    </div>
  );
}
