import { useCallback, useEffect, useRef, useState } from 'react'
import {
  readPlaybackSpeed,
  writePlaybackSpeed,
  type PlaybackSpeed,
} from './player/playerStorage'

export type UsePlaybackOptions = {
  durationSeconds: number
  initialSeconds?: number
  onEnded?: () => void
}

export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}

export function formatRemaining(seconds: number, duration: number): string {
  const left = Math.max(0, duration - seconds)
  const m = Math.floor(left / 60)
  const s = Math.floor(left % 60)
  return `-${m}:${s.toString().padStart(2, '0')}`
}

export function usePlayback({
  durationSeconds,
  initialSeconds = 0,
  onEnded,
}: UsePlaybackOptions) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(initialSeconds)
  const [playbackRate, setPlaybackRate] = useState<PlaybackSpeed>(() => readPlaybackSpeed())
  const duration = durationSeconds
  const tickRef = useRef<number | null>(null)
  const onEndedRef = useRef(onEnded)
  onEndedRef.current = onEnded

  const clamp = useCallback(
    (t: number) => Math.min(Math.max(0, t), duration),
    [duration],
  )

  const seek = useCallback(
    (t: number) => {
      setCurrentTime(clamp(t))
    },
    [clamp],
  )

  const play = useCallback(() => setIsPlaying(true), [])
  const pause = useCallback(() => setIsPlaying(false), [])

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => !p)
  }, [])

  const rewind15 = useCallback(() => {
    setCurrentTime((t) => clamp(t - 15))
  }, [clamp])

  const forward30 = useCallback(() => {
    setCurrentTime((t) => clamp(t + 30))
  }, [clamp])

  const setSpeed = useCallback((speed: PlaybackSpeed) => {
    setPlaybackRate(speed)
    writePlaybackSpeed(speed)
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      if (tickRef.current != null) {
        window.clearInterval(tickRef.current)
        tickRef.current = null
      }
      return
    }

    tickRef.current = window.setInterval(() => {
      setCurrentTime((t) => {
        const next = t + playbackRate
        if (next >= duration) {
          setIsPlaying(false)
          onEndedRef.current?.()
          return duration
        }
        return next
      })
    }, 1000)

    return () => {
      if (tickRef.current != null) window.clearInterval(tickRef.current)
    }
  }, [isPlaying, playbackRate, duration])

  useEffect(() => {
    setIsPlaying(false)
    setCurrentTime(clamp(initialSeconds))
  }, [durationSeconds, initialSeconds, clamp])

  const progress = duration > 0 ? currentTime / duration : 0

  return {
    isPlaying,
    currentTime,
    duration,
    progress,
    playbackRate,
    togglePlay,
    play,
    pause,
    seek,
    rewind15,
    forward30,
    setSpeed,
    formatTime,
    formatRemaining,
  }
}
