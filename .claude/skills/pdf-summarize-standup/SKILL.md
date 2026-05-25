---
name: pdf-summarize-standup
description: Turn a standup transcript or pasted notes into a structured digest with action items, blockers, and decisions. Use when the user wants to summarise a standup, daily, or team check-in.
---

# Standup digest workflow

Produces `_pdf-output/engagements/{active}/04-execution/standups/<YYYY-MM-DD>.md`. **One file per standup**, ISO date in filename.

Accepts two input modes:
- **Pasted text** — the user pastes notes or a rough transcript directly
- **Transcript file path** — the user gives a path to a Teams / Zoom / Otter / Whisper transcript (text or JSON)

## Preconditions

- Active engagement exists. No other artifacts required — standups can begin before the charter is finalised in early mobilization.

## Intent: create

1. **Establish date.** Default: today. Override if the input is from a past standup.
2. **Get input.** Ask: *"Paste the notes or transcript, or give me a file path."*
3. **Read.**
   - If path: read the file. Handle plain-text and JSON-transcript shapes.
   - If pasted: take as-is.
4. **Extract.** Identify:
   - **Per-person updates** — who said what, compressed to one or two bullets per person
   - **Action items** — anything phrased as a commitment or assignment. Required fields: who, what, when
   - **Blockers** — anything explicitly called out as blocking or impeding
   - **Decisions** — any decisions made or referenced
5. **Show the extraction.** Before writing, ask: *"Here's what I found. Land, refine, or drop any?"*
6. **Write** in this structure:

```markdown
---
artifact_type: standup-digest
engagement: <slug>
date: <YYYY-MM-DD>
source: <pasted | <file-path>>
generated_by: pdf-summarize-standup
---

# Standup digest — <date>

## Per-person

**<Name>:** <one or two bullets>
**<Name>:** <one or two bullets>

## Action items

- [ ] <who>: <what> — by <when>
- [ ] <who>: <what> — by <when>

## Blockers raised

- <one-line blocker> — raised by <name>
- <one-line blocker> — raised by <name>

## Decisions

- <one-line decision> — <decided_by>

(Omit any section that has no content. Don't pad.)
```

7. **Cross-skill side effects:**
   - For each **blocker**, ask: *"Triage now via `pdf-triage-blocker`?"* (yes/later/no).
   - For each **decision**, ask: *"Log this in `decision-log.md` via `pdf-decision-log`?"*
   - For each **action item** flagged "for stakeholder", ask if it should be appended to the next weekly status as an Ask.

## Intent: update

If a digest for the date already exists:
- `update` re-summarises from a richer source (e.g. you paste the full transcript later having only had notes earlier).
- The prior file is renamed with a `.v<n>` suffix and a new file becomes the canonical version.
- Frontmatter records the supersession.

## Intent: validate

- [ ] Date is valid ISO format and not in the future
- [ ] Every action item has who / what / when
- [ ] Every blocker has a raiser
- [ ] Every decision has a decider
- [ ] No "TBC" placeholders left in any field

## Intent: dump-merge

Equivalent to `create` when invoked from Ronan's dump flow — dump-merge is functionally the same as create for this workflow (the input is always a paste or transcript).

## Red-team posture

Off. Internal operational artifact.

## Reference

- `ARCHITECTURE.md` §6.4
