# Daily Operations Guide

## Generate pages in the repo with a single sentence — no coding required

> First-time users: complete the one-time setup in `SETUP.md` (~15 minutes).

---

## What you need

- Claude Code installed and configured (see `SETUP.md`, one-time only)
- A GitHub account with access to the `website-launchpad` repo
- An idea of what page you want to create

---

## Before each session

1. Open **Claude App** → **Claude Code**
2. Confirm the current project is `website-launchpad`

Claude Code automatically reads the project rules (`CLAUDE.md`) and knows which components to use first.

---

## Step 1 — Describe the page you want

Paste any existing material — Feishu doc, PRD, campaign brief — directly into Claude.
Claude handles all the technical work and creates the file in the repo.

💡 Not happy with the result? Just say:

- "Make the headline more impactful"
- "Add a customer story section after features"
- "Change the CTA button text to Join the Program"

---

## Step 2 — Preview locally

In Claude Code, say:

> "Start the local dev server"

Or open Terminal and run `pnpm dev`, then visit `http://localhost:3000/[page-path]` to review.

---

## Step 3 — Submit and create a PR

Tell Claude:

> "Submit to GitHub"

Claude will **automatically**:

1. Review the page across 5 dimensions: Code / Design / UX / SEO / AEO
2. Auto-fix any dimension scoring below 7/10
3. Once everything passes, run `git push` and create a PR

After the PR is created, GitHub Actions runs a second automated review and posts a score report in the PR comments. Share the preview link with your dev team to configure the reverse proxy — then the page goes live.

> **Emergency override**: If you need to skip the review and push immediately, tell Claude: "Skip review and push anyway".

---

## FAQ

**Q: I don't know what content to write.**
A: Paste any existing Feishu doc, PRD, or related material — Claude will organize it into a page.

**Q: How do I update a page after it's live?**
A: Open Claude Code, say "Update the /[path]/ page — [describe the change]", then tell it to submit.

**Q: The existing components don't cover what I need.**
A: Tell Claude: "The existing components aren't enough — create a new `[ComponentName]` component." Claude will build it following the design system rules, place it in `src/components/ui/`, and add it to the component list.

**Q: I see a terminal error I don't understand.**
A: Screenshot it and send to your dev team. Config issues are usually fixed in 5 minutes.

---

## File index

| File               | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `SETUP.md`         | One-time Claude Code setup                |
| `GUIDE.md`         | Daily operations manual (this file)       |
| `prompt-review.md` | Quality review scoring criteria reference |
