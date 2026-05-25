---
name: pdf-create-handover-pack
description: Compose the handover pack when you're leaving an engagement before its natural close — for BAU transition, for a replacement delivery manager, or for any structured exit. Use when the next person needs to pick up where you're leaving off.
---

# Handover pack workflow

Produces `_pdf-output/engagements/{active}/10-closure/handover-pack.md`. Single file.

Felix's principle 5 is the rule: handover is delivery, not paperwork. The handover pack is a delivery artifact to the named successor — usable on day one of their tenure, structured around what they need rather than what you have.

## Preconditions

- Active engagement
- A named recipient (BAU lead, replacement DM, account-lead taking-on transition)

## Intent: create

1. **Identify the recipient and context.** *"Who's taking over, and in what context? (BAU transition / DM replacement / account-lead absorbing / phase boundary handover.)"*
2. **Determine handover scope.** Different contexts need different emphasis:
   - **BAU transition:** support model, runbooks, governance contacts, known issues
   - **DM replacement:** all of the above plus governance relationships, political context, commercial state
   - **Account-lead absorbing:** lighter on operational, heavier on commercial and relationship
   - **Phase boundary:** focused on next phase's preconditions
3. **Walk the structure.** Adapt sections to context:

   1. **Headline:** what this engagement is in one paragraph
   2. **Current state:** delivery progress vs plan; commercial state; team state
   3. **Governance map:** who, what, when — annotated with personal notes ("X tends to respond to detail; Y prefers headlines")
   4. **Open items:** RAID extracts, open CRs/COs, decisions pending
   5. **Operational details:** access, tools, runbooks, contracts on file
   6. **Relationships:** client stakeholders with notes (per `STAKEHOLDERS.md`) — what works with each; what's been promised
   7. **Active risks worth knowing:** top 5 risks with personal context
   8. **What I'd watch for:** the things that are quiet now but I'd be wary of
   9. **What I'd do first if I were you:** the recipient's first-week priorities, from your view
   10. **Things I'd rather you didn't change** (yet) — practices that are working that won't be obvious why
   11. **Cross-references:** paths to charter, governance, RAID, plan, recent statuses, lessons learned
   12. **Sign-off and handover meeting:** date proposed; topics to cover live

4. **Compose:**

```markdown
---
artifact_type: handover-pack
engagement: <slug>
date: <YYYY-MM-DD>
handover_from: <name>
handover_to: <name>
handover_context: <BAU | DM-replacement | account-lead | phase-boundary>
handover_date: <YYYY-MM-DD>
status: draft
generated_by: pdf-create-handover-pack
---

# Handover pack — <Engagement name>

**From:** <name>
**To:** <name>
**Context:** <BAU transition | DM replacement | ...>
**Handover meeting:** <date> (proposed)

## Headline

<paragraph>

## Current state

### Delivery
<paragraph>

### Commercial
<paragraph>

### Team
<paragraph>

## Governance map

(Pull from `GOVERNANCE.md`, annotated.)

| Forum | Cadence | Attendees | Note |
|---|---|---|---|
| Steering | Fortnightly | <names> | <note — e.g. "Sponsor is engaged; CFO joins for finance items only"> |
| ... | | | |

## Open items

### RAID (extract; full at `04-execution/RAID.md`)

- Top open risks: <list>
- Top open issues: <list>
- Critical dependencies: <list>

### Change requests / orders

- Open CRs: <list with status>
- Open COs: <list with status>

### Decisions pending

(From `decision-log.md` — anything awaiting a decision.)

## Operational details

- Access I had that you'll need: <list>
- Tools and where to find things: <list>
- Contracts on file: <paths>
- Runbooks: <paths>

## Relationships

(Annotated stakeholder list. This is where personal context lives.)

### <Name> — <role at client>

- What works: <one line>
- What to avoid: <one line>
- What I've committed to them: <list, if any>
- What they're expecting from us next: <one line>

(Repeat per key stakeholder.)

## Active risks worth knowing about

(Top 5 — same as RAID but with personal annotations the file doesn't capture.)

1. <risk> — <annotation>
2. ...

## What I'd watch for

(Quiet now but worth your attention.)

- <signal — why I'd watch this>

## What I'd do first if I were you

(Your week-1 advice for the recipient.)

1. <action>
2. <action>
3. <action>

## Things I'd rather you didn't change (yet)

(Practices that are working; obvious-target candidates that have non-obvious reasons.)

- <practice> — <reason it's worth preserving>

## Cross-references

- Charter: `00-constitution/CHARTER.md` (rev <N>)
- Governance: `00-constitution/GOVERNANCE.md`
- Stakeholders: `00-constitution/STAKEHOLDERS.md`
- Plan: `03-planning/plan.md`
- Capacity: `03-planning/capacity-plan.md`
- Budget baseline: `03-planning/budget-baseline.md`
- Recent weekly status: `04-execution/weekly-status/<latest>.md`
- Recent steering pack: `05-governance/steering/<latest>.md`
- Lessons learned (engagement): `10-closure/lessons-learned.md`

## Handover meeting

**Proposed date:** <date>
**Topics to cover live:** (briefer than the document; the document is the reference)

1. The relationships section — read it with me
2. The "active risks worth knowing" with annotation
3. The "what I'd do first" recommendations
4. Anything that surprised you in this document

## Sign-off

- Handover accepted by recipient: <name>, <date>
- Open items at handover: <count>
- Outstanding clarifications: <count>

---

_Generated by `pdf-create-handover-pack`._
```

5. **Cross-skill side effects.**
   - On status `accepted`: recommend `pdf-update-charter` to record the change in delivery-manager identity (if relevant) and any change in governance impact.
   - If the handover surfaces unresolved RAID items needing attention from the successor → recommend `pdf-update-raid` to ensure those items have the new owner.

6. **Write.**

## Intent: update

1. Common updates: handover meeting scheduled / held; successor adds notes; clarifications received.
2. Status moves: `draft` → `shared` → `meeting-held` → `accepted`.
3. Append to a `## History` section.

## Intent: validate

- [ ] Frontmatter complete; recipient named; context valid
- [ ] All 12 sections present (some may be brief, but the section exists)
- [ ] Cross-references resolve (all paths exist)
- [ ] If status `accepted`: signature line populated with name and date

## Intent: dump-merge

Accept dumped material (personal notes you've kept, transition emails, briefing docs). Map to canonical structure; surface gaps where you've written something operational but skipped the relationship or quiet-risk dimensions.

## Anti-patterns to refuse

- **No "what I'd do first" section.** Refuse. The whole point is to give the recipient a hand. A handover that doesn't recommend a first action is incomplete.
- **Empty "Things I'd rather you didn't change" section.** Push for at least one item — every engagement has implicit practices worth preserving; if none, the handover author hasn't reflected enough.
- **Operational-only handover for a DM-replacement context.** Refuse. DM replacements need the relationship and political context; an operational-only pack is insufficient.
- **No proposed handover meeting date.** Refuse. The document is the reference; the meeting is the delivery.

## Red-team posture

Off. Internal artifact between you and the recipient.

## Reference

- `ARCHITECTURE.md` §6.10
- Felix's principle 5 (handover is delivery, not paperwork)
