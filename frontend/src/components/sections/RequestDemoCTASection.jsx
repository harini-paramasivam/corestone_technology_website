import { ArrowRight, Phone } from 'lucide-react'
import Section from '@/components/layout/Section.jsx'
import Heading from '@/components/ui/Heading.jsx'
import Button from '@/components/ui/Button.jsx'
import Reveal from '@/components/motion/Reveal.jsx'
import { COMPANY } from '@/data/site.js'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function RequestDemoCTASection() {
  const { t } = useLanguage()

  return (
    <Section tone="dark" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(16,185,129,0.16), transparent)',
        }}
      />
      <Reveal className="relative mx-auto max-w-2xl text-center">
        <Heading as="h2" size="h1" className="!text-white">
          {t('home.ctaHeading')}
        </Heading>
        <p className="mt-4 text-ink-200">
          {t('home.ctaSubhead')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/request-demo" size="lg" icon={ArrowRight} iconPosition="right">
            {t('common.requestDemo')}
          </Button>
          <Button href={`tel:${COMPANY.phoneRaw}`} variant="outline-inverse" size="lg" icon={Phone}>
            {t('common.callUs', { phone: COMPANY.phoneDisplay })}
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
