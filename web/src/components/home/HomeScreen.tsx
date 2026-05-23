import { ThemeIndicator } from '../ui/ThemeIndicator'
import { BrieflyLogo } from '../onboarding/BrieflyLogo'
import { ContinueListeningCard } from './ContinueListeningCard'
import { EpisodeFeedItem } from './EpisodeFeedItem'
import { FeaturedEpisodeCard } from './FeaturedEpisodeCard'
import { MOCK_HOME_FEED } from './homeData'
import { NewEpisodeFeedItem } from './NewEpisodeFeedItem'
import type { HomeFeedData } from './types'
import './home.css'

export type HomeScreenProps = {
  feed?: HomeFeedData
  showContinueListening?: boolean
  highlightEpisodeId?: string | null
  onPlayEpisode?: (id: string) => void
  onShowSelect?: (id: string) => void
  onNotifications?: () => void
  onProfile?: () => void
}

const BellIcon = () => (
  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden>
    <path
      d="M11 3a5 5 0 0 1 5 5v2.2c0 .5.2 1 .5 1.4l.8 1.1a1 1 0 0 1-.8 1.6h-9a1 1 0 0 1-.8-1.6l.8-1.1c.3-.4.5-.9.5-1.4V8a5 5 0 0 1 5-5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M9 17a2 2 0 0 0 4 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export const HomeScreen = ({
  feed = MOCK_HOME_FEED,
  showContinueListening = true,
  highlightEpisodeId: _highlightEpisodeId,
  onPlayEpisode,
  onNotifications,
  onProfile,
}: HomeScreenProps) => {
  const hasContinue =
    showContinueListening && feed.continueListening.length > 0

  return (
    <main className="home-screen" aria-label="Home feed">
      <header className="home-header">
        <div className="home-header__brand" aria-label="Briefly">
          <BrieflyLogo />
        </div>
        <div className="home-header__actions">
          <ThemeIndicator />
          <button
            type="button"
            className="home-header__icon-btn"
            onClick={onNotifications}
            aria-label="Notifications"
          >
            <BellIcon />
          </button>
          <button
            type="button"
            className="home-header__avatar"
            onClick={onProfile}
            aria-label="Your profile"
          >
            <span aria-hidden>B</span>
          </button>
        </div>
      </header>

      <div className="home-scroll">
        {hasContinue ? (
          <section className="home-section" aria-labelledby="continue-heading">
            <div className="home-section__head">
              <h2 id="continue-heading" className="home-section__title">
                Continue listening
              </h2>
            </div>
            <div className="home-rail" role="list">
              {feed.continueListening.map((item) => (
                <ContinueListeningCard
                  key={item.id}
                  item={item}
                  onPress={onPlayEpisode}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="home-section" aria-labelledby="for-you-heading">
          <div className="home-section__head">
            <h2 id="for-you-heading" className="home-section__title">
              For you today
            </h2>
            <p className="home-section__subtitle">
              Hand-picked highlights based on your tastes.
            </p>
          </div>

          <FeaturedEpisodeCard
            episode={feed.featured}
            onPlay={onPlayEpisode}
          />

          <div className="home-feed-list" role="list">
            {feed.recommendations.map((episode) => (
              <EpisodeFeedItem
                key={episode.id}
                episode={episode}
                onPress={onPlayEpisode}
              />
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="new-heading">
          <div className="home-section__head">
            <h2 id="new-heading" className="home-section__title">
              New from your shows
            </h2>
          </div>
          <div className="home-feed-list home-feed-list--compact" role="list">
            {feed.newEpisodes.map((episode) => (
              <NewEpisodeFeedItem
                key={episode.id}
                episode={episode}
                onPress={onPlayEpisode}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
