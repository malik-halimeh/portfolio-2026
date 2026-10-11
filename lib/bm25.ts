import type { Passage } from "./corpus";

/** Small dependency-free BM25 over the passage corpus. */

const STOP = new Set("a an and are as at be by for from has he his how i in is it its of on or that the this to was what when where which who why with you your does do did malik".split(" "));

export function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ\s+#.-]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t));
}

type Index = { docs: { id: string; tf: Map<string, number>; len: number }[]; df: Map<string, number>; avgLen: number; n: number };

export function buildIndex(passages: Passage[]): Index {
  const docs = passages.map((p) => {
    const toks = tokenize(`${p.title} ${p.text}`);
    const tf = new Map<string, number>();
    for (const t of toks) tf.set(t, (tf.get(t) ?? 0) + 1);
    return { id: p.id, tf, len: toks.length };
  });
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
  const avgLen = docs.reduce((a, d) => a + d.len, 0) / Math.max(1, docs.length);
  return { docs, df, avgLen, n: docs.length };
}

export function search(index: Index, passages: Passage[], query: string, k = 4): { passage: Passage; score: number }[] {
  const q = Array.from(new Set(tokenize(query)));
  const k1 = 1.4;
  const b = 0.75;
  const byId = new Map(passages.map((p) => [p.id, p]));
  const scored = index.docs.map((d) => {
    let score = 0;
    for (const t of q) {
      const f = d.tf.get(t);
      if (!f) continue;
      const df = index.df.get(t) ?? 0;
      const idf = Math.log(1 + (index.n - df + 0.5) / (df + 0.5));
      score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / index.avgLen)));
    }
    return { passage: byId.get(d.id)!, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

/** Extractive answer when no model is available: the best sentences from the top passages. */
export function extractive(query: string, hits: { passage: Passage; score: number }[]): string {
  const q = new Set(tokenize(query));
  const sentences: { s: string; score: number; from: Passage }[] = [];
  for (const h of hits) {
    for (const s of h.passage.text.split(/(?<=[.!?])\s+/)) {
      const toks = tokenize(s);
      const overlap = toks.filter((t) => q.has(t)).length;
      if (overlap > 0) sentences.push({ s, score: overlap / Math.sqrt(toks.length + 1), from: h.passage });
    }
  }
  sentences.sort((a, b) => b.score - a.score);
  const picked = sentences.slice(0, 3).map((x) => x.s.trim());
  return picked.join(" ");
}
