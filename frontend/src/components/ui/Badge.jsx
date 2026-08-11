import { cn } from '@/lib/utils'

const TONES = {
  blue: 'bg-brand-primary-50 text-brand-primary-700',
  orange: 'bg-brand-accent-50 text-brand-accent-600',
  neutral: 'bg-ink-100 text-ink-600',
  'inverse-orange': 'bg-white/10 text-brand-accent-300 border border-white/10',
}

export default function Badge({ tone = 'blue', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold font-mono uppercase tracking-wide',
        TONES[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
