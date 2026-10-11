import { NextResponse, type NextRequest } from "next/server";

/** Only these targets can be pinged. Never accept arbitrary URLs. */
const TARGETS: Record<string, string> = {
  tawzeevo: "https://tawzeevo-malik-halimeh.onrender.com/demo",
  sobohnet: "https://malik-halimeh.github.io/sobohnet-preview/",
};

export type Health = { target: string; status: "up" | "waking" | "down" | "unknown"; ms: number; checkedAt: string; detail?: string };

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("target") ?? "";
  const url = TARGETS[target];
  if (!url) return NextResponse.json({ error: "unknown target" }, { status: 400 });

  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  let status: Health["status"] = "down";
  let detail: string | undefined;
  try {
    const res = await fetch(url, { method: "GET", signal: controller.signal, cache: "no-store", redirect: "follow", headers: { "User-Agent": "malik-halimeh-portfolio-health" } });
    status = res.ok ? "up" : res.status >= 500 ? "waking" : "down";
    detail = `http ${res.status}`;
  } catch (err) {
    // A timeout on a free Render instance almost always means it is cold-starting.
    const e = err as Error & { cause?: { message?: string } };
    // A certificate or DNS problem on the checking host says nothing about the demo: report unknown, not down.
    const msg = `${e.message} ${e.cause?.message ?? ""}`.toLowerCase();
    status = e.name === "AbortError" ? "waking" : /certificate|cert|dns|enotfound/.test(msg) ? "unknown" : "down";
    detail = `${e.name}: ${e.cause?.message ?? e.message}`;
  } finally {
    clearTimeout(timer);
  }

  const body: Health = { target, status, ms: Date.now() - started, checkedAt: new Date().toISOString(), detail };
  return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
}
