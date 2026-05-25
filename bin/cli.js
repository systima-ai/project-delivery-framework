#!/usr/bin/env node
/**
 * Project Delivery Framework (PDF) — installer CLI
 *
 * Usage:
 *   npx @systima/project-delivery-framework              # install into current directory
 *   npx @systima/project-delivery-framework install      # explicit install
 *   npx @systima/project-delivery-framework --target ./my-workspace
 *   npx @systima/project-delivery-framework --force      # overwrite existing skills
 *   npx @systima/project-delivery-framework --help
 *
 * What it does:
 *   - Copies .claude/skills/pdf-* into <target>/.claude/skills/
 *   - Copies _pdf/_config/ into <target>/_pdf/_config/
 *   - Creates _pdf-output/engagements/.gitkeep and _pdf-output/practice/.gitkeep
 *   - Reports what was installed and what to do next
 *
 * What it does NOT do:
 *   - Overwrite existing skills (unless --force)
 *   - Create or modify engagement data
 *   - Touch existing .claude/ skills from other frameworks (BMAD, etc.)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const SOURCE_ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(SOURCE_ROOT, '.claude', 'skills');
const CONFIG_DIR = path.join(SOURCE_ROOT, '_pdf', '_config');

// -----------------------------------------------------------------------------
// CLI arg parsing
// -----------------------------------------------------------------------------

const args = process.argv.slice(2);
const flags = {
  command: null,
  target: process.cwd(),
  force: false,
  help: false,
  dryRun: false,
};

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--help' || a === '-h') flags.help = true;
  else if (a === '--force' || a === '-f') flags.force = true;
  else if (a === '--dry-run') flags.dryRun = true;
  else if (a === '--target') flags.target = path.resolve(args[++i]);
  else if (!flags.command && !a.startsWith('-')) flags.command = a;
}

if (!flags.command) flags.command = 'install';

// -----------------------------------------------------------------------------
// Help
// -----------------------------------------------------------------------------

function printHelp() {
  console.log(`
Project Delivery Framework (PDF) — installer

Usage:
  npx @systima/project-delivery-framework [command] [options]

Commands:
  install   (default) Install PDF skills into the target directory
  status    Report what's installed in the target directory
  help      Show this help

Options:
  --target <dir>   Target directory (default: current directory)
  --force, -f      Overwrite existing PDF skills if present
  --dry-run        Show what would be done, but don't write
  --help, -h       Show this help

What gets installed:
  <target>/.claude/skills/pdf-*/          (62 skill folders)
  <target>/_pdf/_config/pdf-help.csv      (skill index)
  <target>/_pdf-output/engagements/       (with .gitkeep)
  <target>/_pdf-output/practice/          (with .gitkeep)

After install, in Claude Code:
  /pdf-help                      Show next required action
  /pdf-engagement-init           Scaffold a new engagement
  Then talk to an agent: "hey Marcus", "hey Ronan", etc.

