# SCQA — Situation, Complication, Question, Answer

The pyramid-principle structure for escalation memos. Originated by Barbara Minto at McKinsey; widely used in management consulting and high-stakes corporate communication. PDF adopts SCQA as the canonical escalation structure because it forces the writer to do the work the reader cannot.

## The structure

| Section | Function | Length |
|---|---|---|
| **Situation** | The agreed baseline. What is true that the recipient already knows and accepts. | One paragraph |
| **Complication** | What has changed, gone wrong, or now threatens. The "but". | One paragraph |
| **Question** | The implicit question the recipient is now asking — surfaced for them. | One sentence |
| **Answer** | The recommendation + the specific decision needed. | Four labelled fields |

## Why the order matters

**Situation first** establishes shared ground. If the recipient disputes Situation, the rest of the memo is wasted; surfacing dispute at the top is a feature.

**Complication second** introduces tension *only after* shared ground is established. This is the asymmetry between escalation memos and status updates: status updates can lead with the headline because the audience expects regular updates; escalations need the recipient bought into the baseline before they accept the disruption to it.

**Question third** is the most-skipped step and the most valuable. The writer's job is to articulate the implicit question the recipient is now asking — because they may not have framed it yet. Doing this work for them is the entire point of the memo. If you cannot state the question in one sentence, the escalation isn't ready; the writer hasn't done the thinking.

**Answer last** is the recommendation and the ask. Crucially, the answer has four sub-fields:
- **Recommendation** — what you think should happen
- **Decision needed** — the specific call the recipient needs to make
- **Deadline** — when you need it by
- **Without this decision** — the consequence; this is what makes it an escalation rather than a question

## Worked example

Bad version (what most people write):

> "Hi Sarah, just wanted to flag that the data-migration workstream is running behind. The vendor has been slow to respond and the team is doing their best but we're now looking at a 2-week slip. I think we need to talk about whether to bring in a second vendor or push the deadline. Could we set up a meeting?"

What's wrong: no Situation; the Complication is buried in qualifiers ("vendor has been slow", "doing their best"); the Question is absent; the Answer is a meeting request, not a decision.

Good version (SCQA):

> **Situation.** Data-migration was scheduled for completion by 30 June, supporting the 14 July go-live committed in the charter. The vendor (Acme Data) was contracted on 1 March with a 16-week delivery window.
>
> **Complication.** Acme Data has missed two consecutive milestones (15 May and 1 June) due to staffing on their side. They are now 3 weeks behind their own schedule. Three weeks of float existed in our plan; we have now consumed it. Our 14 July go-live is at risk.
>
> **Question.** Should we extend the deadline, bring in a second vendor in parallel, or descope the dependent feature?
>
> **Answer.**
> - **Recommendation:** Bring in Beta Data Solutions for the migration of the two most complex datasets, in parallel with Acme Data continuing on the simpler ones. Estimated incremental cost £40k. Recovers ~10 days.
> - **Decision needed from you:** Approve the £40k incremental spend and the dual-vendor approach.
> - **By when:** Friday 13 June (any later and the parallel-vendor option closes).
> - **Without this decision:** 14 July go-live slips to ~28 July, triggering Q3 contractual penalty clause of £85k.

What's right: shared ground established; complication has named data points; question is one sentence; answer has all four fields; deadline is real; consequence is quantified.

## Anti-patterns

| Anti-pattern | What it looks like | Why it fails |
|---|---|---|
| **Buried Situation** | Memo starts with the problem | Recipient hasn't accepted the baseline; they argue the framing instead of the decision |
| **Vague Complication** | "Things are slipping" without numbers, dates, or causes | Recipient can't assess severity; will default to "wait and see" |
| **No Question** | Goes straight from Complication to Recommendation | Reader doesn't feel ownership of the problem; treats the memo as an FYI |
| **Soft Answer** | "We need to figure out next steps" / "It would be good to discuss" | This is a meeting request, not an escalation |
| **No deadline** | "When you have a moment" | Allows infinite deferral; the consequence has time to materialise |
| **No consequence** | "Please decide" with no "or else" | Removes the urgency that makes it an escalation |

## Tone rules specific to SCQA

- **Strip blame language.** Name the cause, not the culprit — unless naming the culprit *is* the decision being asked for (e.g. "Should we terminate the contract with Acme Data?"). In that case, name them, but be precise about what they did and didn't do.
- **No hedging in the Answer.** "It might be worth considering" / "perhaps we should" — strip on tone check. The Recommendation is your assessment; own it. If you're not sure, the memo isn't ready.
- **No emotion in Situation.** Situation is agreed facts, not feelings. Save any judgement for Complication and Answer.
- **One question, not a list of questions.** If you have three questions, write three memos. Memos with question lists are status updates pretending to be escalations.

## When SCQA doesn't fit

Some communications shouldn't use SCQA:
- **Status updates** — use the weekly-status template (Ronan). Status updates lead with the headline; SCQA leads with the baseline.
- **Decision logs** — use `decision-log.md`. The decision has already been made; SCQA is for *requesting* a decision.
- **Routine asks** — if it doesn't have a real consequence-without-decision, it's not an escalation; route to the weekly status's Asks section.
- **Bad-news disclosures with no decision needed** — these are stakeholder updates (Helena's other workflow); use the per-archetype framing instead.
