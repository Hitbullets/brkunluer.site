import Link from "next/link"
import { SiteConfig } from "@/lib/site"
import { Container } from "@/components/layout/container"
import { NewsletterForm } from "@/components/forms/newsletter-form"
import { cn } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks: {
    platform: Array<{ label: string; href: string; comingSoon?: boolean }>
    company: Array<{ label: string; href: string; comingSoon?: boolean }>
    resources: Array<{ label: string; href: string; external?: boolean; comingSoon?: boolean }>
  } = {
    platform: [
      { label: "Yazılar", href: "/yazilar" },
      { label: "AI Factory", href: "/ai-factory" },
      { label: "Portfolyo", href: "/portfolyo" },
      { label: "AI Factory", href: "/ai-factory", comingSoon: true },
    ],
    company: [
      { label: "Hakkımda", href: "/hakkinda" },
      { label: "İletişim", href: "/iletisim" },
    ],
    resources: [
      { label: "GitHub", href: SiteConfig.social.github, external: true },
      { label: "Twitter / X", href: SiteConfig.social.twitter, external: true },
      { label: "LinkedIn", href: SiteConfig.social.linkedin, external: true },
      { label: "RSS Feed", href: "/rss.xml", comingSoon: true },
    ],
  }

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-16 lg:py-24">
        {/* Newsletter Section */}
        <div className="mb-16 rounded-2xl border border-border bg-muted/50 p-8 lg:p-12 text-center">
          <div className="max-w-xl mx-auto">
            <h3 className="text-heading-lg font-semibold tracking-tight">Haftalık AI Workflow Kılavuzları</h3>
            <p className="mt-3 text-body text-muted-foreground">
              Her Pazartesi sabah, pratik AI iş akışları, prompt şablonları ve otomasyon ipuçlarıyla inboxınıza.
            </p>
            <NewsletterForm className="mt-6 max-w-md mx-auto" />
            <p className="mt-3 text-caption text-muted-foreground">
              Spam yok. Sadece değerli içerik. İstediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight mb-4">
              <span className="text-brand-600 dark:text-brand-400">br</span>kunluer
            </Link>
            <p className="text-body-sm text-muted-foreground mb-6">
              {SiteConfig.author.bio}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={SiteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a
                href={SiteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href={SiteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Platform */}
          <nav>
            <h4 className="font-medium mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-body-sm text-muted-foreground hover:text-foreground transition-colors",
                      link.comingSoon && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {link.label}
                    {link.comingSoon && <span className="ml-1 text-xs text-muted-foreground">(yakında)</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav>
            <h4 className="font-medium mb-4">Şirket</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-body-sm text-muted-foreground hover:text-foreground transition-colors",
                      link.comingSoon && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {link.label}
                    {link.comingSoon && <span className="ml-1 text-xs text-muted-foreground">(yakında)</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-body-sm text-muted-foreground">
              &copy; {currentYear} {SiteConfig.name}. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6 text-body-sm text-muted-foreground">
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
