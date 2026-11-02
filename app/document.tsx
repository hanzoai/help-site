import type { CSSProperties, ReactNode } from "react";
import { Zen } from "@hanzo/font/sans";
import { ZenMono } from "@hanzo/font/mono";
import { Hanzo } from "@hanzo/ui";
import { Analytics } from "./analytics";
import { textDirection, type Locale } from "@/lib/i18n/locales";

/**
 * Zen covers Latin. The families after it are what the browser uses for a
 * script Zen does not draw — Arabic, Devanagari, Thai, and CJK — and they are
 * already on the device, so the export does not ship those faces.
 *
 * `--font-sans` is set on `<body>`, not `<html>`: the root element's own
 * variable is cleared by `@hanzo/appearance` on mount, and the documented
 * `--font-sans-provided` hook loses to an unlayered rule. See AGENTS.md.
 */
const font = {
  "--font-sans": `${Zen.style.fontFamily}, "Segoe UI", Roboto, "Noto Sans", "Noto Sans Arabic", "Noto Naskh Arabic", "Noto Sans Devanagari", "Noto Sans Thai", "Noto Sans SC", "Noto Sans TC", "Noto Sans JP", "Noto Sans KR", "PingFang SC", "PingFang TC", "Hiragino Sans", "Yu Gothic", "Malgun Gothic", sans-serif`,
  "--font-mono": ZenMono.style.fontFamily,
} as CSSProperties;

export function Document({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} dir={textDirection(locale)} suppressHydrationWarning>
      <body style={font}>
        <Hanzo theme="dark">
          <Analytics>{children}</Analytics>
        </Hanzo>
      </body>
    </html>
  );
}
