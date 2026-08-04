import { z } from 'zod'

/**
 * Shared RFQ shape. Used by the client form and re-validated server-side in
 * /api/rfq — never trust the client-side pass alone.
 */
export const rfqSchema = z.object({
  buyerName: z.string().trim().min(2, 'Please enter your full name').max(120),
  company: z.string().trim().min(2, 'Please enter your company name').max(160),
  country: z.string().trim().min(2, 'Please enter your country').max(80),
  email: z.email('Please enter a valid email address').max(200),
  phone: z.string().trim().min(6, 'Please enter a valid phone number').max(40),

  product: z.string().trim().min(1, 'Please select a product').max(120),
  quantity: z.string().trim().max(120).optional().default(''),
  packaging: z.string().trim().max(200).optional().default(''),
  incoterm: z.string().trim().max(40).optional().default(''),

  sampleRequest: z.boolean().optional().default(false),
  comments: z.string().trim().max(4000).optional().default(''),
  attachmentUrl: z.string().url().max(500).optional().or(z.literal('')),

  // Honeypot: hidden from real users, so any value means a bot filled it.
  // Accepted here on purpose — /api/rfq drops it silently so bots get no signal
  // that they were caught. Rejecting it in the schema would leak that.
  website: z.string().max(200).optional().default(''),
})

export type RfqInput = z.input<typeof rfqSchema>
export type RfqData = z.output<typeof rfqSchema>
