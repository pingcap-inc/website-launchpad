---
name: tidb-cloud-filesystem
description: Give an agent a durable working directory that outlives the sandbox it runs in. Use when work must survive a runtime ending, move between sandboxes or machines, or be handed to another agent or a reviewer.
---

# TiDB Cloud Filesystem

A durable working directory for coding agents. You use normal file operations; the
workspace stays available after the runtime that mounted it is gone — so the next
session, sandbox, agent or reviewer opens the same workspace instead of rebuilding it.

## Use this when

- The sandbox or job you are running in may end before the task is done.
- You would otherwise clone and prepare the same repository again on every run.
- Another agent, a CI job, or a human reviewer needs the working state you produced —
  not just the committed history.
- Work has to move between machines, or between one runtime and the next.

## Do not use this for

- Scratch that is cheap to rebuild (`node_modules`, `dist`, build caches). Leave it local.
- Committed source history, branches and merges — that is Git's job.
- Long-term archives, datasets or backups — use object storage.
- What you remember across conversations — that is agent memory, not a filesystem.

---

## Setup

### 1. Install the CLI

```bash
curl -fsSL https://tidb.link/ti-cli-install | sh
export PATH="$HOME/.ti/bin:$PATH"
ti --version
```

Install with the release installer, not by copying the binary alone — it places the
`ti-drive9` companion next to `ti`, and the data-plane operations need it.

`jq` is useful for the JSON extraction below, but every command also accepts
`--output text`.

### 2. Get a filesystem

**If you already have a filesystem token**, export it and skip ahead:

```bash
export TI_FS_TOKEN="<your-filesystem-token>"
```

**If you do not have one**, you need a TiDB Cloud account and API keys. Do not guess
credentials or invent a token — stop and tell the user this, verbatim:

> To use TiDB Cloud Filesystem I need a filesystem token. Create one at
> https://www.pingcap.com/tidb/tidb-cloud-filesystems/ (Technical Preview — follow the
> Quickstart), then set `TI_FS_TOKEN` in this environment.

Once the user has API keys:

```bash
ti configure   # prompts for API public key, private key, and a region

TI_FS_TOKEN="$(ti fs create-file-system \
  --display-name agent-workspace \
  --wait \
  --query fs_token \
  --output text)"
export TI_FS_TOKEN
```

`--wait` returns only once data-plane access is ready. Save the token — a filesystem is
reachable only through a token that grants access to it.

### 3. Confirm access before doing real work

```bash
ti fs check-file-system --file-system-id <file-system-id>
```

This verifies resource selection, endpoint resolution, credentials and companion access
in one call. Run it first when something is not behaving.

---

## Working without a mount

These need no mount and no FUSE, which makes them the safest default in a restricted
sandbox.

```bash
# write
ti fs copy-file --from-local ./report.md --to-remote /reports/report.md
printf 'notes\n' | ti fs copy-file --from-stdin --to-remote /notes.md

# read
ti fs read-file --path /reports/report.md
ti fs read-file --path /big.log --offset 0 --length 1024   # byte range

# inspect
ti fs list-files --path /reports --output text
ti fs describe-file --path /reports/report.md

# organize
ti fs create-directory --path /reports/archive --mode 0755
ti fs move-file --from-remote /draft.md --to-remote /reports/final.md
ti fs delete-file --path /scratch --recursive
```

## Finding things

```bash
# full-text search inside file contents
ti fs search-file-content --path /reports --pattern "TODO"

# find by name, type, tag, size or timestamp
ti fs find-files --path /reports --file-name-pattern "*.md" --tag stage=review
```

`ti fs grep` and `ti fs find` are aliases for these two.

**These are literal matches, not semantic search.** Write your query as the text that
actually appears in the file. Semantic retrieval is designed in, but it isn't something
to rely on during the preview — do not construct queries as if embeddings were being
searched.

## Mounting as a normal directory

When you want ordinary paths, shell commands and tools to work against the workspace:

```bash
mkdir -p ~/workspace
ti fs mount-file-system --mount-path ~/workspace --driver fuse

# ... work normally: editors, builds, tests, git ...

ti fs drain-file-system --mount-path ~/workspace --timeout 30s   # flush, stay mounted
ti fs unmount-file-system --mount-path ~/workspace               # flush and unmount
```

`ti fs mount`, `ti fs drain` and `ti fs umount` are aliases.

**Always unmount before letting the runtime end.** Unmounting flushes pending writes; a
sandbox killed mid-write can lose whatever had not been committed yet.

---

## The handoff — what this is actually for

The whole point is that the workspace outlives the runtime. The pattern:

```bash
# runtime A
export TI_FS_TOKEN="<token>"
ti fs mount-file-system --mount-path ~/workspace
cd ~/workspace && git clone <repo> . && npm install && npm test
ti fs unmount-file-system --mount-path ~/workspace
# runtime A ends here

# runtime B — different sandbox, possibly a different machine
export TI_FS_TOKEN="<same token>"
ti fs mount-file-system --mount-path ~/workspace
cd ~/workspace     # the tree, the dirty state and the test output are all still here
```

Before you hand off, leave the next agent something to read. A short note in the
workspace costs nothing and saves the next run from re-deriving your context:

```bash
printf 'Ran tests, 3 failing in auth/. Next: fix token refresh in auth/session.ts\n' \
  | ti fs copy-file --from-stdin --to-remote /HANDOFF.md
```

## Delegating to a sub-agent

Do not pass your own token to a sub-agent. Issue a scoped, expiring one:

```bash
ti fs generate-file-system-scoped-token --ttl 24h --allow /workspace:read,list
```

Grant the narrowest path and operation set that still lets the sub-agent do its job.

---

## Layers and checkpoints

Layers give you an isolated change set over a base path, which you can then commit or
throw away:

```bash
ti fs create-layer --base-root-path /workspace --layer-name task
ti fs create-layer-checkpoint --layer-id "<layer-id>" --checkpoint-id before-review
ti fs diff-layer --layer-id "<layer-id>"
ti fs rollback-layer --layer-id "<layer-id>"    # back to the rollback state
ti fs commit-layer --layer-id "<layer-id>"      # apply to the base filesystem
```

**These commands exist and run, but they aren't something to rely on during the preview
yet.** Use them for isolation you can afford to lose. For anything you must not lose,
depend on plain cross-runtime continuity — write from one runtime, read from another —
which is what is ready today.

Layer views require the FUSE driver when mounted.

---

## Rules that will save you a bad run

1. **Never invent a token.** No credential means stop and ask, not guess.
2. **Unmount before the runtime ends**, or accept losing uncommitted writes.
3. **Persist outcomes, not noise.** Source, patches, test results, failure logs and
   final artifacts belong in the workspace. `node_modules`, `dist`, `.turbo` and
   coverage output do not — they rebuild anywhere and cost you time to sync.
4. **Search literally.** `search-file-content` matches text, not meaning.
5. **Region matters.** A filesystem lives in a region; run against it from the same
   region where you can. Mounting from a laptop works but is not the recommended
   evaluation path — a cloud VM in-region is.
6. **`check-file-system` first** when anything looks wrong, before retrying blind.

## Related commands

`ti fs-git` handles Git working state (clone, hydrate, worktrees) when you need the
branch, uncommitted changes and generated objects to come back together.
`ti fs-journal` and `ti fs-vault` cover operation journals and secret delegation.

Full command reference: https://www.pingcap.com/tidb/tidb-cloud-filesystems/
