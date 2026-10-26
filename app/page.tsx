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
import type { ComponentProps } from "react";
import { H1, H2, Screen, Separator, Text, XStack, YStack } from "@hanzo/ui";
import { Link, Pill, Topic, blank } from "./link";
import { Socials } from "./socials";

const categories = [
  {
    icon: Zap,
    name: "Getting Started",
    description: "Set up your account, get your API key, and make your first request in minutes.",
    href: "https://docs.hanzo.ai/quickstart",
    featured: true,
  },
  {
    icon: Code,
    name: "API Reference",
    description: "Complete reference for the Hanzo AI API. Endpoints, parameters, and examples.",
    href: "https://docs.hanzo.ai/api",
    featured: true,
  },
  {
    icon: Terminal,
    name: "Hanzo Dev",
    description: "Guides for the AI coding agent. IDE setup, commands, and best practices.",
    href: "https://hanzo.ai/dev",
    featured: false,
  },
  {
    icon: Cpu,
    name: "Zen Models",
    description: "Learn about the Zen model family — capabilities, pricing, and usage limits.",
    href: "https://hanzo.ai/zen",
    featured: false,
  },
  {
    icon: BookOpen,
    name: "Tutorials",
    description: "Step-by-step guides for common use cases and integrations.",
    href: "https://docs.hanzo.ai/tutorials",
    featured: false,
  },
  {
    icon: LifeBuoy,
    name: "Support",
    description: "Open a support ticket or contact the team directly.",
    href: "https://hanzo.ai/contact",
    featured: false,
  },
];

const quickLinks = [
  { label: "API Keys & Billing", href: "https://console.hanzo.ai" },
  { label: "Status Page", href: "https://hanzo.ai/status" },
  { label: "Changelog", href: "https://hanzo.ai/changelog" },
  { label: "Open Source", href: "https://github.com/hanzoai" },
  { label: "Discord Community", href: "https://discord.gg/XthHQQj" },
  { label: "Blog", href: "https://blog.hanzo.ai" },
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

export default function HelpPage() {
  return (
    <Screen>
      <Band
        py="$4"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
        inner={{ flexDirection: "row", items: "center", justify: "space-between" }}
      >
        <Link href="https://hanzo.ai" fontSize="$4" color="$color" hoverStyle={{ opacity: 0.8 }}>
          <Text fontWeight="600">hanzo</Text>
          <Text color="$soft"> / help</Text>
        </Link>
        <XStack items="center" gap="$4">
          <Link href="https://hanzo.ai">hanzo.ai</Link>
          <Link href="https://hanzo.community">Community</Link>
          <Pill href="https://docs.hanzo.ai" {...blank} color="$color">
            <BookOpen size={14} />
            Docs
          </Pill>
        </XStack>
      </Band>

      <Band pt="$11" pb="$10">
        <YStack items="center" gap="$4" mb="$8">
          <H1 fontSize="$10" $md={{ fontSize: "$11" }} fontWeight="700" text="center" color="$color">
            How can we help?
          </H1>
          <Text fontSize="$6" color="$soft" text="center" maxW={560}>
            Guides, documentation, and support for all Hanzo AI products.
          </Text>
          <Text
            display="flex"
            flexDirection="row"
            items="center"
            gap="$2"
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
            Search the docs at
            <Link href="https://docs.hanzo.ai" {...blank} color="$color" fontWeight="500">
              docs.hanzo.ai
            </Link>
            <ExternalLink size={12} />
          </Text>
        </YStack>

        <XStack flexWrap="wrap" gap="$4" mb="$5">
          {categories
            .filter((c) => c.featured)
            .map((cat) => (
              <XStack key={cat.name} grow={1} flexBasis={280}>
                <Topic {...cat} />
              </XStack>
            ))}
        </XStack>

        <XStack flexWrap="wrap" gap="$3" mb="$8">
          {categories
            .filter((c) => !c.featured)
            .map((cat) => (
              <XStack key={cat.name} grow={1} flexBasis={220}>
                <Topic {...cat} />
              </XStack>
            ))}
        </XStack>

        <Separator mb="$6" />

        <H2 fontSize="$1" fontWeight="600" color="$soft" textTransform="uppercase" letterSpacing={1} mb="$4">
          Quick Links
        </H2>
        <XStack flexWrap="wrap" gap="$2">
          {quickLinks.map((link) => (
            <Pill key={link.label} href={link.href} {...blank}>
              {link.label}
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
            <YStack gap="$0.5">
              <Text fontSize="$3" fontWeight="500" color="$color">
                Still need help?
              </Text>
              <Text fontSize="$1" color="$soft">
                Our team is available on Discord and email.
              </Text>
            </YStack>
          </XStack>
          <XStack items="center" gap="$2">
            <Pill href="https://discord.gg/XthHQQj" {...blank} color="$color">
              <MessageCircle size={14} />
              Discord
            </Pill>
            <Pill href="https://hanzo.ai/contact" solid>
              Contact Us
              <ArrowRight size={14} />
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
        <Text fontSize="$3" color="$soft">
          © 2025 Hanzo AI, Inc. Techstars &apos;17.
        </Text>
        <Socials />
        <XStack items="center" gap="$4">
          <Link href="https://hanzo.ai/privacy">Privacy</Link>
          <Link href="https://hanzo.ai/terms">Terms</Link>
          <Link href="https://hanzo.ai/contact">Contact</Link>
        </XStack>
      </Band>
    </Screen>
  );
}
