import { useCallback, useEffect, useRef, useState } from 'react'
import { MosaicTile } from './MosaicTile'
import { MOSAIC_ITEMS } from './discoverData'
import '../../styles/sections.css'
import './discover-mosaic.css'

const COLS = 4
const MIN_ZOOM = 1
const MAX_ZOOM = 2.5
const WHEEL_SENSITIVITY = 0.002
const PINCH_SENSITIVITY = 0.012

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

export const JumpRightIn = ({ onTileSelect }: JumpRightInProps) => {
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [hintVisible, setHintVisible] = useState(true)
  const mosaicRegionRef = useRef<HTMLDivElement>(null)
  const lastTouchDist = useRef<number | null>(null)

  const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z))

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!e.ctrlKey && Math.abs(e.deltaY) > 0) {
      e.preventDefault()
      setZoom((prev) => clampZoom(prev - e.deltaY * WHEEL_SENSITIVITY))
      setHintVisible(false)
    }
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      lastTouchDist.current = Math.hypot(dx, dy)
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDist.current !== null) {
      e.preventDefault()
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const delta = (dist - lastTouchDist.current) * PINCH_SENSITIVITY
      lastTouchDist.current = dist
      setZoom((prev) => clampZoom(prev + delta))
      setHintVisible(false)
    }
  }, [])

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

  const rows = buildRows(MOSAIC_ITEMS, COLS)

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
                    zoom={zoom}
                    onSelect={onTileSelect}
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
          Pinch or scroll to zoom
        </div>
      </div>
    </section>
  )
}
