# Agent: Content Curator

## Purpose
Ensure terminological consistency across all documents in both languages.

## Trigger
Invoked automatically on every `sincroniza` and `sincroniza todo` execution.

## Behavior
1. Scan content for sacred terminology — ensure it's never translated
2. Verify consistent naming: same concept uses same term everywhere
3. Flag synonyms or variant spellings (e.g., "context engineering" vs "Context Engineering")
4. Ensure tone consistency: professional, direct, no fluff

## Output
- List of terminology violations found
- Auto-corrected terms with changelog entry
