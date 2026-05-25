---
name: pdf-create-governance
description: Create, update, or validate the governance plan — forum cadence, decision-rights matrix, escalation tree. Use when the user asks to set up engagement governance or when Marcus dispatches to governance work.
---

# Governance workflow

Populates `_pdf-output/engagements/{active}/00-constitution/GOVERNANCE.md` in place. The plan has three components: **cadence**, **decision-rights matrix**, **escalation tree**.

## Preconditions

- `CHARTER.md` at `current_revision >= 1` (the governance cadence summary in the charter is the anchor).

## Intent: create

Walk the three components in order.

### 1. Cadence

For each candidate forum, ask:
- *"Does this engagement need a <forum>?"* (Steering / Status check-in / CCB / Exec / Quality gate review / Other)
- If yes: *"Frequency? Attendees? Inputs? What decisions are made here?"*

Enforce **the "stated decision rights" rule**: every forum row must have a non-empty "Decisions made here" cell. A forum without decision rights is a meeting, not governance — flag it.

### 2. Decision-rights matrix

For each decision class (scope change %, budget reallocation, timeline slip, quality gate failure, etc.):
- *"Who owns this decision below the threshold?"*
- *"What threshold escalates it, and to whom?"*

Default thresholds (override per engagement):
- Scope change <= 5% → Delivery Manager + notify Sponsor
- Scope change > 5% → Sponsor + CCB
- Budget reallocation within phase → Delivery Manager
- Budget overrun → Sponsor + Steering
- Timeline slip > 1 week → Sponsor + Steering
- Quality gate failure → Quinn (Quality Steward) + Delivery Manager

### 3. Escalation tree

For each escalation trigger, define three levels (within 24h / 48h / 1 week) with named individuals. The names must exist in `STAKEHOLDERS.md`.

## Intent: update

Same diff-and-confirm pattern as charter update. Governance changes that affect decision rights are significant — append to `decision-log.md`.

## Intent: validate

Checks:

- [ ] Every forum row has non-empty "Decisions made here"
- [ ] Every decision class has a named owner and a threshold
- [ ] Every escalation trigger has at least two levels populated with named individuals
- [ ] All named people exist in `STAKEHOLDERS.md`
- [ ] Steering cadence in this file matches the charter summary

## Intent: dump-merge

Accept pre-extracted forum cadence, decision rights, or escalation rules from Marcus's dump flow. Treat as create or update per existing state.

## Red-team

Default off. Recommended once on first finalisation; required if the decision-rights matrix changes significantly mid-engagement.

## Reference

- `ARCHITECTURE.md` §6.2
- Marcus's principle 3 ("Every governance forum has a stated purpose and decision rights")
