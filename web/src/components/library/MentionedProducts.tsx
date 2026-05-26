export type MentionedProductsProps = {
  className?: string
}

export default function MentionedProducts({ className = '' }: MentionedProductsProps) {
  return (
    <div className={`library-mention-panel${className ? ` ${className}` : ''}`}>
      <h3 className="library-mention-panel__title">Shop the show</h3>
      <div className="library-mention-panel__empty" aria-hidden />
    </div>
  )
}
