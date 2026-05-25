---
name: pdf-create-comms-plan
description: Create, update, or validate the communications plan — rituals, channels, audiences, owners. Use when the user asks to set up engagement comms or when Marcus dispatches to comms-plan work.
---

# Comms plan workflow

Populates `_pdf-output/engagements/{active}/00-constitution/COMMS-PLAN.md` in place. Comms plan has two components: **rituals** (what gets said, when, by whom, to whom) and **channels** (where it gets said). These are deliberately separated per Marcus's principle 4.

## Preconditions

- `CHARTER.md` at `current_revision >= 1`
- `GOVERNANCE.md` ideally at `current_revision >= 1` (governance defines the forums; comms plan operationalises them)

## Intent: create

### 1. Rituals

For each candidate ritual, ask:
- *"Frequency?"*
- *"Audience?"* (must reference stakeholders by ID)
- *"Owner?"* (must be in STAKEHOLDERS.md)
- *"Which PDF skill produces this?"* (e.g. weekly status → `pdf-weekly-status`; standup digest → `pdf-summarize-standup`)

Default ritual set (override per engagement):
- Daily standup
- Daily standup digest
- Weekly status
- Steering committee (per governance cadence)
- Exec update (monthly default)
- Quarterly review

### 2. Channels

For each channel, ask:
- *"Use for?"* (e.g. formal status, decisions of record, quick questions, escalations)
- *"Do not use for?"*

Default channel set:
- Email
- Teams / Slack
- Repo / vault
- Phone / video

Enforce **the channels-rituals separation**: a ritual table should reference channels by name but not encode channel rules inline. The channels table is the source of channel rules.

## Intent: update

Same diff-and-confirm pattern.

## Intent: validate

Checks:

- [ ] Every ritual has frequency, audience, owner, and (where applicable) a producing skill
- [ ] Every ritual's audience IDs exist in STAKEHOLDERS.md
- [ ] Every ritual's owner exists in STAKEHOLDERS.md
- [ ] Every governance forum from GOVERNANCE.md has a corresponding ritual row
- [ ] Channels table has no overlap of "Use for" between channels (no two channels claim "formal decisions of record")
- [ ] No ritual encodes channel rules inline — it references the channel by name only

## Intent: dump-merge

Accept pre-extracted ritual / channel preferences from Marcus's dump flow.

## Red-team

Default off. Comms plan is operational; red-team rarely adds value unless the stakeholder map is unusually adversarial.

## Reference

- `ARCHITECTURE.md` §6.2
- Marcus's principle 4 ("Channels are separate from rituals")
