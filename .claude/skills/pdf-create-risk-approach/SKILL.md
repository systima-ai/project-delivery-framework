---
name: pdf-create-risk-approach
description: Define the engagement's risk approach once — the probability and impact scales (what a 1–5 actually means), the rating matrix and severity bands, the risk appetite and escalation threshold, the risk categories, and the review cadence. Grounds every L×I score the RAID and deep-dives produce. Use early, and whenever the risk strategy materially changes.
---

# Risk approach workflow

Produces `_pdf-output/engagements/{active}/06-risk-change/risk-approach.md`. Living document with append-only change-log.

This is the **"plan risk management" step** PDF otherwise skips. The RAID log scores every risk **Likelihood (1–5) × Impact (1–5)** and the framework leans on those numbers — residual scores, mitigation triggers, escalation thresholds. But a "4" means nothing until someone defines it. This artifact defines it **once**, so every downstream score is consistent and comparable. It is to risk what the measurement plan is to metrics: the rubric everything else references.

After this exists, `pdf-update-raid` scores **against** these scales and `pdf-risk-deep-dive` interprets residual posture **against** this matrix and appetite. A score in RAID means what this document says it means.

## Preconditions

- `CHARTER.md` at `current_revision >= 1` (objectives and constraints frame the impact scale)
- `STAKEHOLDERS.md` populated (the risk process needs a single named owner)
- `03-planning/budget-baseline.md` helpful but not required (lets the cost impact band tie to real £)

## Intent: create

Load `references/risk-scale-guide.md` — it carries the default scale bands, the matrix rubric, the appetite-statement structure, and a category starter set. All defaults are **firm-neutral and overridable**; never present them as fixed.

1. **Probability scale.** Define the 1–5 likelihood bands (e.g. probability ranges). Offer the guide's defaults; let the user override.
2. **Impact scale.** Define the 1–5 impact bands **across impact dimensions** — cost, schedule, quality/scope, reputation/stakeholder. Each score gets a threshold per dimension. If a budget baseline exists, tie the cost bands to real £ rather than abstract labels.
3. **Rating matrix & severity bands.** Map the L×I product (1–25) to named severity bands (e.g. low / moderate / high / critical) and state the **required response per band** (e.g. critical → active treatment plan + escalation within N days).
4. **Risk appetite & escalation threshold.** State the engagement's appetite in plain language, then the hard threshold: the score (or band) at or above which active treatment and escalation are **mandatory, not optional**. Optionally set per-category tolerances. **Reconcile to governance:** the escalation threshold here must agree with the decision-rights/escalation thresholds in `GOVERNANCE.md`; if they conflict, flag it and offer to update one.
5. **Risk categories.** Agree a category taxonomy (the guide offers a starter set). Categories make portfolio-level patterns visible and let appetite vary by category.
6. **Two-sided risk.** Confirm the engagement tracks **both threats and opportunities**. Record the two response sets: threats → Treat / Tolerate / Transfer / Terminate; opportunities → Exploit / Enhance / Share / Accept. (`pdf-update-raid` enforces the right set per risk type.)
7. **Cadence & owner.** Set the risk-review cadence and name the single accountable owner of the risk process (default: the Delivery Manager).
8. **Compose:**

