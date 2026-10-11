import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // English lives at the bare path, Arabic under /ar.
  localePrefix: "as-needed",
  // Never guess from Accept-Language: recruiters abroad should land on English.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
