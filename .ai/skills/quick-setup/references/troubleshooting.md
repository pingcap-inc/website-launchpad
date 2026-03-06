# Troubleshooting

Use this file only when `scripts/setup-environment.sh` fails.

## `git is missing`

1. Install from [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Re-run:

```bash
bash .ai/skills/quick-setup/scripts/setup-environment.sh
```

## `node is missing` or `Node 20+ is required`

1. Install Node.js 20 LTS from [https://nodejs.org/en/download](https://nodejs.org/en/download)
2. Confirm:

```bash
node -v
```

3. Re-run setup script.

## `pnpm installation failed`

Run:

```bash
npm install -g pnpm
```

Then re-run setup script.

## `EACCES` / permission denied while installing global tools

Prefer `corepack` first:

```bash
corepack enable
corepack prepare pnpm@10 --activate
```

If still blocked, ask a developer to help configure npm global permissions.

## `pnpm install` fails due to network/proxy

1. Check corporate VPN/proxy settings.
2. Retry:

```bash
pnpm install --fetch-timeout 120000
```

3. Re-run setup script after network recovers.
