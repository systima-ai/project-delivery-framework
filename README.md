# Project Delivery Framework (PDF)

> **Spec-driven, AI-assisted operating system for the "CEO of the engagement".**
> A Claude Code skill library for senior delivery and engagement managers.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Status: v0.1](https://img.shields.io/badge/status-v0.1-blue)](./CHANGELOG.md)

---

## What this is

BMAD, Spec Kit, and the Anthropic Knowledge Work Plugins gave the engineering layer a mature, opinionated AI toolchain. The delivery-management layer had nothing equivalent.

PDF reuses BMAD's architecture — persona-mediated stage agents that dispatch to versioned workflow skills producing markdown artifacts — and points it at the delivery-management layer:

- **10 stage agents** for the engagement lifecycle (shaping → mobilization → planning → execution → governance → risk → quality → commercial → people → closure)
- **37 workflow skills** that produce structured, audit-ready artifacts
- **5 cross-cutting utilities** (red-team, translate, decision-log, audit-log, elicit)
- Living **engagement charter as the constitution** every artifact reconciles to
- **Audit-by-default**: prompt+model+hash logged per workflow run
- **Adversarial red-team** gate on every outward-facing artifact
- Fully **local-first**; engagement data never leaves the user's machine unless explicitly shared

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full design spec.

## Who it's for

The senior delivery / engagement / programme manager who:

- Runs one or more engagements as the "CEO of the engagement"
- Is responsible for budget, delivery, people, client, and quality across an engagement
- Wants a private, opinionated, audit-defensible AI toolchain that operates at their level — not product-management tooling repurposed for delivery
- Is comfortable with Claude Code or a similar agentic CLI

Not for: product managers (use Anthropic's `product-management` plugin or BMAD); engineering leads in build mode (use BMAD); team platforms with multi-user state (PDF is single-operator-by-design).

## Installation

```bash
# Install into the current directory
npx project-delivery-framework

# Or into a specific directory
npx project-delivery-framework --target ./my-engagement-workspace

# Force overwrite of existing PDF skills
npx project-delivery-framework --force

# See what would be installed without writing
npx project-delivery-framework --dry-run

# Check what's already installed
npx project-delivery-framework status
```

The installer copies:

- `.claude/skills/pdf-*/` — 62 skill folders (10 agents + 52 workflows / utilities)
- `_pdf/_config/pdf-help.csv` — the skill index that drives `pdf-help`
- `_pdf-output/engagements/` and `_pdf-output/practice/` — empty output roots

It does **not** touch any existing skills from other frameworks (BMAD, Anthropic plugins, etc.). PDF coexists by namespace (`pdf-*`).

## Quick start

Open the installed directory in **Claude Code**, then:

```
/pdf-engagement-init        # scaffold a new engagement
/pdf-help                    # show next required action
```

Or talk to an agent directly:

```
"hey Marcus"      # Mobilizer (charter, RACI, governance, comms, kickoff)
"hey Ronan"       # Run-Lead (weekly status, RAID, standups, velocity, blockers)
"hey Helena"      # Herald (steering, exec summary, stakeholder updates, escalations)
"hey Klaus"       # Risk Officer (risk deep-dives, change requests, mitigation, escalation decisions)
"hey Petra"       # Planner (plan, capacity, budget, estimate challenge)
"hey Theo"        # Treasurer (budget tracking, margin, change orders, commercial model, invoice prep)
"hey Quinn"       # Quality Steward (SDLC / QA / SysEng / Secure SDLC health)
"hey Iris"        # People Lead (team health, attrition risk, ramp, 1:1s, performance conversations)
"hey Sofia"       # Shaper (qualify, shape, ROM, SoW)
"hey Felix"       # Finisher (closure, retrospective, lessons, case study, handover)
```

Each agent greets, scans what's done, presents a menu of workflows, and dispatches. Most workflows support a `dump` intent for ingesting unstructured material (call transcripts, RFPs, status notes) and extracting structured artifacts from it.

## The 10 agents

| Stage | Agent | What they handle |
|---|---|---|
| 01 — Shaping (pre-sales) | **Sofia** | Qualification (MEDDIC), opportunity shaping, ROM estimates (cone of uncertainty), SoW drafting |
| 02 — Mobilization | **Marcus** | Engagement charter (constitution), RACI, governance plan, comms plan, kickoff deck |
| 03 — Planning | **Petra** | Plan (Mermaid Gantt + phase table), capacity plan (matrix + rows), budget baseline (monthly + milestone), estimate challenge (pre-mortem + red-team) |
| 04 — Execution | **Ronan** | Weekly status (Teams/Slack-paste-friendly), RAID updates, standup digests, velocity checks, blocker triage |
| 05 — Governance | **Helena** | Steering packs (MARP + speaker notes), exec summaries (strict 1-page), stakeholder updates (9 archetypes), escalation memos (SCQA) |
| 06 — Risk & Change | **Klaus** | Risk deep-dives, change requests (granular taxonomy → classic inference), mitigation plans, escalation decisions |
| 07 — Quality | **Quinn** | SDLC / QA / SysEng / Secure SDLC health cards (RAG-rated; with compliance regime cross-check) |
| 08 — Commercial | **Theo** | Budget tracker (weekly + monthly), margin analysis (period + milestone), change orders, commercial-model reviews, invoice backup packs |
| 09 — People | **Iris** | Team health, attrition risk, ramp plans, 1:1 prep (cumulative per person), performance conversations (Radical Candor) — **all confidential by default** |
| 10 — Closure | **Felix** | Closure checklist, retrospective (internal + client-shareable), lessons learned (propagated to practice library), case study (internal + public), handover pack |

## Core design principles

1. **Charter as constitution.** Every artifact reconciles to the engagement charter; charter changes are append-only with a visible change-log.
2. **Spec-driven, not template-driven.** Each artifact has structured frontmatter linking it to its sources and the model used.
3. **Stage-orchestrated, persona-mediated.** Agents route; workflows do the work.
4. **Local-first.** Engagement data lives in `_pdf-output/engagements/<slug>/` and is gitignored by default. Confidential `09-people/` data is excluded even when other engagement data is committed.
5. **Audit-by-default.** Every workflow invocation writes a JSONL audit record.
6. **Adversarial before stakeholder.** Every outward-facing artifact passes `pdf-red-team` before delivery.
7. **House-style separable.** Persona, validation thresholds, and templates are all overridable via per-engagement `.pdf-config.toml` or per-skill `customize.toml`.

## Repository layout

```
project-delivery-framework/
├── ARCHITECTURE.md          # full design spec (20 sections, decisions log)
├── CHANGELOG.md             # per-stage build history
├── README.md                # this file
├── LICENSE                  # MIT
├── package.json             # npm metadata; `bin` = installer CLI
├── bin/cli.js               # npx installer
├── .claude/skills/          # 62 skill folders (pdf-*)
├── _pdf/_config/            # pdf-help.csv (52-row skill index)
└── _pdf-output/             # output root (engagements + practice library)
    ├── engagements/         # one folder per engagement (gitignored content)
    └── practice/            # cross-engagement lessons library
```

## Compatibility

- **AI tooling:** [Claude Code](https://code.claude.com) is the primary target. Skills are file-based markdown + TOML and portable to other Claude-Code-compatible agents (Codex CLI, Cursor, OpenCode) with minor adaptation.
- **Coexistence:** PDF's `pdf-*` namespace doesn't collide with BMAD's `bmad-*` skills. Both can be installed in the same workspace.
- **Node:** ≥ 16.7.0 for the installer (uses `fs.cpSync`).

## Status

**v0.1 — feature-complete.** 52 workflows + 10 agents built across 11 development stages with explicit consultation gates per stage. See [`CHANGELOG.md`](./CHANGELOG.md).

Known future work (out of scope for v0.1):

- **API sync providers** (Jira, ADO, GitHub, Confluence, Calendar, Slack/Teams, time-tracking) — architecture is forward-compatible; see [`ARCHITECTURE.md`](./ARCHITECTURE.md) §20.
- **Cross-engagement portfolio view** (`pdf-portfolio`).
- **Practice-library search** during engagement init.
- **Real-world hardening** via dry-runs and feedback from first uses.

## Influences

Acknowledged debts:

- **[BMAD-Method](https://github.com/bmad-code-org/BMAD-METHOD)** — the skill anatomy, agent-vs-workflow split, central CSV index, and per-stage orchestration pattern.
- **[Spec Kit / GSD](https://github.com/github/spec-kit)** — the `constitution.md` pattern that became PDF's living charter.
- **[Anthropic Knowledge Work Plugins](https://github.com/anthropics/knowledge-work-plugins)** — the operations / productivity / engineering / product-management plugins informed several workflows; PDF uses the file-based, locally-runnable, Apache-2.0 design philosophy.
- **[ArcKit](https://github.com/tractorjuice/arc-kit)** — audit-ready artifact structure; Orange Book risk taxonomy informing Klaus's design; MADR ADRs.
- **PMI's framing** of delivery roles and prompt-engineering guidance — for the role taxonomy in `customize.toml` files (not the PMBOK content itself).

PDF is the delivery-management-layer sibling these projects were missing.

## Contributing

This is currently a single-operator project. If you find it useful and have improvements, open an issue or PR; PRs should:

- Match the existing skill anatomy (SKILL.md frontmatter + customize.toml + optional references / assets)
- Include a CHANGELOG entry
- Pass `npx project-delivery-framework status` after install in a clean directory

## Licence

MIT — see [`LICENSE`](./LICENSE).
