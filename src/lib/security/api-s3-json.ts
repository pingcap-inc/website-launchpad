import { GetObjectCommand, PutObjectCommand, type S3Client } from '@aws-sdk/client-s3'

/**
 * Optimistic-concurrency read-modify-write for the small shared JSON indexes in the
 * media bucket (media/tags.json, media/meta.json).
 *
 * The object is read together with its ETag and written back with `IfMatch` (or
 * `IfNoneMatch: '*'` when it does not exist yet). If another request wrote it in
 * between, S3 answers 412 and the whole cycle is retried on the fresh copy, so two
 * concurrent edits can no longer silently drop one another.
 *
 * Unlike a plain read with a `{}` fallback, a read failure other than "not found"
 * (or an unparseable index) throws: writing an empty index back over a transient
 * error would wipe every entry.
 */

const MAX_ATTEMPTS = 5

function httpStatus(err: unknown): number | undefined {
  return (err as { $metadata?: { httpStatusCode?: number } })?.$metadata?.httpStatusCode
}

function isNotFound(err: unknown) {
  const name = (err as { name?: string })?.name
  return name === 'NoSuchKey' || name === 'NotFound' || httpStatus(err) === 404
}

function isWriteConflict(err: unknown) {
  const name = (err as { name?: string })?.name
  const status = httpStatus(err)
  // 412: precondition failed. 409: a concurrent conditional write is in flight.
  return (
    name === 'PreconditionFailed' ||
    name === 'ConditionalRequestConflict' ||
    status === 412 ||
    status === 409
  )
}

async function readWithEtag<T>(
  s3: S3Client,
  bucket: string,
  key: string
): Promise<{ data: T; etag: string } | null> {
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
    const body = (await res.Body?.transformToString()) ?? ''
    if (!res.ETag) throw new Error(`No ETag returned for ${key}`)
    return { data: (body ? JSON.parse(body) : {}) as T, etag: res.ETag }
  } catch (err) {
    if (isNotFound(err)) return null
    throw err
  }
}

/**
 * Apply `mutate` to the current JSON at `key` (or to `fallback()` if it does not
 * exist) and write the result back conditionally, retrying on a concurrent write.
 */
export async function updateJsonObject<T>(
  s3: S3Client,
  bucket: string,
  key: string,
  fallback: () => T,
  mutate: (current: T) => T
): Promise<void> {
  for (let attempt = 1; ; attempt++) {
    const current = await readWithEtag<T>(s3, bucket, key)
    const next = mutate(current ? current.data : fallback())
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: JSON.stringify(next, null, 2),
          ContentType: 'application/json',
          ...(current ? { IfMatch: current.etag } : { IfNoneMatch: '*' }),
        })
      )
      return
    } catch (err) {
      if (!isWriteConflict(err) || attempt >= MAX_ATTEMPTS) throw err
      // Small jittered backoff before re-reading the newer copy.
      await new Promise((resolve) => setTimeout(resolve, 50 * attempt + Math.random() * 100))
    }
  }
}
