---
name: pdf-export-okf
description: Project an engagement (or a slice of it) into an Open Knowledge Format (OKF) bundle — a vendor-neutral directory of markdown-plus-frontmatter concept files that other agents and visualisers can consume without a PDF-specific integration. Read-only superset projection; never mutates native artifacts. Use when you want to hand a successor, a client, or an external agent a portable, browsable knowledge bundle (handover, case study, knowledge-catalog ingest), or to validate an existing OKF bundle for conformance.
---

# Export-to-OKF workflow

Projects PDF's native engagement artifacts into an **[Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) (OKF) bundle**: a directory of markdown files, each with YAML frontmatter carrying a small set of queryable fields (`type`, `title`, `description`, `resource`, `tags`, `timestamp`) and a markdown body, cross-linked with markdown links, with `index.md` files for progressive disclosure and `log.md` files for chronological history.

PDF artifacts are already markdown + YAML frontmatter + markdown cross-links. This workflow does **not** convert PDF's storage — it emits a **one-way, lossless, superset projection**: it adds OKF's canonical fields *alongside* PDF's existing fields (`charter_revision`, `sources`, `red_teamed`, `generated_by`, `model`, `prompt_hash`), so a bundle round-trips back to its source without information loss. See `references/okf-mapping.md` for the full field-mapping and conformance spec.

## Design stance (per project principles)

- **Read-only.** The native engagement under `_pdf-output/engagements/<slug>/` is never modified. The bundle is written to a separate `exports/` tree.
- **Local-first preserved.** Export is a deliberate act, not automatic. The bundle is written locally; nothing leaves the machine unless the user ships it.
- **Confidential-by-exclusion.** `09-people/` (team health, attrition, 1:1s, performance, ramp) is **excluded by default** and requires explicit per-run confirmation to include. `audit-log/` and `.sync-cache/` are **never** exported.
- **Adversarial before outward.** Any slice intended to leave the machine should pass `pdf-red-team` first; the workflow flags artifacts whose frontmatter shows `red_teamed: false` and recommends the gate before sharing.

## Preconditions

- An active engagement with at least a populated charter (`00-constitution/CHARTER.md`, `current_revision >= 1`).
- A decision at invocation on **scope** (full / slice) and **fidelity** (full / redacted).

## Output location

```
_pdf-output/engagements/<slug>/exports/okf/<YYYY-MM-DDTHHMMZ>/
├── index.md                      # bundle root index (OKF reserved)
├── log.md                        # engagement chronology (from decision-log + charter change-log)
├── manifest.md                   # what was included/excluded, fidelity, source revision
├── 00-constitution/
│   ├── index.md
│   ├── charter.md
│   ├── stakeholder-map.md
│   └── ...
├── 04-execution/
│   ├── index.md
│   └── ...
└── ...
```

The `exports/` tree is git-ignorable like `audit-log/`; the user chooses whether to commit or ship a bundle.

## Intent: export (default)

1. **Establish scope and fidelity.**
   - *"Scope? Full engagement, or a slice (e.g. handover-pack, case-study, a named stage)?"*
   - *"Fidelity? Full (named specifics, internal use / trusted successor) or Redacted (anonymised, external-safe)?"*
   - *"Include the confidential People stage (`09-people/`)? Default NO. Including it requires you to confirm the recipient is cleared for it."*

2. **Enumerate source concepts.** Walk the engagement tree (respecting exclusions). Each canonical artifact file becomes one OKF **concept** file. Skip: `audit-log/`, `.sync-cache/`, `_transcripts/` (source material, not concepts) unless explicitly requested, and any `09-people/` content unless confirmed in step 1.

3. **Project each concept** per `references/okf-mapping.md`:
   - Derive `type` from `artifact_type` (kept verbatim — OKF requires only that the field is present).
   - Derive `title` from the artifact's H1.
   - Derive `description` from the artifact's lead summary, or a per-type one-liner.
   - Set `resource` to the source's engagement-relative path (the canonical origin).
   - Derive `tags` from stage + `artifact_type` + engagement slug.
   - Set `timestamp` (ISO 8601) from `last_updated` / `red_team_pass_at` / `date` / file mtime, in that order of preference.
   - **Preserve all original PDF frontmatter fields** below the OKF block (lossless superset).
   - Rewrite `sources:` entries and inline artifact references as **bundle-relative markdown links** so the bundle is a self-contained graph.

4. **Apply fidelity.** If redacted: strip named individuals, day rates, margin figures, and other commercially-sensitive specifics using the same redaction conventions as the public variants in `pdf-create-case-study` / `pdf-run-retrospective`. Replace with role labels and qualitative bands. Record every redaction class in `manifest.md`.

