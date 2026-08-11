import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/useLanguage.js'

/**
 * Accessible modal dialog rendered via portal to document.body.
 * - Locks background scroll while open
 * - Closes on Escape and backdrop click
 * - Traps Tab focus within the dialog
 * - Restores focus to the trigger element on close
 */
export default function Modal({ open, onClose, title, description, size = 'md', children }) {
  const { t } = useLanguage()
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => dialogRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      triggerRef.current?.focus?.()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-desc' : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={cn(
              'relative w-full rounded-card bg-surface shadow-lifted p-6 sm:p-8 max-h-[90vh] overflow-y-auto',
              sizes[size]
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t('common.closeDialog')}
              className="absolute right-4 top-4 rounded-full p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            {title && (
              <h2 id="modal-title" className="font-display text-xl font-semibold text-ink-950 pr-8">
                {title}
              </h2>
            )}
            {description && (
              <p id="modal-desc" className="mt-1.5 text-sm text-ink-500">
                {description}
              </p>
            )}
            <div className={cn(title || description ? 'mt-5' : '')}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
