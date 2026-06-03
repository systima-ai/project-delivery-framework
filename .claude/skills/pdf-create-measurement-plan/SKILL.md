---
name: pdf-create-measurement-plan
description: Compose the measurement plan — engagement measurement goals (GQM) plus a per-metric specification for each metric, each with a target, owner, data source, frequency, and a named reporting destination. Use when the user needs to define what the engagement measures and why.
---

# Measurement plan workflow

Produces `_pdf-output/engagements/{active}/03-planning/measurement-plan.md`. Living document with append-only change-log.

This is the **measurement baseline** — the sibling of the budget baseline and the capacity plan. It does not collect data; it defines **what** gets measured, **why**, **against what target**, **by whom**, and **where the number surfaces**. The collectors live elsewhere (`pdf-velocity-check`, `pdf-track-budget`, `pdf-analyse-margin`, the Quinn health cards, `pdf-team-health-check`); this plan is the single place their targets and owners are declared and reconciled to engagement goals.

**The method is Goal → Question → Metric (GQM):**

1. **Goal** — what the measurement is *for*, traced to a charter success criterion.
2. **Question** — what you'd need to know to judge the goal.
3. **Metric** — the number that answers the question, fully specified.

A metric with no goal is a vanity metric. A goal with no metric is an aspiration. The plan refuses both.

## Preconditions

- `CHARTER.md` at `current_revision >= 1` — the measurement goals trace to the charter's success criteria / objectives. If the charter has no success criteria, route to Marcus first; there is nothing to measure *toward*.
- `STAKEHOLDERS.md` populated — every metric needs a named owner who exists there.

## Intent: create

Load `references/metric-spec-guide.md` — it is the elicitation script and carries the per-metric field definitions, the GQM worked example, and the consumer-mapping table.

1. **Read the charter.** Surface its success criteria / objectives. These anchor the goals.
2. **Elicit goals (GQM top).** For each candidate goal, ask the four GQM framing fields (kept lightweight — see guide): *purpose*, *object measured*, *quality focus*, *viewpoint*. Each goal **must reference a charter success criterion by its wording**, or be explicitly tagged `operational (not charter-linked)` with a one-line reason.
3. **Derive questions.** For each goal: *"What would you need to know to tell whether this goal is being met?"* One or more questions per goal.
4. **Specify metrics.** For each question, define one or more metrics. For **every** metric, walk the mandatory spec fields:
   - **Name** (and any synonym)
   - **Definition** — what is measured and the exact formula / base measures it is computed from
   - **Target / threshold** — with direction (higher-is-better / lower-is-better / in-range) and the rationale for the number
   - **Baseline** — current value if known, or explicit `no baseline yet` (never invent one)
   - **Data source & collection method**
   - **Frequency** — how often it is collected
   - **Owner** — who collects and analyses; must be in `STAKEHOLDERS.md`
   - **Analysis procedure** — valid range, how to interpret it, and what value/trend triggers an action
   - **Reporting destination** — the PDF artifact or ritual where this number surfaces (e.g. `pdf-weekly-status`, steering pack, `pdf-track-budget`, an SDLC health card). A metric with no destination is refused: a number nobody reads is not a metric.
5. **Map to existing collectors.** For each metric, if an existing PDF workflow already produces it (velocity, burn, margin, a health-card RAG, team-health pulse), reference that workflow rather than inventing a parallel collection mechanism. The guide's consumer-mapping table lists the canonical collectors.
6. **Reconcile coverage.** Every goal must have ≥ 1 metric; every metric must trace to ≥ 1 goal. Flag any orphan on either side before writing.
7. **Compose:**

