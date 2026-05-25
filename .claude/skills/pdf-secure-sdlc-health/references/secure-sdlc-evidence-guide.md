# Secure SDLC evidence guide

Six security sub-dimensions plus the compliance-regime cross-check (workflow-level, not a sub-dimension).

---

## Threat Modelling

**Definition.** A structured process for identifying threats to the system and the mitigations applied to each, performed at meaningful points (initial architecture, major change, periodic review).

**Canonical question:** *"What threat-modelling exercises have happened on this engagement? When, who participated, what methodology, what came out, and what's the status of the mitigations identified?"*

**Evidence to look for:**

- Named methodology (STRIDE, PASTA, attack trees, MITRE ATT&CK informed)
- Threat-model artifact in the engagement (markdown, diagram, or tool export)
- Mitigations tracked with named owners and statuses
- Re-modelling on major architectural changes

**Common gaps:**
- Threat-modelling as a one-off at kickoff that was never refreshed
- "We discussed threats" without a structured output
- Mitigations identified but not tracked to closure
- New components added without a model update

**RAG criteria:**
- **Green:** Methodology used; artifact maintained; mitigations tracked; re-modelling on change.
- **Amber:** Some threat-modelling done but inconsistent; gaps in mitigation tracking.
- **Red:** No threat-modelling; security is "addressed in code review".

---

## SAST (Static Application Security Testing)

**Definition.** Automated scanning of source code for security defects, integrated into the development workflow.

**Canonical question:** *"What SAST is in place? Tool, when it runs, what it blocks, and how false-positive volume is managed."*

**Evidence to look for:**

- Tool: SonarQube security rules, Semgrep, Checkmarx, Snyk Code, GitHub CodeQL, language-specific
- Runs in CI on every PR
- Blocks merge on findings above an agreed severity
- False-positive triage process

**Common gaps:**
- Tool installed but findings ignored
- Runs only on a schedule, not per PR
- High false-positive rate normalised
- "We turn it off because it's noisy"

**RAG criteria:**
- **Green:** Tool active; integrated in CI; merge-blocking on agreed severity; false-positive handling working.
- **Amber:** Tool exists but enforcement weak; runs but findings backlog.
- **Red:** No tool, or tool disabled, or findings ignored.

---

## DAST and Pen Testing

**Definition.** Dynamic security testing — automated scanning of running applications (DAST) and human-led penetration testing.

**Canonical question:** *"What runtime security testing has been done — automated DAST scans and/or human pen tests? When, by whom, against what scope, with what findings, and where are those findings now?"*

**Evidence to look for:**

- DAST tool in pipeline (OWASP ZAP, Burp Enterprise, Acunetix, etc.) or on a regular cadence
- Most recent pen test: date, scope, executive summary, findings list
- Findings tracked to closure with named owners
- Re-test on critical findings

**Common gaps:**
- Pen test annual at most; no DAST in between
- Pen test report exists; findings unrack ed
- "We deferred remediation"
- Scope was narrow; whole areas not tested

**RAG criteria:**
- **Green:** DAST and/or pen testing on a defined cadence; findings tracked to closure; critical findings re-tested.
- **Amber:** Some runtime testing but gaps; older findings still open.
- **Red:** No DAST; pen test absent or stale; findings unmanaged.

---

## SCA / Dependency Scanning

**Definition.** Software Composition Analysis — scanning third-party and open-source dependencies for known vulnerabilities and licence issues.

**Canonical question:** *"How are dependencies tracked and scanned? Tool, cadence, response process when CVEs are published in dependencies you use."*

**Evidence to look for:**

- SCA tool: Snyk, Dependabot, GitHub Advanced Security, Mend, Black Duck
- SBOM (Software Bill of Materials) generated and current
- Process for responding to new CVEs in dependencies
- Licence compliance posture (forbidden licences flagged)

**Common gaps:**
- Dependabot enabled with PRs piling up unmerged
- No SBOM
- "We'll update when something breaks"
- Licence scanning absent

