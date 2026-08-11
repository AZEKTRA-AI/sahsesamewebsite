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

// info@sainabdulhakim.com is the single inbox every enquiry routes through —
// both the internal notification and the buyer-facing auto-reply below. The
// env vars can still override this per-deployment, but the fallback is the
// real address rather than a generic SMTP login.
const QUERY_INBOX = 'info@sainabdulhakim.com'

/**
 * Sends the RFQ notification to the sales inbox. Throws on failure — the caller
 * is responsible for keeping the DB row as the record of truth.
 */
export async function sendRfqEmail(data: RfqData, enquiryId: string) {
  const transport = getTransport()

  const to = process.env.RFQ_EMAIL_TO || QUERY_INBOX
  const cc = process.env.RFQ_EMAIL_CC || undefined
  const from = process.env.SMTP_FROM || QUERY_INBOX

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:640px;">
      <h2 style="color:#9C7F45;margin-bottom:4px;">New Quotation Request</h2>
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

/**
 * Sends the buyer a first-response acknowledgement from the same inbox their
 * enquiry landed in, so they have immediate confirmation it was received
 * while the export desk prepares a full reply. Best-effort — the caller
 * treats failure the same as a notification-email failure (logged, not fatal).
 */
export async function sendRfqAutoReply(data: RfqData, enquiryId: string) {
  const transport = getTransport()

  const from = process.env.SMTP_FROM || QUERY_INBOX
  const replyTo = process.env.RFQ_EMAIL_TO || QUERY_INBOX

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;color:#2A2A2A;">
      <p style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#9C7F45;margin:0 0 4px;">Sain Abdul Hakim and Company</p>
      <h2 style="margin:0 0 16px;">We've received your enquiry</h2>
      <p style="line-height:1.6;">Dear ${escapeHtml(data.buyerName)},</p>
      <p style="line-height:1.6;">
        Thank you for reaching out about <strong>${escapeHtml(data.product)}</strong>. Your enquiry has
        been logged with our export desk and a member of our team will get back to you shortly with a
        detailed quotation.
      </p>
      <p style="line-height:1.6;color:#666;font-size:13px;">Reference: ${escapeHtml(enquiryId)}</p>
      <p style="line-height:1.6;margin-top:24px;">
        If anything is urgent in the meantime, simply reply to this email and it will reach us directly.
      </p>
      <p style="line-height:1.6;margin-top:24px;">Regards,<br />Sain Abdul Hakim and Company</p>
    </div>
  `

  await transport.sendMail({
    from,
    to: data.email,
    replyTo,
    subject: `We've received your enquiry — Sain Abdul Hakim and Company`,
    html,
  })
}
