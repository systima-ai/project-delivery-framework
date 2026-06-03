---
name: pdf-create-mitigation-plan
description: Compose a structured mitigation plan for a risk that has moved up the matrix or materialised. Separates pre-event mitigation from an if-it-occurs contingency plan, forces all four commitment fields per action (owner, action, deadline, trigger-to-revisit), and handles the risk-to-issue handoff on materialisation. Use when a risk needs an active response.
---

# Mitigation plan workflow

Produces `_pdf-output/engagements/{active}/06-risk-change/mitigation-plans/<YYYY-MM-DD>-<risk-id>.md`.

Side effect: updates the RAID row's `status` to `in-mitigation` and its `mitigation` cell to reference this plan. Same dual-write discipline as `pdf-triage-blocker`.

Klaus's principle 3 is the constraint: mitigation plans are commitments, not aspirations. Each action requires all four fields — owner, action, deadline, trigger-to-revisit.

**Two distinct responses, never conflated:**

- **Mitigation** — actions taken *now*, before the risk occurs, to reduce its probability or its impact.
- **Contingency** — the pre-agreed response executed *if and when the risk occurs*, activated by a named materialisation trigger.

A plan that lists only mitigation has no answer for the day the risk lands; a plan that lists only contingency has given up on prevention. This workflow requires both (contingency may be a deliberate, recorded "accept and absorb" — but the decision must be explicit).

## Preconditions

- `RAID.md` exists; the target risk is in it; risk status is `open`, `in-mitigation`, or `materialised`

## Intent: create

1. **Identify the risk.** Ask: *"Which risk ID?"* If unknown, list open risks sorted by inherent score.
2. **Read the row.** Surface current state.
3. **Trigger.** *"In one paragraph, what's prompting this plan now? (Score increase, materialisation, scheduled review, deep-dive recommendation, stakeholder request.)"*
4. **Walk actions.** For each action, ask the four mandatory fields:
   - **Action:** one-line description of what will be done
   - **Owner:** must be in STAKEHOLDERS.md
   - **Deadline:** a real date
   - **Trigger to revisit:** what condition (a date or a signal) brings this back for review

   Refuse any action missing any field. Klaus's principle 3 is non-negotiable here.

5. **Define the contingency plan (if the risk occurs).** Distinct from the mitigation actions above. Ask:
   - **Materialisation trigger(s):** *"What observable condition means this risk has occurred (not just got more likely)? The signal that flips us from prevention to response."*
   - **Contingency response:** *"When that trigger fires, what is the pre-agreed response? Who executes it?"* — at least one response action with an owner; or an explicit, recorded decision to **accept and absorb** (and why).
   - This is what gets executed on the worst day; it must be decided in the calm, not invented in the crisis.
6. **Establish fallback.** *"What is the fallback if the mitigation actions fail to reduce the residual — or if a deadline passes with the action incomplete?"* One paragraph. (Fallback = mitigation didn't work; contingency = the risk occurred. Keep them separate.)
7. **Update target residual L×I.** *"If this plan succeeds, what's the new residual L×I score?"*
8. **Compose:**

```markdown
---
artifact_type: mitigation-plan
engagement: <slug>
risk_id: R-<NNN>
date: <YYYY-MM-DD>
status: active
target_residual_score: <L × I = N>
generated_by: pdf-create-mitigation-plan
---

# Mitigation plan — R-<NNN> — <risk title>

## Trigger

<one paragraph>

## Current state of risk

- Inherent L×I: <L × I = N>
- Current residual L×I: <L × I = N>
- Target residual L×I (if plan succeeds): <L × I = N>

## Actions

| # | Action | Owner | Deadline | Trigger to revisit |
|---:|---|---|---|---|
| 1 | <action> | <name> | <date> | <date or signal> |
| 2 | <action> | <name> | <date> | <date or signal> |
| 3 | <action> | <name> | <date> | <date or signal> |

(Every row must have all five fields populated. Validation enforces this.)

## Contingency plan (if the risk occurs)

**Materialisation trigger(s):** <observable condition(s) that mean the risk has occurred>

| # | Response action | Owner | Notes |
|---:|---|---|---|
| 1 | <what we do when the trigger fires> | <name> | |
| 2 | <action> | <name> | |

_Or:_ **Accept and absorb** — <explicit decision and rationale; named approver>.

**On materialisation:** convert the risk to an Issue via `pdf-update-raid` (RAID Issues), recording the reasons for occurrence; triage via `pdf-triage-blocker` if it blocks delivery.

## Fallback

<one paragraph; what happens if the mitigation actions do not deliver the target residual — distinct from the contingency above>

## Review schedule

- First review: <date>
- Then: <cadence — weekly / fortnightly / on-trigger>

## Cross-references

- RAID row: `04-execution/RAID.md#R-<NNN>`
- Risk deep-dive (if any): `06-risk-change/risk-deep-dives/<file>`
- Occurrence tracking: this risk contributes to the engagement's *risks-materialised ÷ risks-identified* ratio — a leading indicator of estimation/planning quality. If a measurement plan exists (`03-planning/measurement-plan.md`), this ratio is a candidate metric there.

---

## History

- <date> — Plan created. Status: active.
```

9. **Update RAID.** Apply the same discipline as `pdf-update-raid`:
   - Set risk row's `status: in-mitigation`
   - Append to `mitigation` cell: `See: 06-risk-change/mitigation-plans/<file>`
   - Append to RAID History: `<date> | Risks | R-<NNN> — mitigation plan created`
   - Update `last_updated` frontmatter
10. **Hand off:**
   - If the plan's fallback names an escalation, offer `pdf-decide-escalation`.
   - If actions span more than 30 days, offer to flag the longest-deadline action in the next weekly status's Asks.

## Intent: update

1. Identify the plan by risk ID.
2. Common updates:
   - Action progress / completion: append to `## History`; if all actions complete, prompt to close the plan and the underlying risk
   - Deadline change: log the change and the reason
   - Fallback triggered: append a `## Fallback engaged — <date>` section and route to Helena for escalation memo if appropriate
   - **Risk materialised (contingency trigger fired):** append a `## Materialised — <date>` section recording the reasons for occurrence; set the RAID risk row's `status: materialised`; convert to a RAID **Issue** via `pdf-update-raid` (carry the reasons across); offer `pdf-triage-blocker` if it blocks delivery and `pdf-decide-escalation` if the contingency response needs a decision above the team.
3. If the underlying risk's inherent score changes mid-plan, prompt to revisit the plan rather than silently updating.

## Intent: validate

- [ ] Frontmatter complete; `risk_id` matches a row in RAID
- [ ] At least one action; every action row has all five fields filled (no blanks, no TBC)
- [ ] Every owner is in STAKEHOLDERS.md
- [ ] Every deadline is a real date (in the future at time of creation)
- [ ] Contingency section present: at least one materialisation trigger AND either a response action with an owner OR an explicit "accept and absorb" decision with a named approver
- [ ] Fallback paragraph is non-empty (and distinct from the contingency)
- [ ] Review schedule is set
- [ ] RAID row reflects this plan (status `in-mitigation`, mitigation cell references the file)

## Intent: dump-merge

Accept dumped material describing what's being done about a risk. Separate pre-event actions (mitigation) from if-it-occurs responses (contingency) — they are often muddled together in raw notes. For each action, identify which of the four fields are present and which need elicitation. Surface the gaps before structuring.

## Red-team posture

Off. Internal commitment doc; the named owners are the audience.

## Reference

- `ARCHITECTURE.md` §6.6
- Klaus's principle 3 (mitigation plans are commitments)
