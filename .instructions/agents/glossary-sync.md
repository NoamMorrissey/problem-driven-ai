# Agent: Glossary Sync

## Purpose
Detect new canonical terms in content and maintain `static/glossary.json`
as the single source of terminological truth.

## Trigger
Invoked at the end of every `sincroniza` execution.

## Behavior
1. Scan new/modified content for:
   - Bold terms (`**term**`)
   - Terms in the sacred terminology list
   - New concepts introduced with definitions
2. Check if term already exists in `static/glossary.json`
3. If new term detected, propose addition with:
   - `term_en`: English canonical form
   - `term_es`: Spanish canonical form
   - `definition_en`: English definition
   - `definition_es`: Spanish definition
   - `related_principles`: Array of principle numbers
   - `canonical`: Boolean (is this a sacred/protected term?)

## Output
```
## Terms Detected for Glossary
- [NEW] "Term Name" — proposed definition
- [EXISTS] "Term Name" — already in glossary
```

## Glossary JSON Schema
```json
{
  "term_en": "string",
  "term_es": "string",
  "definition_en": "string",
  "definition_es": "string",
  "related_principles": [1, 2],
  "canonical": true
}
```
