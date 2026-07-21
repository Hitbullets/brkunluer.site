# BRKUNLUER.SITE — Project Overview

**Domain:** [brkunluer.site](https://brkunluer.site)
**Type:** Personal brand + knowledge hub + product store
**Owner:** Burak Ünlüer — AI Product Builder • Workflow Designer • Digital Product Creator
**Language:** Turkish (UI, content, SEO)

## Vision

The central platform for a personal brand built around AI workflows, creative systems, methodologies, digital products, portfolio, and community.

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4 | `@theme inline {}` design tokens |
| UI | shadcn/ui (manual) | Radix primitives |
| Font | Geist (`next/font/google`) | Self-hosted |
| Content | MDX-in-repo | gray-matter + next-mdx-remote |
| Analytics | Vercel Analytics (free) | Abstracted |
| Validation | Zod | Runtime guards |

## Content Types

| Type | Index Route | Slug Route | Count (V1) |
|---|---|---|---|
| Articles | `/yazilar` | `/yazilar/[slug]` | 6-8 |
| Methods | `/metotlar` | `/metotlar/[slug]` | 2-3 |
| Projects | `/portfolyo` | `/portfolyo/[slug]` | 4-6 |

## Product Categories

1. AI Factory System
2. Prompt Engineering Kit
3. AI Workflow Templates

## Key Decisions

- **MDX over CMS:** $0 cost, Git versioned, no infra overhead. CMS migration path preserved but deferred.
- **No search in V1:** Tag filtering (`/yazilar/etiket/[slug]`) for content discovery.
- **Product placeholder:** Payment interface defined but not wired; Lemon Squeezy when products are ready.
- **Abstracted integrations:** Newsletter, analytics, payments all behind interface/pattern — swap providers without rewrite.

## Environment

- **Build:** `pnpm build`
- **Dev:** `pnpm dev`
- **CI:** TypeScript strict + ESLint + build smoke test