"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Command } from "cmdk";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  ArrowSquareOutIcon,
  CopyIcon,
  DownloadSimpleIcon,
  FileTextIcon,
  GithubLogoIcon,
  HouseIcon,
  LinkedinLogoIcon,
  MoonIcon,
  SunIcon,
  TranslateIcon,
  UserIcon,
  WhatsappLogoIcon,
  CalendarBlankIcon,
  CodeIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import { work } from "@/data/work";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useToast } from "@/components/ui/Toast";
import { useAsk } from "@/components/ask/AskPanel";
import { ChatCircleDotsIcon } from "@phosphor-icons/react";

const PaletteContext = createContext<{
  open: () => void;
  close: () => void;
  isOpen: boolean;
} | null>(null);

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette must be used inside PaletteProvider");
  return ctx;
}

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <PaletteContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen && <CommandPalette key="palette" />}
      </AnimatePresence>
    </PaletteContext.Provider>
  );
}

function CommandPalette() {
  const { close } = usePalette();
  const t = useTranslations("Palette");
  const nav = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const { toast } = useToast();
  const { ask } = useAsk();
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const run = (fn: () => void) => () => {
    close();
    fn();
  };

  const go = (href: string) => run(() => router.push(href));

  const copyEmail = run(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast(t("copied"));
    } catch {
      window.location.assign(`mailto:${profile.email}`);
    }
  });

  const openExternal = (url: string) =>
    run(() => window.open(url, "_blank", "noopener"));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg-sunken/70 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl overflow-hidden rounded-lg border border-line bg-bg-elevated shadow-card"
      >
        <Command
          label={nav("palette")}
          loop
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-fg-faint"
        >
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder={t("placeholder")}
            className="h-12 w-full border-b border-line bg-transparent px-4 text-base text-fg outline-none placeholder:text-fg-faint"
          />
          <Command.List className="max-h-[50vh] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-sm text-fg-muted">
              {t("empty")}
            </Command.Empty>

            <Command.Group heading={t("ask")}>
              <Item
                onSelect={run(() =>
                  ask(query.trim().length > 3 ? query : undefined),
                )}
                icon={<ChatCircleDotsIcon size={16} />}
                label={
                  query.trim().length > 3
                    ? t("askThis", { q: query })
                    : t("askAbout")
                }
                keywords={["ask", "question", "chat", query]}
              />
            </Command.Group>

            <Command.Group heading={t("pages")}>
              <Item
                onSelect={go("/")}
                icon={<HouseIcon size={16} />}
                label={t("home")}
              />
              <Item
                onSelect={go("/work")}
                icon={<CodeIcon size={16} />}
                label={nav("work")}
              />
              <Item
                onSelect={go("/about")}
                icon={<UserIcon size={16} />}
                label={nav("about")}
              />
              <Item
                onSelect={go("/now")}
                icon={<CalendarBlankIcon size={16} />}
                label={nav("now")}
              />
              <Item
                onSelect={go("/resume")}
                icon={<FileTextIcon size={16} />}
                label={nav("resume")}
              />
            </Command.Group>

            <Command.Group heading={t("projects")}>
              {work.map((w) => (
                <Item
                  key={w.slug}
                  onSelect={go(`/work/${w.slug}`)}
                  icon={<CodeIcon size={16} />}
                  label={w.name}
                  hint={w.stack.slice(0, 3).join(", ")}
                  keywords={[...w.stack, w.oneLiner]}
                />
              ))}
            </Command.Group>

            <Command.Group heading={t("actions")}>
              <Item
                onSelect={copyEmail}
                icon={<CopyIcon size={16} />}
                label={t("copyEmail")}
                hint={profile.email}
              />
              <Item
                onSelect={run(() => {
                  const a = document.createElement("a");
                  a.href = "/Malik_Halimeh_CV.pdf";
                  a.download = "Malik_Halimeh_CV.pdf";
                  a.click();
                })}
                icon={<DownloadSimpleIcon size={16} />}
                label={t("downloadCv")}
              />
              <Item
                onSelect={run(toggle)}
                icon={
                  theme === "dark" ? (
                    <SunIcon size={16} />
                  ) : (
                    <MoonIcon size={16} />
                  )
                }
                label={t("toggleTheme")}
              />
              <Item
                onSelect={run(() =>
                  router.replace(pathname, {
                    locale: locale === "ar" ? "en" : "ar",
                  }),
                )}
                icon={<TranslateIcon size={16} />}
                label={t("switchLocale")}
              />
            </Command.Group>

            <Command.Group heading={t("links")}>
              <Item
                onSelect={openExternal(profile.github)}
                icon={<GithubLogoIcon size={16} />}
                label={t("github")}
                hint="github.com/malik-halimeh"
                external
              />
              <Item
                onSelect={openExternal(profile.linkedin)}
                icon={<LinkedinLogoIcon size={16} />}
                label={t("linkedin")}
                hint="linkedin.com/in/malik-halimeh"
                external
              />
              <Item
                onSelect={openExternal(profile.whatsapp)}
                icon={<WhatsappLogoIcon size={16} />}
                label={t("whatsapp")}
                hint={profile.phoneDisplay}
                external
              />
            </Command.Group>
          </Command.List>
        </Command>
      </motion.div>
    </motion.div>
  );
}

function Item({
  onSelect,
  icon,
  label,
  hint,
  keywords,
  external,
}: {
  onSelect: () => void;
  icon: ReactNode;
  label: string;
  hint?: string;
  keywords?: string[];
  external?: boolean;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      value={label}
      keywords={keywords}
      className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-3 text-sm text-fg outline-none data-[selected=true]:bg-accent-soft data-[selected=true]:text-fg"
    >
      <span className="text-fg-muted" aria-hidden>
        {icon}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {hint && (
        <span
          className="hidden truncate font-mono text-[11px] text-fg-faint sm:inline"
          dir="ltr"
        >
          {hint}
        </span>
      )}
      {external && (
        <ArrowSquareOutIcon size={14} className="text-fg-faint" aria-hidden />
      )}
    </Command.Item>
  );
}
