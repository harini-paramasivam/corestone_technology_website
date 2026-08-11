import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Field from './Field.jsx'

/**
 * Native <select> styled to match Input/Textarea. Deliberately native
 * (not a custom listbox) for full keyboard/mobile/screen-reader support
 * out of the box — the right trade-off for a form-heavy lead-gen site.
 */
const Select = forwardRef(function Select(
  { label, error, hint, required, id, placeholder, options = [], className, value, ...props },
  ref
) {
  const inputId = id || props.name
  const isControlled = value !== undefined

  const el = (
    <div className="relative">
      <select
        ref={ref}
        id={inputId}
        {...(isControlled ? { value } : { defaultValue: '' })}
        className={cn(
          'h-12 w-full appearance-none rounded-[var(--radius-input)] border bg-surface pl-4 pr-10 text-sm text-ink-900',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-4 focus:ring-brand-primary-100 focus:border-brand-primary-600',
          error ? 'border-error focus:ring-red-100' : 'border-ink-200',
          className
        )}
        aria-invalid={!!error}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400"
        aria-hidden="true"
      />
    </div>
  )

  if (!label && !error && !hint) return el

  return (
    <Field label={label} htmlFor={inputId} required={required} error={error} hint={hint}>
      {el}
    </Field>
  )
})

export default Select
