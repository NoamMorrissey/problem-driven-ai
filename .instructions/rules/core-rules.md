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

### Rule 9: Locale Switcher — Three Levels of Redirect Mapping

- **Applies to**: Every `.mdx` file pair (EN + ES) where the URL path differs between locales
- **Context**: Docusaurus locale switcher does a simple URL prefix swap (adds/removes `/es/`). It does NOT resolve doc IDs. Without explicit redirects at every level, switching locale produces a 404.

**Three mapping levels must ALL be verified:**

#### 9a. Directory-level (`dirMappings`)
- **When**: A directory uses a different URL prefix in ES vs EN (e.g., `/phases/` ↔ `/fases/`)
- **Where**: `dirMappings` array in `createRedirects` inside `docusaurus.config.ts`
- **Ordering rule**: More specific paths MUST come before less specific (e.g., `/framework/fases/` before `/fases/`) because the matching loop uses `break` on first hit.
- **Format**: `{es: '/fases/', en: '/phases/'}`

#### 9b. Index-level (`indexMappings`)
- **When**: A category index page exists at a path that differs between locales (e.g., `/phases` ↔ `/fases`, `/framework/phases` ↔ `/framework/fases`)
- **Where**: `indexMappings` array in `createRedirects`
- **Ordering rule**: Same as 9a — more specific first.
- **Format**: `{es: '/fases', en: '/phases'}`

#### 9c. Page-level (`slugMappings`)
- **When**: A page's slug differs between EN and ES (the most common case)
- **Where**: `slugMappings` array in `createRedirects`
- **Format**: `{en: '/[en-dir]/[en-slug]', es: '/[es-dir]/[es-slug]'}`
- **Special cases that are easy to miss**:
  - Root-level pages with different namespaces (e.g., EN `/manifesto` vs ES `/overview/manifiesto`)
  - Framework section pages (e.g., EN `/framework/processes` vs ES `/framework/procesos`)
  - Pages where only the directory changes but not the slug (still need dirMapping coverage)

**When to add**: Every time a new bilingual page is created (during `sincroniza` or manual creation). This is BLOCKING — without it, the locale switcher will 404 for that page.

---

### Rule 10: Redirect Build Verification (Pre-Commit Gate)

- **Applies to**: Every `sincroniza todo` execution and every pre-commit audit
- **Requirement**: After any content or redirect mapping change, run `npm run build` and verify ALL redirect HTML files exist
- **Verification method**: For EVERY page where EN URL ≠ ES URL, confirm both redirect directions:
  1. `build/es/[en-path]/index.html` exists (EN→ES locale switch)
  2. `build/[es-path-without-locale]/index.html` exists (ES→EN locale switch)
- **Quick audit command**:
  ```bash
  # For each directory with translated prefix, both slug sets must appear:
  ls build/[en-dir]/        # Should contain EN slugs + ES redirect slugs
  ls build/es/[en-dir]/     # Should contain ES slugs + EN redirect slugs
  ```
- **Special attention areas** (historically missed):
  - Root-level pages (manifesto) — not covered by dirMappings
  - Nested index pages (e.g., `/framework/phases`) — need indexMappings
  - New directories — need entries in BOTH `dirMappings` AND `indexMappings`
- **Violation**: BLOCK commit. Fix missing mappings and rebuild before committing.

---

## Validation Matrix

| Content Type | Exit Criteria | Anti-pattern | 6 Sections | Bidirectional | Frontmatter | Redirect Mapping | Build Verify |
|---|---|---|---|---|---|---|---|
| Phase | REQUIRED | REQUIRED | — | REQUIRED | REQUIRED | REQUIRED | REQUIRED |
| Principle | — | REQUIRED | — | REQUIRED | REQUIRED | REQUIRED | REQUIRED |
| Framework | — | — | — | REQUIRED | REQUIRED | REQUIRED | REQUIRED |
| Commercial | — | — | REQUIRED | — | REQUIRED | REQUIRED | REQUIRED |
| Resource | — | — | — | — | REQUIRED | REQUIRED | REQUIRED |
