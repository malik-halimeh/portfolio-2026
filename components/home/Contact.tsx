import { useTranslations } from "next-intl";
import {
  DownloadSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/data/profile";
import { CopyEmail } from "@/components/ui/CopyEmail";

/**
 * One contact intent, no form. Email as text, WhatsApp for the MENA audience,
 * LinkedIn, GitHub, CV with its date, and an availability line driven by data.
 */
export function Contact() {
  const t = useTranslations("Contact");
  const cvDate = process.env.NEXT_PUBLIC_CV_UPDATED ?? "2026-09-03";
  return (
    <div className="dusk-card grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
      <div className="lg:col-span-7">
        <h2 id="contact-title" className="display text-4xl sm:text-6xl">
          {t("title")}
        </h2>
        <p className="prose-measure mt-5 text-lg text-fg-muted">
          {t("subtitle")}
        </p>
        <p className="mt-6 inline-flex items-center gap-2 text-sm text-fg-muted">
          <span aria-hidden className="relative inline-flex h-2.5 w-2.5">
            {profile.availability.status === "open" && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            )}
            <span
              className={
                profile.availability.status === "open"
                  ? "relative inline-flex h-2.5 w-2.5 rounded-full bg-accent"
                  : "relative inline-flex h-2.5 w-2.5 rounded-full bg-warn"
              }
            />
          </span>
          {profile.availability.label}
        </p>
      </div>
      <div className="lg:col-span-5">
        <div className="flex flex-col gap-4">
          <CopyEmail variant="inline" />
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <ContactLink
              href={profile.whatsapp}
              icon={<WhatsappLogoIcon size={18} />}
              label="WhatsApp"
              hint={profile.phoneDisplay}
            />
            <ContactLink
              href={profile.linkedin}
              icon={<LinkedinLogoIcon size={18} />}
              label="LinkedIn"
              hint="in/malik-halimeh"
            />
            <ContactLink
              href={profile.github}
              icon={<GithubLogoIcon size={18} />}
              label="GitHub"
              hint="malik-halimeh"
            />
            <ContactLink
              href="/Malik_Halimeh_CV.pdf"
              icon={<DownloadSimpleIcon size={18} />}
              label={t("cv")}
              hint={t("cvUpdated", { date: cvDate })}
              download
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

function ContactLink({
  href,
  icon,
  label,
  hint,
  download,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  hint: string;
  download?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "me noopener" : undefined}
        download={download ? "Malik_Halimeh_CV.pdf" : undefined}
        className="flex min-h-14 items-center gap-3 rounded-md border border-line bg-bg/60 px-4 text-fg backdrop-blur-sm transition-colors hover:border-accent"
      >
        <span className="text-fg-muted" aria-hidden>
          {icon}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold">{label}</span>
          <span
            className="truncate font-mono text-[11px] text-fg-faint"
            dir="ltr"
          >
            {hint}
          </span>
        </span>
      </a>
    </li>
  );
}
