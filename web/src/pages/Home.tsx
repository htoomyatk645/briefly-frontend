import { PulseShelf } from '../components/PulseShelf'
import { JumpRightIn } from '../components/discover/JumpRightIn'
import { ContinueListeningSection } from '../components/home/ContinueListeningCard'
import { SectionReveal } from '../components/motion/SectionReveal'
import { continueListeningEpisodes, pulseEpisodes } from '../data/homeData'
import '../components/home/home.css'
import '../components/discover/discover-mosaic.css'
import '../styles/sections.css'

export type HomeProps = {
  onTileSelect: (id: string) => void
  onShowSelect?: (id: string) => void
}

export const Home = ({ onTileSelect }: HomeProps) => {
  return (
    <div className="discover home-page">
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
    </div>
  )
}
