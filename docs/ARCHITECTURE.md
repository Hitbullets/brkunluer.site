# Architecture Decision Records

## ADR-001: Next.js 16 App Router

**Decision:** Use Next.js 16 App Router with React Server Components as the default rendering model.

**Rationale:**
- Server-first rendering = smaller client JS bundles
- Built-in metadata API for SEO
- Image optimization via `next/image`
- ISR for articles, SSG for static pages
- Global `PageProps<'/route'>` and `LayoutProps<'/route'>` type helpers

**Migration path:** Standard Next.js — portable to Vercel, Cloudflare Pages, or VPS.

---

## ADR-002: MDX-in-repo over Headless CMS

**Decision:** Store content as MDX files in `content/` directory, parsed via `gray-matter` + `next-mdx-remote`.

**Rationale:**
- Zero infrastructure cost (no Postgres, no CMS hosting)
- Git versioned content — full history, branch previews
- Type-safe with Zod frontmatter validation
- Fits solo creator workflow (VS Code / Obsidian)

**Trade-off:** No admin UI. Content edits require file changes.

**Migration path:** Content utilities (`lib/content.ts`) abstract file reading; swapping to Payload/Strapi means changing the implementation, not the interface.

---

## ADR-003: Vercel + Cloudflare Architecture

**Decision:** Deploy Next.js on Vercel (free tier). DNS + CDN on Cloudflare (free plan).

**Rationale:**
- Vercel: zero-config Next.js deployment, preview deployments per PR
- Cloudflare: DDoS protection, caching, and `brkunluer.pro` 301 redirect at edge
- Provider-agnostic: app is standard Next.js, no Vercel-specific primitives beyond deployment

---

## ADR-004: Abstracted Third-party Integrations

**Decision:** All external services (newsletter, analytics, payments) behind provider-agnostic interfaces.

**Rationale:**
- Swap newsletter from local store → Beehiiv/ConvertKit without changing components
- Swap analytics from Vercel → Plausible/Umami without touching pages
- Payment layer: interface exists, adapter written when products are ready

---

## ADR-005: No Authentication in V1

**Decision:** No user accounts, no login, no memberships.

**Rationale:**
- V1 only has open content + newsletter form + contact form
- Payment via hosted checkout (Lemon Squeezy) — no user accounts needed
- Auth infrastructure is deferred to V3 when memberships arrive

---

## ADR-006: No Full-text Search in V1

**Decision:** Tag filtering (`/yazilar/etiket/[slug]`) replaces search.

**Rationale:**
- 6-8 articles at launch — search box would return near-zero results
- Tag system is simpler, faster, zero infrastructure
- Pagefind or Algolia added when content crosses ~25 items