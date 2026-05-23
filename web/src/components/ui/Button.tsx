import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

const sizeMap: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

const variantMap: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--primary)] text-white border border-[var(--primary)] hover:bg-[var(--primary-hover)]',
  secondary:
    'bg-[var(--surface-alt)] text-[var(--text)] border border-[var(--border-strong)] hover:bg-[var(--surface)]',
  ghost:
    'bg-transparent text-[var(--text-secondary)] border border-transparent hover:bg-[var(--surface-alt)] hover:text-[var(--text)]',
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading

  return (
    <button
      type="button"
      className={cn(
        'briefly-focus-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-medium transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-60',
        sizeMap[size],
        variantMap[variant],
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span aria-hidden>...</span> : null}
      <span>{children}</span>
    </button>
  )
}
