import { cn } from '@/lib/utils'
import Container from './Container.jsx'

const TONES = {
  default: 'bg-surface',
  muted: 'bg-surface-muted',
  sunken: 'bg-surface-sunken',
  dark: 'bg-ink-950 text-white',
}

/**
 * Vertical rhythm wrapper for page sections. Every section on every page
 * should be built from this so spacing stays consistent site-wide instead
 * of each page inventing its own padding.
 */
export default function Section({
  id,
  tone = 'default',
  containerClassName,
  className,
  children,
  ...props
}) {
  return (
    <section
      id={id}
      className={cn('py-16 sm:py-20 lg:py-28', TONES[tone], className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
