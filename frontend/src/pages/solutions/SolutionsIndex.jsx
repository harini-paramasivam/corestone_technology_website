import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/sections/PageHero.jsx'
import Section from '@/components/layout/Section.jsx'
import Card from '@/components/ui/Card.jsx'
import RequestDemoCTASection from '@/components/sections/RequestDemoCTASection.jsx'
import Reveal, { RevealGroup } from '@/components/motion/Reveal.jsx'
import { SOLUTIONS, localizedName, localizedDescription } from '@/data/site.js'
import { getSolutionImage } from '@/data/solutionImages.js'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function SolutionsIndex() {
  const { t, language } = useLanguage()

  return (
    <>
      <PageHero
        eyebrow={t('solutionsPage.eyebrow')}
        title={t('solutionsPage.title')}
        description={t('solutionsPage.description')}
        breadcrumbs={[{ label: t('solutionsPage.eyebrow') }]}
      />

      <Section>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((solution, i) => {
            const imgData = getSolutionImage(solution.slug)
            return (
              <Reveal key={solution.slug} delay={i * 0.04}>
                <Card as="a" href={`/solutions/${solution.slug}`} interactive className="group flex h-full flex-col overflow-hidden p-0">
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={imgData.url}
                      alt={imgData.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                      {imgData.category}
                    </span>
                    <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-brand-primary-700 shadow-md backdrop-blur-xs">
                      <solution.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink-950 group-hover:text-brand-primary-700 transition-colors">
                        {localizedName(solution, language)}
                      </h3>
                      <p className="mt-2 text-sm text-ink-500 leading-relaxed">{localizedDescription(solution, language)}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary-700">
                      {t('common.learnMore')} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Card>
              </Reveal>
            )
          })}
        </RevealGroup>
      </Section>

      <RequestDemoCTASection />
    </>
  )
}
