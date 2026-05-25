---
name: pdf-create-change-order
description: Price an approved change request and produce the change-order document — the commercial wrapper for a CR, intended for client commercial counterpart signature. On-demand only; never auto-triggered. Updates the budget baseline if signed. Use after a CR has been approved and you're ready to commit to the £.
---

# Change order workflow

Produces `_pdf-output/engagements/{active}/08-commercial/change-orders/<YYYY-MM-DD>-CO-<NNN>-<slug>.md`.

A change order is the **commercial wrapper around an approved change request.** Klaus's `pdf-create-change-request` produces the substantive CR (what's changing and why); Theo's change order prices it (the £, the milestone-schedule impact, the payment-schedule impact, the commercial terms).

This workflow is **on-demand only.** The cross-skill offer fires from `pdf-create-change-request` when Commercial dimension > minor, but the user explicitly invokes Theo. No silent chaining: change orders are signature documents and the user must consciously initiate them.

## Preconditions

- A `pdf-create-change-request` with status `approved` (or `in-review` with explicit user intent to draft the CO in parallel — flagged in frontmatter)
- `pdf-create-budget-baseline` exists

## Intent: create

1. **Identify the source CR.** *"Which change request? CR-NNN."* If unknown, list CRs with `status: approved` and Commercial dimension > minor.
2. **Read the CR.** Pull granular impact (especially Commercial), the recommended option, and the approver routing.
3. **Generate CO ID.** Format `CO-<NNN>`, monotonic from highest existing.
4. **Walk pricing.**
   - *"What is the additional cost (one-off)?"* — accept a range if exact figure pending
   - *"What is the additional run-rate cost (per period, if any)?"* — for ongoing changes
   - *"Are existing milestone amounts changing? If so, which?"*
   - *"Are payment-schedule dates changing? If so, how?"*
5. **Walk commercial terms.**
   - *"What's the commercial model for this change — same as the engagement's existing model, or different?"* (E.g. main engagement is FP but this CO is T&M for an exploratory phase.)
   - *"Any pass-through costs to handle?"*
   - *"VAT treatment — same as baseline, or different?"*
6. **Walk approvers.**
   - Client commercial signatory (single named individual)
   - Internal commercial approver (e.g. account director, sponsor)
   - Effective-from date
7. **Compose:**

```markdown
---
artifact_type: change-order
engagement: <slug>
id: CO-<NNN>
linked_cr: CR-<NNN>
date: <YYYY-MM-DD>
status: draft
effective_from: <YYYY-MM-DD>
generated_by: pdf-create-change-order
red_teamed: false
client_signatory: <name>
internal_approver: <name>
---

# Change order — CO-<NNN> — <title>

**Linked CR:** CR-<NNN>
**Status:** draft → in-review → signed → applied
**Effective from:** <date>

## What is changing (commercial summary)

<one paragraph; for full substance, see the CR>

## Pricing

| Item | Amount (£) | Notes |
|---|---:|---|
| One-off addition | | |
| Per-period addition | | (if any) |
| Milestone amount changes | | (if any) |
| **Net change to baseline grand total** | | |

## Schedule

| Milestone | Previous date | Revised date | Previous amount (£) | Revised amount (£) |
|---|---|---|---:|---:|
| (only milestones affected by this CO) | | | | |

## Commercial terms

- **Model for this change:** <T&M | FP | Capacity | Outcome>
- **VAT:** <same as baseline | different — specify>
- **Pass-through costs:** <list or "none">
- **Payment terms:** <same as baseline | different — specify>
- **Currency:** <same as baseline | different>

## Approvers

| Role | Name | Status | Date |
|---|---|---|---|
| Client commercial signatory | | pending | — |
| Internal commercial approver | | pending | — |

## Cross-references

- Linked change request: `06-risk-change/change-requests/<file>`
- Affected budget baseline: `03-planning/budget-baseline.md` rev <N>
- Will trigger budget-baseline update on signature: yes / no

---

## History

- <date> — Drafted (status: draft).
```

8. **Run simulated red-team inline:**
   - *Is every commercial dimension of the underlying CR priced explicitly, or buried?*
   - *Is the "Net change to baseline" line honestly computed (including run-rate effects, not just one-offs)?*
   - *Are pass-through costs separated from your margin? A change order that absorbs pass-throughs into the headline price is dishonest.*
   - *Does the effective-from date align with when work will actually start?*
   - *Are both signatories named and contactable?*
9. **Write the file.** Status `draft`.
10. **Hand off:**
    - If status is `signed`, trigger `pdf-create-budget-baseline` update intent (cross-skill side effect — updates baseline grand total and milestone schedule).
    - Otherwise, return to Theo's menu.

## Intent: update

1. Identify CO by ID.
2. Common transitions: draft → in-review → signed → applied (or → rejected).
3. Each status change gets a row in `## History` with date and one-line note.
4. On `signed`: prompt to update the budget baseline. The update is **not silent** — the workflow walks the user through the baseline update intent.
5. On `rejected`: log the rejection reason; the linked CR may need re-work.

## Intent: validate

- [ ] Frontmatter complete; `id` matches filename; `linked_cr` resolves to a real CR
- [ ] Linked CR's Commercial dimension is at least `minor` (else this CO is unnecessary)
- [ ] Pricing table reconciles: net change = sum of one-offs + cumulative per-period over remaining engagement
- [ ] If milestone amounts change, schedule table reflects all affected milestones
- [ ] Client signatory and internal approver both named
- [ ] Effective-from date is a real date, ≥ today
- [ ] Frontmatter `red_teamed: true` before status moves beyond `draft`

## Intent: dump-merge

Accept dumped commercial material (client email, finance proposal, vendor quote). Try to match to a CR; if none, prompt the user to create the CR first via Klaus. Once matched, extract pricing into the canonical structure.

## Anti-patterns to refuse

- **Change orders without a CR.** Refuse. Every CO must point at an approved or in-review CR. If the user has a commercial change without a substantive CR, they create the CR first (route to Klaus).
- **Bundled COs covering multiple unrelated CRs.** Refuse. One CO per CR. Bundling obscures attribution and damages the audit trail.
- **Absorbing pass-through costs into the headline.** Validation catches this if the user names a pass-through in conversation but it doesn't appear in the table.
- **Verbal commitments to client commercial without a CO.** This is a process failure outside PDF's reach; Theo can only refuse to file a CO retroactively without a documented commercial conversation.

## Red-team posture

**Default ON.** This is a signature document. Cost of error is high; cost of inline red-team is low.

## Reference

- `ARCHITECTURE.md` §6.8, §16
- Theo's principle 3 (COs price the commercial dimension, not the substance)
- Klaus's `pdf-create-change-request` for the upstream CR
