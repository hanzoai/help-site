import { translate } from "@hanzo/i18n";
import en from "../../messages/en.json";
import ar from "../../messages/ar.json";
import de from "../../messages/de.json";
import es from "../../messages/es.json";
import fr from "../../messages/fr.json";
import hi from "../../messages/hi.json";
import id from "../../messages/id.json";
import it from "../../messages/it.json";
import ja from "../../messages/ja.json";
import ko from "../../messages/ko.json";
import ptBR from "../../messages/pt-BR.json";
import ru from "../../messages/ru.json";
import th from "../../messages/th.json";
import tr from "../../messages/tr.json";
import vi from "../../messages/vi.json";
import zhCN from "../../messages/zh-CN.json";
import zhTW from "../../messages/zh-TW.json";
import type { Locale } from "./locales";

/** Every catalog key is an authored English sentence. A locale file must have them all. */
type Catalog = Record<keyof typeof en, string>;

const catalogs = {
  es,
  fr,
  de,
  it,
  "pt-BR": ptBR,
  ru,
  tr,
  ar,
  hi,
  id,
  vi,
  th,
  ja,
  ko,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
} satisfies Record<Exclude<Locale, "en">, Catalog>;

/**
 * The reader's language, or the English source when the catalog has no entry.
 * `@hanzo/i18n`'s `translate` is that fallback: a missing key is the sentence
 * itself, never a blank and never the key's path.
 */
export function t(
  locale: Locale,
  source: string,
  values?: Record<string, string | number>,
): string {
  const messages = locale === "en" ? {} : (catalogs[locale] ?? {});
  return translate(messages, source, values);
}
