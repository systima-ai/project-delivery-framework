---
name: pdf-closure-checklist
description: Engagement-closeout checklist with a strict operational core (deliverables, IP, access, invoicing) and optional relational extensions (references, NPS, future opportunities). Use when an engagement is being wound up.
---

# Closure checklist workflow

Produces `_pdf-output/engagements/{active}/10-closure/closure-checklist.md`. Single living document.

**Structure:** strict operational core (must-complete) + optional commercial and relational extensions (opt-in). Per design choice (operational core strict + relational opt-in).

## Preconditions

- `CHARTER.md` at revision ≥ 1
- Engagement is in wind-down (or imminently) — Felix does not police this; the workflow runs whenever invoked

## Intent: create

1. **Confirm wind-down state.** *"Where is the engagement: final delivery imminent, just delivered, in handover, or fully closed-out?"* Records this; affects which sections apply.
2. **Walk the operational core (strict; all items required).**
   - **Deliverables signed off.** Every deliverable in the SoW / plan has a signed acceptance.
   - **IP transferred.** Code, designs, documents transferred per the SoW IP clause.
   - **Access revoked.** Team's access to client systems removed; client's access to your systems (if any) removed.
   - **Final invoiced.** All milestone or T&M amounts billed; outstanding receivables tracked.
   - **Knowledge transferred.** Documented; received by named recipient(s).
   - **Repos archived.** Source code archived per agreement; commit history preserved.
   - **Environments decommissioned.** Cloud accounts, dev/staging environments, any sub-contractor accounts.
   - **Support handed over.** Support model (if any) running with the named ongoing party.
   - **Decision-log frozen.** No further decisions appended; final state preserved.
   - **RAID closed.** All open Risks / Issues either closed or transferred to the BAU owner.

3. **Offer the relational extensions (opt-in).** *"Would you like to include the relational closure items? (Optional but recommended for repeat-business potential.)"*
   - **Commercial reconciliation.** Final margin reviewed; any credits / debits agreed.
   - **Change orders settled.** All CRs / COs in a closed state.
   - **Reference requested.** From the named champion or sponsor; logged.
   - **NPS / feedback captured.** From the client sponsor; on the record.
   - **Future-opportunity flagged.** Any spotted during the engagement; logged separately.
   - **Alumni outreach.** Client contacts added to alumni network (if your firm has one).
   - **Retrospective shared with client.** The client-shareable retro variant has been sent.

4. **Compose:**

```markdown
---
artifact_type: closure-checklist
engagement: <slug>
date: <YYYY-MM-DD>
wind_down_state: <imminent | just-delivered | in-handover | closed>
relational_extensions_included: <yes | no>
completion_pct: <N>
generated_by: pdf-closure-checklist
---

# Closure checklist — <Engagement name>

> Strict operational core + optional relational extensions. Operational items must all be ticked before engagement is considered closed.

## Operational core (required)

- [ ] Deliverables signed off — evidence: <path or "none">
- [ ] IP transferred — date: <YYYY-MM-DD>; method: <description>
- [ ] Access revoked — date: <YYYY-MM-DD>; verified by: <name>
- [ ] Final invoiced — INV-<NNN>; outstanding receivables: £<N>
- [ ] Knowledge transferred — recipient(s): <names>; method: <docs / sessions / both>
- [ ] Repos archived — location: <archive location>
- [ ] Environments decommissioned — list: <items>
- [ ] Support handed over — owner: <name>; effective: <date>
- [ ] Decision-log frozen — final state preserved at: <path>
- [ ] RAID closed — all rows status `closed` or `transferred to BAU`

**Operational completion:** <N>/<10>

## Relational extensions (optional)

(Section omitted if user chose `no`. Otherwise:)

- [ ] Commercial reconciliation — margin: <%>; outstanding adjustments: <N>
- [ ] Change orders settled — count: <N>; all signed and applied
- [ ] Reference requested — from: <name>; status: <pending / received / declined>
- [ ] NPS / feedback captured — score: <N/10>; verbatim: <link>
- [ ] Future opportunities flagged — entered in: <CRM or doc path>
- [ ] Alumni outreach — contacts added: <count>
- [ ] Retrospective shared with client — date sent: <YYYY-MM-DD>; recipients: <names>

**Relational completion:** <N>/<7>

## Outstanding items

(Anything blocking closure. Each: item, owner, target close date.)

- <item> — owner: <name> — target: <date>

## Sign-off

When all operational items are ticked:

- Engagement formally closed as of: <YYYY-MM-DD>
- Confirmed by: <name>
- Final reference path for any future reactivation: <archive path>

---

## History

- <date> — Checklist created.
- <date> — <items ticked>; <items remaining>.
```

5. **Cross-skill side effects.**
   - Once operational core is 100%: offer `pdf-run-retrospective` if not done; offer `pdf-create-case-study` if relational extensions are included.
   - "Reference requested" tick → log in `decision-log.md` with date and named contact.
   - "Future opportunities flagged" → recommend (privately) running `pdf-qualify-opportunity` against each in a separate engagement folder when ready.

6. **Write.**

## Intent: update

1. Identify by engagement (single file per engagement).
2. Tick items as completed; record dates and named verifiers.
3. Update `completion_pct` in frontmatter.
4. The History section appends.

## Intent: validate

- [ ] All 10 operational items present
- [ ] Every ticked operational item has the evidence / date / name fields populated (no blank ticks)
- [ ] Wind-down state is named
- [ ] If `wind_down_state` is `closed`: all 10 operational items must be ticked (validation fails otherwise)
- [ ] If relational extensions included: all 7 items present (ticked or unticked)
- [ ] Outstanding items table: each row has owner and target date

## Intent: dump-merge

Accept dumped material (handover briefing, closure email, final report). Identify which checklist items the material confirms; surface gaps; let user tick.

## Anti-patterns to refuse

- **Ticked items without evidence / date / name.** Refuse. A bare tick is a wish.
- **`wind_down_state: closed` with operational items unticked.** Refuse. The state and the checklist must reconcile.
- **Final-invoiced ticked with outstanding receivables > 0.** Flag — "invoiced" is not the same as "paid"; the receivables field should be 0 or there's an open commercial item.

## Red-team posture

Off. Operational checklist.

## Reference

- `ARCHITECTURE.md` §6.10
- Felix's principle 1 (closure compounds)
