# Changelog

All notable changes to the Project Delivery Framework.

## [Unreleased]

### Stage 0 — Scaffold (2026-05-25)

- `ARCHITECTURE.md` (master spec, 18 sections, decisions logged in §15)
- `README.md`
- `_pdf/_config/pdf-help.csv` — full skill index (52 rows; 2 built, 50 planned)
- `.claude/skills/pdf-help/` — discovery + next-action recommender
- `.claude/skills/pdf-engagement-init/` — engagement scaffolder
- `assets/engagement-template/` — canonical engagement folder with stub artifacts:
  - `00-constitution/`: `CHARTER.md`, `STAKEHOLDERS.md`, `RACI.md`, `GOVERNANCE.md`, `COMMS-PLAN.md`
  - `04-execution/`: `RAID.md`, `STATUS-LOG.md`
  - Root: `README.md`, `decision-log.md`
  - Empty stage folders (`01-shaping`, `02-mobilization`, `03-planning`, `05-governance`, `06-risk-change`, `07-quality`, `08-commercial`, `09-people`, `10-closure`, `audit-log`) — `.gitkeep` only
- `_pdf-output/engagements/` and `_pdf-output/practice/` — output roots
- `.gitignore` — engagement artifacts private by default

### Stage 1 — Marcus the Mobilizer (2026-05-25)

- `.claude/skills/pdf-agent-mobilizer/` — Marcus persona / menu router, with `dump` intent inline
- `.claude/skills/pdf-create-charter/` — full create / update / validate / dump-merge flow + `references/charter-fields-guide.md` (canonical question per section, acceptance criteria) + `references/charter-validation.md` (structural / content / cross-artifact / red-team checks)
- `.claude/skills/pdf-create-raci/` — populate + validation rules (1 A, ≥1 R, no overlap, cross-check vs STAKEHOLDERS)
- `.claude/skills/pdf-create-governance/` — cadence + decision-rights + escalation tree, with the "stated decision rights" rule enforced
- `.claude/skills/pdf-create-comms-plan/` — rituals and channels deliberately separated per Marcus's principle 4
- `.claude/skills/pdf-create-kickoff-deck/` — 14-slide canonical composition from charter + RACI + governance + comms; red-team default-on (client-facing)

CSV updated:
- `pdf-update-charter` row removed (consolidated into `pdf-create-charter`'s `update` intent — matches BMAD's create-with-intent-modes pattern in `bmad-prd`).
- 5 Marcus workflows marked `built: true`.
- All Marcus workflows now show the full intent set `create|update|validate|dump` in the `intent` column.

### Design decisions made during Stage 1

- **One skill per artifact, not per verb.** Consolidated `create` + `update` + `validate` + `dump-merge` as intent modes inside each workflow. This matches BMAD's `bmad-prd` and reduces skill count by ~30% across the whole framework.
- **Workflows populate the existing stub in place; they don't generate new files.** `pdf-engagement-init` scaffolds an empty CHARTER.md at revision 0; `pdf-create-charter` populates it to revision 1. There's only one charter template — the stub — and one source of truth.
- **Red-team posture stated per skill in SKILL.md.** Charter: off (recommended at finalisation), required on scope/budget/timeline/compliance changes. RACI: off. Governance: off (recommended once). Comms plan: off. Kickoff deck: **on** (client-facing).
- **Marcus refuses out-of-order calls.** Each workflow declares its `preceded_by` and the agent (and the workflows themselves) refuse to run if preconditions aren't met. The user can override but is warned.
- **Dump-merge is everywhere.** Every Marcus workflow accepts pre-extracted content from the agent's dump flow; it's not a separate skill but an intent mode.

### Stage 2 — Ronan the Run-Lead (2026-05-25)

- `.claude/skills/pdf-agent-run-lead/` — Ronan persona + menu + dump intent. Six principles including "Signal beats ceremony" and "Velocity is a question, not a number".
- `.claude/skills/pdf-weekly-status/` — Teams/Slack-paste-friendly weekly status. One file per ISO week. + `references/status-format-guide.md` with the canonical body template, anti-patterns, and length guidance.
- `.claude/skills/pdf-update-raid/` — sole writer of RAID data tables; append / update / close intents; history table always written; shard prompt at 20 closed items per section.
- `.claude/skills/pdf-summarize-standup/` — accepts paste OR transcript file path (txt / md / json / vtt / srt). Cross-skill side effects: offers `pdf-triage-blocker` for each blocker, `pdf-decision-log` for each decision.
- `.claude/skills/pdf-velocity-check/` — accepts CSV / hand-fed numbers / qualitative narrative / any combo. Hard rule: output precision matches input precision; never invents numbers.
- `.claude/skills/pdf-triage-blocker/` — dual output (deep-dive file + RAID Issues pointer row). 5-whys flow. Auto-populates escalation from `GOVERNANCE.md`. Offers Helena for short-deadline escalations.

