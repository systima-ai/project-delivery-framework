# Charter field guide

One canonical question per section. The workflow asks these in order during `create` intent. During `update`, use the same questions scoped to the affected section.

## Scope

**Canonical question:** *"In one paragraph, what is this engagement delivering — and what is explicitly out of scope?"*

Follow-up if the answer is vague:
- *"What's the smallest version of this engagement you'd still call a success?"*
- *"What have you been asked to do that you've pushed back on as out of scope?"*

Acceptance criteria for the field:
- Includes at least one concrete deliverable
- Includes at least one explicit out-of-scope item
- Length 50–250 words

## Stakeholders

**Canonical question:** *"Name the people whose decisions or approvals this engagement depends on, with their role and organisation."*

Follow-up:
- *"Who is the executive sponsor on the client side? On your side?"*
- *"Who can stop this engagement? Who can change its scope?"*

Acceptance criteria:
- Executive sponsor named (client side)
- Day-to-day client lead named
- At least one named contact per discipline you're delivering (e.g. tech lead, security, procurement)

Detail goes into `STAKEHOLDERS.md`. The charter section is the summary list.

## Success Criteria

**Canonical question:** *"How will the steering committee judge this engagement a success, in measurable terms?"*

Follow-up:
- *"What's the metric, the target value, and the time horizon?"*
- *"What would 'partial success' look like — is there a fallback definition?"*

Acceptance criteria:
- At least two measurable criteria
- Each has a target value and a time horizon
- At least one is a business-outcome metric, not a delivery-output metric

## Governance Cadence

**Canonical question:** *"What's the steering cadence, and what's the slowest decision you can tolerate?"*

Follow-up:
- *"Who chairs each forum?"*
- *"What decisions belong at each forum?"*

Acceptance criteria:
- Steering cadence is named
- At least one escalation forum or person is named
- Decision latency is bounded

Detail goes into `GOVERNANCE.md`. The charter section is the summary.

## Escalation Paths

**Canonical question:** *"When something is going wrong, who do you call, and how long do they have to respond?"*

Follow-up:
- *"What's the trigger that escalates beyond the day-to-day team?"*
- *"What's the trigger that escalates to executive sponsors?"*

Acceptance criteria:
- At least two escalation levels (e.g. tactical, executive)
- Named individuals at each level
- Response-time expectation at each level

## Exit Criteria

**Canonical question:** *"What does 'done' look like in concrete, verifiable terms — and what would constitute a premature exit?"*

Follow-up:
- *"What gets signed off? By whom?"*
- *"If the engagement ends early, what's the orderly-exit obligation?"*

Acceptance criteria:
- Named acceptance gates
- Named approver(s)
- Premature-exit handling stated

## Constraints and Assumptions

**Canonical question:** *"What are you assuming will be true, and what hard constraints are you working under?"*

Follow-up:
- *"What would invalidate your plan if it turned out to be false?"*
- *"Budget, time, technology, organisational — call out each."*

Acceptance criteria:
- At least three assumptions
- At least one constraint per dimension (budget / time / technology / organisational / regulatory)
- Each assumption has an implicit owner

## Compliance Regimes

**Canonical question:** *"What regulatory regimes apply to this engagement?"*

Prompt list to walk through:
- Data protection: GDPR / UK GDPR / state-level US / other
- Security: SOC 2 / ISO 27001 / NIST
- Industry: HIPAA / PCI-DSS / FedRAMP / FINRA / MAS
- AI-specific: EU AI Act / NIST AI RMF / sector-specific guidance
- Client-internal regimes

Acceptance criteria:
- Each regime applies-or-not is explicit (no "TBC" rows)
- For each "applies", the engagement-level implication is named (e.g. "DPIA required before processing", "AI Act high-risk classification — conformity assessment needed")

If any AI-related regime applies, flag this for `pdf-secure-sdlc-health` (Quinn) at quality-gate time.
