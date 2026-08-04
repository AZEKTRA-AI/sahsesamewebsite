import nodemailer from 'nodemailer'
import type { RfqData } from '@/lib/validations/rfq'

function getTransport() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 465)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error('SMTP is not configured (SMTP_HOST/SMTP_USER/SMTP_PASS missing)')
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value?: string | null) {
  if (!value) return ''
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#2A2A2A;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#444;">${escapeHtml(value)}</td>
  </tr>`
}

/**
 * Sends the RFQ notification to the sales inbox. Throws on failure — the caller
 * is responsible for keeping the DB row as the record of truth.
 */
export async function sendRfqEmail(data: RfqData, enquiryId: string) {
  const transport = getTransport()

  const to = process.env.RFQ_EMAIL_TO || process.env.SMTP_USER!
  const cc = process.env.RFQ_EMAIL_CC || undefined
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:640px;">
      <h2 style="color:#1F7A6D;margin-bottom:4px;">New Quotation Request</h2>
      <p style="color:#666;margin-top:0;font-size:13px;">Enquiry ID: ${escapeHtml(enquiryId)}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${row('Name', data.buyerName)}
        ${row('Company', data.company)}
        ${row('Country', data.country)}
        ${row('Email', data.email)}
        ${row('Phone', data.phone)}
        ${row('Product', data.product)}
        ${row('Quantity', data.quantity)}
        ${row('Packaging', data.packaging)}
        ${row('Incoterm', data.incoterm)}
        ${row('Sample Requested', data.sampleRequest ? 'Yes' : 'No')}
        ${row('Attachment', data.attachmentUrl || '')}
        ${row('Comments', data.comments)}
      </table>
    </div>
  `

  await transport.sendMail({
    from,
    to,
    cc,
    replyTo: data.email,
    subject: `RFQ: ${data.product} — ${data.company} (${data.country})`,
    html,
  })
}
