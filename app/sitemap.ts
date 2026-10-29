import type { MetadataRoute } from "next";
import { pageAlternates } from "@/lib/i18n/locales";

export const dynamic = "force-static";

/**
 * One `<url>` per locale, each carrying the whole alternate set, including its
 * own. A sitemap that lists the translations only on the default URL is ignored.
 * `pageAlternates` is `@hanzo/i18n`'s reciprocal set, `x-default` included.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(pageAlternates().map((item) => [item.hreflang, item.href]));
  return pageAlternates()
    .filter((item) => item.hreflang !== "x-default")
    .map((item) => ({
      url: item.href,
      changeFrequency: "weekly",
      alternates: { languages },
    }));
}
