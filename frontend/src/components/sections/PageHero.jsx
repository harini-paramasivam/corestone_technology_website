import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Container from '@/components/layout/Container.jsx'
import Heading, { Eyebrow } from '@/components/ui/Heading.jsx'
import Reveal from '@/components/motion/Reveal.jsx'
import { useLanguage } from '@/i18n/useLanguage.js'

/**
 * Shared hero banner for interior pages (Solutions/Industries index and
 * detail pages). Always dark, always sits under the transparent-capable
 * Navbar — every interior page that uses this should be added to
 * TRANSPARENT_NAV_ROUTES in Layout.jsx, or accept the solid navbar default.
 */
export default function PageHero({ eyebrow, title, description, breadcrumbs = [], icon: Icon }) {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-primary-50 to-surface pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pb-20 border-b border-ink-100">
      <Container className="relative">
        {breadcrumbs.length > 0 && (
          <nav aria-label={t('common.breadcrumb')} className="mb-6 flex items-center gap-1.5 text-sm text-ink-500">
            <Link to="/" className="hover:text-brand-primary-600 transition-colors">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                {crumb.href && i < breadcrumbs.length - 1 ? (
                  <Link to={crumb.href} className="hover:text-brand-primary-600 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ink-900 font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <Reveal>
          <div className="flex items-center gap-4">
            {Icon && (
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-primary-100 text-brand-primary-600">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
            )}
            <div>
              {eyebrow && <Eyebrow className="text-brand-accent-500">{eyebrow}</Eyebrow>}
              <Heading as="h1" size="h1" className="mt-2 text-ink-900">
                {title}
              </Heading>
            </div>
          </div>
          {description && (
            <p className="mt-5 max-w-2xl text-ink-600 leading-relaxed">{description}</p>
          )}
        </Reveal>
      </Container>
    </section>
  )
}
