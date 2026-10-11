import { NextResponse, type NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { getCorpus } from "@/lib/corpus";
import { buildIndex, extractive, search } from "@/lib/bm25";
import { profile } from "@/data/profile";

/**
 * "Ask about Malik": retrieval over the site's own text, then either a short
 * model answer with citations (when ANTHROPIC_API_KEY is set and caps allow)
 * or an extractive answer built from the best sentences. Never answers from
 * anything but the corpus; never breaks when the key or the cap is missing.
 */

const Body = z.object({ question: z.string().trim().min(3).max(400) });

const MODEL = process.env.ASK_MODEL ?? "claude-opus-5-5";
const DAILY_CAP = Number(process.env.ASK_DAILY_CAP ?? 200);
const PER_IP_CAP = Number(process.env.ASK_PER_IP_CAP ?? 20);

// Best-effort in-memory caps (per serverless instance). Good enough to bound spend.
const dayState = { day: "", count: 0 };
const ipState = new Map<string, { day: string; count: number }>();
function today() {
  return new Date().toISOString().slice(0, 10);
}
function takeBudget(ip: string): boolean {
  const d = today();
  if (dayState.day !== d) {
    dayState.day = d;
    dayState.count = 0;
    ipState.clear();
  }
  const ipEntry = ipState.get(ip) ?? { day: d, count: 0 };
  if (dayState.count >= DAILY_CAP || ipEntry.count >= PER_IP_CAP) return false;
  dayState.count += 1;
  ipEntry.count += 1;
  ipState.set(ip, ipEntry);
  return true;
}

let index: ReturnType<typeof buildIndex> | null = null;

export async function POST(request: NextRequest) {
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Ask a question between 3 and 400 characters." }, { status: 400 });
  const question = parsed.data.question;

  const corpus = getCorpus();
  index ??= buildIndex(corpus);
  const hits = search(index, corpus, question, 4);
  const sources = hits.map((h) => ({ id: h.passage.id, title: h.passage.title, url: h.passage.url }));

  if (hits.length === 0) {
    return NextResponse.json({
      answer: `Nothing on this site answers that. You can email Malik directly at ${profile.email}.`,
      sources: [],
      mode: "none",
    });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || !takeBudget(ip)) {
    return NextResponse.json({ answer: extractive(question, hits), sources, mode: "extractive" });
  }

  const client = new Anthropic({ apiKey: key });
  const context = hits.map((h, i) => `[${i + 1}] ${h.passage.title} (${h.passage.url})\n${h.passage.text}`).join("\n\n");
  const system = [
    `You answer questions about Malik Halimeh for visitors of his portfolio site, often recruiters or engineers.`,
    `Use only the numbered passages provided. If the passages do not contain the answer, say so in one sentence and suggest emailing ${profile.email}. Never invent employers, dates, numbers or technologies.`,
    `Answer in at most 90 words, plain and specific, in the language of the question (English or Arabic). Cite passages inline like [1] after the sentence they support. No em-dashes.`,
  ].join("\n");

  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 400,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: `Passages:\n\n${context}\n\nQuestion: ${question}` }],
    });
    if (response.stop_reason === "refusal") {
      return NextResponse.json({ answer: extractive(question, hits), sources, mode: "extractive" });
    }
    const text = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    return NextResponse.json({ answer: text || extractive(question, hits), sources, mode: "model" });
  } catch {
    return NextResponse.json({ answer: extractive(question, hits), sources, mode: "extractive" });
  }
}