CSV updated: 5 Ronan workflows marked `built: true`; intent columns now show full `create|update|validate|dump-merge` (or `append|update|close|validate|dump-merge` for RAID).

### Design decisions made during Stage 2

- **Teams/Slack-paste optimisation.** Weekly status body uses headings + bullets only, no tables. The format guide includes anti-patterns (table use, adjective inflation, generic risks) and a 150–400-word length guideline.
- **One file per ISO week** for weekly status (per architecture §8). Trade-off: more files, but every week's report is forensically diff-able.
- **Velocity workflow refuses false precision.** Qualitative input produces qualitative output. The customize.toml flag `no_quantitative_output_from_qualitative_input = true` makes this an enforceable rule, not just a guideline.
- **Blockers get dual output** (deep-dive + RAID pointer). The blocker file is the document; the RAID row is the index. This is the only workflow that writes to two artifacts; in every other case there is one writer per artifact.
- **RAID sharding policy is enforced lazily.** Closed-item threshold is 20 per section before the workflow prompts to move to `RAID-closed.md`. Not automatic — the user makes the call.
- **Cross-skill side-effect offers, not auto-dispatch.** `pdf-summarize-standup` *offers* to triage blockers and log decisions; it doesn't silently chain. Same with `pdf-velocity-check` offering Helena. This preserves user agency and audit-log clarity.

### Stage 3 — Helena the Herald (2026-05-25)

- `.claude/skills/pdf-agent-herald/` — Helena persona + menu + dump intent. Six principles inc. "Lead with the answer" and "Personalisation is fidelity, not flattery".
- `.claude/skills/pdf-prep-steering/` — MARP deck + embedded speaker notes (single file). 14-slide canonical structure with weighting on slides 1–3. Composed from last 2–4 weekly statuses + RAID + decisions + change requests + velocity.
- `.claude/skills/pdf-write-exec-summary/` — strict one-page format with hard 500-word ceiling enforced on validate. Cut-order rules in customize.toml if over-length.
- `.claude/skills/pdf-write-stakeholder-update/` — multi-archetype generator (9 archetypes: CIO/CTO/CFO/COO/Client-PM/Engineering-Lead/Legal-Compliance/Board-NED/Executive-Sponsor). One file per selected archetype. + `references/audience-profiles.md` with per-archetype "cares about / reacts badly to / lead with / red-team prompts".
- `.claude/skills/pdf-write-escalation-memo/` — SCQA structure (Situation / Complication / Question / Answer). + `references/scqa-guide.md` with worked example, anti-patterns, and tone rules. Addressed to a **single named individual**. Refuses without a real deadline and without-decision consequence.

CSV updated: 4 Helena workflows marked `built: true` with full intent set.

### Design decisions made during Stage 3

- **Simulated inline red-team until `pdf-red-team` exists.** All Helena workflows are red-team-default-on per architecture §16, but the cross-cutting `pdf-red-team` skill is scheduled for Stage 11. The interim approach: each workflow runs its own cynical-review questions inline at finalisation. When `pdf-red-team` is built, these will be hoisted out and centralised.
- **Tone check is escalation-memo-specific.** Other red-team passes care about substance; escalation memos uniquely fail on voice (blame language, hedging, venting). A second pass with `tone_check_pass` frontmatter flag covers this.
- **One archetype per stakeholder update file.** Validation rejects shared lead-with paragraphs across archetypes. This is Helena's principle 2 ("One audience per artifact") enforced structurally.
- **Word ceiling enforced on exec summary.** The only artifact with a hard count cap. Cut-order rules: bullets in "What's working" go first, then Forward look, then lowest-impact "What's not" bullet. Forces honesty about prioritisation.
- **Escalation memo refuses to finalise without four answer fields.** Recommendation, decision-needed, deadline, without-decision consequence. The fourth is the one most writers omit; PDF treats it as non-negotiable because it's what makes a memo an escalation rather than a question.
- **Recipient must be a single named individual.** Group-addressed escalations are rejected. If multiple people need the same memo, generate one per recipient — same source, recipient-specific framing per archetype.

### Stage 4 — Klaus the Risk Officer (2026-05-25)

- `.claude/skills/pdf-agent-risk-officer/` — Klaus persona + menu. Six principles inc. "Risks are owned, not observed" and "Escalation is a decision, not a reflex".
- `.claude/skills/pdf-risk-deep-dive/` — standalone forensic doc; offers (does not force) to update the RAID row's mitigation cell with a pointer to the deep-dive.
- `.claude/skills/pdf-create-change-request/` — granular elicitation (architectural/commercial/governance/external) + inferred classic view (scope/time/cost/quality/risk). + `references/change-impact-taxonomy.md` with the explicit inference rules, worked example, and anti-patterns. Red-team default-on.
- `.claude/skills/pdf-create-mitigation-plan/` — non-negotiable four-field actions (owner/action/deadline/trigger-to-revisit). Side-effect: writes to RAID setting risk status to `in-mitigation`.
- `.claude/skills/pdf-decide-escalation/` — decision-support memo with explicit balanced reasoning. Three outcomes: escalate (→ Helena), do-not-escalate (→ decision-log), wait-then-decide (→ revisit reminder). Validation rejects pre-decided dressed-as-analysis dumps.

