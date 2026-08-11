import { cn } from '@/lib/utils'

const SIZES = {
  display: 'text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]',
  h1: 'text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight',
  h2: 'text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight',
  h3: 'text-xl sm:text-2xl font-semibold tracking-tight',
  h4: 'text-lg sm:text-xl font-semibold',
}

/**
 * Typographic heading using the display font. `as` controls the semantic
 * tag independently of visual size, so a page can have exactly one <h1>
 * while an h2-styled element appears earlier for visual hierarchy.
 */
export default function Heading({ as: Tag = 'h2', size = 'h2', className, children, ...props }) {
  return (
    <Tag className={cn('font-display font-extrabold text-ink-900 tracking-tight', SIZES[size], className)} {...props}>
      {children}
    </Tag>
  )
}

export function Eyebrow({ className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 shadow-xs',
        className
      )}
      {...props}
    >
      <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" aria-hidden="true" />
      {children}
    </span>
  )
}
