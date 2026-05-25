# Retrospective formats — when each fits

Four formats supported in `pdf-run-retrospective`. The workflow does not default — user picks at invocation because the format frames the conversation.

---

## Liked / Learned / Lacked / Longed-for

**Best for:** team retros, recurring sprints, comfortable teams who can be direct.

**Prompts:**
- **Liked:** What did we genuinely enjoy about how we worked?
- **Learned:** What did we discover — about the work, about each other, about ourselves?
- **Lacked:** What was missing? (Time, capability, clarity, access, support.)
- **Longed for:** What did we wish we'd had — and what might that mean for next time?

**Strengths:** symmetric (positives and negatives have equal weight); the "Longed-for" framing pulls forward-looking thoughts.

**Watch-outs:** "Liked" can become performative; encourage specificity.

---

## What Went Well / What Didn't / What to Change

**Best for:** end-of-engagement retros, mixed audiences, when you want a tight format that maps cleanly to action items.

**Prompts:**
- **What went well?** Specific moments, named decisions, observed behaviours. Not "the team worked hard".
- **What didn't go well?** Specific moments, named decisions, observed behaviours. Not "communication could improve".
- **What would we change?** Concrete, owned, doable.

**Strengths:** familiar to most teams; "What to Change" maps directly to action items.

**Watch-outs:** can become generic if not pushed for specificity. The workflow's anti-pattern guard catches generic findings.

---

## Sailboat (Wind / Anchors / Rocks)

**Best for:** mid-engagement retros, strategy-shift conversations, teams that respond to metaphor.

**Prompts:**
- **Wind:** What's helping us move forward? (Forces, practices, people, momentum.)
- **Anchors:** What's holding us back? (Habits, processes, relationships, technical debt.)
- **Rocks:** What dangers are ahead? (Risks we can see; known unknowns.)

(Some variants add **Sun** = the goal, **Island** = the destination — useful at planning rather than reviewing.)

**Strengths:** the metaphor encourages structural thinking — anchors are different from rocks even though both are negative.

**Watch-outs:** the metaphor can be off-putting in formal cultures; check the audience.

---

## 5-Whys cause-deep-dive

**Best for:** retros focused on a specific failure or near-miss; phase-boundary debriefs; incident postmortems.

**Prompts:**
- Pick the one most-important thing that happened (positive or negative).
- *"Why did that happen?"* — first cause.
- *"And why was that?"* — second.
- Continue for up to 5 levels.
- Then ask: *"What lesson does the root cause give us?"*

**Strengths:** forces causal reasoning; produces sharper lessons than format-driven retros.

**Watch-outs:** narrow focus — covers one topic deeply, not the engagement broadly. Often best run as a complement to one of the broader formats.

---

## Choosing a format

| Situation | Suggested format |
|---|---|
| Final closure retro, full team | What Went Well / What Didn't / What to Change |
| Mid-engagement strategy review | Sailboat |
| Cross-functional retro with vendors / partners | Liked / Learned / Lacked / Longed-for |
| Specific incident or near-miss | 5-Whys |
| Phase-boundary at the end of a major milestone | Liked / Learned / Lacked / Longed-for or What Went Well / What Didn't |

If unsure, default to **What Went Well / What Didn't / What to Change** — it's the most legible to mixed audiences and maps cleanly to action items.

## Anti-patterns across all formats

- **Performative positives.** "The team worked really hard" is not an observation; it's flattery dressed up. Push for specific named moments.
- **Generic negatives.** "Communication could improve" gives nobody anything to act on. What communication? Between whom? At what point? About what?
- **Action items without owners.** A retro's currency is lessons-with-action. Unowned actions evaporate.
- **Skipping the hard one.** Most retros have one finding nobody wants to surface. Felix's role here is to ask, gently, what's not being said.
- **Lessons that match the headline rather than the substance.** "Lesson: communicate better" is the headline; "Lesson: when a CR is in commercial review, the delivery team should hold a weekly status hold-point with the commercial owner until the CR is closed" is the substance. The workflow pushes for substance.

## Internal vs client-shareable

The retrospective workflow produces two sections in one file (per design choice). The internal section is the canonical record — names, costs, politics, all included. The client-shareable section is derived — roles not names, ranges not specifics, no blame, no contradictions with engagement-time messaging.

The redaction step is **its own act**, not a perfunctory copy-paste. The workflow walks each internal finding and asks what the redacted version is.

When the two sections look identical, the redaction wasn't done.
