# Metric specification guide

The deep-dive reference for `pdf-create-measurement-plan`. The SKILL.md links here for field definitions, the GQM worked example, and the consumer-mapping table.

## Goal → Question → Metric (GQM) in one paragraph

GQM is a top-down measurement method: you do not start from "what can we count", you start from "what are we trying to achieve". A **goal** states the purpose; one or more **questions** operationalise it; one or more **metrics** answer each question. Measured bottom-up (metric → question → goal), every number can justify its own existence. If a metric cannot be traced up to a goal, it should not be collected.

### Lightweight goal template

State each goal as a single sentence assembled from four parts:

> Analyse **\<object\>** for the purpose of **\<purpose\>** with respect to **\<quality focus\>** from the viewpoint of **\<viewpoint\>**.

- **Object** — the thing measured (the delivery, the codebase, the team, the spend).
- **Purpose** — characterise / evaluate / predict / improve / control.
- **Quality focus** — the attribute of interest (predictability, throughput, defect escape, margin, retention).
- **Viewpoint** — whose lens (delivery manager, sponsor, client PM, engineering lead).

Every goal must cite a **charter success criterion** in its own wording, or be tagged `operational (not charter-linked)` with a one-line reason (e.g. "internal hygiene metric, not a contractual success measure").

## The mandatory per-metric fields

| Field | What good looks like | Refuse if |
|---|---|---|
| **Name** | Short, unambiguous, plus any synonym in use | — |
| **Definition** | The exact formula and the base measures it is computed from (e.g. "completed story points ÷ committed story points per sprint") | Narrative hand-wave with no formula |
| **Target / threshold** | A value, a direction (higher-is-better / lower-is-better / in-range), and a *rationale* for the number | A number with no rationale; a target visibly set to flatter |
| **Baseline** | The current value, or `no baseline yet` plus a date to establish it | An invented or guessed current value |
| **Data source & collection** | Where the raw data lives and how it is gathered | "We'll figure it out" |
| **Frequency** | A real cadence (per sprint, weekly, monthly, per milestone) | "Ongoing" with no cadence |
| **Owner** | A named person in `STAKEHOLDERS.md` | A role with no name, or a name not in stakeholders |
| **Analysis procedure** | Valid range, how to read it, and the value/trend that triggers an action | "Look at it and see" |
| **Reporting destination** | The PDF artifact or ritual where the number surfaces | Empty — a number nobody reads is not a metric |

## Consumer-mapping table (do not re-invent collection)

If a metric is already produced by an existing PDF workflow, reference that workflow as the **existing collector** rather than defining a parallel, divergent calculation.

| If the metric is about… | Canonical collector | Surfaces in |
|---|---|---|
| Delivery throughput / velocity / trend | `pdf-velocity-check` | weekly status, steering |
| Budget burn vs baseline | `pdf-track-budget` | budget tracker, steering |
| Gross margin / margin drift | `pdf-analyse-margin` | margin analyses, steering |
| Code quality, unit testing, review, tech debt | `pdf-sdlc-health` | SDLC health card |
| Test management, defects, NFRs, automation | `pdf-qa-health` | QA health card |
| CI/CD (DORA), infrastructure | `pdf-syseng-health` | SysEng health card |
| Secure SDLC, compliance coverage | `pdf-secure-sdlc-health` | Secure SDLC health card |
| Team morale, capacity, retention signal | `pdf-team-health-check` | team health check |
| Risk occurrence ratio (materialised ÷ identified) | `pdf-create-mitigation-plan` (occurrence note) + RAID | RAID review, steering |
| Anything with no existing collector | `none — collected manually` | name the manual destination |

A metric mapped to an existing collector inherits that collector's cadence and source; the measurement plan only adds the **target**, the **owner of the number**, and the **action trigger**.

## Worked example (one goal, end to end)

**Charter success criterion (verbatim):** "Deliver Phase 1 to the agreed scope by the milestone date with no critical defects in production."

**G1 (GQM):** Analyse *Phase-1 delivery* for the purpose of *control* with respect to *predictability and defect escape* from the viewpoint of the *delivery manager*. (Charter link: the success criterion above.)

**Questions:**
- Q1.1 — Is the team delivering at a rate that lands Phase 1 on the milestone date?
- Q1.2 — Are defects escaping to production?

**Metrics:**

### M1 — Sprint delivery predictability

- **Answers question:** Q1.1
- **Definition:** completed story points ÷ committed story points, per sprint; 3-sprint moving average for trend
- **Target / threshold:** 0.85–1.10 (in-range) — sustained < 0.85 signals slippage; sustained > 1.10 signals under-commitment
- **Baseline:** no baseline yet — establish after sprint 2
- **Data source & collection:** sprint board export; collected at sprint close
- **Frequency:** per sprint
- **Owner:** \<delivery manager, from STAKEHOLDERS.md\>
- **Analysis procedure:** read the moving average, not a single sprint; two consecutive sprints outside range triggers a plan review and a RAID entry
- **Reporting destination:** weekly status; steering pack
- **Existing collector:** `pdf-velocity-check`

### M2 — Critical defect escape

- **Answers question:** Q1.2
- **Definition:** count of severity-critical defects found in production per release
- **Target / threshold:** 0 (lower-is-better) — any non-zero is a gate breach
- **Baseline:** 0 to date
- **Data source & collection:** defect register; collected per release
- **Frequency:** per release
- **Owner:** \<QA lead, from STAKEHOLDERS.md\>
- **Analysis procedure:** any critical escape triggers an immediate RAID Issue and a root-cause note
- **Reporting destination:** QA health card; steering pack
- **Existing collector:** `pdf-qa-health`

## Common failure modes (and the refusal)

- **Counting what is easy instead of what matters.** If a metric exists only because the data is available, it has no goal. Refuse.
- **Targets reverse-engineered from current performance.** A target should express ambition or a contractual bar, not yesterday's number relabelled. Probe the rationale.
- **Owner = "the team".** Diffuse ownership is no ownership. Name a person.
- **Two definitions of the same number.** If velocity is computed one way by the collector and another way here, you have created a future argument. Reference the collector.
