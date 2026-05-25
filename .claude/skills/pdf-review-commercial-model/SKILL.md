---
name: pdf-review-commercial-model
description: Sanity-check the engagement's commercial model (T&M / Fixed-Price / Capacity / Outcome) against its current risk profile. Recommends stay or switch. If switch is recommended, the change goes via a CR. Use when margin is suffering, risk has shifted, or at a natural review point (mid-engagement, phase boundary).
---

# Commercial model review workflow

Produces `_pdf-output/engagements/{active}/08-commercial/commercial-model-reviews/<YYYY-MM-DD>.md`. **Append-only by date.**

Theo's principle 4 is the whole point: the commercial model is a choice. Most engagements default to whichever model was negotiated at signature and never revisit. Re-choosing when risk shifts is part of the work.

See `references/commercial-models.md` for the four canonical models and when each fits.

## Preconditions

- `pdf-create-charter` complete (charter declares the current commercial model)
- `pdf-create-budget-baseline` complete

## When to invoke

- Margin has fallen below target by ≥ 5 percentage points (Theo's `pdf-analyse-margin` offers this workflow)
- Risk profile has shifted materially (a major risk has materialised; a phase boundary has been crossed)
- Scheduled review (e.g. at every quarter-boundary, or at every major milestone)
- Stakeholder asks: "should this be FP / T&M / hybrid?"

## Intent: create

1. **State the trigger.** *"What's prompting this review?"* One paragraph.
2. **Read the current model.** From the charter and the budget baseline.
3. **Walk the four-model assessment.** For each of T&M / Fixed-Price / Capacity / Outcome (see `references/commercial-models.md`):
   - Fit score against current risk profile (low / medium / high)
   - Margin implication
   - Client-acceptability
   - Operational complexity
4. **Identify the best-fit model.** Could be the current one (in which case the review concludes "stay") or a different one ("switch").
5. **Recommendation.**
   - If **stay**: brief rationale; log the explicit decision to stay; append to decision-log.
   - If **switch**: name the target model and the rationale. **Route the actual change through `pdf-create-change-request` (Klaus).** Commercial-model switches are change requests, not silent updates.
6. **Compose:**

```markdown
---
artifact_type: commercial-model-review
engagement: <slug>
date: <YYYY-MM-DD>
current_model: <T&M | FP | Capacity | Outcome | Hybrid-...>
recommendation: <stay | switch-to-X>
generated_by: pdf-review-commercial-model
---

# Commercial model review — <date>

## Trigger

<one paragraph>

## Current model

**<T&M | FP | Capacity | Outcome | Hybrid>**

<one paragraph: why this was chosen at signature, when, by whom>

## Current risk profile (relevant to commercial model)

<bullets — scope volatility, requirement clarity, vendor exposure, etc. — sourced from RAID and from the user's read>

## Model fit assessment

| Model | Fit | Margin implication | Client acceptability | Operational complexity |
|---|---|---|---|---|
| **T&M** | <low/medium/high> | | | |
| **Fixed-Price** | <low/medium/high> | | | |
| **Capacity** | <low/medium/high> | | | |
| **Outcome-based** | <low/medium/high> | | | |

(Brief justification for each "fit" rating.)

## Recommendation

**<Stay with <current> | Switch to <model>>**

<one paragraph: reasoning. Acknowledges trade-offs.>

## If switching: how

- **The switch itself is a CR.** Route to `pdf-create-change-request` (Klaus) for the substantive change.
- **The commercial wrapper is a CO.** After CR approval, `pdf-create-change-order` (Theo) prices the switch.
- **Implications to flag in CR:**
  - Effective-from date
  - Treatment of work-in-progress at switch
  - Re-baseline implications

## If staying: rationale logged

Decision logged in `decision-log.md` as: "Reviewed commercial model on <date>; stay with <current>. Reason: <one line>."
```

7. **Hand off:**
   - On `switch`: offer `pdf-create-change-request` (Klaus) for the substantive change.
   - On `stay`: offer to append the decision to `decision-log.md` directly (interim until `pdf-decision-log` is built).

## Intent: update

Reviews are append-only per date. A "re-review" is a new file with a reference to the prior one in the Trigger section ("Following up on <prior date> review").

## Intent: validate

- [ ] Frontmatter complete; `recommendation` is one of allowed values
- [ ] All four models assessed (no skipped rows)
- [ ] Current risk profile bullets cite specific RAID items or named conditions
- [ ] If `switch-to-X`: rationale is non-empty and trade-offs acknowledged
- [ ] If `stay`: decision-log entry has been written (cross-artifact check)

## Intent: dump-merge

Accept dumped material (client conversation about pricing, finance proposal to re-baseline, contract clauses about model change). Identify the trigger; structure the review.

## Red-team posture

Off. Internal analysis. The downstream artifacts (CR, CO) red-team themselves.

## Reference

- `references/commercial-models.md` — the four canonical models
- `ARCHITECTURE.md` §6.8
- Theo's principle 4 (the model is a choice)
