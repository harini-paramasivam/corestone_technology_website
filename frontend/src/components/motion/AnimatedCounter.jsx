import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

/**
 * Counts up from 0 to `value` when it scrolls into view. Used for the
 * homepage stats strip (years in business, projects delivered, etc).
 */
export default function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 24, stiffness: 90 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`
      }
    })
    return unsubscribe
  }, [spring, prefix, suffix, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
