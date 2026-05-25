# SDLC evidence guide

Seven sub-dimensions. For each: definition, canonical interview question, evidence to look for (in artifacts where available), common gaps, RAG criteria.

The workflow walks these in order during `create` intent.

---

## Code Quality

**Definition.** The extent to which the codebase is readable, consistent, maintainable, and free of code smells that will compound into delivery friction.

**Canonical question:** *"How is code quality assessed and enforced today? Walk me through what gets flagged when, by whom, on what tooling, and what happens to the flag."*

**Evidence to look for:**
- Static analysis tool in CI (SonarQube, CodeClimate, language-specific linters)
- Defined quality gates that block merge or release
- Trend data: are quality metrics improving, stable, or degrading?
- Code review checklist that includes quality criteria
- Refactoring time explicitly budgeted in sprints

**Common gaps:**
- Static analysis present but warnings not enforced (everyone ignores the noise)
- Quality gates configured but routinely bypassed
- "Code quality is the responsibility of senior engineers" (== nobody)
- No agreed standard; quality is judged ad-hoc per reviewer

**RAG criteria:**
- **Green:** Tooling enforces standards in CI; warnings tracked over time; trend stable or improving; quality concerns are raised in retrospectives and acted on.
- **Amber:** Tooling exists but enforcement is patchy; trend unclear or slowly degrading; quality discussions happen but action is inconsistent.
- **Red:** No tooling, or tooling that everyone ignores; no agreed standard; codebase has known smell-clusters nobody owns.

---

## Unit Testing

**Definition.** Tests written by developers against units of code (functions, classes, modules), run on every commit / PR / build.

**Canonical question:** *"What's the unit-test discipline today? Coverage targets, what runs in CI, what blocks merge, who writes tests when, and how are flaky tests handled?"*

**Evidence to look for:**
- Coverage report in CI with a target and a trend
- Tests run on every commit / PR (not just nightly)
- Failing tests block merge
- Flaky test register or quarantine process
- New code requires accompanying tests (defined per team policy)

**Common gaps:**
- Coverage measured but no target; or target set but routinely missed
- Tests in CI but failures ignored ("known flaky", "we'll fix it later")
- New code lands without tests; coverage drifts down silently
- Test-pyramid imbalance (no unit tests, only e2e)

**RAG criteria:**
- **Green:** Target exists, met, tracked; flaky tests are tracked and resolved; new code has tests by default; CI failures block merge.
- **Amber:** Tests exist but enforcement is patchy; flaky tests accumulate; new code sometimes lands without tests.
- **Red:** Coverage low or unknown; many failing tests in CI ignored; flaky tests are the norm; testing is something the team will "get to later".

---

## Code Review

**Definition.** The practice of having other developers review code before merge, both for quality and for knowledge propagation.

**Canonical question:** *"How does code review work today? Who reviews what, by when, against what criteria, and what's the turnaround?"*

**Evidence to look for:**
- PR turnaround time (commit-to-merge) — typical, p95
- Average reviewers per PR
- Review checklist or PR template
- Evidence of substantive review comments (not just "LGTM")
- Specific reviewers consistently overloaded

**Common gaps:**
- Single-reviewer culture (no diversity of eyes)
- LGTM culture (no substantive review)
- PRs sit unreviewed for days, then get merged in haste
- "Architectural" PRs get a perfunctory review while "small" PRs get the same
- Senior engineers as bottlenecks

**RAG criteria:**
- **Green:** PRs reviewed within an agreed SLA; substantive comments are the norm; review load is distributed; specific criteria are checked (test evidence, NFRs, etc.).
- **Amber:** Reviews happen but quality varies; specific reviewers overloaded; SLA exists but is missed; some PRs land with cursory review.
- **Red:** Reviews are LGTM-pattern or skipped; no SLA; reviewer burnout visible; merges happen without genuine second-pair-of-eyes.

---

## Knowledge Sharing

**Definition.** The practices that ensure expertise doesn't concentrate in single individuals — pairing, documentation, brown-bags, rotation, ADRs.

**Canonical question:** *"What happens to engineering knowledge in this team? Who knows what, what's documented, how do new joiners get up to speed, and where is the team's knowledge most concentrated?"*

**Evidence to look for:**
- ADRs (Architecture Decision Records) live and current
- Onboarding documentation that recent joiners say worked
- Pairing or mobbing practice
- Regular brown-bag / knowledge-share sessions with documented topics
- Identified key-person risks and active rotation

**Common gaps:**
- "Tribal knowledge" concentrated in one or two engineers
- Documentation exists but is stale
- No ADRs (decisions live in chat history)
- Onboarding is "shadow X for a fortnight"
- Key-person risks acknowledged but no rotation plan

