import type { EditorialPick } from '../data/homeData'
import './homeShelves.css'

export type TheEditProps = {
  pick: EditorialPick
  onPlay?: (id: string) => void
}

export const TheEdit = ({ pick, onPlay }: TheEditProps) => (
  <section className="home-shelf the-edit" aria-labelledby="the-edit-heading">
    <h2 id="the-edit-heading" className="home-shelf__label">
      The Edit
    </h2>
    <button
      type="button"
      className="the-edit__card"
      onClick={() => onPlay?.(pick.id)}
      aria-label={`Listen now to ${pick.title}`}
    >
      <span
        className="the-edit__copy"
        style={{ backgroundColor: pick.accentColor }}
      >
        <span>
          <p className="the-edit__kicker">{pick.kicker}</p>
          <p className="the-edit__title">{pick.title}</p>
        </span>
        <span className="the-edit__cta">Listen now →</span>
      </span>
      <img
        src={pick.coverSrc}
        alt=""
        className="the-edit__art"
      />
    </button>
  </section>
)
