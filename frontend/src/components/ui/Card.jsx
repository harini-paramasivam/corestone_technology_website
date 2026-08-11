import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Base surface card. `interactive` adds hover-lift + border glow for
 * clickable cards (solution tiles, industry tiles); plain cards (stat
 * blocks, testimonial panels) leave it off.
 */
const Card = forwardRef(function Card(
  { as: Tag = 'div', interactive = false, className, children, ...props },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={cn(
        'rounded-[var(--radius-card)] bg-surface border border-ink-200 shadow-soft p-6',
        interactive &&
          'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lifted hover:border-brand-primary-300 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
})

export default Card
