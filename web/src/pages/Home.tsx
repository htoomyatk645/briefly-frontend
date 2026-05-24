import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { BrowseChannels } from '../components/BrowseChannels'
import { PulseShelf } from '../components/PulseShelf'
import { TheEdit } from '../components/TheEdit'
import { JumpRightIn } from '../components/discover/JumpRightIn'
import { AccountMenuButton } from '../components/home/AccountMenuButton'
import { ContinueListeningSection } from '../components/home/ContinueListeningCard'
import { EpisodeFeedItem } from '../components/home/EpisodeFeedItem'
import { FeaturedEpisodeCard } from '../components/home/FeaturedEpisodeCard'
import { MOCK_HOME_FEED } from '../components/home/homeData'
import { NewEpisodeFeedItem } from '../components/home/NewEpisodeFeedItem'
import { SectionReveal } from '../components/motion/SectionReveal'
import { BrieflyLogo } from '../components/onboarding/BrieflyLogo'
import { ThemeIndicator } from '../components/ui/ThemeIndicator'
import {
  continueListeningEpisodes,
  editorialPick,
  pulseEpisodes,
} from '../data/homeData'
import { categories } from '../data/discoverData'
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

        <SectionReveal id="for-you-today">
          <section className="home-section" aria-labelledby="for-you-heading">
            <div className="home-section__head">
              <h2 id="for-you-heading" className="home-section__title">
                For you today
              </h2>
              <p className="home-section__subtitle">
                Hand-picked highlights based on your tastes.
              </p>
            </div>

            <FeaturedEpisodeCard episode={feed.featured} onPlay={onTileSelect} />

            <div className="home-feed-list" role="list">
              {feed.recommendations.map((episode) => (
                <EpisodeFeedItem
                  key={episode.id}
                  episode={episode}
                  onPress={onTileSelect}
                />
              ))}
            </div>
          </section>
        </SectionReveal>

        <SectionReveal id="new-episodes">
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
                  onPress={onTileSelect}
                />
              ))}
            </div>
          </section>
        </SectionReveal>
      </div>
    </div>
  )
}
