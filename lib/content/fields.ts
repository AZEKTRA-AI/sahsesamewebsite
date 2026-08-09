import { z } from 'zod'

/**
 * Describes one editable field for the admin content editor. `key`/`type` are
 * read by the generic editor and by the zod generator below; `label`/`help`
 * are shown to a non-technical site owner, so they stay in plain language —
 * no design or CMS jargon.
 */
export type FieldType = 'text' | 'textarea' | 'url' | 'image' | 'number' | 'stringList'

export interface FieldDef {
  key: string
  label: string
  type: FieldType
  help?: string
  placeholder?: string
  maxLength?: number
  /** Defaults to true. Set false for optional fields like a secondary link. */
  required?: boolean
}

export interface ListFieldDef {
  key: string
  label: string
  type: 'list'
  /** Singular name shown on the "Add" button, e.g. "reason" -> "Add reason". */
  itemLabel: string
  fields: FieldDef[]
  help?: string
  minItems?: number
  maxItems?: number
}

export type AnyFieldDef = FieldDef | ListFieldDef

export function isListField(field: AnyFieldDef): field is ListFieldDef {
  return field.type === 'list'
}

/** Only Cloudinary-hosted images are accepted as valid image field values. */
export function isAllowedImageUrl(url: unknown): url is string {
  if (typeof url !== 'string' || url.length === 0) return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' && parsed.hostname === 'res.cloudinary.com'
  } catch {
    return false
  }
}

function scalarSchema(field: FieldDef): z.ZodTypeAny {
  const required = field.required !== false

  switch (field.type) {
    case 'text':
    case 'textarea': {
      const base = z.string().trim().max(field.maxLength ?? 4000)
      return required ? base.min(1, `${field.label} is required.`) : base
    }
    case 'url': {
      const base = z
        .string()
        .trim()
        .max(500)
        .refine((v) => v === '' || /^https?:\/\//i.test(v), `${field.label} must be a full web address.`)
      return required ? base.min(1, `${field.label} is required.`) : base
    }
    case 'image': {
      const base = z
        .string()
        .trim()
        .max(500)
        .refine((v) => v === '' || isAllowedImageUrl(v), `${field.label} must be uploaded through the image picker.`)
      return required ? base.min(1, `${field.label} is required.`) : base
    }
    case 'number':
      return z.coerce.number().finite()
    case 'stringList':
      return z.array(z.string().trim().max(500)).max(60)
  }
}

function listSchema(field: ListFieldDef): z.ZodTypeAny {
  const shape: Record<string, z.ZodTypeAny> = {}
  for (const sub of field.fields) shape[sub.key] = scalarSchema(sub)
  return z
    .array(z.object(shape))
    .min(field.minItems ?? 0, `${field.label} needs at least ${field.minItems ?? 0} entries.`)
    .max(field.maxItems ?? 60)
}

/** Builds a zod object schema straight from a block's field definitions. */
export function schemaToZod(fields: AnyFieldDef[]) {
  const shape: Record<string, z.ZodTypeAny> = {}
  for (const field of fields) {
    shape[field.key] = isListField(field) ? listSchema(field) : scalarSchema(field)
  }
  return z.object(shape)
}

/** A blank row for "Add" buttons on list fields, shaped to match its fields. */
export function emptyListItem(field: ListFieldDef): Record<string, unknown> {
  const item: Record<string, unknown> = {}
  for (const sub of field.fields) {
    item[sub.key] = sub.type === 'number' ? 0 : sub.type === 'stringList' ? [] : ''
  }
  return item
}
