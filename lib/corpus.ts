import { profile, skills } from "@/data/profile";
import { work } from "@/data/work";
import { about, now } from "@/data/about";

export type Passage = { id: string; title: string; url: string; text: string };

/**
 * The retrieval corpus for "Ask about Malik": built from the same data files as
 * the site, so the chat can never know something the pages do not say.
 */
export function buildCorpus(): Passage[] {
  const p: Passage[] = [];
  const add = (id: string, title: string, url: string, text: string) =>
    p.push({ id, title, url, text: text.replace(/\s+/g, " ").trim() });

  add(
    "profile",
    "Profile",
    "/",
    `${profile.name} is a ${profile.title} in ${profile.location.city}, ${profile.location.country}. ${profile.summary} Email ${profile.email}. GitHub ${profile.github}. LinkedIn ${profile.linkedin}. Languages: ${profile.languages.map((l) => `${l.name} (${l.level})`).join(", ")}. Availability: ${profile.availability.label} (as of ${profile.availability.updated}).`,
  );
  add(
    "education",
    "Education and experience",
    "/resume",
    `${profile.education.degree}, ${profile.education.school}, ${profile.education.campus}, ${profile.education.years}. ${profile.experience.role} at ${profile.experience.org}, ${profile.experience.period}. ${profile.experience.note}`,
  );
  for (const g of skills) {
    add(
      `skills-${g.group}`,
      `Skills: ${g.group}`,
      "/#stack",
      `${g.group}: ${g.items.map((i) => `${i.name} (used in ${i.usedIn.join(", ") || "internship exercises"}, last used ${i.lastUsed})`).join("; ")}.`,
    );
  }
  for (const w of work) {
    const cs = w.caseStudy;
    add(
      `${w.slug}-summary`,
      `${w.name}: summary`,
      `/work/${w.slug}`,
      `${w.name}. ${w.outcome}. ${w.oneLiner} Role: ${w.role}. Team: ${w.team}. Period: ${w.period}. Stack: ${w.stack.join(", ")}. Status: ${w.status.label}. ${w.links.demo ? `Live demo: ${w.links.demo}.` : ""} ${w.links.repo ? `Source: ${w.links.repo}.` : ""}`,
    );
    add(
      `${w.slug}-problem`,
      `${w.name}: the problem`,
      `/work/${w.slug}#problem`,
      cs.problem.join(" "),
    );
    add(
      `${w.slug}-guarantees`,
      `${w.name}: guarantees`,
      `/work/${w.slug}#guarantees`,
      cs.guarantees.map((g) => `${g.title}: ${g.detail}`).join(" "),
    );
    cs.decisions.forEach((d, i) =>
      add(
        `${w.slug}-decision-${i}`,
        `${w.name}: decision, ${d.title}`,
        `/work/${w.slug}#decisions`,
        `In ${w.name}, ${d.title.charAt(0).toLowerCase()}${d.title.slice(1)}: ${d.choice} The rejected alternative was ${d.alternative.replace(/\.$/, "")}. ${d.consequence}`,
      ),
    );
    add(
      `${w.slug}-evidence`,
      `${w.name}: evidence`,
      `/work/${w.slug}#evidence`,
      cs.evidence
        .map((e) => `${e.label}: ${e.value}${e.detail ? ` (${e.detail})` : ""}`)
        .join(". "),
    );
    add(
      `${w.slug}-retro`,
      `${w.name}: what I would change`,
      `/work/${w.slug}#retro`,
      cs.whatIdChange.join(" "),
    );
  }
  add("about-intro", "About", "/about", about.intro.en);
  about.timeline.forEach((t, i) =>
    add(
      `about-timeline-${i}`,
      `About: ${t.title.en}`,
      "/about",
      `${t.title.en} (${t.period}). ${t.body.en}`,
    ),
  );
  about.howIWork.items.forEach((h, i) =>
    add(
      `about-how-${i}`,
      `How I work: ${h.title.en}`,
      "/about",
      `${h.title.en}. ${h.body.en}`,
    ),
  );
  add("about-ai", "How I use AI tools", "/about", about.ai.body.en.join(" "));
  add("about-personal", "Personal", "/about", about.personal.en);
  add("now", `Now (updated ${now.updated})`, "/now", now.items.en.join(" "));
  return p;
}

let cached: Passage[] | null = null;
export function getCorpus(): Passage[] {
  if (!cached) cached = buildCorpus();
  return cached;
}
