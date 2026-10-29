#!/usr/bin/env node
/**
 * Fill missing help-center translations. English in `messages/en.json` is the
 * source. Existing translations are kept. Nothing here is a secret: the key
 * is read from the environment and is never written.
 *
 *   HANZO_API_KEY=... pnpm translate
 *   HANZO_API_KEY=... pnpm translate --locale es
 *   pnpm translate --dry-run
 *
 *   HANZO_API_KEY or OPENAI_API_KEY     required, unless --dry-run
 *   HANZO_API_BASE or OPENAI_BASE_URL   default https://api.hanzo.ai/v1
 *   HANZO_TRANSLATE_MODEL               default gpt-4o-mini
 *
 * The endpoint is OpenAI-compatible (`POST /chat/completions`). A key the
 * catalog already holds is not sent again. `--force` retranslates the locale.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "messages");
const args = process.argv.slice(2);
const dry = args.includes("--dry-run");
const force = args.includes("--force");
const only = args.includes("--locale") ? args[args.indexOf("--locale") + 1] : null;

const localeSrc = fs.readFileSync(path.join(root, "lib/i18n/locales.ts"), "utf8");
const list = localeSrc.match(/export const LOCALE_CODES = \[([\s\S]*?)\] as const/);
const locales = [...list[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]).filter((code) => code !== "en");
const names = Object.fromEntries(
  [...localeSrc.matchAll(/"([^"]+)": "([^"]+)"/g)].map((match) => [match[1], match[2]]),
);

const en = JSON.parse(fs.readFileSync(path.join(dir, "en.json"), "utf8"));
const targets = only ? [only] : locales;
if (only && !locales.includes(only)) {
  console.error(`unknown locale ${only}`);
  process.exit(1);
}

const base = (process.env.HANZO_API_BASE || process.env.OPENAI_BASE_URL || "https://api.hanzo.ai/v1").replace(
  /\/$/,
  "",
);
const key = process.env.HANZO_API_KEY || process.env.OPENAI_API_KEY;
const model = process.env.HANZO_TRANSLATE_MODEL || "gpt-4o-mini";

function ordered(catalog) {
  const out = {};
  for (const source of Object.keys(en)) out[source] = catalog[source];
  return out;
}

async function fill(locale, missing) {
  const instructions = [
    `Translate Hanzo Help UI copy into ${names[locale] || locale} (${locale}).`,
    "Return one JSON object. Keys are the English source and must be copied exactly. Values are the translation.",
    "Keep these tokens exactly as written, in Latin script: Hanzo, Hanzo AI, Hanzo Dev, Enso, Kai, Lux, Zoo, Zen, Discord, API, IDE.",
    "Keep {placeholders} unchanged and put them where the sentence reads naturally.",
    "Keep URLs, code, commands, and the legal line's proper names. Do not add markdown.",
    "Write the way a product help center speaks. No English leftovers except the tokens above and words the language itself uses.",
  ].join(" ");

  const response = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        { role: "system", content: instructions },
        { role: "user", content: JSON.stringify(missing) },
      ],
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`${locale}: ${response.status} ${detail.slice(0, 400)}`);
  }
  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content ?? "";
  const json = content.slice(content.indexOf("{"), content.lastIndexOf("}") + 1);
  const parsed = JSON.parse(json);
  return parsed;
}

let pending = 0;
for (const locale of targets) {
  const file = path.join(dir, `${locale}.json`);
  const current = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
  const missing = {};
  for (const source of Object.keys(en)) {
    if (force || typeof current[source] !== "string" || current[source].trim() === "") missing[source] = source;
  }
  const count = Object.keys(missing).length;
  pending += count;
  if (count === 0) {
    console.log(`${locale}: up to date`);
    continue;
  }
  console.log(`${locale}: ${count} string${count === 1 ? "" : "s"}`);
  if (dry) continue;
  if (!key) {
    console.error("Set HANZO_API_KEY or OPENAI_API_KEY (or pass --dry-run).");
    process.exit(1);
  }
  const translated = await fill(locale, missing);
  const next = { ...current };
  for (const source of Object.keys(missing)) {
    const value = translated[source];
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`${locale}: model returned nothing for ${JSON.stringify(source)}`);
    }
    next[source] = value;
  }
  fs.writeFileSync(file, `${JSON.stringify(ordered(next), null, 2)}\n`);
}

if (dry) console.log(pending === 0 ? "nothing to translate" : `${pending} strings would be translated`);
