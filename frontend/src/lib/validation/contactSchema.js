import { z } from 'zod'
import { api } from '@/lib/api.js'

const PHONE_REGEX = /^(\+?91)?[6-9]\d{9}$/

export function createContactSchema(t) {
  const v = (key) => t(`forms.validation.${key}`)

  return z.object({
    fullName: z.string().trim().min(2, v('nameRequired')).max(120),
    email: z.string().trim().email(v('emailInvalid')),
    phone: z
      .string()
      .trim()
      .transform((val) => val.replace(/[\s-]/g, ''))
      .refine((val) => PHONE_REGEX.test(val), v('phoneInvalid')),
    message: z.string().trim().min(10, v('messageTooShort')).max(1500, v('messageTooLong')),
  })
}

/**
 * Submits a general contact enquiry to the backend, which stores it as a
 * CUSTOMER_LEADS record with source = 'contact_form' (Module 7/8). Calls
 * the real API — no mock/in-memory handling.
 */
export async function submitContactForm(values, language = 'en') {
  const { data } = await api.post('/leads', {
    full_name: values.fullName,
    email: values.email,
    phone: values.phone,
    message: values.message,
    source: 'contact_form',
    preferred_language: language,
  })
  return data
}
