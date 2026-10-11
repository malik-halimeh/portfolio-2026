# Research 01 — Portfolio design trends 2026 and what hiring managers say

Compiled 2026-10-11 by a research agent (~65 web fetches). Caveat: Reddit was blocked to the search tool, so hiring-manager quotes come from Hacker News, The Muse, and 2026 engineering-career blogs. Awwwards winners were verified via their Awwwards pages (jury scores included).

## 1. The most striking portfolios of 2025-2026 and why they work

| # | Site | What makes it memorable |
|---|---|---|
| 1 | Bruno Simon, bruno-simon.com (SOTM Jan 2026) | Navigation is the content: drive a car through a 3D island; UI built as 3D models. "Client work" vs "Lab"; achievements unlock car skins; daily-reset leaderboard; moderated "Whispers" left for the next visitor. Treats performance as "the real limit on creativity". [Case study](https://www.awwwards.com/brunos-portfolio-case-study.html) |
| 2 | Léo Parpeix, leoparpeix.com (SOTD 14 Sep 2026) | WebGL + heavy transitions; jury Creativity 8.04 but Usability 7.34 and Accessibility 7.00: the canonical "spectacular but hard to use" profile. [Awwwards](https://www.awwwards.com/sites/leo-parpeix-portfolio-2026) |
| 3 | Gionatan Nese '26 (SOTD 5 Sep 2026) | Strict black/white palette, Three.js + GSAP, sound, custom 404 and preloader. Accessibility 6.40. [Awwwards](https://www.awwwards.com/sites/gionatan-nese-26) |
| 4 | Maria Vasilyeva, mariavasilyeva.com (SOTD 9 Oct 2026) | Whole site framed as a playlist: nav "(01) Notes / (02) Melody / (03) Overture / (04) Jazz", Sound On/Off and **Annotations On/Off** toggles that overlay designer's notes on the work. One coherent metaphor through every label. [Site](https://www.mariavasilyeva.com/) |
| 5 | Nahiyan Khan, nahiyan.codes | Principal design engineer; all-lowercase single column like a plain-text file. Navigation is a draggable highlight you release on a destination. Content organized by time: "today / yesterday / in the background"; projects appear as inline links inside prose. [Site](https://nahiyan.codes/) |
| 6 | Rauno Freiberg, rauno.me | Sections Craft / Projects / Field Notes; click-to-copy email; past years archived on subdomains; closes with an imperative manifesto. Cited everywhere for micro-interaction polish. [Site](https://rauno.me/) |
| 7 | Brittany Chiang, brittanychiang.com | Cursor glow, scroll-highlighted left nav, "TARDIS" to older versions. "Imitated by thousands": the template look to avoid. [WeAreDevelopers](https://www.wearedevelopers.com/magazine/561-web-developer-portfolio-inspiration-and-examples-march-2025) |
| 8 | Josh W. Comeau, joshwcomeau.com | Live editable code playgrounds inside articles; interactivity used to teach, not decorate. |
| 9 | Jordan Cruz-Correa (Win98 OS) / Jesse Zhou (3D ramen hut) | Metaphors work only when every detail commits. |
| 10 | Lynn Fisher, lynnandtonic.com | Redesigned from a blank CSS file every year for 10+ years; archives kept. [Adobe interview](https://xd.adobe.com/ideas/perspectives/interviews/lynn-fishers-annual-portfolio-redesign-skills-sharp) |
| 11 | Paco Coursey, paco.me / Emil Kowalski, emilkowal.ski | Text-first, typography-driven, fast; "Poor design manifests as slowness"; polish in `:active` states, branded scrollbars, animated icons. [ui.land](https://ui.land/interviews/paco-coursey) |

Pattern: the memorable ones either (a) make navigation the experience, (b) run one coherent narrative metaphor through every label, or (c) are ruthlessly plain but obsessively polished. Award-winning 3D sites consistently lose points on usability/accessibility; recruiters notice that too.

## 2. 2026 trends: in, normalizing, slop

**Typography.** Oversized viewport-filling headlines were "Peak" in 2025 and are "Normalizing" in 2026; kinetic type is for selective use only: one hero moment, never body or nav. Variable fonts animated on scroll/hover, `clamp()` fluid sizing, and a serif comeback for editorial feel are live. [Line25](https://line25.com/articles/web-design-trends-2026/), [Bubble](https://bubble.io/blog/web-design-trends/). Typewolf's top-40 portfolio list shows the dominant recipe: a serif display (Editorial New, Canela, GT Sectra, Schnyder, GT Super) paired with a grotesk text face (Graphik, Basis Grotesque, Founders, Neue Haas), with mono used only as metadata accents. [Typewolf](https://www.typewolf.com/portfolio-sites)

**Color.** Accessible-first token systems; saturated earth tones (terracotta, clay, burnt orange); moody darks (deep navy, forest, slate); muted warm neutrals; dark-first identities with semantic tokens mapped to both modes. Envato advises against pure black on pure white and recommends one owned accent repeated everywhere. [Envato](https://elements.envato.com/learn/portfolio-trends)

**Layout/motion.** Scrollytelling via GSAP ScrollTrigger and now native CSS scroll-driven animations; "spatial" layered cards; experimental navigation per Figma. Grain/paper texture is framed as the "reaction against sterile AI visuals" but now ships by default in templates, so a generic noise overlay no longer reads as intentional. [Studio2am](https://studio2am.co/blogs/news/grain-glass-and-gradient-the-background-is-having-a-moment)

**Brutalism / anti-design** is the named counter-reaction to AI sameness; "the best brutalist sites are carefully designed to look carelessly designed." [Gezar](https://gezar.dk/en/blog/web-design-trends-2026)

**Explicitly overdone / AI slop (avoid):**
- Purple-to-cyan gradients, glassmorphism with neon glow, bounce-on-every-hover, six identical cards in a row with icon + heading + two lines. [SmoothUI](https://smoothui.dev/blog/ai-design-slop)
- Creative Boom's 2026 "so over" list: AI imagery, glass everything, gradient logos, minimalism without soul, Canva/template look, Y2K nostalgia, bento grids, motion for its own sake. [Creative Boom](https://www.creativeboom.com/insight/10-trends-creatives-are-so-over-in-2026/)
- Typewriter/typing hero animations. Terminal portfolios ("green text on black"). OS/desktop metaphors delay access to the work.
- Self-rated skill bars, long skill lists, mission statements, "Coming Soon", bootcamp templates read junior. [techinterview.org](https://www.techinterview.org/post/3233474627/personal-website-portfolio-engineers/?format=md)
- Custom cursors: only if disabled for touch and reduced motion.

## 3. What hiring managers actually say (2024-2026)

- HN "Did your personal website help you get hired?" (2024): "When I am hiring I always look at personal websites... a more realistic picture than the resume", but "an empty template and a single entry dated 4 years ago saying TODO will count against you." One who hires FE devs: elaborate Three.js experiments "drew little response"; the plain project grid got the most praise. Candidates: "at least two of my interviewers this year referenced my website as being why they were interested in me." [HN](https://news.ycombinator.com/item?id=41656015)
- HN "What projects do hiring managers like to see" (2025): one long-running project iterated over months with refactors and clear git history beats many small ones; to-do apps won't impress; vague commits are a turn-off. [HN](https://news.ycombinator.com/item?id=43134745)
- Six hiring managers (The Muse): want a 2-5 line value-proposition bio; projects with explanations; process ("I'll feel much more comfortable contacting someone when I know how you think"); even failed projects make great material. Hurts: generic sites, terrible-looking sites, off-target content. [The Muse](https://www.themuse.com/advice/can-a-personal-website-help-your-job-search-what-6-hiring-managers-really-think)
- The 60-second review: 10s homepage (what do you do, what stack?), 20s one featured project (live demo? looks real?), 20s code/README scan, 10s GitHub activity. Bounce triggers: vague self-description, bio/skills before projects, dead demos ("worse than no demo"), no README, "wip" commits, a dark contribution graph, a contact form instead of a visible email, more than 8 small projects instead of 3-4 strong ones, load over 2s. [dev.to checklist](https://dev.to/_d7eb1c1703182e3ce1782/developer-portfolio-checklist-20-things-hiring-managers-look-for-388p)
- Recruiters scan hero + polish for role keywords; hiring managers go to About next to judge clarity, self-awareness and voice; generic "research-define-ideate" process pages read as bootcamp templates; lead with results. [Open Doors Careers](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio)
- Lead project headlines with outcomes ("numbers interrupt the skim"); add a note if a free-tier demo cold-starts; for FE roles a janky portfolio is an instant disqualifier; tests covering failure cases, projects that run from a fresh clone, and commit history showing iteration are what get attention. [Hyperskill](https://hyperskill.org/blog/post/building-a-developer-portfolio-in-2026-what-actually-gets-attention). 67% of one designer's portfolio visitors were on mobile.
- Ignore the widely repeated "73% of hiring managers prefer portfolio over resume" stat; no source verifies it.

## 4. Narrative / structural ideas (sourced)

1. Navigation as the experience (Simon; Khan's draggable highlight).
2. One metaphor carried through every label (Vasilyeva's playlist, Annotations On/Off).
3. Author annotations in the margin: Tufte-style sidenotes with a toggle on mobile. [Gwern](https://gwern.net/sidenote), [Tufte CSS](https://edwardtufte.github.io/tufte-css/), [Critchlow](https://tomcritchlow.com/2020/12/17/side-notes/)
4. About as a timeline: "today / yesterday / in the background."
5. Case study as ADR-style decision log (choice, alternatives, trade-offs, consequences) + "what I'd do differently". [ADR](https://adr.github.io/), [wouthh/engineering-portfolio](https://github.com/wouthh/engineering-portfolio)
6. Sanitized architecture diagrams per project, with "what this deliberately leaves out."
7. Skills as an interactive tech radar. [caiokf/dev-profile](https://github.com/caiokf/dev-profile)
8. Work split into "Client work" vs "Lab"/"Craft".
9. Live GitHub data via a cached serverless proxy.
10. Guestbook / moderated "Whispers".
11. /now page. [sive.rs](https://sive.rs/now2)
12. /uses page. [uses.tech](https://uses.tech/)
13. Colophon: type, palette, build, principles.
14. Site changelog / "What's new" as a 30-day summary.
15. Version archive to older site versions.
16. Playable demos / live code playgrounds inside case studies (Comeau; Cassie Evans).
17. Gamified interactive resume (Robby Leonardi).
18. Testimonials embedded inside the relevant project, not a testimonials section; one clear CTA at the end.
19. Daily-reset leaderboard / achievements as cheap moderated "multiplayer".
20. Projects as inline links in prose rather than a card grid.

## 5. Opinionated recommendation for Malik's rebuild

The winning move is not a Bruno-Simon spectacle (a year of work, loses usability points) and not the Brittany-Chiang template (imitated by thousands). The gap is a portfolio that is editorially distinctive and engineeringly deep: the "annotated engineering notebook."

1. **Structural concept: Engineering Journal.** Each project is a decision log: problem → sanitized architecture diagram → 3-5 ADR entries with the rejected alternative → measured outcome → "what I'd change." Margin annotations carry the honest, human commentary. Answers exactly what hiring managers said they want ("how you think", "process", "even failures").
2. **Hero in 10 seconds:** name, what he builds and the stack, email as text, first project visible without scrolling. Lead every project headline with an outcome.
3. **Live proof layer:** cached GitHub heatmap, "last deploy" timestamps per project, demo health checks that show "cold-starting, ~20s" instead of looking dead. /now, /uses, and a colophon that doubles as a mini case study of the portfolio itself.
4. **Visual language:** display + grotesk text + mono only for metadata; one owned accent; true dark mode via semantic tokens; oversized type for one hero moment only; texture tied to the concept rather than stock noise. Motion scroll-driven, transform/opacity only, respects reduced motion.
5. **One signature interaction** people remember, shipped polished.
6. **Hard avoid list:** purple/cyan gradients, glass cards, bento homepage, six identical cards, typewriter hero, terminal/OS skins, skill bars, long skill lists, contact forms, "coming soon", generic noise, bounce-on-hover.
7. **Non-negotiables:** under 2s load, 90+ Lighthouse including accessibility, tested on iOS Safari and Android Chrome, every project has live link or honest status + README + tests, recent commit activity visible.
