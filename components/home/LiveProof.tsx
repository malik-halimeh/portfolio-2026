import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getGitHubStats } from "@/lib/github";
import { profile } from "@/data/profile";
import { DemoHealth } from "./DemoHealth";

/**
 * Three facts that are checked, not claimed: GitHub activity, demo health, site freshness.
 * Layout family: single horizontal strip with vertical dividers (no cards).
 */
export async function LiveProof() {
  const t = await getTranslations("Home.proof");
  const built = process.env.NEXT_PUBLIC_BUILD_DATE ?? "";
  return (
    <div className="grid grid-cols-1 divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0 rtl:md:divide-x-reverse">
      <Fact label={t("githubLabel")} href={profile.github} external>
        <Suspense fallback={<span className="inline-block h-9 w-24 animate-pulse rounded bg-bg-elevated" aria-hidden />}>
          <GitHubFact cachedWord={t("cached")} unit={t("contributions")} />
        </Suspense>
      </Fact>
      <Fact label={t("demoLabel")} href="https://tawzeevo-malik-halimeh.onrender.com/demo" external>
        <span className="block text-3xl font-semibold tracking-tight text-fg">Tawzeevo</span>
        <DemoHealth target="tawzeevo" className="mt-1" />
      </Fact>
      <Fact label={t("siteLabel")} href="/colophon">
        <span className="block text-3xl font-semibold tracking-tight text-fg" dir="ltr">
          {built ? built.slice(0, 10) : "2026"}
        </span>
        <span className="mt-1 block font-mono text-[12px] text-fg-muted">{t("siteDetail")}</span>
      </Fact>
    </div>
  );
}

async function GitHubFact({ cachedWord, unit }: { cachedWord: string; unit: string }) {
  const s = await getGitHubStats();
  return (
    <>
      <span className="block text-3xl font-semibold tracking-tight text-fg" dir="ltr">
        {s.contributions.toLocaleString("en-US")}
      </span>
      <span className="mt-1 block font-mono text-[12px] text-fg-muted">
        {unit}
        {s.source === "fallback" ? ` (${cachedWord} ${s.fetchedOn})` : ""}
      </span>
    </>
  );
}

function Fact({ label, href, external, children }: { label: string; href: string; external?: boolean; children: React.ReactNode }) {
  const inner = (
    <>
      <span className="block font-mono text-[11px] uppercase tracking-wider text-fg-faint">{label}</span>
      <span className="mt-3 block">{children}</span>
    </>
  );
  const cls = "block px-0 py-6 md:px-6 first:md:ps-0 last:md:pe-0 hover:[&_.text-fg]:text-accent transition-colors";
  return external ? (
    <a href={href} target="_blank" rel="noopener" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