```markdown
---
artifact_type: measurement-plan
engagement: <slug>
status: active
current_revision: 1
last_updated: <iso>
last_updated_by: <user>
charter_revision_at_creation: <N>
metric_count: <N>
goal_count: <N>
---

# Measurement plan — <Engagement name>

> Living document. Defines what the engagement measures and why. Targets and
> owners declared here; collection happens in the named collector workflows.

## Measurement goals

| # | Goal (GQM) | Charter link | Viewpoint |
|---:|---|---|---|
| G1 | <purpose / object / quality focus> | <charter success-criterion wording> | <whose view> |
| G2 | ... | ... | ... |

## Goals → questions → metrics (traceability)

| Goal | Question | Metric(s) |
|---|---|---|
| G1 | <question> | M1, M2 |
| G2 | <question> | M3 |

## Metric specifications

### M1 — <metric name>

- **Answers question:** <goal/question link>
- **Definition:** <what is measured; formula; base measures>
- **Target / threshold:** <value> (<higher-is-better | lower-is-better | in-range>) — <rationale>
- **Baseline:** <value | no baseline yet>
- **Data source & collection:** <source; how collected>
- **Frequency:** <cadence>
- **Owner:** <name from STAKEHOLDERS.md>
- **Analysis procedure:** <valid range; interpretation; action trigger>
- **Reporting destination:** <PDF artifact / ritual / collector workflow>
- **Existing collector:** <pdf-velocity-check | pdf-track-budget | ... | none — collected manually>

### M2 — <metric name>

(repeat the block per metric)

## Coverage check

| Check | Result |
|---|---|
| Every goal has ≥ 1 metric | ✓ / ✗ |
| Every metric traces to ≥ 1 goal | ✓ / ✗ |
| Every metric has a target | ✓ / ✗ |
| Every metric has an owner in STAKEHOLDERS.md | ✓ / ✗ |
| Every metric has a reporting destination | ✓ / ✗ |

(Any ✗ blocks finalisation.)

## Assumptions and constraints

<bullets — data availability, tool access, sampling caveats, any metric whose
target is provisional pending a baseline>

---

## Change log

| Rev | Date | Author | Section | Change | Trigger | Approved by |
|---:|---|---|---|---|---|---|
| 1 | <date> | <user> | All | Initial measurement baseline | Charter rev <N> | <approver> |
```

8. **Validate.** Run the coverage check; any ✗ blocks the write.
9. **Hand off:**
   - Offer to flag, in each named collector's next run, the target now declared here (so e.g. `pdf-velocity-check` reports against the plan's target).
   - If a metric has `no baseline yet`, offer to set a review date by which the baseline must be established.

## Intent: update

1. Ask what changed (new goal, new/retired metric, target revision, owner change, baseline now known).
2. **Target changes are significant.** A target moved to flatter the engagement is a red flag — log the rationale and who approved it in the change-log row.
3. Re-run the coverage check. Refuse to finalise if it fails.
4. Bump revision; append change-log.
5. If a charter success criterion changed and a goal no longer traces to it, prompt to revise or retire the goal (do not leave a dangling goal).

## Intent: validate

- [ ] Frontmatter complete; revision monotonic
- [ ] Every goal links to a charter success criterion OR is tagged `operational (not charter-linked)` with a reason
- [ ] Every goal has ≥ 1 metric; every metric traces to ≥ 1 goal
- [ ] Every metric has all mandatory spec fields (no blanks, no TBC)
- [ ] Every target states a direction and a rationale
- [ ] Every baseline is a value or an explicit `no baseline yet`
- [ ] Every owner is in `STAKEHOLDERS.md`
- [ ] Every metric has a non-empty reporting destination
- [ ] Metrics that duplicate an existing collector reference it rather than re-defining collection

## Intent: dump-merge

Accept dumped material — a KPI list, an objectives-and-key-results sheet, a client's reporting requirements. Extract candidate goals and metrics; for each metric, identify which mandatory fields are present and which need elicitation. Surface the gaps (almost always: target rationale, owner, reporting destination) before structuring. Never fabricate a target or a baseline to fill a blank.

## Red-team posture

Off. Internal planning baseline. The reconciliation/coverage check is the structural honesty gate, the same role the budget baseline's reconciliation plays for Petra.

## Anti-patterns to refuse

- **Vanity metrics.** A metric with no goal link, or whose only purpose is to look good in a deck. Refuse.
- **Target with no rationale.** "95%" because it sounds right is not a target. Ask why that number.
- **Metric with no consumer.** No reporting destination means nobody reads it; it is overhead, not measurement. Refuse.
- **Invented baselines.** If the current value is unknown, the baseline is `no baseline yet` with a date to establish it — never a guessed number.
- **Re-inventing an existing collector.** If velocity, burn, or margin is already produced by a Theo/Ronan/Quinn workflow, reference it; do not define a second, divergent calculation.

## Reference

- `references/metric-spec-guide.md` — field definitions, GQM worked example, consumer-mapping table
- `ARCHITECTURE.md` §6.3 (Petra scope), §8 (artifact taxonomy)
- Petra's principle 4 (estimates are ranges, not numbers — honest precision applies to measurement too)
