import { Home, Search } from 'lucide-react'
import Section from '@/components/layout/Section.jsx'
import Heading from '@/components/ui/Heading.jsx'
import Button from '@/components/ui/Button.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <Section tone="muted" className="min-h-[70vh] flex items-center">
      <div className="mx-auto max-w-lg text-center">
        <span className="font-display text-7xl font-bold text-brand-primary-700">404</span>
        <Heading as="h1" size="h2" className="mt-4">
          {t('notFound.title')}
        </Heading>
        <p className="mt-3 text-ink-500">
          {t('notFound.description')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" icon={Home}>
            {t('common.backToHome')}
          </Button>
          <Button href="/contact" variant="outline" icon={Search}>
            {t('common.contactUs')}
          </Button>
        </div>
      </div>
    </Section>
  )
}