CSV updated: 4 Klaus workflows marked `built: true`; intent columns show full set.

### Design decisions made during Stage 4

- **B-elicits-A-infers for change requests.** The granular taxonomy (architectural/commercial/governance/external) is elicited from the user; the classic taxonomy (scope/time/cost/quality/risk) is derived by deterministic rules in `customize.toml`. Both classifications appear in the output. The user can override the inference with a recorded note. This is the most opinionated workflow design choice in PDF so far — it bets that approvers want classic, but elicitation quality is better with granular.
- **Risk deep-dives are standalone.** Unlike blockers (which dual-write to RAID), risk deep-dives are forensic; the RAID row stays a single-line summary. The workflow offers to add a pointer to the RAID row but never silently appends content there. Different posture from blockers because deep-dives are slower work intended to be read in full.
- **Mitigation-plan validation is the strictest in PDF.** Every action row requires all four fields filled. No blanks, no TBC. Klaus's principle 3 is the only place a "TBC" gets the workflow to refuse to write.
- **Escalation-decision has three outcomes, not two.** "Wait then decide" is a first-class outcome with a revisit date. This reflects real practice: many escalation questions are timing questions, not yes/no questions.
- **Cynical anti-pattern guard on `pdf-decide-escalation`.** If the user dumps a one-sided rant, the workflow asks: "Is this analysis, or is the decision already made?" Reroutes to Helena if the decision is already made. This is the first workflow that explicitly polices user honesty about whether they're actually open to the answer.

### Built so far (across Stages 0–4)

20 skills total: 2 utility, 4 agents, 14 workflows. Estimated halfway through the planned build.

### Stage 5 — Petra the Planner (2026-05-25)

