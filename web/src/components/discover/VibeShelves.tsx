import { useReducedMotion } from 'framer-motion'
import type { VibeShelf as VibeShelfData } from '../../data/discoverFeed'
import { VibeShelf } from './VibeShelf'
import './VibeShelves.css'

export type VibeShelvesProps = {
  shelves?: VibeShelfData[]
  loading?: boolean
  onSelect?: (vibeId: string) => void
}

const HEADING_ID = 'vibe-shelves-heading'

export const VibeShelves = ({
  shelves = [],
  loading = false,
  onSelect,
}: VibeShelvesProps) => {
  const prefersReducedMotion = useReducedMotion()
  const allowMotion = !prefersReducedMotion && !loading

  if (!loading && shelves.length === 0) {
    return null
  }

  return (
    <section className="vibe-shelves" aria-labelledby={HEADING_ID}>
      <h2 id={HEADING_ID} className="vibe-shelves__heading">
        In the mood for…
      </h2>

      <VibeShelf
        shelves={shelves}
        loading={loading}
        onSelect={onSelect}
        allowMotion={allowMotion}
        headingId={HEADING_ID}
      />
    </section>
  )
}
