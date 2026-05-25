---
name: pdf-create-raci
description: Create, update, or validate the RACI matrix. Use when the user asks to author or revise responsibility assignment, or when Marcus dispatches to RACI work.
---

# RACI workflow

Populates `_pdf-output/engagements/{active}/00-constitution/RACI.md` in place. Cross-checks every row against `STAKEHOLDERS.md`.

## Preconditions

- `CHARTER.md` must be at `current_revision >= 1`. If not, refuse: *"Charter is the constitution. Populate it first via `pdf-create-charter`."*

## Intent: create

1. **Source workstreams.** Read scope from the charter. Propose 5–10 workstreams or decision classes (e.g. "Sprint planning", "Production deploys", "Scope changes", "Quality gate sign-off", "Budget reallocation").
2. **Source people.** Read `STAKEHOLDERS.md`. Use the named people as the column-header pool.
3. **Walk row by row.** For each workstream:
   - Ask: *"For <workstream>, who is **Accountable** (exactly one)?"*
   - Then: *"Who is **Responsible** (one or more)?"*
   - Then: *"Who is **Consulted** (two-way) and **Informed** (one-way)?"*
4. **Validate as you go.** Enforce:
   - Exactly one A per row.
   - At least one R per row.
   - No name appears as both A and R on the same row.
   - Every named person exists in `STAKEHOLDERS.md`; if not, prompt to add them there first.
5. **Write the table.** Update frontmatter `last_updated`. (RACI does not use a revision counter — git history is the audit; the file is a single tabular truth.)
6. **Validate.** Run the checks under "Intent: validate" below.
7. **Hand off:** *"RACI complete. Next: pdf-create-governance."*

## Intent: update

1. Ask what changed (people, workstreams, or assignments).
2. Show affected rows. Propose diff. Confirm.
3. Apply.
4. Re-validate.
5. If a row's Accountable changes, that's significant — recommend appending a row to `decision-log.md` capturing why.

## Intent: validate

Checks:

- [ ] Exactly one A per row
- [ ] At least one R per row
- [ ] No name appears as both A and R on the same row
- [ ] Every name in RACI exists in STAKEHOLDERS.md
- [ ] Every workstream traces back to a charter scope item (warn if not)
- [ ] Frontmatter complete

Report pass/fail in the same shape as charter validation. No file write.

## Intent: dump-merge

When invoked from Marcus's dump flow, accept pre-extracted RACI candidates. Each candidate is a `(workstream, role, person)` triple. For each:

- If the workstream + role exists in the current matrix: propose update.
- If the workstream is new: propose create.
- Conflicts (e.g. two Accountables proposed for one row) are surfaced and resolved with the user before any write.

## Red-team

Default off. RACI is internal-but-foundational; if disagreement surfaces during creation, recommend `pdf-red-team` before finalising — but it is not required.

## Reference

- `ARCHITECTURE.md` §6.2 (Marcus scope)
- The 4-rule RACI discipline in Marcus's principles
