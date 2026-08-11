import { Check } from 'lucide-react'
import Section from '@/components/layout/Section.jsx'
import Heading from '@/components/ui/Heading.jsx'
import Badge from '@/components/ui/Badge.jsx'
import Card from '@/components/ui/Card.jsx'
import Reveal, { RevealGroup } from '@/components/motion/Reveal.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'

/**
 * Shared body for any "detail" page built from { overview, features,
 * benefits, modules } shaped content — used by both Solutions detail
 * pages (Module 4) and Industries detail pages (Module 5) so the two
 * page types stay visually consistent without duplicating markup.
 * Section headings ("Overview", "What's included", "Why it works") are
 * translated here since this one component renders on all 25 pages —
 * a bug here previously meant every detail page had English headings
 * even in Tamil mode, caught during the RC1 review and fixed.
 */
export default function DetailBody({ overview, features = [], benefits = [], modules = [] }) {
  const { t } = useLanguage()

  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Heading as="h2">{t('industriesPage.overviewHeading')}</Heading>
            <p className="mt-4 text-ink-600 leading-relaxed">{overview}</p>

            {modules.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {modules.map((m) => (
                  <Badge key={m} tone="blue">{m}</Badge>
                ))}
              </div>
            )}
          </div>

          {features.length > 0 && (
            <Card className="p-6 h-fit">
              <h3 className="font-display text-lg font-semibold text-ink-950">
                {t('industriesPage.whatsIncludedHeading')}
              </h3>
              <ul className="mt-4 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-500" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </Section>

      {benefits.length > 0 && (
        <Section tone="muted">
          <Heading as="h2">{t('industriesPage.whyItWorksHeading')}</Heading>
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.06}>
                <Card className="h-full p-6">
                  <span className="font-display text-2xl font-bold text-brand-accent-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-3 text-sm text-ink-700 leading-relaxed">{b}</p>
                </Card>
              </Reveal>
            ))}
          </RevealGroup>
        </Section>
      )}
    </>
  )
}
