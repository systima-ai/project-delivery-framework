---
name: pdf-decision-log
description: Record a consequential decision. Writes per-stage sub-files plus an engagement-level index. Use whenever a decision is made that should outlive the moment — scope choices, model switches, commercial trade-offs, escalation outcomes, anything you'd want a successor (or your future self) to find later.
---

# Decision log workflow

Records consequential decisions to a per-stage sub-file structure (per design choice).

**File layout:**
- **Engagement-level index:** `_pdf-output/engagements/{active}/decision-log.md` — chronological list of all decisions with one-line summary and link to detail
- **Per-stage detail:** `_pdf-output/engagements/{active}/<stage>/decisions/DEC-<NNN>-<slug>.md` — full decision record

Each decision lives in exactly one stage folder (chosen by the workflow based on the decision's substance). The engagement-level `decision-log.md` becomes a navigable index.

## Preconditions

- Active engagement
- A decision to record

## Intent: create (default)

1. **Capture the decision.** Walk:
   - *"In one sentence, what was decided?"*
   - *"Decided by? (Single named person; the decision-maker, not the influencers.)"*
   - *"Date decided?"* (default: today)
   - *"Context — why did this come up? One paragraph."*
   - *"Options considered? (List; minimum two — even if one was 'do nothing'.)"*
   - *"Rationale — why this option over the others? One paragraph; name the trade-off accepted."*
   - *"Reversible? (yes / no / costly.) If costly, name the cost.*"
   - *"Related artifacts? (Charter, RAID, plan, CR, CO, etc. — paths.)"*

2. **Stage detection.** From the decision's substance, propose the stage folder:
   - Commercial decision (margin, model, pricing, invoicing) → `08-commercial`
   - Scope / charter / governance → `00-constitution` (decisions live with the constitution)
   - Plan / capacity / budget → `03-planning`
   - Day-to-day execution → `04-execution`
   - Stakeholder comms / steering outcomes → `05-governance`
   - Risk / change → `06-risk-change`
   - Quality / SDLC → `07-quality`
   - People → `09-people`
   - Closure → `10-closure`
   - Cross-cutting / unclear → propose `00-constitution`

   The user confirms or overrides.

3. **Generate ID.** `DEC-<NNN>` monotonic across the engagement.

4. **Compose the detail file** at `<stage>/decisions/DEC-<NNN>-<slug>.md`:

```markdown
---
artifact_type: decision
engagement: <slug>
id: DEC-<NNN>
stage: <stage>
date: <YYYY-MM-DD>
decided_by: <name>
reversible: <yes | no | costly>
generated_by: pdf-decision-log
---

# Decision DEC-<NNN> — <slug>

## What was decided

<one sentence>

## Context

<paragraph>

## Options considered

1. <option> — <one-line pros and cons>
2. <option> — <one-line pros and cons>
(...)

## Rationale

<paragraph — names the trade-off accepted>

## Reversibility

- Status: <yes | no | costly>
- If costly: <what the cost is to reverse>

## Related artifacts

- <path>
- <path>

## Decided by

**<Name>**, <YYYY-MM-DD>

## History

- <YYYY-MM-DD> — Decision recorded.
```

5. **Append the index row** to `decision-log.md` at the engagement root:

```markdown
| DEC-<NNN> | <YYYY-MM-DD> | <stage> | <one-line decision> | <decided_by> | <reversible> | `<stage>/decisions/DEC-<NNN>-<slug>.md` |
```

The index lives at the engagement root as a single table; the file is the engagement's chronological decision history.

6. **Hand off.**
   - If the decision changes scope / budget / timeline / compliance → recommend `pdf-create-change-request` (Klaus) if not already done; recommend `pdf-create-charter` update intent.
   - If the decision is a model switch → already routed through `pdf-review-commercial-model` upstream.

## Intent: update

A decision is, by default, **immutable** — the history is the point. Updates are limited to:
- Appending a "follow-up" note to the History section (e.g. "Decision implemented", "Reversed via DEC-NNN", "Outcome assessed at retro").
- Correcting factual errors (the underlying decision text stays; corrections are timestamped append-only notes).

Reversing a decision is a **new decision** that references the prior one — not an edit.

## Intent: validate

- [ ] Frontmatter complete; ID matches filename
- [ ] All fields populated (no TBC / blank context)
- [ ] At least two options considered (no rubber-stamping)
- [ ] Decided-by is a single named individual
- [ ] Rationale names the trade-off
- [ ] Engagement-level index has a corresponding row
- [ ] Related artifact paths resolve

## Intent: dump-merge

Accept dumped material (a Teams thread where a decision crystallised, an email with an approval). Extract decision shape; surface gaps; structure into the canonical format.

## Anti-patterns to refuse

- **Decision with only one "option considered".** Refuse. A decision with no alternative considered isn't a decision; it's a default. The workflow asks for at least one alternative (often "do nothing" or "delay" is genuinely valid).
- **Decided-by is a group.** Refuse. Decisions have one decision-maker; the group can endorse but the accountability is singular.
- **No reversibility status.** Refuse. Knowing whether a decision is reversible affects how it's executed.
- **Rationale without trade-off.** Refuse. Every decision accepts something in exchange for the choice; if you can't name the trade-off, the decision isn't ready.

## Red-team posture

Off. Decisions are not adversarially reviewed; they are factual records. The substance of a decision may be red-teamed via the upstream workflow (e.g. a change request before approval), but the decision-log entry itself just records what happened.

## Reference

- `ARCHITECTURE.md` §6 (most agents have decision-log handoffs)
- Klaus's principle 6 (the decision log is the only durable artifact)
- The per-stage routing is unique to v0.1; v2 may add cross-stage queries via `pdf-search-decisions`
