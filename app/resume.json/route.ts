import { profile, skills } from "@/data/profile";
import { work } from "@/data/work";

/** JSON Resume (https://jsonresume.org/schema) built from the same data as the site. */
export async function GET() {
  const resume = {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: profile.name,
      label: profile.title,
      email: profile.email,
      phone: profile.phoneDisplay,
      url: profile.siteUrl,
      summary: profile.summary,
      location: { city: profile.location.city, countryCode: "LB" },
      profiles: [
        { network: "GitHub", username: profile.githubLogin, url: profile.github },
        { network: "LinkedIn", username: "malik-halimeh", url: profile.linkedin },
      ],
    },
    work: [
      {
        name: profile.experience.org,
        position: profile.experience.role,
        startDate: "2026-05",
        endDate: "2026-10",
        summary: "Intensive full-stack web development and AI internship. Led two team projects, primary developer on a third, and built an offline-first study PWA for the cohort. Completed with a certificate, October 2026.",
      },
    ],
    education: [
      {
        institution: profile.education.school,
        area: "Computer Science",
        studyType: "Bachelor of Science",
        startDate: "2016",
        endDate: "2020",
      },
    ],
    skills: skills.map((g) => ({ name: g.group, keywords: g.items.map((i) => i.name) })),
    languages: profile.languages.map((l) => ({ language: l.name, fluency: l.level })),
    projects: work.map((w) => ({
      name: w.name,
      description: w.oneLiner,
      highlights: w.caseStudy.guarantees.map((g) => g.title),
      keywords: w.stack,
      startDate: "2026",
      roles: [w.role],
      url: w.links.demo ?? w.links.preview ?? w.links.repo,
      entity: w.team,
    })),
    meta: { canonical: `${profile.siteUrl}/resume.json`, version: "v1.0.0", lastModified: process.env.NEXT_PUBLIC_CV_UPDATED ?? "2026-09-03" },
  };
  return Response.json(resume, { headers: { "Cache-Control": "public, max-age=3600" } });
}
