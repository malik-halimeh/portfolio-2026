import type { CSSProperties } from "react";
import {
  BrowsersIcon,
  ChatCircleDotsIcon,
  CubeIcon,
  DatabaseIcon,
  FlowArrowIcon,
  SealCheckIcon,
  StackIcon,
} from "@phosphor-icons/react";
import type { ConceptIcon, Skill } from "@/data/profile";
import type { BrandIcon } from "@/lib/skill-icons";
import { cx } from "@/lib/utils";

const CONCEPTS: Record<ConceptIcon, typeof DatabaseIcon> = {
  database: DatabaseIcon,
  cube: CubeIcon,
  browsers: BrowsersIcon,
  seal: SealCheckIcon,
  layers: StackIcon,
  flow: FlowArrowIcon,
  chat: ChatCircleDotsIcon,
};

/**
 * The logo tile that fuses with a skill label: the official mark in its brand
 * colour on a tile tinted with that same colour. Several marks overlap like a
 * stack of cards ("Vue 3 and Nuxt 4"). Skills without an official logo get a
 * concept icon in the sea colour on the same tile, so every chip lines up.
 */
export function SkillIcon({
  skill,
  icons,
  size = "sm",
}: {
  skill: Skill;
  icons: Record<string, BrandIcon>;
  size?: "sm" | "lg";
}) {
  const box = size === "lg" ? "h-11 w-11 rounded-lg" : "h-7 w-7 rounded-md";
  const glyph = size === "lg" ? 22 : 15;

  if (!skill.icons?.length) {
    const Concept = CONCEPTS[skill.concept ?? "layers"];
    return (
      <span
        aria-hidden
        className={cx(
          "skill-tile skill-tile-concept inline-flex shrink-0 items-center justify-center",
          box,
        )}
      >
        <Concept size={glyph} weight="duotone" />
      </span>
    );
  }

  return (
    <span aria-hidden className="inline-flex shrink-0 items-center">
      {skill.icons.map((slug, i) => {
        const ic = icons[slug];
        if (!ic) return null;
        const style = {
          "--brand": ic.hex,
          "--ic-dark": ic.dark ?? "var(--fg)",
          "--ic-light": ic.light ?? "var(--fg)",
          zIndex: skill.icons!.length - i,
        } as CSSProperties;
        return (
          <span
            key={slug}
            style={style}
            title={ic.title}
            className={cx(
              "skill-tile relative inline-flex items-center justify-center",
              box,
              i > 0 && (size === "lg" ? "-ms-3" : "-ms-2"),
            )}
          >
            <svg
              viewBox="0 0 24 24"
              width={glyph}
              height={glyph}
              fill="currentColor"
              role="presentation"
            >
              <path d={ic.path} />
            </svg>
          </span>
        );
      })}
    </span>
  );
}
