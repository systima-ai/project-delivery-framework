# Security & privacy posture tier guide

The deep-dive reference for `pdf-classify-security-posture`. Carries the per-dimension trigger questions, the controls/artifacts each triggered dimension requires, and the tier-derivation rubric.

This guide is **firm-neutral**. The required controls are common-practice delivery-security expectations, not any one organisation's house standard. Override or extend per engagement in `customize.toml` or the engagement's `.pdf-config.toml`.

## How classification works

Four independent risk dimensions, each assessed **yes / no / not-yet-known**. Any number can co-apply. The overall tier is the **highest severity triggered**. A dimension that is `not-yet-known` keeps the engagement at the tier that unknown *would* set if it resolved "yes" until it is resolved — you do not get to bank the lower tier while the question is open. Record a resolve-by date for every unknown.

---

## D1 — Contractual security obligations

**Trigger question:** *"Does the client contract (or an annex / security schedule / DPA) impose specific security or privacy requirements beyond baseline hygiene — named standards, audit rights, breach-notification timelines, sub-processor controls?"*

**Triggered when:** the contract names obligations the engagement must demonstrably meet.

**Required controls / artifacts when triggered:**

- A mapping of each contractual obligation to how it is met (owner + evidence location)
- Breach-notification procedure aligned to the contractual timeline
- Sub-processor / supply-chain register if the contract constrains onward processing
- Evidence retained for any audit-right the contract grants

## D2 — Personal / sensitive data

**Trigger question:** *"Does the engagement process personal data, or other regulated or sensitive data (health, financial, biometric, children's data, special-category)? If so, what data and which privacy regime applies?"*

**Triggered when:** any personal or otherwise regulated/sensitive data is processed.

**Required controls / artifacts when triggered:**

- A **named privacy regime** (this must also be declared in the charter Compliance Regimes section — reconcile)
- A data-protection impact assessment, or a documented exemption
- Data inventory: what is held, where it resides (residency), retention period
- Lawful-basis / consent position recorded
- Data-minimisation and access-restriction controls
- Sub-processor exposure assessed

## D3 — Physical / embedded product

**Trigger question:** *"Does the work build or integrate hardware, firmware, or physical/embedded systems — anything where the threat surface includes a physical device or supply chain?"*

**Triggered when:** the deliverable is, or includes, a physical/embedded component.

**Required controls / artifacts when triggered:**

- Threat model that includes the physical and supply-chain surface (not just software)
- Firmware / component provenance and update mechanism
- Physical-security considerations for prototypes and test hardware
- Disposal / decommissioning plan for devices holding any data

## D4 — Production / live access

**Trigger question:** *"Does the team have, or will it be granted, access to client production systems or live data?"*

**Triggered when:** any team member can reach production or live data.

**Required controls / artifacts when triggered:**

- Least-privilege access model with named grantees and roles
- Access-grant and -revocation procedure (and a revocation trigger on leavers / rotation)
- Audit logging of production access
- Segregation between development/test and production
- Break-glass / emergency-access procedure with after-the-fact review

---

## Tier-derivation rubric

| Tier | Name | Triggered set | Posture |
|---:|---|---|---|
| **0** | Baseline | none triggered | Baseline hygiene only. **Requires an explicit declaration** with a named approver — Tier 0 is a confirmed finding, not an empty card. |
| **1** | Elevated | D1 and/or D3 only | Contractual and/or physical surface, but no data-sensitivity and no production exposure. |
| **2** | Sensitive | D2 **or** D4 triggered | Personal/sensitive data, or production/live access. Recommend a Secure SDLC health card. |
| **3** | Critical | D2 **and** D4 | Personal data *and* live access (or an explicitly regulated-critical context). Missing controls warrant escalation analysis. |

**Edge cases:**
- A high-risk regime (e.g. special-category personal data, or a regime with strict breach timelines) combined with live access reads as **Tier 3** even if you would otherwise compute Tier 2 — record the reasoning in "Tier set by".
- D1 alone with onerous obligations can warrant treating the engagement as Tier 2 in practice; the rubric is a floor, and the owner may raise the tier with a recorded rationale. The owner may never *lower* it below the rubric.

## Worked example

**Engagement:** a data-platform build for a client, team works in the client's cloud tenant against masked data in lower environments but holds read access to a production analytics store containing customer records.

- **D1 — Contractual:** Yes. Contract names a security schedule with a 72-hour breach-notification clause.
- **D2 — Personal data:** Yes. Customer records (names, contact, purchase history). Regime: the applicable general data-protection regime. Charter must declare it.
- **D3 — Physical product:** No.
- **D4 — Production access:** Yes. Read access to the production analytics store.

**Derivation:** D2 and D4 both triggered → **Tier 3 — Critical**. Required-control blocks generated for D1, D2, D4. Charter reconciliation: confirm the privacy regime is declared; if not, flag and route to `pdf-create-charter`. Owner named. On write, recommend `pdf-secure-sdlc-health` and `pdf-update-raid`.

## Common failure modes (and the refusal)

- **Banking the low tier while a question is open.** "We're probably not touching personal data" with no confirmation is `not-yet-known`, dated — not "no".
- **Tier 0 with nobody's name on it.** Refuse; require the declaration block.
- **D2 without a regime.** Name it and reconcile to the charter, or it is not classified.
- **A required control quietly marked n/a.** Needs a one-line justification and a named approver, recorded in the row.
