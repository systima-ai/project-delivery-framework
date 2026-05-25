# Red-team checks library

Per-artifact-type check sets, consolidating the inline cynical-review questions previously embedded in individual workflows. Each artifact type has three blocks: Cynical, Edge-case, Acceptance.

Generic checks (apply to anything not specifically listed) appear at the bottom.

---

## `weekly-status` (Ronan)

**Cynical:**
- Where is this dishonestly optimistic about something the team knows is slipping?
- Which "Asks" are buried instead of clearly stated?
- Does the headline accurately survive being read alone?
- Are decisions cited without the necessary context for a stakeholder to validate them?

**Edge-case:**
- If this week's planned items had all happened, what would still be uncomfortable to write here?
- What did the team discuss that didn't make it into the status?
- Are there unstated assumptions about next week that, if wrong, change the picture?

**Acceptance:**
- All sections per the canonical template?
- Headline ≤ 25 words?
- Status colour matches narrative?
- No table-based body content (Teams/Slack paste-friendliness)?

---

## `steering-pack` (Helena)

**Cynical:**
- Would a sceptical CFO read this and ask "what's missing?"
- Are there risk movements not surfaced in slide 7?
- Is the headline status (slide 2) consistent with the detail in slides 5–11?
- Are the decisions sought (slide 3) genuinely needing this forum, or could they be made elsewhere?

**Edge-case:**
- What happens at this steering if the recipient pre-reads only slides 1–3?
- What does the steering committee NOT see that they would expect to?
- Which assumption in the forward look would be challenged most credibly?

**Acceptance:**
- All 14 canonical slides present?
- Every cited risk / decision / CR has a working file path?
- Speaker notes per slide?

---

## `exec-summary` (Helena)

**Cynical:**
- Where is this dishonestly optimistic?
- Where is the implicit ask buried instead of stated?
- Which sentence would a CFO mark in red?
- Is "What's not" honest, or sanitised?

**Edge-case:**
- If this is the only thing the exec reads this month, what do they miss?
- If a follow-up question lands tomorrow ("what about X?"), is the answer in this doc?

**Acceptance:**
- Body word count ≤ 500?
- All canonical sections (or explicit "None at this time")?
- Forward look ≤ 80 words?
- "What's not" non-empty?

---

## `stakeholder-update` (Helena, per archetype)

**Cynical (per archetype — see `pdf-write-stakeholder-update/references/audience-profiles.md`):**

Each archetype has its own cynical questions. Examples:
- **CIO:** Where am I burying an architectural decision this CIO would want to know?
- **CFO:** Have I cited an actual variance figure, or hidden it in narrative?
- **CTO:** Where am I dressing up a tech-debt acceptance as a delivery win?
- **COO:** Have I quantified the change-management ask, or hand-waved it?
- **Client-PM:** Have I escalated to their boss without telling them first?
- **Engineering-Lead:** Did I take credit for an engineering win without naming the team?
- **Legal-Compliance:** Did we change a data flow this period? Did I say so?
- **Board-NED:** Would a board member feel they'd been told late?
- **Executive-Sponsor:** Is there anything in this update that someone else will raise to them before I do?

**Edge-case:**
- If this archetype hears the same news from another channel before reading this, do they feel ambushed?
- Does the lead-with content match the archetype's actual concerns, or our assumptions about them?

**Acceptance:**
- One audience per artifact (no shared lead-with across archetypes)?
- "What we need from you" entries: ask + why + by-when?
- All claims trace to source artifacts?

---

## `escalation-memo` (Helena)

**Cynical:**
- Is the question genuinely the recipient's question, or mine?
- Is the recommendation honest, or self-serving?
- Would a reasonable recipient feel ambushed by this memo?
- Is the deadline real, or arbitrary?
- Is there blame language? Hedging that obscures the recommendation?

**Edge-case:**
- If the recipient says "no" to the recommendation, what's the next move?
- If "yes", what could go wrong that the memo hasn't named?
- If the recipient asks "why are you telling me, not [other person]?", is the answer in the routing?

**Acceptance:**
- All four SCQA sections?
- Single named recipient?
- Real deadline?
- All four Answer fields (recommendation, decision-needed, deadline, without-decision-consequence)?
- Tone-check pass?

---

## `change-request` (Klaus)

**Cynical:**
- Is there a dimension I called "none" that an approver would dispute?
- Is the "do not make this change" option honestly costed?
- Is the recommended option self-serving for the delivery team?
- Is the approver routing correct per the governance plan?

**Edge-case:**
- What happens if the CR is approved but slowly (e.g. 4 weeks of in-review)?
- What second-order changes does this CR trigger that aren't named here?
- If this CR is rejected, what plan B exists?

