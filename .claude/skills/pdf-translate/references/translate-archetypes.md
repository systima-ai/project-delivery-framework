# Translation archetypes

Twelve archetypes supported. Nine are "audience-up" (writing for a more senior or differently-shaped reader); three are peer-role translations (sideways across the team or the engagement).

For each: leads-with, re-language patterns, what to background, what NOT to lose.

The audience-up nine share their full profiles with `pdf-write-stakeholder-update/references/audience-profiles.md`. This file repeats the headline framing here so this workflow stays self-contained; for the deep "cares about / reacts badly to" detail, defer to the audience-profiles file.

---

## Audience-up archetypes (9)

(Headline framing only — full profiles in audience-profiles.md.)

### CIO

- **Leads with:** risk posture and architectural impact
- **Re-language:** acronyms expanded where ambiguous; technical specifics framed as risk implications
- **Background:** implementation detail; tooling specifics

### CTO

- **Leads with:** a specific technical-quality signal (metric, decision, gate outcome)
- **Re-language:** delivery framing → engineering framing; team-shape → engineering-shape
- **Background:** governance ceremony

### CFO

- **Leads with:** a number with variance from baseline and a one-line cause
- **Re-language:** strip adjective inflation; use numbers and ranges, not "good progress"
- **Background:** technical specifics; team morale framing

### COO

- **Leads with:** operational impact this period and readiness for the next milestone
- **Re-language:** technical-team framing → business-side framing; deliver → adopt
- **Background:** engineering specifics

### Client-PM

- **Leads with:** reconciliation — "here's what I've told my team, your team should hear the same"
- **Re-language:** consistency with the joint working surface
- **Background:** above-the-line politics

### Engineering-Lead

- **Leads with:** engineering wins, blockers, decisions needed
- **Re-language:** delivery framing → engineering framing; specifically credits the team
- **Background:** commercial framing; client politics

### Legal-Compliance

- **Leads with:** compliance posture against declared regimes; any new data-flow or third-party
- **Re-language:** technical → regulatory; capabilities → obligations
- **Background:** team dynamics; engineering practice

### Board-NED

- **Leads with:** one-line answer to "is this engagement delivering what the case for change promised"
- **Re-language:** operational detail → strategic posture; tactics → trajectory
- **Background:** anything operational

### Executive-Sponsor

- **Leads with:** what only they can decide; where they need to spend political capital
- **Re-language:** information they should hear from you before others
- **Background:** routine status

---

## Peer (lateral) archetypes (3)

### Commercial-Lead

The commercial counterpart in your firm — accounts, sales, partner.

**Leads with:** commercial implications. Margin, scope expansion, renewal signal, reference-readiness.

**Re-language:** delivery jargon → commercial outcomes. "RAID is amber on capacity" → "team-headcount risk could affect Q3 invoicing".

**Background:** delivery-internal practices.

**What NOT to lose:** any commercial risk that the delivery team currently absorbs informally — the commercial lead needs to see it.

### Product-Lead

The product manager / owner on the client side or the engagement.

**Leads with:** what's shipped, what's discovered, what changed about the user / customer hypothesis.

**Re-language:** delivery framing → outcome framing; sprint mechanics → user impact.

**Background:** team mechanics; commercial framing.

**What NOT to lose:** discoveries that should change the roadmap, even if they're inconvenient.

### Engineer

A specific engineer on the team — usually for context-setting, sometimes for getting their input.

**Leads with:** the specific technical situation, the decision-shape, the open question.

**Re-language:** governance language → engineering decision-language; status framing → technical-options framing.

**Background:** ceremony, client politics, commercial.

**What NOT to lose:** the actual technical question or constraint that needs their judgement.

---

## Cross-cutting translation rules

### Re-ordering, not re-writing

Translation re-orders and re-frames; it does not invent new content. The substance check in `pdf-translate` enforces this.

### Mistranslation that softens bad news

The most dangerous translation failure is making a hard truth ambiguous in the translated version. Examples:

- Source: "we're 3 weeks behind on the integration workstream"
- Mistranslation (for a CFO): "integration is progressing carefully"
- Honest translation (for a CFO): "integration is 3 weeks behind, which puts £40k of Q3 invoicing at risk"

The workflow refuses to soften. If the user requests softer framing, the workflow asks: *"Should the substance change, or should this be a stakeholder-update / sponsor-conversation that handles the message differently rather than translating it differently?"*

### Translation is not summarisation

A translation preserves the same claim count and intent. If the source has three substantive claims, the translation has the same three. If the user wants a shorter version, that's not a translation — that's `pdf-write-exec-summary` (for execs) or a different summarisation tool.

### When to use peer vs audience-up

- **Audience-up** when writing for someone above your day-to-day operational level.
- **Peer** when collaborating with someone alongside you whose specialty needs a different framing — most often when handing off a partial artifact for them to extend.

---

## Adding custom archetypes

If a target audience isn't in the list, the workflow asks the user to supply a one-paragraph profile:

- **Cares about:** ...
- **Reacts badly to:** ...
- **Lead with:** ...

This profile is used for the translation but **not persisted** across sessions unless the user explicitly writes it to the engagement's `.pdf-config.toml` as a custom archetype.
