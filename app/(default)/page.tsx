import { HelpPage } from "../help-page";
import { pageMetadata } from "@/lib/i18n/metadata";

export const metadata = pageMetadata("en");

export default function Page() {
  return <HelpPage locale="en" />;
}
