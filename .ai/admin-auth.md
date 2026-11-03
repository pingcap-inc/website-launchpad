# Admin Authentication (Google login, @pingcap.com only)

The admin CMS (`/admin/*`) and its API routes (`/api/*`) are gated by Google
sign-in, restricted to the `pingcap.com` email domain. Implemented with
[Auth.js v5](https://authjs.dev) (`next-auth@5`).

## Gate behaviour (see `src/middleware.ts`)

| Environment                | Condition                                                                             | Behaviour                                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production                 | `VERCEL_ENV === 'production'`                                                         | `/admin` + `/api` return **404** (unchanged)                                                                                                                                                             |
| Preview — non-`staging`    | `VERCEL_ENV === 'preview'`, not the staging deployment (below)                        | **404** — admin is hidden on per-PR previews                                                                                                                                                             |
| Preview — `staging` branch | `VERCEL_ENV === 'preview'`, git ref = `staging`, repo = pingcap-inc/website-launchpad | **Require** a signed-in `@pingcap.com` Google user                                                                                                                                                       |
| Local (`pnpm dev`)         | `VERCEL_ENV` unset, `NODE_ENV === 'development'`                                      | **Require** login (same as staging) by default; skipped only with `ADMIN_DEV_AUTH_BYPASS=1` in `.env.local`, and then only for a loopback `Host` (localhost / 127.0.0.1 / [::1]) — anything else **404** |
| Anything else              | e.g. `next start` off Vercel, unknown `VERCEL_ENV`, missing git ref                   | **404** — fails closed                                                                                                                                                                                   |

Local development is **secure by default**: without the opt-out it goes through
the same Auth.js gate as staging (sign in with a `@pingcap.com` Google account,
which needs `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` locally). To work without
logging in on your own machine, add `ADMIN_DEV_AUTH_BYPASS=1` to `.env.local`
(exactly `1`; see `src/lib/dev-auth.ts`). The opt-out only applies under `next dev`
off Vercel, so a container or VM started with `NODE_ENV=development`, or a fresh
checkout without the flag, still requires login.

With the opt-out, `pnpm dev` binds to `127.0.0.1` (`next dev -H 127.0.0.1`), so the
ungated local admin is not reachable from the LAN, and requests whose `Host` isn't a
loopback name get 404 (defense in depth against DNS rebinding). If you deliberately
run `next dev -H 0.0.0.0` (e.g. to test on a phone), `/admin` and `/api` return 404
from non-loopback hosts.

Cross-origin writes (`POST`/`PUT`/`PATCH`/`DELETE` to `/api/*` with a foreign
`Origin`, or `Sec-Fetch-Site: cross-site`) get **403** on staging and locally.
`/admin` and `/api` responses also carry `X-Frame-Options: SAMEORIGIN`,
`frame-ancestors 'self'`, `nosniff` and a strict `Referrer-Policy`.

So the admin only ever appears on the single **staging** deployment, and that
deployment requires login. The staging URL is public and predictable, so the
login — not the obscurity of the URL — is what actually protects it.

Staging detection (`isStagingDeployment`, `src/lib/dev-auth.ts`) requires
`VERCEL_ENV === 'preview'`, `VERCEL_GIT_COMMIT_REF === 'staging'` (the deployed
branch — `VERCEL_ENV` is `preview` for every branch preview and can't distinguish
them) **and** the Vercel system vars `VERCEL_GIT_REPO_OWNER === 'pingcap-inc'` /
`VERCEL_GIT_REPO_SLUG === 'website-launchpad'` (case-insensitive). A branch merely
_named_ `staging` in a fork or another connected repo therefore gets 404. If any of
these vars is missing (e.g. "Automatically expose System Environment Variables" is
turned off in the Vercel project), the admin fails closed with 404.

### Handler-level backstop

Route handlers re-check the same decision with `requireAdmin(req)` /
`requirePageManager(req)` from `src/lib/security/require-admin.ts` (each returns
`null` to proceed, or the 401/403/404 `Response` to send). These replicate the
middleware's environment + session rules (not its CSRF check or headers), so a
matcher change or path-normalisation gap can't expose an API on its own.

### Post-login redirect

The middleware passes only a relative `callbackUrl` (`/admin/...`) to
`/admin/login`, and the login page accepts nothing else (`safeAdminCallback`,
`src/app/admin/login/safe-callback.ts`): absolute URLs, `//host`, backslashes,
control characters and non-`/admin` paths fall back to `/admin/`.

Domain enforcement is in the `signIn` callback in `src/auth.ts`: a login is
accepted only when Google reports `email_verified` **and** the email ends in
`@pingcap.com`. The Google `hd` param is only a UI hint and is not trusted.

Unauthenticated requests on staging: browser navigations are redirected to
`/api/auth/signin`; API calls get `401`.

## Required environment variables

Set these on Vercel for the **Preview** environment (and in `.env.local` only if
you want to exercise the real login flow locally):

| Variable             | What it is                                                   |
| -------------------- | ------------------------------------------------------------ |
| `AUTH_SECRET`        | Session/JWT signing secret. Generate with `npx auth secret`. |
| `AUTH_GOOGLE_ID`     | Google OAuth 2.0 **Client ID**.                              |
| `AUTH_GOOGLE_SECRET` | Google OAuth 2.0 **Client secret**.                          |

> `AUTH_SECRET` **must** be set on every deployed (preview) environment **and** in
> `.env.local` if you sign in locally (generate one with `npx auth secret`). Without
> it Auth.js fails closed (no session can be issued or verified). There is no
> hardcoded fallback secret: only the explicit local opt-out
> (`ADMIN_DEV_AUTH_BYPASS=1`), where no session is ever needed, gets a random
> per-process stand-in so Auth.js can initialise.

Sessions are JWTs that expire after **12 hours** (refreshed hourly while in use).
They can't be revoked early; signing out clears the cookie on that browser only.
Rotating `AUTH_SECRET` invalidates every session at once.

### Who can delete or move pages

Deleting and moving (renaming the slug of) a page are both destructive — a move
removes the page from its old URL on the draft and published branches — so they
share one allowlist: `PAGE_MANAGERS` (`src/lib/admin-permissions.ts`, currently
`liwen.xu@pingcap.com`, checked with `canManagePages`). The endpoints are listed in
`DESTRUCTIVE_PAGE_PATHS` (`/api/pages/delete`, `/api/pages/move`). The rule is
enforced in the middleware (→ **403** "you are not allowed to delete or move pages"
for anyone else) and again in the handlers via `requirePageManager`. The pages list
only shows the Delete button to those accounts; the editor still shows the slug
field, and a move by anyone else fails with that 403 message. Publishing, copying
and draft saves stay open to any signed-in `@pingcap.com` user. Local `pnpm dev`
with `ADMIN_DEV_AUTH_BYPASS=1` (no login) is not restricted; without it, the same
rule as staging applies. To change who is allowed, edit `PAGE_MANAGERS` and ship it
through a PR.

## Google Cloud Console setup (one time)

1. **APIs & Services → Credentials → Create credentials → OAuth client ID**,
   type **Web application**.
2. **Authorized redirect URIs** — add the callback for each host that serves the
   admin:
   - `https://<your-preview-host>/api/auth/callback/google`
   - (optional, for local login) `http://localhost:3000/api/auth/callback/google`

   Preview hostnames rotate per deploy. Prefer a **stable** preview alias (e.g.
   the staging branch alias `website-launchpad-git-staging-pingcap.vercel.app`)
   and register its callback once. `trustHost: true` is already set so Auth.js
   accepts the preview host.

3. Copy the Client ID / secret into `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`.
4. (Recommended) On the OAuth consent screen, set **User type = Internal** so
   only the PingCAP Google Workspace org can even attempt sign-in — defense in
   depth on top of the `signIn` domain check.

## Rollout note

Merging this does not lock anyone out of production (admin is already 404 there).
It **does** gate preview/staging: once deployed, `AUTH_SECRET` + the Google
credentials must be present in the Preview environment or the admin will reject
sign-in. Configure them before/with the merge.

## Audit logging (user operation records)

Every state-changing admin operation emits one structured JSON line via
`logAudit()` (`src/lib/audit.ts`). On Vercel these land in the deployment's
runtime logs (Project → Logs) and can be forwarded to a log drain for retention.

Logged routes: `POST /api/publish` (success + main-token denial),
`POST /api/pages/delete`, `POST /api/pages/move`, `POST /api/pages/copy`,
`PUT /api/pages/[...slug]` (draft save), `POST /api/admin/upload-image`.

Access **denials** are logged too: every 401/403 the middleware returns on a
reachable admin (not signed in, CSRF / cross-origin write, not a page manager), and
every denial from the handler backstop, emits `action: "access"`, `status:
"denied"`, the path as `target` and e.g. `"POST 403 not a page manager"` as
`detail` (via the Edge-safe `writeAuditRecord`). For CSRF denials the actor is
`unresolved` (the session isn't read before refusing); unauthenticated calls are
`anonymous`. Plain 404s for production / non-staging hosts are not logged.

Each line carries: `ts`, `actor` (the signed-in Google email; `local-dev` when
login is bypassed locally), `ip`, `env`, `action`, `target`, optional `targetTo`
/ `branch` / `detail`, and `status` (`success` | `denied` | `error`). Filter the
logs by the `[audit]` prefix, e.g.:

```
[audit] {"ts":"…","actor":"alice@pingcap.com","action":"delete","target":"lp/foo","status":"success","detail":"2 file(s)"}
```

The actor is only meaningful where login is enforced (the staging deployment).

## Admin UI: user menu + page authorship

- **User menu** — the admin shell top bar shows the signed-in Google name/email
  with a **Sign out** button (`src/components/admin/UserMenu.tsx`, server-action
  `signOut`). Hidden when there is no session (local dev).
- **Page authorship** — `meta.createdBy` / `createdAt` / `modifiedBy` / `modifiedAt`
  are stamped server-side on every write (`stampAuthorship`, `src/lib/authorship.ts`)
  from publish, draft-save, and copy. The creator is set once and preserved; copy
  stamps the current user. The pages list shows "Created by X · Modified by Y".
  Only pages written after this ships carry authorship; older pages show nothing
  until next saved.

## GitHub API identity (least-privilege token)

The server resolves its GitHub token through `getGitHubToken()`
(`src/lib/github-auth.ts`), used by every route that calls the GitHub API.

- **Preferred — GitHub App.** Set `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY` (PEM),
  and optionally `GITHUB_APP_INSTALLATION_ID` (auto-resolved from the repo if
  omitted). The server signs a short-lived JWT with the private key and mints a
  **1-hour installation token** (cached until ~5 min before expiry). The App is
  installed on only this repo with only the permissions it needs (Contents: R/W),
  and commits are attributed to the App — not a person.
- **Fallback — `GITHUB_TOKEN` PAT.** Used **only when the App vars are absent**, so
  nothing breaks before the App exists and local dev keeps working. Once the App is
  configured, a failed App token mint fails closed (the route returns 500 and logs
  the error) instead of silently falling back to the PAT. Remove `GITHUB_TOKEN` from
  Preview once the App is confirmed working.

### GitHub App setup (one time)

1. Org → Settings → Developer settings → **GitHub Apps → New GitHub App**.
   - Repository permissions: **Contents: Read & write** (+ Metadata: read, implied).
   - Where can this app be installed: **Only on this account**.
2. Generate a **private key** (downloads a `.pem`).
3. **Install** the App on `pingcap-inc/website-launchpad` only.
4. On Vercel (Preview scope) set `GITHUB_APP_ID` and `GITHUB_APP_PRIVATE_KEY`
   (paste the PEM; `\n`-escaped is fine). Redeploy, confirm admin writes work,
   then delete the old `GITHUB_TOKEN`.

This closes the "admin pushes with a personal account's broad PAT" risk: the
blast radius shrinks to one repo's contents, tokens are short-lived, and commits
are no longer attributed to an individual (the audit log still records the real
person behind each action).
