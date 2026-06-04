# Risk scale guide

The deep-dive reference for `pdf-create-risk-approach`. Carries the default scale bands, the matrix rubric, the appetite-statement structure, and a category starter set.

Everything here is a **firm-neutral default**. It is common-practice risk-management scaffolding (the shape used across PMBOK, ISO 31000, and the UK Orange Book), not any one organisation's standard. Present defaults as a starting point; the engagement overrides them.

## Why defined scales matter

An undefined 1–5 scale produces scores that look quantitative but aren't. If one person reads "Likelihood 4" as "more than half likely" and another as "it'll probably happen eventually", the L×I product is noise dressed as signal. Defining the bands once converts the score from an opinion into a shared measurement. It also makes residual scoring meaningful: "we reduced this from 16 to 6" only means something if 16 and 6 are anchored.

## Default probability scale (Likelihood 1–5)

| Score | Label | Probability band (default) |
|---:|---|---|
| 1 | Rare | < 10% |
| 2 | Unlikely | 10–30% |
| 3 | Possible | 30–50% |
| 4 | Likely | 50–75% |
| 5 | Almost certain | > 75% |

Bands should reflect the **exposure window** the engagement cares about (e.g. "within this phase"), not "ever". Make the window explicit.

## Default impact scale (1–5, multi-dimensional)

A risk's impact score is the **highest** score it reaches on any single dimension. Tie the cost column to the budget baseline if one exists.

| Score | Cost | Schedule | Quality / scope | Reputation / stakeholder |
|---:|---|---|---|---|
| 1 | negligible | < 1 day | cosmetic | none noticed |
| 2 | minor (< 1% budget) | up to ~1 week | minor rework | internal grumble |
| 3 | moderate (1–5%) | ~1–2 weeks | a feature degraded | client PM concern |
| 4 | major (5–10%) | ~2–4 weeks | a milestone at risk | sponsor concern |
| 5 | severe (> 10%) | > 4 weeks / go-live at risk | acceptance failure | executive / external exposure |

The percentages and durations are illustrative; calibrate to the engagement's size. A two-week slip is catastrophic on a six-week engagement and trivial on a three-year one.

## Default rating matrix & severity bands

| L×I range | Severity | Required response (default) |
|---|---|---|
| 1–4 | Low | Monitor; review at cadence. |
| 5–9 | Moderate | Named owner; treatment optional but justified if declined. |
| 10–15 | High | Active treatment plan required (`pdf-create-mitigation-plan`). |
| 16–25 | Critical | Treatment plan **and** escalation within the agreed window. |

## Risk appetite statement — structure

A usable appetite statement has three parts:

1. **Where we will take risk** — the areas the engagement accepts exposure to in exchange for pace or value.
2. **Where we won't** — the zero-appetite areas (often security/compliance, safety, or a specific contractual commitment).
3. **The hard threshold** — the score or band at or above which active treatment and escalation become mandatory rather than discretionary.

The third part is the one teams skip and the one that actually drives behaviour. Without it, "we are risk-aware" is a slogan. The threshold must also agree with the escalation thresholds in `GOVERNANCE.md`; two numbers in two documents is a future argument.

## Category starter set

Firm-neutral; override per engagement. Categories let appetite vary (zero appetite for one category, higher tolerance for another) and surface portfolio-level patterns.

- Delivery / schedule
- Commercial
- Technical / architecture
- People / resource
- External / vendor / dependency
- Security / compliance
- (engagement-specific additions)

## Two-sided risk: threats and opportunities

Risk is uncertainty with either sign. Most registers only track downside, which quietly trains the team to ignore upside. Track both, with the right response set:

| | Threat (negative) | Opportunity (positive) |
|---|---|---|
| Reduce/avoid exposure | **Treat** (reduce L or I) | **Enhance** (increase L or I) |
| Hand it off | **Transfer** (insurance, contract, vendor) | **Share** (partner to capture jointly) |
| Decide to live with it | **Tolerate** (accept, monitor) | **Accept** (take it if it comes) |
| Remove it entirely | **Terminate** (kill the cause) | **Exploit** (make certain it happens) |

`pdf-update-raid` enforces the threat set for `type: threat` rows and the opportunity set for `type: opportunity` rows.

## Common failure modes (and the refusal)

- **Unlabelled scores.** The whole point is to define them; blank bands are refused at validation.
- **Appetite with no threshold.** Slogan, not strategy. Require the number/band.
- **Cost-only impact.** Under-rates the schedule, quality, and reputational risks that often hurt most.
- **Threshold that contradicts governance.** Reconcile to `GOVERNANCE.md` or flag the conflict explicitly.
