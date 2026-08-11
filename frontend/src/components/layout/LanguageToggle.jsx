import { useLanguage } from '@/i18n/useLanguage.js'
import { SUPPORTED_LANGUAGES } from '@/i18n/LanguageProvider.jsx'
import { cn } from '@/lib/utils'

/**
 * Permanent language toggle, always visible in the Navbar (desktop) and
 * MobileMenu. Switches instantly via context state — no page reload,
 * no route change — and persists to localStorage inside LanguageProvider.
 */
export default function LanguageToggle({ solid = true, className }) {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t('nav.languageToggleLabel')}
      className={cn(
        'inline-flex items-center rounded-pill p-0.5 text-xs font-semibold',
        solid ? 'bg-ink-100' : 'bg-white/10',
        className
      )}
    >
      {SUPPORTED_LANGUAGES.map((lang) => {
        const active = language === lang.code
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            aria-pressed={active}
            className={cn(
              'rounded-pill px-3 py-1.5 transition-colors',
              active
                ? 'bg-brand-accent-500 text-white'
                : solid
                  ? 'text-ink-500 hover:text-ink-800'
                  : 'text-white/70 hover:text-white'
            )}
          >
            {lang.label}
          </button>
        )
      })}
    </div>
  )
}
