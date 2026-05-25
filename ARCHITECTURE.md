# Project Delivery Framework (PDF) — Architecture

> Spec-driven, AI-assisted operating system for the "CEO of the engagement".
> Status: **DRAFT v0.1** — awaiting per-agent consultation before scaffolding skill files.
> Audience: Lloyd (author) and any future contributor/colleague under NDA.

---

## 1. Why this exists

The engineering layer has BMAD, Spec Kit, GSD. The delivery-management layer has nothing equivalent: only repurposed PM tooling (mostly product-management, not delivery-management), team platforms that violate the private-workspace constraint, or a hosted PMI product with documented hallucination problems (Graffius, June 2025, 1/10 overall).

The richest open building blocks today are:

- **Anthropic Knowledge Work Plugins** (`operations`, `productivity`, `product-management`, `engineering`) — cover ~80% of the delivery-manager artifact set but are not stage-orchestrated.
- **ArcKit** (`tractorjuice/arc-kit`) — the most spec-driven option; UK Gov framing transfers cleanly once re-skinned.
- **BMAD-Method** — the cleanest pattern for *persona-mediated, stage-orchestrated, spec-driven* workflows; engineering-only but the architecture is reusable.

**PDF takes BMAD's architecture and points it at the delivery-management layer.** Same skill anatomy, same artifact discipline, same persona-router/workflow split — different stages, different artifacts, different audiences.

---

## 2. Core principles

1. **Charter as constitution.** The engagement `CHARTER.md` is the versioned source of truth. Every downstream artifact (status, steering deck, risk update, change order, exec memo) reconciles to it. This is Spec Kit's `constitution.md` applied to engagements.
2. **Spec-driven, not template-driven.** Templates produce documents; specs produce *traceable* documents. Each artifact carries a YAML frontmatter block linking it to the charter version, the source data, the model used, and the prompt hash.
3. **Stage-orchestrated, persona-mediated.** Each stage of an engagement has an agent persona (Mobilizer, Run-Lead, Herald, etc.) that presents a menu of workflows scoped to that stage. Workflows do the work; agents route and remember.
4. **Local-first, cloud-optional.** Everything is markdown + JSON + TOML; runs in Claude Code on your laptop. Confidential client material can be routed to local Ollama / LM Studio; synthesis can go to a frontier model. Same skill library either way.
5. **Audit-by-default.** Every workflow run writes to `_pdf-output/<engagement>/audit-log/` with prompt + model + output hash. This is your AI-governance evidence trail. Aligns with your existing AI Act / governance expertise; defensible to a regulator or a CISO.
6. **Adversarial before stakeholder.** Every outward-facing artifact (status, steering, exec memo, estimate) passes through `pdf-red-team` before delivery. Cynical review is not optional; it's a gate.
7. **House-style separable.** Persona prompts and template structure are firm-neutral. Branding, voice, and firm-specific governance language live in a single `customize.toml` per skill — so the same framework can travel with you between firms.

---

## 3. Influences and mapping

| Influence | What PDF borrows | What PDF doesn't borrow |
|---|---|---|
| **BMAD-Method** | Skill anatomy (SKILL.md + customize.toml + sub-files), agent vs workflow split, persona-router pattern, central CSV index for help, `_<framework>-output/` artifact convention | Engineering-only stages (analyst → PM → architect → dev → QA) |
| **ArcKit** | Audit-ready artifact structure, Orange Book risk taxonomy, MADR ADRs, Mermaid Gantt outputs, Jira/ADO CSV export, RACI traceability | UK Gov-specific framing (GDS, Green Book 5-case) — kept as optional templates only |
| **Anthropic `operations` plugin** | Status reports with KPIs/risks/next steps, change management with rollback, capacity/utilization analysis, vendor management | The bundled-flat-skill structure; PDF wraps each in a stage agent |
| **Anthropic `productivity` plugin** | Two-tier memory (`CLAUDE.md` hot cache + `memory/` deep storage), workplace-shorthand learning | The calendar/email auto-ingestion (out of scope for v0.1) |
| **Anthropic `engineering` plugin** | `/incident` triage flow, postmortem template, ADR generator | The dev-loop bits |
| **Spec Kit / GSD** | `constitution.md` pattern → `CHARTER.md` as the living spec with explicit change-log | Code-generation grounding rules |
| **PMI Infinity / PMBOK** | Naming conventions for Charters, RACI, Stakeholder Management Plan, Risk Management Plan; PMI's Role+Goal+Context+Constraints+Format prompt skeleton | The hosted-service model; the Infinity AI itself (accuracy concerns) |
| **Industry technical-delivery hygiene taxonomies** | Quality steward agent covers Code Quality / Unit Testing / Code Review / Tech Debt / Branching / Test Mgmt / Defects / NFRs / QA Metrics / Automated Testing / CI/CD / Infra / Secure SDLC | Any single firm's internal branding — PDF stays vendor-neutral |

---

## 4. Naming and prefix

- **Framework name:** Project Delivery Framework (PDF).
- **Skill prefix:** `pdf-`. The collision with the PDF file format is acknowledged. Mitigations: the namespace is consistent (all skills start `pdf-agent-` or `pdf-<verb>-`), the "Use when…" trigger in each SKILL.md description is explicit about delivery-management context, and Claude routes on description not just name. Alternative `pdm-` (Project Delivery Method, BMAD-style) is available; switch is a sed away.
- **Agent skills:** `pdf-agent-<role>` (e.g. `pdf-agent-mobilizer`).
- **Workflow skills:** `pdf-<verb>-<noun>` (e.g. `pdf-create-charter`, `pdf-update-raid`, `pdf-prep-steering`).
- **Utility skills:** `pdf-<noun>` (e.g. `pdf-help`, `pdf-red-team`, `pdf-translate`).

