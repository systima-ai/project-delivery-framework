---
name: pdf-draft-sow
description: Draft a Statement of Work — blank-page from shape and ROM inputs, with the option to seed from a firm house-style template if you provide one. The output is a draft for Legal / Commercial review, not a final contract. Use after qualification, shape, and ROM are complete.
---

# SoW draft workflow

Produces `_pdf-output/engagements/{active}/01-shaping/sow-draft.md`. Single file per engagement.

**Template basis (Lloyd's design choice):** blank-page from charter-like inputs by default, with an explicit placeholder for a firm house-style template if the user has one. The workflow will use a provided template's structure but always fills it from PDF's structured inputs (shape + ROM).

The SoW is the **future charter.** What's vague at SoW time becomes a battle in mobilization. Sofia's principle 4 is the rule.

**Red-team is default ON.** This is the highest-stakes output of the shaping stage — Legal / Commercial / client will all read it.

## Preconditions

- `pdf-shape-opportunity` complete (recommended option named)
- `pdf-estimate-rom` complete (operating range available)
- `pdf-qualify-opportunity` complete (champion / economic buyer named)

## Intent: create

1. **Ask template basis.** *"Do you have a firm or house-style SoW template I should base this on? Paste the path, or say 'no, generate generic'."*

   - If a path is given: read the template, identify its sections, use that structure to compose.
   - If no template: generate the canonical generic SoW (sections listed below).

2. **Source.** Read shape and ROM. Pull:
   - Recommended option's scope and out-of-scope items
   - Assumptions
   - Top risks (those that warrant explicit treatment in the SoW)
   - Operating range from ROM
   - Champion, economic buyer, decision criteria from qualification

3. **Walk SoW elicitation.** For each section, propose draft text from the structured inputs; ask the user to refine. Sections (generic — adapt to firm template if provided):

   1. **Parties** — formal names, addresses, signatories
   2. **Background and purpose** — one paragraph framing
   3. **Scope of services** — what's in (from shape recommended option)
   4. **Out of scope** — explicit (from shape)
   5. **Deliverables** — named, dated, with acceptance criteria
   6. **Acceptance criteria** — per deliverable; objective; testable
   7. **Governance** — steering cadence, escalation path, decision rights (drawn from what will become `GOVERNANCE.md`)
   8. **Commercial** — fees (using operating range from ROM), payment schedule (milestone or T&M), expenses, currency, VAT
   9. **Timeline** — high-level milestones; reference to detailed plan as a deliverable
   10. **Assumptions** — from shape; numbered; consequential if invalidated
   11. **Dependencies on client** — what you need from them; access, decisions, people
   12. **Change control** — process for changes; reference to your CR/CO mechanism
   13. **Term and termination** — duration, termination-for-convenience, termination-for-cause, exit obligations
   14. **Confidentiality / IP** — placeholder; usually Legal owns final language
   15. **Liability** — placeholder; Legal owns
   16. **Warranties** — placeholder; Legal owns
   17. **Signatures**

4. **Compose** in the chosen structure. Each section has both:
   - Draft language (substantive)
   - **Reviewer notes** — what Legal / Commercial / client should check; what assumptions you're making about their position; what's vague intentionally vs accidentally

5. **Run simulated red-team inline.** The SoW red-team is the most thorough in the framework:
   - *Which clause would the most adversarial client lawyer challenge?*
   - *Which acceptance criterion is objectively testable, and which would devolve into argument?*
   - *Where am I assuming we can renegotiate later that I should fix now?*
   - *Which assumption is sized but not commercially protected? (e.g. "assuming client provides cloud environment within 2 weeks of signature" — what happens if they don't?)*
   - *Where am I being deliberately vague to close the deal? Is the vagueness defensible, or will it cost me in delivery?*
   - *Is the change-control process tight enough to prevent scope creep without becoming a battle?*

6. **Compose** the output:

```markdown
---
artifact_type: sow-draft
engagement: <slug>
date: <YYYY-MM-DD>
status: draft
template_basis: <path or "generic">
linked_shape: 01-shaping/opportunity-shape.md
linked_rom: 01-shaping/rom-estimate.md
operating_range: <£low to £high>
cone_stage_at_drafting: <stage>
recommended_signatories:
  client: <name>
  supplier: <name>
generated_by: pdf-draft-sow
red_teamed: false
---

# Statement of Work draft — <Engagement name> — <date>

> **Draft for Legal / Commercial / client review.** Not a final contract. Reviewer notes per section flag where attention is needed.

## 1. Parties

(Draft language.)

**Reviewer notes:** <what to check>

## 2. Background and purpose

(...)

**Reviewer notes:** <...>

(Repeat per section. Reviewer notes are mandatory per section in PDF's SoW; vague sections without flags will be missed.)

---

## SoW review checklist (from Sofia)

Before this leaves your machine:

- [ ] All assumptions from the shape document appear in §10 (Assumptions)
- [ ] All top-5 risks from the shape document have either a contractual protection (clause, exclusion, contingency) or an explicit RAID entry
- [ ] Acceptance criteria are objectively testable (not "to the satisfaction of the client")
- [ ] Change-control process is named and tight
- [ ] Operating range from ROM is reflected in commercial section with the cone-stage caveat
- [ ] Reviewer notes flag every section where attention is needed
- [ ] Frontmatter `red_teamed: true`

---

_Generated by `pdf-draft-sow`. Red-team gate: ON. Reviewer routing: <name(s)>. Estimated review cycle: <days>._
```

7. **Cross-skill side effects.**
   - On status `signed` → trigger `pdf-engagement-init` if not already done (in practice it usually has been); then `pdf-create-charter` (Marcus). The SoW is the input to the charter; the charter inherits the SoW's structure and tightens it for the operating phase.
   - Significant Legal review comments → may trigger an update intent on shape, ROM, or back to qualification.

8. **Write the file.**

## Intent: update

1. Common updates: Legal markup applied; client redlines incorporated; pricing tightened; assumptions changed.
2. Status moves: `draft` → `in-review` → `redline-received` → `redlines-applied` → `final` → `signed`.
3. Each status transition appends to a `## History` section.
4. If a redline changes scope materially, the workflow recommends re-running `pdf-shape-opportunity` and `pdf-estimate-rom` updates before re-issuing the SoW.

## Intent: validate

- [ ] Frontmatter complete; status valid; signatories named
- [ ] All sections present (or explicitly omitted with reason — e.g. "Confidentiality handled in master agreement")
- [ ] Every shape-document assumption appears in §10
- [ ] Reviewer notes present in every section
- [ ] Acceptance criteria are objectively testable (workflow flags subjective language)
- [ ] Commercial section uses operating range, not single-point
- [ ] Frontmatter `red_teamed: true`

## Intent: dump-merge

Accept dumped material (firm template, prior SoW, client RFP requirements). If a template is dumped, treat it as the structure; if a prior SoW, extract reusable language; if RFP requirements, validate the SoW against them.

## Anti-patterns to refuse

- **Acceptance criteria that say "to the satisfaction of the client".** Refuse. This is the most common scope-creep enabler in SoWs.
- **Commercial section with a single number, no range.** Refuse. The operating range from ROM is the unit at this stage.
- **Out-of-scope section that's empty.** Refuse. If you can't articulate what's out of scope, you haven't shaped the opportunity properly.
- **Assumption sections without consequence statements.** Refuse. An assumption without "if invalidated, X happens" is decorative.
- **No change-control process named.** Refuse. The biggest SoW failure mode is no change mechanism.

## Red-team posture

**Default ON.** The most thorough red-team in the framework. Six explicit cynical-review questions inline.

## Reference

- `ARCHITECTURE.md` §6.1, §16
- Sofia's principle 4 (the SoW is the future charter)
- Marcus's `pdf-create-charter` is the downstream artifact; SoW inputs become charter inputs
