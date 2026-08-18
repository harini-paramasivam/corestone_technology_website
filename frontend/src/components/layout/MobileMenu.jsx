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

  // Handle body scroll locking and Escape key event
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }

    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
      setTimeout(() => firstFocusRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        /* Full-viewport overlay container — high z-index (z-[100]) to cover all page content */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] lg:hidden flex justify-end"
          aria-modal="true"
          role="dialog"
          aria-label={t('nav.menu')}
          id="mobile-navigation-drawer"
        >
          {/* Backdrop overlay — dark semi-transparent click-to-close */}
          <div
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Standalone Navigation Drawer Panel — 100% solid background, zero bleed-through */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[101] flex h-full w-full max-w-[360px] flex-col bg-white border-l border-slate-200 shadow-2xl overflow-hidden"
          >
            {/* Header Bar inside Drawer */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 shrink-0 bg-white">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary-600 font-display text-sm font-bold text-white">
                  C
                </span>
                <span className="font-display text-base font-bold text-slate-900">CoreStone</span>
              </div>
              <button
                ref={firstFocusRef}
                type="button"
                onClick={onClose}
                aria-label={t('nav.closeMenu')}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Navigation Menu List */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 bg-white" aria-label="Mobile navigation">
              {PRIMARY_NAV.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-800 hover:bg-slate-50 active:bg-slate-100'
                    }`
                  }
                >
                  {t(item.key)}
                  <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                </NavLink>
              ))}
            </nav>

            {/* Footer Action Area inside Drawer */}
            <div className="shrink-0 border-t border-slate-100 bg-slate-50/80 px-5 py-5 space-y-3">
              <div className="flex justify-center pb-1">
                <LanguageToggle solid className="w-full justify-center shadow-xs" />
              </div>

              <Button
                href="/request-demo"
                variant="primary"
                className="w-full justify-center py-3 text-sm font-bold shadow-sm"
                onClick={onClose}
              >
                {t('nav.requestDemo')}
              </Button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-blue-600 shrink-0" aria-hidden="true" />
                  <span>Call Us</span>
                </a>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 px-3 text-xs font-semibold text-white hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-white shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

