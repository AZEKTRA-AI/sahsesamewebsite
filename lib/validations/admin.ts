import { z } from 'zod'

/**
 * Server-side validation for the admin content-management routes, matching
 * the rigor already applied to the public RFQ form (lib/validations/rfq.ts).
 * These routes are auth-gated, but a compromised or careless admin session
 * (or a raw fetch bypassing the UI) should still not be able to write
 * malformed rows straight into the database.
 */

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const categorySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  slug: z.string().trim().toLowerCase().min(1, 'Slug is required').max(160).regex(slugPattern, 'Slug must be lowercase letters, numbers, and hyphens only'),
  icon: z.string().trim().max(200).optional().or(z.literal('')),
})

export const certificationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(160),
  description: z.string().trim().max(2000).optional().or(z.literal('')),
  sortOrder: z.number().int().optional().default(0),
})

// specs is stored as Prisma Json. The create form sends it as a raw JSON
// string, the edit form pre-parses it — accept either and normalize to an
// object.
const specsField = z
  .union([z.string(), z.record(z.string(), z.unknown())])
  .optional()
  .transform((val, ctx) => {
    if (val === undefined || val === '') return {}
    if (typeof val !== 'string') return val
    try {
      return JSON.parse(val)
    } catch {
      ctx.addIssue({ code: 'custom', message: 'Specifications must be valid JSON' })
      return z.NEVER
    }
  })

export const productSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(160),
  slug: z.string().trim().toLowerCase().min(1, 'Slug is required').max(200).regex(slugPattern, 'Slug must be lowercase letters, numbers, and hyphens only'),
  categoryId: z.string().trim().min(1, 'Category is required'),
  origin: z.string().trim().max(160).optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional().default('DRAFT'),
  specs: specsField,
})

export const blogPostSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  slug: z.string().trim().toLowerCase().min(1, 'Slug is required').max(220).regex(slugPattern, 'Slug must be lowercase letters, numbers, and hyphens only'),
  excerpt: z.string().trim().max(500).optional().or(z.literal('')),
  content: z.string().trim().min(1, 'Content is required'),
  coverImage: z.string().trim().max(500).optional().or(z.literal('')),
  coverImageAlt: z.string().trim().max(200).optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional().default('DRAFT'),
})
