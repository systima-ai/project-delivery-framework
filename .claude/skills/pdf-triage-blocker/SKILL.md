---
name: pdf-triage-blocker
description: Structured triage of a blocker — 5-whys, owner, decision needed, escalation path, deadline. Produces a stand-alone blocker file AND appends a pointer row to RAID Issues. Use when the team flags a blocker, or when a risk materialises.
---

# Blocker triage workflow

Produces two coordinated outputs:

1. **Deep-dive file:** `_pdf-output/engagements/{active}/04-execution/blockers/<YYYY-MM-DD>-<slug>.md`
2. **RAID Issues row** (appended via the same discipline as `pdf-update-raid`) pointing at the deep-dive file.

This dual output exists because blockers need both an aggregate view (the RAID Issues table for status-report scanning) **and** a deep document (for the actual triage, escalation, and decision trail).

## Preconditions

- Active engagement
- `04-execution/RAID.md` exists (it does, scaffolded by `pdf-engagement-init`)

## Intent: create

1. **Get the title.** One line. The workflow generates a slug from it (lowercased, hyphenated, ≤ 40 chars).
2. **Walk the 5-whys.**
   - *"What is the blocker, in one sentence?"*
   - *"Why is that a problem? (Why #1)"*
   - *"And why is that? (Why #2)"*
   - Continue for up to 5 levels, but stop if the user signals they've hit the root.
   - Capture each level verbatim.
3. **Establish ownership and decision-needed.**
   - *"Who owns resolving this?"* (must exist in STAKEHOLDERS.md)
   - *"What decision is needed, and by whom?"*
   - *"By when?"* (a date)
4. **Establish escalation path.** Read `GOVERNANCE.md` escalation tree. Pre-populate Level 1 / 2 / 3 names if the blocker matches a trigger. Confirm.
5. **Estimate cost.** *"How many days is this costing per day it remains unresolved? (Rough is fine — even a range.)"*
6. **Write the deep-dive file:**

```markdown
---
artifact_type: blocker
engagement: <slug>
id: BLK-<NNN>
title: <title>
opened: <YYYY-MM-DD>
owner: <name>
deadline: <YYYY-MM-DD>
status: open
days_cost_per_day: <number or range>
raid_issue_id: I-<NNN>
generated_by: pdf-triage-blocker
---

# Blocker — <title>

## One-sentence problem

<one sentence>

## 5-whys

1. <why>
2. <why>
3. <why>
4. <why>
5. <why>

## Root cause (current hypothesis)

<one paragraph>

## Decision needed

**By whom:** <name>
**What:** <one-line decision>
**By when:** <date>

## Escalation path

- Level 1 (within 24h): <name>
- Level 2 (within 48h): <name>
- Level 3 (within 1 week): <name>

## Cost

<n> days per day unresolved.

## Resolution log

(Append-only; updated by `update` intent.)

- <date> — <action taken / decision made / status change>
```

7. **Append RAID Issues row.** Use the same discipline as `pdf-update-raid` (generate ID, append to history table). The row's title field links to the blocker file path.
8. **Update STATUS-LOG.md** with a one-line pointer.
9. **Hand off:**
   - If the deadline is within 48h and Level 2 escalation isn't already named in stakeholders → offer Helena (`pdf-write-escalation-memo`).
   - Otherwise, return to Ronan's menu.

## Intent: update

1. Ask the BLK-NNN ID.
2. Ask what happened: progress / new info / status change.
3. Append to the resolution log section.
4. If status changes:
   - `open` → `in-progress`: just log
   - `→ resolved`: log the resolution; update RAID Issues row to `closed`; update STATUS-LOG
   - `→ escalated`: log; offer Helena's escalation memo

## Intent: validate

- [ ] Frontmatter complete; ID matches filename
- [ ] 5-whys section has at least 3 entries
- [ ] Owner exists in STAKEHOLDERS.md
- [ ] Escalation path names exist in GOVERNANCE.md
- [ ] Deadline is in the future or status is closed
- [ ] Corresponding RAID Issues row exists with matching ID

## Intent: dump-merge

Accept dumped material describing a blocker. Extract candidate fields. Confirm before any write — blockers without a clear owner or decision-needed should be queued for elicitation rather than written half-formed.

## Red-team posture

Off. Internal artifact. If the blocker escalates to a formal memo or change request, those downstream artifacts are red-teamed by Helena and Klaus respectively.

## Reference

- `ARCHITECTURE.md` §6.4 (Ronan) and §6.6 (Klaus, for materialised risks)
- Ronan's principle 6 ("Blockers are paid for in days lost")
