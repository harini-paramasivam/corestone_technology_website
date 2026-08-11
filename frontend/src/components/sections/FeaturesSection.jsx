import Section from '@/components/layout/Section.jsx'
import Heading, { Eyebrow } from '@/components/ui/Heading.jsx'
import Reveal, { RevealGroup } from '@/components/motion/Reveal.jsx'
import { FEATURE_ICONS } from '@/data/homeContent.js'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function FeaturesSection() {
  const { t, language } = useLanguage()
  const featureCards = t('home.featureCards')

  return (
    <Section tone="muted">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">{t('home.featuresEyebrow')}</Eyebrow>
          <Heading as="h2" className="mt-4">
            {t('home.featuresHeading')}
          </Heading>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((feature, i) => {
          const Icon = FEATURE_ICONS[i]
          return (
            <Reveal key={`${language}-${i}`} delay={i * 0.04}>
              <div className="h-full rounded-card border border-ink-100 bg-surface p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary-50 text-brand-primary-700">
                  <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                </span>
                <h3 className="mt-3.5 font-semibold text-ink-900">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">{feature.description}</p>
              </div>
            </Reveal>
          )
        })}
      </RevealGroup>
    </Section>
  )
}
