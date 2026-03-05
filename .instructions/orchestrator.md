# Orchestrator — Problem-Driven AI

## Role
Senior Methodologist & Product Architect. Central brain that coordinates
agents, skills, and rules to build a bilingual methodology ecosystem in Next.js.

## System Architecture

```
.instructions/
├── orchestrator.md          ← This file (system map)
├── roadmap.md               ← Product + content versioning (v0.1 → v1.0)
├── agents/                  ← Role-based agent definitions
│   ├── content-agent.md     → Editorial: write, validate, sync glossary
│   ├── dev-agent.md         → Development: Next.js, Supabase, deploy
│   └── ops-agent.md         → Operations: changelog, SEO, rules maintenance
├── skills/                  ← Execution logic
│   ├── content-writer/SKILL.md
│   ├── landing-page-writer/SKILL.md
│   ├── illustration-prompter/SKILL.md
│   ├── nextjs-builder/SKILL.md
│   └── phase-builder/SKILL.md
├── rules/                   ← Validation and governance
│   ├── RULES-project.md     (Strategic constitution: products, structure, decisions)
│   ├── RULES-content.md     (Editorial: style, terminology, structure, glossary)
│   ├── RULES-brand.md       (Identity: sections, metaphor, illustrations)
│   ├── RULES-architecture.md (Tech: stack, SQL, conventions, migration)
│   ├── RULES-quality.md     (Validation: blocking rules, checklists, matrices)
│   └── sacred-terms.md      (Canonical sacred terminology list)
└── templates/               ← Standard templates for `registrar` command
    ├── agent-template.md
    ├── skill-template.md
    └── rule-template.md
```

## Commands

| Command | Action |
|---|---|
| `registrar [type] [name]` | Generate MD from `templates/[type]-template.md` for a new agent/skill/rule |
| `invocar [name]` | Load the logic of a saved agent or skill |
| `validar` | Run content-agent validation pipeline on current/open files |
| `validar todo` | Full quality audit across entire content structure |
| `construir fase [N] [name]` | Build complete phase content from source with human review |

## i18n Golden Rule

- **Input**: User writes in Spanish
- **Output**: Two content files generated simultaneously
  - ES: `content/es/[section]/[file].mdx`
  - EN: `content/en/[section]/[file].mdx`
- **Constraint**: Frontmatter `slug` and routing must be consistent across locales
- **Framework**: next-intl handles locale routing natively (no redirect hacks needed)
- **Section names**: Always English in URLs (`/en/methodology/...`, `/es/methodology/...`)

## Sacred Terminology (NEVER translate)

See `rules/sacred-terms.md` for the canonical list. Includes Core Concepts
(Problem Statement, Context Engineering, Context Debt, Build-First Bias, Speed Theater,
Discovery, BMAD, Exit Criteria) and Artifacts (Signal Log, Story Files, Solution Brief, etc.).

## Infrastructure

- Framework: Next.js 15 (App Router, Server Components, MDX)
- Default locale: `en` — Spanish is the parallel tree at `/es/`
- Content: MDX files in `content/en/` and `content/es/`
- Database: Supabase (Postgres + Auth + Storage)
- Hosting: Vercel (free tier)
- Email: Resend (3,000/month free)
- Analytics: Umami self-hosted
- AI Images: Replicate (Flux) pay-per-use

## Content Structure

| Section | EN Route | ES Route | Position |
|---|---|---|---|
| Vision | `/vision` | `/vision` | 1 |
| Methodology | `/methodology` | `/methodology` | 2 |
| Planning | `/planning` | `/planning` | 3 |
| Operational | `/operational` | `/operational` | 4 |
| Resources | `/resources` | `/resources` | 5 |
| Programs | `/programs` | `/programs` | 6 |

## Product Catalog (P1-P10)

See `rules/RULES-project.md` for full descriptions. Products:
P1 (Site), P2 (CMS), P3 (Lead/Ebook), P4 (Workshops), P5 (Enterprise),
P6 (Events), P7 (CRM), P8 (AI Illustrations), P9 (Dashboard), P10 (Analytics).

## Agent Invocation

When `validar` or `validar todo` executes, the content-agent runs its
6-pass validation pipeline internally:

| Order | Pass | Role | Severity |
|---|---|---|---|
| 1 | Structure Validation | BLOCK if missing required sections | BLOCK |
| 2 | Terminology Scan | Auto-correct sacred terms, casing | ALTA |
| 3 | Cross-Reference | Verify links and bidirectionality | BLOCK |
| 4 | Style Scan | Sentence length, paragraphs, bold, tone | MEDIA |
| 5 | SEO & Metadata | Validate frontmatter, descriptions | WARN |
| 6 | Glossary Sync | Detect new terms, verify categories | SUGGEST |

**Rationale**: Blockers run first (Structure, Cross-Reference) so issues
are caught early. Terminology runs before cross-references because
auto-corrected terms might affect link text. Glossary is always last.

## Conflict Resolution

When validation produces overlapping findings:

| Priority | Severity | Behavior |
|---|---|---|
| 1 | BLOCK | Stop immediately. Fix before proceeding. |
| 2 | ALTA (auto-correct) | Apply silently. Report in output table. |
| 3 | WARN | Report but do not block. |
| 4 | SUGGEST | Soft guidance. Reported separately. |

- If two checks flag the **same line**, the higher severity wins.
- Human override: user can dismiss any non-BLOCK finding with justification.

## Skill Construction Protocol

Every registered skill file must contain:
1. **Trigger**: Command or event that activates it
2. **Step-by-Step**: Algorithm of execution steps
3. **Output Format**: Structure of the result
4. **Validation**: Which rules must be consulted
