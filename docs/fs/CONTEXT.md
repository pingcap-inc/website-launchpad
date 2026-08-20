# TiDB Cloud FS Landing Page

The marketing site for TiDB Cloud Filesystem during its technical preview. This glossary fixes the vocabulary the page copy, the code samples, and the benchmark all have to agree on — drift between synonyms here is the most likely way the page ends up sounding vague.

## Language

### Product

**TiDB Cloud Filesystem**:
The product the page sells. One word in the name; "file system" as two words in ordinary prose; "FS" only after first use on a page.
_Avoid_: TiDB Cloud FS (as a first reference), TiDB FS, Drive9

**Drive9**:
The prototype and internal project codename for the backend engine that powers TiDB Cloud Filesystem. Appears in benchmark provenance and internal docs, never in page copy. The relationship is Amazon S3 (product) to its internal implementing service.
_Avoid_: using as the product name

**Git-aware workspace**:
The behaviour that a resumed workspace still carries its git history — clean tree as baseline, dirty overlay as the agent's modifications, object pack for new objects. Surfaced as `tdc fs-git`.
_Avoid_: git integration, git support

**Layer**:
A filesystem- or directory-level overlay that can be checkpointed, rolled back, diffed, and committed. What separates rebuildable files from files worth persisting.
_Avoid_: snapshot (which is one operation on a Layer), branch

### Agent workflow

**Workspace**:
The persistent state one or more Sandboxes mount and work in, concurrently and from different machines. Survives any Sandbox being destroyed; carries the working directory, git state, and artifacts. **The subject of the page's central claim** — agents come to the Workspace rather than carrying a copy of it.
_Avoid_: drive, volume, disk, share, bucket

**Working set**:
Everything an agent touches over a task — source, build artifacts, configs, secrets, audit trail, session snapshots. What a Workspace holds. Supporting vocabulary, not the headline.
_Avoid_: workload, data, files (when the whole set is meant)

**Consistency mode**:
The visibility guarantee chosen per Workspace — writeback, close-sync, or write-sync. Worth naming because the concept only exists for a genuinely shared filesystem; a single-machine store has no use for it. **The page's primary differentiator** — no competitor offers it, so no competitor can answer what a concurrent reader sees.
_Avoid_: sync mode, durability setting

**Runtime**:
Anything that can mount a Workspace and do work in it — a Sandbox, a CI job, a local tool, a reviewer's machine. The superset. Use it whenever the claim is about crossing a boundary, because Handoff targets are not always Sandboxes.
_Avoid_: machine, host, environment

**Sandbox**:
The ephemeral execution environment an agent runs in — the most common Runtime, and the one the page's scenarios use. Lightweight, elastic, replaceable, and deliberately not ours: bring your own (E2B, Modal, Daytona). The split from Workspace is execution versus persistent state.
_Avoid_: container, VM, environment

**Handoff**:
Passing a Workspace from one agent or Sandbox to the next with its state intact, so the receiving agent resumes rather than restarts. Sequential — distinct from two Sandboxes holding one Workspace at the same time, which is plain concurrent access. Don't let the copy blur them.
_Avoid_: transfer, migration, sharing (which means the concurrent case)

> Naming hazard: **"agent filesystem"** now reads as a reference to Turso's product **AgentFS**, not as a category. Say "filesystem for coding agents" or name the product outright.

### Credentials

**Filesystem token**:
The credential string that authorizes access to one filesystem instance, carried as `TDC_FS_TOKEN`. Issued when the filesystem is created. The only mechanism for using a filesystem persistently across sessions, tools, and machines.
_Avoid_: token, access token, mount key, fs_token (in prose)

**API key**:
The account-level TiDB Cloud Public Key and Private Key pair, created in the web console and required to provision a filesystem. Whether it appears in page copy is an open decision — the console UI that would remove it does not ship until 2026-09-15.
_Avoid_: token, credentials, secret

### Storage

**Inline threshold**:
The size boundary below which file content is held inline in the database rather than in object storage. A **backend parameter that is still being tuned** — roughly 1 MB as of 2026-08-03, previously 50 KB — and not customer-visible. Never state a figure in page copy; describe the behaviour instead.
_Avoid_: cutoff, small-file limit, 50 KB (a stale figure)

**Small file**:
A file below the Inline threshold, held inline in the database. Defined by behaviour, not by a number, because the threshold moves.
_Avoid_: tiny file, hot file, any specific byte size

**Large file**:
A file at or above the Inline threshold, held in object storage.
_Avoid_: blob, big file

> Note: `juicefs bench` uses "small file" to mean a fixed 128 KiB. That is a benchmark parameter, not this definition — never quote its figures as Small file figures.
