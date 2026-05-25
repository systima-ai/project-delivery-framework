# Audience profiles for stakeholder-update

Nine canonical archetypes. Each has four blocks: **cares about**, **reacts badly to**, **lead with**, **red-team prompts**. The workflow uses these to shape the lead-with section and the per-file cynical review.

These are starting templates. Override in the engagement's `.pdf-config.toml` to tune for specific stakeholders (e.g. "This client's CIO is unusually risk-tolerant; lead with delivery pace not security posture").

---

## CIO

**Cares about:** Risk to estate. Security posture. Vendor / sub-contractor exposure. Architectural debt being created or paid down. Operational continuity. Compliance with internal IT policy.

**Reacts badly to:** Surprises. Shadow-IT smells. Anything that sounds like "we're building it our way". Unmitigated risk left in the open. Architecture decisions made without their consultation.

**Lead with:** Risk posture and architectural impact. State whether the period created new risk or paid existing risk down.

**Red-team prompts:**
- *Where am I burying an architectural decision the CIO would want to know about?*
- *Which risk movement would they read as escalating without my saying so?*
- *Is there a vendor / third-party exposure I should be naming?*

---

## CTO

**Cares about:** Technical quality. Engineering velocity and morale. Long-term maintainability. Hiring signal (good engineers want to stay). Specific technology bets. Build vs buy calls.

**Reacts badly to:** Quality compromises smuggled past as scope choices. Vague engineering claims. Tech-debt framing that minimises it. Hiring drag.

**Lead with:** A specific technical-quality signal — a metric, a concrete decision, or a quality-gate outcome.

**Red-team prompts:**
- *Where am I dressing up a tech-debt acceptance as a delivery win?*
- *Did a quality gate get waived this period? Did I say so?*
- *Is there a build/buy call I'm avoiding stating?*

---

## CFO

**Cares about:** Burn vs baseline. Margin trajectory. Forecast accuracy. Cash-flow timing of milestones and invoices. Variance from budget. Commercial-model fit.

**Reacts badly to:** Adjective-padded financial language. "On track" without numbers. Surprises in next invoice. Optimistic forecasts that have been re-baselined three times. Lack of variance explanation.

**Lead with:** A number, with the variance from baseline, with one cause line.

**Red-team prompts:**
- *Have I cited an actual variance figure, or hidden it in narrative?*
- *Did the forecast slip and was it explicitly stated?*
- *Is there a cash-flow timing change in the next 30 days they should know about?*

---

## COO

**Cares about:** Operational impact on the business — current and post-go-live. Change management for end-users. SLA / availability implications. Cross-functional coordination cost. Risk to ongoing operations.

**Reacts badly to:** Tech-team framing that ignores the business side. "It'll be fine when we go live" without ops readiness evidence. Hidden change-management cost.

**Lead with:** Operational impact this period and operational readiness for the next milestone.

**Red-team prompts:**
- *Whose day-to-day work changes because of what we shipped this period?*
- *Have I quantified the change-management ask, or hand-waved it?*
- *Is the go-live readiness signal honest, or aspirational?*

---

## Client-PM

**Cares about:** Coordination across their team and ours. Day-to-day delivery rhythm. Their own credibility with their stakeholders. Whether you make their life easier or harder. Handover artifact quality.

**Reacts badly to:** Going around them to their stakeholders. Missed commitments. Last-minute escalations that should have been flagged earlier. Status that contradicts what they've been telling their own team.

**Lead with:** A reconciliation — "here's what I've told my team, your team should hear the same."

**Red-team prompts:**
- *Have I escalated something to their boss that I didn't tell them first?*
- *Is my version of this week's reality consistent with theirs?*
- *Did I make their job easier this period? Said so?*

---

## Engineering-Lead

**Cares about:** Technical decisions, scope clarity, blockers, team load, vendor / external dependency drag. Whether they're being heard. Tools and CI working.

**Reacts badly to:** Status reports that minimise engineering effort. Decisions being made above their head without consultation. Vague "team is doing great" framing. Scope changes filtered through commercial layers.

**Lead with:** Engineering wins, engineering blockers, engineering decisions needed.

**Red-team prompts:**
- *Did I take credit for an engineering win without naming the team?*
- *Is there a scope change they need to know about that I'm filtering?*
- *Did I downplay a tooling / CI blocker?*

---

## Legal-Compliance

**Cares about:** Compliance regimes declared in the charter (GDPR, HIPAA, PCI, EU AI Act, SOC 2, etc.). Contract obligations. Data-handling practices. Audit-trail integrity. Third-party / sub-processor risk.

**Reacts badly to:** Compliance regimes treated as "we'll handle it" rather than enumerated. Data-handling decisions buried in technical discussion. Audit-trail gaps. Contracts not being re-read when scope shifts.

**Lead with:** Compliance posture against the charter regimes; any new data-flow or third-party introduced this period; any audit-trail event worth noting.

**Red-team prompts:**
- *Did we change a data flow this period? Did I say so?*
- *Was a new sub-processor introduced? Logged?*
- *Did anything happen this period that affects the charter's compliance regimes?*

---

## Board-NED

**Cares about:** Strategic alignment to the original case for change. Risk posture at the highest level. Reputational exposure. Whether the engagement is producing the business outcome promised. Bad news told early.

**Reacts badly to:** Operational detail. Tactical framing. Information-asymmetry signals (knowing things have been kept from them). Surprises in the boardroom.

**Lead with:** The one-line answer to "is this engagement delivering what the case for change promised?"

**Red-team prompts:**
- *Would a board member feel they'd been told late if they read this?*
- *Have I conflated operational status with strategic posture?*
- *Is the reputational signal in the boardroom going to match what's in this document?*

---

## Executive-Sponsor

**Cares about:** Their bet paying off. Your credibility (which is theirs). Specific decisions only they can make. Where you need air cover. Whether they need to escalate to peers or to their own boss.

**Reacts badly to:** Wasting their political capital on routine asks. Surprises in their 1:1 with the CEO. Vague asks. Information they should have heard from you first arriving from someone else.

**Lead with:** What only they can decide; where they need to spend political capital; what they should hear from you before others raise it.

**Red-team prompts:**
- *Is there anything in this update that someone else will raise to them before I do?*
- *Have I made specific asks, or vague ones?*
- *Where do they need air cover I haven't named?*
