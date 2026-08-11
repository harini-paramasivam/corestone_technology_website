import { ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section.jsx'
import Heading, { Eyebrow } from '@/components/ui/Heading.jsx'
import Button from '@/components/ui/Button.jsx'
import Reveal, { RevealGroup } from '@/components/motion/Reveal.jsx'
import { INDUSTRIES, localizedName } from '@/data/site.js'
import { getIndustryImage } from '@/data/industryImages.js'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function IndustriesPreviewSection() {
  const { t, language } = useLanguage()

  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">{t('home.industriesEyebrow')}</Eyebrow>
          <Heading as="h2" className="mt-4">
            {t('home.industriesHeading')}
          </Heading>
          <p className="mt-4 text-ink-500">
            {t('home.industriesSubhead')}
          </p>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {INDUSTRIES.map((industry, i) => {
          const imgData = getIndustryImage(industry.slug)
          return (
            <Reveal key={industry.slug} delay={i * 0.02}>
              <a
                href={`/industries/${industry.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-card border border-ink-100/80 bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary-300 hover:shadow-lifted"
              >
                {/* Thumbnail Image */}
                <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                  <img
                    src={imgData.url}
                    alt={imgData.alt}
                    className="h-full w-full object-cover brightness-110 contrast-105 saturate-110 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <span className="absolute top-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md border border-white/30 group-hover:bg-blue-500 group-hover:scale-110 transition-all">
                    <industry.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                {/* Card Title & Category */}
                <div className="p-3.5 text-center bg-white">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {localizedName(industry, language)}
                  </span>
                </div>
              </a>
            </Reveal>
          )
        })}
      </RevealGroup>

      <div className="mt-10 text-center">
        <Button href="/industries" variant="outline" icon={ArrowRight} iconPosition="right">
          {t('common.viewAllIndustries')}
        </Button>
      </div>
    </Section>
  )
}
