---
name: pdf-update-raid
description: Append, modify, or close entries in the RAID log (Risks, Assumptions, Issues, Dependencies). Use when the user wants to log a new risk, update an existing one, close out an item, or run a RAID review.
---

# RAID update workflow

Manages `_pdf-output/engagements/{active}/04-execution/RAID.md` in place. The file has four tables plus a history section. This workflow is the only sanctioned writer of the four data tables; the history section is also written here.

## Preconditions

- `CHARTER.md` at `current_revision >= 1` (so risks/issues can reconcile to scope and constraints)

## Intent: append (default for new entries)

1. Ask which RAID dimension: Risk / Assumption / Issue / Dependency.
2. Walk the row fields:
   - **Risk:** title, owner, likelihood (1–5), impact (1–5), treatment (Treat/Tolerate/Transfer/Terminate), mitigation, residual L×I, status (open/in-mitigation/materialised/closed)
   - **Assumption:** assumption, owner, "if wrong" consequence, validation plan, status
   - **Issue:** title, owner, impact, resolution-in-progress, status (open/in-progress/closed)
   - **Dependency:** dependency, type (internal/external), owner, needed-by date, status
3. Generate the ID. Format: `R-001`, `A-001`, `I-001`, `D-001`. Increment from the highest existing ID in that table.
4. Append the row.
5. Append to History: `<date> | <Risks|Assumptions|Issues|Dependencies> | Added <ID> — <title>`.
6. Update frontmatter `last_updated`.

## Intent: update

1. Ask which ID to update.
2. Show current row. Ask which field(s) change.
3. Apply.
4. Append to History: `<date> | <section> | Updated <ID> — <one-line summary>`.

For Risks specifically: if `status` changes to `materialised`, prompt: *"This risk has materialised. Open a blocker via `pdf-triage-blocker`? Or write a mitigation plan via `pdf-create-mitigation-plan`?"*

## Intent: close

1. Ask which ID(s) to close. Multiple IDs allowed in one operation.
2. For each:
   - Set `status: closed`.
   - Append to History: `<date> | <section> | Closed <ID> — <reason>`.
3. **Sharding behaviour:** if the closed-item count in any section exceeds 20 rows, prompt the user to move closed items into `04-execution/RAID-closed.md` per architecture §19. Do not move automatically.

## Intent: validate

Checks:

- [ ] Frontmatter present and `last_updated` is recent (within 14 days)
- [ ] No row has missing required fields (per dimension)
- [ ] Every Risk has L, I, and a treatment value from the allowed set
- [ ] No Risk has `status: open` with no owner
- [ ] No Issue has `status: open` and is older than 21 days without an update note
- [ ] Every Dependency has a `needed-by` date
- [ ] All owners are named in `STAKEHOLDERS.md`
- [ ] History entries are chronological

## Intent: dump-merge

Accept paste/transcript material. Extract candidate RAID entries (risks expressed as "we might…", issues as "X is blocking", etc.). Classify per dimension. Confirm before write. Each accepted entry runs through `append` flow with audit.

## Red-team posture

Off. RAID is operational, internal.

## Reference

- `ARCHITECTURE.md` §6.4, §19 (sharding for closed items)
