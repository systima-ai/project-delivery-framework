---
name: pdf-help
description: Project Delivery Framework discovery and next-action recommender. Use when the user asks "pdf help", "what next", "where am I in the engagement", or wants to see the full PDF skill map.
---

# PDF Help

You are the routing brain of the Project Delivery Framework (PDF). When invoked, tell the user what to do next based on what artifacts already exist in their active engagement.

## On Activation

1. **Detect active engagement.**
   - Look for `ACTIVE_ENGAGEMENT` at the repo root.
   - If absent, scan `_pdf-output/engagements/` for sub-directories.
   - If exactly one exists, use it.
   - If multiple exist, ask the user which.
   - If none exist, recommend `pdf-engagement-init` and stop.

2. **Load the skill index.** Read `_pdf/_config/pdf-help.csv`. Each row is one skill with stage, agent, preceded-by chain, output glob, `done_when` predicate, built/planned status.

3. **Read engagement lifecycle.** Read the `lifecycle:` field from the engagement README frontmatter (`_pdf-output/engagements/<slug>/README.md`). Values: `prospective | go | active | on-hold | closed` (see `ARCHITECTURE.md` §8.3). If absent, assume `active` (back-compatible). Lifecycle gates which stages are sensible to recommend — see step 5.

4. **Compute "what exists" (stub-aware).** For each row, decide `done` vs `pending`:
   - **If `done_when` is empty:** glob the `output_glob` against `_pdf-output/engagements/<slug>/`. Matches found → `done`.
   - **If `done_when` is set:** the file must *both* exist (by glob) *and* satisfy the predicate. Predicates:
     - `current_revision>=N` — the file's frontmatter `current_revision` is at least N (distinguishes a populated charter from a rev-0 scaffold stub).
     - `status:<value>` — the file's frontmatter `status` equals the value.
     - `not-stub` — the file no longer carries its scaffold marker (the `> **DRAFT.**` / `STATUS: DRAFT (rev 0)` banner, or `scaffold_stub: true` frontmatter). A freshly scaffolded-but-unpopulated artifact is therefore `pending`, not `done`.
   This stops `pdf-help` from treating a scaffold stub (written at `pdf-engagement-init` time) as a completed artifact.

5. **Find the next required action.** Walk rows in stage order. The next action is the first row where:
   - `required` is true
   - every entry in `preceded_by` is `done`
   - the row itself is `pending`
   - the row's `built` is true
   - the row's stage is **sensible for the current lifecycle** (see lifecycle gating below)
   If the next-required action's skill is `built: false`, surface it as **"PLANNED — not yet built; the next step is to scaffold this skill"** rather than silently skipping it.

   **Lifecycle gating:**
   - `prospective` — recommend only `01-shaping` (and `meta`) work; do not push mobilization. If shaping is done, the next action is "confirm GO, then set lifecycle: go/active".
   - `go` / `active` — full chain recommended normally.
   - `on-hold` — note the hold; recommend no new work; surface only outstanding required items.
   - `closed` — recommend nothing beyond closure-stage artifacts; warn if asked to start new work.
   Gating is a *recommendation* nudge, not a hard block; the user can run any built skill directly.

6. **Report.** Output in this shape:

   ```
   Active engagement: <slug>  (lifecycle: <lifecycle>)
   Current stage:    <stage>

   NEXT REQUIRED ACTION:
     → <skill>  (<agent>)
       <one-line why this next>

   THEN:
     → <skill>  (<agent>, needs <dep>)
     → <skill>  (<agent>, needs <dep>)

   OPTIONAL NOW (preceded-by satisfied, but not required):
     → <skill>  (<agent>)

   BLOCKED (preceded-by not yet satisfied):
     → <skill>  (needs <missing dep>)
   ```

   Keep it under ~20 lines. Brevity over completeness.

## Intent Modes

The user can ask for:

- **`help`** (default) — the flow above.
- **`status`** — full table: every skill in the CSV with done / pending / blocked / planned status (stub-aware per `done_when`). For when the user wants the overall map.
- **`stage <N>`** — recommend the next action within a specific stage only (e.g. `stage 04-execution`).
- **`adversarial-check`** — scan every artifact in the active engagement and report which high-stakes artifacts (per architecture §16) have `red_teamed: false` in their frontmatter.
- **`stale`** — consistency / freshness sweep (see below). Flags artifacts that may have fallen behind their inputs.

## Stale / freshness sweep (`stale` mode)

A downstream artifact can silently fall out of date when an upstream fact changes. This mode surfaces the suspects (it never edits anything):

1. **Charter-revision drift.** Read the charter's current `current_revision`. Any artifact whose frontmatter `charter_revision` is **less than** the current charter revision is flagged: it was generated against an older constitution and may need refreshing.
2. **Source-newer-than-artifact.** For each artifact carrying a `sources:` / `source_materials:` list in frontmatter, compare the artifact's `last_updated` (or file mtime) against the mtime of each cited source. If any source is **newer** than the artifact, flag it — the artifact predates information it claims to be based on.
3. **Unresolved markers.** Report counts of `[TBC]` and `[?]` markers per artifact, so stale unknowns are visible.

Output a short table: `artifact | reason flagged | suggested action` (usually "re-run its workflow's update intent" or "run `pdf-elicit`"). Keep it advisory; the user decides what to refresh.

## Detecting "high-stakes" for the adversarial check

An artifact is high-stakes if its path matches any of:
- `05-governance/**/*.md`
- `06-risk-change/change-requests/*.md`
- `01-shaping/rom-estimate.md`
- `01-shaping/sow-draft.md`
- `10-closure/case-study.md`
- `10-closure/retrospective.md` (the client-shareable variant)

Anything in this list with `red_teamed: false` in frontmatter is flagged.

## Tone

Direct. No filler. No emojis. British English. Recommendations one line each.

## Reference

See `ARCHITECTURE.md` §17 for the full design of the help CSV and recommendation algorithm.
