type ArtworkPlaceholderProps = {
  tone: string
  coverSrc?: string
  label?: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
}

const sizeClass = {
  sm: 'artwork--sm',
  md: 'artwork--md',
  lg: 'artwork--lg',
  hero: 'artwork--hero',
} as const

export const ArtworkPlaceholder = ({
  tone,
  coverSrc,
  label,
  className = '',
  size = 'md',
}: ArtworkPlaceholderProps) => {
  if (coverSrc) {
    return (
      <img
        src={coverSrc}
        alt={label ?? ''}
        className={`artwork artwork--photo ${sizeClass[size]} ${className}`.trim()}
      />
    )
  }

  return (
    <div
      className={`artwork artwork--${tone} ${sizeClass[size]} ${className}`.trim()}
      aria-hidden={!label}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <span className="artwork__shape artwork__shape--a" />
      <span className="artwork__shape artwork__shape--b" />
    </div>
  )
}
