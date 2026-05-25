---
artifact_type: status-log
engagement: {{ENGAGEMENT_SLUG}}
---

# Status Log — {{ENGAGEMENT_NAME}}

> Append-only weekly log. Used by `pdf-weekly-status` (Ronan) as input. Most recent entry at the top.

## Entry template

When adding a new week, copy this block to the top:

```
### YYYY-Www

- **Highlights:** _what shipped, what moved forward_
- **Lowlights:** _what slipped, what broke_
- **Decisions made:** _link to `decision-log.md` entries_
- **Risks materialised / closed:** _link to `RAID.md` rows_
- **Next week:** _top 3 priorities_
- **Asks:** _what you need from stakeholders_
```