---

## 5. The ten stages

Each stage has one agent persona. The persona is a memorable handle, not a literal AI worker; the actual work is done by workflow skills the agent dispatches to.

| # | Stage | Agent persona | When you use it |
|---|---|---|---|
| 1 | **Shaping** (pre-sales / discovery) | **Sofia** the Shaper | An opportunity is in flight. You need to qualify, shape, ballpark-estimate, draft a SoW. |
| 2 | **Mobilization** (kickoff) | **Marcus** the Mobilizer | You've won the work. Charter, RACI, governance, comms plan, kickoff. |
| 3 | **Planning** | **Petra** the Planner | Translate charter into a plan: milestones, dependencies, capacity, budget baseline, estimate-challenge. |
| 4 | **Execution** (daily/weekly run) | **Ronan** the Run-Lead | Weekly status, RAID updates, standup digests, velocity, blocker triage. The high-frequency loop. |
| 5 | **Governance** (stakeholder reporting) | **Helena** the Herald | Steering prep, exec summaries, stakeholder updates, escalation memos, board decks. |
| 6 | **Risk & Change** | **Klaus** the Risk Officer | Risk deep-dives, change requests, mitigation plans, escalation decisions. |
| 7 | **Quality** (technical governance / SDLC) | **Quinn** the Quality Steward | SDLC health checks across Dev, QA, Systems Engineering, Secure SDLC. |
| 8 | **Commercial** | **Theo** the Treasurer | Budget tracking, margin analysis, change orders, T&M vs FP reviews, invoice prep. |
| 9 | **People** | **Iris** the People Lead | Team health, attrition risk, ramp plans, 1:1 prep, performance conversations. |
| 10 | **Closure** | **Felix** the Finisher | Closure checklist, retrospective, lessons learned, case study, handover pack. |

### Persona naming notes

