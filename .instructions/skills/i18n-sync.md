# Skill: i18n-sync

## Trigger

- Command `sincroniza` — Process open/modified files
- Command `sincroniza todo` — Full structural audit

---

## URL Localization Architecture

### Path Prefix Map

Every directory has a localized URL prefix. This map is the source of truth:

| Directory | EN prefix | ES prefix |
|---|---|---|
| `overview/` | `/overview` | `/overview` |
| `principles/` | `/principles` | `/principios` |
| `phases/` | `/phases` | `/fases` |
| `framework/` | `/framework` | `/framework` |
| `commercial/` | `/commercial` | `/modelo-comercial` |
| `planning/` | `/planning` | `/planificacion` |
| `resources/` | `/resources` | `/recursos` |

### Slug Convention

- **EN files**: relative slug (e.g., `slug: the-problem-is-sacred`)
  - Directory name is already English, so relative slug produces correct URL
- **ES files**: absolute slug with Spanish prefix (e.g., `slug: /principios/el-problema-es-sagrado`)
  - Absolute slug (starting with `/`) overrides the English directory name in the URL

### Category Index Pages

Every directory MUST have an `index.mdx` in both trees:
- `docs/[section]/index.mdx` — EN category landing page
- `i18n/es/.../current/[section]/index.mdx` — ES category landing page

Structure:
```mdx
---
title: "[Category Name]"
slug: /[localized-prefix]
description: "[Description]"
sidebar_position: 0
---

import DocCardList from '@theme/DocCardList';

# [Category Name]

[Description]

<DocCardList />
```

The sidebar references these via `link: {type: 'doc', id: '[section]/index'}`.

### Redirect Plugin

`@docusaurus/plugin-client-redirects` in `docusaurus.config.ts` maps old English-path URLs to localized ES URLs. When adding a new directory with a translated prefix, update the `createRedirects` function in `docusaurus.config.ts`.

---

## Creating a New Directory

When a new content section is needed:

1. **Choose the directory name** (English, kebab-case)
2. **Define the ES prefix** and add it to the Path Prefix Map above
3. **Create 4 files**:
   - `docs/[section]/index.mdx` — EN index with `slug: /[en-prefix]`
   - `docs/[section]/_category_.json` — EN category metadata
   - `i18n/es/.../current/[section]/index.mdx` — ES index with `slug: /[es-prefix]`
   - `i18n/es/.../current/[section]/_category_.json` — ES category metadata
4. **Update `sidebars.ts`** — Add the new category entry with `link: {type: 'doc', id: '[section]/index'}`
5. **Update `docusaurus.config.ts`** — Add the new mapping to `createRedirects` if the ES prefix differs from EN
6. **Update `footer.json`** — Add label translation if the section appears in the footer

---

## Step-by-Step: `sincroniza`

### 1. Detect Changes
- Read the file(s) the user has open or just modified
- Identify which tree it belongs to (ES mirror or EN primary)
- Determine the counterpart path:
  - If ES file: `i18n/es/.../current/[section]/[file].mdx` → `docs/[section]/[file].mdx`
  - If EN file: `docs/[section]/[file].mdx` → `i18n/es/.../current/[section]/[file].mdx`

### 2. Validate Structure (invoke: `rules/core-rules.md`)
- **For Phases**: BLOCK if missing Exit Criteria or Anti-pattern
- **For Principles**: BLOCK if missing Statement, Implications, Anti-pattern, or Connections
- **For Commercial**: BLOCK if missing 6 mandatory sections
- **For Any file**: BLOCK if missing frontmatter (title, description, sidebar_position, tags)

### 3. Translate
- Direction: ES → EN (technical English, professional tone)
- Preserve sacred terminology verbatim (see orchestrator.md)
- Adapt `tags` for SEO per language:
  - ES: `[principio, problem-statement, discovery]`
  - EN: `[principle, problem-statement, discovery]`
