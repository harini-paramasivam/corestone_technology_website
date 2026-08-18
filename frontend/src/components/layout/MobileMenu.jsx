import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronRight, Phone } from 'lucide-react'
import { PRIMARY_NAV, COMPANY } from '@/data/site.js'
import { useLanguage } from '@/i18n/useLanguage.js'
import Button from '@/components/ui/Button.jsx'
import LanguageToggle from './LanguageToggle.jsx'

export default function MobileMenu({ open, onClose }) {
  const { t } = useLanguage()
  const firstFocusRef = useRef(null)

  // Lock body scroll when menu is open; restore on close/unmount
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstFocusRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex flex-col bg-surface lg:hidden"
          aria-modal="true"
          role="dialog"
          aria-label={t('nav.menu')}
        >
          {/* Top Header Bar */}
          <div className="flex h-[4.5rem] items-center justify-between border-b border-ink-100 px-4 sm:px-6 shrink-0">
            {/* Logo */}
            <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary-600 font-display text-base font-bold text-white">
                C
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-ink-950">
                CoreStone
              </span>
            </Link>

            {/* Close Button */}
            <button
              ref={firstFocusRef}
              type="button"
              onClick={onClose}
              aria-label={t('nav.closeMenu')}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-900 transition-colors"
            >
              <X className="h-6 w-6 text-brand-primary-600" />
            </button>
          </div>

          {/* Scrollable Body: Nav Links -> Language Toggle -> CTA Buttons */}
          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 flex flex-col justify-between">
            {/* Primary Nav List */}
            <nav className="divide-y divide-ink-100 border-t border-b border-ink-100" aria-label="Mobile navigation">
              {PRIMARY_NAV.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-4 text-lg font-medium transition-colors ${
                      isActive
                        ? 'text-brand-primary-600 font-semibold'
                        : 'text-ink-900 hover:text-brand-primary-600'
                    }`
                  }
                >
                  <span>{t(item.key)}</span>
                  <ChevronRight className="h-5 w-5 text-ink-400 shrink-0" aria-hidden="true" />
                </NavLink>
              ))}
            </nav>

            {/* Bottom Actions Area */}
            <div className="pt-6 pb-4 space-y-5">
              {/* Language Selector */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  {t('nav.languageToggleLabel') || 'Language'}
                </span>
                <LanguageToggle solid className="w-full max-w-xs justify-center py-1" />
              </div>

              {/* Phone Link */}
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="flex items-center justify-center gap-2 text-sm font-medium text-ink-600 hover:text-brand-primary-600 transition-colors py-1"
              >
                <Phone className="h-4 w-4 shrink-0 text-brand-primary-600" aria-hidden="true" />
                {COMPANY.phoneDisplay}
              </a>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  href="/request-demo"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center text-center font-semibold text-base py-3.5 shadow-soft"
                  onClick={onClose}
                >
                  {t('nav.requestDemo')}
                </Button>

                <Button
                  href="/contact"
                  variant="outline"
                  size="lg"
                  className="w-full justify-center text-center font-semibold text-base py-3.5 border-ink-300"
                  onClick={onClose}
                >
                  {t('common.contactUs')}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
