import { useEffect, useState } from 'react'

type UseTypewriterOptions = {
  text: string
  speedMs?: number
  startDelayMs?: number
  enabled?: boolean
}

export const useTypewriter = ({
  text,
  speedMs = 36,
  startDelayMs = 200,
  enabled = true,
}: UseTypewriterOptions) => {
  const [displayed, setDisplayed] = useState(enabled ? '' : text)
  const [isComplete, setIsComplete] = useState(!enabled)

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text)
      setIsComplete(true)
      return
    }

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) {
      setDisplayed(text)
      setIsComplete(true)
      return
    }

    setDisplayed('')
    setIsComplete(false)

    let index = 0
    let intervalId = 0

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))

        if (index >= text.length) {
          window.clearInterval(intervalId)
          setIsComplete(true)
        }
      }, speedMs)
    }, startDelayMs)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [text, speedMs, startDelayMs, enabled])

  return { displayed, isComplete }
}
