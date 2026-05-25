---
name: pdf-capture-lessons
description: Capture engagement lessons and propagate them to the cross-engagement practice library so the next engagement benefits. Writes TWO files — engagement-scoped + practice-library entries. The only workflow in PDF that writes outside the active engagement folder.
---

# Capture lessons workflow

This workflow writes two files (design choice for propagation):

1. `_pdf-output/engagements/{active}/10-closure/lessons-learned.md` — engagement-scoped, full lessons in narrative form
2. `_pdf-output/practice/lessons-learned/<YYYY>-<engagement-slug>-<topic>.md` — **one file per material lesson**, cross-engagement, structured for retrieval

This is the **only workflow in PDF that writes outside the active engagement folder.** Felix operationalises principle 3 here: the lessons that don't propagate are the ones you'll repeat.

## Preconditions

- `pdf-run-retrospective` complete (the retrospective's "Lessons to propagate" section is the input)

## Intent: create

1. **Read the retrospective.** Pull the "Lessons to propagate" entries from the internal section.
2. **Walk each lesson** with the user:
   - *"For this lesson, what's the topic — one or two words that would tag it for retrieval?"* (e.g. "estimation", "vendor-management", "scope-discipline", "stakeholder-alignment")
   - *"In one paragraph: what was the situation that produced this lesson?"*
   - *"What did you learn?"*
   - *"What behaviour or decision will change next time?"*
   - *"What's the trigger to recall this lesson — what should make someone search the library and find this?"*
3. **Confirm propagation.** *"Propagate this lesson to the practice library? [yes / engagement-only]"*
   - `yes`: writes both files
   - `engagement-only`: writes only the engagement-scoped file; frontmatter records `propagated: false`
4. **Compose the engagement-scoped file** (one file, all lessons):

```markdown
---
artifact_type: lessons-learned-engagement
engagement: <slug>
date: <YYYY-MM-DD>
total_lessons: <N>
propagated_count: <N>
generated_by: pdf-capture-lessons
---

# Lessons learned — <Engagement name>

> Engagement-scoped, narrative form. Material lessons are also propagated to the practice library; see `propagated: true` in each lesson's frontmatter pointer.

## Lesson 1: <topic>

**Propagated:** yes / engagement-only
**Practice library path** (if propagated): `_pdf-output/practice/lessons-learned/<YYYY>-<engagement>-<topic>.md`

### Situation

<paragraph>

### What we learned

<paragraph>

### What will change next time

<paragraph>

### Trigger for recall

<paragraph: what circumstances should make someone search the library and find this lesson>

---

## Lesson 2: <topic>

(Same shape.)

---
```

5. **Compose each practice-library file** (one per propagated lesson):

```markdown
---
artifact_type: lesson-practice-library
source_engagement: <slug>
source_engagement_year: <YYYY>
date_captured: <YYYY-MM-DD>
topic: <topic-slug>
tags: [<comma-separated>]
generated_by: pdf-capture-lessons
---

# Lesson — <topic> — from <source-engagement-slug>

## Situation

<paragraph — generic enough to be useful out of context, specific enough to be credible>

## Learning

<paragraph — the substance>

## Behavioural change

<paragraph — what's different next time>

## Recall trigger

<paragraph — when to remember this>

## Original retrospective

`_pdf-output/engagements/<source-engagement>/10-closure/retrospective.md`

## Related practice-library entries

(Iris-of-cross-references — if the user knows of related lessons, link them here.)

- <path>

---

_Propagated from <source-engagement>; <YYYY-MM-DD>._
```

6. **Cross-skill side effects.**
   - On propagation: future engagement-init workflows could surface relevant practice-library entries based on charter content. Out of scope for v0.1; flagged as a v2 feature in the workflow output.
   - If the user is captured many lessons in this engagement (≥ 5 material lessons), the workflow asks: *"Would you also like to add a top-line summary entry to the practice library's index? Useful when future searches start with 'engagements that taught me a lot'."*

7. **Write both files** (or just the engagement-scoped one if propagation declined per lesson).

## Intent: update

1. Add a lesson after the initial capture (a follow-up retrospective surfaced new material).
2. Re-propagate an existing engagement-scoped lesson that was initially marked engagement-only.
3. Refine an existing lesson's recall trigger.

The practice library is **append-only**; existing lessons are not edited destructively — corrections create new lessons referencing the prior.

## Intent: validate

- [ ] Frontmatter complete; `total_lessons` and `propagated_count` consistent with the body
- [ ] Every lesson has all four sections (Situation / Learning / Change / Recall trigger)
- [ ] Every propagated lesson has a corresponding file in `_pdf-output/practice/lessons-learned/`
- [ ] Practice-library files have non-empty topic, source engagement, recall trigger
- [ ] No practice-library file shares the same source-engagement + topic pair (avoid duplicates)

## Intent: dump-merge

Accept dumped material (retrospective findings, post-engagement note, debrief transcript). Extract candidate lessons; for each, ask whether to propagate; structure into the canonical lesson shape.

## Anti-patterns to refuse

- **Lessons that say "communicate better".** Refuse. A lesson must have substance, not just intent. The workflow probes for the specific behavioural change.
- **No recall trigger.** Refuse. A lesson without a recall trigger never gets found again.
- **All lessons marked propagate: no.** Refuse and ask why. If genuinely all lessons are too specific to propagate, the retrospective probably didn't surface real lessons.
- **Lesson topics that duplicate existing practice-library entries without referencing them.** The workflow scans the practice library for similar topics and asks the user whether the new lesson is genuinely different or whether it should be linked to the existing one.

## Red-team posture

Off. Internal-but-permanent. The propagation step is the user's deliberate choice; if a lesson is too sensitive to propagate, it stays engagement-only.

## Reference

- `ARCHITECTURE.md` §6.10
- Felix's principle 3 (lessons that don't propagate are the ones you'll repeat)
- The practice library at `_pdf-output/practice/lessons-learned/` is engagement-agnostic
