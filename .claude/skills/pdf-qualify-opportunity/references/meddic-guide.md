# MEDDIC — qualification framework

Originated at PTC in the 1990s; used widely in enterprise sales and increasingly in consulting opportunity qualification. Six elements; each must be addressed; gaps are themselves findings.

PDF uses MEDDIC as the canonical qualification framework (per design choice). Other frameworks (BANT, custom) are not built into v0.1.

---

## M — Metrics

**The question:** *"What business metric does this opportunity improve, and by how much? In the client's own quantified terms."*

**Strong looks like:** a named metric, a named target, a named time horizon. "Reduce mean cycle time from 6 weeks to 3 weeks by end of Q2 next year."

**Weak looks like:** directional improvement without quantification. "They want to be faster."

**Unknown looks like:** "They've not articulated a specific metric yet."

**Probe for:**
- The metric that matters to the economic buyer
- The current baseline value
- The target value
- The time horizon
- How the target was set (their guess? a market benchmark? a competitor's number? a regulator's deadline?)

**Why this matters:** opportunities without metrics produce engagements without success criteria. Marcus will demand these for the charter; if you can't extract them at qualification, the charter step will fail too.

---

## E — Economic Buyer

**The question:** *"Who can authorise the spend? Single named individual."*

**Strong looks like:** a named individual with confirmed budget authority and willingness to engage on the opportunity.

**Weak looks like:** "We think it would be the CIO" or "It would go to the steering committee" — uncertainty about who, or routing through a committee without a named individual.

**Unknown looks like:** "We haven't identified that yet."

**Probe for:**
- Named individual
- Their budget threshold (is your opportunity above or below their unilateral approval limit?)
- Their attitude toward the spend (eager, neutral, sceptical, exposed)
- Whether they've been engaged on the opportunity directly, or only via the champion / procurement

**Why this matters:** opportunities without a named economic buyer routinely stall in late stages of the sales cycle. The buyer is also the person who will own the engagement's sponsorship — they appear in the charter and the governance plan.

---

## D — Decision Criteria

**The question:** *"What criteria will the client use to evaluate proposals — and in what order of weight?"*

**Strong looks like:** a named list of criteria, weighted or clearly ordered, ideally written somewhere (RFP, scoring matrix, internal evaluation rubric).

**Weak looks like:** "They want a strong team" or "Price will matter" — generic criteria without weight or specificity.

**Unknown looks like:** "We don't know how they'll evaluate this."

**Probe for:**
- Criteria they care about (technical, commercial, brand, risk, references, methodology, etc.)
- Relative weights (or at least order)
- Hard requirements vs preferences
- Any specific evaluators on their side and what each cares about

**Why this matters:** the decision criteria drive how you shape the proposal and what you put in the SoW. Misalignment here costs proposal effort and credibility.

---

## D — Decision Process

**The question:** *"How will the decision actually be made — who, when, in what sequence?"*

**Strong looks like:** named individuals, named meetings, named dates, a clear path from current state to signed contract.

**Weak looks like:** "We expect a decision in Q3" without process visibility.

**Unknown looks like:** "We're not sure how their procurement works."

**Probe for:**
- Steps remaining in their process (evaluation, shortlist, BAFO, legal, signature)
- Named individuals at each step
- Expected dates
- Their procurement involvement (in or out of the loop?)
- Required approvals you may not have visibility into (audit committee, board, central procurement)

**Why this matters:** opportunities that "feel close to signed" with no visible decision process often aren't. Process visibility is the difference between confidence and hope.

---

## I — Identify Pain

**The question:** *"What's actually driving them to do this now? What does pain look like if they don't?"*

**Strong looks like:** specific, current, painful, with an owner who feels it.

**Weak looks like:** "It would be good to have" or "It's on our roadmap" — no urgency-creating pain.

**Unknown looks like:** "They've not articulated why now."

**Probe for:**
- What's gone wrong recently to put this on the agenda
- Who's losing sleep
- What does the pain cost (in £, in time, in reputation, in regulatory exposure)
- What does inaction look like

**Why this matters:** no pain = no urgency = no deal. Opportunities without identifiable pain take many months to close, frequently re-baseline, and often die quietly. This is the most common reason an opportunity that "looks great" never converts.

---

## C — Champion

**The question:** *"Who inside the client organisation will fight for this opportunity when you're not in the room?"*

**Strong looks like:** a named individual who has visibly advocated for the project, who has access to the economic buyer, who has political capital to spend, who has a personal interest in seeing this succeed.

**Weak looks like:** a friendly contact who's been helpful but is not in a position to advocate at the decision-making level.

**Unknown looks like:** "We've been talking mainly to procurement / a contact who isn't part of the decision."

**Probe for:**
- Named individual
- Their seniority and influence
- What they have at stake personally (career, project ownership, reputation, problem-solving need)
- Whether they've shown up at moments when advocacy was needed (or only at convenient ones)
- Whether they have access to the economic buyer

**Why this matters:** the champion is the single most predictive MEDDIC element. Opportunities without a champion almost never close on time; opportunities with a strong champion close even when other elements are mixed.

PDF refuses to recommend `GO` without a named champion. This is structural.

---

## Common qualification mistakes

- **Optimism dressed as Strong ratings.** Without named individuals and specific evidence, ratings should be Weak. The workflow's anti-pattern guard catches all-Strong-no-names.
- **Procurement contact mistaken for Champion.** Procurement runs process; champions advocate. The two are rarely the same person.
- **Treating "they're talking to us" as Pain.** Pain has a cost. If you can't articulate the cost of inaction, the pain isn't strong.
- **Sunk-cost bias.** Time invested in qualification doesn't justify a GO. The workflow flags this when the recommendation is GO but the rating distribution is weak.
- **Skipping qualification for "small" opportunities.** Small opportunities that go wrong damage the relationship out of proportion to their size. Qualify everything.

---

## Recommendation thresholds (overridable per firm)

- **GO:** ≥ 4 Strong; ≤ 1 Unknown; Champion is Strong.
- **GO with conditions:** ≥ 3 Strong; the conditions name what must move from Weak/Unknown to Strong, by when.
- **Qualify further:** 2 Strong; the workflow names what to investigate.
- **NO-GO:** ≤ 2 Strong, or Champion is Unknown, or Economic Buyer is Unknown after multiple investigation rounds.

These live in `customize.toml`; firms with different cultures can tune them. The defaults are deliberately strict — Sofia's principle 1.
