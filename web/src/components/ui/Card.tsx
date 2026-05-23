import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean
}

export const Card = ({ elevated = false, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6',
        elevated ? 'shadow-[0_8px_24px_rgba(31,35,36,0.06)]' : '',
        className,
      )}
      {...props}
    />
  )
}
