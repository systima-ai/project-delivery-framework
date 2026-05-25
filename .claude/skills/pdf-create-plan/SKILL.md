---
name: pdf-create-plan
description: Compose the engagement plan — Mermaid Gantt visualisation + phase-summary table — with milestones, dependencies, named critical path, and acceptance gates per milestone. Use when the user needs to build or update the engagement plan.
---

# Plan workflow

Produces `_pdf-output/engagements/{active}/03-planning/plan.md`. Living document with append-only change-log (same pattern as `CHARTER.md`).

**Two views always rendered side-by-side:**
1. **Mermaid Gantt** — visual; usable directly in MARP decks
2. **Phase-summary table** — dates, milestones, critical-path flag, acceptance gate

## Preconditions

- `CHARTER.md` at revision ≥ 1
- `GOVERNANCE.md` ideally populated (gate approvers live there)

## Intent: create

1. **Elicit phases.** *"What are the phases? Name and approximate start/end. Aim for 3–6 phases — fewer if simple, more only if genuinely sequential."*
2. **For each phase, elicit milestones.**
   - Title (one line)
   - Approximate date
   - Dependencies (other milestones — by ID once we generate them, or by description for now)
   - **Acceptance gate:** what signals "done", who approves, what artifact is produced
3. **Generate IDs.** Phases `P1, P2, …`; milestones `M1, M2, …`.
4. **Identify the critical path.** *"Which milestones lie on the critical path? (If you don't know, walk through them with me — anything whose slip slips the engagement end-date is on the path.)"*
5. **Compose the file:**

```markdown
---
artifact_type: plan
engagement: <slug>
status: active
current_revision: 1
last_updated: <iso>
last_updated_by: <user>
charter_revision_at_creation: <N>
---

# Engagement plan — <Engagement name>

> Living document. The plan is a hypothesis. Updates expected via `pdf-create-plan` update intent.

## Headline shape

<one paragraph: total duration, number of phases, critical-path summary>

## Visualisation

```mermaid
gantt
    title <Engagement name>
    dateFormat YYYY-MM-DD

    section <Phase 1 name>
    <Milestone>     :crit, m1, 2026-06-01, 14d
    <Milestone>     :m2, after m1, 7d

    section <Phase 2 name>
    ...
```

(Critical-path milestones use the `crit` tag; the Mermaid renderer highlights them.)

## Phase summary

| Phase | Dates | Milestones | Critical path? | Acceptance gate | Approver |
|---|---|---|---|---|---|
| P1 — <name> | <start> – <end> | M1, M2 | M2 | <gate description> | <name from GOVERNANCE> |
| P2 — <name> | <start> – <end> | M3 | — | <gate description> | <name> |
| ... | | | | | |

## Milestones (detail)

### M1 — <title>

- **Phase:** P1
- **Date:** <YYYY-MM-DD> (± <range>)
- **Critical path:** yes / no
- **Acceptance gate:** <what marks this done>
- **Approver:** <name from GOVERNANCE>
- **Produces:** <artifact path or "none">
- **Depends on:** <milestone IDs or "none">

(Repeat per milestone.)

## Critical path

The named critical path: M2 → M3 → M5 → M8 → M10.

Slips on these directly slip the engagement end-date. Off-path slips have float, named per milestone above.

## Risks to the plan

(Cross-reference to RAID risks tagged plan-affecting.)

- R-NNN: <title> (impact: which milestone)
- ...

---

## Change log

| Rev | Date | Author | Section | Change | Trigger | Approved by |
|---:|---|---|---|---|---|---|
| 1 | <date> | <user> | All | Initial plan | <charter rev <N> mobilization complete> | <approver> |
```

6. **Validate before write** — run the validate intent inline, report failures, give the user a chance to fix.
7. **Hand off:** next required artifact is `pdf-create-capacity-plan`.

## Intent: update

Same diff-and-confirm as charter:

1. Ask what changed (dates, scope, milestones, critical path).
2. Show current state of affected sections.
3. Propose diff. Confirm.
4. Bump `current_revision`. Append change-log row.
5. Re-validate.
6. If end-date changes, recommend `pdf-create-change-request` (Klaus) — material changes to end-date are change requests, not silent plan updates.

## Intent: validate

- [ ] Frontmatter complete; revision monotonic with change-log
- [ ] Mermaid block parses (basic check: `gantt`, `dateFormat`, at least one `section`, at least one task)
- [ ] Every milestone in the Gantt appears in the phase-summary table
- [ ] Every milestone in the table appears in the Milestones detail section
- [ ] Every milestone has an acceptance gate (Petra's principle 2)
- [ ] Every approver name exists in STAKEHOLDERS.md
- [ ] Critical path is named explicitly in the "Critical path" section (Petra's principle 6)
- [ ] No "TBD" dates on critical-path milestones

## Intent: dump-merge

Accept a paste/file (prior plan, project schedule, vendor schedule). Extract phases / milestones / dates / dependencies. Show proposed structure; confirm; populate.

## Red-team posture

Off. Plans are working documents; `pdf-challenge-estimate` is the place to attack plan durations.

## Reference

- `ARCHITECTURE.md` §6.3, §9 (living-document pattern)
- Petra's principles 1, 2, 6