- `.claude/skills/pdf-agent-planner/` — Petra persona + menu. Six principles inc. "Estimates are ranges, not numbers" and "Capacity and budget reconcile".
- `.claude/skills/pdf-create-plan/` — Mermaid Gantt + phase-summary table side-by-side. Acceptance gate required per milestone (Petra's principle 2). Critical path named explicitly (principle 6). Living document with charter-style change-log.
- `.claude/skills/pdf-create-capacity-plan/` — matrix (canonical) + rows (derived from matrix). Both views rendered; reconciliation check on every write.
- `.claude/skills/pdf-create-budget-baseline/` — monthly view + milestone view, both reconciled to the same grand total. **Reconciliation failure is fatal**: the workflow refuses to write if monthly total ≠ milestone total. Day-rates resolved from engagement-level `.pdf-config.toml` or elicited on first run.
- `.claude/skills/pdf-challenge-estimate/` — dual-mode adversarial review. User picks pre-mortem or red-team at invocation; no default. + `references/estimate-challenge-modes.md` with full question banks per mode + anti-patterns. Append-only log.

CSV updated: 4 Petra workflows marked `built: true`.

### Design decisions made during Stage 5

- **Plan visualisation is mandatory dual-view.** Every plan has both a Mermaid Gantt and a phase-summary table. Validation refuses single-view plans. Reasoning: Gantt is for client review, table is for working detail; one without the other always fails somewhere.
- **Capacity plan: matrix is canonical, rows are derived.** The user edits the matrix; the workflow regenerates the rows view from the matrix on every write. Reconciliation check prevents drift between the two. (BMAD doesn't have this pattern explicitly; it's PDF-original.)
- **Budget reconciliation failure is fatal.** First workflow in PDF where a validation failure refuses to write the file at all. Most other validations report and let the user override. Petra's principle 3 ("capacity and budget reconcile") is treated as non-negotiable; explicit override requires turning on a flag in `customize.toml` with a written reason in frontmatter.
- **Day-rates live in engagement-level `.pdf-config.toml`.** Per-engagement override is the right scope: rates change per client, per region, per year. The workflow elicits on first run and writes there for reuse.
- **Estimate-challenge refuses to default mode.** User must pick pre-mortem or red-team. The modes produce different output structures and there's no useful default; forcing the choice forces the user to think about which mode fits the situation.
- **Pre-mortem 50% framing.** The question is "imagine this proved 50% wrong, what happened?" — not "imagine it proved wrong". The specific magnitude forces concrete failure modes rather than generic hedging.

### Built so far (across Stages 0–5)

24 skills total: 2 utility, 5 agents, 17 workflows. Five more agents to go (Theo, Quinn, Iris, Sofia, Felix) plus cross-cutting utilities (Stage 11).

### Stage 6 — Theo the Treasurer (2026-05-25)

- `.claude/skills/pdf-agent-treasurer/` — Theo persona. Six principles inc. "Burn vs baseline is the only honest measure" and "Cash flow is timing, not totals".
- `.claude/skills/pdf-track-budget/` — dual-cadence (weekly snapshot + monthly close). User picks cadence at invocation. Monthly close has full variance analysis with subsections for any line item ≥ ±5%.
- `.claude/skills/pdf-analyse-margin/` — dual-view (per-period + per-milestone). Per-milestone requires explicit cost-attribution method (pro-rata-capacity / phase-boundaries / direct-timesheet). Target margin sourced from engagement `.pdf-config.toml`.
- `.claude/skills/pdf-create-change-order/` — on-demand only; cross-skill *offer* from `pdf-create-change-request` when commercial dimension > minor. Red-team default-on (signature document). Signed COs trigger baseline update workflow.
- `.claude/skills/pdf-review-commercial-model/` — four-model assessment (T&M / FP / Capacity / Outcome) + Hybrid. Switch recommendations route through CR. + `references/commercial-models.md` with full fit-when / doesn't-fit-when / pitfalls per model + a 6-question choosing checklist.
- `.claude/skills/pdf-prep-invoice/` — backup pack only (audit evidence, not the invoice itself). Pre-flight checklist embedded. Refuses FP invoicing without signed acceptance evidence; refuses to invoice periods without a monthly close.

CSV updated: 5 Theo workflows marked `built: true`.

### Design decisions made during Stage 6

- **Dual-cadence + dual-view patterns are now established.** Petra introduced them (capacity matrix-and-rows, budget monthly-and-milestone); Theo doubles down (budget tracker weekly-and-monthly, margin period-and-milestone). The pattern is: one workflow handles both because the underlying data is the same and the views are reconciled.
- **Change orders are on-demand by design.** No silent auto-trigger from approved CRs. Lloyd's `C` answer preserves the cross-skill *offer* pattern: Klaus's CR workflow surfaces "Commercial dimension is material, consider creating a change order" but doesn't dispatch. Friction is intentional because COs are signature documents.
- **Invoice prep produces backup, not invoices.** Per Lloyd's `A` answer: PDF stops at the audit-defensible evidence pack. The invoice itself goes through Finance. This keeps PDF out of regulated invoicing-system territory and focuses it on the document discipline.
- **`pdf-prep-invoice` is one of two workflows in PDF that refuses to write under specific conditions** (the other is `pdf-create-budget-baseline` on reconciliation failure). Refusals: FP without signed acceptance; period without monthly close; pass-through markup hidden in headline. These are commercial-discipline hard rules.
- **Day-rates and target margin both live in engagement `.pdf-config.toml`.** Stage 5 introduced the pattern; Stage 6 expands its scope. Per-engagement config is becoming a meaningful layer; worth a future utility to lint it.
- **Commercial-model switches are not silent.** A `pdf-review-commercial-model` workflow that recommends "switch" routes through `pdf-create-change-request` for the substantive change and then `pdf-create-change-order` for the commercial wrapper. The review itself is internal analysis only.

### Built so far (across Stages 0–6)

29 skills total: 2 utility, 6 agents, 21 workflows. Four agents remaining (Quinn, Iris, Sofia, Felix) plus cross-cutting utilities (Stage 11).

### Stage 7 — Quinn the Quality Steward (2026-05-25)

- `.claude/skills/pdf-agent-quality-steward/` — Quinn persona (gender-neutral by design). Six principles inc. "Sub-dimensions matter more than aggregates" and "Health checks are diagnostic, not punitive".
- `.claude/skills/pdf-sdlc-health/` — 7 sub-dimensions (Code Quality / Unit Testing / Code Review / Knowledge Sharing / Tech Debt / Branching / Striving for Excellence). + `references/sdlc-evidence-guide.md` (~12 KB) with definition / canonical question / evidence / common gaps / RAG criteria per sub-dimension.
- `.claude/skills/pdf-qa-health/` — 5 sub-dimensions (Test Case Mgmt / Defect Mgmt / NFR Testing / QA Metrics / Automated Testing). + `references/qa-evidence-guide.md`.
- `.claude/skills/pdf-syseng-health/` — 2 substantial sub-dimensions (CI/CD with DORA metrics + Infrastructure Mgmt with IaC, observability, runbooks, DR, cost). + `references/syseng-evidence-guide.md`.
- `.claude/skills/pdf-secure-sdlc-health/` — 6 security sub-dimensions (Threat Modelling / SAST / DAST+Pen / SCA / Secrets / Training & Culture) **plus a Compliance Regime Coverage cross-check section** sourced from `CHARTER.md`. + `references/secure-sdlc-evidence-guide.md` with detail per regime (GDPR / EU AI Act / HIPAA / PCI-DSS / SOC 2 / ISO 27001 / NIST AI RMF / sector-specific).

CSV updated: 4 Quinn workflows marked `built: true`.

### Design decisions made during Stage 7

- **Dual view (summary table + narrative) is the canonical health-card shape.** Lloyd's `C` answer locks this in. The summary table is the scannable view; the narrative carries the nuance. Both required.
- **Cadence: on-demand + 4-weekly default.** `next_default` frontmatter field is set 28 days out. Quinn's menu flags overdue cards in the snapshot greeting.
- **Source flexibility: paths welcome, interview is fully usable.** Per Lloyd's `B-but-fully-A` answer. Each workflow opens with the same offer — provide artifacts or stick to Q&A — and the workflow proceeds either way without quality loss.
- **Compliance check is lax (WARNING only).** Per Lloyd's `B` answer. A declared regime with no evidence-of-being-addressed surfaces as a WARNING in the compliance section but does not auto-demote the overall RAG. Reasoning: compliance evidence often lives outside the engagement workspace (with the client's legal team, with Finance), and aggressive auto-demotion would force constant overrides.
- **Cross-skill offers, not auto-dispatches.** Every Quinn workflow *offers* `pdf-update-raid` when sub-dimensions are RED but doesn't silently chain. Consistent with the pattern established in earlier stages.
- **Overall RAG rule: worst of sub-dimensions, override allowed with justification.** Cards refusing GREEN-overall-when-any-sub-AMBER-without-justification prevents false-positive aggregations.
- **Compliance regime cross-check is one of the framework's most ambitious cross-artifact integrations.** Reads charter → matches declared regimes → looks for evidence → reports per-regime status. The lax posture keeps it usable; future tightening to strict is a one-line `customize.toml` change.

