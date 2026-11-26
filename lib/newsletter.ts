import { Resend } from "resend"

export type NewsletterSubscriptionResult = "subscribed" | "not_configured" | "failed"

export function isNewsletterConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_NEWSLETTER_SEGMENT_ID)
}

export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscriptionResult> {
  const apiKey = process.env.RESEND_API_KEY
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID

  if (!apiKey || !segmentId) {
    return "not_configured"
  }

  const resend = new Resend(apiKey)
  const created = await resend.contacts.create({
    email,
    unsubscribed: false,
    segments: [{ id: segmentId }],
  })

  if (!created.error) {
    return "subscribed"
  }

  const existing = await resend.contacts.get({ email })
  if (existing.error || !existing.data) {
    return "failed"
  }

  const updated = await resend.contacts.update({ email, unsubscribed: false })
  if (updated.error) {
    return "failed"
  }

  const addedToSegment = await resend.contacts.segments.add({ email, segmentId })
  if (addedToSegment.error) {
    return "failed"
  }

  return "subscribed"
}
