---
name: pdf-attrition-risk
description: Per-person attrition-risk scoring (1–5) with named contributing factors and required action per scored person. Single living document, updated periodically. Highly confidential. Use to track and respond to retention risk.
---

# Attrition risk workflow

Maintains `_pdf-output/engagements/{active}/09-people/attrition-watch.md` in place. **One living document**, like RAID. Each person on the team is a section with a current score and a history of score changes.

**Confidentiality: maximum.** This file contains named-person risk judgements. The frontmatter carries `confidential: true`; the file is excluded from git by the engagement `.gitignore`; the workflow never displays the scored list in a context where it would be visible to anyone but the user.

## Preconditions

- `STAKEHOLDERS.md` populated (or the user names team members at first run)

## Intent: append (default — score a person)

1. **Identify the individual.** Single named person per `append` invocation.
2. **Walk the contributing factors checklist** (see below). For each: present or absent / mild / strong; one-line note.
3. **Synthesise a score (1–5).** The workflow proposes; the user accepts or overrides.
   - **1:** very low risk. No active signals; recent positive signals.
   - **2:** low. One mild factor.
   - **3:** moderate. Multiple mild factors or one moderate factor.
   - **4:** elevated. Strong factor(s); recent conversation hints at exit.
   - **5:** high. Explicit signal of intent to leave, or factors that historically lead to exit within weeks.
4. **Define action.** *"What's the action — do nothing, informal check, formal check, intervention?"*
5. **Compose / update the file:**

```markdown
---
artifact_type: attrition-watch
engagement: <slug>
last_updated: <YYYY-MM-DD>
confidential: true
generated_by: pdf-attrition-risk
---

# Attrition watch — <Engagement name>

> Highly confidential. Per-person retention-risk read. Update on observation, not on schedule.

## Summary

| Person | Score | Last updated | Action |
|---|:-:|---|---|
| <name> | 3 | <date> | Informal check by <date> |
| <name> | 2 | <date> | Do nothing |
| <name> | 4 | <date> | Formal check this week |

## Detail (per person)

### <Name> — score: 3 (moderate)

**Last updated:** <date>

**Contributing factors:**

| Factor | Present | Strength | Note |
|---|:-:|:-:|---|
| Workload (sustainable?) | yes | strong | Has been on 3+ on-calls / sprint |
| Growth (stalled?) | yes | mild | No new responsibilities in 6 months |
| Compensation (perceived fair?) | no | — | No signal |
| Manager relationship | no | — | Reports good 1:1s |
| Role fit | no | — | Strong in current work |
| Life events (visible?) | no | — | — |
| Market signals (LinkedIn activity, etc.) | yes | mild | Updated headline last month |
| Recent direct feedback / hints | no | — | — |

**Headline observation:** Burnout signal from sustained on-call load is the most material factor.

**Current action:** Informal check this week. Focus: workload sustainability and growth path.

**Score history:**

- <YYYY-MM-DD>: 3 (moderate) — current
- <YYYY-MM-DD>: 2 (low) — prior; workload signal emerged
- <YYYY-MM-DD>: 2 (low) — initial scoring

---

(Repeat per scored individual.)

## History

| Date | Person | Change |
|---|---|---|
| <date> | <name> | Score increased from 2 to 3 — workload signal |
| <date> | <name> | Initial score: 2 |
```

6. **Cross-skill offers (per person):**
   - Score 4+ → strongly recommend `pdf-prep-1on1` for that person within the week
   - Score 5 → also recommend `pdf-decide-escalation` (Klaus) — whether to escalate to client or to internal leadership
   - Sustained "workload" or "growth" factors → flag in next `pdf-team-health-check` Capacity or Growth dimensions (aggregate; do not name)

7. **Write.**

## Intent: update (re-score a person)

1. Identify the person.
2. Walk factors again briefly — what changed.
3. Compute new score; user confirms.
4. Append to that person's score history; update the summary table.
5. Append to the file's History section.

## Intent: validate

- [ ] Frontmatter complete; `confidential: true` present
- [ ] Every entry in the Summary table has a corresponding Detail section
- [ ] Every score has a contributing-factors table populated
- [ ] Score has an associated action (no scored person with no action)
- [ ] Score history present per person
- [ ] All names exist in STAKEHOLDERS.md

## Intent: dump-merge

Accept dumped material describing concerns about specific individuals. Heavily flag the confidentiality before processing. Extract per-person factors. Confirm each before writing.

## Anti-patterns to refuse

- **Score with no action.** Refuse. Iris's principle 3 — attrition risk is a signal, not a label.
- **Scoring people not in STAKEHOLDERS.md.** Refuse; route to add them first.
- **Score 5 with "do nothing" action.** Refuse; score-5 demands at least an informal check.
- **Re-scoring downward without a recorded change in factors.** Refuse; a score going from 4 to 2 needs to be supported.

## Red-team posture

Off. The confidentiality posture is the protection; red-team would broaden access risk.

## Reference

- `ARCHITECTURE.md` §6.9
- Iris's principle 3 (attrition risk is a signal, not a label)
