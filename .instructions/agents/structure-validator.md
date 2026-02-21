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

## Output
- PASS with checklist confirmation, or
- BLOCK with list of missing sections
