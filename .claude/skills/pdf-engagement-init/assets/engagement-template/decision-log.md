---
artifact_type: decision-log
engagement: {{ENGAGEMENT_SLUG}}
---

# Decision Log — {{ENGAGEMENT_NAME}}

> Append-only. Every consequential decision lands here. Used as a source by `pdf-weekly-status`, `pdf-prep-steering`, and any retrospective.

## Entry shape

```yaml
- id: DEC-001
  date: YYYY-MM-DD
  decided_by: <name>
  decision: <one-line decision>
  context: <why this came up>
  options_considered:
    - <option 1>
    - <option 2>
  rationale: <why this option was chosen>
  reversible: true   # or false
  related_artifacts:
    - <path/to/artifact.md>
```

## Decisions

_None yet._
