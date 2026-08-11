import { cn } from '@/lib/utils'

/**
 * Shared label + error chrome wrapped around Input/Textarea/Select so every
 * form field has identical spacing, label style, required-asterisk and
 * error presentation without repeating markup at every call site.
 */
export default function Field({ label, htmlFor, required, error, hint, className, children }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-ink-800">
          {label}
          {required && <span className="text-brand-accent-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-ink-400">{hint}</p>
      ) : null}
    </div>
  )
}
