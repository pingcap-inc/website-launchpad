# Pre-Publish SEO / AEO Checklist

This document summarizes the current pre-publish quality rules for pages in `website-launchpad`.

There are two layers of evaluation before a page goes live:

1. Hard validation checks that can block publishing.
2. Quality scoring that helps the team decide whether the page is ready.

## Recommended Release Standard

Use this as the working release standard for content teams:

- All hard validation checks pass.
- AI `finalScore` is `80+`.
- AEO pages include a direct-answer intro, substantive body content, and at least 3 FAQ items.
- Page scorecard `overall` is ideally `80+` on staging.
- Final review happens on staging before production.

## 1. Hard Validation Checks

These checks are the true publishing gate in the current admin flow.

### Required SEO fields

- `meta title` is required.
- `meta description` is required.
- `slug` must be valid.

### Slug rules

- Slugs must use lowercase letters, numbers, `-`, and `/`.
- Empty slugs are invalid.
- Each slug segment must match `^[a-z0-9-]+$`.

### Required section content

The admin publish flow also validates required section-level fields. Examples:

- `hero`: `headline`
- `stats`: each item needs `value` and `label`
- `featureGrid` / `featureCard` / `featureHighlights`: section `title`, and each item needs `title` and `description`
- `caseStudyCards`: section `title`, and each item needs `logo`, `title`, `description`, and at least one stat
- `featureTabs`: section `title`, and each tab needs `label` and `image`
- `logoCloud`: each logo needs `name` and `image`
- `testimonials`: section `title`, and each item needs `quote` and `author`
- `faq`: each item needs `q` and `a`
- `cta`: primary CTA `text` and `href`
- `form`: `formId` and `portalId`

### Link validation

- Pages with failed link checks should not be published.

## 2. AI Quality Scoring

The editor can run AI scoring before publish.

### Score thresholds used in the UI

- `80+`: Ready to publish
- `60-79`: Review suggested improvements
- `<60`: Significant improvements needed

The UI guidance explicitly says to aim for `80+` before publishing.

### Final score formula

The current formula is:

`finalScore = overallScore - rulePenalties`

Where:

- `overallScore` comes from the LLM evaluation.
- `rulePenalties` come from deterministic structural checks.

## 3. Marketing Page Scoring Rules

Marketing pages are scored across three dimensions:

- `UX`: 40 points
- `SEO`: 30 points
- `Consistency`: 30 points

### What the LLM evaluates

#### UX

- Clear information hierarchy
- CTA clarity and placement
- Content scannability
- Section length and readability
- Visual balance

#### SEO

- Presence of title and meta description
- Keyword usage
- Semantic structure
- Image alt text, when applicable

#### Consistency

- Use of allowed DSL components
- Layout consistency
- Tone consistency
- Avoiding redundancy and verbosity

### Fixed rule penalties for marketing pages

- Missing `meta description`: `-5`
- Missing `meta title`: `-5`
- No CTA found anywhere on the page: `-10`
- More than 8 sections: `-5`

## 4. AEO Page Scoring Rules

These rules apply when the page type is:

- `listicle`
- `compare`
- `playbook`

In the editor UI, these dimensions are relabeled as:

- `Content Depth`: 40 points
- `AEO Quality`: 30 points
- `Structure`: 30 points

### What the LLM evaluates

#### Content Depth

- Main content is substantive, not thin
- Coverage includes key differentiators such as use cases, pros/cons, and pricing signals
- The intro directly answers the core query
- The page avoids filler and duplicate content

#### AEO Quality

- FAQ section is present and substantive
- The first paragraph follows the direct-answer principle
- Product, vendor, and entity references are specific and accurate
- Claims are structured clearly enough for AI citation
- Headings and section titles clarify page taxonomy

#### Structure

- `richTextBlock` is used for the intro and main content
- `meta title` is present and ideally `50-60` characters
- `meta description` is present and ideally `120-160` characters
- `pageName` is present and used as the H1
- Redundant sections are avoided

### Fixed rule penalties for AEO pages

- Missing `meta description`: `-5`
- Missing `meta title`: `-5`
- Missing `pageName` / H1: `-5`
- No `richTextBlock`: `-10`
- `richTextBlock` body is too short: `-6`
  - The current implementation expects at least one `richTextBlock` with content longer than 300 characters.
- No FAQ section: `-5`
- FAQ has fewer than 3 items: `-3`
- No CTA section found: `-5`

## 5. Lighthouse-Style Page Scorecards

The repo also includes a page scoring script:

`pnpm run score:pages`

This script evaluates real rendered pages, usually against a staging or preview URL. It is not AEO-specific, but it is useful as a release-quality signal.

### Scorecard dimensions

#### UX

`UX = performance * 0.4 + accessibility * 0.3 + bestPractices * 0.3`

#### SEO

`SEO = lighthouseSEO * 0.5 + titleLength * 0.1 + metaDescriptionLength * 0.1 + h1 * 0.1 + internalLinks * 0.1 + headingStructure * 0.1`

#### Consistency

`Consistency = h1 * 0.2 + headingStructure * 0.2 + altCoverage * 0.2 + ctaCasing * 0.2 + internalLinks * 0.2`

#### Overall

`Overall = (UX + SEO + Consistency) / 3`

### What the script specifically checks

- Lighthouse `performance`
- Lighthouse `accessibility`
- Lighthouse `best-practices`
- Lighthouse `seo`
- Title length
- Meta description length
- H1 count
- Internal link count
- Heading structure
- Image alt text coverage
- CTA casing consistency

### Recommended scorecard targets

These are good operational targets for staging reviews:

- `UX >= 80`
- `SEO >= 85`
- `Consistency >= 80`
- `Overall >= 80`

## 6. Important Clarification

Today, the quality score is guidance, not a hard CI release gate.

- The admin publish flow blocks on validation and failed links.
- The AI score provides a quality recommendation.
- The scorecard workflow generates reports, but it does not currently fail the workflow based on a minimum threshold.

## 7. Practical Team Checklist

Before publishing, confirm all of the following:

- Meta title is present.
- Meta description is present.
- Slug is clean and valid.
- Required content fields are complete for every section.
- No broken links remain.
- AI `finalScore` is at least `80`.
- For AEO pages, the intro answers the query immediately.
- For AEO pages, the body contains substantive `richTextBlock` content.
- For AEO pages, FAQ includes at least 3 meaningful questions.
- Staging scorecard is reviewed.
- Final stakeholder review happens on staging before production.
