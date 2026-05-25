---
name: pdf-velocity-check
description: Read delivery velocity from quantitative data, hand-fed numbers, or qualitative narrative — and report honestly at the precision of the input. Use when the user wants to check delivery trend or sprint velocity.
---

# Velocity check workflow

Produces `_pdf-output/engagements/{active}/04-execution/velocity/<YYYY-Www>.md`. **One file per check.** Default cadence: weekly, but the workflow is on-demand.

**Core principle:** Velocity is a question, not a number. The workflow reports at the precision of its input. If only qualitative input is available, the output is qualitative — no false precision.

## Input modes (any one, or any combination)

| Mode | What you provide | Output precision |
|---|---|---|
| **Jira / ADO CSV** | Path to an export with sprint, story-points-completed, story-points-committed columns (column names configurable in `customize.toml`) | Quantitative + trend |
| **Hand-fed numbers** | Interactive Q&A: "This sprint: X completed of Y planned. Last sprint: A of B." | Quantitative + trend if ≥ 2 sprints |
| **Qualitative narrative** | Free text: "Team felt slower this week. Main drag: vendor delays. Compared to last week: probably 20% behind." | Qualitative narrative + a labelled estimate |
| **Combination** | Any mix | Reports each dimension at its own precision |

## Preconditions

- Active engagement
- `pdf-create-budget-baseline` recommended (Petra), so velocity can be compared against the planned curve. Not required — without a baseline, velocity is reported standalone with a `baseline: missing` note in the output.

## Intent: create

1. **Ask for input mode.** Offer the four modes. User picks one or "I'll give you a bit of each."
2. **Collect:**
   - **CSV mode:** ask for path; parse; identify columns; if columns don't match `customize.toml` hints, ask for confirmation.
   - **Hand-fed mode:** ask for this sprint's completed/committed, then prior 1–3 sprints' numbers.
   - **Qualitative mode:** ask for narrative, then for a labelled estimate ("would you say better, same, worse than last week, and roughly by how much?").
3. **Compute** at the precision of the input:
   - With CSV or hand-fed: per-sprint velocity, simple trend (3-sprint moving average if enough data), variance from baseline if baseline exists.
   - Qualitative only: produce a one-paragraph narrative with explicit uncertainty hedges. **Do not invent numbers.**
4. **Compose** in this structure:

```markdown
---
artifact_type: velocity-check
engagement: <slug>
week: <YYYY-Www>
input_modes: [<csv | hand-fed | qualitative>, ...]
source_data: <path or "interactive" or "narrative">
baseline_available: <true | false>
generated_by: pdf-velocity-check
---

# Velocity check — <YYYY-Www>

## Headline

<one paragraph at the input's precision. If qualitative, no fake numbers.>

## This period

- <metric or qualitative statement>
- <metric or qualitative statement>

## Trend

<n-sprint trend if numeric; "broadly stable / improving / declining" if qualitative, with reasoning>

## Vs. baseline

<comparison to budget baseline if available; "no baseline" otherwise — clearly stated>

## What this likely means

<one paragraph of interpretation. Causes, not just numbers. Reference recent blockers, scope changes, or RAID materialisations if relevant.>

## Recommended action

<one or two bullets. e.g. "Surface in next weekly status." or "Trigger pdf-prep-steering for a velocity discussion.">
```

5. **Write the file.** Update STATUS-LOG with a one-line pointer.
6. **Hand off:** if recommended action mentions steering, offer Helena.

## Intent: update

Re-read a prior week's check with new data (e.g. CSV arrived late after a qualitative read).

## Intent: validate

- [ ] Output precision matches input precision (no invented numbers from qualitative inputs)
- [ ] If baseline is referenced, baseline file exists
- [ ] If CSV source is referenced, path resolves
- [ ] Headline does not contain unsupported claims

## Intent: dump-merge

When invoked from Ronan's dump flow, treat the paste as qualitative input and proceed.

## Anti-patterns to refuse

- **Quoting numbers without source.** If the user says "we're 80% there" with no underlying data, the workflow reports "the user estimates ~80%, no underlying data" — not "the team is 80% complete".
- **Trend claims from one data point.** Trend requires ≥ 2 sprints. With one, report point-in-time only.
- **Implying causation.** "Velocity dropped because…" should never appear unless the user explicitly stated the cause.

## Red-team posture

Off. Internal operational artifact. If a velocity check triggers a difficult steering conversation, Helena's `pdf-prep-steering` will red-team that downstream.

## Reference

- `ARCHITECTURE.md` §6.4
- Ronan's principle 5 ("Velocity is a question, not a number")