5. **Generate reserved files.**
   - **`index.md`** per directory: a short progressive-disclosure index listing the concepts in that directory with their `type`, `title`, and a one-line description, plus links to child directory indexes.
   - **`log.md`** at the root: chronological history merged from `decision-log.md`, the charter change-log table, and STATUS-LOG where present.
   - **Root `index.md`**: the bundle entry point — engagement one-liner, lifecycle, source charter revision, and links into each stage index.

6. **Write `manifest.md`** recording: scope, fidelity, included/excluded stages, confidential-inclusion decision, source charter revision, generating model, count of concepts, and any artifacts flagged `red_teamed: false`.

7. **Self-validate** (runs the `validate` intent against the freshly-written bundle) and report the result.

8. **Hand off.**
   - If fidelity is full and any concept is destined to leave the machine → recommend `pdf-red-team` on the relevant artifacts first.
   - If this is a handover → recommend pairing with `pdf-create-handover-pack`.
   - Note that the bundle is viewable in any OKF-compatible consumer (e.g. a static HTML graph visualizer) and is ingestible by a knowledge catalog that speaks OKF.

## Intent: export-slice

Same as `export`, but the user names a subset rather than the whole engagement:

- A named **stage** (e.g. `06-risk-change`).
- A named **artifact set** (e.g. handover-pack + charter + decision-log; or case-study + retrospective).
- A **glob** of artifact paths.

Produces a smaller bundle with its own root `index.md` and `manifest.md`. Slices are the common path for outward sharing — keep them minimal and prefer redacted fidelity.

## Intent: validate

Check an existing OKF bundle (the one just written, or a path the user supplies) against the conformance criteria in `references/okf-mapping.md`:

- [ ] Every concept file carries frontmatter with a non-empty `type` (OKF's single hard requirement).
- [ ] Reserved filenames used correctly: `index.md` (directory index), `log.md` (chronology); no other file uses these names for non-reserved purposes.
- [ ] Every intra-bundle markdown link resolves to a file in the bundle.
- [ ] OKF canonical fields (`title`, `description`, `resource`, `tags`, `timestamp`) present where the mapping requires them; report (don't fail) where only `type` is present.
- [ ] **No excluded-confidential content leaked.** Scan for People-stage markers and named-individual patterns when the manifest declares People excluded or fidelity redacted. A leak is a **fatal** finding.
- [ ] `manifest.md` present and consistent with the bundle contents.

Reports conformant / non-conformant with a findings list. Edits nothing.

## Intent: dump-merge

Accept an externally-produced OKF bundle (e.g. from another tool's producer) and report how it maps **back** into PDF concepts — which files correspond to which PDF artifact types, what has no PDF home, and what a PDF user would do with it. Does not write into the engagement; this is a read/advise pass (importing OKF as canonical PDF artifacts is out of scope for v0.1).

## Anti-patterns to refuse

- **Exporting `09-people/` without explicit confirmation.** Refuse silently-including confidential People data; it must be an owned, per-run decision.
- **Exporting `audit-log/` or `.sync-cache/`.** Never. These are operational/secret-adjacent, not knowledge concepts.
- **Lossy projection.** Refuse to drop PDF frontmatter fields to "look more like OKF". The projection is a superset; OKF tolerates extra fields by design.
- **Treating export as conversion.** Refuse any request to *replace* native artifacts with the OKF bundle. PDF's richer frontmatter (charter reconciliation, red-team posture, audit hashes) is the source of truth; OKF is an interchange view.
- **Shipping a full-fidelity bundle outward without a red-team prompt.** If a concept is `red_teamed: false` and the bundle is leaving the machine, surface it.

## Red-team posture

Off for the projection itself (it's a mechanical transform of already-authored artifacts). But the workflow **flags** un-red-teamed high-stakes concepts and recommends `pdf-red-team` before any outward-facing share. The redaction step in redacted fidelity is the analogue of the public-variant gate in case-study / retrospective.

## Reference

- `references/okf-mapping.md` — field mapping, reserved-filename rules, cross-link rewriting, redaction classes, and conformance criteria.
- `ARCHITECTURE.md` §9 (artifact frontmatter — the superset OKF projects from) and §21 (knowledge-interchange / OKF).
- OKF v0.1 spec: https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf
- Sibling utilities: `pdf-create-handover-pack` (the most common consumer of full-fidelity export), `pdf-create-case-study` / `pdf-run-retrospective` (redaction conventions reused here), `pdf-red-team` (the outward-facing gate).
