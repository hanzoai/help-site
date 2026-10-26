# Hanzo Help

## Overview
Hanzo Help — Guides, docs, and support for Hanzo AI. A Next.js static export
(`output: "export"`), one page.

## Tech Stack
- TypeScript, Next 16 (App Router, static export)
- **UI is `@hanzo/ui` on `@hanzo/gui`.** No Tailwind, no Radix, no `cn()`, no
  CSS file of our own. Import from the `@hanzo/ui` root barrel only — reaching
  past it to `@hanzo/gui` resolves a second copy of the runtime.
- `lucide-react` for glyphs (`size` prop, never a class; they stroke
  `currentColor`, so colouring the parent `Text` colours the glyph)

## Build & Run
```bash
pnpm install && pnpm build     # writes out/
```

## Structure
```
app/
  layout.tsx   mounts <Hanzo>, binds the font
  page.tsx     the page; data arrays + composition, Band (full-bleed row + measure)
  analytics.tsx  event client, tag manager, consent banner
  link.tsx     Link / Pill / Topic — the three shapes an Anchor wears here
next.config.ts
```

## What was learned the hard way

**Resolver.** gui renders through react-native-web, so `next.config.ts` must
alias `react-native` → `react-native-web` and put `.web.js` ahead of `.js` in
the extension order (react-native-svg, under the icon set, ships its browser
implementation that way). Both are stated for webpack AND turbopack so `dev`
and `build` resolve identically. `@react-native/assets-registry` is pinned to
**0.86.0** deliberately: 0.87 re-exports from `react-native`, which the alias
sends to react-native-web, and the build warns on every run.

**Tokens are silently dropped.** A style prop naming a token that does not
exist emits NO class — no error, no type failure, just an unstyled element.
`$colorSubtle` cost an hour that way. The real names are `$color`,
`$background`, `$borderColor(+Hover)`, `$accentBackground`/`$accentColor`, and
the surface ladder `$sunken $panel $hover $edge $raised $rim $bound $dim $faint
$soft $quiet $ink`. Muted text is `$soft`. Verify by reading the built CSS: every
`_`-prefixed class in the output must have a rule.

**`color` is not a prop on a stack.** `XStack`/`YStack` reject it; `Text` owns
it. Wrap, don't guess.

**Breakpoints are MIN-width** — `$sm` 640, `$md` 768, `$lg` 1024 — so write
mobile-first: the base is the phone's value and `$md` steps it up. `Section`'s
own source comment claims max-width; the shipped CSS disagrees and the shipped
CSS is what renders. A `$md` object passed to a component REPLACES that
component's own rather than merging, which is how `Section`'s rhythm is
overridden.

**The font hooks do not work as documented.** `--font-sans-provided` lives
inside `@layer hanzo.font` and loses to an unlayered `:root{--font-sans:"Zen"}`;
the root element's `--font-sans` is owned by `@hanzo/appearance`, which clears
it on mount. Set it on `<body>` — managed by neither. "Zen" ships no
`@font-face` here, so without this the page renders system-ui.

**Verify in a browser, not in the markup.** The static export carries gui's
SSR-extracted styles in an inline `<style>`, so it is fully styled with JS off —
but only a real render catches a card whose text runs out of its frame.

## Analytics and deploy

- `app/analytics.tsx` is the docs.hanzo.ai pattern: `@hanzo/event`'s provider
  sends the pageview to `POST api.hanzo.ai/v1/event` with this site's own
  publishable key (cloud project `hanzo-help`), `startTags` loads GA4 and the Meta
  pixel from cloud (`GET /v1/project/tags`) once the visitor consents, and
  `@hanzo/ui/consent` is the banner. No tag id lives in this repo; the key is
  stated because @hanzo/event's SITE_KEY table does not list hanzo.help.
- `@hanzo/ui/styles.css` is imported in the layout. Without it the export ships
  the atomic classes and none of the base sheet, and the page renders unstyled.
- `@hanzo/ui` types against the v5 shorthands (`items`, `justify`, `px`, `bg`,
  `rounded`, `maxW` …); a longhand is a type error, though it still renders.
- `pnpm-workspace.yaml` overrides hold one `@hanzo/gui` and one `@hanzo/event`
  in the tree. Two guis are two configs; two event clients are two consent stores.
- Deploy: push to main. `.github/workflows/cicd.yml` runs hanzoai/ci, which
  type-checks, builds `out/` and publishes it as Sites project `hanzo-help`
  (`s3://hanzo-sites/hanzo/hanzo-help`, live at `hanzo-help.hanzo.app`).
- `app/socials.tsx` is every Hanzo channel, the set hanzo.ai's footer and JSON-LD
  name, drawn in the footer as marks with accessible names. Discord is
  discord.gg/XthHQQj; discord.gg/hanzo is another server.
