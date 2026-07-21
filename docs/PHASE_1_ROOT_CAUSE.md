# BRKUNLUER.SITE — Root Cause Analysis

## 1. Syntax Corruption (P0)
**Location**: pp/yazilar/page.tsx:41
**Symptom**: Invalid character / Expression expected.
**Cause**: The code href={\/yazilar/etiket/\\} is missing template literal backticks and variable interpolation syntax. It attempts to divide by a path.

## 2. Missing Import (P0)
**Location**: pp/portfolyo/[slug]/page.tsx
**Symptom**: 'ProjectCard' is not defined.
**Cause**: The ProjectCard component exists at components/cards/project-card.tsx but is not imported into the dynamic slug page before being rendered in the "Other Projects" loop.

## 3. Unescaped Entities (P1)
**Location**: pp/page.tsx:109
**Symptom**: 
eact/no-unescaped-entities.
**Cause**: Raw apostrophes/quotes were incorrectly modified in the template string inbox'"'"'Ä±nÄ±za. creating invalid JSX literals.

## 4. Widespread Encoding Mojibake (P1)
**Locations**: 24 files across pp/ and components/.
**Symptom**: Visual corruption of Turkish characters (YazÄ±lar, ÅŸablonlarÄ±, TaÅŸÄ±nmÄ±ÅŸ).
**Cause**: Files were saved or transformed with an incorrect encoding setting (likely ANSI/Latin-1 instead of UTF-8) by a previous process or editor.

## 5. Strict Type & Lint Constraints (P2)
**Locations**: 
ewsletter-form.tsx, input.tsx, 	extarea.tsx, header.tsx, etc.
**Symptoms**: Typescript and ESLint warnings/errors.
**Causes**: 
- FormData cast to ny to access a private _form property.
- Interfaces extending standard types without adding fields.
- Calling setState inside useEffect (React anti-pattern causing cascading renders).
- Leftover unused variables from refactoring.
