import { prisma } from '@/lib/prisma'
import { schemaToZod } from './fields'
import type { BlockDef } from './blocks'

/**
 * Reads one content block, validated and merged over its defaults.
 *
 * Deliberately fail-open: a missing row, a row saved under an older field
 * shape, or the database being briefly unreachable during a cold start all
 * fall back to the block's defaults rather than breaking the page. The admin
 * editor is the only place that needs a hard error on bad data — visitors
 * should never see a 500 because of a content edit.
 */
export async function getContent<T extends Record<string, unknown>>(
  block: BlockDef<T>
): Promise<T> {
  try {
    const row = await prisma.siteSettings.findUnique({ where: { key: block.key } })
    if (!row) return block.defaults

    // .partial() so a block whose shape has grown since the row was last
    // saved doesn't fail validation over fields that simply aren't there yet.
    const readSchema = schemaToZod(block.fields).partial()
    const parsed = readSchema.safeParse(row.value)
    if (!parsed.success) return block.defaults

    return { ...block.defaults, ...parsed.data } as T
  } catch {
    return block.defaults
  }
}

type BlockValue<B> = B extends BlockDef<infer T> ? T : never

/**
 * Fetches several blocks in parallel. Convenience for pages with many
 * sections — each key keeps its own block's real shape in the result (not
 * `any`), so `result.heritage.stats` etc. are still fully typed.
 */
export async function getContentMap<T extends Record<string, BlockDef<any>>>(
  blocks: T
): Promise<{ [K in keyof T]: BlockValue<T[K]> }> {
  const entries = Object.entries(blocks) as [keyof T, BlockDef<any>][]
  const values = await Promise.all(entries.map(([, block]) => getContent(block)))
  const result = {} as { [K in keyof T]: BlockValue<T[K]> }
  entries.forEach(([key], i) => {
    result[key] = values[i]
  })
  return result
}

/** digits-only phone, e.g. "+92 300 0959524" -> "923000959524", for wa.me links. */
export function toWhatsAppDigits(phone: string): string {
  return phone.replace(/[^\d]/g, '')
}