### Built so far (across Stages 0–7)

34 skills total: 2 utility, 7 agents, 25 workflows. Three agents remaining (Iris, Sofia, Felix) plus cross-cutting utilities (Stage 11). ~75% of the planned build complete.

### Stage 8 — Iris the People Lead (2026-05-25)

- `.claude/skills/pdf-agent-people-lead/` — Iris persona. Six principles inc. "People-data is privileged" and "Aggregate signals tell you what; individual signals tell you who".
- `.claude/skills/pdf-team-health-check/` — aggregate-only (5 dimensions); 14-day cadence; **refuses to name individuals**. Routes naming attempts back to individual workflows.
- `.claude/skills/pdf-attrition-risk/` — per-person 1–5 score with 8 contributing factors; single living document; action required per scored person; refuses score-5 with "do nothing"; refuses downward re-scoring without recorded factor change.
- `.claude/skills/pdf-create-ramp-plan/` — per-joiner; 4 default phases; named buddy required; metric targets required.
- `.claude/skills/pdf-prep-1on1/` — cumulative file per person, new entry prepended each time. Reads prior entries for context. Refuses empty "carrying over from last time" when prior entries exist.
- `.claude/skills/pdf-prep-performance-conversation/` — Radical Candor 2×2 quadrant assessment + SBI structure. + `references/radical-candor-guide.md` (~10 KB primer with conversation-by-conversation movement guidance per quadrant). Lightweight inline integrity check (not full red-team).

CSV updated: 5 Iris workflows marked `built: true`.

### Confidentiality posture (new in Stage 8)

- **All of `09-people/` is confidential.** Frontmatter `confidential: true` on every Iris artifact.
- **Engagement template `.gitignore` updated** to exclude `09-people/` and `audit-log/` even if the user commits the rest of the engagement folder. Belt-and-braces.
- **Cross-skill silent reads forbidden.** Other agents' background scans show file existence (so Iris can find them) but don't ingest contents. Cross-skill use requires explicit user-initiated extraction.
- **Iris refuses individual naming in aggregate workflows.** Team-health checks redirect attempts to name individuals back to the appropriate individual workflow.

### Design decisions made during Stage 8