- Gender-balanced, internationally varied; none are caricatures.
- **Quinn** is gender-neutral by design (the quality steward sits across multiple technical disciplines and shouldn't read as either an SRE bro or a QA analyst stereotype).
- If any of these grate, they're swappable in `customize.toml` without touching workflow files.

---

## 6. Agent roster (detail)

### 1. Sofia — Shaper *(stage: Shaping / pre-sales)*

- **Scope:** before the contract is signed. Qualifying opportunities, shaping scope, producing the rough-order-of-magnitude estimate and the SoW skeleton.
- **Primary workflows:**
  - `pdf-qualify-opportunity` — MEDDIC-lite + your own qualification questions; outputs a go/no-go memo.
  - `pdf-shape-opportunity` — turns a vague client ask into a scoped engagement hypothesis with assumptions, risks, and three sizing options (small/medium/large).
  - `pdf-estimate-rom` — Rough-Order-of-Magnitude estimate with explicit cone of uncertainty and named assumptions; *not* a commitment estimate.
  - `pdf-draft-sow` — Statement of Work draft with deliverables, acceptance criteria, governance, change-control mechanism. Re-skinnable to your firm's house style.
- **Adversarial gate:** `pdf-red-team` against estimate and assumptions before any number leaves your machine.
- **Reference inputs:** client emails, RFP/RFI documents, transcripts, prior similar engagements.

### 2. Marcus — Mobilizer *(stage: Mobilization / kickoff)*

- **Scope:** between signature and first sprint. The most artifact-heavy stage; sets up the constitution.
- **Primary workflows:**
  - `pdf-create-charter` — **the constitutional document**. Scope, stakeholders, success criteria, governance cadence, escalation paths, exit criteria. Every later artifact references its version.
  - `pdf-create-raci` — RACI matrix; cross-checks against charter stakeholders.
  - `pdf-create-governance-plan` — steering cadence, RAID review cadence, change-control board, escalation tree, decision-rights matrix.
  - `pdf-create-comms-plan` — who hears what, how often, in what channel; rituals (standup, weekly, fortnightly steering, monthly exec, quarterly review).
  - `pdf-create-kickoff-deck` — first all-hands; pulls from charter + RACI + governance + comms plan.
- **Adversarial gate:** the charter passes `pdf-red-team` before kickoff. Common failure modes: vague success criteria, missing exit criteria, no named escalation path.

### 3. Petra — Planner *(stage: Planning)*

- **Scope:** translate the charter into an executable plan with named owners, dates, dependencies, and a budget baseline.
- **Primary workflows:**
  - `pdf-create-plan` — milestone-based plan with Mermaid Gantt; phases, gates, dependencies.
  - `pdf-create-capacity-plan` — team shape over time; FTE-months by role; ramp-up/down curves.
  - `pdf-create-budget-baseline` — first cut of budget tied to capacity plan and milestone payments.
  - `pdf-challenge-estimate` — adversarial review of any estimate (yours or a team's) before it's committed. Red-team baked in.
- **Reference inputs:** charter, RACI, capacity from the resource pool, similar engagement actuals.

### 4. Ronan — Run-Lead *(stage: Execution)*

- **Scope:** the daily/weekly loop. Highest-frequency agent. The one you'll touch most.
- **Primary workflows:**
  - `pdf-weekly-status` — generates this week's status from `STATUS-LOG.md` + `RAID.md` + `CHARTER.md` in one session. Anthropic `operations`-style: KPIs, risks, next steps.
  - `pdf-update-raid` — append Risks, Assumptions, Issues, Dependencies; reconcile to charter; flag anything overdue.
  - `pdf-summarize-standup` — turn a standup transcript or notes into action items with owners and dates.
  - `pdf-velocity-check` — pull from Jira/ADO export and produce a delivery-trend read; flag burn-rate divergence from budget baseline.
  - `pdf-triage-blocker` — structured 5-whys on a blocker; output: owner, decision needed, escalation path, deadline.

### 5. Helena — Herald *(stage: Governance)*

- **Scope:** the outward-facing communications layer. Translating internal reality into exec-shaped messages.
- **Primary workflows:**
  - `pdf-prep-steering` — pulls last 2 weeks of status + RAID + decisions + finance into a steering pack; produces both the deck and your speaker notes.
  - `pdf-write-exec-summary` — 1-page CIO/CFO/CTO-shaped summary; uses `pdf-translate` under the hood.
  - `pdf-write-stakeholder-update` — per-stakeholder personalised update (the COO cares about ops impact; the CFO cares about burn; the CTO cares about architecture risk).
  - `pdf-write-escalation-memo` — structured escalation: situation, impact, options, ask. Crisis-tone-aware.
- **Adversarial gate:** every outward artifact passes `pdf-red-team` before send.

### 6. Klaus — Risk Officer *(stage: Risk & Change)*

- **Scope:** the deep work on risk and change that doesn't fit into Ronan's high-frequency loop.
- **Primary workflows:**
  - `pdf-risk-deep-dive` — pick a top-5 risk; build inherent/residual score, mitigation plan, owner, deadline, triggers.
  - `pdf-create-change-request` — structured change request: trigger, impact (scope/time/cost/quality/risk), options, recommendation, approver routing.
  - `pdf-create-mitigation-plan` — for an active risk that's materialising.
  - `pdf-decide-escalation` — decision-support workflow: should this escalate, to whom, with what framing.
- **Reference taxonomy:** Orange Book 4Ts (Treat / Tolerate / Transfer / Terminate); inherent/residual scoring. Re-skinnable.

### 7. Quinn — Quality Steward *(stage: Quality / SDLC governance)*

- **Scope:** the technical-delivery hygiene layer. Maps 1:1 to standard industry SDLC / QA / SysEng / Secure-SDLC taxonomies.
- **Primary workflows:**
  - `pdf-sdlc-health` — covers Code Quality, Unit Testing, Code Review, Knowledge Sharing, Technical Debt, Branching Strategy, Striving for Excellence. Output: RAG-rated health card per dimension with named gaps and remediations.
  - `pdf-qa-health` — Test Case Management, Defect Management, NFR Testing, QA Metrics, Automated Testing. RAG-rated.
  - `pdf-syseng-health` — CI/CD, Infrastructure Management. RAG-rated.
  - `pdf-secure-sdlc-health` — Secure SDLC. RAG-rated; cross-checks against OWASP and any client-specific compliance regime declared in the charter (GDPR, HIPAA, PCI, EU AI Act if AI-touching).
- **Reference inputs:** charter (compliance regimes), team interviews, repo access (where authorised), CI dashboards.
- **Note:** Quinn is the delivery-manager's *governance* of these areas, not the doer. The doer is the team's tech lead / QA lead / DevOps lead.

### 8. Theo — Treasurer *(stage: Commercial)*

- **Scope:** the money. Explicitly a delivery-manager responsibility; often the dimension where engagements are judged ex post.
- **Primary workflows:**
  - `pdf-track-budget` — burn vs. baseline; reconciles invoiced vs. accrued vs. committed.
  - `pdf-analyse-margin` — gross margin per engagement; flags drift from target.
  - `pdf-create-change-order` — commercial wrapper for a change request (Klaus produces the change request; Theo prices it).
  - `pdf-review-commercial-model` — T&M vs Fixed-Price vs Capacity vs Outcome-based — sanity-check the chosen model against current risk profile.
  - `pdf-prep-invoice` — reconcile timesheets / milestones to invoice; produce backup pack.

### 9. Iris — People Lead *(stage: People)*

- **Scope:** team health. Often the underrated dimension; first place an engagement actually fails.
- **Primary workflows:**
  - `pdf-team-health-check` — pulse on morale, capacity, blockers, ramp; structured questions + sentiment read on recent 1:1 notes.
  - `pdf-attrition-risk` — scoring per team member; flag intervention candidates.
  - `pdf-create-ramp-plan` — onboarding plan for a new joiner; integrates with the engagement's tooling and governance.
  - `pdf-prep-1on1` — prep notes for a specific 1:1: open items, last commitments, what to push on.
  - `pdf-prep-performance-conversation` — structured prep for a difficult performance chat (the kind you don't want to wing).

### 10. Felix — Finisher *(stage: Closure)*

- **Scope:** the part most delivery managers do badly. Closure is where reputational value compounds.
- **Primary workflows:**
  - `pdf-closure-checklist` — every-engagement closeout: deliverables signed, IP transferred, access revoked, knowledge transferred, references requested, finals invoiced.
  - `pdf-run-retrospective` — structured retro; produces both an internal honest version and a client-shareable version.
  - `pdf-capture-lessons` — what to carry forward; writes into `2-Practice/` (PARA Areas) so next engagement starts smarter.
  - `pdf-create-case-study` — ArcKit-style narrative case study; redaction-aware (the "what we can say publicly" cut).
  - `pdf-create-handover-pack` — if you're leaving the engagement before closure (or handing to BAU), the structured pack the next person needs.

---

## 7. Cross-cutting utilities

These aren't tied to a stage; they run alongside any agent.

| Utility skill | Purpose |
|---|---|
| `pdf-help` | Central index; recommends next action based on what artifacts exist in the engagement folder. Backed by a single CSV like `bmad-help.csv`. |
| `pdf-engagement-init` | Scaffolds a new engagement folder under `_pdf-output/engagements/<client>-<code>/` with the canonical sub-folder structure and empty artifact stubs. |
| `pdf-elicit` | Interactive Q&A to fill missing fields in any artifact. Routes to the right agent based on context. |
| `pdf-translate` | Rewrites a passage for a specific audience (CIO / CFO / CTO / Client-PM / Engineer / Legal / Board). Powers Helena's outward artifacts. |
| `pdf-red-team` | Adversarial review. Gates every outward artifact. Inspired by `bmad-review-adversarial-general` and `bmad-review-edge-case-hunter`. |
| `pdf-decision-log` | Append-only decision log writer. Every consequential decision lands here with context, options considered, rationale, owner, reversibility flag. |
| `pdf-audit-log` | Captures prompt + model + output hash on every workflow run. Background skill; not user-invoked. |

---

## 8. Artifact taxonomy (per engagement)

```
_pdf-output/engagements/<client>-<project-code>/
├── 00-constitution/
│   ├── CHARTER.md                 ← the spec
│   ├── STAKEHOLDERS.md
│   ├── RACI.md
│   ├── GOVERNANCE.md
│   └── COMMS-PLAN.md
├── 01-shaping/                    (pre-contract artifacts, retained for traceability)
│   ├── qualification-memo.md
│   ├── opportunity-shape.md
│   ├── rom-estimate.md
│   └── sow-draft.md
├── 02-mobilization/
│   └── kickoff-deck.md
├── 03-planning/
│   ├── plan.md                    (with embedded Mermaid Gantt)
│   ├── capacity-plan.md
│   ├── budget-baseline.md
│   └── estimate-challenge-log.md
├── 04-execution/
│   ├── RAID.md                    (living)
│   ├── STATUS-LOG.md              (append-only weekly)
│   ├── weekly-status/
│   │   ├── 2026-W22.md
│   │   └── 2026-W23.md
│   ├── standups/
│   │   └── 2026-05-25.md
│   └── velocity/
├── 05-governance/
│   ├── steering/
│   │   └── 2026-05-21-steering.md
│   ├── exec-updates/
│   ├── stakeholder-updates/
│   └── escalations/
├── 06-risk-change/
│   ├── risk-deep-dives/
│   ├── change-requests/
│   └── mitigation-plans/
├── 07-quality/
│   ├── sdlc-health-cards/
│   ├── qa-health-cards/
│   ├── syseng-health-cards/
│   └── secure-sdlc-health-cards/
├── 08-commercial/
│   ├── budget-tracker.md
│   ├── margin-analyses/
│   ├── change-orders/
│   └── invoices/
├── 09-people/
│   ├── team-health-checks/
│   ├── attrition-watch.md
│   ├── ramp-plans/
│   └── 1on1-notes/
├── 10-closure/
│   ├── closure-checklist.md
│   ├── retrospective.md
│   ├── lessons-learned.md
│   ├── case-study.md
│   └── handover-pack.md
├── decision-log.md                ← append-only
└── audit-log/                     ← prompt+model+hash per run
    └── 2026-05-25T14-22-03Z.jsonl
```

PARA-style **Areas** (cross-engagement practice knowledge) live outside this tree at `_pdf-output/practice/` (your reusable templates, your firm's house-style guides, your accumulated lessons).

---

## 9. The "Charter as Living Constitution" pattern

The charter is a **living document with an explicit audit/update trail** — not an immutable spec. It evolves as the engagement evolves; what's defensible to a regulator is not "the charter never changed", it's "every change is traceable, attributed, and reconcilable".

### Charter structure

```markdown
---
artifact_type: charter
engagement: acme-axiom-2026
status: active           # active | superseded | closed
current_revision: 7
last_updated: 2026-05-25T14:22:03Z
last_updated_by: systima
---

# Engagement Charter — Acme / Axiom

## Scope
... (current truth) ...

## Stakeholders
...

(etc. — current state always at the top of the file)

---

## Change Log

| Rev | Date | Author | Section | Change | Trigger | Approved by |
|---:|---|---|---|---|---|---|
| 7 | 2026-05-25 | Lloyd | Scope | Added Phase 3 milestone | CR-014 | Client Sponsor |
| 6 | 2026-05-18 | Lloyd | Stakeholders | Added new exec sponsor | Sponsor change | — |
| ... | ... | ... | ... | ... | ... | ... |
| 1 | 2026-04-01 | Lloyd | All | Initial charter at signature | Kickoff | Client Sponsor |
```

The change-log table is **append-only** and lives at the bottom of the same file. The current state lives at the top. Git history is the second-line audit (every commit is a charter delta) but the in-file change-log is the human-readable first line.

### Artifact frontmatter

Every downstream artifact records the charter revision it was generated against:

```yaml
---
artifact_type: weekly-status
engagement: acme-axiom-2026
charter_revision: 7
generated_by: pdf-weekly-status
model: claude-opus-4-7
prompt_hash: sha256:9c3a…
sources:
  - 04-execution/STATUS-LOG.md
  - 04-execution/RAID.md
  - 00-constitution/CHARTER.md#rev-7
red_teamed: true
red_team_pass_at: 2026-05-25T14:25:01Z
---
```

### What this gets you

- A regulator or CISO can audit any artifact back to its **named charter revision**, source data, model, and prompt hash.
- If the charter changes mid-flight, you can identify which historical artifacts were generated under which revision — useful for "the steering pack from W22 was correct against the then-charter; the change happened at W24".
- No need for `v1.3` semantic version games; revisions are monotonic integers in the change-log table.

### When the charter changes

The `pdf-update-charter` workflow (under Marcus) enforces: read the proposed change, identify affected sections, propose the diff, append the change-log row, get user confirmation, write. Audit-log captures all of it.

---

## 10. Technical-delivery hygiene topic mapping

Quinn (Quality Steward) is where industry-standard Development / QA / Systems Engineering / Secure SDLC topics live operationally:

| Topic group | PDF workflow | Artifact |
|---|---|---|
| Code Quality, Unit Testing, Code Review, Knowledge Sharing, Tech Debt, Branching Strategy, Striving for Excellence | `pdf-sdlc-health` | `07-quality/sdlc-health-cards/<date>.md` |
| Test Case Mgmt, Defect Mgmt, NFR Testing, QA Metrics, Automated Testing | `pdf-qa-health` | `07-quality/qa-health-cards/<date>.md` |
| CI/CD, Infrastructure Management | `pdf-syseng-health` | `07-quality/syseng-health-cards/<date>.md` |
| Secure SDLC | `pdf-secure-sdlc-health` | `07-quality/secure-sdlc-health-cards/<date>.md` |

The broader delivery-manager dimensions (budget, delivery, people, client) are covered by **Theo, Ronan, Iris, Helena** respectively. PDF is deliberately broader than any single technical-onboarding axis.

---

## 11. Skill anatomy (mirrors BMAD verbatim)

Each skill is a folder:

```
.claude/skills/pdf-<name>/
├── SKILL.md            (frontmatter: name + description ending in "Use when…")
├── customize.toml      (persona / menu / output paths / house-style overrides)
├── references/         (deep-dive notes the SKILL.md links into)
├── assets/             (templates, checklists)
└── steps/              (only for multi-step workflows; step-01-init.md, etc.)
```

SKILL.md frontmatter format:

```markdown
---
name: pdf-agent-mobilizer
description: Mobilization-stage delivery agent. Use when starting a newly-signed engagement, building the charter, RACI, governance plan, comms plan, or kickoff deck.
---
```

The "Use when" trigger is mandatory; it's how Claude routes.

---

## 12. Build order (consultation gated)

Each agent will be built behind a consultation gate. The order below front-loads the agents you'll use most, and the ones whose patterns will inform the others.

| Order | Agent | Why this order | Consultation focus before build |
|---|---|---|---|
| 0 | Scaffold + `pdf-help` + `pdf-engagement-init` | Foundation. Validates the file conventions. | Confirm folder structure, CSV index columns. |
| 1 | **Marcus** (Mobilizer) | The charter is the constitution; needs to exist before any other agent has something to reconcile to. | Charter template fields; house-style placeholders. |
| 2 | **Ronan** (Run-Lead) | Highest-frequency agent; the one you'll use weekly from day 1. | Weekly status format; RAID columns; standup digest style. |
| 3 | **Helena** (Herald) | Outward comms; complements Ronan's internal output. | Audience profiles (CIO/CFO/CTO/Client-PM); house-style. |
| 4 | **Klaus** (Risk Officer) | Deeper RAID work; complements Ronan. | Risk taxonomy (Orange Book vs custom); change-request fields. |
| 5 | **Petra** (Planner) | Backfills the bridge between charter and execution. | Estimation method; capacity-plan inputs. |
| 6 | **Theo** (Treasurer) | Commercial. Higher-stakes, lower-frequency. | Margin model; commercial model taxonomy; invoice format. |
| 7 | **Quinn** (Quality Steward) | The technical-hygiene agent; needs Marcus's charter to know compliance scope. | RAG criteria per topic; access model (do you have repo access?). |
| 8 | **Iris** (People Lead) | Cross-engagement; can wait until you have a team to manage. | 1:1 cadence; sensitivity rules (HR data handling). |
| 9 | **Sofia** (Shaper) | Pre-sales; only relevant once you're shaping new opportunities. | Qualification framework; SoW template source. |
| 10 | **Felix** (Finisher) | Closure; not needed until an engagement closes. | Retrospective format; case-study redaction rules. |
| 11 | Cross-cutting utilities (`pdf-red-team`, `pdf-translate`, `pdf-decision-log`, `pdf-audit-log`, `pdf-elicit`) | Built last because their requirements crystallise from the agents above. | Trigger conditions; output formats. |

---

## 13. Evolution notes (v2+)

Captured here so today's decisions don't lock the design.

- **Multi-engagement view.** v0.1 is single-engagement-at-a-time. v2 should add a `pdf-portfolio` skill that aggregates RAG-status across all active engagements.
- **Calendar/email ingestion.** Anthropic's `productivity` plugin already does this; integrate rather than rebuild. Out of scope for v0.1 because it changes the privacy posture.
- **Local-model routing.** Add a `customize.toml` flag per skill: `confidential: true` routes to local Ollama; `synthesis: true` routes to frontier. v0.1 leaves this manual.
- **Voice input on standups.** Whisper or local STT into `pdf-summarize-standup`. v0.1 assumes text input.
- **Slack / Teams adapters.** Out of scope for v0.1 (private-workspace constraint). v2 candidate via MCP.
- **Jira / ADO connectors.** ArcKit exports CSV; v0.1 follows suit. v2 could read live.
- **House-style packs.** Big-consultancy-style, Big-4-style, boutique-style, in-house-style. Currently lives in `customize.toml`; v2 promotes to swappable pack files.
- **Methodology overlays.** PMI / SAFe / DA. Currently absorbed into agent prompts; v2 should let you toggle methodology in one place.
- **Test architect (TEA).** Worth tracking BMAD's TEA module for ideas; the Quinn agent is the closest equivalent and may inherit patterns.

---

## 14. Honest limitations

- **Single-author bias.** Designed for one delivery manager working privately. Any team adoption needs explicit sharing/permission design.
- **Markdown is not a database.** This works at one-engagement-at-a-time scale; portfolio aggregation will need indexing.
- **The accuracy ceiling is the model.** PMI Infinity's documented failures on Tuckman material are a reminder. PDF's mitigation is the red-team gate and the audit log; neither makes the underlying model trustworthy. Treat every output as a draft to verify.
- **House-style is your problem.** Your firm's actual templates, voice, and governance language aren't in this framework. The customize.toml pattern makes overlaying them straightforward; the work isn't free.
- **Compliance regimes (AI Act, GDPR, HIPAA, PCI) are referenced, not encoded.** v0.1 prompts mention them; it does not check artifacts against them. A future `pdf-compliance-check` skill is a candidate.
- **No CRM / sales-pipeline integration.** Sofia's stage is intentionally light; the assumption is that opportunities arrive in your inbox, not via PDF.

---

## 15. Decisions log

| # | Question | Decision | Date |
|---|---|---|---|
| 1 | Prefix | `pdf-` (live with the file-format collision; namespace cancels it) | 2026-05-25 |
| 2 | Persona names | Western names only. **Petra** (Planner) and **Ronan** (Run-Lead) replace earlier non-Western placeholders. | 2026-05-25 |
| 3 | Stage count | Keep ten. No collapses. | 2026-05-25 |
| 4 | Quinn's scope | Four workflows, not 16. | 2026-05-25 |
| 5 | Audit log default | On for every workflow. Off requires explicit opt-out in `customize.toml`. | 2026-05-25 |
| 6 | Charter form | Living document with explicit append-only change-log in-file; git history as second-line audit. (See §9.) | 2026-05-25 |
| 7 | Adversarial gate strictness | **Hybrid** (see §16). Default-on for high-stakes artifacts (steering / exec / change requests / SoW / ROM / escalations); default-off for high-frequency routine artifacts (weekly status, RAID updates, standup digests). **Every artifact's frontmatter records `red_teamed: true|false`** so an un-red-teamed artifact is visible at a glance, and any artifact can be retroactively red-teamed via `pdf-red-team <file>`. | 2026-05-25 |
| 8 | Linear orchestration | Adopt BMAD's `preceded-by` / `followed-by` pattern in the help CSV. (See §17.) | 2026-05-25 |
| 9 | Ingest mode | Every agent supports a `dump` intent in addition to step-by-step `create` / `update` / `validate`. (See §18.) | 2026-05-25 |

---

## 16. Adversarial-gate clarification

The §15 question 7 distinction was unclear; here's the operational rule that resolves it.

**Three classes of artifact:**

| Class | Examples | Red-team default | Why |
|---|---|---|---|
| **High-stakes / outward formal** | Steering packs, exec summaries, stakeholder updates, escalation memos, change requests, SoW drafts, ROM estimates, board decks, case studies, retrospectives shared with client | **On** | A bad version damages the engagement. Worth the friction. |
| **High-frequency / routine** | Weekly status, RAID updates, standup digests, 1:1 prep, internal velocity checks | **Off (but tracked)** | Friction would erode the loop. Frontmatter still records `red_teamed: false` so you can see at a glance which routine items skipped the gate, and run `pdf-red-team` on any one manually. |
| **Internal-only / draft** | SDLC health cards (your own working notes), team-health pulses, draft plans, draft estimates | **Off** | These are inputs to thinking, not deliverables. |

**Override:** any artifact can be flipped to "must red-team" via a single line in `customize.toml`. So if you're working on a regulated client and want every weekly status red-teamed, you flip one bit.

**Visibility:** `pdf-help` flags any high-stakes artifact whose frontmatter shows `red_teamed: false`. A status report that skipped the gate is visible; you decide whether to re-run.

---

## 17. Linear orchestration ("must run X first, then Y")

BMAD encodes this in a central CSV (`bmad-help.csv`) with `preceded-by` and `followed-by` columns. PDF adopts the same pattern.

### The index CSV

`pdf/_config/pdf-help.csv` — single source of truth for ordering, dependencies, recommended next actions. Columns:

| Column | Purpose |
|---|---|
| `stage` | 01-shaping through 10-closure, or `meta` for utilities |
| `agent` | sofia / marcus / petra / ronan / helena / klaus / quinn / theo / iris / felix / — |
| `skill` | e.g. `pdf-create-charter` |
| `display_name` | Human-readable |
| `intent` | create / update / validate / dump |
| `preceded-by` | Comma-separated skills that must have produced output first |
| `followed-by` | Comma-separated skills that this typically enables |
| `required` | true / false — is this artifact mandatory at its stage? |
| `output_location` | Glob pattern under `_pdf-output/engagements/<engagement>/` |
| `output_glob` | What file pattern signals "done" |
| `description` | One-line summary |

### How `pdf-help` uses it

When invoked, `pdf-help`:

1. Detects the active engagement (or asks).
2. Globs every `output_glob` against the engagement folder to compute "what exists".
3. Walks the CSV in stage order. The **next required action** is the first row whose `preceded-by` is all satisfied and whose `output_glob` is empty.
4. Recommends that skill, with a one-line "why this next".
5. Optionally shows the next 2-3 actions so you can see the path ahead.

### Example flow (engagement just signed, nothing exists yet)

```
$ /pdf-help

Active engagement: acme-axiom-2026
Stage: 02-mobilization

NEXT REQUIRED ACTION:
  → pdf-create-charter  (Marcus)
    Charter doesn't exist yet. Every later artifact reconciles to it.

THEN:
  → pdf-create-raci        (Marcus, needs charter)
  → pdf-create-governance  (Marcus, needs charter + raci)

LATER:
  → pdf-create-plan        (Petra, needs charter + governance)
```

### Hard vs soft ordering

- **Hard:** `preceded-by` blocks the recommendation. You can still run the skill directly; you'll just get a warning ("Charter does not exist. Continue anyway? [y/N]").
- **Soft:** `followed-by` is advisory; it shapes the "what next" hint but does not gate anything.

This gives you both: the discoverability of "what do I do now" and the freedom of "I know what I'm doing, leave me alone".

---

## 18. Ingest mode ("dump info, agent figures out the files")

Step-by-step elicitation is wrong when you already have the information — when you've just come out of a client call with two pages of notes, when a transcript landed in your inbox, when an existing engagement is being migrated into PDF.

**Every agent supports an `intent: dump` mode in addition to the conventional `create` / `update` / `validate`.**

### The dump flow

```
$ /pdf-agent-mobilizer

Marcus: Hello. What are we working on?

You: ingest

Marcus: Paste, drop file paths, or describe. I'll extract everything I can and
        propose which artifacts to create or update. You confirm before any
        write happens.

You: [pastes 4 pages of notes from kickoff prep call]

Marcus: I've extracted:

  Proposed CREATE actions:
    - CHARTER.md           (scope, success criteria, exit criteria all present)
    - STAKEHOLDERS.md      (8 named stakeholders, 6 with roles)
    - GOVERNANCE.md        (steering cadence and escalation path mentioned)

  Proposed UPDATE actions:
    - RAID.md              (3 risks named in the call; will append)

  Insufficient data for:
    - RACI.md              (no responsibility breakdown in source)
    - COMMS-PLAN.md        (cadence mentioned but not channels)

  Missing fields I'd want filled (will elicit later or you can ignore):
    - Charter: budget range, expected go-live date
    - Stakeholders: contact details for 2 of 8

  Proceed with creates/updates? [yes / select / no]
```

### Mechanics

- Each agent's `customize.toml` defines a `[dump]` block listing the artifacts it can produce/update from unstructured input.
- The dump workflow runs an extraction pass (model-driven, locally cached prompt), classifies each candidate artifact as create / update / insufficient, presents the plan, and writes only after confirmation.
- Audit log captures the raw input, the extraction prompt, the proposed plan, and the user's confirmation.
- `pdf-elicit` is automatically queued for any "missing fields" so you can fill the gaps later in an interactive turn.

### Why this matters

Two delivery-management realities the step-by-step model gets wrong:

1. **Information arrives in clumps, not in artifact-shaped chunks.** A 30-minute call covers scope + stakeholders + risks + a comms preference — not the order any single workflow expects.
2. **You don't always know what to create.** Sometimes you just have the input and want the system to tell you what the right outputs are.

The dump mode is also how migrations work: drop the existing engagement's status reports, RAID, charter into PDF and it proposes the canonical structure.

---

## 19. Sharding policy

When and how to split artifacts that grow too large. Modelled on BMAD's `bmad-shard-doc` pattern (`npx @kayvan/markdown-tree-parser explode`) but with explicit rules for the delivery-management artifacts.

### What shards (hierarchical documents)

| Artifact | Shard on | Trigger | Result |
|---|---|---|---|
| `CHARTER.md` | H2 sections | Document exceeds ~10 H2 sections OR any single section exceeds ~2 screens | `00-constitution/charter/{scope,stakeholders,success-criteria,...}.md` + `00-constitution/charter/index.md` |
| `GOVERNANCE.md` | H2 sections | Same heuristic | `00-constitution/governance/{cadence,decision-rights,escalation-tree}.md` + index |
| `plan.md` | H2 sections (phases) | Plan covers more than ~3 phases | `03-planning/plan/{phase-1,phase-2,phase-3}.md` + index |
| `case-study.md` | H2 chapters | Final draft exceeds ~8 chapters | `10-closure/case-study/{ch-1-context,ch-2-approach,...}.md` + index |

**Rule (from BMAD):** after sharding, **delete or archive the original**. Keeping both versions causes downstream skills to load the wrong one.

### What does not shard (append-only logs)

| Artifact | Why not | Lifecycle policy instead |
|---|---|---|
| `RAID.md` | Tabular, current-state, frequently re-read whole | Closed rows move to `RAID-closed.md`; active list stays small |
| `STATUS-LOG.md` | Chronological narrative; sharding by section is meaningless | Calendar archive: every 6 months move older entries to `status-log-archive/YYYY-H1.md` |
| `decision-log.md` | Append-only, often grep'd whole | Calendar archive: same as STATUS-LOG. Index of decision IDs stays at the top of the live file. |
| `audit-log/*.jsonl` | Already file-per-run | None — directory naturally shards |
| `pdf-help.csv` | Tabular, read whole by the recommender | None — BMAD runs 232-row CSVs comfortably |

### Calendar-archival convention

For the logs that don't shard but do grow indefinitely, the rule is:

- **Every 6 months**, archive entries older than the cut-off into `<artifact-stem>-archive/YYYY-H{1|2}.md`.
- The live file keeps only the current half-year.
- An `ARCHIVE-INDEX.md` at the engagement root lists the archives.

This is calendar-driven, not size-driven, so it's predictable and auditable.

### Skill responsibilities

- **`pdf-update-charter`** (intent on `pdf-create-charter`): when the charter exceeds the shard threshold, prompts the user to shard before any further edit.
- **`pdf-weekly-status`**: at the start of every quarter, checks whether `STATUS-LOG.md` is overdue for archival and prompts.
- A future **`pdf-shard`** utility (v2 candidate) wraps the BMAD `markdown-tree-parser` command with PDF's frontmatter-preservation rules.

### Why this matters

Two failure modes the sharding policy prevents:

1. **Context bloat.** A 4,000-line charter eats the model's working context before any useful generation happens. The shard threshold (~10 H2 sections) keeps any single artifact under ~1,000 lines.
2. **Stale-version drift.** BMAD's `discover_inputs` failure mode applies here too — if both `CHARTER.md` and `charter/scope.md` exist, the next status report might pull from either. Delete-after-shard is the rule.

---

## 20. Future: API sync providers (planned, Stage 12 candidate)

PDF is designed to be **fully usable with no external API integrations** — every workflow accepts paste-or-interview input. But for the workflows that read external systems (Ronan's velocity check, Theo's budget tracker, Quinn's DORA metrics for SysEng health, Iris's pulse-survey ingestion), API sync would materially reduce friction.

This is a **planned future feature** — not built. Captured here so today's design choices don't preclude it.

### Provider model

A new cross-cutting utility skill `pdf-sync` (Stage 12 candidate) defines a provider pattern:

| Provider | Reads from | Feeds workflows |
|---|---|---|
| **Jira** | Issues, sprints, velocity, defects | `pdf-velocity-check`, `pdf-update-raid`, `pdf-qa-health` |
| **Azure DevOps** | Same as Jira | Same |
| **GitHub / GitLab** | PRs, deploy events, CI runs, SCA findings | `pdf-sdlc-health`, `pdf-syseng-health`, `pdf-secure-sdlc-health` |
| **Confluence / Notion** | Pages, decisions, ADRs | `pdf-create-charter` (update), `pdf-decision-log` |
| **Google Calendar / Outlook** | Meetings, attendees | `pdf-engagement-init` (calendar bootstrap), `pdf-weekly-status` (Asks discovery) |
| **Slack / Teams** | Messages, threads | `pdf-summarize-standup`, `pdf-update-raid` |
| **Harvest / Toggl / similar** | Timesheet data | `pdf-track-budget`, `pdf-prep-invoice` |

### Per-engagement configuration

Sync providers live in the engagement's `.pdf-config.toml`:

```toml
[sync.jira]
enabled = true
base_url = "https://acme.atlassian.net"
project_key = "AXM"
credentials_env_var = "JIRA_API_TOKEN_ACME"  # never in the file itself
cadence = "hourly"
last_synced = "2026-05-25T14:00:00Z"
target_workflows = ["pdf-velocity-check", "pdf-update-raid"]

[sync.github]
enabled = true
repo = "acme/axiom"
credentials_env_var = "GITHUB_TOKEN_ACME"
cadence = "every-15-minutes"
target_workflows = ["pdf-sdlc-health", "pdf-syseng-health"]
```

### Source-mode extension

Every workflow that currently asks `[paths / interview]` gets a third option:

```
"Source mode? [paths / interview / synced — last sync was 23 minutes ago]"
```

If `synced` is chosen and configured providers cover the workflow's needs, the workflow reads from the local sync cache rather than asking the user.

### Sync cache location

`_pdf-output/engagements/<slug>/.sync-cache/<provider>/<endpoint>/<timestamp>.json`

- Cache is per-engagement (no cross-engagement leakage)
- `.sync-cache/` is `.gitignore`'d like `audit-log/`
- TTL per provider, configurable

### Why this isn't built yet

Three reasons it lives in v2, not v0:

1. **Credentials handling is non-trivial.** Per-engagement, per-provider, never in repo. Needs a coherent secrets-management story (env vars + a `pdf-credentials` helper skill or shell integration).
2. **API surface is large.** Each provider has its own auth, rate-limiting, and schema. Building one well is a week's work; building seven is a build of its own.
3. **The current design already works.** Paste-or-interview input is fully functional. The user can copy-paste from Jira's UI into a workflow today; the sync would be quality-of-life, not enabling capability.

### Build trigger

Promote `pdf-sync` to active build when **two of three** are true:

1. The user is running ≥ 2 concurrent engagements and copy-paste overhead is becoming friction.
2. At least one engagement requires daily integration with an external system (e.g. a compliance-monitoring requirement on CI/CD that's faster via API than weekly Q&A).
3. Multi-user PDF adoption is being considered — at which point sync moves from convenience to enabling capability.

Until then, the source-mode pattern (`paths` / `interview`) is the canonical interface.

---

*End of architecture draft. Section 15 decisions locked; Stages 0–8 built; Stage 11 (cross-cutting utilities) and Stage 12 (API sync) planned.*
