# File Structure

```
brkunluer.site/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout (html, body, theme, fonts, providers)
│   ├── page.tsx                 # Homepage
│   ├── not-found.tsx            # 404
│   ├── globals.css              # Tailwind imports + design tokens + animations
│   ├── sitemap.ts               # Dynamic sitemap
│   ├── robots.ts                # robots.txt
│   ├── yazilar/
│   │   ├── page.tsx             # Articles index
│   │   ├── [slug]/page.tsx      # Article detail
│   │   └── etiket/[slug]/       # Tag-filtered index
│   │       └── page.tsx
│   ├── metotlar/
│   │   ├── page.tsx             # Methods index
│   │   └── [slug]/page.tsx      # Method landing page
│   ├── portfolyo/
│   │   ├── page.tsx             # Portfolio index
│   │   └── [slug]/page.tsx      # Project case study
│   ├── hakkinda/
│   │   └── page.tsx             # About
│   ├── iletisim/
│   │   └── page.tsx             # Contact form
│   ├── tesekkurler/
│   │   └── page.tsx             # Thank you page
│   └── api/
│       ├── newsletter/route.ts  # Newsletter subscription
│       ├── contact/route.ts     # Contact form submit
│       └── webhooks/
│           └── payment/route.ts # Payment webhook (placeholder)
├── components/
│   ├── ui/                      # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── label.tsx
│   │   ├── separator.tsx
│   │   └── accordion.tsx
│   ├── layout/                  # Layout shell
│   │   ├── header.tsx           # Nav + theme toggle + mobile menu
│   │   ├── footer.tsx           # Links + social + copyright
│   │   ├── container.tsx        # Max-width wrapper
│   │   └── theme-provider.tsx   # next-themes wrapper
│   ├── cards/                   # Content cards
│   │   ├── article-card.tsx
│   │   ├── method-card.tsx
│   │   └── project-card.tsx
│   ├── forms/                   # Form components
│   │   ├── newsletter-form.tsx
│   │   └── contact-form.tsx
│   ├── mdx/                     # Custom MDX components
│   │   ├── mdx-components.tsx
│   │   ├── callout.tsx
│   │   └── image-frame.tsx
│   └── sections/                # Homepage sections
│       ├── hero.tsx
│       ├── featured-methods.tsx
│       ├── latest-articles.tsx
│       ├── featured-projects.tsx
│       └── newsletter-cta.tsx
├── content/
│   ├── articles/                # MDX files
│   ├── methods/
│   └── projects/
├── lib/                         # Utilities (SERVER only)
│   ├── site.ts                  # Site config (single source of truth)
│   ├── types.ts                 # Content type definitions
│   ├── content.ts               # Content loading + MDX parsing
│   ├── newsletter.ts            # Provider abstraction
│   ├── payment.ts               # Payment abstraction
│   ├── delivery.ts              # Download delivery abstraction
│   ├── analytics.ts             # Analytics abstraction
│   ├── utils.ts                 # cn(), formatDate(), slugify()
│   └── validations.ts           # Zod schemas
├── docs/                        # Project documentation
│   ├── OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── STRUCTURE.md             # This file
│   ├── CHANGELOG.md
│   ├── PROGRESS.md
│   ├── DEVELOPMENT-LOG.md
│   ├── API.md
│   ├── COMPONENTS.md
│   ├── DEPLOYMENT.md
│   ├── TESTING.md
│   ├── KNOWN-ISSUES.md
│   ├── FUTURE.md
│   └── RELEASE-NOTES.md
├── public/
│   ├── images/
│   ├── og/
│   └── fonts/
├── next.config.ts               # Security headers, image config, turbopack
├── tsconfig.json                # TypeScript strict
├── eslint.config.mjs            # ESLint flat config
├── .prettierrc                  # Prettier config
├── .gitignore
├── package.json
└── pnpm-lock.yaml
```