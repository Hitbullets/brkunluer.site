# BRKUNLUER.SITE — Prioritized Fix Plan

This plan organizes fixes into safe, isolatable batches for Phase 3 Implementation.

## Batch 1: Build Blockers (P0)
**Owner**: Frontend Agent
1. **Fix pp/yazilar/page.tsx**: Correct line 41 href={\/yazilar/etiket/\\} to href={\/yazilar/etiket/\\}.
2. **Fix pp/portfolyo/[slug]/page.tsx**: Add import { ProjectCard } from '@/components/cards/project-card' at the top.
3. **Fix pp/page.tsx**: Correct the unescaped entities at line 109 to use proper HTML entities (e.g. inbox&apos;Ä±nÄ±za.).

## Batch 2: Typing & Strict Lint Rules (P1)
**Owner**: QA Agent
1. **Fix Empty Interfaces**: Remove export interface InputProps extends ... {} and use 	ype InputProps = React.InputHTMLAttributes<HTMLInputElement> in both input.tsx and 	extarea.tsx.
2. **Fix Explicit Any**: Refactor (formData as any)._form in 
ewsletter-form.tsx to safely reset the form event target.
3. **Fix useEffect Anti-Pattern**: Remove setMounted(true) from the header.tsx useEffect and initialize properly for SSR hydration, or suppress if intentionally used for client-only rendering check.
4. **Fix Image Tags**: Convert <img> to <Image> in rticle-detail.tsx.
5. **Clean Unused Imports**: Remove flagged unused imports across pp/page.tsx, header.tsx, mdx-components.tsx, etc.

## Batch 3: Systemic Mojibake Remediation (P1)
**Owner**: Frontend Agent
1. Perform a project-wide find-and-replace to restore Turkish characters from their UTF-8 corrupted strings.
   - Example mappings: Ä± → ı, ÅŸ → ş, Ã¼ → ü, ÄŸ → ğ, Ã§ → ç, Ã¶ → ö, Ä° → İ.
2. Ensure files are saved with strict UTF-8 encoding without BOM.
