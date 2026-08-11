import { cn } from '@/lib/utils'

export default function Container({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag className={cn('container-page', className)} {...props}>
      {children}
    </Tag>
  )
}
