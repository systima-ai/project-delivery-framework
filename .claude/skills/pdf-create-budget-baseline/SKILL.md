---
name: pdf-create-budget-baseline
description: Compose the budget baseline — both monthly cash-flow view (T&M-aligned) and milestone payment-schedule view (FP-aligned), reconciled to the same total. Use when the user needs to establish or update the budget baseline.
---

# Budget baseline workflow

Produces `_pdf-output/engagements/{active}/03-planning/budget-baseline.md`. Living document with append-only change-log.

**Two views generated side-by-side, reconciled to the same grand total:**
1. **Monthly view** — cash-flow shape; what costs accrue each month. Useful for T&M engagements and for forecasting client invoice cadence.
2. **Milestone view** — payment schedule tied to plan milestones. Useful for fixed-price engagements and for client AP planning.

Reconciliation check is enforced: monthly total must equal milestone total. The check is the **whole point** of having both views.

## Preconditions

- `pdf-create-plan` complete (need milestones with dates and acceptance gates)
- `pdf-create-capacity-plan` complete (need capacity × rates to compute monthly cost)
- Day-rates per role available — either from `_pdf-output/engagements/{active}/.pdf-config.toml` (preferred) or elicited and written there on first run

## Intent: create

1. **Source.** Read plan (milestones + dates), capacity plan (matrix), engagement config (rates).
2. **Resolve rates.** If `.pdf-config.toml` has `[rates]` section with role → day-rate, use it. Otherwise elicit: *"For each role in the capacity plan, what's the day-rate (£/day)? You can give a single rate or a range."*
3. **Compute monthly costs.** For each (role, month, FTE) tuple: cost = FTE × working-days-in-month × day-rate. Sum per month.
4. **Define milestones for payment.** *"Which milestones trigger client payments, and at what proportion of total? Total must sum to 100% (or less, if part of the engagement is unfunded retainer)."*
5. **Compute milestone amounts.** Apply proportions to grand total.
6. **Reconcile.** Monthly total must equal milestone total. If not, the workflow refuses to write and prompts the user to fix the proportions.
7. **Compose:**

```markdown
---
artifact_type: budget-baseline
engagement: <slug>
status: active
current_revision: 1
last_updated: <iso>
last_updated_by: <user>
plan_revision_at_creation: <N>
capacity_revision_at_creation: <N>
grand_total: <£N>
currency: GBP
---

# Budget baseline — <Engagement name>

> Living document. Two views, one grand total. Reconciliation is enforced on every write.

## Headline

- **Grand total:** £<N>
- **Period:** <start> to <end>
- **Commercial model:** <T&M | FP | hybrid> (from charter)

## Monthly view (cash-flow / T&M)

| Month | Cost (£) | Cumulative (£) | Notes |
|---|---:|---:|---|
| 2026-06 | <amount> | <cum> | <e.g. partial ramp> |
| 2026-07 | <amount> | <cum> | |
| ... | | | |
| **Total** | **<grand>** | | |

## Milestone view (payment schedule / FP)

| Milestone | Date | Proportion | Amount (£) | Cumulative (£) | Acceptance gate |
|---|---|---:|---:|---:|---|
| M2 | <date> | 20% | <amount> | <cum> | <gate from plan> |
| M5 | <date> | 30% | <amount> | <cum> | <gate> |
| ... | | | | | |
| **Total** | | **100%** | **<grand>** | | |

## Reconciliation

| View | Total |
|---|---:|
| Monthly | £<N> |
| Milestone | £<N> |
| **Match?** | ✓ / ✗ |

(If ✗, the workflow refused to write. Reconciliation failure is fatal.)

## Rates used

| Role | Day-rate (£) | Source |
|---|---:|---|
| Delivery Manager | <rate> | .pdf-config.toml |
| Tech Lead | <rate> | .pdf-config.toml |
| ... | | |

## Assumptions

<bullets — working days per month (default 20), VAT treatment, ramp-up/down assumptions, currency hedging if relevant>

---

## Change log

| Rev | Date | Author | Section | Change | Trigger | Approved by |
|---:|---|---|---|---|---|---|
| 1 | <date> | <user> | All | Initial baseline | Capacity plan rev <N> approved | <approver> |
```

8. **Validate.** Reconciliation must pass.
9. **Hand off:** typically nothing required next at this stage; Petra's primary outputs are now complete. Recommend `pdf-help` for the next stage.

## Intent: update

1. Ask what changed (rates, milestones, capacity, scope).
2. Recompute affected view(s).
3. Re-run reconciliation. **Refuse to finalise if it fails.**
4. Bump revision; append change-log.
5. If grand total changes by > 5%, recommend `pdf-create-change-request` (Klaus) — material budget changes route through the change-request process.

## Intent: validate

- [ ] Monthly total = Milestone total (reconciliation check — hard fail if not)
- [ ] Frontmatter `grand_total` matches both totals
- [ ] Every milestone in the payment schedule appears in the plan with the same date
- [ ] Every role in rates exists in the capacity plan
- [ ] Milestone proportions sum to 100% (or explicitly declared <100% with "unfunded retainer" or similar note)
- [ ] Currency declared
- [ ] Frontmatter complete; revision monotonic

## Intent: dump-merge

Accept dumped material (vendor quote, internal baseline spreadsheet). Try to map to monthly + milestone shapes; flag any ambiguity (e.g. paste lacks milestone dates) and elicit the missing pieces before writing.

## Red-team posture

Off — but the reconciliation check is functionally an automated honesty check. If the user is overriding the check, the workflow refuses without an explicit `--allow-mismatch` flag in `customize.toml` (off by default; turning it on requires a written reason in frontmatter).

## Anti-patterns to refuse

- **Monthly and milestone totals that don't match.** Refuse. This is Petra's principle 3 enforced structurally.
- **Day-rates buried in narrative rather than in a table.** Validate rejects.
- **"VAT to be confirmed".** VAT treatment is a charter-level assumption; if unclear, route to Marcus to clarify.

## Reference

- `ARCHITECTURE.md` §6.3
- Petra's principle 3 (capacity and budget reconcile)
