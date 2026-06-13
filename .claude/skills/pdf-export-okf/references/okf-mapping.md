# OKF mapping, conformance, and projection rules

Reference for `pdf-export-okf`. Defines exactly how a PDF engagement projects into an Open Knowledge Format (OKF) v0.1 bundle, and how a bundle is validated.

## 1. What OKF v0.1 requires

OKF is **minimally opinionated**. The entire interoperability surface is:

- A **bundle** is a directory of markdown files. Each file is one **concept**; the file path is the concept's identity.
- Each concept has **YAML frontmatter** + a **markdown body**.
- The only **hard requirement** is a `type` field on every concept.
- Recommended queryable fields: `type`, `title`, `description`, `resource`, `tags`, `timestamp`.
- Concepts link to each other with **normal markdown links**, forming a graph.
- **Reserved filenames**: `index.md` (progressive-disclosure directory index) and `log.md` (chronological history). Optional but reserved.

Everything else (what types exist, what extra fields to carry, what body sections to use) is left to the producer. This is why PDF can project losslessly: OKF tolerates PDF's extra fields.

## 2. The projection is a superset, not a rewrite

For each PDF artifact, the projected concept's frontmatter is:

```yaml
---
# --- OKF canonical block (added by the projection) ---
type: <from artifact_type>
title: <from H1>
description: <from lead summary or per-type default>
resource: <engagement-relative source path>
tags: [<stage>, <artifact_type>, <engagement-slug>, ...]
timestamp: <ISO 8601>
# --- PDF native block (preserved verbatim, lossless) ---
artifact_type: <original>
engagement: <slug>
charter_revision: <n>
generated_by: <pdf-skill>
model: <model id>
prompt_hash: <sha256:...>
sources: [...]
red_teamed: <true|false>
red_team_pass_at: <iso>
---
```

The body is the original markdown body, with `sources:` and inline artifact references rewritten as bundle-relative markdown links (§5).

**Rule:** never drop a PDF field to look "more OKF". The whole point is a clean round-trip back to source.

## 3. Field derivation

| OKF field | Source in PDF artifact | Fallback |
|---|---|---|
| `type` | `artifact_type` (verbatim) | **required** — if absent, infer from filename/skill and flag in manifest |
| `title` | First H1 in the body | Humanised `type` + identifier (e.g. "Weekly Status — W22") |
| `description` | First sentence/lead paragraph, or the artifact's stated purpose | Per-type one-liner from the table below |
| `resource` | Engagement-relative path of the source file | n/a (always derivable) |
| `tags` | `[<stage-folder>, <artifact_type>, <engagement-slug>]` plus any artifact-specific tags (e.g. risk category, archetype) | minimum the three core tags |
| `timestamp` | `last_updated` → `red_team_pass_at` → `date` → file mtime | file mtime always exists |

`resource` is a path, not a live URL, by default (local-first). If an artifact's frontmatter already carries an external `resource`/URL, keep it; otherwise the engagement-relative path is the resource.

### Per-type description defaults (when no lead summary)

| `artifact_type` | Default description |
|---|---|
| `charter` | The engagement's constitutional document; every other artifact reconciles to it. |
| `decision` | A recorded consequential decision with options, rationale, and reversibility. |
| `weekly-status` | One ISO week's delivery status against the charter. |
| `risk-deep-dive` | Forensic analysis of a single risk. |
| `change-request` | A proposed change with full impact assessment. |
| `health-card` (any) | A RAG-rated health assessment of a delivery dimension. |
| `case-study` | The engagement story (internal + public variants). |
| `handover-pack` | What a successor needs to pick up the engagement. |

For any type not listed, synthesise a one-line description from the H1 and lead.

## 4. Bundle structure and reserved files

