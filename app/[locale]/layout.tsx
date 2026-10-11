import type { Metadata } from "next";
import { locale as getLocale } from "next/root-params";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { archivo, jetbrains, readex } from "@/lib/fonts";
import { profile } from "@/data/profile";
import {
  ThemeProvider,
  themeInitScript,
} from "@/components/theme/ThemeProvider";
import { MotionProvider } from "@/components/theme/MotionProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { PaletteProvider } from "@/components/palette/CommandPalette";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { AskProvider } from "@/components/ask/AskPanel";
import { PersonJsonLd } from "@/components/layout/PersonJsonLd";
import { ConsoleNote } from "@/components/layout/ConsoleNote";
import { cx } from "@/lib/utils";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Nav" });
  const title =
    locale === "ar"
      ? "مالك حليمة، مطوّر ويب متكامل"
      : "Malik Halimeh, Full-Stack Developer";
  const description =
    locale === "ar"
      ? "مطوّر ويب متكامل من صيدا، لبنان. TypeScript وPython. أنظمة متعددة المستأجرين، آلات حالة، مزامنة دون اتصال، وواجهات ثنائية اللغة."
      : profile.summary;
  void t;
  return {
    metadataBase: new URL(profile.siteUrl),
    title: { default: title, template: `%s · Malik Halimeh` },
    description,
    openGraph: {
      type: "website",
      siteName: "Malik Halimeh",
      locale: locale === "ar" ? "ar_LB" : "en_US",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08182a" },
    { media: "(prefers-color-scheme: light)", color: "#fbf5eb" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const t = await getTranslations({ locale, namespace: "Nav" });

  return (
    <html
      lang={locale}
      dir={dir}
      data-theme="dark"
      className={cx(
        archivo.variable,
        jetbrains.variable,
        locale === "ar" && readex.variable,
        "h-full antialiased",
      )}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <PersonJsonLd />
      </head>
      <body className="relative isolate flex min-h-full flex-col">
        <div aria-hidden className="sky" />
        <NextIntlClientProvider>
          <ThemeProvider>
            <MotionProvider>
              <ToastProvider>
                <AskProvider>
                  <PaletteProvider>
                    <a href="#content" className="skip-link">
                      {t("skip")}
                    </a>
                    <Nav />
                    <main id="content" className="flex-1">
                      {children}
                    </main>
                    <Footer />
                    <ConsoleNote />
                  </PaletteProvider>
                </AskProvider>
              </ToastProvider>
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
