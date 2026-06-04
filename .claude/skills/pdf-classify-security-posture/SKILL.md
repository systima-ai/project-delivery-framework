---
name: pdf-classify-security-posture
description: Classify an engagement's security and privacy posture into a tier driven by named risk dimensions (contractual obligations, personal/sensitive data, physical product, production access), and derive the controls and artifacts each triggered dimension requires. Forces an explicit "no special requirements" declaration rather than silence. Use early, and whenever the security/privacy setup materially changes.
---

# Security & privacy posture workflow

Produces `_pdf-output/engagements/{active}/07-quality/security-posture.md`. Living document with append-only change-log.

The posture is set **early** (mobilization / planning) and answers one question before any technical security assessment happens: *what security and privacy requirements does this engagement actually have, and therefore what controls and artifacts are mandatory?* It is the scoping input that `pdf-secure-sdlc-health` assesses **against** — without it, a Secure SDLC health card has no agreed bar to measure to.

**The discipline (the whole point):** "no special requirements" is a **deliberate, owned declaration**, never an absence of one. An engagement is Tier 0 because someone looked and confirmed it, not because nobody asked.

## The classification model

Four independent **risk dimensions**, each assessed yes / no / not-yet-known. Any dimension can co-apply.

| Dim | Dimension | Triggered when… |
|---|---|---|
| **D1** | Contractual security obligations | The client contract imposes specific security/privacy requirements beyond baseline hygiene |
| **D2** | Personal / sensitive data | The engagement processes personal data or other regulated/sensitive data (engages a privacy regime) |
| **D3** | Physical / embedded product | The work builds or integrates hardware, firmware, or physical/embedded systems (different threat surface) |
| **D4** | Production / live access | The team has access to client production systems or live data |

**Overall tier = the highest severity triggered** (see `references/posture-tier-guide.md` for the full rubric and the per-dimension required controls/artifacts):

- **Tier 0 — Baseline:** no dimension triggered. Baseline hygiene only. Requires an explicit declaration with a named approver.
- **Tier 1 — Elevated:** D1 and/or D3 triggered (contractual and/or physical), no data-sensitivity or production exposure.
- **Tier 2 — Sensitive:** D2 or D4 triggered (personal data, or production/live access).
- **Tier 3 — Critical:** D2 **and** D4 triggered, or an explicitly regulated-critical context (e.g. a high-risk privacy regime plus live data).

## Preconditions

- `CHARTER.md` at `current_revision >= 1`
- `STAKEHOLDERS.md` populated (the posture needs a single named owner)

## Intent: create

Load `references/posture-tier-guide.md` — it carries the per-dimension trigger questions, the required-controls/artifacts table per dimension, and the tier rubric.

1. **Read the charter.** Surface the Compliance Regimes section and any scope notes that bear on data, product type, or access. If `FACTS.md` exists, read the data-handling and client facts to seed D2/D4.
2. **Walk the four dimensions.** For each, ask the canonical trigger question (see guide). Record yes / no / `not-yet-known` plus a one-line basis. `not-yet-known` is allowed but must carry a date to resolve by — an unknown is not a "no".
3. **For each triggered dimension, list the required controls and artifacts** from the guide. The user may add engagement-specific ones; they may not silently drop a mandatory one (dropping requires a recorded justification and a named approver).
4. **Derive the tier** from the triggered dimensions per the rubric. State the derivation explicitly (which dimension set the tier).
5. **Reconcile to the charter.**
   - If **D2 (personal data)** is triggered but the charter's Compliance Regimes section names no privacy regime → flag a charter gap and offer `pdf-create-charter` (update) to declare the regime(s). Do not invent a regime; ask which applies.
   - If the charter declares a regime but **no** dimension is triggered → flag the inconsistency (one of the two is wrong) and ask the user to resolve.
6. **Name the owner.** A single accountable person from `STAKEHOLDERS.md`. Diffuse ownership is refused.
7. **Compose:**

