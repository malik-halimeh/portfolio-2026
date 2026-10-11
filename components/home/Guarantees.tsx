import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

const items = [
  { key: "constraint", slug: "chargehub" },
  { key: "appendOnly", slug: "tawzeevo" },
  { key: "offline", slug: "tawzeevo" },
  { key: "leastPrivilege", slug: "tawzeevo" },
  { key: "verified", slug: "chargehub" },
] as const;

/**
 * Replaces skill bars. Five engineering guarantees, each proven by a project.
 * Layout: numbered definition list with a hairline per item (one hairline, not two).
 */
export function Guarantees() {
  const t = useTranslations("Home.guarantees");
  return (
    <dl className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
      {items.map((item, i) => (
        <div key={item.key} className="border-t border-line py-7">
          <dt className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-fg-faint" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-xl font-semibold tracking-tight text-fg">
              {t(`${item.key}.title`)}
            </span>
          </dt>
          <dd className="mt-3 ps-9">
            <p className="max-w-[52ch] text-fg-muted">
              {t(`${item.key}.detail`)}
            </p>
            <Link
              href={`/work/${item.slug}`}
              className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-fg underline-offset-4 hover:underline"
            >
              {t(`${item.key}.proof`)}
              <ArrowRightIcon
                size={14}
                aria-hidden
                className="rtl:-scale-x-100"
              />
            </Link>
          </dd>
        </div>
      ))}
    </dl>
  );
}
