import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { profile } from "@/data/profile";

export function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="mt-24">
      <div aria-hidden className="horizon" />
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 py-8 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          <span className="font-semibold text-fg">{t("rights")}</span> ·{" "}
          {t("builtWith")}
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <li>
            <Link href="/now" className="hover:text-fg">
              {t("now")}
            </Link>
          </li>
          <li>
            <Link href="/colophon" className="hover:text-fg">
              {t("colophon")}
            </Link>
          </li>
          <li>
            <a
              href={profile.github}
              rel="me noopener"
              target="_blank"
              className="hover:text-fg"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={profile.linkedin}
              rel="me noopener"
              target="_blank"
              className="hover:text-fg"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
