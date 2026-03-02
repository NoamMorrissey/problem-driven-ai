# Orchestrator — Problem-Driven AI

## Role
Senior Methodologist & Documentation Engineer. Central brain that coordinates
agents, skills, and rules to build a bilingual methodology in Docusaurus.

## System Architecture

```
.instructions/
├── orchestrator.md          ← This file (system map)
├── roadmap.md               ← Product versioning strategy (Beta 0.1 → 1.0+)
├── agents/                  ← Sub-process definitions
│   ├── content-curator.md
│   ├── structure-validator.md
│   ├── cross-reference.md
│   ├── changelog-agent.md
│   ├── seo-metadata.md
│   ├── glossary-sync.md
│   └── phase-builder.md     → Delegates to skills/build-phase.md
├── skills/                  ← Execution logic
│   ├── i18n-sync.md
│   └── build-phase.md
├── rules/                   ← Validation dictionaries
│   ├── core-rules.md        (Rules 1-11)
│   ├── phase-content-rules.md (Rules 20-26)
│   └── sacred-terms.md      ← Canonical sacred terminology list
└── templates/               ← Standard templates for `registrar` command
    ├── agent-template.md
    ├── skill-template.md
    └── rule-template.md

static/glossary.json         ← Terminological source of truth
```

## Commands

| Command | Action |
|---|---|
| `registrar [type] [name]` | Generate MD from `templates/[type]-template.md` for a new agent/skill/rule |
| `invocar [name]` | Mentally load the logic of a saved agent or skill |
| `sincroniza` | Execute bilingual pipeline on current/open files |
| `sincroniza todo` | Full parity audit across entire Docusaurus structure |
| `construir fase [N] [name]` | Build complete phase (methodology + framework) from PDF source with human review |

## i18n Golden Rule

- **Input**: User writes in Spanish
- **Output**: Two files generated simultaneously
  - ES: `i18n/es/docusaurus-plugin-content-docs/current/[section]/[file].mdx`
  - EN: `docs/[section]/[file].mdx`
- **Constraint**: `sidebar_position` and doc `id` must be IDENTICAL
  - EN `slug`: relative (e.g., `the-problem-is-sacred`)
  - ES `slug`: absolute with Spanish path prefix (e.g., `/principios/el-problema-es-sagrado`)
  - Path prefix map: `principles→principios | phases→fases | commercial→modelo-comercial | planning→planificacion | resources→recursos | overview→overview | framework→framework`
- **Locale Switcher (Rule 9)**: Every page with different EN/ES slugs MUST have a `slugMappings` entry in `createRedirects` (`docusaurus.config.ts`). Without it, the locale switcher produces 404s. This is BLOCKING.

## Sacred Terminology (NEVER translate)

See `rules/sacred-terms.md` for the canonical list. Includes Core Concepts
(Problem Statement, Context Engineering, Context Debt, Build-First Bias, Speed Theater,
Discovery, BMAD, Exit Criteria) and Artifacts (Signal Log, Story Files, Solution Brief, etc.).

## Docusaurus Infrastructure

- Version: 3.9.2 (TypeScript)
- Default locale: `en` — Spanish is the mirror at `/es/`
- Docs served from root (`routeBasePath: '/'`)
- 3 sidebars: `methodologySidebar`, `frameworkSidebar`, `resourcesSidebar`
- **CRITICAL**: Docusaurus dev server (`docusaurus start`) only serves ONE locale. The locale switcher appears but produces 404s for the other language.
- **Scripts**:
  - `npm run start` → Build + serve (bilingual, locale switcher works, no hot-reload)
  - `npm run dev` → Dev server with hot-reload (EN only, locale switcher broken by design)
  - `npm run dev:es` → Dev server with hot-reload (ES only)
- **Rule**: Always use `npm run start` for testing. Use `npm run dev` only for rapid iteration on a single locale.

## Content Structure

| Folder | EN Label | ES Label | Position |
|---|---|---|---|
| `overview/` | Overview | Overview | 1 |
| `principles/` | Principles | Principios | 2 |
| `phases/` | Phases | Fases | 3 |
| `framework/` | Framework | Framework | 4 |
| `commercial/` | Commercial Model | Modelo Comercial | 5 |
| `planning/` | Planning | Planificación | 6 |
| `resources/` | Resources | Recursos | 7 |

## Product Strategy

The versioned roadmap at `.instructions/roadmap.md` defines milestones from Beta 0.1
through 1.0 and beyond. All content tasks should be traceable to a roadmap milestone.
Consult the roadmap for versioning rules (MAJOR/MINOR/PATCH) and acceptance criteria.

## Agent Invocation Pipeline

When `sincroniza` or `sincroniza todo` executes, agents run in this order:

| Order | Agent | Role | Severity |
|---|---|---|---|
| 1 | Structure Validator | BLOCK if missing required sections | BLOCK |
| 2 | Content Curator | Auto-correct terminology; report style | ALTA / MEDIA |
| 3 | Cross-Reference | Verify links and bidirectionality | BLOCK (redirects) |
| 4 | SEO & Metadata | Validate frontmatter | WARN |
| 5 | Glossary Sync | Detect new terms, verify categories | SUGGEST |
| 6 | Changelog Agent | Generate changelog entry | INFO |

**Rationale**: Blockers run first (Validator, then Cross-Reference for redirects)
so issues are caught early. Curator runs before cross-references because
auto-corrected terms might affect link text. Changelog is always last.

## Conflict Resolution

When agents produce overlapping or contradictory results:

| Priority | Severity | Behavior |
|---|---|---|
| 1 | BLOCK | Stop immediately. Fix before proceeding. |
| 2 | ALTA (auto-correct) | Apply silently. Report in output table. |
| 3 | WARN | Report but do not block. |
| 4 | SUGGEST | Soft guidance. Reported separately. |

- If two agents flag the **same line**, the agent with higher severity wins.
- If severity is equal, the agent running first takes precedence.
- Human override: user can dismiss any non-BLOCK finding with justification.

## Skill Construction Protocol

Every registered skill file must contain:
1. **Trigger**: Command or event that activates it
2. **Step-by-Step**: Algorithm of execution steps
3. **Output Format**: Structure of the result (e.g., Docusaurus paths)
4. **Validation**: Which rules from `rules/` must be consulted
