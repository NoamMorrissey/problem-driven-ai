# Agent: Changelog

## Purpose
Generate structured changelog entries after every content modification.

## Trigger
Invoked at the end of every `sincroniza` and `sincroniza todo` execution.

## Behavior
1. Summarize what changed: files created, modified, deleted
2. Categorize changes: [ADD], [FIX], [SYNC], [TRANSLATE], [REFACTOR]
3. Note any rules that were enforced (blocked content, auto-corrections)
4. Suggest version bump if applicable

## Output Format
```
## Changelog Suggestion
vX.Y.Z — YYYY-MM-DD (branch: [branch-name])
- [TYPE] Description of change
- [TYPE] Description of change
```

## Versioning Convention
- MAJOR: New section/phase added
- MINOR: Content updates, new principles, new artifacts
- PATCH: Fixes, sync corrections, metadata updates
