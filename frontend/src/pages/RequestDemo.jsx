import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import PageHero from '@/components/sections/PageHero.jsx'
import Section from '@/components/layout/Section.jsx'
import Card from '@/components/ui/Card.jsx'
import Input from '@/components/ui/Input.jsx'
import Select from '@/components/ui/Select.jsx'
import Textarea from '@/components/ui/Textarea.jsx'
import Button from '@/components/ui/Button.jsx'
import { useToast } from '@/components/ui/Toast.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'
import { createDemoRequestSchema } from '@/lib/validation/demoRequestSchema.js'
import { submitDemoRequest } from '@/lib/demoRequestService.js'
import { BUSINESS_TYPE_OPTIONS, DEMO_MODE_OPTIONS, DEMO_TIME_SLOTS, INDIAN_STATES } from '@/data/formOptions.js'
import { INDUSTRIES, buildWhatsAppLink } from '@/data/site.js'
import { generateLeadPDF } from '@/lib/generateLeadPDF.js'

const INDUSTRY_OPTIONS = INDUSTRIES.map((i) => ({ value: i.slug, label: i.name }))

const todayISO = new Date().toISOString().split('T')[0]

export default function RequestDemo() {
  const navigate = useNavigate()
  const { push } = useToast()
  const { t, language } = useLanguage()
  const [submitting, setSubmitting] = useState(false)

  // Rebuild the schema (and therefore its translated error messages)
  // whenever the language changes, so already-visible validation errors
  // switch language instantly along with everything else.
  const schema = useMemo(() => createDemoRequestSchema(t), [language])

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      companyName: '',
      gstNumber: '',
      businessType: '',
      industry: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      businessRequirement: '',
      preferredDemoDate: '',
      preferredDemoTime: '',
      demoMode: '',
    },
  })

  async function onSubmit(values) {
    setSubmitting(true)
    let leadId = null
    let whatsappSent = false
    let whatsappStatus = 'NOT_CONFIGURED'

    const payloadValues = {
      ...values,
      preferredDemoTime: values.preferredDemoTime === 'custom' && values.customDemoTime ? values.customDemoTime : values.preferredDemoTime,
    }

    try {
      const res = await submitDemoRequest(payloadValues, language)
      const leadId = res?.lead_id || ('CS-' + Date.now().toString(36).toUpperCase())
      const whatsappSent = res?.whatsapp_sent || false
      const whatsappStatus = res?.whatsapp_status || 'NOT_CONFIGURED'

      navigate('/request-demo/success', {
        state: {
          leadId,
          leadValues: values,
          whatsappSent,
          whatsappStatus,
        },
      })
    } catch (err) {
      push({
        tone: 'error',
        title: t('forms.errorTitle') || 'Submission Failed',
        description: err?.message || 'Unable to submit demo request. Please check your connection and try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow={t('requestDemoPage.eyebrow')}
        title={t('requestDemoPage.title')}
        description={t('requestDemoPage.description')}
        breadcrumbs={[{ label: t('requestDemoPage.eyebrow') }]}
      />

      <Section>
        <Card className="mx-auto max-w-3xl p-6 sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label={t('forms.fullName')}
                required
                placeholder="John Doe"
                error={errors.fullName?.message}
                {...register('fullName')}
              />
              <Input
                label={t('forms.companyName')}
                required
                placeholder="Your business name"
                error={errors.companyName?.message}
                {...register('companyName')}
              />
              <Input
                label={t('forms.gstNumber')}
                placeholder="e.g. 33AAAAA0000A1Z5"
                error={errors.gstNumber?.message}
                {...register('gstNumber')}
              />

              <Controller
                control={control}
                name="businessType"
                render={({ field }) => (
                  <Select
                    label={t('forms.businessType')}
                    required
                    placeholder={t('forms.selectBusinessType')}
                    options={BUSINESS_TYPE_OPTIONS}
                    error={errors.businessType?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="industry"
                render={({ field }) => (
                  <Select
                    label={t('forms.industry')}
                    required
                    placeholder={t('forms.selectIndustry')}
                    options={INDUSTRY_OPTIONS}
                    error={errors.industry?.message}
                    {...field}
                  />
                )}
              />

              <Input
                label={t('forms.email')}
                type="email"
                required
                placeholder="you@company.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                label={t('forms.phone')}
                type="tel"
                required
                placeholder="98765 43210"
                error={errors.phone?.message}
                {...register('phone')}
              />

              <Input
                label={t('forms.city')}
                required
                placeholder="Puducherry"
                error={errors.city?.message}
                {...register('city')}
              />

              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <Select
                    label={t('forms.state')}
                    required
                    placeholder={t('forms.selectState')}
                    options={INDIAN_STATES}
                    error={errors.state?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <Textarea
              label={t('forms.businessRequirement')}
              required
              placeholder="Tell us about your billing, inventory or reporting needs..."
              error={errors.businessRequirement?.message}
              {...register('businessRequirement')}
            />

            <div className="grid gap-5 sm:grid-cols-3">
              <Input
                label={t('forms.preferredDemoDate')}
                type="date"
                required
                min={todayISO}
                error={errors.preferredDemoDate?.message}
                {...register('preferredDemoDate')}
              />

              <Controller
                control={control}
                name="preferredDemoTime"
                render={({ field }) => (
                  <Select
                    label={t('forms.preferredDemoTime')}
                    required
                    placeholder={t('forms.selectTime')}
                    options={DEMO_TIME_SLOTS}
                    error={errors.preferredDemoTime?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="demoMode"
                render={({ field }) => (
                  <Select
                    label={t('forms.demoMode')}
                    required
                    placeholder={t('forms.selectMode')}
                    options={DEMO_MODE_OPTIONS}
                    error={errors.demoMode?.message}
                    {...field}
                  />
                )}
              />
            </div>

            {watch('preferredDemoTime') === 'custom' && (
              <Input
                label="Specify Custom Timing"
                required
                placeholder="e.g. 09:15 AM or 06:30 PM"
                error={errors.customDemoTime?.message}
                {...register('customDemoTime')}
              />
            )}

            <Button type="submit" size="lg" className="w-full" loading={submitting} icon={Send}>
              {submitting ? t('common.submitting') : t('common.requestDemo')}
            </Button>
          </form>
        </Card>
      </Section>
    </>
  )
}
