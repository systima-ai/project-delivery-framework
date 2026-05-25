# Change impact taxonomy

Two classifications. The user elicits the **granular** taxonomy (B); the workflow infers the **classic** taxonomy (A) from it.

## Granular taxonomy (B) — elicit this from the user

Four dimensions. A single change request may touch one, several, or all.

| Dimension | Definition | Typical triggers |
|---|---|---|
| **Architectural** | The structure, components, interfaces, or quality attributes of the technical or operational solution change. | New integration, swapped technology, changed data model, deferred quality gate, new NFR. |
| **Commercial** | The pricing, commercial model, margin, invoicing schedule, or contractual terms change. | T&M → FP transition, milestone slip affecting invoicing, vendor cost increase, change in retained-margin assumption. |
| **Governance** | RACI, decision rights, forum cadence, escalation routing, or compliance regime change. | Sponsor change, new decision-rights threshold, added compliance regime, change in CCB membership. |
| **External** | A third party (client side or supplier side) introduces a constraint, dependency, or change of fact. | Regulator update, vendor end-of-life announcement, client org restructure, new sub-processor. |

### Elicitation order

For each change request, the workflow walks these four in order:

1. *"Does this change touch the architecture? If yes, in one paragraph: which components, interfaces, or quality attributes?"*
2. *"Does this change touch the commercials? If yes: pricing, model, invoicing, margin?"*
3. *"Does this change touch governance? If yes: RACI, decision rights, cadence, compliance?"*
4. *"Is this change driven externally? If yes: by whom, what changed on their side?"*

Each dimension is `none | minor | material | major`. The workflow uses these levels both for the granular section in the output and for inferring the classic taxonomy.

## Classic taxonomy (A) — inferred from B, shown in output

PMBOK-classic dimensions. Useful because most approvers expect them; useful as a sanity check against the granular view.

| Dimension | Inferred-from rules |
|---|---|
| **Scope** | Architectural at material+ OR External at material+ → Scope is at least material. Otherwise minor or none. |
| **Time** | Architectural at material+ OR External (with deadline pressure) at material+ → Time impact present. |
| **Cost** | Commercial at any level above none → Cost impact present, scaled to commercial level. External with new third-party fees → Cost. |
| **Quality** | Architectural at material+ (any quality-gate or NFR change) → Quality. Commercial at material+ that compresses time → Quality risk via shortcut. |
| **Risk** | Always present at minor or higher when any other dimension is material+. External material+ → Risk material+. New dependencies → Risk. |

### Inference table (worked)

| Architectural | Commercial | Governance | External | → Scope | Time | Cost | Quality | Risk |
|---|---|---|---|---|---|---|---|---|
| major | none | none | none | major | material | none | major | material |
| none | material | none | none | none | none | material | none | minor |
| material | minor | none | minor | material | material | minor | material | material |
| none | none | major | none | none | none | none | none | minor |
| material | material | none | major | material | material | material | material | major |

The inference is **deterministic** and lives in `customize.toml` so it can be tuned per firm or per engagement.

## Output format

The change request output renders both classifications:

```markdown
## Impact assessment

### Granular (elicited)

| Architectural | Commercial | Governance | External |
|---|---|---|---|
| material | minor | none | none |

**Architectural detail:** <one paragraph>
**Commercial detail:** <one paragraph>
**Governance detail:** _(not material)_
**External detail:** _(not material)_

### Classic (derived)

| Scope | Time | Cost | Quality | Risk |
|---|---|---|---|---|
| material | material | minor | material | material |

_Derived from granular taxonomy; see `pdf-create-change-request/references/change-impact-taxonomy.md` for the rules._
```

## Why this design

- **Granular elicits better.** Asking "is this architectural?" produces sharper thinking than asking "is this a scope change?" — because architectural changes can hide as quality, governance, or commercial decisions, and the classic taxonomy doesn't surface them.
- **Classic survives approval.** CCBs and CFOs read scope/time/cost/quality/risk. Producing both keeps the elicitation honest and the approval readable.
- **Inference is auditable.** The rules above are explicit; an approver who disagrees with the derived classic view can walk back to the granular view and check the reasoning. This is much harder if only the classic view exists.

## Anti-patterns

- **Skipping dimensions on the assumption they're "obviously none".** Forces the workflow to ask all four. The "obviously none" answer is fast to give and adds rigour.
- **Letting "minor" stand without explanation.** Every dimension above "none" requires the one-paragraph detail. "Minor" with no detail is rejected on validate.
- **Re-inferring B from A retrospectively.** The granular taxonomy is the source of truth. If the user wants to revise impact, they revise B; A is recomputed.
