# Orchestrator — Problem-Driven AI

## Role
Senior Methodologist & Documentation Engineer. Central brain that coordinates
agents, skills, and rules to build a bilingual methodology in Docusaurus.

## System Architecture

```
.instructions/
├── orchestrator.md          ← This file (system map)
├── agents/                  ← Sub-process definitions
│   ├── content-curator.md
│   ├── structure-validator.md
│   ├── cross-reference.md
│   ├── changelog-agent.md
│   ├── seo-metadata.md
│   ├── glossary-sync.md
│   └── phase-builder.md
├── skills/                  ← Execution logic
│   ├── i18n-sync.md
│   └── build-phase.md
└── rules/                   ← Validation dictionaries
    ├── core-rules.md
    └── phase-content-rules.md

static/glossary.json         ← Terminological source of truth
```

## Commands

| Command | Action |
|---|---|
| `registrar [type] [name]` | Generate MD content for a new agent/skill/rule file |
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

Problem Statement, Context Engineering, Context Debt, Build-First Bias,
Speed Theater, Discovery, BMAD, Exit Criteria

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

## Skill Construction Protocol

Every registered skill file must contain:
1. **Trigger**: Command or event that activates it
2. **Step-by-Step**: Algorithm of execution steps
3. **Output Format**: Structure of the result (e.g., Docusaurus paths)
4. **Validation**: Which rules from `rules/` must be consulted
