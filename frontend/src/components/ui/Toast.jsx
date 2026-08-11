import { createContext, useCallback, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/useLanguage.js'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const TONES = {
  success: 'border-l-4 border-l-emerald-500 [&_svg]:text-emerald-500',
  error: 'border-l-4 border-l-red-500 [&_svg]:text-red-500',
  info: 'border-l-4 border-l-brand-primary-500 [&_svg]:text-brand-primary-600',
}

let idCounter = 0

/**
 * App-wide toast provider. Wrap the app once (in Layout, Module 2) then call
 * `useToast().push(...)` anywhere to surface a confirmation or error —
 * used by the Request Demo form (Module 6) after a successful/failed submit.
 */
export function ToastProvider({ children }) {
  const { t } = useLanguage()
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    ({ title, description, tone = 'info', duration = 5000 }) => {
      const id = ++idCounter
      setToasts((prev) => [...prev, { id, title, description, tone }])
      if (duration) {
        setTimeout(() => dismiss(id), duration)
      }
      return id
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2.5 w-[calc(100vw-2rem)] max-w-sm">
          <AnimatePresence>
            {toasts.map((toast) => {
              const Icon = ICONS[toast.tone]
              return (
                <motion.div
                  key={toast.id}
                  role="status"
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 32, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={cn(
                    'flex items-start gap-3 rounded-xl bg-surface shadow-lifted px-4 py-3.5',
                    TONES[toast.tone]
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    {toast.title && <p className="text-sm font-semibold text-ink-900">{toast.title}</p>}
                    {toast.description && (
                      <p className="mt-0.5 text-sm text-ink-500">{toast.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismiss(toast.id)}
                    aria-label={t('common.dismissNotification')}
                    className="text-ink-300 hover:text-ink-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a <ToastProvider>')
  return ctx
}
