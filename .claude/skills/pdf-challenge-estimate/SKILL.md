---
name: pdf-challenge-estimate
description: Adversarial review of any estimate. Two modes — pre-mortem (structured questionnaire, works solo) or red-team (attack an existing estimate document). User picks at invocation. Use on plan durations, budget figures, vendor quotes, team estimates, client targets.
---

# Estimate-challenge workflow

Produces entries appended to `_pdf-output/engagements/{active}/03-planning/estimate-challenge-log.md`. **Append-only log**; each challenge is one section in the file.

**Two modes, chosen at invocation:**
- **Pre-mortem mode** — structured questionnaire imagining the estimate proved 50% wrong. Participatory, works solo. Best when the estimate is yours, or when you have time to think.
- **Red-team mode** — adversarial attack on a specific estimate document. Faster. Best when challenging someone else's estimate (vendor quote, team estimate, client target).

See `references/estimate-challenge-modes.md` for the full method per mode, including question banks.

Petra's principle 5 is the constraint: pre-mortem before steering. Adversarial thought is cheap; failed delivery is not.

## Preconditions

- Active engagement
- An estimate to challenge. Either:
  - A document path (`pdf-create-budget-baseline`, `pdf-create-plan`, vendor quote, team estimate paste)
  - A described estimate (the user states it inline)

## Intent: create (one challenge entry)

1. **Establish what's being challenged.**
   - *"What estimate are we challenging? Path to a document, or paste it inline."*
   - Read it. Surface the headline value or range.

2. **Pick mode.**
   - *"Pre-mortem (you imagine it proved wrong; I prompt the analysis) or red-team (I attack the document; you defend or accept points)? [pre-mortem / red-team]"*
   - Refuse to default; the user must pick. Different modes produce different outputs.

3. **Run the chosen mode.** See `references/estimate-challenge-modes.md` for the question banks.
   - **Pre-mortem flow** — Walk the user through: "Imagine 12 months from now this estimate proved 50% wrong. What went wrong? Why didn't we see it?" + structured prompts on assumptions, dependencies, optimism bias, base rates, hidden costs.
   - **Red-team flow** — Read the document. Attack: which assumptions are most fragile? Which numbers are best-case in disguise? Where is the contingency? What's the cone of uncertainty? Where are the hidden costs?

4. **Capture revisions.** *"Given what we've found, what's your revised estimate?"*
   - Original estimate: as found
   - Revised estimate: user provides; encourage a range, not a point
   - Confidence change: up / down / same (with one-line reason)

5. **Capture action items.** *"What action items come from this? (Things to investigate, contingencies to add, conversations to have, assumptions to validate.)"*

6. **Append to log:**

```markdown
## <YYYY-MM-DD> — Challenge: <subject> (mode: <pre-mortem | red-team>)

### What was estimated

<one paragraph + the value or range>

**Source:** <document path or "inline">
**Original value/range:** <as found>

### Mode: <pre-mortem or red-team>

#### <Section per mode — e.g. "Pre-mortem findings" or "Red-team findings">

<numbered list of findings; each one to three lines. Specific, named, evidence-cited>

1. <finding>
2. <finding>
3. <finding>

#### Most fragile assumptions

- <assumption> — <why fragile>
- <assumption> — <why fragile>

#### Hidden costs identified

- <cost> — <one line>
- <cost> — <one line>

### Outcome

- **Original:** <value or range>
- **Revised:** <range — point estimates discouraged>
- **Confidence change:** <up | down | same>
  - <one-line reason>

### Action items

- [ ] <action> — owner <name> — by <date>
- [ ] <action> — owner <name> — by <date>

### Linked artifacts

- Estimate source: <path>
- Created risk(s): <R-NNN if a new RAID risk was logged>
- Created change request(s): <CR-NNN if a CR was triggered>

---
```

7. **Cross-skill side effects.**
   - If a finding warrants a new RAID risk, offer `pdf-update-raid` (append).
   - If the revised estimate is materially different (> 15% change), offer `pdf-create-change-request` (Klaus).
   - If the action items name things that need decisions, offer `pdf-decision-log`.

## Intent: update

A challenge entry is **append-only** once written. Updates are new challenges referencing prior ones, not edits to past entries. *"Adding a follow-up challenge? Use `create` mode and reference the prior challenge by date."*

## Intent: validate

- [ ] Frontmatter complete (file-level)
- [ ] Every entry has all required sections (What / Mode / Outcome / Action items)
- [ ] Every action item has owner and date (no TBC)
- [ ] Revised estimates are ranges, not single numbers (or explicit explanation if point-estimate intended)
- [ ] Linked artifacts paths resolve

## Intent: dump-merge

Accept a dumped critique or note about an estimate. Classify implicit mode (pre-mortem vs red-team) from the shape of the dump. Confirm with user. Then process through the chosen flow.

## Why two modes

- **Pre-mortem** is participatory: you imagine the failure and work backwards. Works when there's no document to attack — e.g. the estimate exists in your head, or the team produced it collaboratively without a written artifact.
- **Red-team** is adversarial: you take the document as the opposing case and attack it. Works when there's a concrete document and a counter-position is useful (a vendor quote, a client demand, a team estimate you find optimistic).

The shared output structure makes them comparable — you can have two challenges on the same estimate, one in each mode, and contrast the findings.

## Red-team posture

N/A. The workflow *is* the red-team. The challenge log itself is internal; if any individual finding warrants external escalation, route to Helena.

## Reference

- `references/estimate-challenge-modes.md` — full method per mode, question banks, anti-patterns
- `ARCHITECTURE.md` §6.3
- Petra's principles 4 (ranges not numbers) and 5 (pre-mortem before steering)
