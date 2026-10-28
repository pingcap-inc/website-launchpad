# Replacing Long-Lived AWS and GitHub Credentials

The repo now supports short-lived credentials everywhere it talks to AWS or GitHub.
Each path keeps the old static key as a fallback, so nothing breaks until the
matching role / App is configured. Roll out one row at a time, verify, then delete
the static secret.

| Where                                                                | Today (static)                                                          | Target (short-lived)                | Switch on by setting                                                       |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------- |
| `deploy.yml` → S3 `uploads-pingcap-com/launchpad/`                   | `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` repo secrets              | GitHub Actions OIDC → IAM role      | repo **variable** `AWS_DEPLOY_ROLE_ARN` (+ optional variable `AWS_REGION`) |
| Admin media upload / media index → S3 (`src/lib/aws-credentials.ts`) | `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` in Vercel                 | Vercel OIDC → IAM role              | Vercel env `AWS_ROLE_ARN`                                                  |
| AI generation → Bedrock (`src/lib/ai-client.ts`)                     | `BEDROCK_AWS_ACCESS_KEY_ID` / `BEDROCK_AWS_SECRET_ACCESS_KEY` in Vercel | Vercel OIDC → IAM role              | Vercel env `BEDROCK_AWS_ROLE_ARN`                                          |
| Admin → GitHub API (`src/lib/github-auth.ts`)                        | `GITHUB_TOKEN` PAT in Vercel                                            | GitHub App installation token (~1h) | Vercel env `GITHUB_APP_ID` + `GITHUB_APP_PRIVATE_KEY`                      |

Values used below (confirm before applying):

| Value                 | Used as                                                           | Source                                                                                                 |
| --------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `801626783489`        | AWS account for S3 (and assumed for Bedrock)                      | account of the IAM user that currently writes `uploads-pingcap-com`                                    |
| `uploads-pingcap-com` | media bucket (`AWS_S3_BUCKET`), same bucket `deploy.yml` syncs to | `.env.local`                                                                                           |
| `pingcap`             | Vercel team slug                                                  | staging URL `website-launchpad-git-staging-pingcap.vercel.app` — **confirm** in Vercel → Team Settings |
| `website-launchpad`   | Vercel project name                                               | `.vercel/project.json`                                                                                 |

If the Bedrock keys belong to a different AWS account, replace `801626783489` in the
Bedrock role section with that account.

---

## 1. GitHub Actions → AWS (deploy.yml)

**AWS (IAM admin):**

1. Add the OIDC identity provider once per account (skip if it already exists):
   provider URL `https://token.actions.githubusercontent.com`, audience `sts.amazonaws.com`.
2. Create role `website-launchpad-deploy` with this trust policy — it only accepts
   runs of this repo in the `production` environment (the job already declares it):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::801626783489:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:pingcap-inc/website-launchpad:environment:production"
        }
      }
    }
  ]
}
```

3. Permissions policy (what `aws s3 sync` needs, nothing else):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::uploads-pingcap-com",
      "Condition": { "StringLike": { "s3:prefix": ["launchpad/*", "launchpad"] } }
    },
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::uploads-pingcap-com/launchpad/*"
    }
  ]
}
```

**GitHub (repo admin):** Settings → Secrets and variables → Actions → **Variables** →
add `AWS_DEPLOY_ROLE_ARN = arn:aws:iam::801626783489:role/website-launchpad-deploy`
(and `AWS_REGION` as a variable if you also want to drop that secret).

**Verify:** next push to `main` runs the _Configure AWS credentials (OIDC)_ step and
the sync succeeds. Then delete the `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`
secrets and the _static keys, legacy_ step in `deploy.yml`.

---

## 2. Vercel → AWS (S3 media + Bedrock)

**Vercel (team admin):** Project → Settings → Security → **Secure backend access with
OIDC federation** → enable, issuer mode **Team**. This injects a short-lived
`VERCEL_OIDC_TOKEN` into every function invocation.

**AWS (IAM admin):**

1. Add the OIDC identity provider: URL `https://oidc.vercel.com/pingcap`,
   audience `https://vercel.com/pingcap`.
2. Trust policy for both roles below. The admin only runs on the `staging` branch
   preview (production returns 404), so scope to the `preview` environment:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::801626783489:oidc-provider/oidc.vercel.com/pingcap"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.vercel.com/pingcap:aud": "https://vercel.com/pingcap",
          "oidc.vercel.com/pingcap:sub": "owner:pingcap:project:website-launchpad:environment:preview"
        }
      }
    }
  ]
}
```

3. Role `website-launchpad-media` — permissions for the media library: uploads under
   `images/`, plus `media/tags.json` and `media/meta.json`, which the admin reads and
   rewrites:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::uploads-pingcap-com"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": [
        "arn:aws:s3:::uploads-pingcap-com/images/*",
        "arn:aws:s3:::uploads-pingcap-com/media/*"
      ]
    }
  ]
}
```

4. Role `website-launchpad-bedrock` — Bedrock invoke only, in the region set by
   `BEDROCK_AWS_REGION` (default `ap-southeast-1`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["bedrock:InvokeModel", "bedrock:InvokeModelWithResponseStream"],
      "Resource": [
        "arn:aws:bedrock:*::foundation-model/anthropic.*",
        "arn:aws:bedrock:*:801626783489:inference-profile/*"
      ]
    }
  ]
}
```

If Bedrock lives in a different AWS account from the media bucket, create this
role (and the Vercel OIDC provider) in that account instead.

**Vercel env (Preview scope, or just the `staging` branch):**
`AWS_ROLE_ARN = arn:aws:iam::801626783489:role/website-launchpad-media`,
`BEDROCK_AWS_ROLE_ARN = arn:aws:iam::801626783489:role/website-launchpad-bedrock`.
Redeploy staging.

**Verify on staging:** upload an image in the media library, edit its tags, and
generate a page with AI. Then remove `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
`BEDROCK_AWS_ACCESS_KEY_ID`, `BEDROCK_AWS_SECRET_ACCESS_KEY` from Vercel and
deactivate those IAM users' access keys.

Local dev keeps using static keys from `.env.local` (or run `vercel env pull` to get a
`VERCEL_OIDC_TOKEN`, which expires after ~12h).

---

## 3. GitHub PAT → GitHub App

**GitHub (org owner of `pingcap-inc`):**

1. Org settings → Developer settings → GitHub Apps → **New GitHub App**.
   Webhook: off. Repository permissions: **Contents: Read and write** and
   **Metadata: Read** — the admin only uses the contents and git (refs, trees,
   blobs, commits) APIs.
2. Install it on **only** `pingcap-inc/website-launchpad`.
3. Generate a private key (`.pem`).

**Vercel env:** `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY` (paste the PEM; `\n`
escapes are accepted), optionally `GITHUB_APP_INSTALLATION_ID`. Redeploy staging.

**Verify on staging:** save a draft and publish a test page — commits now show the
App as author. Then delete `GITHUB_TOKEN` from Vercel and revoke the PAT. Note that
`src/lib/github-auth.ts` still falls back to `GITHUB_TOKEN` if minting fails; once the
App is proven, that fallback can be removed so a misconfiguration fails loudly.
