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
      className="relative w-full bg-gradient-to-b from-brand-primary-50 to-surface pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 border-b border-ink-100"
    >
      <Container className="relative flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Text column — strictly normal block flow where every element pushes the next downward */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-start w-full min-w-0"
        >
          {/* Eyebrow badge */}
          <Eyebrow className="text-brand-accent-500 text-xs sm:text-sm">
            {t('hero.eyebrow')}
          </Eyebrow>

          {/* Fluid responsive heading with proper Tamil line-height & wrapping */}
          <h1 className="hero-heading mt-4 font-display font-semibold tracking-tight text-ink-900">
            {t('hero.headline')}
          </h1>

          {/* Description */}
          <p className="mt-4 sm:mt-6 max-w-lg text-base sm:text-lg text-ink-600 leading-relaxed">
            {t('hero.subhead')}
          </p>

          {/* CTA buttons — stack on mobile, horizontal row on sm+ */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button
              href="/request-demo"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto justify-center text-center"
            >
              {t('common.requestDemo')}
            </Button>
            <Button
              href="/solutions"
              variant="outline"
              size="lg"
              icon={PlayCircle}
              className="w-full sm:w-auto justify-center text-center"
            >
              {t('common.exploreSolutions')}
            </Button>
          </div>

          {/* Trust badges footer */}
          <div className="mt-6 sm:mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-ink-500">
            <span>{t('hero.trustIndustries')}</span>
            <span className="hidden sm:inline h-1 w-1 rounded-full bg-ink-300" aria-hidden="true" />
            <span>{t('hero.trustBusinesses')}</span>
          </div>
        </motion.div>

        {/* Dashboard mockup — hidden on mobile, visible on lg+ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="hidden lg:block w-full"
        >
          <HeroDashboardMockup />
        </motion.div>
      </Container>
    </section>
  )
}


