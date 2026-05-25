---
name: pdf-engagement-init
description: Scaffold a new engagement workspace under _pdf-output/engagements/. Use when starting a brand-new client engagement, or migrating an existing engagement into PDF.
---

# PDF Engagement Init

You scaffold the canonical engagement folder structure, seed initial artifacts from templates, and set the new engagement as active.

## On Activation

1. **Collect inputs.** Ask the user (one block, not one-by-one):
   - **Client slug** (short, lowercase, hyphenable; e.g. `acme`)
   - **Project code** (short; e.g. `axiom` or `axiom-2026`)
   - **One-line description** (optional)
   - **Mode:** `fresh` (greenfield) or `migrate` (existing engagement being moved into PDF)

2. **Compute slug.** `<client>-<project_code>`, lowercased, validated against `slug_pattern` in `customize.toml`. Reject invalid slugs and ask again.

3. **Pre-flight check.**
   - If `_pdf-output/engagements/<slug>/` already exists, abort with a clear error. Do not overwrite.
   - If `ACTIVE_ENGAGEMENT` exists and points to a different slug, warn the user — the new engagement will become active and the old one will be backgrounded.

4. **Scaffold.** Copy the contents of `.claude/skills/pdf-engagement-init/assets/engagement-template/` into `_pdf-output/engagements/<slug>/`. In every copied file, substitute placeholders:
   - `{{ENGAGEMENT_SLUG}}` → the slug
   - `{{ENGAGEMENT_NAME}}` → "<Client title-cased> / <Project Code>"
   - `{{ENGAGEMENT_DESCRIPTION}}` → the one-line description (or "_(none provided)_")
   - `{{CREATED_AT}}` → ISO-8601 UTC timestamp
   - `{{CREATED_BY}}` → `created_by_default` from `customize.toml`

5. **Set active.** Write the slug into `ACTIVE_ENGAGEMENT` at repo root.

6. **Write the first audit-log entry.** Append a JSONL record to `_pdf-output/engagements/<slug>/audit-log/<ISO>.jsonl`:
   ```json
   {"ts":"<iso>","skill":"pdf-engagement-init","intent":"create|migrate","slug":"<slug>","mode":"fresh|migrate","by":"<created_by>"}
   ```

7. **Report and hand off.** Output:
   ```
   Engagement scaffolded: <slug>
   Location: _pdf-output/engagements/<slug>/
   Set as active.

   NEXT: pdf-create-charter (Marcus the Mobilizer)
   ```
   If mode was `migrate`, the recommended next action is `pdf-agent-mobilizer` in `dump` intent rather than `create`.

## Intent Modes

- **`create`** (default) — fresh engagement.
- **`migrate`** — same scaffold, different recommended next action. The folder is still empty after this skill runs; the dump-mode handoff is what populates it from your pasted material.

## Refusing to overwrite

This skill never overwrites. If a slug clash happens:
1. Suggest a disambiguator (e.g. append a year or a `-v2`).
2. Confirm the new slug with the user.
3. Re-run pre-flight.

## Tone

Direct. Confirm the slug aloud before writing. No filler. British English.

## Reference

See `ARCHITECTURE.md` §8 (artifact taxonomy) and §18 (ingest mode) for the structure being scaffolded and the migrate-mode handoff.
