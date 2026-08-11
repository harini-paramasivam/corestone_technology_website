import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import Field from './Field.jsx'

const Textarea = forwardRef(function Textarea(
  { label, error, hint, required, id, rows = 4, className, ...props },
  ref
) {
  const inputId = id || props.name

  const el = (
    <textarea
      ref={ref}
      id={inputId}
      rows={rows}
      className={cn(
        'w-full resize-y rounded-[var(--radius-input)] border bg-surface px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-4 focus:ring-brand-primary-100 focus:border-brand-primary-600',
        error ? 'border-error focus:ring-red-100' : 'border-ink-200',
        className
      )}
      aria-invalid={!!error}
      {...props}
    />
  )

  if (!label && !error && !hint) return el

  return (
    <Field label={label} htmlFor={inputId} required={required} error={error} hint={hint}>
      {el}
    </Field>
  )
})

export default Textarea
