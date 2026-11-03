import { HeadObjectCommand, type S3Client } from '@aws-sdk/client-s3'
import { isUnsafeObjectKey } from '@/lib/security/api-guards'

/**
 * Shared bounds for the Media Library's JSON indexes in S3 (media/tags.json,
 * media/meta.json), used by /api/admin/media-index and /api/admin/upload-image.
 *
 * Each index is rewritten whole on every edit, so without bounds it could grow until
 * every read-modify-write (and the Media Library listing) becomes slow or fails.
 * Keys are capped in number, values in size, the serialized index in bytes, and a
 * key is only ever added for an object that actually exists in the bucket.
 */

export const MEDIA_CDN_BASE = 'https://static.pingcap.com'
export const MEDIA_IMAGES_PREFIX = 'images/'

/** Most distinct URLs either index may hold. Updating an existing URL is always allowed. */
export const MAX_MEDIA_INDEX_ENTRIES = 20_000
/** Upper bound on one serialized index (tags.json / meta.json). */
export const MAX_MEDIA_INDEX_BYTES = 8 * 1024 * 1024
export const MAX_MEDIA_URL_LENGTH = 1024

/** Thrown from an index mutation that would exceed the caps above. */
export class MediaIndexFullError extends Error {
  constructor(message = 'Media index is full') {
    super(message)
    this.name = 'MediaIndexFullError'
  }
}

/**
 * Index keys are CDN URLs of objects directly or nested under images/ — the only thing
 * the Media Library ever writes. Anything else (incl. `__proto__`/`constructor`, a
 * query/fragment, traversal or control characters) is refused, so caller strings
 * can't become arbitrary keys in the shared JSON indexes.
 */
export function isMediaUrl(url: unknown): url is string {
  if (typeof url !== 'string' || url.length > MAX_MEDIA_URL_LENGTH) return false
  const prefix = `${MEDIA_CDN_BASE}/${MEDIA_IMAGES_PREFIX}`
  if (!url.startsWith(prefix) || url.length === prefix.length) return false
  if (url.includes('..') || /[?#\\\u0000-\u001F\u007F]/.test(url) || url.endsWith('/')) {
    return false
  }
  return !isUnsafeObjectKey(url)
}

/** The S3 object key behind a media URL (the URL is `${CDN}/${key}`, unencoded). */
export function mediaKeyFromUrl(url: string): string {
  return url.slice(MEDIA_CDN_BASE.length + 1)
}

/**
 * Enforce the caps on an index about to be written: no more than
 * MAX_MEDIA_INDEX_ENTRIES keys (only checked when `addedKeys` > 0, so edits to an
 * already-full index still work) and no more than MAX_MEDIA_INDEX_BYTES serialized.
 */
export function assertMediaIndexBounds(index: Record<string, unknown>, addedKeys: number): void {
  if (addedKeys > 0 && Object.keys(index).length > MAX_MEDIA_INDEX_ENTRIES) {
    throw new MediaIndexFullError(
      `Media index is full (${MAX_MEDIA_INDEX_ENTRIES} entries); no new images can be indexed`
    )
  }
  if (Buffer.byteLength(JSON.stringify(index), 'utf-8') > MAX_MEDIA_INDEX_BYTES) {
    throw new MediaIndexFullError('Media index would exceed its size limit')
  }
}

function isNotFound(err: unknown) {
  const e = err as { name?: string; $metadata?: { httpStatusCode?: number } }
  return e?.name === 'NotFound' || e?.name === 'NoSuchKey' || e?.$metadata?.httpStatusCode === 404
}

/**
 * The subset of `urls` whose objects do NOT exist in `bucket` (HeadObject, a few at a
 * time). Errors other than "not found" are rethrown so a transient failure is never
 * mistaken for a missing object or for an existing one.
 */
export async function findMissingMediaObjects(
  s3: S3Client,
  bucket: string,
  urls: string[],
  concurrency = 8
): Promise<string[]> {
  const missing: string[] = []
  let next = 0
  const worker = async () => {
    while (next < urls.length) {
      const url = urls[next++]
      try {
        await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: mediaKeyFromUrl(url) }))
      } catch (err) {
        if (!isNotFound(err)) throw err
        missing.push(url)
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker))
  return missing
}
