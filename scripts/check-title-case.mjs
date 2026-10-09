#!/usr/bin/env node
/**
 * check-title-case.mjs
 * Validates that H1-H6 headings in page files follow Title Case rules.
 *
 * Title Case Rules (Chicago-style):
 * - Capitalize the first word always
 * - Capitalize nouns, pronouns, verbs, adjectives, adverbs
 * - Do NOT capitalize: a an the and but or for nor on at to from by with of in into as
 * - 'up' IS capitalized (phrasal-verb particle: "Holds Up", "Spin Up")
 * - Hyphenated compounds: ALWAYS capitalize the first part (e.g., On-Premises, At-a-Glance);
 *   subsequent parts follow normal rules (content words capitalized, articles/prepositions lowercase)
 *
 * Usage:
 *   node scripts/check-title-case.mjs [file1.tsx] [file2.tsx] ...
 *   (lint-staged passes staged file paths automatically)
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LOWERCASE_WORDS = new Set([
  'a', 'an', 'the',
  'and', 'but', 'or', 'for', 'nor',
  'on', 'at', 'to', 'from', 'by', 'with', 'of', 'in', 'into', 'as', 'vs'
]);
// NOTE: 'up' is deliberately NOT lowercased. In headings it is almost always an
// adverbial particle in a phrasal verb ("Holds Up", "Spin Up", "Level Up"), which
// Chicago capitalizes. A flat word list cannot tell a particle from a preposition,
// and suppression comments are unreliable here because regenerating a DSL page
// strips them — so the default must be the common case.

// Brand names / acronyms that are always valid as-is — never flag them.
const BRAND_SAFE = new Set([
  'TiDB', 'TiKV', 'TiFlash', 'PingCAP',
  'HTAP', 'AI', 'SQL', 'OLTP', 'OLAP', 'ACID', 'NewSQL',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Flink',
  'GitHub', 'GitLab', 'Discord', 'Slack', 'Reddit', 'LinkedIn', 'Twitter',
  'AWS', 'GCP', 'Azure', 'CNCF', 'ETL', 'API', 'UI', 'UX', 'SDK', 'CLI',
  'LLM', 'RAG', 'DBA', 'MVP', 'CTO', 'GTM', 'PRD', 'CI', 'CD',
  'HTTP', 'HTTPS', 'URL', 'HTML', 'CSS', 'JSON', 'YAML', 'REST',
  'Kubernetes', 'Docker', 'Terraform', 'Prometheus', 'Grafana',
  'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust',
  'React', 'Next.js', 'Node.js',
  'Vercel', 'Cloudflare', 'Netlify',
  // Library / package names that are conventionally lowercase
  'gorm', 'database/sql', 'npm', 'pnpm', 'yarn',
  'mysql-connector-python', 'mysql-connector-java', 'node-mysql2', 'go-sql-driver',
]);

// Section components whose `title=` prop renders as an H2.
const HEADING_COMPONENTS = [
  'SectionHeader',
  'CtaSection',
  'TestimonialsSection',
  'FeatureGridSection',
  'FeatureCardSection',
  'FeatureHighlightsSection',
  'FeatureTabsSection',
  'LogoCloudSection',
  'StatsSection',
  'FaqSection',
  'FeatureMediaSection',
  'CaseStudyCardsSection',
];

// Lines containing these strings near a DATA_TITLE match are not headings.
const DATA_TITLE_SKIP_PATTERNS = [
  'buildPageSchema',
  'metadata:',
  'breadcrumbs',
  'category:',
  'alternates',
  'openGraph',
  'twitter:',
];

// ---------------------------------------------------------------------------
// Regex Patterns
// ---------------------------------------------------------------------------

// H1: headline= prop (HeroSection, hand-written JSX)
const HEADLINE_PROP_RE = /\bheadline=(?:"([^"]+)"|'([^']+)'|\{"([^"]+)"\})/g;

// H1: headline: "..." in object literals — how DSL-generated pages store the hero
// headline (src/app/**/page.tsx built from page.dsl.json). Without this, the H1 of
// every DSL page goes unchecked.
const DATA_HEADLINE_RE = /\bheadline:\s*(?:"([^"]+)"|'([^']+)')/g;

