# Commercial models — the four canonical choices

PDF treats commercial-model selection as a choice that should be revisited as risk shifts. The four models below are the canonical options; hybrids are common (e.g. T&M for discovery + FP for build) and are valid recommendations.

---

## T&M (Time & Materials)

**What it is.** Client pays for time worked at agreed day-rates plus expenses. Volume of work flexes; cost is uncapped.

**Fits when:**
- Scope is genuinely uncertain (e.g. exploratory work, R&D, regulated discovery)
- The client wants control and is comfortable with execution risk
- Trust between parties is high (T&M assumes the supplier won't pad hours)
- The work is iterative and re-prioritisation is expected

**Doesn't fit when:**
- Client has a fixed budget for a defined outcome
- Trust is low and time-based billing will be policed adversarially
- Client procurement requires cost certainty for sign-off

**Margin behaviour.** Stable, low-variance. The supplier earns a target margin on day-rates; volatility is absorbed by the client.

**Risk allocation.** Almost all execution risk sits with the client.

**Common pitfalls.** Scope drift without re-baselining; T&M sometimes used as a fallback when neither party wanted to negotiate a fixed price properly.

---

## Fixed-Price (FP)

**What it is.** Supplier delivers a defined scope for a fixed total. Variance is absorbed by the supplier.

**Fits when:**
- Scope is well-defined and stable
- Client wants cost certainty for budgeting / procurement reasons
- The supplier has high confidence in the estimate (low cone-of-uncertainty)
- The relationship is transactional rather than partnership

**Doesn't fit when:**
- Scope is uncertain — FP under uncertainty leads to defensive scoping, change-request friction, and adversarial relationships
- Discovery and build are bundled (you can't FP discovery honestly)
- The client expects to flex priorities during delivery

**Margin behaviour.** High variance. Good estimates and tight scope discipline produce strong margin; poor estimates and scope creep destroy it.

**Risk allocation.** Most execution risk on the supplier.

**Common pitfalls.** FP under uncertainty (the "we'll figure out scope as we go" FP); milestone gaming; CR friction.

---

## Capacity (Dedicated Team)

**What it is.** Client buys a dedicated team of agreed size and seniority for a defined period. The team's output is whatever the client prioritises within capacity.

**Fits when:**
- Client wants long-term, predictable engineering capacity without micromanaging tasks
- Backlog is large enough to keep the team productive
- The work is genuinely product-shaped (backlog-driven, prioritised by client product owner)
- The client has the product / PO capability to direct the team

**Doesn't fit when:**
- Work is project-shaped with defined deliverables — FP or T&M-with-milestones fits better
- The client lacks product / PO capability — capacity teams stall without good direction
- Client wants to flex team size frequently

**Margin behaviour.** Stable like T&M but at a premium for dedication and team-coherence.

**Risk allocation.** Most risk on the client (similar to T&M) but with a stability premium.

**Common pitfalls.** Capacity teams stagnating when client prioritisation breaks down; over-staffing locked in by contract while client backlog dries up.

---

## Outcome-based

**What it is.** Supplier is paid for achieving a measurable business outcome. Mechanics vary: gainshare, success fees, performance bonuses, fixed-fee-with-bonus-on-KPI.

**Fits when:**
- A clear, measurable, attributable business outcome exists
- Both parties trust the measurement and the baseline
- The supplier has meaningful influence over the outcome (not just one input among many)
- The size of the prize justifies the negotiation overhead

**Doesn't fit when:**
- The outcome is partly outside the supplier's control (which is most of the time)
- Measurement is contested or noisy
- The supplier is one of several contributors
- The negotiation cost to define "outcome" exceeds the price premium

**Margin behaviour.** Extreme variance. When it works, exceptional margins. When it doesn't, the supplier eats the cost of doing the work without payment.

**Risk allocation.** Heavily supplier-side, mitigated only by careful definition of outcome and attribution.

**Common pitfalls.** Outcomes that turn out to depend on factors the supplier can't influence; measurement disputes at payment time; "outcome" used as marketing wrapper around what's really FP.

---

## Hybrid (most engagements at scale)

Most engagements above ~£500k benefit from a hybrid:

- **Discovery (T&M)** → **Build (FP or Capacity)** is the most common pattern, with a phase gate
- **Build (FP)** → **Run / hypercare (Capacity)** for post-go-live
- **Capacity team with outcome bonus** for product-style engagements
- **Multiple FP phases** with phase-gate go/no-go decisions

The review workflow allows `switch-to-hybrid` as a recommendation; the recommendation should name the constituent models and the phase boundaries.

---

## Choosing checklist

When recommending a model (or switch), the review should explicitly consider:

1. **Where is the cone of uncertainty?** (Uncertain → T&M / Capacity; certain → FP / Outcome.)
2. **What does the client most want — cost certainty or scope flexibility?**
3. **What's the client's procurement and budget reality?** (E.g. some clients can't approve T&M for political reasons even when it's the right model.)
4. **What's our margin appetite for variance?** (Some firms can't absorb FP variance; others depend on FP for margin upside.)
5. **What's the trust level?** (Low trust + T&M is poor; low trust + FP is also poor — low trust just makes everything harder.)
6. **What size is the engagement?** (Small engagements rarely justify outcome-based; large engagements rarely fit cleanly into a single model.)

The review's `Fit` rating should reflect the answers to these six.

---

## Anti-patterns

- **Defaulting to whatever was in the original contract.** This is exactly what Theo's principle 4 exists to push back against.
- **Switching for client convenience without naming the implications.** A T&M-to-FP switch can dramatically shift risk; that risk must be explicit in the CR.
- **Hybrid framings used to avoid choosing.** "Hybrid" should describe an honest phase split, not a fudged single model.
- **Naming a recommendation without a real risk-shift trigger.** Mid-engagement model switches are disruptive; they should be triggered by something concrete, not by abstract preference.
