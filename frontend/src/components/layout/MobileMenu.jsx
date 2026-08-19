import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronRight, ArrowRight } from 'lucide-react'
import { PRIMARY_NAV } from '@/data/site.js'
import { useLanguage } from '@/i18n/useLanguage.js'

export default function MobileMenu({ open, onClose }) {
  const { t, language, setLanguage } = useLanguage()
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
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-primary-600 bg-brand-primary-50 hover:bg-brand-primary-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Scrollable Body: Nav Links -> Language Toggle -> CTA Buttons */}
          <div className="flex-1 overflow-y-auto px-4 py-2 sm:px-6 flex flex-col">
            {/* Primary Nav List */}
            <nav className="divide-y divide-ink-100" aria-label="Mobile navigation">
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
            <div className="mt-auto pt-6 pb-6 space-y-6">
              <hr className="border-ink-100" />
              
              {/* Language Selector */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-sm font-semibold uppercase tracking-wider text-ink-500">
                  {t('nav.languageToggleLabel') || 'Language'}
                </span>
                <div className="flex items-center gap-4 w-full">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`flex-1 py-3 rounded-full font-semibold border transition-colors ${
                      language === 'en' 
                        ? 'bg-brand-primary-600 border-brand-primary-600 text-white' 
                        : 'bg-transparent border-ink-200 text-ink-700 hover:bg-ink-50'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('ta')}
                    className={`flex-1 py-3 rounded-full font-semibold border transition-colors ${
                      language === 'ta' 
                        ? 'bg-brand-primary-600 border-brand-primary-600 text-white' 
                        : 'bg-transparent border-ink-200 text-ink-700 hover:bg-ink-50'
                    }`}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>

              <hr className="border-ink-100" />

              {/* Request Demo CTA */}
              <Link
                to="/request-demo"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-brand-primary-600 py-4 text-center text-lg font-semibold text-white shadow-soft hover:bg-brand-primary-700 active:scale-[0.98] transition-all"
              >
                {t('nav.requestDemo')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
