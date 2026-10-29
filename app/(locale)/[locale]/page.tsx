import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HelpPage } from "../../help-page";
import { isLocale, LOCALE_CODES } from "@/lib/i18n/locales";
import { pageMetadata } from "@/lib/i18n/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALE_CODES.filter((locale) => locale !== "en").map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") return {};
  return pageMetadata(locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <HelpPage locale={locale} />;
}
