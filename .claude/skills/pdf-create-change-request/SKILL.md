---
name: pdf-create-change-request
description: Compose a structured change request with full-impact assessment. Elicits the granular taxonomy (architectural / commercial / governance / external) and infers the classic taxonomy (scope / time / cost / quality / risk). Use when a change to charter scope, plan, or commitments is being proposed.
---

# Change request workflow

Produces `_pdf-output/engagements/{active}/06-risk-change/change-requests/<YYYY-MM-DD>-CR-<NNN>-<slug>.md`.

**Taxonomy model:** elicit granular (architectural / commercial / governance / external); infer classic (scope / time / cost / quality / risk). Both classifications appear in the output. See `references/change-impact-taxonomy.md` for the elicitation order and inference rules.

Klaus's principle 2 is the constraint: change requests price the full impact, not just the visible one.

## Preconditions

- `CHARTER.md` at revision ≥ 1
- The change being requested has a real trigger (don't invent change requests; if the user is unsure whether something is a change, prompt for the trigger first)

## Intent: create

1. **Generate the ID.** Format: `CR-<NNN>`, monotonic from highest existing CR in the engagement.
2. **Establish the trigger.** *"In one sentence, what triggered this change? (Client ask, materialised risk, regulatory change, technology change, scope clarification, …)"*
3. **Walk the granular taxonomy.** Read `references/change-impact-taxonomy.md` and follow its elicitation order:
   - Architectural — none / minor / material / major (with detail if not none)
   - Commercial — none / minor / material / major (with detail if not none)
   - Governance — none / minor / material / major (with detail if not none)
   - External — none / minor / material / major (with detail if not none)
4. **Infer the classic taxonomy** using the rules in the reference. Show the user the inference. Allow override (with note recorded in frontmatter).
5. **Elicit options.** *"What options are on the table? Minimum two; one must be 'do not make this change'."*
6. **Recommend.** *"Which option do you recommend, and what trade-off are you accepting?"*
7. **Routing.** *"Who must approve this? (Reference `GOVERNANCE.md` decision-rights matrix.)"*
8. **Compose:**

```markdown
---
artifact_type: change-request
engagement: <slug>
id: CR-<NNN>
date: <YYYY-MM-DD>
slug: <slug>
trigger: <one-line trigger>
status: draft
charter_revision_at_creation: <N>
generated_by: pdf-create-change-request
red_teamed: false
approver_routing: [<name>, ...]
---

# Change request — CR-<NNN> — <title>

## Trigger

<one paragraph>

## Context

<one paragraph; what is true today that this change disrupts. Lead with the charter section affected.>

## Impact assessment

### Granular (elicited)

| Architectural | Commercial | Governance | External |
|---|---|---|---|
| <level>       | <level>    | <level>    | <level>  |

**Architectural detail:** <paragraph or "Not material">
**Commercial detail:** <paragraph or "Not material">
**Governance detail:** <paragraph or "Not material">
**External detail:** <paragraph or "Not material">

### Classic (derived)

| Scope | Time | Cost | Quality | Risk |
|---|---|---|---|---|
| <level> | <level> | <level> | <level> | <level> |

_Derived from the granular taxonomy. See `pdf-create-change-request/references/change-impact-taxonomy.md` for the inference rules._

## Options considered

### Option A — <name>

- What it is: <one line>
- Cost: <range>
- Time: <range>
- Quality impact: <one line>
- Risk impact: <one line>

### Option B — <name>

(Same fields.)

### Option C — Do not make this change

- What it is: Continue as-is.
- Implication: <one line on the consequence of not changing>

## Recommendation

<one paragraph. Names the option. States the trade-off being accepted.>

## Approver routing

| Approver | Reason | Approval status | Date |
|---|---|---|---|
| <name>   | <decision-rights cell that applies> | pending | — |

## Cross-references

- Triggers a charter update? <yes / no — if yes, recommend `pdf-create-charter` update intent>
- Triggers a commercial change order? <yes / no — if yes, recommend `pdf-create-change-order` (Theo)>
- Triggers an escalation decision? <yes / no — if yes, recommend `pdf-decide-escalation`>
- Related risks: <R-NNN list or "none">
```

9. **Run simulated red-team inline:**
   - *Is there a dimension I called "none" that an approver would dispute?*
   - *Is the "do not make this change" option honestly costed?*
   - *Is the recommended option self-serving for the delivery team?*
   - *Is the approver routing correct per the governance plan?*
10. **Write the file.** Status starts at `draft`.
11. **Hand off:**
   - If Commercial dimension is at minor+, offer `pdf-create-change-order` (Theo — not yet built; track for Stage 6).
   - If approver routing names someone above the line, offer `pdf-decide-escalation` to make the escalation choice explicit.
   - Otherwise return to Klaus's menu.

## Intent: update

1. Identify the CR by ID.
2. Common updates: status change (draft → in-review → approved/rejected), new information requiring re-impact, approver feedback.
3. Re-run inference if any granular level changes.
4. Status changes get a one-line append to a `## History` section at the bottom of the file.
5. If status becomes `approved` AND the CR triggers a charter update, prompt the user to run `pdf-create-charter` update intent.

## Intent: validate

- [ ] Frontmatter complete; ID matches filename; charter_revision_at_creation present
- [ ] All four granular dimensions assessed (no "skipped" levels)
- [ ] Any granular dimension above `none` has a non-empty detail paragraph
- [ ] Classic taxonomy is consistent with the granular inference rules (or has an override note explaining the manual departure)
- [ ] At least two options + a "do not make this change" option
- [ ] Recommendation names an option and states the trade-off
- [ ] Approver routing references names in STAKEHOLDERS.md and decision rights in GOVERNANCE.md
- [ ] Frontmatter `red_teamed: true` before status moves beyond `draft`

## Intent: dump-merge

Accept dumped material (vendor email, client request, internal proposal). Extract trigger, candidate impact levels, candidate options. Confirm each before structuring.

## Red-team posture

**Default ON.** CRs are approver-facing; the cost of a bad CR is paid in lost trust or wasted approval cycles.

## Reference

- `references/change-impact-taxonomy.md` — full B-elicits-A-infers method
- `ARCHITECTURE.md` §6.6, §16
- Klaus's principle 2 (price the full impact)
