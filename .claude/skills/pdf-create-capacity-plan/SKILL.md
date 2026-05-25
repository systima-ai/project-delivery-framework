---
name: pdf-create-capacity-plan
description: Compose the capacity plan — team shape over time, in both a roles × months matrix (visual) and a long-form rows view (git-friendly). Both views stay in sync. Use when the user needs to plan team capacity, ramp, or staffing curves.
---

# Capacity plan workflow

Produces `_pdf-output/engagements/{active}/03-planning/capacity-plan.md`.

**Two views kept in sync:**
1. **Matrix** — Roles (rows) × Months (columns), FTE per cell. Human-editable, visually scannable.
2. **Rows** — One row per `(role, month, FTE)` tuple. Git-diff-friendly. Derived from the matrix on every write.

The matrix is the **canonical** source of truth (what the user edits); the rows are derived. Validation checks they reconcile.

## Preconditions

- `CHARTER.md` at revision ≥ 1
- `03-planning/plan.md` at revision ≥ 1 (capacity follows the plan's phase shape)

## Intent: create

1. **Read the plan.** Extract phase boundaries and month range.
2. **Elicit roles.** *"What roles do you need? Standard set: Delivery Manager, Tech Lead, Senior Engineer, Engineer, QA Lead, QA Engineer, BA, Designer, DevOps. Add or remove."*
3. **Walk the matrix month by month.** For each month in scope:
   - *"For <month>, what FTE per role?"*
   - Accept decimals (0.5 FTE = half-time).
4. **Optionally apply curves.** *"Want me to apply a ramp-up or ramp-down curve to any role? (e.g. tech lead 1.0 throughout, engineers ramp 0.5 → 2.0 → 2.0 → 1.0 over 4 months.)"*
5. **Compute totals.** Per-role total (FTE-months) and per-month total.
6. **Derive the rows view** from the matrix. One row per non-zero cell.
7. **Compose:**

```markdown
---
artifact_type: capacity-plan
engagement: <slug>
status: active
current_revision: 1
last_updated: <iso>
last_updated_by: <user>
plan_revision_at_creation: <N>
---

# Capacity plan — <Engagement name>

> Living document. Matrix is the canonical view; rows are derived. Both must reconcile on every write.

## Headline

<one paragraph: total FTE-months, peak month, key roles>

## Capacity — matrix (canonical)

| Role | <Mon1> | <Mon2> | <Mon3> | ... | Total (FTE-months) |
|---|---:|---:|---:|---|---:|
| Delivery Manager | 0.5 | 0.5 | 0.5 | ... | <total> |
| Tech Lead | 1.0 | 1.0 | 1.0 | ... | <total> |
| Senior Engineer | 1.0 | 2.0 | 2.0 | ... | <total> |
| ... | | | | | |
| **Per-month total** | <t1> | <t2> | <t3> | ... | **<grand total>** |

## Capacity — rows (derived from matrix; git-friendly)

| Role | Month | FTE |
|---|---|---:|
| Delivery Manager | 2026-06 | 0.5 |
| Delivery Manager | 2026-07 | 0.5 |
| Tech Lead | 2026-06 | 1.0 |
| ... | ... | ... |

## Ramp notes

<paragraph or bullets describing intentional ramps or known transitions>

## Reconciliation check

- Matrix grand total: <N> FTE-months
- Rows sum: <N> FTE-months
- ✓ match  /  ✗ mismatch — investigate

## Roles → STAKEHOLDERS

<bullet list mapping role to a named individual where known; "unfilled" or "tbd" where not>

---

## Change log

| Rev | Date | Author | Section | Change | Trigger | Approved by |
|---:|---|---|---|---|---|---|
| 1 | <date> | <user> | All | Initial capacity plan | Plan rev <N> approved | <approver> |
```

8. **Validate.** Matrix and rows must reconcile to the FTE-month.
9. **Hand off:** `pdf-create-budget-baseline` (which needs capacity × rates).

## Intent: update

1. Ask what changed (added role, changed FTE in a cell, extended timeline).
2. Edit the matrix in place; re-derive the rows view.
3. Re-validate reconciliation.
4. Bump revision; append change-log.
5. If grand-total FTE-months changes by > 10%, recommend updating `pdf-create-budget-baseline`.

## Intent: validate

- [ ] Matrix and rows reconcile (every non-zero matrix cell appears as a row; sum matches)
- [ ] Frontmatter complete; revision monotonic
- [ ] No negative FTE values
- [ ] No FTE > 5.0 per role per month without a comment (sanity guard)
- [ ] Per-month totals match the sum of role columns
- [ ] Per-role totals match the sum of month rows
- [ ] Every named role is either filled with a named person or marked "unfilled/tbd"

## Intent: dump-merge

Accept dumped material (a CSV, a paste, a prior capacity sheet). Try to parse it into the matrix shape; confirm parsing before write.

## Red-team posture

Off. Operational. If capacity is being challenged adversarially, use `pdf-challenge-estimate` on the capacity numbers.

## Reference

- `ARCHITECTURE.md` §6.3
- Petra's principle 3 (capacity and budget reconcile)
