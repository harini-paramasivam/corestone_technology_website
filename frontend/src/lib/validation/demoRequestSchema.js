import { z } from 'zod'

// Loose but real E.164-ish Indian mobile check: optional +91, then 10
// digits starting 6-9. Accepts spaces/dashes, strips them before testing.
const PHONE_REGEX = /^(\+?91)?[6-9]\d{9}$/

/**
 * Schema factory rather than a static export — validation messages need
 * to switch language along with the rest of the UI. Call this inside the
 * component with `t` from useLanguage() so error strings are always in
 * the currently active language, and re-create it (via useMemo) whenever
 * the language changes.
 */
// Standard Indian GSTIN Regex: 2 digits (state code), 5 alpha, 4 numeric, 1 alpha, 1 numeric/alpha, Z/1, 1 check digit
const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/

export function createDemoRequestSchema(t) {
  const v = (key) => t(`forms.validation.${key}`)

  return z.object({
    fullName: z.string().trim().min(2, v('nameRequired')).max(120, v('nameTooLong')),
    companyName: z.string().trim().min(2, v('companyRequired')).max(160, v('companyTooLong')),
    gstNumber: z
      .string()
      .trim()
      .transform((val) => val.toUpperCase())
      .optional()
      .refine((val) => !val || GSTIN_REGEX.test(val), v('gstInvalid')),
    businessType: z.string().min(1, v('businessTypeRequired')),
    industry: z.string().min(1, v('industryRequired')),
    email: z.string().trim().email(v('emailInvalid')),
    phone: z
      .string()
      .trim()
      .transform((val) => val.replace(/[\s-]/g, ''))
      .refine((val) => PHONE_REGEX.test(val), v('phoneInvalid')),
    city: z.string().trim().min(2, v('cityRequired')).max(100),
    state: z.string().min(1, v('stateRequired')),
    businessRequirement: z
      .string()
      .trim()
      .min(20, v('requirementTooShort'))
      .max(2000, v('requirementTooLong')),
    preferredDemoDate: z
      .string()
      .min(1, v('dateRequired'))
      .refine((val) => {
        const selected = new Date(val)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return selected >= today
      }, v('datePast')),
    preferredDemoTime: z.string().min(1, v('timeRequired')),
    demoMode: z.string().min(1, v('modeRequired')),
  })
}

export function toApiPayload(formValues, language = 'en') {
  return {
    preferred_language: language,
    full_name: formValues.fullName,
    company_name: formValues.companyName,
    gst_number: formValues.gstNumber || null,
    business_type: formValues.businessType,
    industry: formValues.industry,
    email: formValues.email,
    phone: formValues.phone,
    city: formValues.city,
    state: formValues.state,
    business_requirement: formValues.businessRequirement,
    preferred_demo_date: formValues.preferredDemoDate,
    preferred_demo_time: formValues.preferredDemoTime,
    demo_mode: formValues.demoMode,
  }
}