**RAG criteria:**
- **Green:** Knowledge is documented, current, and accessible; key-person risks are named and actively mitigated; onboarding has been validated by recent joiners.
- **Amber:** Some documentation, some knowledge-share practice, but concentrations remain; onboarding works but slowly.
- **Red:** Knowledge concentrated in a few individuals; documentation absent or stale; bus-factor of 1 on critical components.

---

## Technical Debt

**Definition.** The accumulated cost of past decisions that traded long-term maintainability for short-term delivery — and the team's posture on tracking, paying down, and avoiding adding to it.

**Canonical question:** *"How is technical debt tracked and paid down today? Where is the worst of it concentrated, who owns reducing it, and is there budget for paying it down?"*

**Evidence to look for:**
- Debt register or backlog with explicit "tech debt" labelling
- Refactoring time explicitly budgeted (e.g. 20% of sprint capacity)
- Trend: is debt growing, stable, or shrinking?
- Debt items have business impact attached (not just "this code is ugly")
- Tech-lead acknowledgement of where the worst debt sits

**Common gaps:**
- No register; debt lives in people's heads
- "We'll pay it down next quarter" indefinitely
- Refactoring time exists in theory but is sacrificed first when scope grows
- Debt items are vague ("clean up X service") rather than scoped
- Big-bang refactor proposals (rarely happen, often misfire)

**RAG criteria:**
- **Green:** Register live; trend visible; budgeted time consistently allocated and used; specific debt items with named impact are being paid down each sprint.
- **Amber:** Some tracking; some refactoring; budgeted time is often sacrificed; trend is stable but not improving.
- **Red:** No register; debt accumulating visibly; team conversations are about how bad it is rather than how to chip away at it.

---

## Branching Strategy

**Definition.** The git workflow — how branches are created, named, merged, and released — and whether it matches the engagement's release cadence.

**Canonical question:** *"What's the branching strategy today? When does a feature branch live, what's the merge path, what gets tagged for release, and how do hotfixes flow?"*

**Evidence to look for:**
- Documented branching strategy (trunk-based, GitFlow, GitHub-Flow, etc.)
- PR template referencing it
- Merge times (long-lived branches are a smell)
- Release tags and process
- Hotfix path tested

**Common gaps:**
- Strategy exists in the tech lead's head, not in writing
- Long-lived feature branches that diverge from main
- Merge conflicts a regular standup topic
- Hotfix process untested
- Strategy doesn't match release cadence (e.g. GitFlow on a continuous-deploy product)

**RAG criteria:**
- **Green:** Strategy documented and followed; merge times short; release process clean; hotfix path proven.
- **Amber:** Strategy exists but consistency is patchy; some long-lived branches; hotfix process exists but rarely tested.
- **Red:** No strategy or one that doesn't match cadence; long-lived branches the norm; merge friction is a daily cost; releases are stressful.

---

## Striving for Excellence

**Definition.** The cultural posture — does the team treat its own quality as something to keep raising, or has it settled into "good enough"? Visible in retrospectives, in proactive improvements, in the rate at which the bar moves.

**Canonical question:** *"What evidence is there that this team is actively raising the bar — not just maintaining it? Where in the last quarter did the team improve a practice without being asked?"*

**Evidence to look for:**
- Retrospective actions that result in process changes
- Team-led improvements (new tools, new practices, new standards)
- Engineers reading and sharing industry practice
- Visible interest in why other teams do things differently
- Periodic external benchmarking

**Common gaps:**
- Retrospectives where the same issues recur
- "Good enough" framing in conversations
- No team-led improvements in the last quarter
- Improvements only happen when imposed (from CTO, from delivery, from outside)
- Insularity — no awareness of how peers solve similar problems

**RAG criteria:**
- **Green:** Visible cadence of team-led improvements; retrospectives drive action; external benchmarking happens periodically; engineers express dissatisfaction with the status quo in constructive ways.
- **Amber:** Some improvement happening but mostly when prompted; "good enough" comments creeping into retrospectives.
- **Red:** No team-led improvement in the period; resignation in retrospectives; "this is just how we work here".

---

## Overall RAG rule

Default: **overall = worst of sub-dimensions.** A RED sub-dimension means RED overall.

**Override is allowed but must be justified.** Example: one sub-dimension is RED but mitigations are in flight with a named owner and a 4-week deadline; the user judges overall as AMBER. The justification appears in the "Overall judgement" section of the card.

The workflow refuses a GREEN overall with **any** sub-dimension at AMBER+ without an explicit justification. (This is rare — usually it's the AMBER+ sub-dimension that pulls the overall down.)
