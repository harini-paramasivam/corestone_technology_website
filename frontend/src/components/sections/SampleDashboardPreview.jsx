import Section from '@/components/layout/Section.jsx'
import Heading, { Eyebrow } from '@/components/ui/Heading.jsx'
import Reveal from '@/components/motion/Reveal.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'

/**
 * Generic "what your dashboard could look like" mockup, used on every
 * Industries detail page per the SRS ("Sample Dashboard Preview"). Kept
 * deliberately generic (not industry-specific numbers) since this is
 * illustrative — real dashboards are configured per client during
 * onboarding, not hardcoded per industry page.
 */
export default function SampleDashboardPreview({ industryName }) {
  const { t } = useLanguage()
  const labels = t('industriesPage.dashboardLabels')

  return (
    <Section tone="muted">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">{t('industriesPage.sampleDashboardEyebrow')}</Eyebrow>
          <Heading as="h2" className="mt-4">
            {t('industriesPage.sampleDashboardHeading', { industryName })}
          </Heading>
          <p className="mt-4 text-ink-500">
            {t('industriesPage.sampleDashboardSubhead')}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-10 max-w-3xl rounded-card bg-ink-950 p-6 shadow-lifted">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {labels.map((label, i) => (
              <div key={label} className="rounded-xl bg-white/5 p-4 border border-white/10">
                <p className="font-display text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                  {['₹68,400', '₹12.4L', '24', '3'][i]}
                </p>
                <p className="mt-1 text-xs font-medium text-ink-200">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-end gap-2 rounded-xl bg-white/5 p-4 h-24">
            {[30, 55, 42, 68, 50, 78, 60].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-brand-primary-600 to-brand-accent-400"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
