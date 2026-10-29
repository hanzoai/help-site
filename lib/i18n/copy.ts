import { phrase } from "@hanzo/i18n";

/**
 * Authored English. The string is the catalog key: `messages/<locale>.json`
 * maps it to a translation, and a missing key renders this English.
 * `scripts/check-messages.mjs` reads every `phrase()` call.
 */
export const copy = {
  help: phrase("help"),
  community: phrase("Community"),
  docs: phrase("Docs"),
  language: phrase("Language"),
  heroTitle: phrase("How can we help?"),
  heroSubtitle: phrase("Guides, documentation, and support for all Hanzo AI products."),
  search: phrase("Search the docs at {docs}"),
  gettingStarted: phrase("Getting Started"),
  gettingStartedBody: phrase(
    "Set up your account, get your API key, and make your first request in minutes.",
  ),
  api: phrase("API Reference"),
  apiBody: phrase("Complete reference for the Hanzo AI API. Endpoints, parameters, and examples."),
  dev: phrase("Hanzo Dev"),
  devBody: phrase("Guides for the AI coding agent. IDE setup, commands, and best practices."),
  zen: phrase("Zen Models"),
  zenBody: phrase("Learn about the Zen model family — capabilities, pricing, and usage limits."),
  tutorials: phrase("Tutorials"),
  tutorialsBody: phrase("Step-by-step guides for common use cases and integrations."),
  support: phrase("Support"),
  supportBody: phrase("Open a support ticket or contact the team directly."),
  explore: phrase("Explore"),
  quickLinks: phrase("Quick Links"),
  billing: phrase("API Keys & Billing"),
  status: phrase("Status Page"),
  changelog: phrase("Changelog"),
  openSource: phrase("Open Source"),
  discordCommunity: phrase("Discord Community"),
  blog: phrase("Blog"),
  stillNeedHelp: phrase("Still need help?"),
  stillNeedHelpBody: phrase("Our team is available on Discord and email."),
  discord: phrase("Discord"),
  contactUs: phrase("Contact Us"),
  copyright: phrase("© 2025 Hanzo AI, Inc. Techstars '17."),
  privacy: phrase("Privacy"),
  terms: phrase("Terms"),
  contact: phrase("Contact"),
  socialNav: phrase("Hanzo on social media"),
  title: phrase("Hanzo Help"),
  description: phrase(
    "Get help with Hanzo AI. Guides, documentation, tutorials, and support for all Hanzo products.",
  ),
};
