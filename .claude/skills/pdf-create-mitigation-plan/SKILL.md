---
name: pdf-create-mitigation-plan
description: Compose a structured mitigation plan for a risk that has moved up the matrix or materialised. Forces all four commitment fields per action: owner, action, deadline, trigger-to-revisit. Use when a risk needs an active response.
---

# Mitigation plan workflow

Produces `_pdf-output/engagements/{active}/06-risk-change/mitigation-plans/<YYYY-MM-DD>-<risk-id>.md`.

Side effect: updates the RAID row's `status` to `in-mitigation` and its `mitigation` cell to reference this plan. Same dual-write discipline as `pdf-triage-blocker`.

Klaus's principle 3 is the constraint: mitigation plans are commitments, not aspirations. Each action requires all four fields — owner, action, deadline, trigger-to-revisit.

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

5. **Establish fallback.** *"What is the fallback if this plan doesn't work — or if the deadline passes with the action incomplete?"* One paragraph.
6. **Update target residual L×I.** *"If this plan succeeds, what's the new residual L×I score?"*
7. **Compose:**

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

## Fallback

<one paragraph; what happens if the above does not deliver the target residual>

## Review schedule

- First review: <date>
- Then: <cadence — weekly / fortnightly / on-trigger>

## Cross-references

- RAID row: `04-execution/RAID.md#R-<NNN>`
- Risk deep-dive (if any): `06-risk-change/risk-deep-dives/<file>`

---

## History

- <date> — Plan created. Status: active.
```

8. **Update RAID.** Apply the same discipline as `pdf-update-raid`:
   - Set risk row's `status: in-mitigation`
   - Append to `mitigation` cell: `See: 06-risk-change/mitigation-plans/<file>`
   - Append to RAID History: `<date> | Risks | R-<NNN> — mitigation plan created`
   - Update `last_updated` frontmatter
9. **Hand off:**
   - If the plan's fallback names an escalation, offer `pdf-decide-escalation`.
   - If actions span more than 30 days, offer to flag the longest-deadline action in the next weekly status's Asks.

## Intent: update

1. Identify the plan by risk ID.
2. Common updates:
   - Action progress / completion: append to `## History`; if all actions complete, prompt to close the plan and the underlying risk
   - Deadline change: log the change and the reason
   - Fallback triggered: append a `## Fallback engaged — <date>` section and route to Helena for escalation memo if appropriate
3. If the underlying risk's inherent score changes mid-plan, prompt to revisit the plan rather than silently updating.

## Intent: validate

- [ ] Frontmatter complete; `risk_id` matches a row in RAID
- [ ] At least one action; every action row has all five fields filled (no blanks, no TBC)
- [ ] Every owner is in STAKEHOLDERS.md
- [ ] Every deadline is a real date (in the future at time of creation)
- [ ] Fallback paragraph is non-empty
- [ ] Review schedule is set
- [ ] RAID row reflects this plan (status `in-mitigation`, mitigation cell references the file)

## Intent: dump-merge

Accept dumped material describing what's being done about a risk. Extract candidate actions; for each, identify which of the four fields are present and which need elicitation. Surface the gaps before structuring.

## Red-team posture

Off. Internal commitment doc; the named owners are the audience.

## Reference

- `ARCHITECTURE.md` §6.6
- Klaus's principle 3 (mitigation plans are commitments)
