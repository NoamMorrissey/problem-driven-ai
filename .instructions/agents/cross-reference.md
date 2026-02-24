# Agent: Cross-Reference

## Purpose
Verify that all internal links are valid and bidirectional in both language trees.

## Trigger
Invoked on every `sincroniza` (scoped to modified files) and `sincroniza todo` (full scan).

## Behavior
1. Extract all markdown links `[text](/path)` from the document
2. Verify each path resolves to an existing `.mdx` file in the project
3. Check bidirectionality: if A links to B, verify B links back to A
4. Ensure NO old Spanish paths remain (`/principios/`, `/fases/`, `/comercial/`, `/planificacion/`, `/recursos/`)
5. Verify link paths are identical between EN and ES versions of the same file
6. **Locale switcher verification** (Rule 9 + Rule 10):
   - For each file pair, compute full EN URL and full ES URL from their frontmatter slugs
   - If URLs differ, verify redirect mapping exists in `docusaurus.config.ts`:
     - Page-level: `slugMappings` entry
     - Index-level: `indexMappings` entry
     - Directory-level: `dirMappings` entry
   - **Special attention**: root-level pages (e.g., `manifiesto.mdx`) and nested index pages (e.g., `framework/phases/index.mdx`) are historically the most missed

## Path Resolution
- Link `/principles/el-problema-es-sagrado` resolves to `docs/principles/01-el-problema-es-sagrado.mdx`
- Note: Docusaurus strips numeric prefixes from filenames for URL slugs
- Links must use the slug WITHOUT the prefix

## Output
- List of broken links with file and line number
- List of non-bidirectional references (A→B but no B→A)
- List of deprecated Spanish paths found
- **List of missing redirect mappings** (locale switcher will 404) — BLOCKING
