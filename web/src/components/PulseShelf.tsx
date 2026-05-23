import type { PulseEpisode } from '../data/homeData'
import '../styles/sections.css'
import './homeShelves.css'

export type PulseShelfProps = {
  episodes: PulseEpisode[]
  onPlay?: (id: string) => void
}

function accentHeight(score: number) {
  const clamped = Math.min(100, Math.max(0, score))
  return 24 + (clamped / 100) * 32
}

export const PulseShelf = ({ episodes, onPlay }: PulseShelfProps) => {
  if (episodes.length === 0) return null

  return (
    <section className="home-shelf pulse-shelf" aria-labelledby="pulse-shelf-heading">
      <div className="home-section__head">
        <h2 id="pulse-shelf-heading" className="section-heading">
          Pulse
        </h2>
        <p className="section-subtitle">Shows people are talking about</p>
      </div>
      <div className="home-shelf__scroller" role="list">
        {episodes.map((episode) => (
          <button
            key={episode.id}
            type="button"
            className="pulse-card"
            role="listitem"
            onClick={() => onPlay?.(episode.id)}
            aria-label={`Play ${episode.episodeTitle} from ${episode.showName}`}
          >
            <span
              className="pulse-card__accent"
              style={{ height: `${accentHeight(episode.trendScore)}px` }}
              aria-hidden
            />
            <img
              src={episode.coverSrc}
              alt=""
              className="pulse-card__art"
              width={64}
              height={64}
            />
            <span className="pulse-card__body">
              <span className="pulse-card__show">{episode.showName}</span>
              <span className="pulse-card__title">{episode.episodeTitle}</span>
              <span className="pulse-card__trend">{episode.trendLabel}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
