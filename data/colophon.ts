/** Colophon content. Update `lighthouse` after each measured run (see HANDOFF.md quality gates). */
export const colophon = {
  repo: "https://github.com/malik-halimeh/portfolio-2026",
  stack: [
    {
      name: "Next.js",
      version: "16.4",
      why: "App Router with Cache Components: every page is a static shell, route handlers serve the live facts and the resume formats.",
    },
    {
      name: "React",
      version: "19.3",
      why: "Server Components for the text, small client islands for the playground, palette, notes and theme.",
    },
    {
      name: "Tailwind CSS",
      version: "4.3",
      why: "CSS-first tokens in one file: semantic colours in oklch, one accent, one radius scale, logical properties for Arabic.",
    },
    {
      name: "Motion",
      version: "14",
      why: "Transform and opacity only, springs for state changes, everything collapses under prefers-reduced-motion.",
    },
    {
      name: "next-intl",
      version: "4.14",
      why: "English at the root, Arabic under /ar, with hreflang alternates and no locale guessing.",
    },
    {
      name: "Archivo + JetBrains Mono + Readex Pro",
      version: "variable",
      why: "One Latin family with a width axis for the condensed headlines, a mono for facts and state names, a Lexend-method Arabic face for /ar.",
    },
    {
      name: "cmdk",
      version: "1.1",
      why: "The command palette: real actions, not decoration.",
    },
    {
      name: "Phosphor Icons",
      version: "2.1",
      why: "One icon family, regular weight, no hand-drawn SVG icons.",
    },
    {
      name: "Vercel",
      version: "Hobby",
      why: "Native Next.js hosting; route handlers and OG images with no extra setup.",
    },
  ],
  decisions: [
    {
      title: "Case studies are structured, not narrated",
      body: "Problem, guarantees, decisions with their rejected alternatives, evidence. Hiring managers said they want to see how a candidate thinks and what was measured; this structure makes both unavoidable.",
    },
    {
      title: "The hero shows a real artifact",
      body: "The ChargeHub lifecycle in the hero is the actual state machine from the service code, not an illustration. Every state, event and error name exists in the repository.",
    },
    {
      title: "No skill bars, no logo wall, no contact form",
      body: "Skills are chips that open the projects that used them. Contact is an email address you can copy, plus WhatsApp for the region. Nothing on the page claims more than the repositories can show.",
    },
    {
      title: "Dark first, one accent",
      body: "The accent is cedar green: the Lebanon cedar and the colour of a passing check. Light mode is a warm paper, not an inversion.",
    },
    {
      title: "Honest status for free-tier demos",
      body: "A demo on a free instance can take thirty seconds to wake. The site says so and keeps checking, instead of showing a dead link.",
    },
    {
      title: "Next.js over Astro",
      body: "Astro would ship less JavaScript, but this site is interactive on every page and the roles I apply for are React and Next.js roles, so the repository itself is part of the evidence.",
    },
  ],
  lighthouse: {
    measuredOn: "",
    note: "Mobile, Lighthouse 13, median of three runs on the home page.",
    scores: [
      { label: "Performance", value: null as number | null },
      { label: "Accessibility", value: null as number | null },
      { label: "Best practices", value: null as number | null },
      { label: "SEO", value: null as number | null },
    ],
  },
  accessibility: [
    "Every control is reachable and operable by keyboard, with a visible focus ring in the accent colour.",
    "The command palette and the mobile menu trap focus while open and close on Escape.",
    "All motion respects prefers-reduced-motion; the hero diagram stops stepping and the reveals become instant.",
    "Colour contrast is at least 4.5:1 for text in both themes; status is never conveyed by colour alone.",
    "The Arabic version is a real right-to-left layout with logical CSS properties, not a mirrored screenshot.",
    "Live regions announce copied email, demo status and playground results to screen readers.",
  ],
};
