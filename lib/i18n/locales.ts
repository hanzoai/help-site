import { direction } from "@hanzo/i18n";
import { alternates, type Site } from "@hanzo/i18n/server";

/**
 * English is the source and the default, and it keeps the URL this site already
 * has: `/`. Every other locale is a prefix. `@hanzo/i18n`'s provider repaints one
 * document from the browser's language, which a static export cannot serve as
 * its own addressable page, so catalogs are read at build time and the switcher
 * is a link.
 *
 * Tags are the ones this help center was asked to ship. `direction` still
 * negotiates them (`zh-TW` is traditional and right-to-left is Arabic).
 */
export const LOCALE_CODES = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt-BR",
  "ru",
  "tr",
  "ar",
  "hi",
  "id",
  "vi",
  "th",
  "ja",
  "ko",
  "zh-CN",
  "zh-TW",
] as const;

export type Locale = (typeof LOCALE_CODES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** The name a reader of this language recognises. Never a flag. */
export const ENDONYM: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  "pt-BR": "Português (Brasil)",
  ru: "Русский",
  tr: "Türkçe",
  ar: "العربية",
  hi: "हिन्दी",
  id: "Bahasa Indonesia",
  vi: "Tiếng Việt",
  th: "ไทย",
  ja: "日本語",
  ko: "한국어",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

export const ORIGIN = "https://hanzo.help";

export function isLocale(value: string): value is Locale {
  return (LOCALE_CODES as readonly string[]).includes(value);
}

export function textDirection(locale: Locale): "ltr" | "rtl" {
  return direction(locale);
}

/** English lives at `/`; every other locale is `/<code>/`. */
export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}/`;
}

export function pageUrl(locale: Locale): string {
  const path = localePath(locale);
  return path === "/" ? ORIGIN : `${ORIGIN}${path}`;
}

export const site: Site = {
  origin: ORIGIN,
  locales: LOCALE_CODES,
  url(locale, path) {
    if (locale === DEFAULT_LOCALE) return path ? `${ORIGIN}${path}` : ORIGIN;
    return `${ORIGIN}/${locale}${path}/`;
  },
};

/** Reciprocal hreflang set for the one page, including `x-default`. */
export function pageAlternates() {
  return alternates("/", site);
}
