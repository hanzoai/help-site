#!/usr/bin/env node
/**
 * Every authored English sentence has a translation, placeholders survived,
 * and product names stayed in Latin. A missing key still renders English at
 * runtime (`lib/i18n/messages.ts`); this fails the build so a gap is not silent.
 *
 *   node scripts/check-messages.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { translate } from "@hanzo/i18n";

const root = path.resolve(import.meta.dirname, "..");
const messagesDir = path.join(root, "messages");

const localeSrc = fs.readFileSync(path.join(root, "lib/i18n/locales.ts"), "utf8");
const list = localeSrc.match(/export const LOCALE_CODES = \[([\s\S]*?)\] as const/);
if (!list) {
  console.error("check-messages: LOCALE_CODES not found in lib/i18n/locales.ts");
  process.exit(1);
}
const locales = [...list[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
if (!locales.includes("en") || locales[0] !== "en") {
  console.error("check-messages: English must be the first locale");
  process.exit(1);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "messages" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

function phrasesIn(file) {
  const text = fs.readFileSync(file, "utf8");
  const found = [];
  const re = /phrase\(\s*(["'])((?:\\.|(?!\1)[\s\S])*?)\1\s*,?\s*\)/g;
  for (const match of text.matchAll(re)) found.push(match[2]);
  return found;
}

const authored = [...new Set(walk(path.join(root, "app")).concat(walk(path.join(root, "lib"))).flatMap(phrasesIn))];
const en = JSON.parse(fs.readFileSync(path.join(messagesDir, "en.json"), "utf8"));
const enKeys = Object.keys(en);

const errors = [];
const warn = [];

for (const sentence of authored) {
  if (!Object.hasOwn(en, sentence)) errors.push(`en.json is missing authored sentence: ${sentence}`);
  else if (en[sentence] !== sentence) errors.push(`en.json value must equal its key: ${sentence}`);
}
for (const key of enKeys) {
  if (!authored.includes(key)) warn.push(`en.json key is not used by phrase(): ${key}`);
}

/** A legal line or a brand that is the whole label. Loanwords may also match; those are counted below. */
const IDENTICAL_OK = new Set([
  "Hanzo Dev",
  "Discord",
  "© 2025 Hanzo AI, Inc. Techstars '17.",
  "Blog",
]);

const PROTECTED = ["Hanzo", "Zen", "Discord", "API", "IDE"];

const SCRIPT = {
  ar: /\p{Script=Arabic}/u,
  hi: /\p{Script=Devanagari}/u,
  ru: /\p{Script=Cyrillic}/u,
  th: /\p{Script=Thai}/u,
  ja: /\p{Script=Hiragana}|\p{Script=Katakana}|\p{Script=Han}/u,
  ko: /\p{Script=Hangul}/u,
  "zh-CN": /\p{Script=Han}/u,
  "zh-TW": /\p{Script=Han}/u,
};

function placeholders(value) {
  return [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort().join(",");
}

for (const locale of locales) {
  const file = path.join(messagesDir, `${locale}.json`);
  if (!fs.existsSync(file)) {
    errors.push(`missing catalog messages/${locale}.json`);
    continue;
  }
  const catalog = JSON.parse(fs.readFileSync(file, "utf8"));
  if (locale === "en") continue;

  const keys = Object.keys(catalog);
  for (const key of enKeys) {
    if (!Object.hasOwn(catalog, key)) errors.push(`${locale}: missing ${JSON.stringify(key)}`);
    else if (typeof catalog[key] !== "string" || catalog[key].trim() === "") {
      errors.push(`${locale}: empty ${JSON.stringify(key)}`);
    }
  }
  for (const key of keys) {
    if (!Object.hasOwn(en, key)) errors.push(`${locale}: unknown key ${JSON.stringify(key)}`);
  }

  let identical = 0;
  let scriptHits = 0;
  let scriptNeed = 0;
  for (const key of enKeys) {
    const value = catalog[key];
    if (typeof value !== "string") continue;
    if (placeholders(key) !== placeholders(value)) {
      errors.push(`${locale}: placeholders differ for ${JSON.stringify(key)}`);
    }
    for (const token of PROTECTED) {
      const inSource = key.split(token).length - 1;
      const inValue = value.split(token).length - 1;
      if (inSource > 0 && inValue < inSource) {
        errors.push(`${locale}: dropped ${token} from ${JSON.stringify(key)}`);
      }
    }
    if (value === key && !IDENTICAL_OK.has(key)) identical += 1;
    if (value !== key && SCRIPT[locale]) {
      scriptNeed += 1;
      if (SCRIPT[locale].test(value)) scriptHits += 1;
    }
  }
  if (identical > 8) {
    errors.push(`${locale}: ${identical} strings are still English (placeholder catalog)`);
  }
  if (scriptNeed > 0 && scriptHits / scriptNeed < 0.8) {
    errors.push(`${locale}: only ${scriptHits}/${scriptNeed} translations use the ${locale} script`);
  }
}

const es = JSON.parse(fs.readFileSync(path.join(messagesDir, "es.json"), "utf8"));
const sample = "How can we help?";
if (translate({}, sample) !== sample) errors.push("English fallback did not return the source");
if (translate(es, sample) === sample) errors.push("es catalog fell back to English for the hero");
if (translate(es, "Not a real string") !== "Not a real string") {
  errors.push("missing key did not fall back to English");
}

if (warn.length) console.log(warn.map((line) => `warn: ${line}`).join("\n"));
if (errors.length) {
  console.error(errors.map((line) => `error: ${line}`).join("\n"));
  process.exit(1);
}
console.log(`i18n ok: ${authored.length} strings × ${locales.length} locales`);
