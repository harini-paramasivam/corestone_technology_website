import Section from '@/components/layout/Section.jsx'
import Heading, { Eyebrow } from '@/components/ui/Heading.jsx'
import Reveal from '@/components/motion/Reveal.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function HowWeWorkSection() {
  const { t, language } = useLanguage()
  // Arrays live inside the translation files (home.process), keyed by
  // language, so switching languages re-renders this with translated
  // step titles/descriptions instantly — no separate data file to sync.
  const steps = t('home.process')

  return (
    <Section tone="muted">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">{t('home.howWeWorkEyebrow')}</Eyebrow>
          <Heading as="h2" className="mt-4">
            {t('home.howWeWorkHeading')}
          </Heading>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-4 lg:gap-6">
        {steps.map((item, i) => (
          <Reveal key={`${language}-${i}`} delay={i * 0.08} className="relative">
            <div className="flex flex-col gap-4">
              <span className="font-display text-4xl font-bold text-brand-accent-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-lg font-semibold text-ink-950">{item.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{item.description}</p>
            </div>
            {i < steps.length - 1 && (
              <span
                className="hidden lg:block absolute top-6 left-[calc(100%+0.75rem)] w-6 border-t-2 border-dashed border-ink-200"
                aria-hidden="true"
              />
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
