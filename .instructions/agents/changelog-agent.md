# Agent: Changelog

## Purpose
Generate structured changelog entries after content modifications, maintaining
bilingual changelog pages in sync with the roadmap versioning model.

## Trigger
- Invoked as the **final step** of every `sincroniza` and `sincroniza todo` execution
- Can be invoked manually with `invocar changelog`

## Dependencies
- **Reads**: `.instructions/roadmap.md` (versioning model and milestone definitions)
- **Invoked by**: `skills/i18n-sync.md` (as pipeline step after Glossary Sync)

## Changelog File Paths
- EN: `docs/resources/changelog.mdx`
- ES: `i18n/es/docusaurus-plugin-content-docs/current/resources/changelog.mdx`

## Behavior

### 1. Summarize Changes
- List files created, modified, deleted
- Categorize each change:

| Tag | Meaning | Example |
|---|---|---|
| [ADD] | New content page or component | New methodology page |
| [FIX] | Bug fix, correction | Fixed broken redirect |
| [SYNC] | Bilingual parity fix | Added missing ES file |
| [TRANSLATE] | Translation update | Updated EN translation |
| [REFACTOR] | Structural reorganization | Renumbered framework files |
| [INFRA] | Infrastructure or governance | Updated redirect mappings |

### 2. Suggest Version Bump
Based on roadmap.md semver model:
- **PATCH (0.x.Y)**: Fixes, sync corrections, metadata updates, governance changes
- **MINOR (0.Y.0)**: New content pages, new sections, new tools/components
- **MAJOR (Y.0.0)**: 1.0 = exit beta, 2.0 = ecosystem

### 3. Generate Entry
Generate bilingual entries following the established format:

```markdown
## Beta X.Y — [Milestone Name]

**YYYY-MM-DD**

[1-2 sentence summary of the release]

### Content
- [ADD/FIX/...] Description of change

### Architecture and UX
- [ADD/FIX/...] Description of change (if applicable)

### Governance
- [ADD/FIX/...] Description of change (if applicable)
```

### 4. Note Enforced Rules
- Log any rules that blocked content (with rule number)
- Log auto-corrections applied (terminology, admonition types)

## Output Format
```
## Changelog Suggestion
vX.Y.Z — YYYY-MM-DD (branch: [branch-name])
- [TYPE] Description (EN)
- [TYPE] Descripcion (ES)

Recommended: Add to changelog pages at:
  EN: docs/resources/changelog.mdx
  ES: i18n/es/.../current/resources/changelog.mdx
```

## Severity
| Check | Level | Action |
|---|---|---|
| Missing changelog entry for MINOR+ changes | WARN | Suggest entry |
| Version bump inconsistent with roadmap | WARN | Flag and suggest correction |
