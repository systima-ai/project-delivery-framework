---
name: pdf-debrief-call
description: Debrief a consequential call after it happens — rate how it went against named dimensions, capture the intelligence learned, and extract follow-up actions. Use for discovery calls, client/stakeholder meetings, negotiations, or interviews where the outcome and the learnings both matter.
---

# Call-debrief workflow

A structured, honest after-action review of a single call. Two things come out of every consequential conversation and usually get lost: **a candid read of how it went** (what landed, what didn't, what it means for next steps) and **intelligence** (facts, names, constraints, signals worth keeping). This workflow captures both, and turns the loose ends into tracked follow-ups.

It is deliberately general. The same structure serves a pre-contract discovery call, a steering conversation, a tough stakeholder meeting, a commercial negotiation, or a hiring/interview call. The user names the call type at invocation; the dimension rubric adapts (see `references/call-debrief-guide.md`).

Honesty is the point. A debrief that flatters the participant is worthless. Rate against the rubric, evidence each rating, and name the weaknesses as plainly as the strengths.

## Output

`_pdf-output/engagements/{active}/call-debriefs/<YYYY-MM-DD>-<short-label>.md` by default. One file per call. Where several calls happen the same day (e.g. back-to-back interviews), use distinct short labels.

## Preconditions

- An active engagement.
- Source for the debrief: a **cleaned transcript** (ideally via `pdf-clean-transcript`), pasted notes, or the user's recollection in conversation. Higher-fidelity source → better-evidenced ratings.

## Intent: create (default)

1. **Frame the call.** Ask (one block): *"What was the call, who was on it, what was the objective, and what's the source — a transcript path, notes, or shall I interview you? Tell me the call type (discovery / stakeholder / negotiation / interview / other) so I use the right rubric."*
2. **Read the source.** If a transcript/notes path is given, read it. If recollection, interview the user briefly.
3. **Establish the outcome up front.** State plainly what happened and what it means for next steps. The outcome leads; the ratings explain it.
4. **Rate against dimensions.** Load the rubric for the call type from `references/call-debrief-guide.md`. Score each dimension on the configured scale (default 1–10), with a one-line evidence note per dimension citing the source. Do not pad to a flattering average.
5. **Strengths and weaknesses.** A short, specific list of each. Weaknesses are mandatory — "no weaknesses" is itself a finding that the debrief wasn't rigorous (see anti-patterns).
6. **Capture intelligence.** Extract durable facts learned: named people + roles, organisational structure, constraints, tooling, commercial signals, risks, anything a successor would want. Mark unconfirmed items with `[?]` (per `ARCHITECTURE.md` §8.1).
7. **Extract follow-ups.** Concrete next actions with owner and (where known) a date.
8. **Show before writing.** Present the outcome, the ratings table, and the follow-ups. Ask: *"Land this?"*
9. **Write** using the structure in `references/call-debrief-guide.md`, then offer cross-skill side effects (step below).

## Cross-skill side effects

After writing, offer (do not auto-run):
- **Risks / open questions surfaced** → *"Log in RAID via `pdf-update-raid`?"*
- **Decisions taken on the call** → *"Record via `pdf-decision-log`?"*
- **Follow-ups that are stakeholder asks** → *"Carry into the next weekly status / stakeholder update?"*
- **Intelligence that confirms or contradicts canonical facts** → *"Update `00-constitution/FACTS.md`?"* (e.g. a name confirmed, a sponsor identified).

## Intent: update

A later call with the same counterpart, or new information about the same call:
- Append a new dated debrief entry to the top of the file (cumulative, newest-first), so the relationship's history is in one place — mirroring the cumulative pattern used by 1:1 prep.
- Or correct/resolve `[?]` intelligence items as they're confirmed.

## Intent: validate

- [ ] Outcome stated plainly at the top (what happened, what it means)
- [ ] Every dimension in the rubric is scored with an evidence note
- [ ] At least one named weakness (rigour check)
- [ ] Intelligence section present; unconfirmed items carry `[?]`
- [ ] Every follow-up has an owner
- [ ] Ratings are consistent with the narrative (a strong outcome with uniformly low scores, or vice versa, is flagged)

## Intent: dump-merge

Equivalent to `create` from an agent's dump flow — the input is a transcript or notes. If the input is a raw machine transcript, suggest running `pdf-clean-transcript` first for a better-evidenced debrief.

## Anti-patterns to refuse

- **Validation theatre.** A debrief with no weaknesses and uniformly high scores is almost never honest; flag it and re-attempt.
- **Ratings without evidence.** Every score cites something from the call.
- **Confusing a debrief with a transcript or a digest.** This is assessment + intelligence, not a full record (`pdf-clean-transcript`) or an action-item digest (`pdf-summarize-standup`).
- **Confidentiality drift.** If the call involved sensitive personal assessment of a named individual, treat the file as confidential and keep it out of anything client-shareable.

## Red-team posture

Off by default (internal after-action note). If a debrief is to be shared upward or externally, recommend a `pdf-red-team` cynical pass first — an honest internal read often needs softening or redaction before it leaves your machine.

## Reference

- `references/call-debrief-guide.md` — per-call-type dimension rubrics, the rating scale, and the output structure
- `ARCHITECTURE.md` §8.1 — the `[?]` unconfirmed-token convention
- Pairs naturally downstream of `pdf-clean-transcript` and upstream of `pdf-update-raid` / `pdf-decision-log`

## Tone

Direct. British English. Objective over kind — the value is candour. Lead with the outcome; let the ratings explain it.
