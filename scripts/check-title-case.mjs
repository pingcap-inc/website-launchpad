#!/usr/bin/env node
/**
 * check-title-case.mjs
 * Validates that H1-H6 headings in page files follow Title Case rules.
 *
 * Title Case Rules:
 * - Capitalize the first word always
 * - Capitalize nouns, pronouns, verbs, adjectives, adverbs
 * - Do NOT capitalize: a an the and but or for nor on at to from by with of in into up as
 * - Capitalize BOTH parts of hyphenated words (e.g., AI-Powered)
 *
 * Usage:
 *   node scripts/check-title-case.mjs [file1.tsx] [file2.tsx] ...
 *   (lint-staged passes staged file paths automatically)
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LOWERCASE_WORDS = new Set([
  'a', 'an', 'the',
  'and', 'but', 'or', 'for', 'nor',
  'on', 'at', 'to', 'from', 'by', 'with', 'of', 'in', 'into', 'up', 'as',
]);

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

// H1: headline= prop (HeroSection)
const HEADLINE_PROP_RE = /\bheadline=(?:"([^"]+)"|'([^']+)'|\{"([^"]+)"\})/g;

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
 * Validate a single word part (after splitting on '-') against Title Case rules.
 * @param {string} part - the word part to check
 * @param {boolean} isFirst - true if this is the very first part of the first word
 * @param {boolean} isHyphenPart - true if this is a subsequent part of a hyphenated word
 * Returns null if valid, or a description of the violation.
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

  if (isFirst) {
    // First word must always be capitalized
    if (firstChar !== firstChar.toUpperCase() || firstChar === firstChar.toLowerCase()) {
      return `"${part}" should be capitalized (it's the first word)`;
    }
  } else if (!isHyphenPart && LOWERCASE_WORDS.has(lower)) {
    // Prepositions/conjunctions must NOT be capitalized — but hyphenated parts are always capitalized
    // per the rule: "Capitalize both parts of hyphenated words (e.g., AI-Powered)"
    if (firstChar !== firstChar.toLowerCase()) {
      return `"${part}" should be lowercase (it's a preposition/conjunction)`;
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
  if (shouldSkip(text)) return null;

  // Handle literal \n (the two-character sequence in JSX string attributes)
  const segments = text.split(/\\n/);
  for (const seg of segments) {
    const trimmed = seg.trim();
    if (shouldSkip(trimmed)) continue;

    const words = trimmed.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (!word) continue;

      const parts = word.split('-');
      for (let j = 0; j < parts.length; j++) {
        const isFirst = i === 0 && j === 0;
        const isHyphenPart = j > 0;
        const violation = checkPart(parts[j], isFirst, isHyphenPart);
        if (violation) return violation;
      }
    }
  }
  return null;
}

/**
 * Generate a Title Case suggestion for a given text.
 */
function toTitleCase(text) {
  // Handle literal \n segments
  return text.split(/\\n/).map(seg => {
    const leading = seg.match(/^\s*/)[0];
    const trailing = seg.match(/\s*$/)[0];
    const trimmed = seg.trim();
    if (!trimmed) return seg;

    const words = trimmed.split(/\s+/);
    const fixed = words.map((word, i) => {
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
        const isFirst = i === 0 && j === 0;
        const isHyphenPart = j > 0;

        let corrected;
        if (isFirst) {
          corrected = clean[0].toUpperCase() + clean.slice(1);
        } else if (!isHyphenPart && LOWERCASE_WORDS.has(lower)) {
          corrected = lower;
        } else {
          corrected = clean[0].toUpperCase() + clean.slice(1);
        }
        return leadingSymbols + corrected + suffix;
      }).join('-');
    });
    return leading + fixed.join(' ') + trailing;
  }).join('\\n');
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

const FIX_MODE = process.argv.includes('--fix');
const files = process.argv.slice(2).filter(f => f !== '--fix' && f.endsWith('.tsx'));

if (files.length === 0) {
  process.exit(0);
}

let totalViolations = 0;

for (const filePath of files) {
  const absPath = resolve(filePath);
  let src;
  try {
    src = readFileSync(absPath, 'utf8');
  } catch {
    // File may have been deleted (e.g., in a rename); skip gracefully
    continue;
  }

  // Only process page files (src/app/**/*.tsx), not component library files
  const normalizedPath = absPath.replace(/\\/g, '/');
  if (!normalizedPath.includes('/src/app/')) continue;

  const headings = extractHeadings(filePath, src);

  if (FIX_MODE) {
    let content = src;
    for (const { lineNo, text, kind } of headings) {
      const prevLine = getLine(src, lineNo - 1);
      if (prevLine.includes('title-case-ignore')) continue;
      if (checkTitleCase(text) === null) continue;

      const fixed = toTitleCase(text);
      if (fixed !== text) {
        // Quoted prop values (headline="...", title="...", title: '...')
        content = content.replaceAll(`"${text}"`, `"${fixed}"`);
        content = content.replaceAll(`'${text}'`, `'${fixed}'`);
        // Bare JSX text content inside <hN>...</hN> tags
        if (kind.includes('<h') && kind.includes('tag')) {
          content = content.replaceAll(`>${text}<`, `>${fixed}<`);
          // With surrounding whitespace
          content = content.replace(
            new RegExp(`>(\\s*)${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s*)<`, 'g'),
            `>$1${fixed}$2<`
          );
        }
      }
    }
    if (content !== src) {
      writeFileSync(absPath, content, 'utf8');
      console.log(`[Title Case] Fixed: ${filePath}`);
    }
  } else {
    const violations = [];
    for (const { lineNo, text, kind } of headings) {
      // Check for suppression comment on the preceding line
      const prevLine = getLine(src, lineNo - 1);
      if (prevLine.includes('title-case-ignore')) continue;

      const violation = checkTitleCase(text);
      if (violation) {
        violations.push({ lineNo, text, kind, suggestion: toTitleCase(text) });
      }
    }

    if (violations.length > 0) {
      totalViolations += violations.length;
      console.error(`\n[Title Case Violations] ${filePath}`);
      for (const v of violations) {
        console.error(`  Line ${v.lineNo} [${v.kind}]:`);
        console.error(`    Found:      "${v.text}"`);
        console.error(`    Suggestion: "${v.suggestion}"`);
      }
    }
  }
}

if (!FIX_MODE && totalViolations > 0) {
  console.error(
    `\n${totalViolations} violation${totalViolations === 1 ? '' : 's'} found. Fix them or add {/* title-case-ignore */} above the element to suppress.\n`
  );
  process.exit(1);
}

process.exit(0);
