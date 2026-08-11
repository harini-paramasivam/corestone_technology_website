import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import Field from './Field.jsx'

/**
 * Base text input. Forwards ref so it can be used directly as
 * `<Input {...register('email')} />` with React Hook Form. Pass `label`,
 * `error`, `hint` to get the full Field chrome; omit them to use just the
 * bare input (e.g. inside a custom composite field).
 */
const Input = forwardRef(function Input(
  { label, error, hint, required, id, className, ...props },
  ref
) {
  const inputId = id || props.name

  const inputEl = (
    <input
      ref={ref}
      id={inputId}
      className={cn(
        'h-12 w-full rounded-[var(--radius-input)] border bg-surface px-4 text-sm text-ink-900 placeholder:text-ink-400',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-4 focus:ring-brand-primary-100 focus:border-brand-primary-600',
        error ? 'border-error focus:ring-red-100' : 'border-ink-200',
        className
      )}
      aria-invalid={!!error}
      {...props}
    />
  )

  if (!label && !error && !hint) return inputEl

  return (
    <Field label={label} htmlFor={inputId} required={required} error={error} hint={hint}>
      {inputEl}
    </Field>
  )
})

export default Input
