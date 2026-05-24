import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MosaicEmptyTile, MosaicTile } from './MosaicTile'
import { MOSAIC_ONBOARDED_KEY } from './mosaicHandoff'
import { MOSAIC_ITEMS } from './discoverData'
import '../../styles/sections.css'
import './discover-mosaic.css'

const COLS = 4
const MIN_ZOOM = 1
const MAX_ZOOM = 2.5
const WHEEL_SENSITIVITY = 0.002
const PINCH_SENSITIVITY = 0.012
const LENS_ZOOM_THRESHOLD = 1.15
const LENS_FOCUS_SCALE = 1.3
const ONBOARD_DELAY_MS = 600
const ONBOARD_PULSE_MS = 1200
const ONBOARD_PEAK_ZOOM = 1.4

type JumpRightInProps = {
  onTileSelect: (id: string) => void
}

function buildRows<T>(items: T[], cols: number): T[][] {
  const rows: T[][] = []
  let i = 0
  let rowIdx = 0
  while (i < items.length) {
    const isOffset = rowIdx % 2 === 1
    const rowLen = isOffset ? cols - 1 : cols
    rows.push(items.slice(i, i + rowLen))
    i += rowLen
    rowIdx++
  }
  return rows
}

function clampLensScale(value: number) {
  return Math.min(1.55, Math.max(1.0, value))
}

function computeTileScale(distance: number, radius: number) {
  if (distance >= radius) return 1
  return clampLensScale(1 + 0.55 * Math.cos((distance / radius) * (Math.PI / 2)))
}

