import Section from '@/components/layout/Section.jsx'
import Heading, { Eyebrow } from '@/components/ui/Heading.jsx'
import Card from '@/components/ui/Card.jsx'
import Reveal, { RevealGroup } from '@/components/motion/Reveal.jsx'
import AnimatedCounter from '@/components/motion/AnimatedCounter.jsx'
import { STATS, WHY_CORESTONE_ICONS } from '@/data/homeContent.js'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function WhyCoreStoneSection() {
  const { t, language } = useLanguage()
  const whyCards = t('home.whyCards')
  const statsLabels = t('home.statsLabels')

  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">{t('home.whyEyebrow')}</Eyebrow>
          <Heading as="h2" className="mt-4">
            {t('home.whyHeading')}
          </Heading>
          <p className="mt-4 text-ink-500">
            {t('home.whySubhead')}
          </p>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyCards.map((card, i) => {
          const Icon = WHY_CORESTONE_ICONS[i]
          return (
            <Reveal key={`${language}-${i}`} delay={i * 0.06}>
              <Card className="h-full p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary-50 text-brand-primary-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-950">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">{card.description}</p>
              </Card>
            </Reveal>
          )
        })}
      </RevealGroup>

      <Reveal delay={0.15}>
        <div className="mt-16 grid grid-cols-2 gap-8 rounded-card bg-ink-950 px-8 py-10 sm:grid-cols-4 shadow-lifted border border-white/10">
          {STATS.map((stat, i) => (
            <div key={`${language}-${i}`} className="text-center">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals ?? 0}
                className="font-display text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-300 drop-shadow-[0_2px_12px_rgba(56,189,248,0.5)]"
              />
              <p className="mt-2.5 text-xs sm:text-sm font-medium text-ink-300">{statsLabels[i]}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
