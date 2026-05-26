import type { ButtonHTMLAttributes } from 'react'

export type ToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
}

export function Toggle({
  checked,
  onCheckedChange,
  label,
  className = '',
  ...rest
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      className={`ui-toggle${checked ? ' ui-toggle--on' : ''}${className ? ` ${className}` : ''}`}
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      {...rest}
    >
      <span className="ui-toggle__thumb" aria-hidden />
    </button>
  )
}
