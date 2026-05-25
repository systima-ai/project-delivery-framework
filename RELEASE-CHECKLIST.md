# Release checklist

What's prepared and what you need to do before actually publishing.

## Already prepared

- [x] **`README.md`** — public-facing; explains what PDF is, who it's for, install + quick start, 10-agent table, design principles
- [x] **`LICENSE`** — MIT (`Copyright (c) 2026 Systima`)
- [x] **`package.json`** — npm metadata; placeholder repo URL `github.com/CHANGE-ME/...`
- [x] **`bin/cli.js`** — installer; supports `install` / `status` / `--target` / `--force` / `--dry-run` / `--help`; chmod +x done; dry-run tested in `/tmp` and works
- [x] **`.npmignore`** — excludes `_pdf-output/`, `ACTIVE_ENGAGEMENT`, editor / OS / Node noise
- [x] **`.gitignore`** — updated with Node patterns
- [x] **`CHANGELOG.md`** — complete per-stage build history

## Before pushing to a public GitHub repo

### 1. Decide the GitHub repo location

Two choices:

| Path | Pros | Cons |
|---|---|---|
| `github.com/<your-user>/project-delivery-framework` | Single-owner; clean | Less discoverable |
| `github.com/<org>/project-delivery-framework` | Easier to grow into a project | Requires creating an org |

### 2. Update placeholders in `package.json`

Replace every `CHANGE-ME` with your actual GitHub handle / org:

```json
"homepage": "https://github.com/<you>/project-delivery-framework#readme",
"bugs":     { "url": "https://github.com/<you>/project-delivery-framework/issues" },
"repository": { "type": "git", "url": "git+https://github.com/<you>/project-delivery-framework.git" }
```

### 3. Sanity-check what would ship to npm

```bash
cd /Users/systimahq/Dropbox/Mac/Documents/personal/development/project-delivery-framework
npm pack --dry-run
```

Inspect the file list. Expect:

- `bin/cli.js`
- `.claude/skills/pdf-*/` (62 folders)
- `_pdf/_config/pdf-help.csv`
- `ARCHITECTURE.md`, `CHANGELOG.md`, `README.md`, `LICENSE`, `package.json`

Should NOT see:

- `_pdf-output/` content (engagement data)
- `ACTIVE_ENGAGEMENT`
- `node_modules/`, `.git/`

### 4. Local install test before pushing anywhere

```bash
# In a throwaway directory
cd /tmp && mkdir pdf-real-test && cd pdf-real-test

# Pack and install locally (simulates npx)
npm pack /Users/systimahq/Dropbox/Mac/Documents/personal/development/project-delivery-framework
tar -tzf project-delivery-framework-0.1.0.tgz | head -20  # eyeball the contents

# Try the installer locally
node /Users/systimahq/Dropbox/Mac/Documents/personal/development/project-delivery-framework/bin/cli.js install

# Verify
node /Users/systimahq/Dropbox/Mac/Documents/personal/development/project-delivery-framework/bin/cli.js status

# Open in Claude Code and try /pdf-help
```

### 5. Push to GitHub

```bash
cd /Users/systimahq/Dropbox/Mac/Documents/personal/development/project-delivery-framework

git add -A
git commit -m "Initial public release: PDF v0.1"

# Create a GitHub repo (web UI), then:
git remote add origin git@github.com:<you>/project-delivery-framework.git
git branch -M main
git push -u origin main
```

### 6. Add a v0.1.0 tag

```bash
git tag -a v0.1.0 -m "v0.1.0 — feature-complete v0.1"
git push --tags
```

## Before publishing to npm

### 1. Verify the package name is available

```bash
npm search project-delivery-framework
# Or check https://www.npmjs.com/package/project-delivery-framework
```

If taken, switch to scoped: `@<your-npm-username>/project-delivery-framework` and update `package.json`'s `name` field.

### 2. Log in to npm

```bash
npm login
```

### 3. Publish

```bash
cd /Users/systimahq/Dropbox/Mac/Documents/personal/development/project-delivery-framework

# Dry-run first — see what would publish
npm publish --dry-run

# Real publish (unscoped public)
npm publish

# Or, if you went scoped:
npm publish --access public
```

### 4. Verify the published package

```bash
# In a clean test directory
cd /tmp && mkdir pdf-npm-test && cd pdf-npm-test
npx project-delivery-framework
ls -la .claude/skills/ | head
```

### 5. Announce / link

- Update the GitHub README badge or release notes
- Optionally announce in any relevant communities (Claude Code Discord, BMAD Discord, LinkedIn)

## Post-release

- **Set up GitHub Issues templates** for bug reports and feature requests
- **Consider GitHub Actions** for: CSV-validation, skill-folder-structure validation, installer smoke test on push
- **Track first-use friction.** Note anywhere PDF's strict refusals get in the way; tune thresholds in `customize.toml`
- **Add an examples folder?** A worked-example engagement (anonymised) would dramatically lower the on-ramp for new users — flagged as a candidate

## Rollback

If something is wrong after publish:

```bash
# Within 72h of publish, you can unpublish a specific version:
npm unpublish project-delivery-framework@0.1.0

# Or deprecate (preferred — keeps the install working but warns users):
npm deprecate project-delivery-framework@0.1.0 "Has a critical bug; use 0.1.1"
```

## Notes

- The package size when published will be ~1 MB or less (all markdown / TOML / CSV; no binaries).
- Install time is fast (no `npm install` of dependencies in the installer — uses only Node built-ins).
- The installer is **idempotent with `--force`**: re-running won't break a working install; without `--force` it skips existing skills.
- Confidentiality posture is preserved on install: `09-people/` content is never shipped (it's user data; doesn't exist at install time).
