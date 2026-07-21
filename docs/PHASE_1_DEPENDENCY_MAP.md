# BRKUNLUER.SITE — Error Dependency Map

| Root Error | Affected File(s) | Downstream Symptoms | Blocks |
| :--- | :--- | :--- | :--- |
| **Malformed JSX Expression** | pp/yazilar/page.tsx | TS parser crash, Invalid character, Unexpected token | **Entire Build**, TypeScript check |
| **Missing Import** | pp/portfolyo/[slug]/page.tsx | Lint error: ProjectCard is not defined | Build completion |
| **Unescaped Quotes** | pp/page.tsx | Lint error: 
eact/no-unescaped-entities | Build completion |
| **Encoding Mojibake** | ~24 files across project | Corrupted UI text, corrupted metadata, broken tag filtering (/yazilar/etiket/[slug]) | Runtime usability, SEO, accessibility |
| **Empty Interfaces** | input.tsx, 	extarea.tsx | TS error: @typescript-eslint/no-empty-object-type | Build compilation |
| **Explicit 'any' type** | 
ewsletter-form.tsx | TS error: @typescript-eslint/no-explicit-any | Strict TypeScript check |
| **setState in useEffect**| header.tsx | Lint error: 
eact-hooks/set-state-in-effect | Rendering performance |
