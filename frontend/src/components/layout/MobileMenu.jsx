import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronRight, Phone, MessageCircle } from 'lucide-react'
import { PRIMARY_NAV, COMPANY, buildWhatsAppLink } from '@/data/site.js'
import { useLanguage } from '@/i18n/useLanguage.js'
import Button from '@/components/ui/Button.jsx'
import LanguageToggle from './LanguageToggle.jsx'

const WA_LINK = buildWhatsAppLink({ message: "Hi CoreStone Technologies, I'd like to know more about your business software." })

export default function MobileMenu({ open, onClose }) {
  const { t } = useLanguage()
  const firstFocusRef = useRef(null)

  // Lock body scroll when open; restore on close/unmount
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      // Trap focus inside panel on open
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
        /* Full-viewport overlay — z-[200] so it sits above everything */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[200] lg:hidden"
          aria-modal="true"
          role="dialog"
          aria-label={t('nav.menu')}
        >
          {/* Backdrop — clicking closes */}
          <div
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in drawer from the right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-[85vw] max-w-[340px] flex-col bg-surface shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 shrink-0">
              <span className="font-display text-base font-semibold text-ink-950">
                {t('nav.menu')}
              </span>
              <button
                ref={firstFocusRef}
                type="button"
                onClick={onClose}
                aria-label={t('nav.closeMenu')}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links — scrollable */}
            <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Mobile navigation">
              {PRIMARY_NAV.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-primary-50 text-brand-primary-700'
                        : 'text-ink-800 hover:bg-ink-50 active:bg-ink-100'
                    }`
                  }
                >
                  {t(item.key)}
                  <ChevronRight className="h-4 w-4 text-ink-300 shrink-0" aria-hidden="true" />
                </NavLink>
              ))}
            </nav>

            {/* Footer actions */}
            <div className="shrink-0 border-t border-ink-100 px-4 py-5 space-y-3">
              <LanguageToggle className="w-full justify-center flex" />

              <Button
                href="/request-demo"
                variant="primary"
                className="w-full justify-center"
                onClick={onClose}
              >
                {t('nav.requestDemo')}
              </Button>

              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-50 transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {COMPANY.phoneDisplay}
              </a>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
