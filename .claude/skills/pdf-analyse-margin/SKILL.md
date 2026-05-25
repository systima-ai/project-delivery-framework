---
name: pdf-analyse-margin
description: Compute and analyse engagement margin in two views — per-period (monthly, rolling) and per-milestone (event-driven, useful for fixed-price). User picks view at invocation. Use to track margin trajectory or interrogate a specific milestone's profitability.
---

# Margin analysis workflow

Produces files under either:
- **Per-period:** `08-commercial/margin-analyses/period/<YYYY-MM>.md`
- **Per-milestone:** `08-commercial/margin-analyses/milestone/<M-NNN>.md`

**Two views, one workflow.** The user picks at invocation. Same underlying calculation; different denominators and different cadences.

## Preconditions

- `pdf-create-budget-baseline` complete
- `pdf-track-budget` has at least one period of actuals for per-period view
- `pdf-create-plan` complete for per-milestone view (need milestone IDs)

## Intent: create

1. **Ask view.** *"Per-period (monthly) or per-milestone? [period / milestone]"*

2. **Identify the unit.**
   - Period: which month? (Default: most recent month with a monthly close.)
   - Milestone: which milestone ID? (List milestones from the plan if user doesn't know.)

3. **Source the numbers.**
   - Revenue earned this period / for this milestone (from invoicing schedule)
   - Costs accrued (labour from capacity × rates × time; vendor from invoices; other from monthly close)
   - Any deferred costs (procurement not yet invoiced but committed)

4. **Compute.**
   - Gross margin = (revenue − cost) / revenue
   - Cumulative gross margin (for period view)
   - Margin vs target (target lives in engagement `.pdf-config.toml` as `target_gross_margin_pct`)

5. **Compose by view.**

### Per-period — format

```markdown
---
artifact_type: margin-analysis-period
engagement: <slug>
month: <YYYY-MM>
revenue: <£N>
cost: <£N>
gross_margin_pct: <X.X>
cumulative_gross_margin_pct: <Y.Y>
target_gross_margin_pct: <T.T>
generated_by: pdf-analyse-margin
---

# Margin — <YYYY-MM>

## Headline

<one sentence: above / on / below target by what>

## Numbers

| Item | This period (£) | Cumulative (£) |
|---|---:|---:|
| Revenue earned | | |
| Labour cost | | |
| Vendor cost | | |
| Other cost | | |
| **Cost total** | | |
| **Gross margin (£)** | | |
| **Gross margin (%)** | | |

## Trend

(Brief; from last 3 periods if available.)

- <month>: <%>
- <month>: <%>
- <month>: <%>

Trajectory: <improving | stable | declining>

## What's driving margin this period

<bullets — specific causes; e.g. "Rate uplift on Senior Engineer effective from this month: +£18k revenue with no cost change", "Vendor scope creep: -£12k">

## Action / forecast implication

<one paragraph if material>
```

### Per-milestone — format

```markdown
---
artifact_type: margin-analysis-milestone
engagement: <slug>
milestone_id: M-<NNN>
milestone_date: <YYYY-MM-DD>
revenue: <£N>
cost_attributable: <£N>
gross_margin_pct: <X.X>
target_gross_margin_pct: <T.T>
generated_by: pdf-analyse-margin
---

# Margin — Milestone M-<NNN> — <title>

## Headline

<one sentence: above / on / below target>

## Numbers

- **Revenue attached to milestone:** £<N>
- **Costs attributable** (labour + vendor + other, period covering the milestone work):
  - Labour: £<N>
  - Vendor: £<N>
  - Other: £<N>
  - **Total cost:** £<N>
- **Gross margin:** £<N> (<%>)
- **Vs target (<T.T>%):** <delta>

## Cost attribution method

<one paragraph explaining how costs were allocated to this milestone. Per-milestone is harder than per-period because some costs span milestones — the attribution method matters and must be auditable.>

## Comparison to other milestones (if relevant)

<one to three lines>

## What's driving margin on this milestone

<bullets — specific>

## Action / forecast implication

<one paragraph if material>
```

6. **Hand off:**
   - If margin is below target by ≥ 5 percentage points: recommend `pdf-review-commercial-model` (the model may be wrong for the current risk shape).
   - If margin is below target on a milestone that triggers a payment: recommend a Helena `pdf-write-exec-summary` (margin issues that hit invoiceable events are exec-grade material).

## Intent: update

1. Identify the analysis by date or milestone ID.
2. Update with new actuals; recompute.
3. Append `## Revisions` section.

## Intent: validate

- [ ] Frontmatter complete; view-specific field set present
- [ ] Numbers reconcile: revenue − cost = margin £
- [ ] Cost attribution method explained (especially per-milestone)
- [ ] Target margin sourced from `.pdf-config.toml` (or explicit in frontmatter with reason)
- [ ] Trajectory section populated for per-period (or marked "first period")

## Intent: dump-merge

Accept dumped numbers. Identify view (period vs milestone) from the shape. Structure into the canonical fields. Surface any allocation ambiguity for the user to resolve.

## Anti-patterns to refuse

- **Margin numbers without attribution method on a milestone analysis.** "We allocated costs to this milestone" is not an attribution method. Spell it out: pro-rata by capacity, by phase boundaries, by direct timesheet allocation.
- **Mixing views in one file.** Per-period and per-milestone files have different frontmatter and different denominators. Refusing the mix prevents misleading comparisons.

## Red-team posture

Off. But: margin numbers that reach exec audiences flow through Helena's `pdf-write-exec-summary`, which red-teams them downstream.

## Reference

- `ARCHITECTURE.md` §6.8
- Theo's principle 2 (margin is the trailing indicator that matters most)
