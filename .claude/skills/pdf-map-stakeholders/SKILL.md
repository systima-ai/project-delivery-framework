---
name: pdf-map-stakeholders
description: Build or update the stakeholder map — an influence/interest grid, a salience analysis, and a per-stakeholder profile layer (motivations, success metrics, working style, trust level). Turns the flat STAKEHOLDERS register into an analysed engagement instrument and feeds the comms-plan cadence. Use when the user wants to analyse, prioritise, or plan how to manage stakeholders.
---

# Stakeholder map workflow

Produces `_pdf-output/engagements/{active}/00-constitution/STAKEHOLDER-MAP.md` in place. Living document with an append-only change-log; the `update` intent appends a new revision row.

**Division of labour.** `STAKEHOLDERS.md` is the factual register (who they are: name, role, organisation, contact, comms preference). `STAKEHOLDER-MAP.md` is the analysis layer on top of it: it references stakeholders by ID and adds the influence/interest position, the salience attributes, and the management profile. The map never re-asserts register facts; it cites them. This keeps a single writer per fact.

**Models used (all public).** Influence/Interest grid follows Mendelow's power/interest matrix; salience follows the power/legitimacy/urgency attribute set; the ring view follows the onion model; the trust-level rubric follows the trust-equation. Provenance is in `references/stakeholder-analysis-guide.md`. No model here is vendor-specific.

## Preconditions

- `CHARTER.md` at `current_revision >= 1`
- `STAKEHOLDERS.md` populated (at least the people whose decisions the engagement depends on). If empty, route to Marcus's dump or `pdf-create-charter` first.

## Intent: create

1. **Load the register.** Read `STAKEHOLDERS.md`. List every stakeholder with their ID. If IDs are absent, assign stable ones (`S-01`, `S-02`, …) and note that the register should adopt them.
2. **Position each stakeholder on the grid.** For each, ask the two canonical questions from the analysis guide:
   - *"How much influence does this person have over budget, scope, resourcing, or timeline decisions? (high / low)"*
   - *"How much interest do they take in this engagement day to day? (high / low)"*
   Place them in one of four quadrants: **Manage Closely** (high/high), **Keep Satisfied** (high influence, low interest), **Keep Informed** (low influence, high interest), **Monitor** (low/low).
3. **Run the salience check** for each stakeholder the user flags as material: power (yes/no), legitimacy (yes/no), urgency (yes/no). Derive a priority tier per the guide's rule (three attributes → Definitive / Dominant-tier / Latent-tier). The tier is a derived label, never elicited directly.
4. **Build the management profile** for each high-priority stakeholder (Manage Closely + Keep Satisfied, plus any the user names). Walk the profile fields one at a time (canonical questions in the guide):
   - Motivations (personal and organisational; what success looks like for *them*).
   - Success metrics they are judged on.
   - Working / communication style (free-text; cadence, detail level, synchronous vs written-first). This is a description, not a typology label.
   - Current trust level (Nascent / Working / Trusted-advisor, per the rubric).
   - Engagement approach (the one thing to get right with this person).
5. **Derive the engagement strategy per quadrant**, which the comms plan consumes: posture and default contact cadence for each quadrant.
6. **Compose:**

