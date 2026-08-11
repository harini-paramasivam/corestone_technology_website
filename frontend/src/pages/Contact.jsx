import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react'
import PageHero from '@/components/sections/PageHero.jsx'
import Section from '@/components/layout/Section.jsx'
import Card from '@/components/ui/Card.jsx'
import Input from '@/components/ui/Input.jsx'
import Textarea from '@/components/ui/Textarea.jsx'
import Button from '@/components/ui/Button.jsx'
import { useToast } from '@/components/ui/Toast.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'
import { createContactSchema, submitContactForm } from '@/lib/validation/contactSchema.js'
import { COMPANY } from '@/data/site.js'

import { generateLeadPDF } from '@/lib/generateLeadPDF.js'

export default function Contact() {
  const { push } = useToast()
  const { t, language } = useLanguage()
  const [submitting, setSubmitting] = useState(false)
  const schema = useMemo(() => createContactSchema(t), [language])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', phone: '', message: '' },
  })

  async function onSubmit(values) {
    setSubmitting(true)
    try {
      const res = await submitContactForm(values, language)

      if (res?.whatsapp_sent) {
        push({
          tone: 'success',
          title: 'Request Submitted Successfully!',
          description: `Your enquiry has been saved and our team has been notified. We will contact you shortly.`,
        })
      } else {
        push({
          tone: 'success',
          title: 'Request Received Successfully!',
          description: 'Thank you for reaching out. Our team will contact you within 24 hours.',
        })
      }
      reset()
    } catch (err) {
      push({
        tone: 'error',
        title: t('forms.errorTitle') || 'Submission Failed',
        description: err?.message || 'Unable to submit your request. Please check your connection and try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow={t('contactPage.eyebrow')}
        title={t('contactPage.title')}
        description={t('contactPage.description')}
        breadcrumbs={[{ label: t('contactPage.eyebrow') }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <Card className="p-6 sm:p-8 lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label={t('forms.fullName')}
                  required
                  placeholder="Your name"
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />
                <Input
                  label={t('forms.phone')}
                  type="tel"
                  required
                  placeholder="98765 43210"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>
              <Input
                label={t('forms.email')}
                type="email"
                required
                placeholder="you@company.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <Textarea
                label={t('forms.message')}
                required
                placeholder="How can we help?"
                rows={5}
                error={errors.message?.message}
                {...register('message')}
              />
              <Button type="submit" size="lg" className="w-full" loading={submitting} icon={Send}>
                {submitting ? t('common.sending') : t('common.sendMessage')}
              </Button>
            </form>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-ink-950">{t('contactPage.getInTouch')}</h3>
              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-ink-800">{COMPANY.contactPerson}</p>
                    <a href={`tel:${COMPANY.phoneRaw}`} className="text-sm text-ink-500 hover:text-brand-primary-700">
                      {COMPANY.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary-600" />
                  <a href={`mailto:${COMPANY.email}`} className="text-sm text-ink-500 hover:text-brand-primary-700">
                    {COMPANY.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary-600" />
                  <p className="text-sm text-ink-500">{t('footer.address')}</p>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary-600" />
                  <p className="text-sm text-ink-500">{t('contactPage.hours')}</p>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
