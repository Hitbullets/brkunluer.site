<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Critical Next.js 16 Differences

- `params` and `searchParams` props are **Promises** — must be awaited
- Use `PageProps<'/route'>` and `LayoutProps<'/route'>` global type helpers (no imports)
- Use `RouteContext<'/route'>` for Route Handler typing
- Tailwind CSS v4 syntax: `@import "tailwindcss"` + `@theme inline {}` for design tokens
- Fonts: `next/font/google` self-hosts automatically — use `className` not CSS variables for font application
- shadcn/ui works but manually copy component files (no shadcn CLI init)

<!-- END:nextjs-agent-rules -->

# BRKUNLUER.SITE — Project Rules

## General
- `pnpm` ONLY (no npm, no yarn)
- TypeScript strict mode
- Content language: **Turkish** (UI copy, content, SEO)
- Commit messages: conventional commits format (feat:, fix:, chore:, refactor:, docs:)

## Stack
- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind CSS v4, shadcn/ui (manual components)
- Geist font (next/font/google, self-hosted)
- MDX for content (gray-matter + next-mdx-remote)
- Vercel Analytics (free tier)
- Zod for validation

## Architecture Rules
- Server Components by default; Client Components only when needed (state, event handlers, browser APIs)
- No search in V1 — use tag filtering instead
- No auth in V1 — CMS via local MDX files
- Payment layer is placeholder; provider interface defined but not wired
- Newsletter: provider-agnostic abstraction; V1 stores locally
- Design tokens in `app/globals.css` (CSS variables via `@theme inline`)
- Security headers in `next.config.ts`
- Site config in `lib/site.ts` (single source of truth)

## File Structure
```
app/          → routes
components/   → ui/ (shadcn), layout/ (header, footer, container)
lib/          → site.ts, content.ts, types.ts, utils.ts
content/      → articles/, methods/, projects/ (MDX files)
docs/         → project documentation
```

## Before Writing Code
1. Read relevant Next.js docs in `node_modules/next/dist/docs/`
2. Follow existing patterns in the repo
3. Don't add new dependencies — use what's already installed
4. Keep it simple; delete over add

## Never
- Add comments unless critical
- Use emojis in code
- Create placeholder "for later" scaffolding
- Introduce abstractions with single implementations
- Add new dependencies for things stdlib or existing deps can do