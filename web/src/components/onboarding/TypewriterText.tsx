import { useEffect } from 'react'
import { useTypewriter } from './useTypewriter'

type TypewriterTextProps = {
  text: string
  as?: 'h1' | 'h2' | 'p'
  className?: string
  enabled?: boolean
  onComplete?: () => void
}

export const TypewriterText = ({
  text,
  as: Tag = 'h2',
  className,
  enabled = true,
  onComplete,
}: TypewriterTextProps) => {
  const { displayed, isComplete } = useTypewriter({ text, enabled })

  useEffect(() => {
    if (isComplete) {
      onComplete?.()
    }
  }, [isComplete, onComplete])

  return (
    <Tag className={className} aria-label={text}>
      {displayed}
      {!isComplete ? (
        <span className="typewriter-cursor" aria-hidden>
          |
        </span>
      ) : null}
    </Tag>
  )
}
