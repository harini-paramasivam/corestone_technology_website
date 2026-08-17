import { useLocation, Navigate } from 'react-router-dom'
import { CheckCircle2, Home } from 'lucide-react'
import Section from '@/components/layout/Section.jsx'
import Card from '@/components/ui/Card.jsx'
import Button from '@/components/ui/Button.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function DemoSuccess() {
  const location = useLocation()
  const { t } = useLanguage()
  const { leadId, leadValues, whatsappSent, whatsappStatus } = location.state || {}

  if (!leadId) {
    return <Navigate to="/request-demo" replace />
  }

  return (
    <Section tone="muted" className="min-h-[75vh] flex items-center py-12">
      <Card className="mx-auto max-w-xl p-8 sm:p-10 shadow-lifted border border-ink-100/80">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-sm">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h1 className="mt-5 font-display text-2xl sm:text-3xl font-extrabold text-ink-950 text-center">
          {t('demoSuccess.title')}
        </h1>
        <p className="mt-2 text-sm text-ink-600 text-center">
          {t('demoSuccess.description', { leadId })}
        </p>

        {/* Submission & Delivery Confirmation Banner */}
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-emerald-50/80 p-4 border border-emerald-200">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
          <div className="text-left text-xs text-emerald-900">
            <p className="font-bold text-sm text-emerald-950">Demo Request Submitted Successfully</p>
            <p className="mt-0.5">
              Your request details have been securely recorded and sent to our team.
            </p>
          </div>
        </div>

        {/* Client Details Summary */}
        {leadValues && (
          <div className="mt-6 text-left rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs space-y-1.5">
            <p className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1.5 mb-2">Submitted Request Details:</p>
            <p><span className="font-semibold text-slate-700">Name:</span> {leadValues.fullName}</p>
            <p><span className="font-semibold text-slate-700">Phone:</span> {leadValues.phone}</p>
            <p><span className="font-semibold text-slate-700">Email:</span> {leadValues.email}</p>
            {leadValues.companyName && <p><span className="font-semibold text-slate-700">Company:</span> {leadValues.companyName}</p>}
            {leadValues.industry && <p><span className="font-semibold text-slate-700">Industry:</span> {leadValues.industry}</p>}
            {leadValues.businessRequirement && <p><span className="font-semibold text-slate-700">Requirement:</span> {leadValues.businessRequirement}</p>}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button href="/" variant="primary" icon={Home}>
            {t('common.backToHome')}
          </Button>
        </div>

        <p className="mt-6 text-xs text-ink-400 text-center">
          {t('demoSuccess.saveLeadId')}
        </p>
      </Card>
    </Section>
  )
}
