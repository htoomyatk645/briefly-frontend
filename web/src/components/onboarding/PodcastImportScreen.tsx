import { ApplePodcastsIcon, SpotifyIcon } from './PodcastIcons'
import './podcast-import.css'

export type PodcastImportSource = 'apple-podcasts' | 'spotify'

export type PodcastImportScreenProps = {
  onImport: (source: PodcastImportSource) => void
  onSkip: () => void
}

export const PodcastImportScreen = ({
  onImport,
  onSkip,
}: PodcastImportScreenProps) => (
  <section
    className="podcast-import podcast-import--shelled"
    aria-label="Bring your podcasts with you"
  >
    <div className="podcast-import__body">
      <h1 className="podcast-import__title">Bring your podcasts with you</h1>
      <p className="podcast-import__subtitle">
        Import your subscriptions so Briefly knows what you already follow.
      </p>

      <div className="podcast-import__options" role="list">
        <button
          type="button"
          className="podcast-import-option"
          role="listitem"
          onClick={() => onImport('apple-podcasts')}
        >
          <span className="podcast-import-option__icon">
            <ApplePodcastsIcon />
          </span>
          <span className="podcast-import-option__label">Apple Podcasts</span>
        </button>

        <button
          type="button"
          className="podcast-import-option"
          role="listitem"
          onClick={() => onImport('spotify')}
        >
          <span className="podcast-import-option__icon">
            <SpotifyIcon />
          </span>
          <span className="podcast-import-option__label">Spotify</span>
        </button>
      </div>
    </div>

    <footer className="podcast-import__footer">
      <button type="button" className="btn-pill-skip" onClick={onSkip}>
        Skip
      </button>
    </footer>
  </section>
)
