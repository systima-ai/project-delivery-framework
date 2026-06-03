# Transcript-cleaning guide

The method and the canonical output format for `pdf-clean-transcript`.

---

## Principle: faithful, not fluent

The job is to make a machine transcript *readable and trustworthy*, not polished or shorter. Three rules override everything else:

1. **Preserve substance.** Every turn's meaning survives. Cleaning removes noise (timestamps, "um", false starts, duplicated phrases), not content.
2. **Make inference visible.** Anything you inferred — who spoke, what a garbled word was — is declared in the Editor's notes or marked inline.
3. **When unsure, mark it.** A confident-sounding rewrite of an ambiguous phrase is the worst outcome. Use `[?]` for uncertain tokens and `[inaudible]` for lost audio.

---

## The normalisation method

Machine transcripts reliably mangle proper nouns, product names, acronyms and jargon. For each suspected mis-hearing:

- **Correct only when the intended term is unambiguous from context.** Repeated phonetic variants of the same word that clearly point to one term (e.g. a company name said many times) can be normalised confidently. Record every correction as `heard → corrected`.
- **If the term is plausible but unconfirmed** (a person's surname, a vendor you can't verify, a number), keep your best guess and append `[?]`.
- **If the audio was lost**, write `[inaudible]` — never fill the gap from imagination.

Common categories to watch: organisation and product names, people's names, acronyms, framework/tool names, dates and figures, and any domain-specific terminology.

---

## The `[?]` convention

`[?]` is the framework-wide **unconfirmed-token marker** (see `ARCHITECTURE.md` §8.1). It sits immediately after the token it qualifies:

```
We work a lot with NorthVendor [?] on the data side.
... the second co-lead, Jordan [?], owns the technical design.
```

Every `[?]` in the body must have a matching line in the Editor's notes "uncertain items" list, so the reader has one place to see what still needs confirming. `pdf-elicit` can later walk these markers and clear them; on confirmation, the marker is removed and the item moves to the normalised-terms list (via the `update` intent).

---

## Canonical output format

```markdown
# <Call type> — <Engagement / context>

**Date:** <date, time, timezone if known>
**Participants:**
- **<Label>** — <Name>, <org / role> (<any locating detail>)
- **<Label>** — <Name>, <org / role>
- ...

---

## Editor's notes

This is a cleaned-up version of an unlabelled, machine-generated transcript. Speech-to-text artefacts, false starts and obvious filler have been removed; the substance of each turn is preserved. Please treat the following as inferred or uncertain:

- **Speaker attribution is inferred.** <State the basis — roster mapping, or context inference if the source was undiarised. Name the least-certain stretches.>
- **Terms normalised** from clear mis-hearings: **<corrected>** (heard as "<variant>", "<variant>"); **<corrected>** (heard as "<variant>"); ... Acronyms standardised: <list>.
- **Uncertain items flagged inline with `[?]`:** <item> (<why uncertain>); <item> (<why uncertain>); ...

---

## Transcript

**<Label>:** <cleaned turn>

**<Label>:** <cleaned turn>

...

---

*Cleaned <date> from `<source path or "pasted text">`. Speaker labels <inferred|from roster> — see Editor's notes.*
```

### Notes on the format

- **Omit a caveat bullet only if it genuinely does not apply.** If the source was already diarised with reliable labels, say so instead of claiming inference. If no terms needed correcting, say "no term normalisation was required".
- **Long calls** may be split into labelled parts (e.g. `### Part 1 — intro`, `### Part 2 — one-to-one`) when participants join or leave, or the conversation changes mode. Keep speaker labels consistent across parts.
- **Provenance footer is mandatory.** It records where the transcript came from and when it was cleaned, so the file is self-describing if it travels.

---

## Worked micro-example

**Raw input (single channel, undiarised):**

```
[00:00:04.10] System Audio:  yeah hi hi nice to meet you can i just check how say your name ... great so im on the the gavernance team uh we use lumina a lot and flowforj was the the main thing right
```

**Cleaned:**

```markdown
**Host:** Yeah, hi — nice to meet you. Can I just check how you say your name?

**Visitor:** [name].

**Host:** Great. So I'm on the governance team — we use Lumina [?] a lot, and FlowForge [?] was the main thing, right?
```

With Editor's notes recording: attribution inferred (undiarised source); "governance" normalised from "gavernance"; "Lumina" and "FlowForge" flagged `[?]` because the phonetic sources ("lumina", "flowforj") are plausible-but-unconfirmed product references. (All names here are invented for illustration.)
