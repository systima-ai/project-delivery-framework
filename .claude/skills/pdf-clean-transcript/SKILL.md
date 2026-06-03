---
name: pdf-clean-transcript
description: Turn a raw machine transcript (Teams / Zoom / Otter / Whisper / single-channel recorder export) into a clean, readable markdown transcript with inferred speaker labels, normalised mis-transcriptions, and explicit uncertainty markers. Use when you have an unlabelled or messy auto-generated transcript and want a cited, review-ready version.
---

# Transcript-cleaning workflow

Takes a raw, machine-generated transcript and produces a cleaned markdown version that is safe to keep, cite, and feed to other workflows (e.g. `pdf-summarize-standup`, `pdf-debrief-call`, or any agent's `dump` intent).

The raw input is typically **undiarised** (one "speaker" channel, no labels) or **mislabelled**, full of speech-to-text artefacts (timestamps, disfluencies, run-on text), and contains mis-heard proper nouns and technical terms. This workflow cleans the prose, **attributes speakers**, **normalises clear mis-hearings**, and **flags everything uncertain** so the reader can trust what is asserted and see what is inferred.

A cleaned transcript is **source material**, not a canonical engagement artifact. It is never authoritative on its own; the Editor's notes make its inferences explicit.

## Output

`_pdf-output/engagements/{active}/_transcripts/<YYYY-MM-DD>-<short-label>.md` by default. The user may name any other path (cleaned transcripts often sit beside the stage they inform, e.g. `01-shaping/`). One file per recording.

## Preconditions

- A raw transcript: either a **file path** (txt / md / vtt / srt / json) or **pasted text**.
- Optional but strongly recommended: a **participant roster** (names + roles) to anchor speaker attribution.

## Intent: create (default)

1. **Get the input.** Ask: *"Paste the raw transcript, or give me a file path. If you have one, tell me who was on the call (names + roles) — it makes speaker attribution far more reliable."*
2. **Read the source.** Handle plain-text, caption (vtt/srt), and JSON-transcript shapes. Long single-line exports are normal; do not truncate — process the whole input.
3. **Clean the prose.** Remove timestamps, channel markers ("System Audio:"), filler, false starts, and obvious duplications. **Preserve the substance of every turn** — cleaning is not summarising. Never drop content to shorten; that is a different workflow.
4. **Attribute speakers.** Segment into turns and assign a speaker label per turn:
   - If the roster was given, map to named participants.
   - If undiarised, infer from context (who introduces whom, who asks vs answers, role-specific language) and label accordingly.
   - Where a turn's speaker is genuinely ambiguous, attribute your best guess and record speaker attribution as inferred in the Editor's notes.
5. **Normalise clear mis-hearings.** Correct obvious speech-to-text errors in proper nouns, product names, acronyms and technical terms (see `references/transcript-cleaning-guide.md` for the method). Apply a correction **only** when the intended term is unambiguous from context. Keep a list of every normalisation for the Editor's notes.
6. **Flag uncertainty with `[?]`.** For any term, name, number, or attribution you cannot confirm, keep your best guess and append the `[?]` marker (the framework-wide unconfirmed-token convention; see `ARCHITECTURE.md` §8.1). List these in the Editor's notes so they can be resolved later (by you, or via `pdf-elicit`).
7. **Assemble the file** using the canonical structure in `references/transcript-cleaning-guide.md`: header (title, date, participants), **Editor's notes** preamble (the three standard caveats), the cleaned transcript, and a provenance footer.
8. **Show before writing.** Summarise: number of speakers identified, count of normalised terms, count of `[?]` items. Ask: *"Write this out?"*
9. **Write** the cleaned file and report the path.

## Intent: update

Re-clean or refine an existing cleaned transcript:
- **Richer source:** you obtained a better recording or a full transcript having only had a fragment — re-run cleaning, supersede the prior file (rename with a `.v<n>` suffix), note the supersession in the footer.
- **Resolve `[?]` items:** the user confirms one or more uncertain items. Replace the `[?]` token with the confirmed value, move the item out of the "uncertain" list in the Editor's notes into the normalised-terms list, and record what was confirmed.
- **Re-attribute:** correct a speaker label the user disputes; reflect the correction in the Editor's notes.

## Intent: validate

- [ ] Header names every participant with a role
- [ ] Editor's notes preamble is present with all three caveats (attribution inferred / terms normalised / uncertain items)
- [ ] Every normalised term is listed (heard → corrected)
- [ ] Every `[?]` marker in the body has a matching entry in the uncertain-items list
- [ ] No raw timestamps or channel markers remain in the transcript body
- [ ] Provenance footer cites the source file/paste and the clean date
- [ ] No content was summarised away (spot-check turn coverage against the source length)

## Intent: dump-merge

Functionally equivalent to `create` when invoked from an agent's dump flow — the input is always a raw transcript or paste. After producing the cleaned transcript, offer the natural follow-ons: *"Feed this to `pdf-summarize-standup`, `pdf-debrief-call`, or an agent's dump intent?"*

## Anti-patterns to refuse

- **Summarising instead of cleaning.** Refuse to shorten by dropping substance; route to `pdf-summarize-standup` (digest) or `pdf-debrief-call` (assessment) if that is what the user wants.
- **Inventing content** to smooth a gap. If the audio was unintelligible, mark it `[inaudible]`, never fabricate.
- **Silent correction of ambiguous terms.** If a correction is not unambiguous from context, it gets a `[?]`, not a confident rewrite.
- **Asserting speaker identity as fact** when it was inferred. The Editor's notes must say attribution is inferred whenever the source was undiarised.

## Red-team posture

Off. The discipline lives in the Editor's notes (explicit inference + uncertainty) rather than an adversarial gate. A cleaned transcript that *feeds* a high-stakes artifact does not itself carry the gate; the downstream artifact does.

## Reference

- `references/transcript-cleaning-guide.md` — the canonical output format, the Editor's-notes template, the normalisation method, and the `[?]` convention in practice
- `ARCHITECTURE.md` §8.1 — the `[?]` unconfirmed-token convention (framework-wide)
- `ARCHITECTURE.md` §18 — ingest/dump mode (cleaned transcripts are a common dump input)

## Tone

Direct. British English. Faithful to the source above all — a clean transcript that quietly changes what someone said is worse than a messy one. Confirm the speaker roster aloud before writing.
