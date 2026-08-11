import Section from '@/components/layout/Section.jsx'
import Marquee from '@/components/motion/Marquee.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function TrustedBySection() {
  const { t, language } = useLanguage()
  const trustLabels = t('home.trustLabels')

  return (
    <Section tone="muted" className="py-12 sm:py-14">
      <p className="text-center text-xs font-mono font-semibold uppercase tracking-widest text-ink-400">
        {t('home.trustedByLabel')}
      </p>
      <div className="mt-6">
        <Marquee>
          {trustLabels.map((label, i) => (
            <span key={`${language}-${i}`} className="font-display text-lg sm:text-xl font-semibold text-ink-300 whitespace-nowrap">
              {label}
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  )
}
