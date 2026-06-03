---
engagement: {{ENGAGEMENT_SLUG}}
lifecycle: {{LIFECYCLE}}
lifecycle_updated: {{CREATED_AT}}
---

# {{ENGAGEMENT_NAME}}

> {{ENGAGEMENT_DESCRIPTION}}
> Workspace scaffolded {{CREATED_AT}} by `pdf-engagement-init`.

**Lifecycle:** `{{LIFECYCLE}}` — one of `prospective | go | active | on-hold | closed`. `pdf-help` reads this to gate its recommendations (see `ARCHITECTURE.md` §8.3). Update it (and `lifecycle_updated`) as the engagement moves: GO decision → `go`; charter populated → `active`; wound down → `closed`.

## Quick orientation

- **Canonical facts:** [`00-constitution/FACTS.md`](./00-constitution/FACTS.md) — single source of truth for the client/org name, key people, and the glossary of normalised terms. Confirmed vs `[?]` unconfirmed.
- **Constitution:** [`00-constitution/CHARTER.md`](./00-constitution/CHARTER.md) — single source of truth; living document with append-only change-log.
- **Living artifacts:** [`04-execution/RAID.md`](./04-execution/RAID.md), [`04-execution/STATUS-LOG.md`](./04-execution/STATUS-LOG.md).
- **Decision log:** [`decision-log.md`](./decision-log.md) — every consequential decision lands here.
- **Audit log:** [`audit-log/`](./audit-log/) — one JSONL line per workflow run; prompt + model + hash.
- **Source transcripts:** [`_transcripts/`](./_transcripts/) — cleaned via `pdf-clean-transcript`. **Call debriefs:** [`call-debriefs/`](./call-debriefs/).

## Folder structure

| Folder | Stage | Owner agent |
|---|---|---|
| `00-constitution/` | — | Marcus |
| `01-shaping/` | Pre-contract | Sofia |
| `02-mobilization/` | Kickoff | Marcus |
| `03-planning/` | Planning | Petra |
| `04-execution/` | Weekly run | Ronan |
| `05-governance/` | Stakeholder reporting | Helena |
| `06-risk-change/` | Risk and change | Klaus |
| `07-quality/` | SDLC governance | Quinn |
| `08-commercial/` | Money | Theo |
| `09-people/` | Team | Iris |
| `10-closure/` | Closeout | Felix |

## Next step

Run `pdf-help` to see what's next, or jump straight to `pdf-create-charter` (Marcus the Mobilizer).
