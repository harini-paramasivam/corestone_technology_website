import { cn } from '@/lib/utils'

export default function Divider({ className }) {
  return <hr className={cn('border-t border-ink-100', className)} />
}
