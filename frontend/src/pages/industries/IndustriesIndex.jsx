import PageHero from '@/components/sections/PageHero.jsx'
import Section from '@/components/layout/Section.jsx'
import RequestDemoCTASection from '@/components/sections/RequestDemoCTASection.jsx'
import Reveal, { RevealGroup } from '@/components/motion/Reveal.jsx'
import { INDUSTRIES, localizedName } from '@/data/site.js'
import { getIndustryImage } from '@/data/industryImages.js'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function IndustriesIndex() {
  const { t, language } = useLanguage()

  return (
    <>
      <PageHero
        eyebrow={t('industriesPage.eyebrow')}
        title={t('industriesPage.title')}
        description={t('industriesPage.description')}
        breadcrumbs={[{ label: t('industriesPage.eyebrow') }]}
      />

      <Section>
        <RevealGroup className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((industry, i) => {
            const imgData = getIndustryImage(industry.slug)
            return (
              <Reveal key={industry.slug} delay={i * 0.02}>
                <a
                  href={`/industries/${industry.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-card border border-ink-100/80 bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary-300 hover:shadow-lifted"
                >
                  {/* Thumbnail Photo */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={imgData.url}
                      alt={imgData.alt}
                      className="h-full w-full object-cover brightness-110 contrast-105 saturate-110 transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                    <span className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md border border-white/30 group-hover:bg-blue-500 group-hover:scale-110 transition-all">
                      <industry.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="absolute bottom-2.5 left-3 rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white shadow-md">
                      {imgData.category}
                    </span>
                  </div>
                  {/* Card Title */}
                  <div className="p-4 text-center bg-white">
                    <span className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {localizedName(industry, language)}
                    </span>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </RevealGroup>
      </Section>

      <RequestDemoCTASection />
    </>
  )
}
