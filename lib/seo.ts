import type { Metadata } from "next";

/** Canonical and hreflang alternates for a path, given the current locale. */
export function alternatesFor(
  locale: string,
  path: string,
): NonNullable<Metadata["alternates"]> {
  const en = path === "" ? "/" : path;
  const ar = `/ar${path}`;
  return {
    canonical: locale === "ar" ? ar : en,
    languages: { en, ar, "x-default": en },
  };
}
