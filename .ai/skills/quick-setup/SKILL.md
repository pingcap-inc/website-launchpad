---
name: quick-setup
description: One-click local environment bootstrap for website-launchpad. Use when users (especially non-coders) ask to set up or fix local development environment, install missing dependencies (git/node/pnpm), run first-time install, or verify the project can run.
---

# Quick Setup

## Overview

Use this skill to let users finish setup with one command and minimum terminal knowledge.

## Workflow

1. Run bootstrap script from repository root:

```bash
bash .ai/skills/quick-setup/scripts/setup-environment.sh
```

2. If bootstrap fails, read `references/troubleshooting.md` and run only the matching fix for the detected error.
3. Re-run the bootstrap script after fixes.
4. Run verification script:

```bash
bash .ai/skills/quick-setup/scripts/verify-environment.sh
```

5. Report results in plain language:
   - Installed/updated tools
   - Whether dependencies were installed
   - Whether lint/type-check passed
   - Exact next command (`pnpm dev`)

## Script Contract

- `scripts/setup-environment.sh`
  - Ensure `git`, `node`, and `pnpm` are available (auto-install where safe).
  - Ensure Node major version is at least `20`.
  - Install project dependencies with `pnpm install`.

- `scripts/verify-environment.sh`
  - Print versions for `node` and `pnpm`.
  - Run `pnpm lint` and `pnpm type-check`.
  - Exit non-zero when checks fail.

## Response Style for Non-Coders

- Use short, direct status lines.
- Show copy-paste commands exactly.
- Avoid jargon unless also explained in one short sentence.
