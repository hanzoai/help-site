import { Text, YStack } from "@hanzo/ui";
import { copy } from "@/lib/i18n/copy";
import { ENDONYM, LOCALE_CODES, localePath, type Locale } from "@/lib/i18n/locales";
import { t } from "@/lib/i18n/messages";
import { Link } from "./link";

/**
 * A disclosure, not a script. The summary is the language of this page; the
 * list is links, so it works with JavaScript off and each choice is a real URL.
 * The menu is taken out of flow so opening it does not shove the header apart.
 */
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const label = t(locale, copy.language);
  return (
    <YStack render="details" position="relative">
      <Text render="summary" fontSize="$3" color="$soft" cursor="pointer" aria-label={label}>
        {ENDONYM[locale]}
      </Text>
      <YStack
        render="nav"
        aria-label={label}
        position="absolute"
        t="100%"
        z={30}
        mt="$2"
        p="$3"
        gap="$2"
        bg="$panel"
        borderWidth={1}
        borderColor="$borderColor"
        rounded="$4"
        maxH={320}
        style={{ insetInlineEnd: 0, overflow: "auto", minWidth: 200 }}
      >
        {LOCALE_CODES.map((code) => (
          <Link
            key={code}
            href={localePath(code)}
            aria-current={code === locale ? "page" : undefined}
            fontWeight={code === locale ? "600" : "400"}
            color={code === locale ? "$color" : "$soft"}
          >
            <span lang={code}>{ENDONYM[code]}</span>
          </Link>
        ))}
      </YStack>
    </YStack>
  );
}
