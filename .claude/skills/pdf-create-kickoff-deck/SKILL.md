---
name: pdf-create-kickoff-deck
description: Create, update, or validate the engagement kickoff deck — the first all-hands artifact, drawn from charter + RACI + governance + comms plan. Use when the user asks to prepare for kickoff or when Marcus dispatches to deck work.
---

# Kickoff deck workflow

Produces `_pdf-output/engagements/{active}/02-mobilization/kickoff-deck.md` as a single markdown document with MARP-style slide separators (`---`). One H2 per slide. Renderable to slides via MARP or similar; readable as a document either way.

## Preconditions

- `CHARTER.md` at `current_revision >= 1`
- `RACI.md` populated
- `GOVERNANCE.md` populated
- `COMMS-PLAN.md` populated

If any is missing, refuse: *"Kickoff is a re-statement of the charter. Build the charter, RACI, governance, and comms plan first."* (Marcus's principle 5.)

## Intent: create

The deck **does not invent content** — it composes from existing artifacts. The workflow:

1. **Source.** Read CHARTER.md, RACI.md, GOVERNANCE.md, COMMS-PLAN.md.
2. **Compose.** Generate slides in this canonical order:
   1. Title — `{Engagement name}` + date + audience
   2. Why we're here — one-paragraph framing from charter Scope
   3. What we're delivering — Scope (in-scope bullets only)
   4. What's out of scope — explicit out-of-scope items from Scope
   5. What success looks like — from Success Criteria
   6. Who's involved — Stakeholders summary + sponsor names
   7. Who decides what — RACI summary (top 5 workstreams only; full RACI is the appendix)
   8. How we govern — Cadence table from GOVERNANCE
   9. How we communicate — Rituals table from COMMS-PLAN
   10. Risks we're already watching — top 3 from RAID (if exists; otherwise placeholder)
   11. The first 30 days — placeholder for Petra's plan once it exists; otherwise a sketch
   12. Asks — what the delivery team needs from stakeholders on day 1
   13. Q&A
   14. Appendix: full RACI, full governance plan, full comms plan
3. **Compose voice.** Use the engagement's audience profile (see `customize.toml` `[workflow.audience]`). Default tone: professional, confident, no jargon, no buzzwords.
4. **Confirm before write.** Show the slide outline; ask: *"Generate full content or refine the outline first?"*
5. **Write.** Frontmatter includes `red_teamed: false` initially.
6. **Trigger red-team.** Kickoff deck is **high-stakes / client-facing**. Default red-team is **on**. Recommend `pdf-red-team kickoff-deck.md` before sending.

## Intent: update

1. Read existing deck. Read current charter / RACI / governance / comms.
2. Highlight slides that no longer match their source artifacts. Propose updates.
3. Apply. Re-trigger red-team (the prior `red_teamed: true` flag is reset to false on any content change).

## Intent: validate

Checks:

- [ ] All 14 canonical slides present (or explicitly skipped with a reason)
- [ ] Scope slide matches charter Scope
- [ ] Success slide matches charter Success Criteria
- [ ] Stakeholder slide names match STAKEHOLDERS.md
- [ ] RACI summary slide is a strict subset of RACI.md
- [ ] Governance cadence slide matches GOVERNANCE.md
- [ ] Comms slide matches COMMS-PLAN.md
- [ ] Frontmatter has `red_teamed: true` for the most recent revision

## Intent: dump-merge

If pre-existing kickoff material is dumped via Marcus, treat it as a source for the *Why we're here* and *Asks* slides; do not let dumped content override the structured slides 3–9 (those are derived from the constitution).

## Red-team gate

**Default ON.** This artifact is the most client-facing output Marcus produces. Failures here damage the engagement before it begins.

## Reference

- `ARCHITECTURE.md` §6.2, §16
- Marcus's principle 5 ("Kickoff is a re-statement of the charter, not a re-negotiation")
