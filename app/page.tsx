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
  { label: "Discord Community", href: "https://discord.gg/hanzo" },
  { label: "Blog", href: "https://blog.hanzo.ai" },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="https://hanzo.ai" className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
            <span className="font-semibold text-base tracking-tight">hanzo</span>
            <span className="text-muted-foreground text-sm">/ help</span>
          </a>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="https://hanzo.ai" className="hover:text-foreground transition-colors">hanzo.ai</a>
            <a href="https://hanzo.community" className="hover:text-foreground transition-colors">Community</a>
            <a
              href="https://docs.hanzo.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-foreground hover:bg-accent transition-all text-sm font-medium"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Docs
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 pt-20 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              How can we help?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Guides, documentation, and support for all Hanzo AI products.
            </p>
            {/* Search hint */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-neutral-900/50 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>Search the docs at</span>
              <a
                href="https://docs.hanzo.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-medium hover:underline flex items-center gap-1"
              >
                docs.hanzo.ai
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Featured categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {categories.filter(c => c.featured).map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.name}
                  href={cat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-4 p-6 rounded-2xl bg-neutral-900/50 border border-border hover:border-white/20 hover:bg-neutral-800/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                      <Icon className="h-5 w-5 text-foreground/80 group-hover:text-foreground transition-colors" />
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-1">{cat.name}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Other categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {categories.filter(c => !c.featured).map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.name}
                  href={cat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-4 rounded-xl bg-neutral-900/30 border border-border/50 hover:border-border hover:bg-neutral-800/40 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-800/60 flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-700/60 transition-colors mt-0.5">
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground mb-0.5">{cat.name}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{cat.description}</div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Quick links */}
          <div className="border-t border-border/50 pt-8">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Quick Links</h3>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-neutral-900/30 text-sm text-muted-foreground hover:text-foreground hover:border-border hover:bg-neutral-800/40 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-neutral-900/40 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium text-foreground">Still need help?</div>
                <div className="text-xs text-muted-foreground">Our team is available on Discord and email.</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://discord.gg/hanzo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-foreground hover:bg-accent transition-all font-medium"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Discord
              </a>
              <a
                href="https://hanzo.ai/contact"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all"
              >
                Contact Us
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© 2025 Hanzo AI, Inc. Techstars &apos;17.</span>
          <div className="flex items-center gap-4">
            <a href="https://hanzo.ai/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="https://hanzo.ai/terms" className="hover:text-foreground transition-colors">Terms</a>
            <a href="https://hanzo.ai/contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