// H2: title= prop on known section components
// Uses dotAll (s) so [^]* spans newlines — needed for multi-line JSX attributes.
const componentPattern = HEADING_COMPONENTS.join('|');
const COMPONENT_TITLE_RE = new RegExp(
  `(${componentPattern})[^]*?\\btitle=(?:"([^"]+)"|'([^']+)'|\\{"([^"]+)"\\})`,
  'gs'
);

// H1–H6: hardcoded <hN>static text</hN> tags
const H_TAG_RE = /<h([1-6])[^>]*>\s*([^{<\n]+?)\s*<\/h[1-6]>/g;

// H3: title: "..." in object/array literals (page data)
const DATA_TITLE_RE = /\btitle:\s*(?:"([^"]+)"|'([^']+)')/g;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convert a character offset to a 1-based line number.
 */
function getLineNumber(src, charIndex) {
  return src.slice(0, charIndex).split('\n').length;
}

/**
 * Get the text of a specific line (1-based).
 */
function getLine(src, lineNo) {
  return src.split('\n')[lineNo - 1] ?? '';
}

/**
 * Return true if the text should be skipped entirely.
 */
function shouldSkip(text) {
  if (!text || !text.trim()) return true;
  if (text.includes('{') || text.includes('}')) return true; // JSX expression
  if (text.includes('\n')) return true; // actual newlines (shouldn't appear in attrs, but guard anyway)
  // Single-word — no inter-word rules apply, first-word rule always satisfied
  if (!text.trim().includes(' ')) return true;
  // Questions are sentences (sentence case), not titles — skip title case check
  if (text.trim().endsWith('?')) return true;
  return false;
}

/**
 * Remove inline HTML tags (<span class="...">, <br>) from heading text.
 * Headlines on DSL pages carry gradient/emphasis markup; the tags and their
 * attributes are not words and must not be case-checked.
 */
function stripHtmlTags(text) {
  return text.replace(/<[^>]*>/g, ' ');
}

/**
 * Strip surrounding punctuation from a word so it can be matched against BRAND_SAFE.
 */
