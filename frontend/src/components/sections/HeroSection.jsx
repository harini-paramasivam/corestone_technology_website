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
      className="relative overflow-hidden bg-gradient-to-b from-brand-primary-50 to-surface pt-36 pb-24 sm:pb-28 lg:pt-44 lg:pb-32 border-b border-ink-100"
    >
      <Container className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <Eyebrow className="text-brand-accent-500">{t('hero.eyebrow')}</Eyebrow>

          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06] text-ink-900">
            {t('hero.headline')}
          </h1>

          <p className="mt-6 max-w-lg text-lg text-ink-600 leading-relaxed">
            {t('hero.subhead')}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/request-demo" size="lg" icon={ArrowRight} iconPosition="right">
              {t('common.requestDemo')}
            </Button>
            <Button href="/solutions" variant="outline" size="lg" icon={PlayCircle}>
              {t('common.exploreSolutions')}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-500">
            <span>{t('hero.trustIndustries')}</span>
            <span className="hidden sm:inline h-1 w-1 rounded-full bg-ink-300" aria-hidden="true" />
            <span>{t('hero.trustBusinesses')}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.15 }}
          className="w-full"
        >
          <HeroDashboardMockup />
        </motion.div>
      </Container>
    </section>
  )
}
