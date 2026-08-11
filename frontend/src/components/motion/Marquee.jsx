import { cn } from '@/lib/utils'

/**
 * Infinite horizontal scroller (trusted-by logo strip). Duplicates the
 * children once so the CSS animation can loop seamlessly at -50%.
 */
export default function Marquee({ children, className, pauseOnHover = true }) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className
      )}
    >
      <div
        className={cn(
          'flex w-max items-center gap-16 animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        <div className="flex items-center gap-16">{children}</div>
        <div className="flex items-center gap-16" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
