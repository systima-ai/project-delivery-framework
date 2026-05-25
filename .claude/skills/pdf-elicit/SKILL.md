---
name: pdf-elicit
description: Standalone elicitation skill. Walks any PDF artifact's gaps interactively — missing fields, TBC values, validation failures — and fills them by Q&A. Dispatches the actual write back to the artifact's own workflow update intent. Use when you have a half-finished artifact and want to complete it without re-running its full workflow.
---

# Elicit workflow

The framework's interactive gap-filler. Reads an existing artifact, identifies what's missing or marked TBC, walks the user through one question at a time, and dispatches the writes back to the artifact's own workflow.

This is a **standalone skill** (per design choice) — directly invocable. The user says "elicit me through the gaps in [path]" and the workflow runs.

## Preconditions

- An existing PDF artifact with gaps

## Intent: elicit (default)

1. **Identify the artifact.** *"Which artifact has gaps? Paste a path or describe."*
2. **Read the artifact.**
3. **Identify the artifact's workflow.** From frontmatter `artifact_type` and `generated_by`.
4. **Load the workflow's validation criteria** from its `customize.toml` and SKILL.md.
5. **Run validation.** Surface every check that fails: missing fields, TBC values, blank required fields.
6. **Categorise gaps.**
   - **Mandatory** — validation fails on these; cannot finalise without them
   - **Recommended** — workflow flags these but doesn't fail
   - **Optional** — sections the user could fill but no obligation
7. **Walk the gaps interactively.** One at a time. For each:
   - Show the field name and where it lives in the artifact
   - Show the workflow's canonical question (if `references/<topic>-fields-guide.md` exists for the artifact, use the canonical question from there)
   - Capture the user's answer
   - Show how it would land in the file
   - Confirm before write
8. **Dispatch the write.** Send the field value to the artifact's own workflow's `update` intent. The workflow handles the actual write — preserving its discipline (e.g. `pdf-create-charter` increments the revision; `pdf-update-raid` updates History).
9. **Re-run validation.** Confirm gaps closed.
10. **Hand off.** If validation now passes, recommend the next-stage skill per the artifact's workflow's `handoff` config.

## Intent: elicit-mandatory-only

Same flow but skips Recommended and Optional gaps. Useful when you want to make an artifact finalisable quickly.

## Intent: elicit-by-section

User picks a specific section of the artifact to elicit through. Useful for large artifacts (charter, plan, governance) where you only want to fill one area.

## Intent: validate

The elicit workflow itself doesn't have a validation intent — it dispatches to the target artifact's validation. The relevant intent here is `elicit` → which runs validate as its final step.

## Intent: dump-merge

Accept dumped material that addresses gaps in the artifact. Match content to gaps; dispatch to update-intent for each matched gap; identify unmatched material; surface for the user.

## How the dispatch model works

`pdf-elicit` does not write to artifacts directly. Every write goes through the artifact's own workflow:

- Gap in `CHARTER.md` → dispatched to `pdf-create-charter` (update intent)
- Gap in `RAID.md` → dispatched to `pdf-update-raid`
- Gap in `weekly-status/<week>.md` → dispatched to `pdf-weekly-status` (update intent)
- (etc.)

This preserves the workflow disciplines:

- Charter updates bump the revision and append change-log
- RAID updates append to History
- Weekly status updates append a `## Revisions` section
- Confidentiality flags on Iris's artifacts are preserved
- Red-team gates are not bypassed (if a workflow normally requires red-team, the elicit-driven update still does)

## Anti-patterns to refuse

- **Direct writes.** Refuse. Every write goes via the artifact's workflow.
- **Eliciting through gaps that require structural changes.** Refuse and route. E.g. "the charter has no Scope section" is not a gap-fill; it's a structural issue that `pdf-create-charter` create intent handles.
- **Eliciting into a confidential artifact via a non-confidential workflow.** Refuse. Confidentiality posture follows the artifact, not the elicit dispatch.
- **Eliciting against artifacts whose workflow doesn't exist** (e.g. early-version PDF artifacts whose workflow has been removed). Surface the situation; offer to recreate the workflow or to manually fill the gap with a clearly-noted "no workflow available" frontmatter flag.

## Red-team posture

Off. Elicit is mechanical; its discipline is in dispatching to disciplined workflows.

## Reference

- `ARCHITECTURE.md` §18 (dump intent; elicit is the related interactive sibling)
- Every artifact workflow's `references/<topic>-fields-guide.md` (where present) — elicit pulls canonical questions from these