- Keep `sidebar_position` IDENTICAL
- Apply slug convention from the Path Prefix Map:
  - EN: relative slug (e.g., `slug: the-problem-is-sacred`)
  - ES: absolute slug (e.g., `slug: /principios/el-problema-es-sagrado`)

### 4. Generate Callouts
- Anti-patterns: `:::danger Anti-pattern: [Name]` (EN) / `:::danger Anti-patrón: [Name]` (ES)
- Tips: `:::tip` in both
- Warnings: `:::warning` / `:::warning`

### 5. Validate Frontmatter
- `sidebar_position`: must match between EN and ES
- `slug`: EN uses relative, ES uses absolute with localized prefix (see Path Prefix Map)
- `title`: translated
- `description`: translated
- `tags`: localized

### 6. Write Files
- Write EN file to `docs/[section]/[file].mdx`
- Write ES file to `i18n/es/docusaurus-plugin-content-docs/current/[section]/[file].mdx`
- If `_category_.json` doesn't exist in ES mirror, create it
- If `index.mdx` doesn't exist in the section (new directory), create it in both trees

### 7. Cross-Reference Check
- Scan all internal links `](../path)` in both files
- Verify links use **file-path references** (e.g., `../principles/01-el-problema-es-sagrado.mdx`), NOT URL paths
- Exception: `index.mdx` files may use URL paths for category links (e.g., `/principios`, `/fases`)
- Verify linked files exist in both trees

### 8. Glossary Sync
- Detect new canonical terms in the content
- If found, propose additions to `static/glossary.json` with `term_en` and `term_es`

### 9. Restart Server
- Kill any process on port 3000: `lsof -ti:3000 | xargs kill -9`
- Clean cache: `npx docusaurus clear`
- Build both locales: `npx docusaurus build`
- Serve: `npx docusaurus serve --port 3000`
- Confirm server is running and report URL `http://localhost:3000`

---

## Step-by-Step: `sincroniza todo`

### 1. File Parity Audit
- List all `.mdx` files in `docs/` and `i18n/es/.../current/`
- Flag any file present in one tree but missing in the other
- List all `_category_.json` and check parity
- Verify every directory has `index.mdx` in both trees

### 2. Frontmatter Sync Audit
- For every file pair, compare `sidebar_position`
- Verify EN slugs are relative and ES slugs are absolute with correct prefix (per Path Prefix Map)
- Flag mismatches

### 3. Language Verification
- EN files must NOT contain Spanish content markers
- ES files must NOT contain English content markers
- Exception: sacred terminology is English in both

### 4. Cross-Reference Audit
- Extract all internal links from both trees
- Verify content files use file-path references (`../section/file.mdx`), not URL paths
- Verify all link targets exist as actual pages

### 5. Theme Translation Audit
- Verify `i18n/es/docusaurus-theme-classic/navbar.json` exists and is valid JSON
- Verify `i18n/es/docusaurus-theme-classic/footer.json` exists and is valid JSON
- Verify `i18n/es/docusaurus-plugin-content-docs/current.json` exists and is valid JSON

### 6. Redirect Plugin Audit
- Verify every ES prefix in the Path Prefix Map (where EN ≠ ES) has a corresponding entry in `createRedirects` in `docusaurus.config.ts`

### 7. Build Verification
- Run `npx docusaurus build`
- Confirm both locales: `[SUCCESS]`
- Confirm 0 broken links (footer redirect warnings are acceptable)

### 8. Report
- Output structured table with PASS/FAIL per check
- List all fixes applied
- Suggest Changelog entry

---

## Output Format

```
PATH EN: docs/[section]/[filename].mdx
PATH ES: i18n/es/docusaurus-plugin-content-docs/current/[section]/[filename].mdx
```

---

## Validation

Consults: `.instructions/rules/core-rules.md`
Invokes agents: Content Curator, Structure Validator, Cross-Reference, SEO & Metadata, Glossary Sync
