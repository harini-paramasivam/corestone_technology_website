import { INDUSTRIES } from '@/data/site.js'
import { BUSINESS_TYPE_OPTIONS, DEMO_MODE_OPTIONS, DEMO_TIME_SLOTS } from '@/data/formOptions.js'

const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScexFm1pahY2Cjo2-jh-CPyN5pvgfAiTddYGdUVZHAaBh3jPA/formResponse'

/**
 * Maps React form field keys to exact Google Form entry.xxxxx IDs and converts
 * option codes to exact Google Form text options.
 */
export async function submitDemoRequestToGoogleForm(formValues) {
  // 1. Resolve Industry Label
  const industryObj = INDUSTRIES.find((i) => i.slug === formValues.industry)
  const industryLabel = industryObj ? industryObj.name : formValues.industry || ''

  // 2. Resolve Business Type Label
  const bTypeObj = BUSINESS_TYPE_OPTIONS.find((b) => b.value === formValues.businessType)
  let businessTypeLabel = bTypeObj ? bTypeObj.label : formValues.businessType || ''
  if (businessTypeLabel === 'LLP' || businessTypeLabel === 'Other') {
    businessTypeLabel = 'others'
  }

  // 3. Resolve Demo Mode Label (Google Form options: 'Online(Video call)', 'In-Person visit', 'Phone call')
  let demoModeLabel = formValues.demoMode
  if (formValues.demoMode === 'online') {
    demoModeLabel = 'Online(Video call)'
  } else if (formValues.demoMode === 'in_person') {
    demoModeLabel = 'In-Person visit'
  } else if (formValues.demoMode === 'phone_call') {
    demoModeLabel = 'Phone call'
  } else {
    const dModeObj = DEMO_MODE_OPTIONS.find((m) => m.value === formValues.demoMode)
    if (dModeObj) demoModeLabel = dModeObj.label
  }

  // 4. Resolve Preferred Time Label
  let timeLabel = formValues.preferredDemoTime
  if (formValues.preferredDemoTime === 'custom' && formValues.customDemoTime) {
    timeLabel = formValues.customDemoTime
  } else {
    const tObj = DEMO_TIME_SLOTS.find((t) => t.value === formValues.preferredDemoTime)
    if (tObj) timeLabel = tObj.label
  }

  // Parse Preferred Demo Date (YYYY-MM-DD) into year, month, day subfields
  let year = ''
  let month = ''
  let day = ''
  if (formValues.preferredDemoDate) {
    const parts = formValues.preferredDemoDate.split('-')
    if (parts.length === 3) {
      year = parts[0]
      month = parts[1]
      day = parts[2]
    }
  }

  // Parse Preferred Time into hour and minute subfields (24-hr or 12-hr clean digits)
  let timeHour = ''
  let timeMinute = '00'
  if (timeLabel) {
    const match = timeLabel.match(/^(\d{1,2}):(\d{2})/)
    if (match) {
      let h = parseInt(match[1], 10)
      if (timeLabel.toUpperCase().includes('PM') && h < 12) h += 12
      if (timeLabel.toUpperCase().includes('AM') && h === 12) h = 0
      timeHour = String(h).padStart(2, '0')
      timeMinute = match[2]
    }
  }

  // Construct URLSearchParams for x-www-form-urlencoded submit
  const formData = new URLSearchParams()

  formData.append('entry.819336945', formValues.fullName || '')
  formData.append('entry.1686836744', formValues.companyName || '')
  formData.append('entry.1528387149', formValues.gstNumber || '')
  formData.append('entry.933791680', businessTypeLabel)
  formData.append('entry.320825652', industryLabel)
  formData.append('entry.1474843873', formValues.email || '')
  formData.append('entry.1071953981', formValues.phone || '')
  formData.append('entry.1674810026', formValues.city || '')
  formData.append('entry.729262166', formValues.state || '')
  formData.append('entry.1443937445', formValues.businessRequirement || '')

  // Google Form Date question subfields
  if (year) formData.append('entry.1912604496_year', year)
  if (month) formData.append('entry.1912604496_month', month)
  if (day) formData.append('entry.1912604496_day', day)

  // Google Form Time question subfields
  if (timeHour) formData.append('entry.1966212686_hour', timeHour)
  if (timeMinute) formData.append('entry.1966212686_minute', timeMinute)

  // Demo mode
  formData.append('entry.656600165', demoModeLabel)

  // Submit via fetch with mode: 'no-cors' (opaque response prevents CORS block)
  await fetch(GOOGLE_FORM_ACTION_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })

  return {
    success: true,
    lead_id: 'CS-' + Date.now().toString(36).toUpperCase(),
  }
}
