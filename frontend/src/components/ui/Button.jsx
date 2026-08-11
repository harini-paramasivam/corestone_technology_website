import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const VARIANTS = {
  primary:
    'bg-brand-primary-600 text-white shadow-soft hover:bg-brand-primary-700 active:bg-brand-primary-800',
  secondary:
    'border border-brand-primary-600 bg-surface text-brand-primary-600 shadow-soft hover:bg-brand-primary-50 active:bg-brand-primary-100',
  outline:
    'border border-ink-200 bg-surface text-ink-800 hover:border-brand-primary-300 hover:bg-brand-primary-50',
  ghost: 'text-ink-700 hover:bg-ink-100',
  'outline-inverse':
    'border border-white/30 text-white hover:bg-white/10',
}

const SIZES = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-12 px-6 text-sm gap-2',
  lg: 'h-14 px-8 text-base gap-2.5',
}

/**
 * Polymorphic button: renders a <button>, a React Router <Link>, or a plain
 * <a>, chosen automatically from the props you pass (href -> Link/anchor,
 * otherwise <button>). One component, one visual language, everywhere.
 */
const Button = forwardRef(function Button(
  {
    as,
    href,
    external,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    className,
    children,
    ...props
  },
  ref
) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-[var(--radius-button)] font-medium font-body',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-2 focus-visible:outline-brand-primary-600 focus-visible:outline-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'active:scale-[0.98]',
    VARIANTS[variant],
    SIZES[size],
    className
  )

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className="h-4 w-4" aria-hidden="true" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="h-4 w-4" aria-hidden="true" />
      )}
    </>
  )

  if (href && !as) {
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          ref={ref}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={classes}
          {...props}
        >
          {content}
        </a>
      )
    }
    return (
      <Link ref={ref} to={href} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  )
})

export default Button
