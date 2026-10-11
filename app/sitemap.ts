import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { work } from "@/data/work";

const base = profile.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/now", "/resume", "/colophon", ...work.map((w) => `/work/${w.slug}`)];
  const lastModified = new Date();
  return pages.map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p.startsWith("/work/") ? 0.8 : 0.6,
    alternates: { languages: { en: `${base}${p || "/"}`, ar: `${base}/ar${p}` } },
  }));
}
