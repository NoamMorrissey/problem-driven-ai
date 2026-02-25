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

### Redirect Plugin (Bidirectional)

`@docusaurus/plugin-client-redirects` in `docusaurus.config.ts` handles **bidirectional** redirects between EN and ES path segments. This is CRITICAL for the locale switcher to work correctly.

**Why bidirectional:** Docusaurus locale switcher does a simple URL path swap (adds/removes `/es/` prefix). Without bidirectional redirects:
- EN→ES: `/phases/x` → `/es/phases/x` → 404 (actual page: `/es/fases/x`)
- ES→EN: `/es/fases/x` → `/fases/x` → 404 (actual page: `/phases/x`)

**The `createRedirects` function MUST handle both directions:**
1. **ES locale**: redirect English-segment URLs → Spanish-segment URLs (e.g., `/es/phases/x` → `/es/fases/x`)
2. **EN locale**: redirect Spanish-segment URLs → English-segment URLs (e.g., `/fases/x` → `/phases/x`)

**When adding a new directory with a translated prefix**, add BOTH mapping directions to `createRedirects` in `docusaurus.config.ts`. The mappings array is shared — the function applies it in both directions automatically.

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
5. **Update `docusaurus.config.ts`** — If the ES prefix differs from EN, add the new mapping to BOTH arrays in `createRedirects` (`mappings` for child pages, `indexMappings` for category index). The function already handles bidirectional redirects from a single mapping entry.
6. **Verify locale switcher** — After build, confirm that switching EN↔ES works for the new section by testing both directions:
   - EN page → switch to ES → should redirect correctly
   - ES page → switch to EN → should redirect correctly
7. **Update `footer.json`** — Add label translation if the section appears in the footer

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

### 7. Slug Mapping Update (Rule 9)
- For the page(s) just created, check if the EN slug differs from the ES slug
- If they differ (which is the normal case for translated slugs), add a `slugMappings` entry in `createRedirects` inside `docusaurus.config.ts`:
  ```ts
  {en: '/[en-dir]/[en-slug]', es: '/[es-dir]/[es-slug]'}
  ```
- The EN path uses the EN directory prefix and relative slug (e.g., `/phases/problem-discovery/why-this-phase-exists`)
- The ES path uses the ES directory prefix and ES slug (e.g., `/fases/problem-discovery/por-que-esta-fase-existe`)
- Place the entry in the appropriate section comment (Principles, Phase N, Framework, Resources)
- **This step is BLOCKING** — without it, the locale switcher will 404 for the new page

### 8. Cross-Reference Check
- Scan all internal links `](../path)` in both files
- Verify links use **file-path references** (e.g., `../principles/01-el-problema-es-sagrado.mdx`), NOT URL paths
- Exception: `index.mdx` files may use URL paths for category links (e.g., `/principios`, `/fases`)
- Verify linked files exist in both trees

### 9. Glossary Sync
- Detect new canonical terms in the content
- If found, propose additions to `static/glossary.json` with `term_en` and `term_es`

### 10. Restart Server
- Kill any process on port 3000: `lsof -ti:3000 | xargs kill -9`
- Clean cache: `npx docusaurus clear`
- **ALWAYS use `npm run start`** (build + serve, bilingual). NEVER use `npm run dev` for verification — it only serves one locale and the locale switcher produces 404s.
- Confirm server is running and report URL `http://localhost:3000`
- Verify both `http://localhost:3000/` (EN) and `http://localhost:3000/es/` (ES) return 200

### 11. Locale Switcher Verification
- For the page(s) just created or modified, verify locale switching works in both directions.
- **Directory-level redirects** (translate `/phases/` ↔ `/fases/`):
  - `build/es/[en-dir]/[es-slug]/index.html` exists (dir redirect for ES locale)
  - `build/[es-dir]/[en-slug]/index.html` exists (dir redirect for EN locale)
- **Page-level slug redirects** (translate `why-this-phase-exists` ↔ `por-que-esta-fase-existe`):
  - `build/es/[en-dir]/[en-slug]/index.html` exists (slug redirect for EN→ES switching)
  - `build/[es-dir]/[es-slug]/index.html` exists (slug redirect for ES→EN switching)
- If any redirect is missing, check that BOTH the `dirMappings` AND `slugMappings` entries exist in `createRedirects` in `docusaurus.config.ts`
- **Root cause reminder**: Docusaurus locale switcher does a simple URL prefix swap (`/page` → `/es/page`). It does NOT resolve doc IDs. Two levels of redirects are needed:
  1. Directory-level: translates path segments (`/phases/` ↔ `/fases/`)
  2. Page-level: translates individual slugs (`why-this-phase-exists` ↔ `por-que-esta-fase-existe`)

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

### 6. Redirect Plugin Audit (Rule 9 — Three Levels)

This is the most critical audit step. Every level must be verified independently.

#### 6a. Directory-level (`dirMappings`)
- Read `docusaurus.config.ts` → `dirMappings` array
- Verify every ES prefix in the Path Prefix Map (where EN ≠ ES) has a corresponding entry
- **Ordering check**: more specific paths MUST come before less specific (e.g., `/framework/fases/` before `/fases/`) — the matching loop uses `break` on first hit
- Flag any missing directory mapping

#### 6b. Index-level (`indexMappings`)
- Read `docusaurus.config.ts` → `indexMappings` array
- For every `index.mdx` where the EN path ≠ ES path, verify an entry exists
- **Common miss**: nested indexes like `/framework/phases` ↔ `/framework/fases`
- **Ordering check**: same as dirMappings — more specific first

#### 6c. Page-level (`slugMappings`)
- For EVERY `.mdx` file pair, compute the full EN URL and full ES URL
- If they differ (after accounting for dirMappings coverage), verify a `slugMappings` entry exists
- **Special cases that are easy to miss**:
  - Root-level pages (e.g., `docs/manifiesto.mdx` with EN slug `manifesto` vs ES slug `/overview/manifiesto`)
  - Framework section pages (e.g., `/framework/processes` vs `/framework/procesos`)
  - Pages where only the directory path changes (covered by dirMappings) but the slug ALSO changes (needs slugMapping too)

#### 6d. Build verification (Rule 10 — BLOCKING)
- Run `npm run build`
- For EVERY page where EN URL ≠ ES URL, verify BOTH redirect HTML files exist:
  - `build/es/[en-path]/index.html` (EN→ES locale switch)
  - `build/[es-path-without-locale]/index.html` (ES→EN locale switch)
- **Quick audit**: For each translated directory, list contents and verify both slug sets appear:
  ```bash
  ls build/principles/     # Must contain EN + ES redirect slugs
  ls build/es/principles/  # Must contain ES + EN redirect slugs
  ```
- If ANY redirect HTML file is missing → BLOCK commit, fix the mapping, rebuild

### 7. Build Verification
- Run `npx docusaurus build` (if not already done in step 6d)
- Confirm both locales: `[SUCCESS]`
- Confirm 0 broken links (footer redirect warnings are acceptable)

### 8. Report
- Output structured table with PASS/FAIL per check
- **Redirect audit must have its own section** with explicit PASS/FAIL for each of the three levels (dir, index, slug)
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
