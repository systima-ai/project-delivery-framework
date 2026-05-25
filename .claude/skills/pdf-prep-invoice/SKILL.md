---
name: pdf-prep-invoice
description: Produce the invoice backup pack — timesheets reconciled, milestone evidence collected, variance explained, audit-ready. The invoice itself is downstream (Finance system); this workflow produces the supporting documentation. Use when an invoice is due.
---

# Invoice prep workflow

Produces `_pdf-output/engagements/{active}/08-commercial/invoices/<YYYY-MM-DD>-INV-<NNN>.md`. **One file per invoice.** The backup pack — the audit-defensible evidence that justifies the amount being invoiced.

**Scope:** the backup pack only. The invoice itself goes through Finance's system. PDF's job is to ensure the supporting evidence is collected, reconciled, and traceable.

Theo's principle 5 is the constraint: invoices reconcile to evidence; the backup is the artifact.

## Preconditions

- `pdf-create-budget-baseline` complete (need invoice schedule)
- `pdf-track-budget` monthly close for the relevant period(s) (or T&M actuals available)

## Intent: create

1. **Identify the invoice.**
   - *"What invoice are we preparing backup for? (Milestone-based: which milestone? Period-based: which month?)"*
   - Generate `INV-<NNN>` if monotonic numbering; otherwise accept the client's invoice number.
2. **Determine model.** Read from charter / baseline. The backup pack shape differs:
   - **Milestone (FP):** evidence is acceptance-gate proof for the milestone (sign-offs, deliverables, test results)
   - **Period (T&M):** evidence is timesheet reconciliation for the period
   - **Mixed:** both
3. **Source the evidence.**
   - For T&M: ask for timesheet path / paste timesheet data. Need: name, role, hours, date, project code, optionally task.
   - For FP: ask for acceptance evidence — signed approval emails, gate sign-off, deliverable file paths.
   - For pass-throughs: vendor invoices, expense receipts (paths suffice; PDF doesn't store the source documents).
4. **Reconcile.**
   - T&M: sum hours × rates → expected invoice amount; compare to planned for the period.
   - FP: confirm milestone is signed off; confirm milestone amount matches baseline (or has been adjusted via a signed CO).
   - Pass-throughs: sum and categorise.
5. **Compose:**

```markdown
---
artifact_type: invoice-backup-pack
engagement: <slug>
invoice_id: INV-<NNN>
date: <YYYY-MM-DD>
period_or_milestone: <YYYY-MM | M-NNN>
invoice_amount_gross: <£N>
invoice_amount_net: <£N>
vat: <£N>
currency: GBP
commercial_model_for_this_invoice: <T&M | FP | Pass-through | Mixed>
baseline_revision: <N>
generated_by: pdf-prep-invoice
---

# Invoice backup pack — INV-<NNN>

## Headline

| Item | Value |
|---|---:|
| Net amount | £<N> |
| VAT | £<N> |
| Gross amount | £<N> |
| Period / milestone | <YYYY-MM or M-NNN> |
| Reconciles to baseline rev | <N> |

## Reconciliation summary

| Component | Amount (£) | Source |
|---|---:|---|
| Labour | | Timesheet path |
| Vendor / pass-through | | Vendor invoice paths |
| Milestone payment | | Signed acceptance evidence |
| **Net total** | **<N>** | |
| VAT | | |
| **Gross total** | **<N>** | |

## Variance vs planned

- Planned this invoice: £<N>
- Actual this invoice: £<N>
- Variance: £<N> (<+/-%>)
- Cause: <one line if material; "no material variance" if not>

## Timesheet evidence (if T&M)

(For each timesheet row contributing to this invoice. If many, link the spreadsheet instead and summarise here.)

| Name | Role | Period | Hours | Rate (£/day) | Cost (£) | Source |
|---|---|---|---:|---:|---:|---|
| | | | | | | |

**Totals:**
- Total hours: <N>
- Total labour cost: £<N>

## Milestone evidence (if FP)

(For each milestone contributing to this invoice.)

### M-<NNN> — <title>

- **Acceptance gate:** <from plan>
- **Status:** signed off / pending
- **Approver:** <name>
- **Sign-off date:** <YYYY-MM-DD>
- **Sign-off evidence:** <email path / approval doc path>
- **Deliverable evidence:** <paths>
- **Milestone amount:** £<N> (per baseline rev <N>; or per CO-NNN if revised)

## Pass-through costs (if any)

| Item | Vendor / source | Amount (£) | Receipt path | Pass-through margin |
|---|---|---:|---|---:|
| | | | | (e.g. 5% admin) |

## Change orders applied

(If any signed COs are reflected in this invoice.)

- CO-<NNN>: <one-line description; amount applied; effective date>

## Pre-flight checks (Theo's audit-defensible list)

- [ ] Timesheet hours sum matches labour-cost line in reconciliation
- [ ] Each timesheet row has name, role, hours, rate, period, source
- [ ] If FP: every milestone in this invoice has signed-off evidence
- [ ] If pass-through: every line has a vendor receipt path
- [ ] Net + VAT = Gross
- [ ] Reconciliation total matches `invoice_amount_net` in frontmatter
- [ ] Variance vs planned is explained (or "no material variance" stated)
- [ ] Baseline revision is current

## Send-to-finance checklist

(For when this backup goes to the client's AP or to your Finance team.)

- Backup pack: this file
- Supporting documents: paths listed above
- Recipient: <client AP contact OR internal finance contact>
- Expected processing time: <days>
- Cross-reference: <engagement code / PO number>

---

_Generated by `pdf-prep-invoice`. Reconciles to baseline rev <N>. Source data: see paths above._
```

6. **Run the pre-flight checks inline.** Any check failing produces a clear "this needs fixing before sending" report.
7. **Hand off:**
   - If reconciliation is clean → return to Theo's menu.
   - If variance > 5% from plan → recommend `pdf-track-budget` monthly close to capture the variance properly; the backup pack references it.
   - If a milestone is unsigned but being invoiced → refuse to mark backup as `ready`; the pack stays in `draft` status until evidence is complete.

## Intent: update

1. Identify by invoice ID.
2. Common updates: late-arriving signed evidence; corrections; client query response.
3. Append `## History` section recording the change.

## Intent: validate

Pre-flight checklist above is the validation. Validation does not modify the file; it reports which boxes are unchecked and why.

## Intent: dump-merge

Accept dumped material (timesheet export, milestone sign-off email, vendor invoice). Match to an active invoice prep; surface gaps; populate canonical fields.

## Anti-patterns to refuse

- **Invoicing FP milestones without signed acceptance.** Refuse to mark `ready`. The whole point of FP is the acceptance gate; invoicing without it is contractually exposed.
- **Mixing T&M and FP without separating components.** The reconciliation table must split labour (T&M) from milestone payment (FP) from pass-throughs.
- **Pass-through markups buried in the headline.** If a pass-through has a margin uplift, it goes in its own column, not in the headline net.
- **Invoicing periods that haven't had a monthly close.** Refuse — go through `pdf-track-budget` monthly close first so variance is captured.

## Red-team posture

Off. The pre-flight checklist functions as a structural integrity check; red-team would not add value because the artifact is evidentiary, not narrative.

## Reference

- `ARCHITECTURE.md` §6.8
- Theo's principle 5 (invoices reconcile to evidence; backup is the artifact)
- Theo's principle 6 (cash flow is timing, not totals)
