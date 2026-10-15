import crypto from 'crypto'

/**
 * Resolves the token the server uses to talk to the GitHub API.
 *
 * Preferred: a **GitHub App** installation token — short-lived (~1h), scoped to a
 * single repo with only the permissions the App was granted, and attributed to the
 * App rather than a person. Configure with:
 *   - GITHUB_APP_ID
 *   - GITHUB_APP_PRIVATE_KEY           (PEM; literal \n are unescaped)
 *   - GITHUB_APP_INSTALLATION_ID       (optional; auto-resolved from the repo if absent)
 *
 * Fallback: the static GITHUB_TOKEN PAT, so nothing breaks before the App exists
 * and local dev keeps working. Remove GITHUB_TOKEN once the App is in place.
 *
 * The installation token is minted on demand and cached until shortly before it
 * expires; concurrent callers share a single in-flight mint.
 */

const RENEW_SKEW_MS = 5 * 60_000

let cachedToken: { token: string; expMs: number } | null = null
let cachedInstallationId: string | null = null
let inflight: Promise<string | null> | null = null

function appConfigured(): boolean {
  return Boolean(process.env.GITHUB_APP_ID && process.env.GITHUB_APP_PRIVATE_KEY)
}

function base64url(input: Buffer | string): string {
  return (typeof input === 'string' ? Buffer.from(input) : input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

// A short-lived JWT, signed with the App private key, authenticating *as the App*
// (used only to mint installation tokens — never sent to the content endpoints).
function createAppJwt(): string {
  const appId = process.env.GITHUB_APP_ID as string
  const pem = (process.env.GITHUB_APP_PRIVATE_KEY as string).replace(/\\n/g, '\n')
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  // iat backdated 60s for clock skew; exp well under the 10-minute max.
  const payload = base64url(JSON.stringify({ iat: now - 60, exp: now + 540, iss: appId }))
  const signingInput = `${header}.${payload}`
  const signature = crypto.sign('RSA-SHA256', Buffer.from(signingInput), pem)
  return `${signingInput}.${base64url(signature)}`
}

function appHeaders(jwt: string): Record<string, string> {
  return {
    Authorization: `Bearer ${jwt}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

async function resolveInstallationId(jwt: string): Promise<string | null> {
  if (process.env.GITHUB_APP_INSTALLATION_ID) return process.env.GITHUB_APP_INSTALLATION_ID
  if (cachedInstallationId) return cachedInstallationId

  const { GITHUB_OWNER, GITHUB_REPO } = process.env
  if (!GITHUB_OWNER || !GITHUB_REPO) return null

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/installation`,
    { headers: appHeaders(jwt) }
  )
  if (!res.ok) return null
  const data = (await res.json()) as { id?: number }
  if (!data.id) return null
  cachedInstallationId = String(data.id)
  return cachedInstallationId
}

async function mintInstallationToken(): Promise<string | null> {
  const jwt = createAppJwt()
  const installationId = await resolveInstallationId(jwt)
  if (!installationId) return null

  const res = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    { method: 'POST', headers: appHeaders(jwt) }
  )
  if (!res.ok) return null
  const data = (await res.json()) as { token?: string; expires_at?: string }
  if (!data.token) return null

  cachedToken = {
    token: data.token,
    expMs: data.expires_at ? new Date(data.expires_at).getTime() : Date.now() + 60 * 60_000,
  }
  return data.token
}

/**
 * Returns a usable GitHub token, or null if none can be obtained. Prefers a cached,
 * still-valid App installation token; otherwise mints one; otherwise falls back to
 * the GITHUB_TOKEN PAT.
 */
export async function getGitHubToken(): Promise<string | null> {
  if (!appConfigured()) {
    return process.env.GITHUB_TOKEN ?? null
  }

  if (cachedToken && cachedToken.expMs - Date.now() > RENEW_SKEW_MS) {
    return cachedToken.token
  }

  if (!inflight) {
    inflight = (async () => {
      try {
        const minted = await mintInstallationToken()
        // If the App mint fails but a PAT is still around, use it so writes don't
        // hard-fail during a misconfiguration.
        return minted ?? process.env.GITHUB_TOKEN ?? null
      } finally {
        inflight = null
      }
    })()
  }
  return inflight
}

/**
 * Standard GitHub REST headers with a resolved token, or null if no token is
 * available (caller should return a 500 "not configured" in that case).
 */
export async function getGitHubAuthHeaders(): Promise<Record<string, string> | null> {
  const token = await getGitHubToken()
  if (!token) return null
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
}
