import type { PageDSL } from '@/lib/dsl-schema'

/**
 * Stamp authorship into a DSL's meta, in place, at write time.
 *
 * `modifiedBy` / `modifiedAt` are always updated to the current actor. `createdBy`
 * / `createdAt` are set only if not already present (so the original creator is
 * preserved across edits), unless `forceCreated` is passed — used when duplicating
 * a page, where the copy is a brand-new page authored by the current user.
 *
 * `priorCreatedBy` / `priorCreatedAt` let a caller carry the creator forward from
 * the previously-committed DSL, in case the incoming payload dropped those fields.
 */
export function stampAuthorship(
  dsl: PageDSL,
  actor: string,
  opts?: { forceCreated?: boolean; priorCreatedBy?: string; priorCreatedAt?: string }
): void {
  if (!dsl?.meta) return
  const now = new Date().toISOString()

  const existingCreatedBy = dsl.meta.createdBy ?? opts?.priorCreatedBy
  const existingCreatedAt = dsl.meta.createdAt ?? opts?.priorCreatedAt

  if (opts?.forceCreated || !existingCreatedBy) {
    dsl.meta.createdBy = actor
    dsl.meta.createdAt = now
  } else {
    dsl.meta.createdBy = existingCreatedBy
    dsl.meta.createdAt = existingCreatedAt ?? now
  }

  dsl.meta.modifiedBy = actor
  dsl.meta.modifiedAt = now
}
