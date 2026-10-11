import "server-only";
import {
  siClaude,
  siCloudflare,
  siCss,
  siDjango,
  siDocker,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siGithubactions,
  siHtml5,
  siI18next,
  siJavascript,
  siJira,
  siJsonwebtokens,
  siLighthouse,
  siMongodb,
  siMongoose,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siPostgresql,
  siPwa,
  siPytest,
  siPython,
  siReact,
  siReactquery,
  siRender,
  siSqlalchemy,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTestinglibrary,
  siTypescript,
  siVercel,
  siVitest,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";
import { skills } from "@/data/profile";

/** Official brand logos from Simple Icons (CC0). Only these are bundled. */
const LIBRARY: Record<string, SimpleIcon> = {
  claude: siClaude,
  cloudflare: siCloudflare,
  css: siCss,
  django: siDjango,
  docker: siDocker,
  express: siExpress,
  fastapi: siFastapi,
  git: siGit,
  github: siGithub,
  githubactions: siGithubactions,
  html5: siHtml5,
  i18next: siI18next,
  javascript: siJavascript,
  jira: siJira,
  jsonwebtokens: siJsonwebtokens,
  lighthouse: siLighthouse,
  mongodb: siMongodb,
  mongoose: siMongoose,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  nuxt: siNuxt,
  postgresql: siPostgresql,
  pwa: siPwa,
  pytest: siPytest,
  python: siPython,
  react: siReact,
  reactquery: siReactquery,
  render: siRender,
  sqlalchemy: siSqlalchemy,
  stripe: siStripe,
  supabase: siSupabase,
  tailwindcss: siTailwindcss,
  testinglibrary: siTestinglibrary,
  typescript: siTypescript,
  vercel: siVercel,
  vitest: siVitest,
  vuedotjs: siVuedotjs,
};

export type BrandIcon = {
  title: string;
  path: string;
  /** Brand colour, or null when it would be too faint on that theme (then the text colour is used). */
  dark: string | null;
  light: string | null;
  /** Brand colour for the tile tint, always present. */
  hex: string;
};

/* Page backgrounds of the two themes (see app/globals.css). */
const BG_DARK = "#08182a";
const BG_LIGHT = "#fbf5eb";

function luminance(hex: string): number {
  const n = parseInt(hex.replace("#", ""), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/** WCAG 1.4.11: graphical objects need 3:1 against their background. */
const MIN = 3;

export function getSkillIcons(): Record<string, BrandIcon> {
  const used = new Set(
    skills.flatMap((g) => g.items.flatMap((i) => i.icons ?? [])),
  );
  const out: Record<string, BrandIcon> = {};
  for (const slug of used) {
    const icon = LIBRARY[slug];
    if (!icon)
      throw new Error(`Unknown Simple Icons slug in data/profile.ts: ${slug}`);
    const hex = `#${icon.hex}`;
    out[slug] = {
      title: icon.title,
      path: icon.path,
      hex,
      dark: contrast(hex, BG_DARK) >= MIN ? hex : null,
      light: contrast(hex, BG_LIGHT) >= MIN ? hex : null,
    };
  }
  return out;
}
