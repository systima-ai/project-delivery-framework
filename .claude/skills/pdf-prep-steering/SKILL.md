---
name: pdf-prep-steering
description: Compose the steering pack — MARP deck with embedded speaker notes — drawing from the last two weeks of status, RAID, decisions, change requests, and velocity. Use when the user has a steering meeting coming up.
---

# Steering pack workflow

Produces `_pdf-output/engagements/{active}/05-governance/steering/<YYYY-MM-DD>-steering.md`. **Single file** containing MARP-style slide markdown (`---` between slides) with embedded HTML speaker-note blocks per slide. Renderable to slides via MARP; readable as a document either way.

This is one of the framework's headline outputs. Red-team is **default on**.

## Preconditions

- `CHARTER.md` at `current_revision >= 1`
- `GOVERNANCE.md` populated (the steering cadence and decision rights live here)
- At least one weekly status in `04-execution/weekly-status/` within the last 14 days

If preconditions miss, refuse and route appropriately.

## Intent: create

1. **Establish meeting date.** Default: next steering date inferred from `GOVERNANCE.md` cadence. Override on ask.
2. **Source.** Read:
   - Last 2 weekly statuses (or up to 4 if a fortnightly cadence)
   - `RAID.md` — current open risks (top 5 by inherent score), all open issues, dependencies needed within 30 days
   - `decision-log.md` — decisions made since the previous steering
   - `06-risk-change/change-requests/*.md` — any active change requests
   - `04-execution/velocity/*.md` — most recent
   - `CHARTER.md` — for reconciliation of headline status against success criteria
3. **Elicit the decision agenda.** Ask: *"What decisions are you seeking from this steering? Each one needs: the decision, the recommendation, and the named decision-maker."* Repeat until the user signals done.
4. **Compose** the canonical 14-slide structure (see below).
5. **Write embedded speaker notes** per slide using the MARP convention:
   ```html
   <!--
   _Speaker notes:_
   <notes>
   -->
   ```
6. **Run simulated red-team inline** (until `pdf-red-team` skill exists):
   - Cynical review: would a sceptical CFO read this and ask "what's missing?" — answer the missing question or excise the claim.
   - Edge-case hunter: are there risk movements not mentioned? decisions made but not surfaced?
   - Acceptance auditor: does every claim trace to a source artifact?
   - Show the user a red-team report. Apply revisions before finalising.
7. **Write the file** with frontmatter and slide-marked body.
8. **Offer the paste-block** (the body without frontmatter, for emailing the agenda summary).
9. **Hand off:** offer Helena's exec-summary workflow next, or back to menu.

## Canonical 14-slide structure

| # | Slide | Source(s) |
|---|---|---|
| 1 | Title — engagement / date / attendees | Charter + governance |
| 2 | Headline + RAG status + 1-line justification | Latest weekly status |
| 3 | Decisions sought today | Elicited |
| 4 | Reconciliation to charter success criteria | Charter + status |
| 5 | What moved (period highlights) | Last 2 weekly statuses |
| 6 | What slipped (period lowlights) | Last 2 weekly statuses |
| 7 | Risk movement | RAID + risk deep-dives |
| 8 | Issues and blockers | RAID Issues + blocker deep-dives |
| 9 | Decisions made since last steering | decision-log |
| 10 | Change requests on the table | change-requests folder |
| 11 | Velocity and budget signal | velocity + commercial |
| 12 | Forward look (next period top 3) | Latest weekly status + planning |
| 13 | Asks | Latest weekly status |
| 14 | Appendix pointer | Lists supporting artifacts with paths |

Slides 1, 2, 3 are the most important; Helena's principle 1 applies (lead with the answer). The decision agenda (slide 3) is the only part of the deck most exec readers actually engage with.

## Intent: update

1. Identify the existing steering file by date.
2. Show what's changed in source artifacts since last write.
3. Propose slide-by-slide diffs.
4. Apply. Re-run simulated red-team.
5. The prior file is renamed `.v<n>.md`; the new version becomes canonical.

## Intent: validate

- [ ] All 14 slides present (or explicitly omitted with one-line reason)
- [ ] Decisions-sought slide has at least one decision (or explicit "no decisions sought this meeting")
- [ ] Every cited risk / decision / change request has a working file path
- [ ] Every claim in slides 5–8 traces to a weekly status or RAID row
- [ ] Speaker notes present on every slide
- [ ] Frontmatter `red_teamed: true`

## Intent: dump-merge

When invoked from Helena's dump flow: accept pre-extracted "what moved / slipped / decisions / asks" content, slot into the relevant slides, then run the standard compose + red-team flow.

## Red-team posture

**Default ON.** Simulated red-team inline until `pdf-red-team` exists. Required before frontmatter `red_teamed` can be set to `true`.

## Reference

- `ARCHITECTURE.md` §6.5, §16
- Helena's principle 1 (lead with the answer): slides 1–3 are weighted heaviest
