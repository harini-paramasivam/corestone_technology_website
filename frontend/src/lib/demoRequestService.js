import { api } from '@/lib/api.js'
import { toApiPayload } from '@/lib/validation/demoRequestSchema.js'

/**
 * Submits a demo request to the backend, which persists it to Oracle,
 * generates a unique Lead ID, and stores the initial WhatsApp message
 * record (Module 7/8). Returns { leadId, whatsappMessage }.
 *
 * This calls the real API contract — there is no mock/in-memory fallback
 * here. Until Module 7's /demo-requests endpoint is live, this call will
 * fail with a network error, which the form surfaces to the user as a
 * toast rather than silently succeeding.
 */
export async function submitDemoRequest(formValues, language = 'en') {
  const payload = toApiPayload(formValues, language)
  const { data } = await api.post('/demo-requests', payload)
  return data
}
