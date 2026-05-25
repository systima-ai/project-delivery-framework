#!/usr/bin/env node
/**
 * Generate .opencode/commands/<skill>.md slash-command wrappers
 * for every pdf-* skill in .claude/skills/.
 *
 * Each wrapper is a thin file that:
 *   - Carries the skill's `description` in frontmatter (shown in /help)
 *   - Body references the skill so OpenCode loads it via the skill tool
 *
 * Run from the repo root:
 *   node scripts/generate-opencode-commands.js
 *
 * Idempotent — re-runs overwrite existing wrappers in .opencode/commands/.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(REPO_ROOT, '.claude', 'skills');
const COMMANDS_DIR = path.join(REPO_ROOT, '.opencode', 'commands');

function readFrontmatter(skillMdPath) {
  const text = fs.readFileSync(skillMdPath, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return fm;
}

function main() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error(`error: ${SKILLS_DIR} not found`);
    process.exit(1);
  }
  fs.mkdirSync(COMMANDS_DIR, { recursive: true });

  const skills = fs.readdirSync(SKILLS_DIR)
    .filter((d) => d.startsWith('pdf-'))
    .filter((d) => fs.statSync(path.join(SKILLS_DIR, d)).isDirectory());

  let generated = 0;
  let skipped = 0;

  for (const skill of skills) {
    const skillMd = path.join(SKILLS_DIR, skill, 'SKILL.md');
    if (!fs.existsSync(skillMd)) {
      skipped++;
      console.warn(`  skip ${skill}: no SKILL.md`);
      continue;
    }
    const fm = readFrontmatter(skillMd);
    if (!fm || !fm.name || !fm.description) {
      skipped++;
      console.warn(`  skip ${skill}: missing name/description`);
      continue;
    }

    const content = `---\ndescription: ${fm.description}\n---\n\n@skills/${fm.name}\n`;
    const outPath = path.join(COMMANDS_DIR, `${fm.name}.md`);
    fs.writeFileSync(outPath, content);
    generated++;
  }

  console.log(`\nGenerated ${generated} OpenCode command wrappers in ${path.relative(REPO_ROOT, COMMANDS_DIR)}/`);
  if (skipped > 0) console.log(`Skipped: ${skipped}`);
}

main();
