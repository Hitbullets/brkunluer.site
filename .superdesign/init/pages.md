# Temel Sayfaların Bağımlılık Ağaçları

## / — Ana sayfa

Entry: `app/page.tsx`

Dependencies:
- components/layout/container.tsx
  - lib/utils.ts
- components/ui/badge.tsx
  - lib/utils.ts
- components/ui/button.tsx
  - lib/utils.ts
- components/cards/article-card.tsx
  - components/ui/image-wrapper.tsx
  - components/ui/badge.tsx
  - components/ui/card.tsx
  - lib/utils.ts
  - lib/types.ts
- components/forms/newsletter-form.tsx
  - components/ui/button.tsx
  - components/ui/input.tsx
  - lib/validations.ts
  - lib/utils.ts
- components/ui/scroll-reveal.tsx
  - lib/utils.ts
- lib/content.ts
  - lib/types.ts

## /portfolyo

Entry: `app/portfolyo/page.tsx`

Dependencies:
- components/layout/container.tsx
- components/layout/hero.tsx
  - components/ui/button.tsx
  - lib/utils.ts
- components/cards/project-card.tsx
  - components/ui/image-wrapper.tsx
  - components/ui/badge.tsx
  - components/ui/card.tsx
  - lib/types.ts
- lib/content.ts

## /portfolyo/[slug]

Entry: `app/portfolyo/[slug]/page.tsx`

Dependencies:
- components/layout/container.tsx
- components/cards/project-detail.tsx
  - components/ui/separator.tsx
  - components/ui/badge.tsx
  - components/ui/button.tsx
  - components/mdx/mdx-renderer-rsc.tsx
  - components/gallery/image-gallery.tsx
  - lib/types.ts
- components/ui/button.tsx
- lib/content.ts

## /yazilar

Entry: `app/yazilar/page.tsx`

Dependencies:
- components/layout/container.tsx
- components/cards/article-card.tsx
  - components/ui/image-wrapper.tsx
  - components/ui/badge.tsx
  - components/ui/card.tsx
  - lib/types.ts
- components/ui/section-header.tsx
  - components/ui/button.tsx
  - lib/utils.ts
- components/ui/badge.tsx
- components/ui/button.tsx
- lib/content.ts

## /yazilar/[slug]

Entry: `app/yazilar/[slug]/page.tsx`

Dependencies:
- components/layout/container.tsx
- components/cards/article-detail.tsx
  - components/mdx/mdx-renderer-rsc.tsx
  - components/ui/separator.tsx
  - components/ui/badge.tsx
  - components/ui/button.tsx
  - components/layout/reading-progress.tsx
  - components/cards/article-share.tsx
  - lib/reading-time.ts
  - lib/site.ts
- components/cards/article-card.tsx
- components/ui/section-header.tsx
- components/layout/json-ld.tsx
- lib/content.ts

## /ai-factory

Entry: `app/ai-factory/page.tsx`

Dependencies:
- components/layout/container.tsx
- components/ui/badge.tsx
- components/ui/button.tsx
- components/ui/scroll-reveal.tsx
- lib/content.ts

## /ai-factory/[slug]

Entry: `app/ai-factory/[slug]/page.tsx`

Dependencies:
- components/layout/container.tsx
- components/cards/method-detail.tsx
  - components/ui/badge.tsx
  - components/ui/accordion.tsx
  - components/ui/button.tsx
  - components/mdx/mdx-renderer-rsc.tsx
  - lib/types.ts
- lib/content.ts

## /metotlar

Entry: `app/metotlar/page.tsx`

Dependencies:
- components/layout/container.tsx
- components/cards/method-card.tsx
  - components/ui/image-wrapper.tsx
  - components/ui/badge.tsx
  - components/ui/card.tsx
  - lib/types.ts
- components/ui/section-header.tsx
- lib/content.ts

## /hakkinda

Entry: `app/hakkinda/page.tsx`

Dependencies:
- components/layout/container.tsx
- components/layout/hero.tsx
- components/ui/card.tsx
- components/ui/button.tsx
- lib/site.ts

## /iletisim

Entry: `app/iletisim/page.tsx`

Dependencies:
- components/layout/container.tsx
- components/layout/hero.tsx
- components/ui/card.tsx
- components/forms/contact-form.tsx
  - components/ui/button.tsx
  - components/ui/input.tsx
  - components/ui/textarea.tsx
  - components/ui/label.tsx
  - lib/validations.ts
  - lib/utils.ts
