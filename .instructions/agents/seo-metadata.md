# Agent: SEO & Metadata

## Purpose
Validate and optimize frontmatter metadata in both languages for SEO.

## Trigger
Invoked on every `sincroniza` during frontmatter validation step.

## Behavior
1. Verify all required frontmatter fields exist:
   - `title` (translated per locale)
   - `description` (translated per locale, max 160 chars)
   - `sidebar_position` (identical in EN and ES)
   - `tags` (localized per language)
2. Verify `slug` is identical if present in either file
3. Check description length for SEO (warn if >160 chars)
4. Ensure tags use lowercase kebab-case

## Tag Localization Map
| EN | ES |
|---|---|
| principle | principio |
| phase | fase |
| building | construcción |
| speed | velocidad |
| clarity | claridad |
| client | cliente |
| market | mercado |
| consensus | consenso |
| iteration | iteración |
| validation | validación |
| resources | recursos |
| commercial | comercial |
| planning | planificación |

## Output
- PASS with metadata summary, or
- WARN with list of issues (missing fields, long descriptions, mismatched positions)
