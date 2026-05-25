# Cone of uncertainty — estimation precision by maturity stage

Originated in construction; popularised in software by McConnell. The cone describes how accurate an estimate can honestly be at each maturity stage of an opportunity. PDF uses this as the canonical honesty unit for ROM estimates.

## The cone

```
        Cost / Effort estimate range (vs eventual actual)
        
  +100% ┐ ●─────────────────────────────────
        │
   +50% ┤        ●──────────────────────────
        │
   +25% ┤              ●────────────────────
        │
   +15% ┤                    ●──────────────
        │
    +5% ┤                          ●────────
        │
 ───── 0% ┼──┬───────┬──────┬─────────┬──────┬─────
   -5% ┤                          ●────────
        │
   -10% ┤                    ●──────────────
        │
   -25% ┤              ●────────────────────
        │
   -33% ┤        ●──────────────────────────
        │
   -50% ┘ ●─────────────────────────────────
        ──────────────────────────────────────────
        Feasibility  Concept  Scope  Design  Build
                              Agreed  Done    Done
```

## The five stages PDF tracks

### Stage 1: Feasibility

**Range:** -50% to +100% of the point estimate.
**Meaning:** The actual cost could be as little as half the point estimate, or as much as double it.

**What you know at this stage:**
- The general problem
- A rough hypothesis about the solution
- An indicative team shape
- Almost nothing about hidden constraints, data quality, regulatory complexity

**What you don't know:**
- Anything you'll discover during scoping
- The actual technical landing
- The client's real bandwidth for change
- The compliance lift
- Most of the dependencies

**Honest framing:** "At this stage, the estimate is a credible operating range; not a commitment."

### Stage 2: Concept

**Range:** -33% to +50%.
**Meaning:** A meaningful narrowing — you have a confirmed shape but the SoW hasn't been written.

**What you know:**
- The chosen sizing option from `pdf-shape-opportunity`
- Confirmed problem statement
- Some named dependencies
- Initial assumption testing

**What you don't know:**
- Final scope wording
- Detailed acceptance criteria
- Specific commercial terms

### Stage 3: Scope-agreed (SoW signature)

**Range:** -25% to +25%.
**Meaning:** Symmetric range. You should be able to deliver within this band on most engagements.

**What you know:**
- Final scope wording
- Acceptance criteria
- Commercial terms
- Most named dependencies and access arrangements
- Team and ramp confirmed

### Stage 4: Design-complete

**Range:** -10% to +15%.
**Meaning:** Asymmetric — engagements rarely come in significantly cheaper than design-complete estimates; they often overrun a bit.

**What you know:**
- All technical decisions made
- Detailed scope per workstream
- Known unknowns are listed and sized

### Stage 5: Build-complete (forecast-to-complete)

**Range:** -5% to +5%.
**Meaning:** Tight. By this stage, your remaining estimate is for the remaining work, which is constrained.

## How PDF enforces this

- The ROM estimate's frontmatter records the cone stage.
- The operating range must match the cone factors for that stage.
- `pdf-estimate-rom` validation rejects narrower cones than the stage warrants.
- Updates to a ROM estimate that advance the cone stage must explain what new information justified the narrowing.

## Why this matters

The most common estimation failure is **false precision at early stages.** Producing a £487,250 estimate at feasibility stage signals certainty you don't have. Clients (and your own commercial team) anchor on the precision rather than the range, and disappointment compounds when the actual lands at £580,000.

The honest version: "Operating range £325k–£820k at feasibility; narrows to £400k–£600k at concept; ±25% at SoW signature."

## Common anti-patterns

- **Single-point estimates dressed as ranges.** "£480k–£520k" at feasibility stage isn't a cone; it's a point with cosmetic padding. The cone at feasibility is **at least** -50% to +100%.
- **Cone narrowing without new information.** Going from feasibility to concept requires the shape to be confirmed; if nothing has changed, the cone shouldn't narrow.
- **Contingency dressed as cone.** Contingency covers known risks; the cone covers structural uncertainty. They are different. Both can coexist; PDF surfaces both transparently.
- **Anchoring on the client's budget.** If the client says "we have £500k", the cone-of-uncertainty discipline asks: does your build-up confirm a £500k mid-point, or are you bending the estimate? The cone is independent of the client's number.

## Communicating the cone externally

Most clients don't want to hear a -50% to +100% range. Sofia's recommended framing:

- **Lead with the operating range:** "£325k–£820k at this stage."
- **Acknowledge the precision honestly:** "This will narrow significantly as we shape the scope and confirm dependencies."
- **Name the cone-narrowing milestones:** "At Scope-agreed (SoW signature), we expect ±25%."
- **If pushed for a single number:** offer the midpoint with the caveat that it is not a commitment.

The credibility move is **showing the cone-narrowing trajectory**, not pretending the early estimate is more precise than it can be. Clients who have been burned by suppliers giving them precise numbers that drift respect the cone framing; clients who haven't had that experience benefit from learning the discipline before they have it.

## When to override

Some opportunities legitimately have narrower cones at early stages because the work is highly repeatable (e.g. a tenth-time-running implementation of the same package). In that case, the workflow accepts an override with explicit reasoning in frontmatter:

```yaml
cone_override: true
cone_override_reason: "Tenth deployment of identical package; historical variance under 15% across past nine engagements; building from documented base estimate."
```

The default posture is no override — the discipline is more valuable than the convenience.