**RAG criteria:**
- **Green:** Tool active; SBOM current; new CVEs triaged within an SLA; licence posture clean.
- **Amber:** Some scanning; response cadence inconsistent; SBOM stale.
- **Red:** No SCA; dependencies untracked; surprise CVEs hit production.

---

## Secrets Management

**Definition.** How credentials, keys, tokens, and other secrets are stored, distributed, rotated, and prevented from leaking into code or logs.

**Canonical question:** *"How are secrets managed? Storage, distribution to applications, rotation policy, detection of leaks in code, and recent secret incidents."*

**Evidence to look for:**

- Vault: HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager, Azure Key Vault, etc.
- Secrets injected at runtime, not built in
- Rotation policy per secret class
- Secret-scanning in CI (Gitleaks, TruffleHog, GitGuardian)
- Recent secret-incident response (if any)

**Common gaps:**
- Vault exists but not all secrets in it (env files, build configs)
- Rotation aspirational
- Secrets in repos discovered post-hoc by scanning
- Sharing via chat / email / sticky notes

**RAG criteria:**
- **Green:** Vault is canonical; rotation policy enforced; scanning in CI blocks merge; clean recent history.
- **Amber:** Some vaulting; rotation policy partial; scanning exists; old secrets still being cleaned.
- **Red:** Secrets in plain text in repos, configs, or chat; no rotation; no scanning.

---

## Security Training and Culture

**Definition.** The team's collective security literacy and the practices that maintain it — training, security champions, retro learnings, threat intel awareness.

**Canonical question:** *"What security training has the team had, when, and is security routinely on the team's agenda — or only when something breaks?"*

**Evidence to look for:**

- Recent training (within 12 months); type; coverage of team
- Security champion(s) named in the team
- Security topic in retrospectives or planning rituals
- Awareness of recent industry incidents and their implications
- Phishing-test or similar awareness exercises

**Common gaps:**
- Training was a one-off at hire and never refreshed
- "Security is the security team's job" framing
- No champions; security knowledge concentrated in one person
- Retros never discuss security
- Team unaware of recent industry events relevant to their stack

**RAG criteria:**
- **Green:** Training current; champions active; security on regular agenda; team can discuss recent industry incidents.
- **Amber:** Some training and engagement but inconsistent.
- **Red:** Stale training; no champions; security treated as someone else's problem.

---

## Compliance Regime Coverage (cross-check, not a sub-dimension)

For each regime declared in the charter's Compliance Regimes section:

- **GDPR / UK GDPR:** DPIA where required; processor agreements; data-flow mapping; subject-rights process; breach-notification path.
- **EU AI Act:** Risk classification (prohibited / high-risk / limited / minimal); if high-risk, conformity assessment, risk-management system, data-governance, transparency, human-oversight provisions in place; logging of operations.
- **HIPAA:** BAA in place; PHI handling controls; audit logs; breach-notification path.
- **PCI-DSS:** Scope confirmed; SAQ or RoC; segmentation if applicable; current QSA assessment.
- **SOC 2:** Type I or Type II report; control coverage; recent observation period.
- **ISO 27001:** Current certification; scope; recent surveillance audit.
- **NIST AI RMF:** Manage / Map / Measure / Govern functions referenced; documented application.
- **Sector-specific (FCA, FDA, FedRAMP, etc.):** named contacts; current status; obligations met.
- **Client-internal compliance:** named owner client-side; PDF engagement documents obligations.

**Lax-check behaviour (per design decision):**
- For each declared regime, look for evidence and/or ask the user.
- If no evidence located → status **WARNING**.
- WARNING does **not** automatically force AMBER / RED on the overall card.
- The warnings appear in the dedicated section and may also be offered as RAID risks (cross-skill offer).
- The user's overall RAG remains a judgement call.

This posture trades off enforcement strictness for usability. Aggressive enforcement was rejected on the basis that compliance is contextual; a regime declared in the charter may have evidence the user holds outside the engagement workspace (with the client, with Finance, with Legal), and a flat refusal would force the user to override constantly. The WARNING flag preserves the visibility without imposing the rating.

---

## Overall RAG rule

Same as the other Quinn workflows. Compliance warnings do **not** auto-demote.
