---
name: pdf-risk-deep-dive
description: Forensic analysis of a single risk — root causes, exposure timeline, mitigation options, residual posture, recommendation. Standalone document; does not modify the RAID row. Use when a risk warrants real analysis.
---

# Risk deep-dive workflow

Produces `_pdf-output/engagements/{active}/06-risk-change/risk-deep-dives/<YYYY-MM-DD>-<risk-id>.md`. **Standalone document**, not appended to RAID. The RAID row stays unchanged; the deep-dive references it.

After the deep-dive is written, the workflow **offers** (but does not force) to update the RAID row's `mitigation` cell to point at the deep-dive file path. The decision stays with the user.

## Preconditions

- `RAID.md` exists and has at least one open risk
- The risk to deep-dive on is named in RAID (risk ID like `R-003`)

## Intent: create

1. **Identify the risk.** Ask: *"Which risk ID?"* If the user doesn't know, list open risks from RAID sorted by inherent score, highest first.
2. **Source the row.** Read the full RAID row for that risk. Surface what's there.
3. **Walk the deep-dive structure** (see below). One section at a time. Klaus's voice: precise, sceptical, unalarmed.
4. **Compose:**

```markdown
---
artifact_type: risk-deep-dive
engagement: <slug>
risk_id: R-<NNN>
date: <YYYY-MM-DD>
charter_revision: <N>
generated_by: pdf-risk-deep-dive
red_teamed: false
---

# Risk deep-dive — R-<NNN> — <title>

## Restatement

<one paragraph; the risk in your own words, not copied from RAID>

## Why now

<one paragraph; what triggered this deep-dive — score change, materialisation hint, stakeholder ask, scheduled review>

## Root causes

<numbered list; each cause one line. Goes beyond "why is this risky" to "why does this exist as a risk">

1. <cause>
2. <cause>
3. <cause>

## Exposure timeline

<one paragraph + a small table or bullet list>

- **Earliest impact:** <when>
- **Likeliest impact window:** <range>
- **Latest credible impact:** <when>
- **What changes the timeline:** <trigger conditions>

## Current treatment

<one paragraph describing what's already in place — controls, mitigations, accepted residual>

## Treatment options

For each option:

### Option A — <name>

- **What it is:** <one line>
- **Cost (rough):** <range>
- **Time to take effect:** <range>
- **Residual L×I if taken:** <L × I = score>
- **Side effects:** <one line>

### Option B — <name>

(Same fields.)

### Option C — <name>

(Same fields. Minimum three options including "do nothing / accept" if applicable.)

## Recommendation

<one paragraph. Names the option. States the reasoning. Acknowledges the trade-off you are accepting by recommending this option over the others.>

## Owner

**Risk owner:** <name from STAKEHOLDERS.md>
**Recommendation accepted by:** <name, on date>

## Cross-references

- RAID row: `04-execution/RAID.md#R-<NNN>`
- Related blockers: <list or "none">
- Related change requests: <list or "none">
- Triggers a mitigation plan? <yes / no — if yes, recommend `pdf-create-mitigation-plan`>
- Triggers an escalation decision? <yes / no — if yes, recommend `pdf-decide-escalation`>
```

5. **Offer RAID-row update.** *"Update the RAID row's `mitigation` cell to point at this deep-dive? [yes / no]"* If yes, append a line to the cell like `See: 06-risk-change/risk-deep-dives/<date>-R-<NNN>.md`. Use the same discipline as `pdf-update-raid` (history table entry, last-updated frontmatter).
6. **Hand off:** if Recommendation triggers either a mitigation plan or an escalation, offer the next workflow.

## Intent: update

1. Identify the deep-dive by risk ID.
2. Append to a new H2 section at the bottom of the file: `## Review — <date>` with new findings, updated recommendation if any, and (if changed) the new residual L×I.
3. Update frontmatter `last_updated`.
4. The deep-dive is append-only; prior text is preserved.

## Intent: validate

- [ ] Frontmatter complete; `risk_id` matches filename
- [ ] Restatement is not a copy of the RAID title
- [ ] At least 3 root causes listed
- [ ] Exposure timeline has all four fields (earliest / likeliest / latest / triggers)
- [ ] At least 3 treatment options including a "do nothing" or "accept" option where applicable
- [ ] Recommendation names a specific option and acknowledges the trade-off
- [ ] Owner exists in STAKEHOLDERS.md
- [ ] Cross-references checked: all paths resolve

## Intent: dump-merge

Accept dumped material on a single risk. Extract candidate root causes, timeline points, options. Confirm before structuring.

## Red-team posture

Default off. Recommended if the deep-dive will be shared externally (e.g. as part of a board pack or with a client risk committee).

## Reference

- `ARCHITECTURE.md` §6.6
- Klaus's principles 1 (risks are owned) and 5 (honest probability)
