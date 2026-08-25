import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Anchor, Text, XStack, YStack } from "@hanzo/ui";

/**
 * Every link on the page is an `Anchor`. The three below are the three shapes
 * it wears here — running text, a rounded frame, a card — and each was written
 * out by hand at every call site before this file existed: the frame nine
 * times, the text five, the card six.
 */

/**
 * Opening in a new tab and disowning the opener are ONE decision. A `target`
 * without the `rel` leaves the new page holding a live `window.opener` back to
 * this one, so the pair travels together or not at all.
 */
export const blank = { target: "_blank", rel: "noopener noreferrer" } as const;

type Props = ComponentProps<typeof Anchor>;

/** A link in running text. Quiet until pointed at. */
export const Link = (props: Props) => (
  <Anchor
    fontSize="$3"
    color="$soft"
    textDecorationLine="none"
    hoverStyle={{ color: "$color" }}
    {...props}
  />
);

/** A link wearing a button. `solid` is the one that asks to be pressed. */
export const Pill = ({ solid, ...props }: Props & { solid?: boolean }) => (
  <Anchor
    display="flex"
    flexDirection="row"
    alignItems="center"
    gap="$1.5"
    paddingHorizontal="$3"
    paddingVertical="$1.5"
    borderRadius="$10"
    borderWidth={1}
    fontSize="$3"
    fontWeight="500"
    textDecorationLine="none"
    {...(solid
      ? {
          backgroundColor: "$accentBackground",
          borderColor: "$colorTransparent",
          color: "$accentColor",
          hoverStyle: { opacity: 0.9 },
        }
      : {
          backgroundColor: "$panel",
          borderColor: "$borderColor",
          color: "$soft",
          hoverStyle: {
            backgroundColor: "$hover",
            borderColor: "$borderColorHover",
            color: "$color",
          },
        })}
    {...props}
  />
);

/**
 * A category, as a card. `featured` is a SCALE, not a second component: the two
 * at the top get the full frame and an outbound mark, the four below the
 * compact row, and every other decision about them is the same one.
 *
 * The icon sits inside a `Text` because a lucide glyph strokes with
 * `currentColor` — colour the box and the glyph follows, with nothing to keep
 * in step.
 */
export function Topic({
  icon: Icon,
  name,
  description,
  href,
  featured,
}: {
  icon: LucideIcon;
  name: string;
  description: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <Anchor
      href={href}
      {...blank}
      group
      display="flex"
      flexGrow={1}
      flexDirection={featured ? "column" : "row"}
      alignItems={featured ? "stretch" : "flex-start"}
      gap={featured ? "$4" : "$3"}
      padding={featured ? "$5" : "$4"}
      borderRadius="$5"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$panel"
      textDecorationLine="none"
      hoverStyle={{ backgroundColor: "$hover", borderColor: "$borderColorHover" }}
    >
      <XStack alignItems="center" justifyContent="space-between" flexShrink={0}>
        <Text
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={featured ? 40 : 32}
          height={featured ? 40 : 32}
          borderRadius="$3"
          backgroundColor="$raised"
          color="$soft"
          $group-hover={{ color: "$color" }}
        >
          <Icon size={featured ? 20 : 16} />
        </Text>
        {featured && (
          <Text color="$bound" $group-hover={{ color: "$soft" }}>
            <ExternalLink size={16} />
          </Text>
        )}
      </XStack>
      {/* Shrinkable, or the compact row's text runs straight out of the card:
          a flex item's automatic minimum is its content, so it refuses to
          narrow and the words are clipped rather than wrapped. */}
      <YStack gap={featured ? "$1" : "$0.5"} flexShrink={1} minWidth={0}>
        <Text fontSize={featured ? "$6" : "$3"} fontWeight="600" color="$color">
          {name}
        </Text>
        <Text fontSize={featured ? "$3" : "$1"} lineHeight={featured ? "$5" : "$2"} color="$soft">
          {description}
        </Text>
      </YStack>
      {featured && (
        <Text
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap="$1.5"
          marginTop="auto"
          fontSize="$3"
          fontWeight="500"
          color="$soft"
          $group-hover={{ color: "$color" }}
        >
          Explore
          <ArrowRight size={14} />
        </Text>
      )}
    </Anchor>
  );
}
