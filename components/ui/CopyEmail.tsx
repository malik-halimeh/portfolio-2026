"use client";

import { useTranslations } from "next-intl";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { profile } from "@/data/profile";
import { useToast } from "@/components/ui/Toast";
import { cx } from "@/lib/utils";

/**
 * Email as visible text plus a copy button. Keyboard and screen-reader friendly:
 * the address is real text (selectable, readable), the button announces its result.
 */
export function CopyEmail({
  variant = "button",
  className,
}: {
  variant?: "button" | "inline";
  className?: string;
}) {
  const t = useTranslations("Contact");
  const { toast } = useToast();
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setDone(true);
      toast(t("copied"));
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      window.location.assign(`mailto:${profile.email}`);
    }
  };

  if (variant === "inline") {
    return (
      <span className={cx("inline-flex items-center gap-2", className)}>
        <a
          href={`mailto:${profile.email}`}
          className="font-mono text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
          dir="ltr"
        >
          {profile.email}
        </a>
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-fg-muted hover:border-line-strong hover:text-fg"
          aria-label={t("copyEmail")}
        >
          {done ? (
            <CheckIcon size={16} className="text-accent" aria-hidden />
          ) : (
            <CopyIcon size={16} aria-hidden />
          )}
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cx(
        "inline-flex h-12 items-center gap-2 rounded-md border border-line-strong px-5 font-medium text-fg transition-colors hover:border-accent hover:text-accent active:translate-y-px",
        className,
      )}
    >
      {done ? (
        <CheckIcon size={18} className="text-accent" aria-hidden />
      ) : (
        <CopyIcon size={18} aria-hidden />
      )}
      {t("emailMe")}
    </button>
  );
}
