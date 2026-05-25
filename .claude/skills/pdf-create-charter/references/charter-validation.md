# Charter validation checklist

Run on every `validate` intent. Also run as the final step of `create` and `update` intents. Report pass/fail per check; do not modify the file.

## Structural

- [ ] **Frontmatter complete.** `artifact_type`, `engagement`, `status`, `current_revision`, `last_updated`, `last_updated_by` all present.
- [ ] **Status valid.** `status` is one of `draft | active | superseded | closed`.
- [ ] **Revision monotonic.** `current_revision` >= count of rows in change-log table.
- [ ] **Change-log table present** at the bottom of the document.
- [ ] **Change-log column order** matches the canonical order: Rev | Date | Author | Section | Change | Trigger | Approved by.
- [ ] **Change-log is append-only.** Latest revision is the top row, revision 0 (or 1) is the bottom row, no revisions skipped.
- [ ] **All 8 H2 sections present:** Scope, Stakeholders, Success Criteria, Governance Cadence, Escalation Paths, Exit Criteria, Constraints and Assumptions, Compliance Regimes.

## Content

- [ ] **Scope has an explicit out-of-scope item.** Not just an in-scope description.
- [ ] **Success Criteria are measurable.** Each criterion has a metric, a target, and a time horizon.
- [ ] **Stakeholders names an executive sponsor.**
- [ ] **Governance Cadence states a steering frequency.**
- [ ] **Escalation Paths has at least two levels.**
- [ ] **Exit Criteria states acceptance approver(s).**
- [ ] **Compliance Regimes is unambiguous.** No "TBC", "TBD", or "to-be-confirmed" entries.

## Cross-artifact

- [ ] **Stakeholders summary matches `STAKEHOLDERS.md`.** No name in the charter that isn't in the detailed file; no name in the detailed file with a different role.
- [ ] **Governance summary matches `GOVERNANCE.md`** if that file exists at `current_revision >= 1`.
- [ ] **Compliance regimes referenced are picked up by relevant Quinn workflows.** A regime declared in the charter must appear in any subsequent `pdf-secure-sdlc-health` output.

## Red-team

- [ ] **`red_teamed` flag in frontmatter is set** (true or false; never absent).
- [ ] **If any change in the last 3 revisions touched scope / budget / timeline / compliance**, `red_teamed: true` for the most recent change.

## Output

Report in this shape:

```
Charter validation: <slug>

PASS (n/m):
  ✓ <check>
  ...

FAIL (n):
  ✗ <check>
    Why: <one line>
    Fix: <one-line suggestion>

WARN (n):
  ! <check>
    Why: <one line>
```

No file is written. Validation results may be appended to `audit-log/` per the standard audit rules.
