# Agent: Phase Builder

## Purpose
Build complete phase content (methodology + framework) from a PDF source document,
producing bilingual EN/ES pages that follow established patterns from previous phases.

## Trigger
Invoked via command `construir fase [N] [name]` (e.g., `construir fase 4 AI Build`).

## Behavior

### Stage 1: PDF Analysis
1. Extract full text from the provided PDF
2. Create a content map: identify all sections, subsections, and key concepts
3. Cross-reference with existing methodology pages for the target phase
   (if any exist already, identify what's covered vs gaps)
4. Cross-reference with previous phases (1, 2, 3) to understand established
   page patterns, sidebar labels, and content structure

### Stage 2: Methodology Pages (conceptual audience)
5. Determine which methodology pages to create by analyzing the phase content:
   - Standard pages present in ALL phases: "Why this phase exists",
     "What it is (and isn't)", "Who participates and when"
   - Phase-specific pages unique to this phase's content (e.g., "The Trap",
     "Biases", "Key Questions", "Connection to next phase")
6. Generate ES content first (user's working language), then EN translation
7. Apply content rules from `rules/phase-content-rules.md`:
   - Simple, didactic language with AI-applied examples
   - Sacred terminology preserved
   - Admonitions for anti-patterns, tips, warnings
8. Apply i18n rules from `skills/i18n-sync.md`:
   - EN: relative slugs; ES: absolute slugs with localized prefix
   - Matching sidebar_position, localized tags
   - slugMappings entries for every page with different EN/ES slugs
9. Present ALL methodology pages to human for review

### Stage 3: Human Review Cycle (Methodology)
10. Human reviews content:
    - **APPROVE** → Create commit with methodology pages
    - **REJECT** → Human provides feedback → iterate on specific pages →
      re-present for review → repeat until approved → commit

### Stage 4: Framework Pages (operational audience)
11. Generate 6 standard framework pages (same structure as phases 1-3):
    - Step by Step (sidebar: "Step by Step" / "Paso a Paso")
    - Anatomy (sidebar: "Anatomy" / "Anatomía")
    - Artifacts (sidebar: "Artifacts" / "Artefactos")
    - Gate Review (sidebar: "Gate Review")
    - Anti-patterns (sidebar: "Anti-patterns" / "Anti-patrones")
    - Duration (sidebar: "Duration" / "Duración")
12. Apply content rules with framework-specific guidance:
    - Clear language for mixed audience (designers, developers, business, strategy)
    - Practical examples for technical concepts
    - Tables for structured information
    - Templates and checklists where applicable
13. Apply same i18n rules as Stage 2
14. Present ALL framework pages to human for review

### Stage 5: Human Review Cycle (Framework)
15. Same cycle as Stage 3: APPROVE → commit, REJECT → iterate → commit

### Stage 6: Infrastructure
16. Create `_category_.json` (EN + ES) for the new phase directory
17. Add slugMappings to `docusaurus.config.ts` for all new pages
18. Run `npx docusaurus clear && npx docusaurus build` — verify 0 new errors
19. Verify locale switcher redirects for all new pages

## Dependencies
- Consults: `rules/core-rules.md`, `rules/phase-content-rules.md`
- Invokes: `skills/i18n-sync.md` (for file creation and slug conventions)
- Invokes: `skills/build-phase.md` (for the step-by-step process)
- Invokes agents: Content Curator, Structure Validator, SEO & Metadata

## Output
- Complete set of methodology pages (EN + ES) — committed after human approval
- Complete set of framework pages (EN + ES) — committed after human approval
- Updated `docusaurus.config.ts` with new slugMappings
- Successful build with both locales
