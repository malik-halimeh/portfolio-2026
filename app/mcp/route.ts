import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { profile, skills } from "@/data/profile";
import { work, workBySlug } from "@/data/work";
import { about, now } from "@/data/about";
import { getCorpus } from "@/lib/corpus";
import { buildIndex, search, tokenize } from "@/lib/bm25";

/**
 * The portfolio as an MCP server (Streamable HTTP, stateless). An engineering
 * manager can point Claude, Cursor or any MCP client at /mcp and ask about
 * Malik's work, or paste a job description into evaluate_job_fit.
 * Every tool reads the same data files as the site. Nothing here writes.
 */

const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "get_profile",
      { title: "Get profile", description: "Who Malik Halimeh is: title, location, summary, contact, availability, education, languages.", inputSchema: z.object({}) },
      async () =>
        text(
          JSON.stringify(
            {
              name: profile.name,
              title: profile.title,
              location: profile.location,
              summary: profile.summary,
              email: profile.email,
              github: profile.github,
              linkedin: profile.linkedin,
              site: profile.siteUrl,
              availability: profile.availability,
              education: profile.education,
              experience: profile.experience,
              languages: profile.languages,
            },
            null,
            2,
          ),
        ),
    );

    server.registerTool(
      "list_projects",
      { title: "List projects", description: "The six case studies with outcome, role, stack, status and links.", inputSchema: z.object({}) },
      async () =>
        text(JSON.stringify(work.map((w) => ({ slug: w.slug, name: w.name, outcome: w.outcome, role: w.role, team: w.team, period: w.period, stack: w.stack, status: w.status.label, links: w.links, url: `${profile.siteUrl}/work/${w.slug}` })), null, 2)),
    );

    server.registerTool(
      "get_project",
      {
        title: "Get project",
        description: "Full case study for one project: problem, guarantees, decisions with rejected alternatives, evidence, retrospective.",
        inputSchema: z.object({ slug: z.enum(work.map((w) => w.slug) as [string, ...string[]]) }),
      },
      async ({ slug }) => {
        const w = workBySlug[slug];
        return text(JSON.stringify({ name: w.name, outcome: w.outcome, oneLiner: w.oneLiner, role: w.role, team: w.team, period: w.period, stack: w.stack, links: w.links, ...w.caseStudy, notes: undefined }, null, 2));
      },
    );

    server.registerTool(
      "get_skills",
      { title: "Get skills", description: "Skills grouped, each with the projects that prove it and the year last used. Nothing unproven is listed.", inputSchema: z.object({}) },
      async () => text(JSON.stringify(skills, null, 2)),
    );

    server.registerTool(
      "get_about",
      { title: "Get about", description: "Timeline, how Malik works, how he uses AI tools, and what he is doing now.", inputSchema: z.object({}) },
      async () =>
        text(
          JSON.stringify(
            {
              intro: about.intro.en,
              timeline: about.timeline.map((t) => ({ when: t.when, title: t.title.en, period: t.period, body: t.body.en })),
              howIWork: about.howIWork.items.map((i) => ({ title: i.title.en, body: i.body.en })),
              ai: about.ai.body.en,
              now: { updated: now.updated, items: now.items.en },
            },
            null,
            2,
          ),
        ),
    );

    server.registerTool(
      "search",
      { title: "Search the site", description: "Full-text search over everything the site says. Returns the best passages with their URLs.", inputSchema: z.object({ query: z.string().min(2).max(300), k: z.number().int().min(1).max(10).optional() }) },
      async ({ query, k }) => {
        const corpus = getCorpus();
        const hits = search(buildIndex(corpus), corpus, query, k ?? 5);
        return text(JSON.stringify(hits.map((h) => ({ title: h.passage.title, url: `${profile.siteUrl}${h.passage.url}`, text: h.passage.text, score: Number(h.score.toFixed(2)) })), null, 2));
      },
    );

    server.registerTool(
      "evaluate_job_fit",
      {
        title: "Evaluate job fit",
        description: "Paste a job description. Returns, for each requirement it can detect, the evidence on this site (project, URL) or an honest 'no evidence'. It does not score or persuade; it maps.",
        inputSchema: z.object({ job_description: z.string().min(20).max(8000) }),
      },
      async ({ job_description }) => {
        const corpus = getCorpus();
        const index = buildIndex(corpus);
        const allSkills = skills.flatMap((g) => g.items.map((i) => i.name));
        const jd = job_description.toLowerCase();
        const matched = allSkills.filter((s) => {
          const toks = tokenize(s).filter((t) => t.length > 2);
          return toks.some((t) => jd.includes(t));
        });
        const lines = jd
          .split(/\n|[.;•·-]\s+/)
          .map((l) => l.trim())
          .filter((l) => l.length > 12 && l.length < 220)
          .slice(0, 25);
        const mapping = lines.map((line) => {
          const hits = search(index, corpus, line, 2);
          return { requirement: line, evidence: hits.length ? hits.map((h) => ({ title: h.passage.title, url: `${profile.siteUrl}${h.passage.url}` })) : "no evidence on this site" };
        });
        return text(JSON.stringify({ skillsMentionedAndProven: matched, requirements: mapping, contact: profile.email, note: "Evidence links point to case studies with tests, decisions and repositories. Absence of evidence here is not a claim either way." }, null, 2));
      },
    );
  },
  { serverInfo: { name: "malik-halimeh-portfolio", version: "1.0.0" } },
);

export { handler as GET, handler as POST };
