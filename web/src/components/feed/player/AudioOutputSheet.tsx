import type { CSSProperties } from 'react'
import type { FeedEpisode } from '../feedData'
import type { AudioOutput } from './playerMocks'
import { BottomSheet } from './BottomSheet'

type AudioOutputSheetProps = {
  open: boolean
  episode: FeedEpisode
  outputs: AudioOutput[]
  activeId: string
  themeStyle?: CSSProperties
  onSelect: (id: string) => void
  onClose: () => void
}

const OutputIcon = ({ kind }: { kind: AudioOutput['kind'] }) => {
  switch (kind) {
    case 'speaker':
      return (
        <svg className="player-output-item__icon" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M5 9v6h3l4 3V6L8 9H5zm11.5 3c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z"
            fill="currentColor"
          />
        </svg>
      )
    case 'bluetooth':
      return (
        <svg className="player-output-item__icon" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M17.71 7.71 12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"
            fill="currentColor"
          />
        </svg>
      )
    case 'airplay':
      return (
        <svg className="player-output-item__icon" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M6 20h12v-2H6v2zm6-16L3 11h3v7h12v-7h3L12 4z"
            fill="currentColor"
          />
        </svg>
      )
    case 'wired':
      return (
        <svg className="player-output-item__icon" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h1v-8H5v-1a7 7 0 0 1 14 0v1h-1v8h1c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"
            fill="currentColor"
          />
        </svg>
      )
  }
}

const CheckIcon = () => (
  <svg className="player-output-item__check" viewBox="0 0 16 16" aria-hidden>
    <path
      d="M6.5 11.2 3.8 8.5l-.9.9 3.6 3.6 7.4-7.4-.9-.9-6.5 6.5z"
      fill="currentColor"
    />
  </svg>
)

export const AudioOutputSheet = ({
  open,
  episode,
  outputs,
  activeId,
  themeStyle,
  onSelect,
  onClose,
}: AudioOutputSheetProps) => (
  <BottomSheet
    open={open}
    title="Audio output"
    onClose={onClose}
    variant="plain"
    className="player-sheet--output"
    sheetStyle={themeStyle}
  >
    <div className="player-output-header">
      <img
        src={episode.coverSrc}
        alt=""
        className="player-output-header__art"
      />
      <div className="player-output-header__copy">
        <p className="player-output-header__title">{episode.episodeTitle}</p>
        <p className="player-output-header__show">{episode.showName}</p>
      </div>
    </div>

    <ul className="player-output-list" role="listbox" aria-label="Choose output">
      {outputs.map((output) => {
        const isActive = output.id === activeId
        return (
          <li key={output.id}>
            <button
              type="button"
              role="option"
              aria-selected={isActive}
              className={`player-output-item${isActive ? ' player-output-item--active' : ''}`}
              onClick={() => {
                onSelect(output.id)
                onClose()
              }}
            >
              <OutputIcon kind={output.kind} />
              <span className="player-output-item__label">{output.label}</span>
              {isActive ? (
                <span className="player-output-item__check-wrap" aria-hidden>
                  <CheckIcon />
                </span>
              ) : null}
            </button>
          </li>
        )
      })}
    </ul>
  </BottomSheet>
)
