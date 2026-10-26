'use client'

import { useEffect, type ReactNode } from 'react'
import { startTags } from '@hanzo/event'
import { AnalyticsProvider, useConsent, usePageview } from '@hanzo/event/react'
import { Consent } from '@hanzo/ui/consent'
import { usePathname } from 'next/navigation'

/** The one Hanzo Cloud telemetry front door: POST api.hanzo.ai/v1/event. */
const HOST = 'https://api.hanzo.ai'

/**
 * This site's project key, cloud project `hanzo-help`. A `pk-` is publishable: it
 * names the project an event is filed under and the tag set cloud serves, and
 * it mints no reader. @hanzo/event derives a key from the host only for the
 * hosts in its SITE_KEY table, and hanzo.help is not one, so it is stated here.
 */
const KEY = 'pk-B4YArKNlP3fjT7EYOCHLsTSRYbraQnTDkXumIxm66gg'

/** The sites one visit can cross; GA4 keeps it one session across them. */
const DOMAINS = [
  'hanzo.ai',
  'docs.hanzo.ai',
  'hanzo.id',
  'hanzo.build',
  'platform.hanzo.ai',
  'hanzo.app',
  'hanzo.chat',
  'pay.hanzo.ai',
]

function Pageview() {
  usePageview(usePathname())
  return null
}

/**
 * The ad tags. `startTags` fetches this site's tag set from cloud (GA4 and the
 * Pixel are configuration there, never ids in this repo) and the consent rule
 * for this visitor's region, and loads only what consent allows.
 */
function Tags() {
  useEffect(() => startTags({ key: KEY, domains: [window.location.hostname, ...DOMAINS] }), [])
  return null
}

/**
 * Telemetry for hanzo.help, mounted once in the root layout, inside <Hanzo> so the
 * banner is themed. The provider owns the one @hanzo/event client: the first
 * pageview, error capture and the unload flush; <Pageview> adds one per route
 * change. The stream runs while the visitor allows analytics, and <Consent> is
 * the one banner that asks.
 */
export function Analytics({ children }: { children: ReactNode }) {
  const consent = useConsent()
  return (
    <AnalyticsProvider config={{ product: 'site', host: HOST, ingestKey: KEY, enabled: consent.analytics }}>
      <Tags />
      <Pageview />
      {children}
      <Consent />
    </AnalyticsProvider>
  )
}
