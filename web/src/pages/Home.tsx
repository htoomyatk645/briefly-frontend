import { PulseShelf } from '../components/PulseShelf'
import { JumpRightIn } from '../components/discover/JumpRightIn'
import { ContinueListeningCard } from '../components/home/ContinueListeningCard'
import { MOCK_HOME_FEED } from '../components/home/homeData'
import { BrieflyLogo } from '../components/onboarding/BrieflyLogo'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { pulseEpisodes } from '../data/homeData'
import '../components/home/home.css'
import '../components/discover/discover-mosaic.css'
import '../styles/sections.css'

export type HomeProps = {
  onTileSelect: (id: string) => void
  onShowSelect?: (id: string) => void
}

export const Home = ({ onTileSelect }: HomeProps) => {
  const feed = MOCK_HOME_FEED
  const hasContinue = feed.continueListening.length > 0

  return (
    <div className="discover home-page">
      <header className="discover__header">
        <div className="discover__brand" aria-label="Briefly">
          <BrieflyLogo />
        </div>
        <div className="discover__actions">
          <ThemeToggle />
        </div>
      </header>

      <div className="discover__viewport">
        <JumpRightIn onTileSelect={onTileSelect} />

        <div className="home-shelves">
          <PulseShelf episodes={pulseEpisodes} onPlay={onTileSelect} />
        </div>

        {hasContinue ? (
          <section className="home-section" aria-labelledby="continue-listening-heading">
            <div className="home-section__head">
              <h2 id="continue-listening-heading" className="section-heading">
                Continue listening
              </h2>
              <p className="section-subtitle">Pick up where you paused</p>
            </div>
            <div className="home-rail" role="list">
              {feed.continueListening.map((item) => (
                <ContinueListeningCard
                  key={item.id}
                  item={item}
                  onPress={onTileSelect}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
