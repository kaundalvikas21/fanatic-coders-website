#!/usr/bin/env node
// Warn (non-blocking) when a source file exceeds its CLAUDE.md line-count
// recommendation. Two modes:
//   node check-file-lines.mjs <file...>   CLI / husky pre-commit (prints warnings)
//   node check-file-lines.mjs --hook      Claude PostToolUse (reads stdin JSON)
// Always exits 0 — these are "~" recommendations, never a hard gate.
import { readFileSync } from 'node:fs';

// First match wins. Limits mirror the table in CLAUDE.md (whole-file lines).
const RULES = [
  { dir: 'src/components/ui/', ext: null, limit: null, label: 'ui (exempt)' },
  { dir: 'src/app/', ext: '.tsx', limit: 120, label: 'page' },
  { dir: 'src/components/', ext: '.tsx', limit: 200, label: 'section/feature component' },
  { dir: 'src/hooks/', ext: '.ts', limit: 40, label: 'hook' },
  { dir: 'src/types/', ext: '.ts', limit: 200, label: 'types' },
  { dir: 'src/lib/', ext: '.ts', limit: 80, label: 'utility' },
];

// Returns the matching rule (limit may be null = exempt) or null if uncategorized.
function ruleFor(filePath) {
  const norm = filePath.replace(/\\/g, '/');
  const idx = norm.indexOf('src/');
  if (idx === -1) return null;
  const rel = norm.slice(idx);
  for (const r of RULES) {
    if (rel.startsWith(r.dir) && (r.ext === null || rel.endsWith(r.ext))) return r;
  }
  return null;
}

// Returns a warning string if the file is over its limit, else null.
function check(filePath) {
  const rule = ruleFor(filePath);
  if (!rule || rule.limit === null) return null;
  let lines;
  try {
    lines = readFileSync(filePath, 'utf8').split(/\r?\n/).length;
  } catch {
    return null; // missing/unreadable — never throw in warn-only mode
  }
  if (lines <= rule.limit) return null;
  const norm = filePath.replace(/\\/g, '/');
  const rel = norm.slice(norm.indexOf('src/'));
  const over = lines - rule.limit;
  return `⚠ ${rel} — ${rule.label}: ${lines} lines (limit ~${rule.limit}, +${over})`;
}

async function readStdin() {
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  return Buffer.concat(chunks).toString('utf8');
}

if (process.argv.includes('--hook')) {
  // PostToolUse: parse stdin JSON, check the edited file, emit systemMessage.
  try {
    const { tool_input } = JSON.parse(await readStdin());
    const warning = tool_input?.file_path ? check(tool_input.file_path) : null;
    if (warning) {
      process.stdout.write(JSON.stringify({ systemMessage: warning }));
    }
  } catch {
    // malformed input — stay silent, never block
  }
  process.exit(0);
}

// CLI mode: warn on every overflowing path arg.
const warnings = process.argv.slice(2).map(check).filter(Boolean);
if (warnings.length) {
  console.log('Line-count guideline warnings (non-blocking — see CLAUDE.md):');
  for (const w of warnings) console.log('  ' + w);
}
process.exit(0);
