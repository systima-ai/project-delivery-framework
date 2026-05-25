---
name: pdf-create-ramp-plan
description: Compose an onboarding ramp plan for a new joiner — milestones, named buddies, knowledge-transfer schedule, and ramp metrics. Confidential. Use whenever someone new joins the engagement.
---

# Ramp plan workflow

Produces `_pdf-output/engagements/{active}/09-people/ramp-plans/<YYYY-MM-DD>-<person-slug>.md`. **Confidential** (it contains a named individual and the team they're joining).

## Preconditions

- `STAKEHOLDERS.md` populated
- `GOVERNANCE.md` populated (the new joiner needs to know the cadence and forums)

## Intent: create

1. **Identify the joiner.** Name, role, start date, reporting line.
2. **Identify the buddy / mentor.** Single named individual on the team; must exist in STAKEHOLDERS.md.
3. **Walk the ramp structure.** Standard ramp shape (override per engagement):
   - **Week 1: Orientation** — accounts, access, repo, environments, governance read, intro meetings
   - **Week 2–3: Shadowing** — pair with named people across roles; sit in on ceremonies as observer
   - **Week 4–6: Contributing under guidance** — small named tasks; reviewed by buddy
   - **Week 7–8: Independent contribution** — full sprint membership; ramp formally closed
4. **Define milestones per phase.** Concrete things the joiner completes: first commit merged, first PR reviewed (incoming), first defect resolved, first standup-led, etc.
5. **Define ramp metrics.** How will you tell ramp is succeeding? (PRs merged per week; story points landed per sprint; explicit confidence check at week 4 and week 8.)
6. **Compose:**

```markdown
---
artifact_type: ramp-plan
engagement: <slug>
joiner: <name>
joiner_role: <role>
buddy: <name>
start_date: <YYYY-MM-DD>
target_full_ramp_date: <YYYY-MM-DD>
status: in-progress
confidential: true
generated_by: pdf-create-ramp-plan
---

# Ramp plan — <Joiner name> (<Role>)

## Headline

- **Joiner:** <name>, <role>
- **Start date:** <date>
- **Buddy:** <name>
- **Target full ramp:** <date>

## Phases and milestones

### Week 1 — Orientation

- [ ] Accounts and access provisioned
- [ ] Repo cloned, dev environment running
- [ ] Charter, governance, and comms-plan read
- [ ] Intro meetings: <list named individuals>

### Week 2–3 — Shadowing

- [ ] Pair with <name> on <area>
- [ ] Pair with <name> on <area>
- [ ] Attend ceremonies as observer (named list)
- [ ] First standup-attendance

### Week 4–6 — Contributing under guidance

- [ ] First PR merged
- [ ] First PR reviewed (incoming review)
- [ ] First defect / ticket resolved end-to-end
- [ ] Mid-ramp confidence check (week 4)

### Week 7–8 — Independent contribution

- [ ] Sprint planning: full participant
- [ ] Story point delivery against team average
- [ ] Final ramp check; status moves to `complete`

## Ramp metrics

| Metric | Target | Week 2 | Week 4 | Week 6 | Week 8 |
|---|---|---|---|---|---|
| PRs merged / week | | | | | |
| Story points / sprint | | | | | |
| Confidence (1–5) | ≥ 4 at week 4; 5 at week 8 | | | | |
| Buddy assessment | | | | | |

## Knowledge transfer plan

Specific knowledge areas that must be transferred during ramp:

- <area> — owner: <name> — by week <N>
- <area> — owner: <name> — by week <N>

## Cross-references

- Joiner role in STAKEHOLDERS.md: <reference>
- Buddy role in STAKEHOLDERS.md: <reference>
- Linked capacity plan: `03-planning/capacity-plan.md` (joiner's FTE allocation)

---

## Progress log

- <YYYY-MM-DD> — Ramp plan created.
```

7. **Cross-skill offers.**
   - On creation → recommend `pdf-create-capacity-plan` update (the joiner should appear in the capacity matrix).
   - On status `complete` → recommend `pdf-prep-1on1` to set up the post-ramp 1:1 cadence.
   - On ramp signal red (week-4 confidence < 3 or PRs merged = 0) → recommend `pdf-attrition-risk` scoring.

## Intent: update

1. Identify by joiner name.
2. Tick milestones; append progress notes; record metric values.
3. Status moves: `in-progress` → `complete` (or `abandoned` if joiner exits early).

## Intent: validate

- [ ] Frontmatter complete; `confidential: true`
- [ ] Joiner and buddy exist in STAKEHOLDERS.md
- [ ] Every phase has at least one milestone (no empty phases)
- [ ] Ramp-metric targets defined (not blank)
- [ ] Knowledge-transfer areas have named owners and deadlines

## Intent: dump-merge

Accept dumped material (onboarding doc, joiner profile, buddy assignment email). Map to ramp structure; surface gaps.

## Anti-patterns to refuse

- **Ramp plans with no buddy.** Refuse. "We'll figure it out" buddy assignments don't ramp people.
- **Phase milestones expressed as "get familiar with X".** Refuse for vagueness; demand concrete done-criteria.
- **No metric targets.** Refuse. Ramp without metrics never closes formally; people drift into "fully ramped" without a check.

## Red-team posture

Off.

## Reference

- `ARCHITECTURE.md` §6.9
- Iris's overall principles
