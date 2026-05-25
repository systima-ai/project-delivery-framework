---
name: pdf-track-budget
description: Track burn against baseline at two cadences — weekly snapshot (fast feedback) and monthly close (formal reconciliation). One file per period. Use when the user wants to log the current period's burn or run the monthly close.
---

# Budget tracker workflow

Produces files under either:
- **Weekly:** `08-commercial/budget-tracker/weekly/<YYYY-Www>.md`
- **Monthly:** `08-commercial/budget-tracker/monthly/<YYYY-MM>.md`

**Cadence is explicit at invocation.** Both cadences coexist in the same engagement; they are not alternatives but complementary. Weekly is for fast feedback (caught early, fixed cheap); monthly is the formal close with full variance analysis.

## Preconditions

- `pdf-create-budget-baseline` complete

## Intent: create (cadence-aware)

1. **Ask cadence.** *"Weekly snapshot or monthly close? [weekly / monthly]"*
2. **Determine period.** Weekly default = current ISO week; monthly default = previous calendar month (closes are retrospective by one month).
3. **Source actuals.**
   - From timesheets: paste path or paste raw data.
   - From an accruals memo: paste path or paste raw data.
   - From the user inline: ask for this period's actuals by role or by phase.
   - Mixed is fine.
4. **Read baseline.** Pull the planned figure for the period from `pdf-create-budget-baseline`.
5. **Compute variance.** `(actual - planned) / planned`. Express as currency and as %.
6. **Compose by cadence.**

### Weekly snapshot — format

```markdown
---
artifact_type: budget-tracker-weekly
engagement: <slug>
week: <YYYY-Www>
period_start: <date>
period_end: <date>
baseline_revision: <N>
generated_by: pdf-track-budget
---

# Budget tracker — <YYYY-Www> weekly snapshot

**Headline:** <one sentence; e.g. "On track" / "£12k overspend this week, traceable to vendor scope" / "Under-burn this week — ramp delayed">

## Numbers

- Planned this week:    £<N>
- Actual this week:     £<N>
- Variance:             £<N> (<+/-%>)
- Cumulative planned:   £<N>
- Cumulative actual:    £<N>
- Cumulative variance:  £<N> (<+/-%>)

## What's driving variance

<bullets — specific causes, not "team velocity">

## Forecast revision

<one paragraph if material; "no revision" otherwise>

## Asks

- <from finance, ops, or sponsor — what data or decision is needed>

---

_Source data: <paths or "inline">. Reconciles to baseline rev <N>._
```

### Monthly close — format

```markdown
---
artifact_type: budget-tracker-monthly
engagement: <slug>
month: <YYYY-MM>
baseline_revision: <N>
generated_by: pdf-track-budget
red_teamed: false
---

# Budget tracker — <YYYY-MM> monthly close

## Headline

<one paragraph: actuals vs planned, key variances, forecast position>

## Reconciliation

| Item | Planned (£) | Actual (£) | Variance (£) | Variance (%) | Notes |
|---|---:|---:|---:|---:|---|
| Labour | | | | | |
| Vendor | | | | | |
| Other | | | | | |
| **Total this month** | | | | | |
| **Cumulative to date** | | | | | |
| **Remaining baseline** | | | | | |
| **Forecast to complete** | | | | | |
| **EAC vs baseline** | | | | | |

## Variance analysis

For every line with variance ≥ ±5%:

### <Line item>

- **Variance:** £<N> (<+/-%>)
- **Cause:** <named>
- **One-time or run-rate:** <one-time | run-rate>
- **Implication for forecast:** <one line>
- **Action taken or proposed:** <one line>

## Margin position (from this period)

(Brief; full margin analysis goes in `pdf-analyse-margin`.)

- Current period margin: <%>
- Cumulative margin: <%>
- Margin vs target: <delta>

## Forecast revision

<one paragraph; if revising, name what changed>

## Cash flow note

- Invoiced this month: £<N>
- Outstanding receivables: £<N>
- Expected next 30 days: £<N>

## Asks

- <to finance / sponsor / client commercial>

---

_Reconciles to baseline rev <N>. Source: <paths>. Audit-log: <iso-timestamp>._
```

7. **Validate.** Run validate intent inline.
8. **Hand off:**
   - On weekly: if variance > 10% in either direction, recommend `pdf-analyse-margin` (period).
   - On monthly close: recommend `pdf-analyse-margin` (period); if forecast revision is material, recommend `pdf-create-change-request` (Klaus).

## Intent: update

1. Identify the period file.
2. Common updates: late-arriving actuals, accrual corrections, recategorisation.
3. Append a `## Revisions` section recording what changed and why.
4. Re-run variance computation.

## Intent: validate

- [ ] Cadence frontmatter (`budget-tracker-weekly` or `budget-tracker-monthly`)
- [ ] Period identifier matches filename
- [ ] Numbers reconcile (planned, actual, variance all consistent)
- [ ] **Monthly only:** every line item with ≥ ±5% variance has a variance-analysis subsection
- [ ] Baseline revision is current (not stale)
- [ ] Source data paths or "inline" declared

## Intent: dump-merge

Accept dumped material (timesheet CSV, finance email with numbers, ad-hoc actuals). Identify period and cadence; classify costs into labour / vendor / other; compute variance; present plan; confirm; write.

## Red-team posture

Off. Internal operational tracking. Numbers reaching exec audiences come via Helena's exec summary, which red-teams downstream.

## Reference

- `ARCHITECTURE.md` §6.8
- Theo's principle 1 (burn vs baseline is the only honest measure)
