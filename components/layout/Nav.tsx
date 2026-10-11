"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  CommandIcon,
  ListIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { usePalette } from "@/components/palette/CommandPalette";
import { cx, isMac } from "@/lib/utils";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

const noopSubscribe = () => () => {};

const links = [
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/now", key: "now" },
  { href: "/resume", key: "resume" },
] as const;

export function Nav() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const { open } = usePalette();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mac = useSyncExternalStore(noopSubscribe, isMac, () => false);
  const sentinel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Hairline + backdrop appear only after the page has scrolled past the sentinel.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const otherLocale = locale === "ar" ? "en" : "ar";
  const switchLocale = () => router.replace(pathname, { locale: otherLocale });

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-6 h-px w-px" />
      <header
        className={cx(
          "sticky top-0 z-40 h-16 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <Link
            href="/"
            className="font-semibold tracking-tight text-fg"
            aria-label={t("home")}
          >
            Malik Halimeh
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                  className={cx(
                    "group relative inline-flex h-10 items-center px-3 text-sm text-fg-muted transition-colors hover:text-fg",
                    isCurrent(l.href) && "text-fg",
                  )}
                >
                  {t(l.key)}
                  <span
                    aria-hidden
                    className={cx(
                      "absolute inset-x-3 bottom-1.5 h-px origin-start bg-accent transition-transform duration-300 ease-[var(--ease-out-expo)]",
                      isCurrent(l.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <Link
              href="/#contact"
              className="me-2 hidden h-8 items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 text-xs font-medium text-accent xl:inline-flex"
            >
              <span aria-hidden className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {t("available")}
            </Link>
            <button
              type="button"
              onClick={open}
              className="hidden h-10 items-center gap-2 rounded-md border border-line px-3 font-mono text-xs text-fg-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-flex"
              aria-label={t("palette")}
              aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
            >
              <CommandIcon size={14} aria-hidden /> {mac ? "⌘" : "Ctrl"} K
            </button>
            <button
              type="button"
              onClick={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-muted hover:text-fg sm:hidden"
              aria-label={t("palette")}
            >
              <CommandIcon size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={toggle}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-muted transition-colors hover:text-fg"
              aria-label={t("theme", {
                theme: theme === "dark" ? t("themeLight") : t("themeDark"),
              })}
            >
              {theme === "dark" ? (
                <SunIcon size={18} aria-hidden />
              ) : (
                <MoonIcon size={18} aria-hidden />
              )}
            </button>
            <button
              type="button"
              onClick={switchLocale}
              lang={otherLocale}
              dir={otherLocale === "ar" ? "rtl" : "ltr"}
              className="inline-flex h-10 items-center rounded-md px-2 text-sm text-fg-muted transition-colors hover:text-fg"
              aria-label={t("languageSr")}
            >
              {t("language")}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-muted hover:text-fg md:hidden"
              aria-label={menuOpen ? t("close") : t("menu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? (
                <XIcon size={20} aria-hidden />
              ) : (
                <ListIcon size={20} aria-hidden />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-30 bg-bg md:hidden"
          >
            <ul className="flex flex-col px-4 pt-4">
              {links.map((l) => (
                <li key={l.key} className="border-b border-line">
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isCurrent(l.href) ? "page" : undefined}
                    className={cx(
                      "flex min-h-14 items-center text-2xl font-semibold tracking-tight",
                      isCurrent(l.href) ? "text-accent" : "text-fg",
                    )}
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
