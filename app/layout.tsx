import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Hanzo } from "@hanzo/ui";

export const metadata: Metadata = {
  metadataBase: new URL("https://hanzo.help"),
  title: {
    default: "Hanzo Help",
    template: "%s — Hanzo Help",
  },
  description: "Get help with Hanzo AI. Guides, documentation, tutorials, and support for all Hanzo products.",
};

/**
 * `--font-sans` / `--font-mono` are the one lever — the design tokens, the body
 * and heading rules, and gui's own `--f-family` all read them.
 *
 * On BODY, and both halves of that are measured. The two hooks a page would
 * reach for first are each unusable: `--font-sans-provided` is declared inside
 * `@layer hanzo.font` while a plain `:root { --font-sans: "Zen", … }` is
 * unlayered, and unlayered beats layered whatever the order, so the documented
 * hook is never read; and the root element's own `--font-sans` is owned by
 * @hanzo/appearance, which lists it among the properties it clears on mount —
 * so a value set on `<html>` renders correctly until hydration and then
 * vanishes. `<body>` is managed by neither and cascades to everything drawn.
 *
 * `.style.fontFamily` rather than `.variable`: the face is what is wanted, and
 * next/font emits the @font-face and the preload from the import either way.
 */
const font = {
  "--font-sans": GeistSans.style.fontFamily,
  "--font-mono": GeistMono.style.fontFamily,
} as CSSProperties;

/**
 * `Hanzo` is the whole mount — gui config, stylesheet and root theme — and it
 * styles `body` itself, ground and ink included, so the document carries no
 * classes of its own.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={font}>
        <Hanzo theme="dark">{children}</Hanzo>
      </body>
    </html>
  );
}
