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

## Path Resolution
- Link `/principles/el-problema-es-sagrado` resolves to `docs/principles/01-el-problema-es-sagrado.mdx`
- Note: Docusaurus strips numeric prefixes from filenames for URL slugs
- Links must use the slug WITHOUT the prefix

## Output
- List of broken links with file and line number
- List of non-bidirectional references (A→B but no B→A)
- List of deprecated Spanish paths found