export const JumpRightIn = ({ onTileSelect }: JumpRightInProps) => {
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [hintVisible, setHintVisible] = useState(true)
  const [gridVisible, setGridVisible] = useState(false)
  const mosaicRegionRef = useRef<HTMLDivElement>(null)
  const lastTouchDist = useRef<number | null>(null)
  const tileRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const lensScaleRef = useRef<Map<string, number>>(new Map())
  const lensRafRef = useRef<number | null>(null)
  const onboardRafRef = useRef<number | null>(null)
  const userZoomedRef = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z))

  const registerTileRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) {
      tileRefs.current.set(id, el)
      el.style.setProperty('--lens-scale', '1')
      el.style.setProperty('--lens-opacity', '1')
    } else {
      tileRefs.current.delete(id)
      lensScaleRef.current.delete(id)
    }
  }, [])

  const getLensScale = useCallback((id: string) => lensScaleRef.current.get(id) ?? 1, [])

  const applyLens = useCallback(() => {
    const region = mosaicRegionRef.current
    if (!region || tileRefs.current.size === 0) return

    // Transformed viewport + tile centers via getBoundingClientRect (not offsetLeft/Top).
    const regionRect = region.getBoundingClientRect()
    const vp = {
      x: regionRect.left + regionRect.width / 2,
      y: regionRect.top + regionRect.height / 2,
      width: regionRect.width,
    }
    const radius = vp.width * 0.22
    const lensActive = zoom >= LENS_ZOOM_THRESHOLD
    const useLensCurve = !prefersReducedMotion

    let closestId: string | null = null
    let closestDistance = Infinity

    const tileMetrics: Array<{
      id: string
      el: HTMLButtonElement
      distance: number
      scale: number
    }> = []

    tileRefs.current.forEach((el, id) => {
      // Post-transform screen coordinates include wrapper scale and per-tile lens scale.
      const rect = el.getBoundingClientRect()
      const tileX = rect.left + rect.width / 2
      const tileY = rect.top + rect.height / 2
      const distance = Math.hypot(tileX - vp.x, tileY - vp.y)

      if (distance < closestDistance) {
        closestDistance = distance
        closestId = id
      }

      const scale = useLensCurve ? computeTileScale(distance, radius) : 1
      tileMetrics.push({ id, el, distance, scale })
    })

    tileMetrics.forEach(({ id, el, distance, scale }) => {
      el.style.setProperty('--lens-scale', String(scale))
      lensScaleRef.current.set(id, scale)

      const dimmed = useLensCurve && distance > radius * 3
      const opacity = dimmed ? 0.55 : 1
      el.style.setProperty('--lens-opacity', String(opacity))

      const isFocused = lensActive && scale > LENS_FOCUS_SCALE
      const isCenter = lensActive && id === closestId

      el.classList.toggle('mosaic-tile--lensed', isFocused)
      el.classList.toggle('mosaic-tile--center', isCenter)
      el.classList.toggle('mosaic-tile--dimmed', dimmed)
    })
  }, [prefersReducedMotion, zoom])

  const scheduleLensUpdate = useCallback(() => {
    if (lensRafRef.current !== null) return
    lensRafRef.current = requestAnimationFrame(() => {
      lensRafRef.current = null
      applyLens()
    })
  }, [applyLens])

  const setZoomFromUser = useCallback(
    (updater: (prev: number) => number) => {
      userZoomedRef.current = true
      localStorage.setItem(MOSAIC_ONBOARDED_KEY, '1')
      setZoom(updater)
      setHintVisible(false)
      scheduleLensUpdate()
    },
    [scheduleLensUpdate],
  )

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!e.ctrlKey && Math.abs(e.deltaY) > 0) {
        e.preventDefault()
        setZoomFromUser((prev) => clampZoom(prev - e.deltaY * WHEEL_SENSITIVITY))
      }
    },
    [setZoomFromUser],
  )

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastTouchDist.current = Math.hypot(dx, dy)
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length === 2 && lastTouchDist.current !== null) {
        e.preventDefault()
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const dist = Math.hypot(dx, dy)
        const delta = (dist - lastTouchDist.current) * PINCH_SENSITIVITY
        lastTouchDist.current = dist
        setZoomFromUser((prev) => clampZoom(prev + delta))
      }
    },
    [setZoomFromUser],
  )

  const handleTouchEnd = useCallback(() => {
    lastTouchDist.current = null
  }, [])

  useEffect(() => {
    const el = mosaicRegionRef.current
    if (!el) return

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchmove', handleTouchMove, { passive: false })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchmove', handleTouchMove)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd])

  useEffect(() => {
    if (!hintVisible) return
    const timer = window.setTimeout(() => setHintVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [hintVisible])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setGridVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    scheduleLensUpdate()
  }, [zoom, scheduleLensUpdate, gridVisible])

  useEffect(() => {
    const region = mosaicRegionRef.current
    if (!region) return

    const resizeObserver = new ResizeObserver(() => scheduleLensUpdate())
    resizeObserver.observe(region)

    const scrollParent = region.closest('.app-page-scroll')
    const onScroll = () => scheduleLensUpdate()

    scrollParent?.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    scheduleLensUpdate()

    return () => {
      resizeObserver.disconnect()
      scrollParent?.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (lensRafRef.current !== null) {
        cancelAnimationFrame(lensRafRef.current)
      }
      if (onboardRafRef.current !== null) {
        cancelAnimationFrame(onboardRafRef.current)
      }
    }
  }, [scheduleLensUpdate])

  useEffect(() => {
    if (prefersReducedMotion) return
    if (localStorage.getItem(MOSAIC_ONBOARDED_KEY)) return

    let delayTimer: number | undefined
    let cancelled = false

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2

    delayTimer = window.setTimeout(() => {
      if (userZoomedRef.current || cancelled) return

      const start = performance.now()

      const tick = (now: number) => {
        if (cancelled || userZoomedRef.current) return

        const elapsed = now - start
        if (elapsed >= ONBOARD_PULSE_MS) {
          setZoom(MIN_ZOOM)
          localStorage.setItem(MOSAIC_ONBOARDED_KEY, '1')
          scheduleLensUpdate()
          onboardRafRef.current = null
          return
        }

        const phase = elapsed / ONBOARD_PULSE_MS
        const envelope = phase < 0.5 ? easeInOut(phase * 2) : easeInOut((1 - phase) * 2)
        setZoom(1 + (ONBOARD_PEAK_ZOOM - 1) * envelope)
        scheduleLensUpdate()
        onboardRafRef.current = requestAnimationFrame(tick)
      }

      onboardRafRef.current = requestAnimationFrame(tick)
    }, ONBOARD_DELAY_MS)

    return () => {
      cancelled = true
      if (delayTimer !== undefined) window.clearTimeout(delayTimer)
      if (onboardRafRef.current !== null) {
        cancelAnimationFrame(onboardRafRef.current)
        onboardRafRef.current = null
      }
    }
  }, [prefersReducedMotion, scheduleLensUpdate])

  const rows = buildRows(MOSAIC_ITEMS, COLS)
  const isEmpty = MOSAIC_ITEMS.length === 0

  return (
    <section className="home-section jump-right-in" aria-labelledby="jump-right-in-heading">
      <div className="home-section__head">
        <h2 id="jump-right-in-heading" className="section-heading">
          Jump Right In
        </h2>
        <p className="section-subtitle">Pinch or scroll to explore the mosaic</p>
      </div>

      <div className="discover__mosaic-region" ref={mosaicRegionRef}>
        <div
          className="discover__zoom-wrapper"
          style={{ transform: `scale(${zoom})` }}
        >
          <div
            className={`mosaic-grid${gridVisible ? ' mosaic-grid--visible' : ''}`}
            role="grid"
            aria-label="Podcast episodes"
          >
            {isEmpty ? (
              <div className="mosaic-row" role="row">
                <MosaicEmptyTile />
              </div>
            ) : (
              rows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className={`mosaic-row${rowIdx % 2 === 1 ? ' mosaic-row--offset' : ''}`}
                  role="row"
                >
                  {row.map((item) => (
                    <MosaicTile
                      key={item.id}
                      item={item}
                      zoom={zoom}
                      onSelect={onTileSelect}
                      tileRef={registerTileRef}
                      getLensScale={getLensScale}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        <div
          className={`discover__zoom-hint${hintVisible ? '' : ' discover__zoom-hint--hidden'}`}
          aria-live="polite"
        >
          Pinch or scroll to zoom
        </div>
      </div>
    </section>
  )
}
