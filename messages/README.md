# Translations

English is the source. Each other file in this directory maps an authored
English sentence to its translation. The sentence is the key, so a missing key
renders that English (`lib/i18n/messages.ts` calls `@hanzo/i18n`'s `translate`).

Product names stay in Latin: Hanzo, Hanzo AI, Hanzo Dev, Enso, Kai, Lux, Zoo,
Zen, Discord. So do `API`, `IDE`, `{placeholders}`, URLs, and commands.

## Add a string

1. Write it in English at the call site with `phrase("…")` from `@hanzo/i18n`.
2. Add the same sentence as a key in `en.json` (the value is the sentence).
3. Translate it into every `messages/<locale>.json`, in the same key order.
4. `pnpm check:i18n` must pass. It checks the build, so a gap does not ship.

## Translate with the API

The script calls an OpenAI-compatible `POST /chat/completions`. The default
base is Hanzo's `https://api.hanzo.ai/v1`. The key is read from the environment
and is not written anywhere.

```bash
HANZO_API_KEY=… pnpm translate                 # fill empty keys, every locale
HANZO_API_KEY=… pnpm translate --locale ja     # one locale
pnpm translate --dry-run                       # list what is missing
```

`HANZO_API_BASE` (or `OPENAI_BASE_URL`) overrides the host.
`HANZO_TRANSLATE_MODEL` overrides the model (default `gpt-4o-mini`).
`OPENAI_API_KEY` is accepted when `HANZO_API_KEY` is unset.
`--force` retranslates a locale even when a string is already filled.

Locales, in URL order: `en` at `/`, then `es`, `fr`, `de`, `it`, `pt-BR`,
`ru`, `tr`, `ar`, `hi`, `id`, `vi`, `th`, `ja`, `ko`, `zh-CN`, `zh-TW`.
Arabic is `dir="rtl"`. There is no long-form article tree in this repo; the
catalogs are the whole page.
