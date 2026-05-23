import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type ScreenProps = HTMLAttributes<HTMLElement> & {
  as?: 'main' | 'section'
  narrow?: boolean
}

export const Screen = ({ as = 'main', narrow = false, className, ...props }: ScreenProps) => {
  const Comp = as

  return (
    <Comp
      className={cn(
        'mx-auto w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20',
        narrow ? 'max-w-3xl' : 'max-w-6xl',
        className,
      )}
      {...props}
    />
  )
}
