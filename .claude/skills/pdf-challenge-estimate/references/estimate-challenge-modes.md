# Estimate challenge modes

The workflow supports two modes. Pick the right one for the situation.

| Mode | Use when | Doesn't work when |
|---|---|---|
| **Pre-mortem** | The estimate is yours or your team's. You have time to think slowly. The estimate exists in your head, in a thin doc, or as a casual commitment. Participatory; works solo. | The user has already decided and wants validation, not challenge. The mode requires real imaginative effort. |
| **Red-team** | The estimate is in an external document (vendor quote, client target, sub-contractor estimate). You need to attack a position, not generate one. Fast. | There is no concrete document, only verbal commitments. |

---

## Pre-mortem mode

**The framing.** Imagine it is 12 months from now. The estimate you are about to challenge proved **50% wrong** (either over or under, ask the user which). The engagement has failed in a non-catastrophic but visible way directly attributable to this estimate. You are writing the post-mortem.

**Walk the questions in this order. One at a time.**

### Section 1 — The failure mode

- *"In one paragraph: what went wrong? Imagine you're writing the first paragraph of the post-mortem."*
- *"What was the proximate cause — the thing that made the estimate wrong?"*
- *"What was the deeper cause — the assumption that turned out to be false?"*

### Section 2 — Assumptions

- *"What are the three most important assumptions baked into this estimate?"*
- *"For each: how confident are you it's true today? What would invalidate it?"*
- *"Which assumption did you not realise you were making until just now?"*

### Section 3 — Optimism bias

- *"Where in this estimate did you (or whoever produced it) assume the best case?"*
- *"What did you not include because it 'shouldn't happen' or 'probably won't be needed'?"*
- *"What does the worst plausible scenario look like, and what does that do to the estimate?"*

### Section 4 — Base rates

- *"What's the base rate for engagements / activities like this? (Industry norm, your own history, peer firms.)"*
- *"How does your estimate compare to that base rate?"*
- *"If your estimate is faster / cheaper / smaller than base rate, what specifically makes this engagement easier? Be honest."*

### Section 5 — Hidden costs

- *"What costs are you not pricing because they're 'overhead' or 'someone else's budget'?"*
- *"What costs only become visible once the work starts (rework, environment setup, integration friction, vendor onboarding)?"*
- *"What costs do you suspect are being absorbed but not measured?"*

### Section 6 — External dependencies

- *"What does the estimate assume about parties outside your control? (Client, vendor, regulator, ops, security.)"*
- *"Have those parties confirmed those assumptions? In writing?"*
- *"What happens if one of them is 2 weeks late on something you've assumed they'll deliver?"*

### Section 7 — Revision

- *"Given everything above: revised estimate, expressed as a range (low / likely / high)?"*
- *"Confidence in the revised range: high / medium / low?"*

### Output mapping

Sections 1–6 populate "Pre-mortem findings". Section 7 populates "Outcome".

---

## Red-team mode

**The framing.** Take the estimate document as the opposing position. Attack it. Find the weakest assumptions, the most optimistic numbers, the missing contingencies, the hidden costs, the unhedged dependencies. You are not being mean; you are doing the work the document's author either skipped or hid.

**Walk the attacks in this order.**

### Attack 1 — Assumptions audit

- Read every numeric or factual claim in the document.
- For each: *"What does this claim require to be true? Is that required condition stated as an assumption? If not, why not?"*
- Output: list of unstated assumptions.

### Attack 2 — Best-case detection

- *"Which numbers in this document are best-case in disguise?"*
- Flags: "should", "if", "assuming", "best case", "minimum viable", "we expect".
- For each: *"What's the realistic case, and what's the worst plausible case?"*

### Attack 3 — Contingency hunt

- *"Where is the contingency in this estimate?"*
- *"Is it called out explicitly, or buried in the numbers?"*
- *"If contingency is < 10%, what justifies the unusual confidence?"*

### Attack 4 — Cone of uncertainty

- *"How early in the engagement is this estimate? Estimates produced at planning stage are typically ± 50% — does this estimate acknowledge that?"*
- *"If yes, is the range plausibly wide? If no, why not?"*

### Attack 5 — Hidden cost sweep

Walk these standard hidden-cost categories. For each, ask: *"Is this priced?"*
- Environment / infrastructure setup
- Vendor onboarding and procurement
- Security and compliance review
- Data migration / data quality
- Integration testing across environments
- Knowledge transfer and handover
- Documentation
- Client-side change management
- Travel / co-location if applicable
- Buffer for sickness, attrition, holidays

### Attack 6 — Dependency exposure

- *"What does this estimate require from parties not under the team's control?"*
- *"For each: are they aware of the dependency? Have they committed? On what timeline?"*

### Attack 7 — Sensitivity

- *"What single assumption, if wrong, has the largest impact on the estimate?"*
- *"By how much would the estimate move if that assumption were wrong by 30%?"*
- *"Is that risk priced or unpriced?"*

### Output mapping

Attacks 1–6 populate "Red-team findings". Attack 7 populates the "Most fragile assumptions" subsection. The synthesis populates "Outcome".

---

## Anti-patterns across both modes

- **Vague findings.** "Optimistic about velocity" is not a finding; "team velocity assumed 40 points/sprint but last 3 sprints averaged 28 (-30%)" is.
- **Symmetric hedging.** "Could be more or less" is not a challenge; pick a direction and state magnitude.
- **Single-point revised estimates.** Petra's principle 4. Always ranges.
- **No action items.** A challenge that produces zero action items means either nothing was found or the findings weren't taken seriously. Both warrant a second pass.
- **"Trust the team" or "trust the vendor" as the answer.** These are not estimation methods. If you genuinely trust them, articulate why — track record, evidence, base-rate matching.
- **Conflating modes.** Pre-mortem and red-team produce different outputs. Don't mix questions across modes in one challenge entry. If you want both, run two separate challenge entries.

---

## A note on tone

Both modes are adversarial *toward the estimate*, not toward the estimator. The point is to find what the document missed, not to embarrass the author. The challenge-log entries should read as forensic, not combative. Strip any language that personalises the critique.