```markdown
---
artifact_type: security-posture
engagement: <slug>
status: active
current_revision: 1
last_updated: <iso>
last_updated_by: <user>
charter_revision_at_classification: <N>
tier: <0 | 1 | 2 | 3>
dimensions_triggered: [<D1?>, <D2?>, <D3?>, <D4?>]
owner: <name from STAKEHOLDERS.md>
next_review: <date>
---

# Security & privacy posture — <Engagement name>

> Living document. Classifies what security and privacy requirements this
> engagement has, and what each triggered dimension requires. The bar that
> `pdf-secure-sdlc-health` assesses against.

## Posture summary

- **Overall tier:** Tier <N> — <Baseline | Elevated | Sensitive | Critical>
- **Tier set by:** <which dimension(s) drove the tier>
- **Owner:** <name>
- **Next review:** <date>

## Dimension assessment

| Dim | Dimension | Triggered? | Basis |
|---|---|:-:|---|
| D1 | Contractual security obligations | Yes / No / Not-yet-known (by <date>) | <one line> |
| D2 | Personal / sensitive data | … | <one line; name the data + regime if known> |
| D3 | Physical / embedded product | … | <one line> |
| D4 | Production / live access | … | <one line> |

## Required controls and artifacts

(One block per triggered dimension. Tier 0 shows the baseline block only.)

### <Dn — dimension name>

| Required control / artifact | Status | Owner | Evidence / location |
|---|:-:|---|---|
| <control> | present / planned / missing | <name> | <path or note> |

## Tier 0 declaration (only if Tier 0)

> This engagement has no contractual, data-sensitivity, physical-product, or
> production-access security/privacy considerations beyond baseline hygiene.
> This is a deliberate confirmation, not an omission.
>
> **Declared by:** <name>  **Approved by:** <name>  **Date:** <date>

## Charter reconciliation

- Compliance regimes declared in charter: <list | none>
- Consistent with dimensions triggered here? <yes | flag — describe>

## Assumptions and open points

<bullets — any `not-yet-known` dimension with its resolve-by date; data-residency
questions; sub-processor exposure; anything pending client confirmation>

---

## Change log

| Rev | Date | Author | Section | Change | Trigger | Approved by |
|---:|---|---|---|---|---|---|
| 1 | <date> | <user> | All | Initial classification | Mobilization | <approver> |
```

8. **Validate.** Run the coverage check (below). Any ✗ blocks the write.
9. **Cross-skill side effects.**
   - **Tier ≥ 2** → recommend `pdf-secure-sdlc-health` (the assessment now has a bar) and `pdf-update-raid` (log the material security/privacy risks).
   - **D2 with no charter regime** → offer `pdf-create-charter` (update) to declare it.
   - **Any tier change on update** → append to `decision-log.md` via `pdf-decision-log` (posture changes are consequential).
   - **Tier 3** → recommend `pdf-decide-escalation` (Klaus) if required controls are missing.

## Intent: update

1. Ask what changed (new contractual requirement, data scope expanded, production access granted, a `not-yet-known` now resolved).
2. **A tier increase is significant** — never silent. Recompute the tier, append the change-log row with the trigger, and route to `pdf-decision-log`.
3. Re-run charter reconciliation and the coverage check. Refuse to finalise if it fails.
4. Bump revision; append change-log.

## Intent: validate

- [ ] Frontmatter complete; revision monotonic; `tier` matches the derivation
- [ ] All four dimensions assessed (yes / no / `not-yet-known`-with-date — no blanks)
- [ ] Every triggered dimension has a required-controls/artifacts block, each row with a status and owner
- [ ] Owner is a single named person in `STAKEHOLDERS.md`
- [ ] If Tier 0: the explicit Tier 0 declaration is present with declarer + approver + date
- [ ] If D2 triggered: a privacy regime is named here and reconciled against the charter
- [ ] No mandatory control silently dropped (any drop has a justification + approver)
- [ ] `next_review` is set

## Intent: dump-merge

Accept dumped material — a client security schedule, a contract security annex, a data-processing description, an architecture note. Extract candidate dimension triggers and required controls; for each dimension, mark present / unclear. Surface the unclear ones (almost always: data residency, sub-processor exposure, production-access scope) before structuring. Never downgrade an unclear dimension to "no" to simplify.

## Red-team posture

Off. Internal classification. The coverage check and the mandatory explicit Tier 0 declaration are the structural honesty gates.

## Anti-patterns to refuse

- **Tier 0 by silence.** No declaration, no approver, just an empty card. Refuse — Tier 0 is a confirmed finding.
- **"Not-yet-known" used as a quiet "no".** An unknown carries a resolve-by date and keeps the dimension live; it does not lower the tier.
- **Personal data without a named regime.** If D2 is triggered, name the regime (and reconcile to the charter); "we handle some user data" is not a classification.
- **Dropping a mandatory control without a paper trail.** Any required control marked not-applicable needs a one-line justification and a named approver.
- **Diffuse ownership.** "The team owns security" is no owner. Name a person.

## Reference

- `references/posture-tier-guide.md` — per-dimension trigger questions, required-controls/artifacts tables, tier rubric
- `ARCHITECTURE.md` §6.7 (Quinn scope)
- Quinn's principle 6 (compliance regimes named in the charter must be visibly addressed) — this workflow is where that reconciliation starts
