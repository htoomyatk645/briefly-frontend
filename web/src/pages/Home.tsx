import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { BrowseChannels } from '../components/BrowseChannels'
import { PulseShelf } from '../components/PulseShelf'
import { JumpRightIn } from '../components/discover/JumpRightIn'
import { ContinueListeningCard } from '../components/home/ContinueListeningCard'
import { MOCK_HOME_FEED } from '../components/home/homeData'
import { BrieflyLogo } from '../components/onboarding/BrieflyLogo'
import { AccountMenuButton } from '../components/home/AccountMenuButton'
import { ThemeIndicator } from '../components/ui/ThemeIndicator'
import { categories, pulseEpisodes } from '../data/homeData'
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
  const feed = MOCK_HOME_FEED
  const hasContinue = feed.continueListening.length > 0
  const chipsRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const el = chipsRef.current
    if (!el) return

    const syncChipHeight = () => {
      document.documentElement.style.setProperty(
        '--home-chips-height',
        `${el.offsetHeight}px`,
      )
    }

    syncChipHeight()
    const observer = new ResizeObserver(syncChipHeight)
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="discover home-page">
      <div className="discover__viewport">
        <motion.div
          ref={chipsRef}
          layout
          className="home-explore-channels-sticky"
          initial={prefersReducedMotion ? false : { y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <BrowseChannels categories={categories} />
        </motion.div>

        <header className="discover__header home-sticky-header">
          <div className="discover__brand" aria-label="Briefly">
            <BrieflyLogo />
          </div>
          <div className="discover__actions home-header-actions">
            <ThemeIndicator />
            <AccountMenuButton />
          </div>
        </header>

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