- **Mirror the stage tree.** `00-constitution/`, `03-planning/`, `04-execution/`, etc. become bundle subdirectories. One concept file per source artifact (lowercase, hyphenated filename derived from the source).
- **`index.md` per directory.** Generated, not copied. Lists the directory's concepts (`type`, `title`, one-line description) and links to child-directory indexes. This is OKF's progressive-disclosure mechanism — an agent reads `index.md` first, then descends.
- **Root `index.md`.** Bundle entry point: engagement one-liner, `lifecycle`, source charter revision, and links into each stage index.
- **`log.md` at root.** Chronological history merged, newest-or-oldest-first consistently, from: `decision-log.md` rows, the charter change-log table, and `STATUS-LOG.md` if present. Each line carries a date and a link to the relevant concept.
- **`manifest.md`.** Not an OKF-reserved name, but always written. Records scope, fidelity, inclusions/exclusions, the confidential-inclusion decision, source charter revision, generating model, concept count, and a list of any `red_teamed: false` concepts in the bundle.

PDF's native `README.md` (engagement index) maps to the bundle's root `index.md`. PDF's `decision-log.md` maps to `log.md`. These are renames in the projection only; the originals are untouched.

## 5. Cross-link rewriting

PDF artifacts cross-reference three ways; rewrite each as a bundle-relative markdown link:

1. **`sources:` frontmatter list** → for each source, if it's in the bundle, add a "Sources" body section with markdown links to the projected concept files; keep the original `sources:` list in the preserved PDF block too.
2. **Inline markdown links** to other artifacts (e.g. `[customers](/tables/...)` style, or `CHARTER.md#rev-7`) → repoint to the bundle-relative concept path, preserving anchors.
3. **`related_artifacts` / `FACTS.md` citations** → markdown links to the corresponding concept files.

A source that is **excluded** from the bundle (e.g. a `09-people/` artifact, or a `_transcripts/` file) must **not** become a dangling link: render it as plain text with an italic note `(not included in this bundle)`.

## 6. Confidentiality and fidelity

### Exclusions

| Path | Default | Override |
|---|---|---|
| `09-people/` | **Excluded** | Explicit per-run confirmation; recipient must be cleared |
| `audit-log/` | **Never exported** | none |
| `.sync-cache/` | **Never exported** | none |
| `_transcripts/` | Excluded (source material, not a concept) | Opt-in |

### Redacted fidelity

When fidelity is `redacted`, apply the same redaction conventions as the public variants in `pdf-create-case-study` and `pdf-run-retrospective`:

- **Named individuals** → role labels ("the Delivery Lead", "the client CFO").
- **Day rates / unit costs** → removed or banded.
- **Margin figures** → removed or qualitative ("healthy", "under pressure").
- **Client-confidential specifics** (internal system names, unannounced strategy) → generalised.

Every redaction class applied is recorded in `manifest.md`. Redaction is applied to the projected concept body, never to the source.

## 7. Conformance criteria (the `validate` intent)

A bundle is **conformant** when:

1. Every concept file has frontmatter with a non-empty `type`. *(Fatal if any is missing.)*
2. `index.md` and `log.md` are used only for their reserved purposes.
3. Every intra-bundle markdown link resolves to a file in the bundle. *(Dangling links are findings.)*
4. The OKF canonical fields are present where this mapping requires them; concepts carrying only `type` are reported as **minimal** (not a failure — OKF permits it).
5. **No excluded-confidential content is present** when the manifest declares People excluded or fidelity redacted. Scan for People-stage markers (attrition scores, 1:1 content, performance language) and named-individual patterns. *(A leak is FATAL.)*
6. `manifest.md` is present and consistent with the bundle's actual contents (declared exclusions actually absent; concept count matches).

Output: `conformant` / `non-conformant` plus a findings list (severity-tagged). The intent edits nothing.

## 8. Why one-way (v0.1)

Importing an external OKF bundle as canonical PDF artifacts is **out of scope for v0.1**. PDF artifacts carry obligations OKF doesn't model: charter reconciliation, red-team posture, audit hashes, single-writer-per-fact discipline. A naive import would produce artifacts that look valid but fail PDF's invariants. The `dump-merge` intent therefore *advises* on how an external bundle maps back, rather than writing it in. Two-way sync is a future-work candidate, tracked in `ARCHITECTURE.md` §21.
