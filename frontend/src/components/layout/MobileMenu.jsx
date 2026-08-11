import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronRight, Phone } from 'lucide-react'
import { PRIMARY_NAV, COMPANY } from '@/data/site.js'
import { useLanguage } from '@/i18n/useLanguage.js'
import Button from '@/components/ui/Button.jsx'
import LanguageToggle from './LanguageToggle.jsx'

export default function MobileMenu({ open, onClose }) {
  const { t } = useLanguage()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
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
          className="fixed inset-0 z-[90] bg-ink-950/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-surface shadow-lifted"
          >
            <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
              <span className="font-display text-lg font-semibold text-ink-950">{t('nav.menu')}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('nav.closeMenu')}
                className="rounded-full p-2 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3">
              {PRIMARY_NAV.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium ${
                      isActive ? 'bg-brand-primary-50 text-brand-primary-700' : 'text-ink-800 hover:bg-ink-50'
                    }`
                  }
                >
                  {t(item.key)}
                  <ChevronRight className="h-4 w-4 text-ink-300" aria-hidden="true" />
                </NavLink>
              ))}
            </nav>

            <div className="border-t border-ink-100 px-5 py-5 space-y-4">
              <LanguageToggle className="w-full justify-center flex" />
              <Button href="/request-demo" variant="primary" className="w-full" onClick={onClose}>
                {t('nav.requestDemo')}
              </Button>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="flex items-center justify-center gap-2 text-sm font-medium text-ink-600"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {COMPANY.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
