# Core Rules — Problem-Driven AI

## Non-Negotiable Rules

These rules are BLOCKING. Content that violates them must be rejected
with a clear error message requesting the missing information.

---

### Rule 1: Exit Criteria Required

- **Applies to**: Every Phase page (`phases/`)
- **Requirement**: Must contain a section `## Exit Criteria` (EN) / `## Criterio de Salida` (ES)
- **Format**: Bulleted list of measurable conditions that must be met before moving to next phase
- **Violation**: BLOCK publication. Request exit criteria from the user.

---

### Rule 2: One Anti-pattern Per Phase

- **Applies to**: Every Phase page (`phases/`)
- **Requirement**: Exactly ONE anti-pattern per phase
- **Format**: Docusaurus admonition
  - EN: `:::danger Anti-pattern: [Name]`
  - ES: `:::danger Anti-patrón: [Name]`
- **Content**: Name + description of the anti-pattern
- **Violation**: BLOCK publication. Request anti-pattern from the user.

---

### Rule 3: Bidirectionality

- **Applies to**: All artifacts and phases
- **Requirement**: Artifacts must link to their phase AND phases must link to their artifacts
- **Verification**: Cross-Reference agent checks both directions
- **Violation**: WARN and auto-suggest missing links.

---

### Rule 4: Sacred Terminology

- **Applies to**: All content in both languages
- **Protected terms** (NEVER translate, even in Spanish docs):
  - Problem Statement
  - Context Engineering
  - Context Debt
  - Build-First Bias
  - Speed Theater
  - Discovery
  - BMAD
  - Exit Criteria
- **Violation**: Auto-correct during translation. Log in changelog.

---

### Rule 5: No Artifact = No Process

- **Applies to**: Every process step in `framework/`
- **Requirement**: Each step must generate a documented deliverable
- **Format**: Artifact card with name, description, and link to phase
- **Violation**: BLOCK. Request artifact definition.

---

### Rule 6: Complete Commercial Quadrant

- **Applies to**: Every page in `commercial/`
- **Requirement**: Must contain all 6 mandatory sections:
  1. Target segment
  2. Value proposition
  3. Pricing model
  4. Delivery format
  5. Success metrics
  6. Upsell path
- **Violation**: BLOCK publication. List missing sections.

---

### Rule 7: Frontmatter Parity

- **Applies to**: Every `.mdx` file pair (EN + ES)
- **Requirement**: `sidebar_position` and `slug` must be IDENTICAL
- **Additional**: `title` and `description` must be translated; `tags` must be localized
- **Violation**: Auto-fix sidebar_position/slug. WARN on missing translations.

---

### Rule 8: Principle Structure

- **Applies to**: Every Principle page (`principles/`)
- **Required sections**:
  1. Blockquote (core statement)
  2. `## Statement` / `## Enunciado`
  3. `## Why it matters` / `## Por qué importa`
  4. `## Practical implications` / `## Implicaciones prácticas`
  5. `:::danger Anti-pattern` / `:::danger Anti-patrón`
  6. `## Connections` / `## Conexiones`
- **Violation**: BLOCK. List missing sections.

---

### Rule 9: Locale Switcher Slug Mapping

- **Applies to**: Every `.mdx` file pair (EN + ES) that has different slugs between locales
- **Requirement**: When a page's EN slug differs from its ES slug, a `slugMappings` entry MUST exist in `createRedirects` inside `docusaurus.config.ts`
- **Context**: Docusaurus locale switcher does a simple URL prefix swap (adds/removes `/es/`). It does NOT resolve doc IDs. Without explicit slug-level redirects, switching locale on any page with a translated slug produces a 404.
- **Format**: Each entry maps the full EN path to the full ES path:
  ```ts
  {en: '/[en-dir]/[en-slug]', es: '/[es-dir]/[es-slug]'}
  ```
  Example: `{en: '/principles/the-problem-is-sacred', es: '/principios/el-problema-es-sagrado'}`
- **When to add**: Every time a new bilingual page is created (during `sincroniza` or manual creation)
- **Verification**: After build, confirm the redirect HTML files exist:
  - `build/es/[en-dir]/[en-slug]/index.html` (for EN→ES switching)
  - `build/[es-dir]/[es-slug]/index.html` (for ES→EN switching)
- **Violation**: BLOCK publication. The locale switcher will 404 for that page. Add the missing `slugMappings` entry and rebuild.

---

## Validation Matrix

| Content Type | Exit Criteria | Anti-pattern | 6 Sections | Bidirectional | Frontmatter | Slug Mapping |
|---|---|---|---|---|---|---|
| Phase | REQUIRED | REQUIRED | — | REQUIRED | REQUIRED | REQUIRED |
| Principle | — | REQUIRED | — | REQUIRED | REQUIRED | REQUIRED |
| Framework | — | — | — | REQUIRED | REQUIRED | REQUIRED |
| Commercial | — | — | REQUIRED | — | REQUIRED | REQUIRED |
| Resource | — | — | — | — | REQUIRED | REQUIRED |
