---
name: pdf-weekly-status
description: Compose this week's status report — one file per ISO week — from charter, RAID, decision-log, standup digests, and velocity. Use when the user asks for a weekly status, status update, or end-of-week summary.
---

# Weekly status workflow

Produces `_pdf-output/engagements/{active}/04-execution/weekly-status/<YYYY-Www>.md`. **One file per ISO week** so trends are traceable.

**Output format:** Teams/Slack-paste-optimised. Markdown headings + bullets + light bold. **No heavy tables in the body** — they break when pasted into Teams/Slack. The frontmatter is for machines; the body is for humans on chat.

## Preconditions

- `CHARTER.md` at `current_revision >= 1`
- `04-execution/RAID.md` exists (even if mostly empty)

If the user is starting a brand-new engagement and these aren't ready, refuse and route to Marcus.

## Intent: create

1. **Determine the ISO week.** Default: current week (`YYYY-Www`). If a file already exists for the current week, switch to `update` intent.
2. **Source.** Read in this order:
   - `CHARTER.md` — pull current scope summary + success criteria (for headline reconciliation)
   - `04-execution/RAID.md` — pull current state of risks and issues
   - `decision-log.md` — entries dated within the last 7 days
   - `04-execution/standups/*.md` — digests within the last 7 days
   - `04-execution/velocity/*.md` — most recent entry within the last 14 days
3. **Elicit narrative gaps.** Ask the user, one at a time:
   - *"What's the one-sentence headline? Treat it as 'if they read nothing else, this is what they need to know.'"*
   - *"GREEN, AMBER, or RED — and one line justifying it?"*
   - *"What moved this week that the sources don't already capture?"* (optional; sources may be sufficient)
   - *"What slipped that the sources don't already capture?"* (optional)
   - *"What are next week's top 3 priorities?"*
   - *"What asks do you have of stakeholders? (Format: From X, need Y, by Z.)"*
4. **Compose** per `references/status-format-guide.md`. Use the canonical body template exactly.
5. **Write** the file with frontmatter + body.
6. **Append a one-line entry to `04-execution/STATUS-LOG.md`** pointing at the week file — preserves the chronological index.
7. **Offer the paste-block.** After write, emit:

```
Generated: 04-execution/weekly-status/<YYYY-Www>.md

Copy-paste version (Teams/Slack-ready):

# Weekly status — <name> — <date>
<body without frontmatter or repo footer>
```

8. **Hand off:** *"Status written. Want to red-team it? Or move to prep-steering?"*

## Intent: update

When the current week's file already exists:

1. Read it. Show the user the current Headline + Status.
2. Ask what changed.
3. Diff the affected sections. Confirm. Write.
4. Append a brief revision note at the very bottom of the file under `## Revisions`:
   `- <iso-timestamp> — <one-line what changed>`

## Intent: validate

Checks:

- [ ] Frontmatter has `engagement`, `week`, `charter_revision`, `red_teamed`
- [ ] Headline present and ≤ 25 words
- [ ] Status is exactly one of GREEN / AMBER / RED with a one-line justification
- [ ] Each section uses bullets, not tables (Teams/Slack paste-friendliness)
- [ ] Every cited decision ID exists in `decision-log.md`
- [ ] Every cited risk/issue ID exists in `RAID.md` at its claimed state
- [ ] "Asks" entries have all three fields: from, need, by-when

Report pass/fail; do not modify.

## Intent: dump-merge

Accept pasted material (status email draft, Teams thread, standup notes). Extract candidate values for each section of the canonical template. Show the plan; confirm; write.

## Red-team posture

**Default off.** Weekly status is routine / high-frequency per architecture §16. Frontmatter `red_teamed: false` is the honest state. The user may opt-in for a regulated client or after a bad week; that's a one-line override in the engagement's `.pdf-config.toml` (set `weekly_status.red_team_default = "on"`).

## Reference

- `references/status-format-guide.md` — the canonical body template + reasoning
- `ARCHITECTURE.md` §9 (charter reconciliation), §16 (red-team), §19 (calendar-archive policy for STATUS-LOG)
