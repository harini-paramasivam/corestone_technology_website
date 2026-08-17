import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import Container from '@/components/layout/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import { Eyebrow } from '@/components/ui/Heading.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'
import HeroDashboardMockup from './HeroDashboardMockup.jsx'

export default function HeroSection() {
  const containerRef = useRef(null)
  const { t } = useLanguage()

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-brand-primary-50 to-surface pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32 border-b border-ink-100"
    >
      <Container className="relative grid gap-10 sm:gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="min-w-0"
        >
          <Eyebrow className="text-brand-accent-500 text-xs sm:text-sm">
            {t('hero.eyebrow')}
          </Eyebrow>

          {/* Responsive heading: 2.25rem → 3rem → 3.5rem → 4rem */}
          <h1 className="mt-4 font-display font-semibold tracking-tight leading-[1.08] text-ink-900
                         text-[2rem] sm:text-[2.75rem] md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
            {t('hero.headline')}
          </h1>

          <p className="mt-4 sm:mt-6 max-w-lg text-base sm:text-lg text-ink-600 leading-relaxed">
            {t('hero.subhead')}
          </p>

          {/* CTA buttons — stack on mobile, row on sm+ */}
          <div className="mt-7 sm:mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4">
            <Button
              href="/request-demo"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full xs:w-auto justify-center"
            >
              {t('common.requestDemo')}
            </Button>
            <Button
              href="/solutions"
              variant="outline"
              size="lg"
              icon={PlayCircle}
              className="w-full xs:w-auto justify-center"
            >
              {t('common.exploreSolutions')}
            </Button>
          </div>

          <div className="mt-7 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-ink-500">
            <span>{t('hero.trustIndustries')}</span>
            <span className="hidden sm:inline h-1 w-1 rounded-full bg-ink-300" aria-hidden="true" />
            <span>{t('hero.trustBusinesses')}</span>
          </div>
        </motion.div>

        {/* Dashboard mockup — hidden on very small screens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.15 }}
          className="hidden sm:block w-full"
        >
          <HeroDashboardMockup />
        </motion.div>
      </Container>
    </section>
  )
}