Architecture spec:  ARCHITECTURE.md (in this package)
Status & changelog: CHANGELOG.md
`);
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function exists(p) {
  try { fs.accessSync(p); return true; } catch { return false; }
}

function listPdfSkills(skillsDir) {
  if (!exists(skillsDir)) return [];
  return fs.readdirSync(skillsDir)
    .filter((name) => name.startsWith('pdf-'))
    .filter((name) => fs.statSync(path.join(skillsDir, name)).isDirectory());
}

function copyDir(src, dest, { force = false, dryRun = false } = {}) {
  if (dryRun) {
    console.log(`  [dry-run] copy ${src} → ${dest}`);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (exists(dest) && !force) {
    throw new Error(`destination exists: ${dest} (use --force to overwrite)`);
  }
  fs.cpSync(src, dest, { recursive: true, force });
}

function copyFile(src, dest, { force = false, dryRun = false } = {}) {
  if (dryRun) {
    console.log(`  [dry-run] copy ${src} → ${dest}`);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (exists(dest) && !force) {
    throw new Error(`destination exists: ${dest} (use --force to overwrite)`);
  }
  fs.copyFileSync(src, dest);
}

function ensureGitkeep(dir, { dryRun = false } = {}) {
  const f = path.join(dir, '.gitkeep');
  if (dryRun) { console.log(`  [dry-run] touch ${f}`); return; }
  fs.mkdirSync(dir, { recursive: true });
  if (!exists(f)) fs.writeFileSync(f, '');
}

// -----------------------------------------------------------------------------
// Commands
// -----------------------------------------------------------------------------

function cmdStatus() {
  const target = flags.target;
  const targetSkillsDir = path.join(target, '.claude', 'skills');
  const targetConfigDir = path.join(target, '_pdf', '_config');

  console.log(`\nPDF status in: ${target}\n`);

  const installed = listPdfSkills(targetSkillsDir);
  const source = listPdfSkills(SKILLS_DIR);

  console.log(`  PDF skills installed: ${installed.length} / ${source.length} available`);
  console.log(`  CSV index:            ${exists(path.join(targetConfigDir, 'pdf-help.csv')) ? 'present' : 'missing'}`);
  console.log(`  Engagements folder:   ${exists(path.join(target, '_pdf-output', 'engagements')) ? 'present' : 'missing'}`);
  console.log(`  Practice folder:      ${exists(path.join(target, '_pdf-output', 'practice')) ? 'present' : 'missing'}`);

  if (installed.length > 0 && installed.length < source.length) {
    const missing = source.filter((s) => !installed.includes(s));
    console.log(`\n  Missing skills (${missing.length}): ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '...' : ''}`);
  }
  console.log('');
}

function cmdInstall() {
  const target = flags.target;
  const targetSkillsDir = path.join(target, '.claude', 'skills');
  const targetConfigDir = path.join(target, '_pdf', '_config');
  const targetEngagementsDir = path.join(target, '_pdf-output', 'engagements');
  const targetPracticeDir = path.join(target, '_pdf-output', 'practice');

  console.log(`\nInstalling Project Delivery Framework into: ${target}\n`);
  if (flags.dryRun) console.log('  (dry-run mode — no files will be written)\n');

  const skills = listPdfSkills(SKILLS_DIR);
  if (skills.length === 0) {
    console.error('error: no PDF skills found in source package. This is unexpected; check the install.');
    process.exit(1);
  }

  let installedCount = 0;
  let skippedCount = 0;
  const errors = [];

  // 1. Copy skills
  console.log(`  Copying ${skills.length} PDF skills...`);
  for (const skill of skills) {
    const src = path.join(SKILLS_DIR, skill);
    const dest = path.join(targetSkillsDir, skill);
    try {
      if (exists(dest) && !flags.force) {
        skippedCount++;
        if (skippedCount <= 3) console.log(`    skipped (exists): ${skill}`);
        continue;
      }
      copyDir(src, dest, { force: flags.force, dryRun: flags.dryRun });
      installedCount++;
    } catch (err) {
      errors.push(`${skill}: ${err.message}`);
    }
  }
  if (skippedCount > 3) console.log(`    skipped (exists): +${skippedCount - 3} more`);
  console.log(`  Skills: ${installedCount} installed, ${skippedCount} skipped`);

  // 2. Copy config
  console.log(`  Copying _pdf/_config/...`);
  try {
    copyDir(CONFIG_DIR, targetConfigDir, { force: flags.force, dryRun: flags.dryRun });
  } catch (err) {
    if (err.message.includes('destination exists') && !flags.force) {
      console.log(`    skipped (exists): _pdf/_config/`);
    } else {
      errors.push(`_pdf/_config: ${err.message}`);
    }
  }

  // 3. Ensure output dirs
  console.log(`  Scaffolding _pdf-output/ ...`);
  ensureGitkeep(targetEngagementsDir, { dryRun: flags.dryRun });
  ensureGitkeep(targetPracticeDir, { dryRun: flags.dryRun });

  // 4. Report
  console.log('');
  if (errors.length > 0) {
    console.log(`  Errors (${errors.length}):`);
    for (const e of errors) console.log(`    - ${e}`);
    console.log('');
  }

  if (flags.dryRun) {
    console.log('  Dry-run complete. Re-run without --dry-run to install.');
  } else if (installedCount > 0 || skippedCount > 0) {
    console.log(`  Done.\n`);
    console.log(`  Next steps:`);
    console.log(`    1. Open this directory in Claude Code.`);
    console.log(`    2. Run /pdf-help to see what to do next.`);
    console.log(`    3. Or run /pdf-engagement-init to scaffold a new engagement.`);
    console.log(`    4. Then "hey Marcus" / "hey Ronan" / etc. to talk to an agent.`);
    console.log(`\n  See ARCHITECTURE.md for the full spec.\n`);
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

// -----------------------------------------------------------------------------
// Dispatch
// -----------------------------------------------------------------------------

if (flags.help || flags.command === 'help') {
  printHelp();
  process.exit(0);
}

switch (flags.command) {
  case 'install':
    cmdInstall();
    break;
  case 'status':
    cmdStatus();
    break;
  default:
    console.error(`unknown command: ${flags.command}`);
    printHelp();
    process.exit(1);
}
