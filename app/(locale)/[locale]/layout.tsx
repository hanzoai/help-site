import "@hanzo/ui/styles.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Document } from "../../document";
import { isLocale, LOCALE_CODES, type Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  metadataBase: new URL("https://hanzo.help"),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALE_CODES.filter((locale) => locale !== "en").map((locale) => ({ locale }));
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved: Locale = isLocale(locale) && locale !== "en" ? locale : "en";
  return <Document locale={resolved}>{children}</Document>;
}