```markdown
---
artifact_type: stakeholder-map
engagement: <slug>
current_revision: 1
generated_by: pdf-map-stakeholders
red_teamed: false
charter_revision_at_creation: <N>
sources: [00-constitution/STAKEHOLDERS.md, <other paths or "interview">]
---

# Stakeholder map — <engagement name>

> Analysis layer over `STAKEHOLDERS.md`. Facts live in the register; this file cites them by ID and adds the management view. Update via `pdf-map-stakeholders` update intent.

## Influence / Interest grid

|                     | Low interest        | High interest        |
|---------------------|---------------------|----------------------|
| **High influence**  | Keep Satisfied: <IDs> | Manage Closely: <IDs> |
| **Low influence**   | Monitor: <IDs>      | Keep Informed: <IDs> |

## Position and salience

| ID | Name (from register) | Quadrant | Power | Legitimacy | Urgency | Priority tier |
|----|----------------------|----------|:-----:|:----------:|:-------:|---------------|
| S-01 | <name> | Manage Closely | Y | Y | Y | Definitive |
| …    | …      | …              | … | … | … | …          |

## Management profiles

### S-01 — <name>, <role from register>

- **Motivations:** <personal + organisational>
- **Judged on:** <their success metrics>
- **Working style:** <free-text description; no typology label>
- **Trust level:** <Nascent | Working | Trusted-advisor> — <one line of evidence>
- **Engagement approach:** <the one thing to get right>

(Repeat per high-priority stakeholder. Lower-priority stakeholders need no profile until they become material.)

## Engagement strategy by quadrant

| Quadrant | Posture | Default cadence | Feeds |
|----------|---------|-----------------|-------|
| Manage Closely | Active partnership; co-prepare key moments | Weekly 1:1 + steering | COMMS-PLAN rituals |
| Keep Satisfied | Confidence and no surprises; brief, high-signal | Monthly + on material change | COMMS-PLAN rituals |
| Keep Informed  | Regular visibility; invite input at the right points | Status cadence | COMMS-PLAN rituals |
| Monitor        | Light touch; watch for movement into another quadrant | Periodic | — |

## Cross-references

- Register: `00-constitution/STAKEHOLDERS.md`
- Comms plan consuming this map: `00-constitution/COMMS-PLAN.md` (run/update after this)
- Relationship-health baseline: `05-governance/relationship-health-cards/` (Helena)

## Change log

| Revision | Date | Change |
|----------|------|--------|
| 1 | <YYYY-MM-DD> | Initial map. |

---

_Generated by `pdf-map-stakeholders`._
```

7. **Cross-skill side effects.**
   - On completion, offer `pdf-create-comms-plan` (or its update intent) so the quadrant cadences land in the comms plan.
   - If a Manage-Closely stakeholder has trust level Nascent, offer `pdf-relationship-health` to baseline the relationship.
8. **Write the file.** Revision starts at 1.

## Intent: update

1. Read the existing map.
2. Common updates: a stakeholder enters or leaves; a quadrant move (re-position with a one-line reason); a salience change; a trust-level change; a new profile.
3. Append a row to the change log with the reason. Bump `current_revision`.
4. If a stakeholder moved into Manage Closely, prompt to update the comms plan cadence.

## Intent: validate

- [ ] Every stakeholder in `STAKEHOLDERS.md` appears on the grid (or is explicitly marked out of scope with a reason).
- [ ] Every grid entry references an ID that exists in the register.
- [ ] Every Manage-Closely and Keep-Satisfied stakeholder has a management profile.
- [ ] Every profile's trust level is one of the three rubric values.
- [ ] Salience tier is consistent with the power/legitimacy/urgency inputs per the guide's rule.
- [ ] Working-style fields are descriptions, not bare typology labels.
- [ ] Change log present; `current_revision` matches the latest row.

## Intent: dump

Accept dumped material (kickoff prep notes, account-team briefing, a call transcript). Extract candidate positions, salience signals, motivations, and working-style cues. Present the extraction as a proposal before writing, in the same CREATE / UPDATE / INSUFFICIENT_DATA shape Marcus uses. Never infer a stakeholder's motivations as fact from thin evidence; mark inferred values `[?]` for later confirmation via `pdf-elicit`.

## Anti-patterns to refuse

- **A grid with no register link.** Positions must reference IDs; a floating name is a register gap to fix first.
- **Salience tier elicited directly.** Ask the three attributes; derive the tier. Never ask "are they a definitive stakeholder?".
- **Typology labels masquerading as profiles.** "Driver type" is not a working-style description; "wants the headline first, decisions in writing, dislikes long calls" is.
- **Profiling everyone.** Only material stakeholders need a profile; profiling the whole register is noise.

## Red-team posture

Off. Internal planning artifact. Recommended on first finalisation, since a wrong influence read is expensive in week six.

## Reference

- `references/stakeholder-analysis-guide.md` — grid, salience, onion, trust rubric, canonical questions, public sources
- `ARCHITECTURE.md` §6.2 (Marcus scope)
- Marcus's principles
