"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { profile, skills, type Skill } from "@/data/profile";
import { workIndex } from "@/data/work-index";
import type { BrandIcon } from "@/lib/skill-icons";
import { SkillIcon } from "./SkillIcon";
import { cx } from "@/lib/utils";

/** What recruiters most often look for; one click fills the search. */
const SHORTCUTS = [
  "React",
  "Node.js",
  "PostgreSQL",
  "TypeScript",
  "Testing",
  "CI/CD",
  "Arabic",
  "AI",
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ+#./ -]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function haystack(skill: Skill, group: string) {
  return normalize(
    [skill.name, skill.short ?? "", group, ...(skill.aliases ?? [])].join(
      " | ",
    ),
  );
}

function matches(skill: Skill, group: string, q: string) {
  if (!q) return true;
  const hay = haystack(skill, group);
  return q.split(" ").every((token) => hay.includes(token));
}

type Where = "core" | number;

/**
 * Skills as proof, built for a recruiter in a hurry: search first (with the
 * words recruiters actually type), the core stack as large logo tiles, then
 * every skill as a logo chip with the number of projects that prove it.
 * Selecting anything opens the proof right where it was clicked.
 */
export function StackProof({ icons }: { icons: Record<string, BrandIcon> }) {
  const t = useTranslations("Home.stack");
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{
    name: string;
    where: Where;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultId = useId();

  const q = normalize(query);

  const groups = useMemo(
    () =>
      skills
        .map((g, gi) => ({
          ...g,
          gi,
          items: g.items.filter((s) => matches(s, g.group, q)),
        }))
        .filter((g) => g.items.length > 0),
    [q],
  );
  const core = useMemo(
    () => skills.flatMap((g) => g.items.filter((s) => s.core)),
    [],
  );
  const count = groups.reduce((n, g) => n + g.items.length, 0);

  // With exactly one match, open its proof without another click.
  const only =
    q && count === 1
      ? { name: groups[0].items[0].name, where: groups[0].gi as Where }
      : null;
  const open = selected ?? only;

  // "/" jumps to the search from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const typing =
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.isContentEditable;
      if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.scrollIntoView({
          block: "center",
          behavior: reduce ? "auto" : "smooth",
        });
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [reduce]);

  const toggle = (name: string, where: Where) =>
    setSelected((cur) =>
      cur && cur.name === name && cur.where === where ? null : { name, where },
    );

  const find = (name: string) =>
    skills.flatMap((g) => g.items).find((s) => s.name === name)!;

  const panel = (where: Where) =>
    open && open.where === where ? (
      <m.div
        key={`${open.name}-${where}`}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className={where === "core" ? "col-span-full" : undefined}
      >
        <ProofPanel skill={find(open.name)} icons={icons} />
      </m.div>
    ) : null;

  return (
    <div>
      {/* Search */}
      <div className="flex flex-col gap-3">
        <label htmlFor="stack-search" className="sr-only">
          {t("searchLabel")}
        </label>
        <div className="relative max-w-2xl">
          <input
            ref={inputRef}
            id="stack-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQuery("");
            }}
            placeholder={t("placeholder")}
            autoComplete="off"
            spellCheck={false}
            aria-describedby={resultId}
            className="peer h-14 w-full rounded-lg border border-line-strong bg-bg-elevated/70 ps-12 pe-14 text-base text-fg shadow-card outline-none backdrop-blur-sm placeholder:text-fg-faint focus:border-accent [&::-webkit-search-cancel-button]:hidden"
          />
          <MagnifyingGlassIcon
            size={18}
            aria-hidden
            className="pointer-events-none absolute start-4 top-1/2 z-10 -translate-y-1/2 text-sea"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute end-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-fg-muted hover:text-fg"
              aria-label={t("clear")}
            >
              <XIcon size={16} aria-hidden />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute end-4 top-1/2 hidden -translate-y-1/2 rounded border border-line px-2 py-0.5 font-mono text-xs text-fg-faint sm:inline-block">
              /
            </kbd>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="me-1 text-sm text-fg-faint">{t("try")}</span>
          {SHORTCUTS.map((s) => {
            const active = q === normalize(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQuery(active ? "" : s);
                  setSelected(null);
                }}
                aria-pressed={active}
                className={cx(
                  "inline-flex min-h-9 items-center rounded-full border px-3 text-sm transition-colors",
                  active
                    ? "border-accent bg-accent-soft text-fg"
                    : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
        <p
          id={resultId}
          aria-live="polite"
          className={cx("text-sm", q ? "text-fg-muted" : "sr-only")}
        >
          {q ? t("matches", { count }) : ""}
        </p>
      </div>

      {/* Core stack */}
      {!q && (
        <div className="mt-10">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-ember">
            {t("core")}
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {core.map((s) => {
              const isOpen = open?.name === s.name && open.where === "core";
              const brand = s.icons?.[0] ? icons[s.icons[0]]?.hex : undefined;
              return (
                <li key={s.name}>
                  <button
                    type="button"
                    onClick={() => toggle(s.name, "core")}
                    aria-expanded={isOpen}
                    style={{ "--brand": brand } as CSSProperties}
                    className={cx(
                      "skill-card flex h-full w-full flex-col items-start gap-2 rounded-lg border p-3 text-start sm:flex-row sm:items-center sm:gap-3 transition-[border-color,background-color] active:translate-y-px",
                      isOpen
                        ? "border-accent bg-accent-soft"
                        : "border-line bg-bg-elevated/50",
                    )}
                  >
                    <SkillIcon skill={s} icons={icons} size="lg" />
                    <span className="min-w-0">
                      <span className="block font-semibold tracking-tight text-fg">
                        {s.short ?? s.name}
                      </span>
                      <span className="block font-mono text-[11px] text-fg-muted">
                        {t("projects", { count: s.usedIn.length })}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
            <AnimatePresence initial={false}>{panel("core")}</AnimatePresence>
          </ul>
        </div>
      )}

      {/* Every skill, grouped */}
      {groups.length > 0 ? (
        <div
          className={cx(
            "gap-x-10 md:columns-2 lg:columns-3",
            q ? "mt-8" : "mt-12",
          )}
        >
          {groups.map((g) => (
            <div key={g.group} className="mb-9 break-inside-avoid">
              <h3 className="flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-wider text-sea">
                {t(`groups.${g.group}`)}
                <span className="text-fg-faint">{g.items.length}</span>
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => {
                  const isOpen = open?.name === s.name && open.where === g.gi;
                  const brand = s.icons?.[0]
                    ? icons[s.icons[0]]?.hex
                    : undefined;
                  return (
                    <li key={s.name}>
                      <button
                        type="button"
                        onClick={() => toggle(s.name, g.gi)}
                        aria-expanded={isOpen}
                        style={{ "--brand": brand } as CSSProperties}
                        className={cx(
                          "skill-card inline-flex min-h-10 items-center gap-2 rounded-lg border py-1 ps-1 pe-2.5 text-sm transition-[border-color,background-color] active:translate-y-px",
                          isOpen
                            ? "border-accent bg-accent-soft text-fg"
                            : "border-line text-fg-muted hover:text-fg",
                        )}
                      >
                        <SkillIcon skill={s} icons={icons} />
                        <span className="text-start">{s.name}</span>
                        {s.usedIn.length > 0 && (
                          <span className="ms-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-bg-sunken px-1.5 font-mono text-[10px] text-fg-muted">
                            <span aria-hidden>{s.usedIn.length}</span>
                            <span className="sr-only">
                              {t("projects", { count: s.usedIn.length })}
                            </span>
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <AnimatePresence initial={false}>{panel(g.gi)}</AnimatePresence>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed border-line-strong p-6">
          <p className="font-semibold text-fg">{t("noneTitle")}</p>
          <p className="prose-measure mt-2 text-fg-muted">
            {t("noneBody", { q: query.trim() })}
          </p>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(`Question about ${query.trim()}`)}`}
            className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {t("askCta")}
            <ArrowRightIcon
              size={14}
              aria-hidden
              className="rtl:-scale-x-100"
            />
          </a>
        </div>
      )}
    </div>
  );
}

function ProofPanel({
  skill,
  icons,
}: {
  skill: Skill;
  icons: Record<string, BrandIcon>;
}) {
  const t = useTranslations("Home.stack");
  const projects = skill.usedIn.flatMap((slug) =>
    workIndex.filter((w) => w.slug === slug),
  );
  return (
    <div className="mt-3 rounded-lg border border-line bg-bg-elevated p-4 shadow-card">
      <div className="flex items-center gap-3">
        <SkillIcon skill={skill} icons={icons} />
        <p className="font-semibold text-fg">{skill.name}</p>
        <span className="ms-auto font-mono text-[11px] text-fg-faint">
          {t("lastUsed", { year: skill.lastUsed })}
        </span>
      </div>
      {projects.length > 0 ? (
        <>
          <p className="mt-3 text-sm text-fg-muted">{t("provenBy")}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {projects.map((w) => (
              <li key={w.slug} style={{ "--p-hue": w.hue } as CSSProperties}>
                <Link
                  href={`/work/${w.slug}`}
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-line bg-bg px-3 text-sm text-fg transition-colors hover:border-line-strong"
                >
                  <span
                    aria-hidden
                    className="p-bg inline-block h-2 w-2 rounded-full"
                  />
                  {w.name}
                  <ArrowRightIcon
                    size={12}
                    aria-hidden
                    className="text-fg-faint rtl:-scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-3 text-sm text-fg-muted">{t("internship")}</p>
      )}
    </div>
  );
}
