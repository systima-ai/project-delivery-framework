---
name: pdf-syseng-health
description: Compose a Systems Engineering health card covering CI/CD and Infrastructure Management. RAG-rated per sub-dimension with summary table + narrative. Use to assess platform and delivery-pipeline hygiene.
---

# Systems Engineering health card workflow

Produces `_pdf-output/engagements/{active}/07-quality/syseng-health-cards/<YYYY-MM-DD>.md`.

Same dual-view shape as `pdf-sdlc-health`. Two sub-dimensions in scope (CI/CD and Infrastructure Management); each is meaty enough to warrant a substantial narrative section.

See `references/syseng-evidence-guide.md`.

## Preconditions

- `CHARTER.md` at revision ≥ 1

## Intent: create

1. **Offer source-mode.** *"Have artifacts — pipeline dashboard, infrastructure-as-code repo path, observability dashboard, runbook index? Paths welcome. If not, I'll interview you. [paths / interview]"*
2. **Read paths if provided.**
3. **Walk the two sub-dimensions** per the evidence guide.
4. **Synthesise overall RAG.** Same rule.
5. **Compose** in canonical health-card format. (Same shape as `pdf-sdlc-health` output; sub-dimensions differ.)
6. **Cross-skill side effects.**
   - Each RED sub-dimension → offer `pdf-update-raid`.
   - Overall RED → offer `pdf-write-stakeholder-update` for CIO or CTO archetype.
7. **Write.** `next_default` 28 days out.

## Intent: update / validate / dump-merge

Same as `pdf-sdlc-health`.

## Anti-patterns to refuse

- **"CI/CD" without deployment-frequency data.** DORA-style metrics (deployment frequency, lead time, change-failure rate, mean time to restore) are the canonical evidence; absence is itself a finding.
- **Infrastructure-as-code claimed without repo evidence.** "We manage infra as code" without a repo path or recent commit history is unsupported.
- **Disaster-recovery claims without test evidence.** A DR plan that has never been tested is not a DR plan.

## Red-team posture

Off.

## Reference

- `references/syseng-evidence-guide.md`
- `pdf-sdlc-health/SKILL.md` for shared output structure
- `ARCHITECTURE.md` §6.7
