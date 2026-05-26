import { PulseShelf } from '../components/PulseShelf'
import { TheEdit } from '../components/TheEdit'
import { JumpRightIn } from '../components/discover/JumpRightIn'
import { AccountMenuButton } from '../components/home/AccountMenuButton'
import { ContinueListeningSection } from '../components/home/ContinueListeningCard'
import { SectionReveal } from '../components/motion/SectionReveal'
import { BrieflyLogo } from '../components/onboarding/BrieflyLogo'
import { ThemeIndicator } from '../components/ui/ThemeIndicator'
import {
  continueListeningEpisodes,
  editorialPick,
  pulseEpisodes,
} from '../data/homeData'
import '../components/home/home.css'
import '../components/discover/discover-mosaic.css'
import '../styles/sections.css'
import '../styles/home-layout.css'
import '../styles/header-actions.css'

export type HomeProps = {
  onTileSelect: (id: string) => void
  onShowSelect?: (id: string) => void
}

export const Home = ({ onTileSelect }: HomeProps) => {
  return (
    <div className="discover home-page">
      <div className="discover__viewport">
        <header className="discover__header home-sticky-header">
          <div className="discover__brand" aria-label="Briefly">
            <BrieflyLogo />
          </div>
          <div className="discover__actions home-header-actions">
            <ThemeIndicator />
            <AccountMenuButton />
          </div>
        </header>

        <SectionReveal id="jump-right-in">
          <JumpRightIn onTileSelect={onTileSelect} />
        </SectionReveal>

        <SectionReveal id="pulse-shelf">
          <div className="home-shelves">
            <PulseShelf episodes={pulseEpisodes} onPlay={onTileSelect} />
          </div>
        </SectionReveal>

        <SectionReveal id="continue-listening">
          <ContinueListeningSection
            episodes={continueListeningEpisodes}
            onPress={onTileSelect}
          />
        </SectionReveal>

        <SectionReveal id="the-edit">
          <TheEdit pick={editorialPick} onPlay={onTileSelect} />
        </SectionReveal>
      </div>
    </div>
  )
}
