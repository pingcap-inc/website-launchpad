# Setup Guide

## One-time configuration — works forever after

> Takes about 10 minutes. Once done, creating pages only requires a single sentence.

---

## Step 1 — Download Claude App

Go to https://claude.ai/download, download the desktop Claude App, install and sign in.

---

## Step 2 — Open Claude Code

Open Claude App, find the **Claude Code** entry in the left sidebar and click it.

> Claude Code is the built-in code assistant in Claude App. It can directly read and modify files on your computer.

---

## Step 3 — Clone the repository

Open Terminal (Mac: press `Command + Space`, type "Terminal"), and paste:

```bash
git clone https://github.com/pingcap-inc/website-launchpad.git
cd website-launchpad
pnpm install
```

Wait for it to complete (~2 minutes).

---

## Step 4 — Open the repo in Claude Code

In the Claude Code interface:

1. Click **"Open Folder"** or **"Select Project"**
2. Navigate to and select the `website-launchpad` folder you just cloned

Claude will automatically read the project's `CLAUDE.md` and learn all the design and SEO rules.

---

## Step 5 — Verify setup

Type this in the Claude Code chat:

```
List all available components in this repo
```

If Claude can list `HeroSection`, `FeaturesGrid`, `CtaSection`, and others — setup is complete ✅

---

## Setup complete

Each time you use it:

1. Open Claude App → Claude Code
2. Confirm the project is `website-launchpad`
3. Describe the page you want to create

See `GUIDE.md` for the full workflow.

---

## Troubleshooting

**Can't find Claude Code**
Make sure Claude App is up to date, or visit https://support.claude.ai for help.

**Terminal error: `command not found: git`**
Install Git first: https://git-scm.com/downloads

**Terminal error: `command not found: pnpm`**
Install pnpm: run `npm install -g pnpm` in Terminal. If npm is also missing, first install Node.js LTS from https://nodejs.org/en/download.

**Other issues** — Screenshot and send to your dev team. Setup issues are usually resolved in 5 minutes.
