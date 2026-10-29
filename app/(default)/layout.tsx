import "@hanzo/ui/styles.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Document } from "../document";

export const metadata: Metadata = {
  metadataBase: new URL("https://hanzo.help"),
};

export default function Layout({ children }: { children: ReactNode }) {
  return <Document locale="en">{children}</Document>;
}
