---
name: pdf-qa-health
description: Compose a QA health card covering Test Case Management, Defect Management, NFR Testing, QA Metrics, and Automated Testing. RAG-rated per sub-dimension with summary table + narrative. Use to assess QA discipline from the delivery-manager perspective.
---

# QA health card workflow

Produces `_pdf-output/engagements/{active}/07-quality/qa-health-cards/<YYYY-MM-DD>.md`.

Same shape as `pdf-sdlc-health`: dual-view output (summary table + narrative), on-demand + 4-weekly default cadence, optional artifact-path reading with full Q&A-only fallback, off red-team.

See `references/qa-evidence-guide.md` for the five sub-dimensions, what evidence to look for, and RAG criteria.

## Preconditions

- `CHARTER.md` at revision ≥ 1

## Intent: create

1. **Offer source-mode.** *"Have artifacts I can read first — test-management tool export, defect register, NFR test report, automation coverage? Paths welcome. If not, I'll interview you. [paths / interview]"*
2. **Read paths if provided.** Surface evidence per sub-dimension.
3. **Walk the five sub-dimensions** per the evidence guide.
4. **Synthesise overall RAG.** Same rule as SDLC: overall = worst of sub-dimensions unless explicitly justified.
5. **Compose** in the canonical health-card format (see `pdf-sdlc-health/SKILL.md` for the structure; same shape, different sub-dimensions).
6. **Cross-skill side effects.**
   - Each RED sub-dimension → offer `pdf-update-raid` (append risk).
   - Overall RED → offer `pdf-write-stakeholder-update` for CTO or Engineering-Lead.
7. **Write the file** with `next_default` set 28 days out.

## Intent: update / validate / dump-merge

Same as `pdf-sdlc-health`. New card per date; prior cards retained; validation checks structure and RAG-consistency.

## Anti-patterns to refuse

- **"Automated tests" without coverage data.** Coverage is the headline NFR for QA automation; saying "we have automation" without coverage figures is a non-answer.
- **Green NFR Testing without named non-functional requirements.** If the charter doesn't declare NFRs and the team isn't testing against any, the workflow asks the user to flag a charter gap rather than assigning GREEN.
- **Defect management measured by count alone.** Trends, ageing, severity distribution matter more than raw open count.

## Red-team posture

Off.

## Reference

- `references/qa-evidence-guide.md`
- `pdf-sdlc-health/SKILL.md` for the shared output structure
- `ARCHITECTURE.md` §6.7
- Quinn's principles
