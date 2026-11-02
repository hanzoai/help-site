import type { ComponentProps } from "react";
import {
  BookOpen,
  Code,
  Cpu,
  LifeBuoy,
  MessageCircle,
  Search,
  Terminal,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { H1, H2, Screen, Separator, Text, XStack, YStack } from "@hanzo/ui";
import { copy } from "@/lib/i18n/copy";
import { ltr, mirror } from "@/lib/i18n/marks";
import type { Locale } from "@/lib/i18n/locales";
import { t } from "@/lib/i18n/messages";
import { Rich } from "@/lib/i18n/rich";
import { Link, Pill, Topic, blank } from "./link";
import { LanguageSwitcher } from "./language";
import { Socials } from "./socials";

const categories = [
  {
    icon: Zap,
    name: copy.gettingStarted,
    description: copy.gettingStartedBody,
    href: "https://docs.hanzo.ai/quickstart",
    featured: true,
  },
  {
    icon: Code,
    name: copy.api,
    description: copy.apiBody,
    href: "https://docs.hanzo.ai/api",
    featured: true,
  },
  {
    icon: Terminal,
    name: copy.dev,
    description: copy.devBody,
    href: "https://hanzo.ai/dev",
    featured: false,
  },
  {
    icon: Cpu,
    name: copy.zen,
    description: copy.zenBody,
    href: "https://hanzo.ai/zen",
    featured: false,
  },
  {
    icon: BookOpen,
    name: copy.tutorials,
    description: copy.tutorialsBody,
    href: "https://docs.hanzo.ai/tutorials",
    featured: false,
  },
  {
    icon: LifeBuoy,
    name: copy.support,
    description: copy.supportBody,
    href: "https://hanzo.ai/contact",
    featured: false,
  },
];

const quickLinks = [
  { label: copy.billing, href: "https://console.hanzo.ai" },
  { label: copy.status, href: "https://hanzo.ai/status" },
  { label: copy.changelog, href: "https://hanzo.ai/changelog" },
  { label: copy.openSource, href: "https://github.com/hanzoai" },
  { label: copy.discordCommunity, href: "https://discord.gg/XthHQQj" },
  { label: copy.blog, href: "https://blog.hanzo.ai" },
];

/** The centred measure the header, the body and the footer all share. */
const MEASURE = 1024;

/**
 * Band — one full-bleed row of the page holding the centred measure. The outer
 * box carries the gutter, the rhythm and the rule, so a hairline runs the width
 * of the window; `inner` lays out the measure. Breakpoints are MIN-width ($md
 * 768), so the base gutter is the phone's and `$md` steps it up.
 */
type Stack = ComponentProps<typeof YStack>;
const Band = ({ inner, children, ...props }: Stack & { inner?: Stack }) => (
  <YStack width="100%" px="$4" $md={{ px: "$5" }} {...props}>
    <YStack width="100%" maxW={MEASURE} mx="auto" {...inner}>
      {children}
    </YStack>
  </YStack>
);

export function HelpPage({ locale }: { locale: Locale }) {
  const say = (source: string) => t(locale, source);
  const explore = say(copy.explore);

  return (
    <Screen>
      <Band
        position="relative"
        z={20}
        py="$4"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
        inner={{
          flexDirection: "row",
          flexWrap: "wrap",
          items: "center",
          justify: "space-between",
          gap: "$3",
        }}
      >
        <Link href="https://hanzo.ai" {...ltr} fontSize="$4" color="$color" hoverStyle={{ opacity: 0.8 }}>
          <Text fontWeight="600">hanzo</Text>
          <Text color="$soft"> / {say(copy.help)}</Text>
        </Link>
        <XStack items="center" gap="$4" flexWrap="wrap">
          <Link href="https://hanzo.ai" {...ltr}>
            hanzo.ai
          </Link>
          <Link href="https://hanzo.community">{say(copy.community)}</Link>
          <Pill href="https://docs.hanzo.ai" {...blank} color="$color">
            <BookOpen size={14} />
            {say(copy.docs)}
          </Pill>
          <LanguageSwitcher locale={locale} />
        </XStack>
      </Band>

      <Band pt="$11" pb="$10">
        <YStack items="center" gap="$4" mb="$8">
          <H1 fontSize="$10" $md={{ fontSize: "$11" }} fontWeight="700" text="center" color="$color">
            {say(copy.heroTitle)}
          </H1>
          <Text fontSize="$6" color="$soft" text="center" maxW={560}>
            {say(copy.heroSubtitle)}
          </Text>
          <Text
            display="flex"
            flexDirection="row"
            items="center"
            flexWrap="wrap"
            gap="$2"
            maxW="100%"
            px="$4"
            py="$2.5"
            rounded="$5"
            borderWidth={1}
            borderColor="$borderColor"
            bg="$panel"
            fontSize="$3"
            color="$soft"
          >
            <Search size={16} />
            <Text shrink={1} minW={0}>
              <Rich
                locale={locale}
                source={copy.search}
                values={{
                  docs: (
                    <Link
                      href="https://docs.hanzo.ai"
                      {...blank}
                      {...ltr}
                      display="inline-flex"
                      flexDirection="row"
                      items="center"
                      gap="$1"
                      color="$color"
                      fontWeight="500"
                    >
                      docs.hanzo.ai
                      <ExternalLink size={12} />
                    </Link>
                  ),
                }}
              />
            </Text>
          </Text>
        </YStack>

        <XStack flexWrap="wrap" gap="$4" mb="$5">
          {categories
            .filter((item) => item.featured)
            .map((item) => (
              <XStack key={item.href} grow={1} flexBasis={280}>
                <Topic
                  icon={item.icon}
                  name={say(item.name)}
                  description={say(item.description)}
                  href={item.href}
                  featured
                  explore={explore}
                />
              </XStack>
            ))}
        </XStack>

        <XStack flexWrap="wrap" gap="$3" mb="$8">
          {categories
            .filter((item) => !item.featured)
            .map((item) => (
              <XStack key={item.href} grow={1} flexBasis={220}>
                <Topic
                  icon={item.icon}
                  name={say(item.name)}
                  description={say(item.description)}
                  href={item.href}
                  explore={explore}
                />
              </XStack>
            ))}
        </XStack>

        <Separator mb="$6" />

        <H2 fontSize="$1" fontWeight="600" color="$soft" textTransform="uppercase" letterSpacing={1} mb="$4">
          {say(copy.quickLinks)}
        </H2>
        <XStack flexWrap="wrap" gap="$2">
          {quickLinks.map((link) => (
            <Pill key={link.href} href={link.href} {...blank}>
              {say(link.label)}
            </Pill>
          ))}
        </XStack>

        <XStack
          mt="$8"
          p="$5"
          rounded="$5"
          borderWidth={1}
          borderColor="$borderColor"
          bg="$panel"
          flexWrap="wrap"
          items="center"
          justify="space-between"
          gap="$4"
        >
          <XStack items="center" gap="$3">
            <Text color="$soft">
              <MessageCircle size={20} />
            </Text>
            <YStack gap="$0.5" shrink={1} minW={0}>
              <Text fontSize="$3" fontWeight="500" color="$color">
                {say(copy.stillNeedHelp)}
              </Text>
              <Text fontSize="$1" color="$soft">
                {say(copy.stillNeedHelpBody)}
              </Text>
            </YStack>
          </XStack>
          <XStack items="center" gap="$2">
            <Pill href="https://discord.gg/XthHQQj" {...blank} color="$color">
              <MessageCircle size={14} />
              {say(copy.discord)}
            </Pill>
            <Pill href="https://hanzo.ai/contact" solid>
              {say(copy.contactUs)}
              <ArrowRight size={14} {...mirror} />
            </Pill>
          </XStack>
        </XStack>
      </Band>

      <Band
        mt="auto"
        py="$5"
        borderTopWidth={1}
        borderTopColor="$borderColor"
        inner={{ flexDirection: "row", flexWrap: "wrap", items: "center", justify: "space-between", gap: "$4" }}
      >
        <Text fontSize="$3" color="$soft" {...ltr}>
          {say(copy.copyright)}
        </Text>
        <Socials label={say(copy.socialNav)} />
        <XStack items="center" gap="$4">
          <Link href="https://hanzo.ai/privacy">{say(copy.privacy)}</Link>
          <Link href="https://hanzo.ai/terms">{say(copy.terms)}</Link>
          <Link href="https://hanzo.ai/contact">{say(copy.contact)}</Link>
        </XStack>
      </Band>
    </Screen>
  );
}
