import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { COMPANY, SOLUTIONS, INDUSTRIES, localizedName } from '@/data/site.js'
import { useLanguage } from '@/i18n/useLanguage.js'
import Container from './Container.jsx'

const FOOTER_INDUSTRIES = INDUSTRIES.slice(0, 8)

export default function Footer() {
  const year = new Date().getFullYear()
  const { t, language } = useLanguage()

  return (
    <footer className="bg-surface border-t border-ink-200 text-ink-900">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary-600 font-display text-base font-bold text-white">
                C
              </span>
              <span className="font-display text-lg font-semibold text-ink-900">CoreStone</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">
              {t('footer.tagline')}. {t('footer.description')}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={COMPANY.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-surface text-ink-600 transition-all hover:border-brand-primary-600 hover:bg-brand-primary-50 hover:text-brand-primary-600 shadow-xs"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href={COMPANY.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-surface text-ink-600 transition-all hover:border-pink-500 hover:bg-pink-50 hover:text-pink-600 shadow-xs"
              >
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={COMPANY.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-surface text-ink-600 transition-all hover:border-ink-950 hover:bg-ink-100 hover:text-ink-950 shadow-xs"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-900">
              {t('footer.solutionsHeading')}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SOLUTIONS.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/solutions/${s.slug}`}
                    className="text-sm text-ink-600 transition-colors hover:text-brand-primary-600"
                  >
                    {localizedName(s, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-900">
              {t('footer.industriesHeading')}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_INDUSTRIES.map((i) => (
                <li key={i.slug}>
                  <Link
                    to={`/industries/${i.slug}`}
                    className="text-sm text-ink-600 transition-colors hover:text-brand-primary-600"
                  >
                    {localizedName(i, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-ink-900">
              {t('footer.contactHeading')}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="flex items-start gap-2.5 text-sm text-ink-600 transition-colors hover:text-brand-primary-600"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 text-sm text-ink-600 transition-colors hover:text-brand-primary-600 min-w-0"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="company-email">{COMPANY.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-ink-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {t('footer.address')}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-500">
            &copy; {year} {COMPANY.name}. {t('footer.rightsReserved')}
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-ink-500 hover:text-brand-primary-600">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/terms" className="text-xs text-ink-500 hover:text-brand-primary-600">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