**Acceptance:**
- All four granular dimensions assessed?
- Inference to classic taxonomy consistent?
- At least two options + "do not make this change"?
- Recommendation names trade-off?

---

## `change-order` (Theo)

**Cynical:**
- Is every commercial dimension of the underlying CR priced explicitly?
- Is the "Net change to baseline" honestly computed including run-rate effects?
- Are pass-through costs separated from your margin?
- Does the effective-from date align with when work actually starts?
- Are both signatories named and contactable?

**Edge-case:**
- If signature is delayed by 2 weeks, what's the impact on the in-flight work this CO covers?
- If the client redlines a commercial term, which is your fallback position?
- What happens to this CO if the underlying engagement is paused or terminated?

**Acceptance:**
- Linked to a real CR with commercial dimension ≥ minor?
- Pricing table reconciles?
- All required milestone schedule changes documented?
- Both signatories named?

---

## `rom-estimate` (Sofia)

**Cynical:**
- Which assumption hides a big cost we haven't sized?
- Is contingency real or theatre? At feasibility stage, < 20% contingency is suspicious.
- Are we anchoring on the client's reference numbers rather than our build-up?
- Would we squirm if asked to deliver at the low end of the operating range?
- Is there a hidden assumption about access (data, people, systems) we haven't surfaced?

**Edge-case:**
- If the engagement turns out to be 2x our cone-stage estimate, what's the most likely cause?
- What happens to this estimate if pass-through costs come in 50% over?
- If the cone is wider than usual, what specific uncertainty justifies that?

**Acceptance:**
- Cone stage named?
- Operating range matches cone factors?
- Contingency transparent and named?
- At least 3 assumptions with sensitivity sizing?

---

## `sow-draft` (Sofia)

**Cynical (the framework's most thorough — six questions):**
- Which clause would the most adversarial client lawyer challenge?
- Which acceptance criterion would devolve into argument?
- Where am I assuming we can renegotiate later that I should fix now?
- Which assumption is sized but not commercially protected?
- Where am I being deliberately vague to close the deal — and is the vagueness defensible?
- Is the change-control process tight enough to prevent scope creep without becoming a battle?

**Edge-case:**
- If the client doubles a non-priced dependency, what does the SoW say?
- If a milestone is half-delivered, how does the SoW handle partial payment?
- If we lose a key team member mid-engagement, which SoW clause covers it?

**Acceptance:**
- All shape-document assumptions appear in §10?
- All top-5 risks have either contractual protection or RAID entry?
- Acceptance criteria objectively testable?
- Change-control process named and tight?
- Reviewer notes per section?

---

## `case-study` (public variant — Felix)

**Cynical:**
- Would the client recognise themselves uncomfortably? If yes, redact more.
- Is the "approach" section honest, or polished beyond what was true?
- Are any results overstated or attribution-unclear?
- Is there a "you should call me about this" hook?
- Would the client sponsor be happy to be quoted endorsing this version?

**Edge-case:**
- Are there industry-unique signals (numbers, locations, tools) that identify the client even with name removed?
- If a competitor reads this case study, what do they learn about how to attack the next opportunity?

**Acceptance:**
- Client consent status agreed?
- No specific client name?
- No individual names (roles only)?
- Specific financials replaced with ranges?

---

## `kickoff-deck` (Marcus)

**Cynical:**
- Are slides 1–3 (title, scope, success criteria) consistent with the charter — verbatim or near-verbatim?
- Is the kickoff slide for "Risks we're already watching" honest about the engagement's known risks, or sanitised?
- Are the "Asks" specific and named, or generic ("we'll need close client involvement")?

**Edge-case:**
- If the client team reads only the appendix, do they get the right picture?
- Does the deck handle the question "what could derail this"?

**Acceptance:**
- All 14 canonical slides?
- Every slide traces to a source artifact?
- Appendices link to full versions?

---

## Generic (any artifact not listed above)

**Cynical:**
- Where is this dishonestly optimistic?
- Where is the implicit ask or commitment buried?
- Which paragraph would a sceptical reader challenge first?
- Is the headline honest about the body?

**Edge-case:**
- What boundary condition or unstated assumption breaks this?
- If this is the only artifact the reader sees, what crucial context are they missing?
- If the artifact is misread, what's the worst-case interpretation?

**Acceptance:**
- Frontmatter complete?
- All sections per the workflow's canonical structure?
- Cross-references resolve?

---

## Severity guidance

- **High:** the artifact should not leave the user's machine until this is addressed. Reputational, commercial, or audit risk if unresolved.
- **Medium:** material; worth addressing before send but artifact remains defensible if not.
- **Low:** stylistic, polish, or marginal-improvement findings.

Default: any high severity finding blocks `red_teamed: true` until resolved.
