import type { ComponentType } from "react";
import { SiBluesky, SiDiscord, SiReddit, SiTiktok } from "@icons-pack/react-simple-icons";
import { Facebook, Github, Instagram, Linkedin, X, Youtube, type BrandProps } from "@hanzo/ui/brands";
import { XStack } from "@hanzo/ui";
import { Link, blank } from "./link";

/**
 * Every channel Hanzo keeps, in the order hanzo.ai's footer and JSON-LD name them
 * (hanzo-inc/app). Both Discord invites in the estate land on the same server;
 * discord.gg/hanzo, which this page once linked, belongs to someone else.
 */
export const socials: { label: string; href: string; icon: ComponentType<BrandProps> }[] = [
  { label: "Discord", href: "https://discord.gg/XthHQQj", icon: SiDiscord },
  { label: "X", href: "https://x.com/hanzoai", icon: X },
  { label: "GitHub", href: "https://github.com/hanzoai", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/company/hanzo-ai", icon: Linkedin },
  { label: "Facebook", href: "https://facebook.com/hanzoinc", icon: Facebook },
  { label: "YouTube", href: "https://youtube.com/@HanzoAI", icon: Youtube },
  { label: "Bluesky", href: "https://bsky.app/profile/hanzoai.bsky.social", icon: SiBluesky },
  { label: "Reddit", href: "https://www.reddit.com/r/HanzoAI/", icon: SiReddit },
  { label: "TikTok", href: "https://www.tiktok.com/@hanzoinc", icon: SiTiktok },
  { label: "Instagram", href: "https://www.instagram.com/hanzoinc", icon: Instagram },
];

/** The channels as a row of marks. The link carries the name; the mark is drawn, not read. */
export const Socials = ({ label }: { label: string }) => (
  <XStack render="nav" aria-label={label} items="center" gap="$3.5" flexWrap="wrap">
    {socials.map(({ label, href, icon: Icon }) => (
      <Link key={label} href={href} {...blank} aria-label={label} display="flex">
        <Icon size={16} aria-hidden />
      </Link>
    ))}
  </XStack>
);
