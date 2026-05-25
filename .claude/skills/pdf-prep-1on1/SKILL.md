---
name: pdf-prep-1on1
description: Prepare for a 1:1 with a named individual. Cumulative file per person — every prep appended at the top, so context persists across the engagement's lifetime. Highly confidential. Use before any 1:1 where you want a few minutes of prep rather than winging it.
---

# 1:1 prep workflow

Maintains `_pdf-output/engagements/{active}/09-people/1on1-notes/<person-slug>.md`. **One file per person**, cumulative across all 1:1s in the engagement.

The cumulative model directly serves Iris's principle 4: 1:1s are continuous; one-shot context loss is the failure mode. Each new 1:1 prep is appended at the top; previous preps remain available in chronological reverse order.

**Confidentiality: maximum.** Named individual; content includes development conversations, personal context, and unfiltered notes.

## Preconditions

- Active engagement
- The individual exists in STAKEHOLDERS.md (or is added at first run)

## Intent: append (default — prep next 1:1)

1. **Identify the person.** Slug from name; one file per person for the engagement.
2. **Recall prior context.** Read the file's existing content. Surface:
   - Last 1:1 date and topic
   - Open commitments (your follow-ups and theirs)
   - Themes from recent preps (the workflow looks across the last 3 entries)
3. **Walk the prep structure:**
   - *"What are you tracking on them right now?"* (their work, their growth, their concerns)
   - *"What do they likely want to raise?"* (anticipated topics)
   - *"What do you need to ask?"* (your agenda)
   - *"What's the one thing you don't want to forget?"* (the catch-all)
   - *"Any difficult topic to navigate this time?"* — if yes, the workflow may offer `pdf-prep-performance-conversation` for that topic instead
4. **Compose** the new entry, prepended to the file:

```markdown
---
artifact_type: one-on-one-notes
engagement: <slug>
person: <Name>
person_slug: <slug>
last_1on1: <date>
total_count: <N>
confidential: true
generated_by: pdf-prep-1on1
---

# 1:1 notes — <Name>

> Cumulative. Most recent prep at the top. Update via `pdf-prep-1on1` append intent.

---

## 1:1 prep — <YYYY-MM-DD>

**Last 1:1:** <date> (<N> ago)

### Carrying over from last time

- <open commitment they made>
- <open commitment you made>
- <topic you said you'd return to>

### What's likely on their mind

- <bullet>

### What you want to ask

- <bullet>
- <bullet>

### One thing not to forget

<one line>

### Plan after the 1:1 (to be completed post-meeting)

- _Actual topics covered:_ (fill in after)
- _Commitments made:_ (fill in)
- _Things to follow up:_ (fill in)

---

## 1:1 prep — <previous date>

(Previous entry; unchanged.)

---

## 1:1 prep — <earlier date>

(...)
```

5. **Cross-skill offers.**
   - If the user signals a difficult performance topic → offer `pdf-prep-performance-conversation`.
   - If the person's attrition-risk score is 4+ → flag at the top of this prep ("attrition watch shows score 4; consider directly addressing").
   - After the 1:1 happens, the user can come back via `update` intent to fill in the post-meeting section.

6. **Write.**

## Intent: update (record what actually happened)

1. Identify by person slug.
2. The most recent entry's "Plan after the 1:1" section gets populated with:
   - Actual topics covered
   - Commitments made (theirs and yours)
   - Things to follow up
3. Update frontmatter `last_1on1` and `total_count`.

## Intent: validate

- [ ] Frontmatter complete; `confidential: true`; person matches filename slug
- [ ] Most recent entry has the four prep sections
- [ ] If an entry is > 7 days old, its "Plan after the 1:1" section is populated (or marked "meeting cancelled" / "no notes captured")
- [ ] Person exists in STAKEHOLDERS.md
- [ ] Frontmatter `total_count` matches the number of entries in the file

## Intent: dump-merge

Accept dumped material (notes from the 1:1, a draft prep, a thought you want to capture before the next one). Map to the canonical structure; surface what's missing.

## Anti-patterns to refuse

- **Empty "Carrying over from last time" when prior entries exist.** Refuse — the value of cumulative notes is in carrying things forward. If genuinely nothing carries over, the entry says so explicitly: "Nothing open from last time."
- **Prep entries with no follow-through.** If three consecutive entries have "Plan after the 1:1" empty, the workflow flags this pattern: you're prepping but not recording outcomes, which erodes the continuity model.
- **Logging difficult conversations here.** If the topic is performance, this isn't the file. Route to `pdf-prep-performance-conversation` (different sensitivity, different framework).

## Red-team posture

Off. Confidential operational artifact.

## Reference

- `ARCHITECTURE.md` §6.9
- Iris's principle 4 (1:1s are continuous; context loss is the failure mode)
