export type MentionedReadingProps = {
  className?: string
}

export default function MentionedReading({ className = '' }: MentionedReadingProps) {
  return (
    <div className={`library-mention-panel${className ? ` ${className}` : ''}`}>
      <h3 className="library-mention-panel__title">Worth a read</h3>
      <div className="library-mention-panel__empty" aria-hidden />
    </div>
  )
}
