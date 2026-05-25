---
name: pdf-audit-log
description: Background-and-queryable audit log. Writes per-run JSONL records of every PDF workflow invocation (prompt + model + output hash + outcome). User-invocable for querying — "show me audit-log entries this week" / "for this artifact" / "for this skill". Use to answer the question "what did this AI do, when, on what".
---

# Audit log workflow

Two modes (per design choice):

1. **Background mode** (invisible to the user) — every PDF workflow's invocation writes a JSONL record to `_pdf-output/engagements/{active}/audit-log/<YYYY-MM-DD>T<HH-MM-SS>Z.jsonl` with prompt, model, output hash, and outcome.
2. **Query mode** (user-invocable) — the user invokes the skill to ask "show me audit-log entries this week / for this artifact / for this skill" and receives a summary report.

The background mode is the audit-trail-by-default per architecture §15 decision 5. The query mode makes the trail accessible without the user needing to grep JSONL.

## Background mode

Background mode is **not directly invoked.** Other workflows call into it as part of their on-completion handler.

### What gets written per run

```json
{
  "ts": "2026-05-25T14:22:03Z",
  "skill": "pdf-create-charter",
  "intent": "create",
  "engagement": "acme-axiom-2026",
  "user": "systima",
  "prompt_hash": "sha256:9c3a...",
  "model": "claude-opus-4-7",
  "model_version": "20260515",
  "input_paths_or_inline": ["interview"],
  "outputs": [
    {"path": "00-constitution/CHARTER.md", "hash": "sha256:1f4a..."}
  ],
  "duration_ms": 12450,
  "outcome": "success",
  "notes": ""
}
```

One JSONL line per run. New file per run (timestamped) so the audit-log directory is naturally shardable by date.

### Sensitive-content handling

- The full prompt is **not** stored — only its hash. This balances audit-defensibility (can prove what was asked) with confidentiality (the prompt may contain sensitive content).
- The full output content is not stored in the audit log either — only its path and content hash. The actual content lives in the artifact itself.
- Iris's confidential workflows (`09-people/`) write audit-log entries the same way as any other workflow, but the engagement-level `.gitignore` excludes `audit-log/` from any commit by default.

## Query mode (user-invocable)

### Intent: query (default)

Walk the user through query selection:

1. **Time range.**
   - *"Time range? (today / this week / this month / since last steering / between dates / all-time)"*
2. **Filter by skill** (optional).
   - *"Filter by skill name? (Comma-separated list, or 'all'.)"*
3. **Filter by artifact path** (optional).
   - *"Filter by artifact path? (Glob, or 'all'.)"*
4. **Filter by outcome** (optional).
   - *"Filter by outcome? (success / fail / aborted / all.)"*

Execute the query against the JSONL files in the engagement's audit-log directory. Produce a summary:

```markdown
# Audit-log query — <engagement slug>

## Filters

- Time range: <range>
- Skills: <list or "all">
- Artifacts: <glob or "all">
- Outcomes: <list or "all">

## Summary

- Total runs: <N>
- Successful: <N>
- Failed: <N>
- By skill:
  - pdf-weekly-status: <N>
  - pdf-update-raid: <N>
  - (...)

## Notable

- Most-used skill in period: <skill> (<N> runs)
- Most-touched artifact: <path> (<N> writes)
- Any failures: <list with timestamps>

## Detail (last 10)

| Timestamp | Skill | Intent | Outcome | Artifact |
|---|---|---|---|---|
| 2026-05-25T14:22:03Z | pdf-weekly-status | create | success | weekly-status/2026-W22.md |
| ... | | | | |

(Full results available in the JSONL files; this is a summary view.)
```

The query mode does **not write a persistent file** unless the user explicitly asks for one. By default, query results are displayed inline.

### Intent: query-to-file

Same as `query`, but the summary is also written to `_pdf-output/engagements/{active}/audit-log/queries/<YYYY-MM-DD>-<slug>.md`. Useful for ad-hoc audit-defensibility (e.g. "show what AI did in the week before the steering").

## Intent: validate (background mode)

Periodically, the user may want to confirm audit-log integrity:

- [ ] All JSONL files parse as valid JSONL
- [ ] No missing entries for known workflow runs (cross-check against artifacts' frontmatter `generated_at`)
- [ ] No entries with `outcome: "unknown"` (which would indicate aborted writes)
- [ ] Confidential workflows are present in the log but their `prompt_hash` / `outputs` don't leak content

## Anti-patterns to refuse (query mode)

- **Queries that would surface confidential workflow content.** The audit log records that confidential workflows ran; it doesn't expose their contents. Query results can show "5 attrition-watch updates this month" without listing the attrition content.
- **Queries that span engagements.** The audit log is per-engagement. Cross-engagement queries are an explicit v2 candidate (`pdf-portfolio` skill).

## Red-team posture

Off. The audit log is the audit; red-teaming the auditor would be recursive.

## Reference

- `ARCHITECTURE.md` §5 (audit-by-default principle), §15 decision 5 (audit log on for everything by default)
- All workflows write to the audit log on completion; this skill is the read-side