```markdown
---
artifact_type: risk-approach
engagement: <slug>
status: active
current_revision: 1
last_updated: <iso>
last_updated_by: <user>
charter_revision_at_creation: <N>
escalation_threshold: <score or band>
review_cadence: <e.g. weekly | fortnightly>
owner: <name from STAKEHOLDERS.md>
---

# Risk approach — <Engagement name>

> Living document. Defines what risk scores mean on this engagement. The rubric
> `pdf-update-raid` scores against and `pdf-risk-deep-dive` interprets against.

## Probability scale (Likelihood 1–5)

| Score | Label | Probability band |
|---:|---|---|
| 1 | Rare | <e.g. < 10%> |
| 2 | Unlikely | <10–30%> |
| 3 | Possible | <30–50%> |
| 4 | Likely | <50–75%> |
| 5 | Almost certain | <> 75%> |

## Impact scale (1–5)

| Score | Cost | Schedule | Quality / scope | Reputation / stakeholder |
|---:|---|---|---|---|
| 1 | <band> | <band> | <band> | <band> |
| 2 | … | … | … | … |
| 3 | … | … | … | … |
| 4 | … | … | … | … |
| 5 | <band> | <band> | <band> | <band> |

(A risk's impact score is the **highest** score it reaches on any single dimension.)

## Rating matrix & severity bands

| L×I range | Severity | Required response |
|---|---|---|
| 1–4 | Low | Monitor; review at cadence |
| 5–9 | Moderate | Named owner; treatment optional |
| 10–15 | High | Active treatment plan required |
| 16–25 | Critical | Treatment plan + escalation within <N> days |

## Risk appetite & escalation threshold

- **Appetite (plain language):** <how much risk this engagement will accept, and where it won't>
- **Escalation threshold:** at or above **<score / band>**, active treatment and escalation are mandatory.
- **Per-category tolerances (optional):** <e.g. zero appetite for security/compliance; higher tolerance for schedule>

## Risk categories

<list — e.g. Delivery/schedule, Commercial, Technical, People/resource, External/vendor, Security/compliance, ...>

## Two-sided risk

- **Threats** (negative impact) — responses: Treat / Tolerate / Transfer / Terminate.
- **Opportunities** (positive impact) — responses: Exploit / Enhance / Share / Accept.

## Cadence & ownership

- **Risk-review cadence:** <weekly | fortnightly | per-milestone>
- **Risk-process owner:** <name>
- **Governance reconciliation:** escalation threshold agrees with `GOVERNANCE.md`? <yes | flag>

---

## Change log

| Rev | Date | Author | Section | Change | Trigger | Approved by |
|---:|---|---|---|---|---|---|
| 1 | <date> | <user> | All | Initial risk approach | Mobilization / planning | <approver> |
```

9. **Validate** (coverage check below). Any ✗ blocks the write.
10. **Hand off:**
    - Offer `pdf-update-raid` so existing risks can be re-scored against the now-defined scales.
    - If the escalation threshold conflicts with `GOVERNANCE.md`, offer `pdf-create-governance` (update).

## Intent: update

1. Ask what changed (scale recalibration, appetite shift, threshold change, new category).
2. **A scale or threshold change is significant** — it re-prices every existing risk. Append the change-log row with the trigger, route to `pdf-decision-log`, and offer to re-validate the RAID against the new scales.
3. Re-run governance reconciliation and the coverage check. Refuse to finalise if it fails.
4. Bump revision; append change-log.

## Intent: validate

- [ ] Frontmatter complete; revision monotonic
- [ ] Probability scale: all five scores have a defined band (no blanks)
- [ ] Impact scale: all five scores defined across every impact dimension in use
- [ ] Rating matrix maps the full 1–25 range to severity bands, each with a required response
- [ ] Appetite stated in plain language AND a numeric/band escalation threshold set
- [ ] At least three risk categories defined
- [ ] Both threat and opportunity response sets recorded
- [ ] Review cadence set; single named owner in `STAKEHOLDERS.md`
- [ ] Escalation threshold reconciled against `GOVERNANCE.md` (or the conflict is flagged)

## Intent: dump-merge

Accept dumped material — a client risk framework, a PMO scoring standard, an existing risk register with implied scales. Extract candidate scale bands, appetite statements, and categories; surface what's missing (almost always: the impact £ bands and the explicit escalation threshold) before structuring. Never invent a band the source doesn't support; mark it for elicitation.

## Red-team posture

Off. Internal definition artifact. The coverage check and the governance reconciliation are the structural honesty gates.

## Anti-patterns to refuse

- **Scores with no defined meaning.** A 1–5 scale where the numbers are unlabelled is the exact problem this artifact exists to fix. Refuse to finalise blank bands.
- **Appetite as a slogan.** "We are risk-averse" with no threshold is decoration. Require the numeric/band line.
- **Threshold that contradicts governance.** Two different escalation thresholds in two documents guarantee a future argument. Reconcile or flag.
- **Impact measured on cost only.** Schedule, quality, and reputation impacts are real; a one-dimensional impact scale under-rates the risks that hurt most.

## Reference

- `references/risk-scale-guide.md` — default bands, matrix rubric, appetite structure, category starter set
- `ARCHITECTURE.md` §6.6 (Klaus scope)
- Klaus's principle 5 (honest probability beats false precision) — defined scales are how L×I stays honest
