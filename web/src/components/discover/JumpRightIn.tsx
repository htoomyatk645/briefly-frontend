import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { MosaicTile } from './MosaicTile'
import {
  getMosaicBaseId,
  MOSAIC_ITEMS,
  tileMosaicLibrary,
} from './discoverData'
import '../../styles/sections.css'
import './discover-mosaic.css'

const COLS = 5
const MIN_ZOOM = 1
const MAX_ZOOM = 2.5
const AUTO_COMMIT_ZOOM = 2.3
const LENS_CENTER_SCALE = 1.55
const LENS_EDGE_SCALE = 1
const LENS_PEAK_SCALE = 1.45
const FOCUS_RADIUS_RATIO = 0.2
const WHEEL_SENSITIVITY = 0.002
const PINCH_SENSITIVITY = 0.012
const FRICTION = 0.92
const VELOCITY_STOP = 0.35
const ONBOARDING_KEY = 'briefly_mosaic_onboarding_seen'
const LIBRARY_TILE_COUNT = 60

type JumpRightInProps = {
  onTileSelect: (id: string) => void
}

type PointerSample = { x: number; y: number }

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

function pointerDistance(a: PointerSample, b: PointerSample): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

export const JumpRightIn = ({ onTileSelect }: JumpRightInProps) => {
  const prefersReducedMotion = useReducedMotion()
  const [isLoading, setIsLoading] = useState(true)
  const [hintVisible, setHintVisible] = useState(true)
  const [transitionItemId, setTransitionItemId] = useState<string | null>(null)
  const [isCommitting, setIsCommitting] = useState(false)
  const [fadeOverlay, setFadeOverlay] = useState(false)

  const mosaicRegionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const panX = useRef(0)
  const panY = useRef(0)
  const zoom = useRef(MIN_ZOOM)
  const velocityX = useRef(0)
  const velocityY = useRef(0)
  const lastPointer = useRef({ x: 0, y: 0, t: 0 })
  const pointers = useRef(new Map<number, PointerSample>())
  const lastPinchDist = useRef<number | null>(null)
  const wasPinching = useRef(false)
  const pinchSessionZoomedIn = useRef(false)
  const pinchStartZoom = useRef<number | null>(null)
  const centeredItemId = useRef<string | null>(null)
  const hasAlignedGrid = useRef(false)

  const libraryItems = useMemo(
    () => tileMosaicLibrary(MOSAIC_ITEMS, LIBRARY_TILE_COUNT),
    [],
  )
  const rows = useMemo(() => buildRows(libraryItems, COLS), [libraryItems])
  const isEmpty = libraryItems.length === 0

  const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z))

  const applyCanvasTransform = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.style.transform = `translate3d(${panX.current}px, ${panY.current}px, 0) scale(${zoom.current})`
  }, [])

  const updateLens = useCallback(() => {
    const region = mosaicRegionRef.current
    if (!region || isEmpty) return

    const regionRect = region.getBoundingClientRect()
    const centerX = regionRect.left + regionRect.width / 2
    const centerY = regionRect.top + regionRect.height / 2
    const minDim = Math.min(regionRect.width, regionRect.height)
    const focusRadius = minDim * FOCUS_RADIUS_RATIO

    const tiles = region.querySelectorAll<HTMLElement>('.mosaic-tile')
    let focusedTileEl: HTMLElement | null = null
    let focusedScale = LENS_EDGE_SCALE
    let closestDist = Infinity

    const tileList = [...tiles]
    for (const tile of tileList) {
      const rect = tile.getBoundingClientRect()
      const tileCenterX = rect.left + rect.width / 2
      const tileCenterY = rect.top + rect.height / 2
      const dist = Math.hypot(tileCenterX - centerX, tileCenterY - centerY)

      let scale = LENS_EDGE_SCALE
      if (dist <= focusRadius) {
        const t = dist / focusRadius
        scale =
          LENS_EDGE_SCALE +
          ((LENS_CENTER_SCALE - LENS_EDGE_SCALE) * (1 + Math.cos(t * Math.PI))) / 2
      }

      if (dist < closestDist) {
        closestDist = dist
        focusedTileEl = tile
        focusedScale = scale
      }

      tile.style.setProperty('--lens-scale', scale.toFixed(3))
    }

    for (const tile of tileList) {
      tile.classList.remove('mosaic-tile--centered', 'mosaic-tile--lens-peak')
    }

    if (focusedTileEl !== null) {
      focusedTileEl.classList.add('mosaic-tile--centered')
      if (focusedScale > LENS_PEAK_SCALE) {
        focusedTileEl.classList.add('mosaic-tile--lens-peak')
      }
    }

    centeredItemId.current =
      focusedTileEl !== null ? (focusedTileEl.dataset.itemId ?? null) : null
  }, [isEmpty])

  const alignGridToLensCenter = useCallback(() => {
    const region = mosaicRegionRef.current
    if (!region || isEmpty) return

    const regionRect = region.getBoundingClientRect()
    const centerX = regionRect.left + regionRect.width / 2
    const centerY = regionRect.top + regionRect.height / 2

    const tiles = region.querySelectorAll<HTMLElement>('.mosaic-tile')
    let focusedTileEl: HTMLElement | null = null
    let closestDist = Infinity

    for (const tile of tiles) {
      const rect = tile.getBoundingClientRect()
      const tileCenterX = rect.left + rect.width / 2
      const tileCenterY = rect.top + rect.height / 2
      const dist = Math.hypot(tileCenterX - centerX, tileCenterY - centerY)
      if (dist < closestDist) {
        closestDist = dist
        focusedTileEl = tile
      }
    }

    if (focusedTileEl === null) return

    const rect = focusedTileEl.getBoundingClientRect()
    const tileCenterX = rect.left + rect.width / 2
    const tileCenterY = rect.top + rect.height / 2
    panX.current += centerX - tileCenterX
    panY.current += centerY - tileCenterY
    applyCanvasTransform()
    updateLens()
  }, [applyCanvasTransform, isEmpty, updateLens])

  const tick = useCallback(() => {
    if (
      pointers.current.size === 0 &&
      (Math.abs(velocityX.current) > VELOCITY_STOP || Math.abs(velocityY.current) > VELOCITY_STOP)
    ) {
      panX.current += velocityX.current
      panY.current += velocityY.current
      velocityX.current *= FRICTION
      velocityY.current *= FRICTION
      applyCanvasTransform()
    }

    updateLens()
    rafRef.current = requestAnimationFrame(tick)
  }, [applyCanvasTransform, updateLens])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [tick])

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 280)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading || isEmpty || hasAlignedGrid.current) return

    const frame = requestAnimationFrame(() => {
      alignGridToLensCenter()
      hasAlignedGrid.current = true
    })

    return () => cancelAnimationFrame(frame)
  }, [alignGridToLensCenter, isEmpty, isLoading])

  useEffect(() => {
    const region = mosaicRegionRef.current
    if (!region || isLoading || isEmpty) return

    const observer = new ResizeObserver(() => {
      if (pointers.current.size === 0 && zoom.current === MIN_ZOOM) {
        alignGridToLensCenter()
      }
    })
    observer.observe(region)
    return () => observer.disconnect()
  }, [alignGridToLensCenter, isEmpty, isLoading])

  useEffect(() => {
    if (!hintVisible) return
    const timer = window.setTimeout(() => setHintVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [hintVisible])

  useEffect(() => {
    if (prefersReducedMotion || isLoading || isEmpty) return
    if (localStorage.getItem(ONBOARDING_KEY)) return

    localStorage.setItem(ONBOARDING_KEY, '1')
    const start = performance.now()
    const duration = 1400

    const pulse = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const wave = t < 0.5 ? t * 2 : (1 - t) * 2
      zoom.current = MIN_ZOOM + wave * 0.4
      applyCanvasTransform()
      if (t < 1) requestAnimationFrame(pulse)
      else {
        zoom.current = MIN_ZOOM
        applyCanvasTransform()
        alignGridToLensCenter()
      }
    }

    requestAnimationFrame(pulse)
  }, [alignGridToLensCenter, applyCanvasTransform, isEmpty, isLoading, prefersReducedMotion])

  const commitSelection = useCallback(
    (id: string) => {
      const baseId = getMosaicBaseId(id)
      setHintVisible(false)

      if (prefersReducedMotion) {
        setFadeOverlay(true)
        window.setTimeout(() => onTileSelect(baseId), 220)
        return
      }

      setTransitionItemId(id)
      setIsCommitting(true)
      requestAnimationFrame(() => {
        onTileSelect(baseId)
      })
    },
    [onTileSelect, prefersReducedMotion],
  )

  const attemptPinchCommit = useCallback(() => {
    updateLens()

    if (
      !wasPinching.current ||
      !pinchSessionZoomedIn.current ||
      zoom.current < AUTO_COMMIT_ZOOM ||
      pinchStartZoom.current === null ||
      zoom.current <= pinchStartZoom.current
    ) {
      return
    }

    const id = centeredItemId.current
    if (id) commitSelection(id)
  }, [commitSelection, updateLens])

  const sampleVelocity = useCallback((x: number, y: number) => {
    const now = performance.now()
    const dt = now - lastPointer.current.t
    if (dt > 0 && dt < 80) {
      velocityX.current = ((x - lastPointer.current.x) / dt) * 16
      velocityY.current = ((y - lastPointer.current.y) / dt) * 16
    }
    lastPointer.current = { x, y, t: now }
  }, [])

  const getPinchDist = useCallback(() => {
    const pts = [...pointers.current.values()]
    if (pts.length < 2) return null
    return pointerDistance(pts[0], pts[1])
  }, [])

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      setHintVisible(false)
      zoom.current = clampZoom(zoom.current - e.deltaY * WHEEL_SENSITIVITY)
      applyCanvasTransform()
    },
    [applyCanvasTransform],
  )

  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return

      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      velocityX.current = 0
      velocityY.current = 0
      lastPointer.current = { x: e.clientX, y: e.clientY, t: performance.now() }
      mosaicRegionRef.current?.setPointerCapture(e.pointerId)

      if (pointers.current.size >= 2) {
        wasPinching.current = true
        lastPinchDist.current = getPinchDist()
        if (pinchStartZoom.current === null) {
          pinchStartZoom.current = zoom.current
        }
      }
    },
    [getPinchDist],
  )

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return

      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      setHintVisible(false)

      if (pointers.current.size >= 2) {
        e.preventDefault()
        wasPinching.current = true

        const dist = getPinchDist()
        if (dist !== null && lastPinchDist.current !== null) {
          const delta = (lastPinchDist.current - dist) * PINCH_SENSITIVITY
          if (delta > 0) pinchSessionZoomedIn.current = true
          lastPinchDist.current = dist
          zoom.current = clampZoom(zoom.current + delta)
          applyCanvasTransform()
        }
        return
      }

      e.preventDefault()

      const dx = e.clientX - lastPointer.current.x
      const dy = e.clientY - lastPointer.current.y
      panX.current += dx
      panY.current += dy
      sampleVelocity(e.clientX, e.clientY)
      applyCanvasTransform()
    },
    [applyCanvasTransform, getPinchDist, sampleVelocity],
  )

  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return

      pointers.current.delete(e.pointerId)
      mosaicRegionRef.current?.releasePointerCapture(e.pointerId)

      if (pointers.current.size === 0) {
        attemptPinchCommit()
        wasPinching.current = false
        pinchSessionZoomedIn.current = false
        pinchStartZoom.current = null
        lastPinchDist.current = null
        return
      }

      if (pointers.current.size === 1) {
        lastPinchDist.current = null
        const remaining = [...pointers.current.values()][0]
        lastPointer.current = { x: remaining.x, y: remaining.y, t: performance.now() }
      }

      if (pointers.current.size >= 2) {
        lastPinchDist.current = getPinchDist()
      }
    },
    [attemptPinchCommit, getPinchDist],
  )

  useEffect(() => {
    const el = mosaicRegionRef.current
    if (!el || isEmpty) return

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('pointerdown', handlePointerDown)
    el.addEventListener('pointermove', handlePointerMove)
    el.addEventListener('pointerup', handlePointerUp)
    el.addEventListener('pointercancel', handlePointerUp)

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('pointerdown', handlePointerDown)
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerup', handlePointerUp)
      el.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [handlePointerDown, handlePointerMove, handlePointerUp, handleWheel, isEmpty])

  return (
    <section className="home-section jump-right-in" aria-labelledby="jump-right-in-heading">
      <div className="home-section__head jump-right-in__head">
        <h2 id="jump-right-in-heading" className="section-heading">
          Welcome back, Jump Right In
        </h2>
      </div>

      <div className="discover__mosaic-portal">
        <div
          className={[
            'discover__mosaic-region',
            isCommitting ? 'discover__mosaic-region--committing' : '',
            fadeOverlay ? 'discover__mosaic-region--fade-out' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          ref={mosaicRegionRef}
          aria-busy={isLoading}
        >
        {isLoading ? (
          <div className="discover__mosaic-loading" role="status" aria-label="Loading mosaic">
            <div className="discover__mosaic-skeleton" aria-hidden />
          </div>
        ) : isEmpty ? (
          <div className="discover__mosaic-empty" role="status">
            <p className="discover__mosaic-empty-text">No episodes to explore yet.</p>
          </div>
        ) : (
          <>
            <div className="discover__canvas" ref={canvasRef}>
              <div className="mosaic-grid" role="grid" aria-label="Podcast episodes">
                {rows.map((row, rowIdx) => (
                  <div
                    key={rowIdx}
                    className={`mosaic-row${rowIdx % 2 === 1 ? ' mosaic-row--offset' : ''}`}
                    role="row"
                  >
                    {row.map((item) => (
                      <MosaicTile
                        key={item.id}
                        item={item}
                        layoutIdActive={transitionItemId === item.id}
                        isTransitionSource={transitionItemId === item.id}
                        onSelect={commitSelection}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`discover__zoom-hint${hintVisible ? '' : ' discover__zoom-hint--hidden'}`}
              aria-live="polite"
            >
              Drag to pan · Pinch to focus
            </div>
          </>
        )}
        </div>
      </div>
    </section>
  )
}
