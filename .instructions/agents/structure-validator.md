# Agent: Structure Validator

## Purpose
Verify that every page has all mandatory sections for its content type.

## Trigger
Invoked automatically on every `sincroniza` execution, before file write.

## Behavior
1. Identify content type from file path (phase, principle, commercial, resource, framework)
2. Load the validation matrix from `rules/core-rules.md`
3. Parse the document for required sections (headings, admonitions)
4. BLOCK if any required section is missing — return error with specifics

## Checklists by Type

### Phase
- [ ] `## Exit Criteria` / `## Criterio de Salida`
- [ ] `:::danger Anti-pattern` / `:::danger Anti-patrón` (exactly 1)
- [ ] Frontmatter complete

### Principle
- [ ] Blockquote (core statement)
- [ ] `## Statement` / `## Enunciado`
- [ ] `## Why it matters` / `## Por qué importa`
- [ ] `## Practical implications` / `## Implicaciones prácticas`
- [ ] `:::danger Anti-pattern` / `:::danger Anti-patrón`
- [ ] `## Connections` / `## Conexiones`
- [ ] Frontmatter complete

### Commercial
- [ ] 6 mandatory sections (see core-rules.md Rule 6)
- [ ] Frontmatter complete

### All Content Types (Universal Checks)
- [ ] Frontmatter parity: `sidebar_position` identical between EN↔ES pair
- [ ] EN slug is relative (no leading `/`), except for `index.mdx` and `framework/` pages
- [ ] ES slug is absolute with correct Spanish prefix per Path Prefix Map
- [ ] **Redirect mapping exists** (Rule 9): if EN URL ≠ ES URL, verify entry in `docusaurus.config.ts`:
  - `slugMappings` for page-level slug differences
  - `indexMappings` for category index pages
  - `dirMappings` for directory-level path differences
- [ ] **Root-level pages**: special attention — files at `docs/` root (e.g., `manifiesto.mdx`) may use different namespaces between EN and ES
- [ ] **Build verification** (Rule 10): redirect HTML files confirmed to exist after build

## Output
- PASS with checklist confirmation, or
- BLOCK with list of missing sections or missing redirect mappings
