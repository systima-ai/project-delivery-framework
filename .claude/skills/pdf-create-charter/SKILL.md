---
name: pdf-create-charter
description: Create, update, or validate the engagement CHARTER.md — the living constitution every other artifact reconciles to. Use when the user asks to author, revise, or check the charter, or when Marcus dispatches to charter work.
---

# Charter workflow

The charter is the engagement's constitution. This skill populates and maintains it. The file already exists as a scaffolded stub from `pdf-engagement-init` at `_pdf-output/engagements/{active}/00-constitution/CHARTER.md`. This workflow **populates the stub in place**; it does not generate a new file.

## Conventions

- The charter is a **living document with append-only change-log** (per ARCHITECTURE.md §9). Current state lives at the top of the file; the change-log table lives at the bottom.
- Every populate / update bumps `current_revision` by one and appends a new change-log row.
- Frontmatter is the source of truth for revision; the table is the source of truth for *what changed*.
- Sections are never deleted. Empty sections stay as `_(not applicable to this engagement)_`.

## On Activation

1. **Resolve active engagement.** Read `ACTIVE_ENGAGEMENT`. Confirm `00-constitution/CHARTER.md` exists. If missing, recommend `pdf-engagement-init` and stop.
2. **Detect intent.** Read the charter's frontmatter:
   - `current_revision: 0` → intent is **create** (populate stub)
   - `current_revision: >= 1` and user did not specify → intent is **update**
   - User said "validate" / "check" → intent is **validate**
   - User came from `pdf-agent-mobilizer` dump flow with pre-extracted content → intent is **dump-merge**
3. **Load field guide** from `references/charter-fields-guide.md`. Use it as the elicitation script.
4. Run the chosen intent (see below).
5. **Audit-log** every run.

## Intent: create

The stub has 8 H2 sections. Walk them in order, one at a time. For each section:

1. Show the section's current placeholder (one line).
2. Ask **one** focused question per section (see field guide for the canonical question).
3. Accept the user's answer. Reflect it back as a draft paragraph or table.
4. Ask: *"Land this, refine, or skip?"*
5. On `land`, write the section. On `refine`, ask one follow-up. On `skip`, leave the placeholder.

When all 8 sections are walked:

6. Update frontmatter: `status: active`, `current_revision: 1`, `last_updated`, `last_updated_by`.
7. Append a change-log row: `1 | <date> | <author> | All | Initial population from scaffold | Mobilization | <approver or —>`.
8. Run validation (see Intent: validate).
9. Offer the red-team gate: *"Charter is internal-but-foundational. Run pdf-red-team now? [recommended: yes]"*
10. Update frontmatter `red_teamed` flag.
11. Report and hand off: *"Charter is at revision 1. Next: pdf-create-raci."*

## Intent: update

When the charter already has `current_revision >= 1`:

1. Ask what changed and why. The trigger is mandatory (sponsor change, scope change, regulatory addition, lessons learned, etc.).
2. Identify affected sections.
3. Show the current text of each affected section. Propose the diff. Confirm with the user.
4. Apply changes.
5. Bump `current_revision` by one. Append a change-log row recording: section, change summary, trigger, approver.
6. Re-validate.
7. If any change affects scope, budget, or timeline, **require** approver name in the change-log row and **require** a red-team pass.

## Intent: validate

Load `references/charter-validation.md` and run every check. Report pass/fail per check. Validation does not modify the file; failures are surfaced for the user to decide.

## Intent: dump-merge

When invoked from Marcus's dump flow, pre-extracted content arrives as a structured payload (one block per H2 section). For each block:

1. If the corresponding charter section is empty: treat as `create` for that section.
2. If non-empty: treat as `update` for that section, with the same diff-and-confirm flow.
3. Aggregate all section changes into **a single change-log row** describing "Bulk populate from dump on YYYY-MM-DD; sections affected: ...".
4. Bump `current_revision` by one regardless of how many sections changed.

## Red-team gate

- **Default:** off for first creation; **recommended** at first finalisation.
- **Required** for any update that touches scope, budget, timeline, or compliance regimes.
- Frontmatter `red_teamed: true|false` is updated by `pdf-red-team`. This workflow only sets the *recommendation* flag.

## Reference

- `references/charter-fields-guide.md` — what to elicit per section
- `references/charter-validation.md` — the validation checklist
- `ARCHITECTURE.md` §9 — the Charter as Living Constitution pattern
- `ARCHITECTURE.md` §19 — when to shard a long charter

## Tone

Direct. British English. One question at a time. Never present a wall of questions; the charter is elicited section by section. Confirm every write aloud before applying.
