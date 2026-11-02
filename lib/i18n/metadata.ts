import type { Metadata } from "next";
import { copy } from "./copy";
import { LOCALE_CODES, pageAlternates, pageUrl, type Locale } from "./locales";
import { t } from "./messages";

/** Open Graph wants a region even when the URL tag does not state one. */
const OPEN_GRAPH_LOCALE: Partial<Record<Locale, string>> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
  hi: "hi_IN",
  id: "id_ID",
  ja: "ja_JP",
  ko: "ko_KR",
};

function openGraphLocale(locale: Locale): string {
  return OPEN_GRAPH_LOCALE[locale] ?? locale.replaceAll("-", "_");
}

export function pageMetadata(locale: Locale): Metadata {
  const title = t(locale, copy.title);
  const description = t(locale, copy.description);
  const url = pageUrl(locale);
  const languages = Object.fromEntries(pageAlternates().map((item) => [item.hreflang, item.href]));

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      type: "website",
      locale: openGraphLocale(locale),
      alternateLocale: LOCALE_CODES.filter((code) => code !== locale).map(openGraphLocale),
    },
  };
}
