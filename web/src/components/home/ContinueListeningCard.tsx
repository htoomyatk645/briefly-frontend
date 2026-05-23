import { ArtworkPlaceholder } from './ArtworkPlaceholder'
import type { ContinueListeningItem } from './types'

export type ContinueListeningCardProps = {
  item: ContinueListeningItem
  onPress?: (id: string) => void
}

export const ContinueListeningCard = ({
  item,
  onPress,
}: ContinueListeningCardProps) => (
  <button
    type="button"
    className="continue-card"
    onClick={() => onPress?.(item.id)}
    aria-label={`Resume ${item.episodeTitle} from ${item.showName}`}
  >
    <ArtworkPlaceholder
      tone={item.artworkTone}
      coverSrc={item.coverSrc}
      size="md"
      className="continue-card__art"
      label={`${item.showName} artwork`}
    />
    <div className="continue-card__body">
      <p className="continue-card__show">{item.showName}</p>
      <p className="continue-card__title">{item.episodeTitle}</p>
      <div className="continue-card__progress" aria-hidden>
        <span
          className="continue-card__progress-fill"
          style={{ width: `${Math.round(item.progress * 100)}%` }}
        />
      </div>
      <p className="continue-card__meta">{item.durationLabel}</p>
    </div>
  </button>
)
