import { motion } from 'framer-motion'

const DIRECTIONS = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { y: 0, x: 24 },
  right: { y: 0, x: -24 },
  none: { y: 0, x: 0 },
}

/**
 * Scroll-triggered fade/slide-in wrapper. Animates once, the first time the
 * element enters the viewport — never re-triggers on scroll-back, which
 * keeps long pages calm instead of flickering as the user scrolls up/down.
 */
export default function Reveal({
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.55,
  className,
  children,
}) {
  const MotionTag = motion[as] ?? motion.div
  const offset = DIRECTIONS[direction]

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/** Stagger container: wrap Reveal children in this to cascade their entrance. */
export function RevealGroup({ as = 'div', stagger = 0.08, className, children }) {
  const MotionTag = motion[as] ?? motion.div
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  )
}
