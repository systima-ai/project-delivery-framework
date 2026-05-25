---
name: pdf-secure-sdlc-health
description: Compose a Secure SDLC health card covering Threat Modelling, SAST, DAST / Pen Testing, SCA, Secrets Management, and Security Training & Culture — plus a cross-check against compliance regimes declared in the charter. RAG-rated per sub-dimension with summary table + narrative + compliance section.
---

# Secure SDLC health card workflow

Produces `_pdf-output/engagements/{active}/07-quality/secure-sdlc-health-cards/<YYYY-MM-DD>.md`.

Same dual-view shape as the other Quinn workflows. Six security sub-dimensions plus a **Compliance Regime Coverage** section that iterates declared regimes from the charter and reports evidence-of-being-addressed for each.

**Compliance check posture: lax (per design decision).** A declared regime with no evidence-of-being-addressed surfaces as a WARNING in the compliance section but does **not** automatically force a particular RAG colour. The overall RAG remains the user's judgement.

See `references/secure-sdlc-evidence-guide.md`.

## Preconditions

- `CHARTER.md` at revision ≥ 1
- The charter's Compliance Regimes section is parsed for the cross-check (empty is allowed; Quinn notes its absence and proceeds)

## Intent: create

1. **Offer source-mode.** *"Have artifacts — SAST/DAST reports, pen-test results, SCA exports, secrets-scan output, DPIA documents, conformity assessments? Paths welcome. If not, I'll interview you. [paths / interview]"*
2. **Read paths if provided.**
3. **Walk the six security sub-dimensions** per the evidence guide.
4. **Run the compliance cross-check.**
   - Read `CHARTER.md` Compliance Regimes section.
   - For each declared regime (GDPR, HIPAA, PCI-DSS, EU AI Act, SOC 2, ISO 27001, sector-specific, etc.), look for evidence-of-being-addressed in the engagement artifacts and/or ask the user.
   - **Lax check:** missing evidence → WARNING in the compliance section, not automatic RAG demotion. The user judges overall.
5. **Synthesise overall RAG** per the same rule.
6. **Compose** the canonical health-card format plus the additional Compliance Regime Coverage section:

```markdown
## Compliance Regime Coverage

| Regime | Declared in charter? | Evidence of being addressed | Status |
|---|:-:|---|:-:|
| GDPR | Yes | DPIA dated <date>; processor agreements logged | OK |
| EU AI Act | Yes | (none located) | WARNING |
| SOC 2 | No | n/a | — |

**Warnings** (compliance regimes declared without evidence-of-being-addressed):

- **EU AI Act** — declared in charter §Compliance Regimes; no DPIA / conformity-assessment / risk-classification artifact located in the engagement and the user has not described what's in place. This is flagged as a WARNING; it does not automatically demote the overall RAG. The user is encouraged to either produce evidence or update the charter to remove the regime if no longer applicable.

(Warnings appear only if a regime is declared without evidence. Absent warnings is the desired state.)
```

7. **Cross-skill side effects.**
   - Each RED security sub-dimension → offer `pdf-update-raid`.
   - Each compliance WARNING → offer `pdf-update-raid` to log the gap as a Risk and ideally as an Assumption-with-validation-plan.
   - Overall RED → offer `pdf-write-stakeholder-update` for Legal-Compliance archetype (Helena).
   - Compliance WARNING with high-impact regime (EU AI Act high-risk, PCI-DSS, HIPAA) → recommend escalation analysis via `pdf-decide-escalation` (Klaus).
8. **Write.** `next_default` 28 days out.

## Intent: update / validate / dump-merge

Same as other health-card workflows. Validation specifically checks:

- [ ] Every charter-declared regime appears in the Compliance Regime Coverage table
- [ ] Every regime row has a status of OK / WARNING / —
- [ ] If any WARNING exists, the warnings section is populated with non-empty text per warning
- [ ] No declared regime is silently omitted

## Anti-patterns to refuse

- **"Secure SDLC" without a threat model.** Threat modelling is the foundation; absence is a finding, not a "we'll do it later".
- **Pen test result without owner-action.** A pen test report sitting on a shelf is not evidence of being addressed; evidence is the action items that came from it being tracked and closed.
- **"GDPR compliance" without a DPIA or a documented exemption.** Lax check still requires the workflow to ask; "we comply" without an artifact is recorded as WARNING.
- **Silent compliance-regime override.** If the user wants to mark a regime "OK" without evidence, the workflow requires a one-line explanation in the table row (e.g. "Compliance owned by client; we're a processor only; processor agreement in place at <path>").

## Red-team posture

Off. The internal forensic check is itself a kind of red-team; the compliance warnings are public-facing-by-default if the card is shared.

## Reference

- `references/secure-sdlc-evidence-guide.md`
- `pdf-sdlc-health/SKILL.md` for shared output structure
- `ARCHITECTURE.md` §6.7, §16
- Quinn's principle 6 (compliance regimes named in the charter must be visibly addressed)