- **Radical Candor primer is the most substantial reference in PDF.** ~10 KB covering 2×2, four quadrants, movement guidance per quadrant, conversation choreography, and anti-patterns. Doubles as a coaching aid for the user, not just a workflow input.
- **Performance conversation has the strictest validation in PDF.** Generality is refused; SBI must be specific; reactions table must cover ≥ 3 types; "What you do NOT want to do" section must be non-empty (the personal anti-patterns).
- **1:1 cumulative-per-person matches the "continuous context" principle.** Append at top, never delete. Allows future sessions to pull "what carries over from last time" trivially. Per-1:1 files were considered; the cumulative model wins for context continuity.
- **Attrition risk requires action per scored person.** No score without an action — even "do nothing" is an action that gets recorded. Refuses score 5 with "do nothing" (Iris's principle 3).

### New architecture section: §20 — Future: API sync providers (planned, Stage 12)

Added in response to Lloyd's note about wanting Jira/etc API integration eventually. §20 documents:

- The provider model (Jira, ADO, GitHub, GitLab, Confluence, Calendar, Slack/Teams, time-tracking)
- Per-engagement `.pdf-config.toml` configuration with env-var credentials
- Source-mode extension (every workflow gets `synced` as a third option alongside `paths` / `interview`)
- Sync cache location and TTL pattern
- Build-trigger criteria (two-of-three test)

**Important:** the current source-mode pattern (`paths` / `interview`) is designed to be additive. When sync is built, no existing workflow's interface breaks — the `synced` option slots in alongside. This is why the decision to add the architecture section now matters: it keeps today's interfaces forward-compatible.

### Built so far (across Stages 0–8)

39 skills total: 2 utility, 8 agents, 29 workflows. Two agents remaining (Sofia, Felix) plus cross-cutting utilities (Stage 11) plus the future API-sync (Stage 12).

### Stage 9 — Sofia the Shaper (2026-05-25)

- `.claude/skills/pdf-agent-shaper/` — Sofia persona. Six principles inc. "Qualification is not optional. No-go is a valid outcome" and "Walking away preserves credibility for the next opportunity".
- `.claude/skills/pdf-qualify-opportunity/` — **MEDDIC framework** (Lloyd's A choice). Refuses GO without named Champion. Refuses NO-GO without rationale. + `references/meddic-guide.md` (~10 KB) with canonical question, Strong/Weak/Unknown criteria, and probe questions per element.
- `.claude/skills/pdf-shape-opportunity/` — three sizing options (Small/Medium/Large), enforced as genuinely different in shape, not just scale. 3+ assumptions with consequences. Top-5 risks. Recommended option must name trade-off being accepted.
- `.claude/skills/pdf-estimate-rom/` — **explicit cone of uncertainty** (Lloyd's A choice). Five stages from feasibility (-50% to +100%) to build-complete (±5%). Refuses single-point estimates. + `references/cone-of-uncertainty.md` (~7 KB) with ASCII-art cone diagram, anti-patterns, and external-communication framing. Red-team default-on.
- `.claude/skills/pdf-draft-sow/` — **blank-page-with-optional-template** (Lloyd's C choice). Workflow asks at create: "do you have a firm template?". If yes, uses its structure; if no, generates canonical 17-section generic SoW. Mandatory reviewer notes per section. Refuses subjective acceptance criteria, single-point commercials, empty out-of-scope sections, assumptions without consequences, no change-control. **Six inline red-team checks** — the most thorough in PDF.

CSV updated: 4 Sofia workflows marked `built: true`.

### Design decisions made during Stage 9

- **MEDDIC is hard-coded.** Per Lloyd's A choice. Other frameworks (BANT, custom) deliberately not built — narrowing the choice forces the discipline.
- **Cone of uncertainty is structurally enforced.** The workflow refuses to let you narrow the cone without new information justifying the narrowing. Override is allowed (for repeat-deployment opportunities) but requires explicit reasoning in frontmatter.
- **SoW is the framework's most thoroughly red-teamed artifact.** Six inline cynical-review questions; rejection conditions for five specific failure patterns; reviewer notes required per section. The reasoning: SoW failures are the most expensive in the framework because they bind for the entire engagement and cost-of-change is highest.
- **Four chained documents (Lloyd's A choice for §4).** Each stands alone; each has its own audit trail; the chain is explicit in the CSV `preceded_by` column. Means more files but every step is independently versionable, validatable, and revisable.
- **Sofia precedes Marcus.** First agent in PDF that explicitly works without a populated charter. The SoW (signed) is the input to Marcus's charter (active); Sofia's outputs are pre-contract.

### Built so far (across Stages 0–9)

43 skills total: 2 utility, 9 agents, 32 workflows. **One agent remaining (Felix — closure), then Stage 11 cross-cutting utilities.** ~83% of the planned build complete.

### Stage 10 — Felix the Finisher (2026-05-25)

- `.claude/skills/pdf-agent-finisher/` — Felix persona. Six principles inc. "Closure compounds" and "Lessons that don't propagate are the ones you'll repeat".
- `.claude/skills/pdf-closure-checklist/` — strict 10-item operational core + 7-item opt-in relational extensions (Lloyd's A-strictly-with-C-optional choice). Refuses closed-state with unticked operational items. Refuses ticked items without evidence/date/name.
- `.claude/skills/pdf-run-retrospective/` — single file, two sections (Lloyd's A choice): internal (full honesty) above the line + client-shareable (redacted) below. + `references/retrospective-formats.md` (~6 KB) with four formats (Liked/Learned/Lacked/Longed-for, What Went Well/Didn't/Change, Sailboat, 5-Whys), when each fits, anti-patterns.
- `.claude/skills/pdf-capture-lessons/` — **dual-write** (Lloyd's B choice): engagement-scoped file + per-lesson files in `_pdf-output/practice/lessons-learned/`. **Only workflow in PDF that writes outside the engagement folder.** Refuses generic lessons; refuses no recall trigger.
- `.claude/skills/pdf-create-case-study/` — both variants in one file (Lloyd's B choice): internal (canonical, named, detailed) + public (redacted, polished, commercial asset). Public variant red-team default-on with 5 cynical-review questions. Refuses identical variants.
- `.claude/skills/pdf-create-handover-pack/` — 12-section structure including unusual sections like "What I'd watch for" (quiet risks) and "Things I'd rather you didn't change (yet)" (implicit-practice preservation). Refuses operational-only for DM-replacement context. Most-personal artifact in PDF.

CSV updated: 5 Felix workflows marked `built: true`.

### Design decisions made during Stage 10

- **Felix is the only agent that writes outside the engagement folder.** `pdf-capture-lessons` writes one engagement-scoped file plus N per-lesson files in `_pdf-output/practice/lessons-learned/`. This breaks the per-engagement isolation deliberately — operationalising principle 3 (lessons that don't propagate are repeated).
- **Single-file two-variant pattern formalised.** Retrospective and case study both use this. Internal version above the line, redacted/public version below, both in the same `.md` file. Reasoning: the two variants must be edited together — one canonical source, derived redacted version, never out of sync.
- **The handover pack has the most distinctive section names in PDF.** "What I'd watch for", "What I'd do first if I were you", "Things I'd rather you didn't change (yet)". These are deliberate — the handover document's job is to transfer tacit knowledge, and tacit-knowledge sections need to name what they're about, not be polite abstractions.
- **Practice library is engagement-agnostic but accessible.** Future engagements can search `_pdf-output/practice/lessons-learned/` by tag (topic). v2 candidate: `pdf-search-practice-library` cross-cutting utility that surfaces relevant lessons during `pdf-engagement-init` based on charter content.
- **Case study client-consent gating is structural.** The workflow refuses to mark `public_variant_published` without `client_consent_status: agreed` and `red_teamed_public_variant: true`. Two locks against accidental external publication.

### Built so far (across Stages 0–10)

48 skills total: 2 utility, 10 agents, 37 workflows. **All ten stage agents now built.** Five cross-cutting utilities remain (Stage 11).

### Stage 11 — Cross-cutting utilities (2026-05-25)

- `.claude/skills/pdf-red-team/` — three modes (cynical / edge-case / acceptance). + `references/red-team-checks.md` (~14 KB) consolidating per-artifact-type check sets from the previously-inline simulations across 9 workflows. Refuses pass-with-high-severity-findings; never silent on frontmatter updates.
- `.claude/skills/pdf-translate/` — 12 archetypes (9 audience-up from Helena's pool + 3 peer-role: Commercial-Lead / Product-Lead / Engineer). + `references/translate-archetypes.md` with per-archetype framing rules + cross-cutting translation rules + adding-custom-archetypes pattern. **Substance-integrity enforcement** refuses to soften hard claims or lose claims.
- `.claude/skills/pdf-decision-log/` — per-stage decision sub-files (`<stage>/decisions/DEC-NNN-<slug>.md`) + engagement-level index at `decision-log.md`. Default immutable; reversals are new decisions. Refuses single-option "decisions"; refuses group decision-makers.
- `.claude/skills/pdf-audit-log/` — dual-mode (Lloyd's B choice). Background mode writes per-run JSONL with prompt hash + output hash (never content). Query mode is user-invocable with time / skill / artifact / outcome filters. Confidentiality-respecting; refuses cross-engagement queries (v2 candidate: `pdf-portfolio`).
- `.claude/skills/pdf-elicit/` — standalone skill (Lloyd's A choice). Reads any artifact's gaps; walks them interactively; **dispatches writes to the artifact's own workflow update intent** — never writes directly. Preserves all workflow disciplines (charter revision bumps, RAID history appends, confidentiality flags, red-team gates).

### Migration: red-team consolidation

9 existing workflows had `inline_simulation_until_skill_exists = true` in their `customize.toml`. All 9 have been migrated to:

```toml
inline_simulation_until_skill_exists = false
dispatch_to = "pdf-red-team"
```

The workflows affected:
- pdf-prep-steering, pdf-write-exec-summary, pdf-write-stakeholder-update, pdf-write-escalation-memo (Helena)
- pdf-create-change-request (Klaus)
- pdf-create-change-order (Theo)
- pdf-estimate-rom, pdf-draft-sow (Sofia)
- pdf-create-case-study (Felix)

Their inline cynical-review prompt lists are now consolidated in `pdf-red-team/references/red-team-checks.md` and are no longer duplicated per workflow.

CSV updated: 5 utility skills marked `built: true`. The 9 migrated workflows retain `built: true` (no change in their build status; only their red-team integration model changed).

### Final build count: 52 / 52 (100%)

```
 2 utility-foundational (Stage 0: pdf-help, pdf-engagement-init)
10 stage agents (Stages 1–10: Marcus, Ronan, Helena, Klaus, Petra, Theo, Quinn, Iris, Sofia, Felix)
 5 cross-cutting utilities (Stage 11: pdf-red-team, pdf-translate, pdf-decision-log, pdf-audit-log, pdf-elicit)
37 workflow skills across the 10 agents
─────
54 skills total*
```

(*52 in the `pdf-help.csv` workflow index — agent skills are not in the CSV per BMAD convention since they're routers, not artifact-producers. Plus pdf-help and pdf-engagement-init utility entries = 52 rows.)

### Design decisions made during Stage 11

- **Red-team centralisation eliminates ~12 KB of duplicated cynical-review prompt text** across 9 workflows. The consolidated `red-team-checks.md` is now the single source of truth for "what to ask of artifact type X".
- **Translation refuses to soften.** This is the framework's principled stand against the most common AI-comms failure mode — making bad news ambiguous. The substance-integrity check is enforced on every translation.
- **Per-stage decision files (`<stage>/decisions/DEC-NNN.md`) + engagement-level index** model is new. Replaces the earlier single-file `decision-log.md` approach. The index file becomes a navigable table; detail lives stage-adjacent so it's findable when working in a stage. **Note:** the engagement template still scaffolds `decision-log.md` at engagement root, which is now the index file rather than the everything-file.
- **Audit-log surface is dual-mode.** Background writes (invisible) + query mode (user-invocable). Query mode does not write persistent files by default; query-to-file is an explicit second intent. Hash-not-content storage of prompts keeps audit-defensibility without compromising confidentiality.
- **Elicit dispatches; never writes.** Preserves the discipline of the artifact's own workflow. The user gets gap-filling convenience; the framework keeps its integrity. This is a stronger architectural commitment than v0.1 architecture §18 originally articulated.

### Framework is feature-complete for v0.1

All 11 planned build stages delivered. Stage 12 (API sync providers, ARCHITECTURE.md §20) remains as future work; promotion criteria documented in §20.

### What's next (out of scope for v0.1)

- **Stage 12: API sync providers.** Built when two-of-three trigger criteria met (see ARCHITECTURE.md §20).
- **`pdf-portfolio`** — cross-engagement aggregation. v2 candidate.
- **`pdf-validate-config`** — engagement-level `.pdf-config.toml` linter. Useful once you've authored a few.
- **`pdf-search-practice-library`** — surface relevant prior-engagement lessons during `pdf-engagement-init` based on charter content. v2 candidate.
- **`pdf-shard`** — wrap the BMAD markdown-tree-parser pattern for the sharding policy (ARCHITECTURE.md §19). v2 candidate.
- **Dry-run testing on a real (or fake) engagement.** Strongly recommended before relying on PDF for client work. Run `pdf-engagement-init` then walk through Marcus → Ronan → Helena to validate the elicitation feels right.

### Closing notes

This build process took 11 stages with consultation gates at each. Total: 159 files, 52 workflows + 10 agents + 2 utility entrypoints. Built across one continuous session with progressive consultation; major architectural decisions captured in ARCHITECTURE.md §15 decisions log.

The framework is opinionated by design. Refusals are documented per-workflow. Override paths exist in `customize.toml` for most strict behaviours. Persona names, principles, and validation thresholds are tunable.

This is v0.1. The next move is using it.

## Notes on evolution (Stage 0)

Things to revisit when more agents are built:

- **CSV size is fine.** BMAD runs `files-manifest.csv` at 232 rows comfortably; PDF's `pdf-help.csv` at 52 rows has lots of headroom. CSV is not the right format to shard — it's tabular, read whole. (Earlier note in this changelog about a "readable limit" was wrong. See ARCHITECTURE.md §19 for what does and doesn't shard.)
- **No `pdf-agent-*` skills exist yet.** The CSV references some (`pdf-agent-mobilizer` as the migrate-mode handoff) but they're stubbed out. Stage 1 closes this gap for Marcus.
- **No `customize.toml` schema validation.** A future utility (`pdf-validate-skills`) could lint every skill's `customize.toml` against an expected schema.
- **Template substitution is described, not implemented.** `pdf-engagement-init`'s SKILL.md tells Claude how to substitute `{{PLACEHOLDERS}}`. There is no script. This is intentional for v0.1 (the LLM does the substitution at run time) but a `scripts/init-engagement.sh` would be more robust for non-LLM use.
- **High-stakes glob list lives in `pdf-help`'s `customize.toml`.** May want to centralise this in `_pdf/_config/` so multiple skills can read the same list.
