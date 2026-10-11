"use client";

import { useId, useState } from "react";
import Image from "next/image";

/**
 * Before/after: the CSV a restaurant owner uploads, and what InsightFlow turns it into.
 * The divider is a real range input, so it works with keyboard and screen readers.
 */
const ROWS = [
  ["2026-05-17", "House Fries", "3.50", "41", "Takeaway"],
  ["2026-05-17", "Margherita", "9.00", "27", "Dine-in"],
  ["2026-05-17", "Beetroot & Feta Salad", "7.50", "3", "Dine-in"],
  ["2026-05-18", "House Fries", "3.50", "38", "Takeaway"],
  ["2026-05-18", "Margherita", "9.00", "31", "Dine-in"],
  ["2026-05-18", "Lemonade", "2.50", "22", "Takeaway"],
  ["2026-05-19", "House Fries", "3.50", "44", "Dine-in"],
  ["2026-05-19", "Margherita", "9.00", "29", "Dine-in"],
  ["2026-05-19", "Beetroot & Feta Salad", "7.50", "2", "Takeaway"],
  ["2026-05-20", "House Fries", "3.50", "40", "Takeaway"],
  ["2026-05-20", "Lemonade", "2.50", "25", "Dine-in"],
  ["2026-05-20", "Margherita", "9.00", "33", "Dine-in"],
];

export function CompareSlider() {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-line bg-bg-elevated select-none">
        <div className="absolute inset-0">
          <Image src="/work/insightflow.webp" alt="InsightFlow dashboard built from the uploaded sales file" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover object-top" />
        </div>
        <div className="absolute inset-0 overflow-hidden bg-bg-sunken" style={{ width: `${pos}%` }} aria-hidden>
          <div className="h-full w-[100vw] max-w-[1200px] overflow-hidden p-4 font-mono text-[11px] leading-5 text-fg-muted">
            <p className="mb-2 text-fg-faint">august_restaurant_sales.csv (1,161 rows)</p>
            <table className="border-collapse">
              <thead>
                <tr className="text-fg">
                  {["date", "item", "price", "qty", "channel"].map((h) => (
                    <th key={h} className="border-b border-line pe-6 text-start font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={i}>
                    {r.map((c, j) => (
                      <td key={j} className="pe-6 whitespace-nowrap">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} className="text-fg-faint">
                    … 1,149 more rows
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-accent" style={{ left: `calc(${pos}% - 1px)` }} aria-hidden>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-bg px-2 py-0.5 font-mono text-[10px] text-accent">⇔</span>
        </div>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Reveal: left is the uploaded CSV, right is the dashboard"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[11px] text-fg-faint">
        <span>uploaded CSV</span>
        <span>dashboard, recommendations, forecast</span>
      </div>
    </div>
  );
}
