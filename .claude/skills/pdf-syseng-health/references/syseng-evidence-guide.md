# Systems Engineering evidence guide

Two sub-dimensions; each substantial.

---

## CI/CD

**Definition.** The pipeline from commit to production — build, test, deploy, observe — and its reliability, speed, and discipline.

**Canonical question:** *"Walk me through what happens between an engineer's commit and that code reaching production. What's automated, what's manual, what gates exist, what's the typical and worst-case timing, and what's the failure-recovery story?"*

**Evidence to look for:**

- **Deployment frequency** (DORA): production deploys per day / week
- **Lead time** (DORA): commit to production for a typical change
- **Change-failure rate** (DORA): proportion of deploys causing a degraded service
- **Mean time to restore** (DORA): time to recover from a failed deploy
- Pipeline definition in version control (GitLab CI, GitHub Actions, Jenkinsfile, etc.)
- Quality gates in pipeline (linting, static analysis, security scan, test execution)
- Automated rollback or feature-flag-driven release
- Environment parity (dev → staging → prod are consistent)
- Pipeline reliability: percentage of builds passing on first try
- Observability hooks tied to deploys (release annotation in monitoring tools)

**Common gaps:**

- "We have CI/CD" with no DORA metrics — claim without evidence
- Pipeline exists but bypassed manually for "urgent" releases
- Deploys are quarterly events, not daily activity
- No rollback path; recovery means re-deploy with a fix
- Environment drift between dev / staging / prod
- Manual gates in the middle of "automated" pipelines (e.g. a human pressing a button to promote to staging)
- Pipeline failures normalised; broken main is tolerated for hours

**RAG criteria:**

- **Green:** DORA metrics measured and at "elite" or "high" performance per the DORA scale; pipeline reliable; rollback proven; environment parity demonstrable; quality gates enforce automatically.
- **Amber:** DORA metrics partial; deploys regular but recovery times long; quality gates partially enforced; some environment drift.
- **Red:** DORA metrics absent or at "low" performance; manual deploys frequent; rollbacks untested; pipeline often broken on main.

---

## Infrastructure Management

**Definition.** How the engagement's infrastructure is provisioned, configured, maintained, secured, and operated. Includes infrastructure-as-code, observability, runbooks, disaster recovery, and cost management.

**Canonical question:** *"How is infrastructure managed today? Provisioning method, configuration management, observability, runbook coverage, disaster recovery, and cost discipline."*

**Evidence to look for:**

- **Infrastructure as Code** — Terraform / CloudFormation / Pulumi / Ansible / etc., in version control
- IaC repo with recent meaningful commits (not last touched 6 months ago)
- **Observability** — metrics, logs, traces; named tooling; alerts that fire on real conditions
- Alert hygiene: % of alerts actionable vs noise
- **Runbooks** for known operational scenarios; tested or recently used
- **Disaster recovery plan** with a defined RTO/RPO and at least one test of the plan in the engagement's lifetime
- **Cost monitoring** — budget alerts in cloud accounts; trend; allocation visibility
- Secrets management — vaulted, rotated, not in repos
- Access management — least-privilege; recent access reviews
- Backup verification — backups exist *and* have been test-restored

**Common gaps:**

- "Some Terraform" but parts of the estate are click-configured in cloud consoles
- Observability tooling installed but alerts ignored or noisy
- Runbooks aspirational ("we should write these"); never tested
- DR plan exists but has never been exercised; RTO is a guess
- Cost monitoring after the fact ("we'll see the bill at month-end")
- Secrets in repos discovered periodically by scanning tools
- Access reviews skipped or annual-only
- Backups taken but never restored

**RAG criteria:**

- **Green:** IaC covers the estate; observability with healthy alert ratio; runbooks tested; DR exercised with measurable RTO; cost monitored with alerts; secrets managed properly; access reviewed; backups verified by test-restore.
- **Amber:** Most of the above in place but with named gaps and a plan to close them; not all elements proven.
- **Red:** Significant manual infrastructure work; observability inadequate; runbooks absent or untested; DR unproven; surprises on cost; secrets hygiene poor.

---

## Overall RAG rule

Same as SDLC. With only two sub-dimensions, the worst-of rule is more sensitive — a RED on either pulls the card to RED. This is intentional; both areas matter equally for delivery quality.