function stripPunctuation(word) {
  return word.replace(/^[^a-zA-Z0-9]+/, '').replace(/[.,!?:;'"()\[\]]+$/, '');
}

/**
 * Return true if the WHOLE word is a known brand/package name.
 * Checked before splitting on '-', so hyphenated names keep their own casing
 * (e.g. "mysql-connector-python", "database/sql").
 */
function isBrandSafeWord(word) {
  return BRAND_SAFE.has(stripPunctuation(word));
}

/**
 * Validate a single word part (after splitting on '-') against Title Case rules.
 * @param {string} part - the word part to check
 * @param {boolean} isFirst - true if this is the very first word of the title
 * @param {boolean} isHyphenPart - true if this is ANY part of a hyphenated compound (parts.length > 1)
 * Returns null if valid, or a description of the violation.
 *
 * House rule: EVERY part of a hyphenated compound is capitalized — both halves of
 * "Hands-On", "Built-In", "Multi-Tenant", "On-Premises". (This is the APA-style
 * convention, chosen over the CMOS exception that lowercases internal
 * prepositions/articles, because it is simpler and what the team asked for.)
 */
function checkPart(part, isFirst, isHyphenPart = false) {
  // Strip leading punctuation characters (parens, brackets, symbols)
  const clean = part.replace(/^[^a-zA-Z]+/, '').replace(/[.,!?:;'"()\[\]]+$/, '');
  if (!clean) return null;

  // Brand names / known acronyms → always valid
  if (BRAND_SAFE.has(clean)) return null;

  // All-uppercase (acronym we don't know about) → always valid
  if (clean.length > 1 && clean === clean.toUpperCase()) return null;

  // Number or starts with digit → valid
  if (/^\d/.test(clean)) return null;

  const lower = clean.toLowerCase();
  const firstChar = clean[0];

  // Non-letter first char (symbol, etc.) → skip
  if (!/[a-zA-Z]/.test(firstChar)) return null;

  if (isFirst || isHyphenPart) {
    // First word of title OR ANY part of a hyphenated compound → always capitalize
    if (firstChar !== firstChar.toUpperCase() || firstChar === firstChar.toLowerCase()) {
      return isFirst
        ? `"${part}" should be capitalized (it's the first word)`
        : `"${part}" should be capitalized (every part of a hyphenated compound is capitalized)`;
    }
  } else if (LOWERCASE_WORDS.has(lower)) {
    // Articles/prepositions/conjunctions stay lowercase (applies to subsequent hyphen parts too)
    if (firstChar !== firstChar.toLowerCase()) {
      return `"${part}" should be lowercase (it's a preposition/conjunction/article)`;
    }
  } else {
    // Everything else must be capitalized
    if (firstChar !== firstChar.toUpperCase() || firstChar === firstChar.toLowerCase()) {
      return `"${part}" should be capitalized`;
    }
  }
  return null;
}

/**
 * Check if a text string follows Title Case.
 * Returns null if valid, or a description of the first violation found.
 */
function checkTitleCase(text) {
  // Inline HTML is markup, not words — analyse the tag-free text
  const plain = stripHtmlTags(text);
  if (shouldSkip(plain)) return null;

  // Handle literal \n (the two-character sequence in JSX string attributes)
  const segments = plain.split(/\\n/);
  for (const seg of segments) {
    const trimmed = seg.trim();
    if (shouldSkip(trimmed)) continue;

    const words = trimmed.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (!word) continue;

      // Whole-word brand/package name (incl. hyphenated) → leave casing alone
      if (isBrandSafeWord(word)) continue;

      const parts = word.split('-');
      for (let j = 0; j < parts.length; j++) {
        const isFirst = i === 0 && j === 0;
        const isHyphenPart = parts.length > 1;
        const violation = checkPart(parts[j], isFirst, isHyphenPart);
        if (violation) return violation;
      }
    }
  }
  return null;
}

/**
 * Re-case a single word (which may be a hyphenated compound).
 * @param {boolean} isFirst - true if this is the first word of the heading/line
 */
function fixWord(word, isFirst) {
  // Whole-word brand/package name (incl. hyphenated) → leave casing alone
  if (isBrandSafeWord(word)) return word;

  const parts = word.split('-');
  return parts.map((part, j) => {
    const leadingSymbols = part.match(/^[^a-zA-Z]*/)?.[0] ?? '';
    const withoutLeading = part.slice(leadingSymbols.length);
    const clean = withoutLeading.replace(/[.,!?:;'"()\[\]]+$/, '');
    const suffix = withoutLeading.slice(clean.length);
    if (!clean) return part;
    if (BRAND_SAFE.has(clean)) return part;
    if (clean.length > 1 && clean === clean.toUpperCase()) return part;
    if (/^\d/.test(clean)) return part;
    if (!/[a-zA-Z]/.test(clean[0])) return part;

    const lower = clean.toLowerCase();
    const isFirstPart = isFirst && j === 0;
    const isHyphenPart = parts.length > 1;

    let corrected;
    if (isFirstPart || isHyphenPart) {
      corrected = clean[0].toUpperCase() + clean.slice(1);
    } else if (LOWERCASE_WORDS.has(lower)) {
      corrected = lower;
    } else {
      corrected = clean[0].toUpperCase() + clean.slice(1);
    }
    return leadingSymbols + corrected + suffix;
  }).join('-');
}

/**
 * Generate a Title Case suggestion for a given text.
 * Inline HTML tags are passed through untouched — only the text between them is
 * re-cased — so a suggestion stays safe to paste back over the original.
 */
function toTitleCase(text) {
  // Odd indices of this split are the HTML tags themselves
  const chunks = text.split(/(<[^>]*>)/);
  let seenFirstWord = false;

  return chunks.map((chunk, ci) => {
    if (ci % 2 === 1) return chunk; // an HTML tag — leave as-is

    // Handle literal \n segments
    return chunk.split(/\\n/).map(seg => {
      const leading = seg.match(/^\s*/)[0];
      const trailing = seg.match(/\s*$/)[0];
      const trimmed = seg.trim();
      if (!trimmed) return seg;

      const fixed = trimmed.split(/\s+/).map(word => {
        const isFirst = !seenFirstWord;
        seenFirstWord = true;
        return fixWord(word, isFirst);
      });
      return leading + fixed.join(' ') + trailing;
    }).join('\\n');
  }).join('');
}

// ---------------------------------------------------------------------------
// Heading Extraction
// ---------------------------------------------------------------------------

/**
 * Extract all heading strings from a .tsx file.
 * Returns an array of { lineNo, text, kind } objects.
 */
function extractHeadings(filePath, src) {
  const headings = [];

  // ── Pattern 1: headline= prop (H1) ───────────────────────────────────────
  HEADLINE_PROP_RE.lastIndex = 0;
  let match;
  while ((match = HEADLINE_PROP_RE.exec(src)) !== null) {
    const text = match[1] ?? match[2] ?? match[3];
    if (text) {
      headings.push({
        lineNo: getLineNumber(src, match.index),
        text,
        kind: 'H1 (headline=)',
      });
    }
  }

  // ── Pattern 1b: headline: "..." in object literals (H1, DSL pages) ───────
  DATA_HEADLINE_RE.lastIndex = 0;
  while ((match = DATA_HEADLINE_RE.exec(src)) !== null) {
    const text = match[1] ?? match[2];
    if (!text) continue;
    headings.push({
      lineNo: getLineNumber(src, match.index),
      text,
      kind: 'H1 (headline:)',
    });
  }

  // ── Pattern 2: title= on known section components (H2) ───────────────────
  COMPONENT_TITLE_RE.lastIndex = 0;
  while ((match = COMPONENT_TITLE_RE.exec(src)) !== null) {
    const componentName = match[1];
    // Character distance guard: if title= is more than 400 chars after the
    // component name, it likely belongs to a different element — skip.
    const componentEnd = match.index + componentName.length;
    const fullMatch = match[0];
    const titleOffset = fullMatch.lastIndexOf('title=');
    if (titleOffset - componentName.length > 400) continue;

    const text = match[2] ?? match[3] ?? match[4];
    if (text) {
      // Approximate line number: find title= within the match
      const titleAbsIndex = match.index + titleOffset;
      headings.push({
        lineNo: getLineNumber(src, titleAbsIndex),
        text,
        kind: `H2 (${componentName})`,
      });
    }
  }

  // ── Pattern 3: <hN>static text</hN> tags ─────────────────────────────────
  H_TAG_RE.lastIndex = 0;
  while ((match = H_TAG_RE.exec(src)) !== null) {
    const level = match[1];
    const text = match[2];
    if (text && !text.includes('{')) {
      headings.push({
        lineNo: getLineNumber(src, match.index),
        text: text.trim(),
        kind: `H${level} (<h${level}> tag)`,
      });
    }
  }

  // ── Pattern 4: title: "..." in data arrays (page files only) ─────────────
  DATA_TITLE_RE.lastIndex = 0;
  while ((match = DATA_TITLE_RE.exec(src)) !== null) {
    const text = match[1] ?? match[2];
    if (!text) continue;

    const lineNo = getLineNumber(src, match.index);
    const lineText = getLine(src, lineNo);

    // Skip if the line context suggests this is not a heading data field
    const isNonHeading = DATA_TITLE_SKIP_PATTERNS.some(p => lineText.includes(p));
    if (isNonHeading) continue;

    // Also skip if it looks like a metadata title (very long, has pipe/dash separators)
    if (text.length > 80 || text.includes(' | ') || text.includes(' — ') || text.includes(' – ')) continue;

    headings.push({ lineNo, text, kind: 'H3 (data title:)' });
  }

  return headings;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

// ── Allowlist ──────────────────────────────────────────────────────────────
// Headings the team has explicitly chosen to keep as-is. This is the durable,
// regeneration-SAFE way to override a rule misjudgment: unlike a
// `// title-case-ignore` comment (which an /admin republish strips from a DSL
// page), an allowlist entry lives in its own file and always survives.
// Matched on the exact heading text, so an approved heading is never flagged
// anywhere it appears.
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ALLOWLIST_PATH = join(SCRIPT_DIR, 'title-case-allow.json');

function loadAllowlist() {
  try {
    const arr = JSON.parse(readFileSync(ALLOWLIST_PATH, 'utf8'));
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveAllowlist(set) {
  const arr = [...set].sort((a, b) => a.localeCompare(b));
  writeFileSync(ALLOWLIST_PATH, JSON.stringify(arr, null, 2) + '\n', 'utf8');
}

// ── Shared helpers ───────────────────────────────────────────────────────────

/** Collect the real (un-suppressed, un-allowlisted) violations in one file. */
function collectViolations(filePath, src, allowlist) {
  const out = [];
  for (const { lineNo, text, kind } of extractHeadings(filePath, src)) {
    if (getLine(src, lineNo - 1).includes('title-case-ignore')) continue;
    if (allowlist.has(text)) continue;
    if (checkTitleCase(text) === null) continue;
    out.push({ lineNo, text, kind, suggestion: toTitleCase(text) });
  }
  return out;
}

/** Apply one accepted suggestion to a file's content string. */
function applyFix(content, text, fixed, kind) {
  if (fixed === text) return content;
  // Quoted prop/data values (headline="...", title="...", title: '...')
  content = content.replaceAll(`"${text}"`, `"${fixed}"`);
  content = content.replaceAll(`'${text}'`, `'${fixed}'`);
  // Bare JSX text content inside <hN>...</hN> tags
  if (kind.includes('<h') && kind.includes('tag')) {
    content = content.replaceAll(`>${text}<`, `>${fixed}<`);
    content = content.replace(
      new RegExp(`>(\\s*)${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s*)<`, 'g'),
      `>$1${fixed}$2<`
    );
  }
  return content;
}

function readAppFile(filePath) {
  const absPath = resolve(filePath);
  if (!absPath.replace(/\\/g, '/').includes('/src/app/')) return null;
  try {
    return { absPath, src: readFileSync(absPath, 'utf8') };
  } catch {
    return null; // deleted in a rename, etc.
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const FIX_MODE = process.argv.includes('--fix');
const REVIEW_MODE = process.argv.includes('--review');
const files = process.argv.slice(2).filter(f => !f.startsWith('--') && f.endsWith('.tsx'));
const allowlist = loadAllowlist();

if (files.length === 0) {
  process.exit(0);
}

// ── --fix : accept every suggestion at once ──────────────────────────────────
if (FIX_MODE) {
  for (const filePath of files) {
    const f = readAppFile(filePath);
    if (!f) continue;
    let content = f.src;
    for (const v of collectViolations(filePath, f.src, allowlist)) {
      content = applyFix(content, v.text, v.suggestion, v.kind);
    }
    if (content !== f.src) {
      writeFileSync(f.absPath, content, 'utf8');
      console.log(`[Title Case] Fixed: ${filePath}`);
    }
  }
  process.exit(0);
}

// ── --review : step through each violation, accept / keep / skip ──────────────
if (REVIEW_MODE) {
  // Queue-based line reader: buffers lines as they arrive and hands them to
  // prompts in order. Works the same whether the answers are typed at a real
  // terminal or piped in; once input runs out (EOF) every remaining prompt
  // resolves to null, which the loop treats as "skip" — so it never hangs.
  const rl = createInterface({ input: process.stdin });
  const buffered = [];
  const waiting = [];
  let inputClosed = false;
  rl.on('line', line => (waiting.length ? waiting.shift()(line) : buffered.push(line)));
  rl.on('close', () => {
    inputClosed = true;
    while (waiting.length) waiting.shift()(null);
  });
  const ask = q => {
    process.stdout.write(q);
    if (buffered.length) return Promise.resolve(buffered.shift());
    if (inputClosed) return Promise.resolve(null);
    return new Promise(res => waiting.push(res));
  };

  let accepted = 0;
  let kept = 0;
  let skipped = 0;
  let allowlistChanged = false;

  for (const filePath of files) {
    const f = readAppFile(filePath);
    if (!f) continue;
    const violations = collectViolations(filePath, f.src, allowlist);
    if (violations.length === 0) continue;

    console.log(`\n\x1b[1m${filePath}\x1b[0m`);
    let content = f.src;
    let fileChanged = false;

    for (const v of violations) {
      console.log(`\n  Line ${v.lineNo} [${v.kind}]`);
      console.log(`    Found:      "${v.text}"`);
      console.log(`    Suggestion: "${v.suggestion}"`);
      const ans = ((await ask('    [a]ccept suggestion / [k]eep original / [s]kip? ')) ?? '')
        .trim()
        .toLowerCase();

      if (ans === 'a' || ans === 'accept') {
        content = applyFix(content, v.text, v.suggestion, v.kind);
        fileChanged = true;
        accepted++;
      } else if (ans === 'k' || ans === 'keep') {
        allowlist.add(v.text);
        allowlistChanged = true;
        kept++;
      } else {
        skipped++;
      }
    }

    if (fileChanged) {
      writeFileSync(f.absPath, content, 'utf8');
      console.log(`  \x1b[32m→ updated ${filePath}\x1b[0m`);
    }
  }

  rl.close();
  if (allowlistChanged) {
    saveAllowlist(allowlist);
    console.log(`\nAllowlist now holds ${allowlist.size} approved heading(s): ${ALLOWLIST_PATH}`);
  }
  console.log(`\nAccepted ${accepted} · Kept ${kept} · Skipped ${skipped}`);
  // Skipped items are still violations, so fail if any remain unresolved.
  process.exit(skipped > 0 ? 1 : 0);
}

// ── default : report and fail (what the pre-commit hook and CI run) ───────────
let totalViolations = 0;

for (const filePath of files) {
  const f = readAppFile(filePath);
  if (!f) continue;
  const violations = collectViolations(filePath, f.src, allowlist);
  if (violations.length === 0) continue;

  totalViolations += violations.length;
  console.error(`\n[Title Case Violations] ${filePath}`);
  for (const v of violations) {
    console.error(`  Line ${v.lineNo} [${v.kind}]:`);
    console.error(`    Found:      "${v.text}"`);
    console.error(`    Suggestion: "${v.suggestion}"`);
  }
}

if (totalViolations > 0) {
  console.error(
    `\n${totalViolations} violation${totalViolations === 1 ? '' : 's'} found. Resolve each by:\n` +
      `  • pnpm title-case:review  — step through each: accept the suggestion or keep the original\n` +
      `  • pnpm title-case:fix     — accept every suggestion at once\n` +
      `  • keep one as-is          — "keep" in review adds it to scripts/title-case-allow.json\n` +
      `                              (survives /admin DSL regeneration, unlike a // title-case-ignore comment)\n`
  );
  process.exit(1);
}

process.exit(0);
