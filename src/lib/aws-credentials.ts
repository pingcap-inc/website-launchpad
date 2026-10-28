import { awsCredentialsProvider } from '@vercel/oidc-aws-credentials-provider'
import type { S3ClientConfig } from '@aws-sdk/client-s3'

/**
 * Resolves AWS credentials for the server's AWS SDK clients.
 *
 * Preferred: **Vercel OIDC federation** — set `<prefix>ROLE_ARN` to an IAM role that
 * trusts Vercel's OIDC issuer. Each invocation exchanges its short-lived Vercel OIDC
 * token for ~1h STS credentials, so no long-lived key is stored anywhere.
 *
 * Fallback: the static `<prefix>ACCESS_KEY_ID` / `<prefix>SECRET_ACCESS_KEY` pair, so
 * nothing breaks before the role exists and local dev keeps working. Remove the
 * static keys from Vercel once the role is in place.
 *
 * Prefixes in use: `AWS_` (S3 media bucket) and `BEDROCK_AWS_` (Bedrock runtime).
 */
export type AwsCredentials = NonNullable<S3ClientConfig['credentials']>

export function resolveAwsCredentials(prefix: 'AWS_' | 'BEDROCK_AWS_'): AwsCredentials | null {
  const roleArn = process.env[`${prefix}ROLE_ARN`]
  if (roleArn) return awsCredentialsProvider({ roleArn })

  const accessKeyId = process.env[`${prefix}ACCESS_KEY_ID`]
  const secretAccessKey = process.env[`${prefix}SECRET_ACCESS_KEY`]
  if (accessKeyId && secretAccessKey) return { accessKeyId, secretAccessKey }

  return null
}
