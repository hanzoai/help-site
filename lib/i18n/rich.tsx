import { Fragment, type ReactNode } from "react";
import { isolate, pieces } from "@hanzo/i18n";
import { textDirection, type Locale } from "./locales";
import { t } from "./messages";

/**
 * One sentence with a link or other element where the translation places
 * `{name}`. Splitting the sentence in the component would freeze English word
 * order. In Arabic the element is isolated so a hostname keeps its own order.
 */
export function Rich({
  locale,
  source,
  values = {},
}: {
  locale: Locale;
  source: string;
  values?: Record<string, ReactNode>;
}) {
  const rtl = textDirection(locale) === "rtl";
  const messages = locale === "en" ? {} : { [source]: t(locale, source) };

  return pieces(messages, source).map((piece, index) => {
    if (typeof piece === "string") return <Fragment key={index}>{piece}</Fragment>;
    const value = values[piece.name];
    if (value == null) return <Fragment key={index}>{`{${piece.name}}`}</Fragment>;
    if (typeof value === "string" || typeof value === "number") {
      return <Fragment key={index}>{rtl ? isolate(String(value)) : value}</Fragment>;
    }
    return rtl ? <bdi key={index}>{value}</bdi> : <Fragment key={index}>{value}</Fragment>;
  });
}
