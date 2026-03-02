# Agent: Phase Builder

## Purpose
Build complete phase content (methodology + framework) from a PDF source document,
producing bilingual EN/ES pages that follow established patterns.

## Trigger
`construir fase [N] [name]` (e.g., `construir fase 4 AI Build`)

## Delegates to
**`skills/build-phase.md`** — Contains the full step-by-step execution logic
(PDF extraction, content generation, infrastructure setup, human review cycles).

This agent acts as the entry point and coordinator. All execution details
are defined in the skill file to avoid duplication.

## Dependencies
- **Consults**: `rules/core-rules.md` (Rules 1-4, 7, 9, 10), `rules/phase-content-rules.md` (Rules 20-26)
- **Invokes skill**: `skills/build-phase.md` (full execution pipeline)
- **Invokes agents**: Content Curator, Structure Validator, SEO & Metadata

## Output
- Complete set of methodology pages (EN + ES) — committed after human approval
- Complete set of framework pages (EN + ES) — committed after human approval
- Updated `docusaurus.config.ts` with new slugMappings
- Successful build with both locales

## Severity
| Check | Level | Action |
|---|---|---|
| Missing standard pages | BLOCK | Cannot proceed without Why, What, Who, Connection |
| Missing framework pages | BLOCK | All 6 pages required per Rule 23 |
| Human review not completed | BLOCK | No auto-commit (Rule 25) |
| Preview not served | BLOCK | Must build + serve before review (Rule 26) |
