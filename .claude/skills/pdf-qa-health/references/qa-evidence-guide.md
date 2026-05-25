# QA evidence guide

Five sub-dimensions. Same shape per entry as `pdf-sdlc-health/references/sdlc-evidence-guide.md`: definition, canonical question, evidence to look for, common gaps, RAG criteria.

---

## Test Case Management

**Definition.** How test cases are authored, organised, traced to requirements, and maintained over time.

**Canonical question:** *"Where do test cases live, how are they traced to requirements or user stories, who owns them, and how often are they reviewed for accuracy?"*

**Evidence to look for:**
- Test-management tool with current, traceable cases (TestRail, Zephyr, Xray, etc.)
- Traceability matrix from requirement → test case → test run → defect
- Defined ownership per area
- Periodic review / cull of obsolete cases

**Common gaps:**
- Tests live in spreadsheets that nobody updates
- Traceability absent or theoretical
- No periodic review; obsolete cases accumulate
- No ownership; defect leakage attributed to "missing test coverage" without anyone responsible for fixing it

**RAG criteria:**
- **Green:** Tool live; traceability working; owners named; recent review evidence.
- **Amber:** Tool exists but traceability patchy; reviews infrequent; some owners unclear.
- **Red:** No tool or tool unused; no traceability; no review cadence.

---

## Defect Management

**Definition.** The triage, prioritisation, ageing, and closure discipline around defects.

**Canonical question:** *"Walk me through defect flow today. Trends in open count, ageing, severity distribution, defect-leakage rate, and the process for triage and prioritisation."*

**Evidence to look for:**
- Defect tracking tool with severity / priority / age / status
- Trend reporting (weekly or sprint cadence)
- Defined SLAs per severity for triage and fix
- Defect-leakage rate (defects found in prod vs pre-prod)
- Root-cause analysis on highest-severity defects

**Common gaps:**
- Open-defect count tracked but ageing and severity not
- "Triage meeting" exists but doesn't change priorities
- High-severity defects sit at the top of the backlog for weeks
- Leakage rate not measured; defects in prod surprise the team
- No RCA on critical defects

**RAG criteria:**
- **Green:** Trends visible, ageing tracked, SLAs met, leakage trending down, RCA performed on critical defects with actions tracked.
- **Amber:** Triage happens but discipline patchy; some SLA misses; leakage stable or unclear.
- **Red:** Defect count growing or unknown; ageing not tracked; SLAs aspirational; leakage normalised.

---

## NFR Testing

**Definition.** Non-functional requirements testing — performance, scalability, security, accessibility, reliability, observability, etc. — distinct from feature testing.

**Canonical question:** *"What NFRs has this engagement committed to, how are they tested, and what's the current performance against each?"*

**Evidence to look for:**
- NFRs declared in the charter or in a separate NFR doc
- Test plan covering each declared NFR
- Most recent test results per NFR
- Performance trend over time
- Specific tooling: load test (k6, JMeter, Gatling), accessibility (axe), security (covered in `pdf-secure-sdlc-health`)

**Common gaps:**
- NFRs not declared explicitly anywhere ("we'll test performance when we get there")
- NFRs declared but no test plan ("the team understands them")
- One-off NFR tests at the end of a phase, with no trend
- Accessibility omitted entirely
- Observability framed as devops concern, not QA

**RAG criteria:**
- **Green:** NFRs declared and tested with trends; latest results meet thresholds; tooling proven.
- **Amber:** Some NFRs tested, others assumed; trends spotty; some thresholds not met but recoverable.
- **Red:** NFRs not declared or not tested; production performance is a surprise on go-live.

---

## QA Metrics

**Definition.** The measurement layer for QA itself — what gets measured, how it's reported, and whether the metrics drive decisions.

**Canonical question:** *"What QA metrics are reported regularly, to whom, and what decisions do they drive?"*

**Evidence to look for:**
- Defined metric set (coverage, defect density, defect-leakage rate, test execution time, automation coverage trend, etc.)
- Regular reporting (per sprint, per release)
- Metrics drive named decisions (e.g. "we paused release because coverage dropped below 70%")
- Metrics visible to delivery and engineering leads, not just QA

**Common gaps:**
- "We track coverage" — and nothing else
- Metrics reported but never referenced in decisions
- QA reports only seen by QA
- Metrics drift over time without anyone noticing
- Goodhart's-law metrics (coverage gamed by trivial tests)

**RAG criteria:**
- **Green:** Multi-dimensional metric set; reported regularly; decisions trace to metrics; awareness across roles.
- **Amber:** Some metrics tracked and reported but action is patchy; awareness limited.
- **Red:** Metrics absent or vanity-only; QA black-boxed from broader visibility.

---

## Automated Testing

**Definition.** The state of test automation across unit, integration, and end-to-end layers — coverage, reliability, runtime, and trend.

**Canonical question:** *"What's automated, at what layer, how reliable is it, how long does it take to run, and is automation coverage growing or shrinking?"*

**Evidence to look for:**
- Coverage by layer (unit / integration / e2e — pyramid shape)
- Reliability: flake rate < 5%, ideally
- Total runtime: minutes for unit, sub-hour for full e2e
- Coverage trend over the last 3 months
- New code accompanied by automation (defined per policy)

**Common gaps:**
- Inverted pyramid (lots of e2e, few units) — slow, flaky, expensive
- Flaky tests routinely re-run rather than fixed
- Runtime growing without anyone owning the reduction
- New features without accompanying tests
- "Automation team" separate from the dev team (anti-pattern)

**RAG criteria:**
- **Green:** Pyramid-shaped coverage; low flake rate; bounded runtime; trend improving; new code tested by default.
- **Amber:** Coverage exists but pyramid is unhealthy; flake rate annoying but managed; runtime accepted as long.
- **Red:** Automation thin or wrong-shaped; flake rate untracked; tests routinely disabled; "we'll automate later".

---

## Overall RAG rule

Same as SDLC: overall = worst of sub-dimensions unless explicitly justified.
