import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/** Formats a raw 91-prefixed phone number for display: 917708196424 -> +91 77081 96424 */
export function formatPhoneDisplay(raw) {
  const digits = raw.replace(/\D/g, '')
  const cc = digits.slice(0, 2)
  const part1 = digits.slice(2, 7)
  const part2 = digits.slice(7)
  return `+${cc} ${part1} ${part2}`
}
