import { motion, useReducedMotion } from 'framer-motion'
import { useId, useState, type ChangeEvent, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { markShowProfileOpenedFromFeed } from '../library/useShowProfileBack'
import { AnimatedNumber } from '../motion/AnimatedNumber'
import { transition } from '../../styles/motion'
import type { FeedEpisode } from './feedData'
import { feedAssets } from './feedAssets'
import { AudioOutputSheet } from './player/AudioOutputSheet'
import { useBodyScrollLock } from './player/BottomSheet'
import { getProductsForEpisode, MOCK_OUTPUTS } from './player/playerMocks'
import type { MoreMenuAction } from './player/MoreMenu'
import { MoreMenu } from './player/MoreMenu'
import { SpeedPicker } from './player/SpeedPicker'
import { ShopSheet } from './player/ShopSheet'
import { TranscriptSheet } from './player/TranscriptSheet'
import type { PlaybackSpeed } from './player/playerStorage'
import './player/player-interactions.css'
import { useCoverCardBackground, useCoverGradient, useCoverThemeAccent } from './useCoverGradient'
import { formatRemaining, formatTime } from './usePlayback'

type PlayerCardProps = {
  episode: FeedEpisode
  isPlaying: boolean
  currentTime: number
  duration: number
  progress: number
  playbackRate: PlaybackSpeed
  saved: boolean
  following: boolean
  onTogglePlay: () => void
  onSeek: (seconds: number) => void
  onRewind15: () => void
  onForward30: () => void
  onPrev: () => void
  onNext: () => void
  onSetSpeed: (speed: PlaybackSpeed) => void
  onToggleSaved: () => void
  onToggleFollow: () => void
  onMoreAction: (action: MoreMenuAction) => void
}

const PlayIcon = () => (
  <svg className="player-card__play-icon player-card__play-icon--hero" viewBox="0 0 24 24" aria-hidden>
    <path d="M8 5.5v13l10.5-6.5L8 5.5z" fill="currentColor" />
  </svg>
)

const PauseIcon = () => (
  <svg className="player-card__play-icon player-card__play-icon--hero" viewBox="0 0 24 24" aria-hidden>
    <path d="M7 6h3.5v12H7V6zm6.5 0H17v12h-3.5V6z" fill="currentColor" />
  </svg>
)

const SourceFollowPlusIcon = () => (
  <svg className="player-card__source-follow-icon" viewBox="0 0 16 16" aria-hidden>
    <path
      d="M8 3.5v9M3.5 8h9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

const SourceFollowCheckIcon = () => (
  <svg className="player-card__source-follow-icon" viewBox="0 0 16 16" aria-hidden>
    <path
      d="M4 8.5 6.5 11 12 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const PlayerCard = ({
  episode,
  isPlaying,
  currentTime,
  duration,
  progress,
  playbackRate,
  saved,
  following,
  onTogglePlay,
  onSeek,
  onRewind15,
  onForward30,
  onPrev: _onPrev,
  onNext: _onNext,
  onSetSpeed,
  onToggleSaved,
  onToggleFollow,
  onMoreAction,
}: PlayerCardProps) => {
  const prefersReducedMotion = useReducedMotion()
  const progressId = useId()
  const [playPulse, setPlayPulse] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [speedOpen, setSpeedOpen] = useState(false)
  const [outputOpen, setOutputOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [activeOutputId, setActiveOutputId] = useState('iphone')
  const [saveAnim, setSaveAnim] = useState(false)

  const products = getProductsForEpisode(episode.id)
  const hasProducts = products.length > 0
  const coverTint = useCoverCardBackground(episode.coverSrc)
  const coverGradient = useCoverGradient(episode.coverSrc)
  const themeAccent = useCoverThemeAccent(episode.coverSrc)

  const playerStyle = {
    '--player-cover-tint': coverTint,
    '--player-cover-gradient': coverGradient,
    '--player-theme-accent': themeAccent,
  } as CSSProperties

  const outputIconStyle = {
    WebkitMaskImage: `url(${feedAssets.actions.airpods})`,
    maskImage: `url(${feedAssets.actions.airpods})`,
  } as CSSProperties

  useBodyScrollLock(shopOpen || outputOpen || transcriptOpen)

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSeek((Number(e.target.value) / 100) * duration)
  }

  const handlePlay = () => {
    setPlayPulse(true)
    window.setTimeout(() => setPlayPulse(false), 280)
    onTogglePlay()
  }

  const handleSave = () => {
    setSaveAnim(true)
    window.setTimeout(() => setSaveAnim(false), 420)
    onToggleSaved()
  }

  const handleMore = (action: MoreMenuAction) => {
    if (action === 'follow') {
      onToggleFollow()
      return
    }
    if (action === 'transcript') {
      setTranscriptOpen(true)
      return
    }
    onMoreAction(action)
  }

  const artwork = (
    <img
      src={episode.coverSrc}
      alt={`${episode.showName} artwork`}
      className="player-card__art"
    />
  )

  return (
    <>
      <article
        className="player-card player-card--adaptive"
        style={playerStyle}
        aria-label={`Now playing: ${episode.episodeTitle}`}
      >
        <div className="player-card__grabber" aria-hidden />

        <div className="player-card__body">
          <div className="player-card__hero">
            <div className="player-card__hero-main">
              {prefersReducedMotion ? (
                <div className="player-card__art-frame">
                  {artwork}
                </div>
              ) : (
                <motion.div
                  layoutId={`player-artwork-${episode.id}`}
                  className="player-card__art-frame"
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                >
                  {artwork}
                </motion.div>
              )}

              <div className="player-card__source-row">
                <Link
                  to={`/library/shows/${episode.showId}`}
                  className="player-card__source"
                  aria-label={`Show: ${episode.showName}`}
                  onClick={markShowProfileOpenedFromFeed}
                >
                  <span className="player-card__source-text">{episode.showName.toUpperCase()}</span>
                </Link>
                <button
                  type="button"
                  className={`player-card__source-follow${
                    following ? ' player-card__source-follow--active' : ''
                  }`}
                  onClick={(event) => {
                    event.stopPropagation()
                    onToggleFollow()
                  }}
                  aria-label={following ? `Unfollow ${episode.showName}` : `Follow ${episode.showName}`}
                  aria-pressed={following}
                >
                  {following ? <SourceFollowCheckIcon /> : <SourceFollowPlusIcon />}
                </button>
              </div>
            </div>

            <header className="player-card__toolbar" role="toolbar" aria-label="Player actions">
              <button
                type="button"
                className={`player-card__toolbar-btn${saved ? ' player-card__toolbar-btn--saved' : ''}`}
                onClick={handleSave}
                aria-label={saved ? 'Remove from saved' : 'Save episode'}
                aria-pressed={saved}
              >
                <img
                  src={feedAssets.actions.bookmark}
                  alt=""
                  className={`player-card__bookmark-icon${saved ? ' player-card__bookmark-icon--filled' : ''}${saveAnim ? ' player-card__bookmark-icon--spring' : ''}`}
                />
              </button>
              <button
                type="button"
                className={`player-card__toolbar-btn${hasProducts ? '' : ' player-card__toolbar-btn--inactive'}`}
                aria-label="Products mentioned in episode"
                aria-haspopup="dialog"
                aria-expanded={shopOpen}
                disabled={!hasProducts}
                onClick={() => hasProducts && setShopOpen(true)}
              >
                <img src={feedAssets.actions.bag} alt="" />
              </button>
              <button
                type="button"
                className="player-card__toolbar-btn"
                aria-label="More options"
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen(true)}
              >
                <img src={feedAssets.actions.more} alt="" />
              </button>
            </header>
          </div>

          <div className="player-card__meta">
            <h2 className="player-card__title">{episode.episodeTitle}</h2>
          </div>

          <div className="player-card__lower">
            <div className="player-card__progress">
              <label htmlFor={progressId} className="visually-hidden">
                Playback position
              </label>
              <div className="player-card__progress-track" aria-hidden>
                <motion.div
                  className="player-card__progress-fill"
                  animate={{ width: `${progress * 100}%` }}
                  transition={transition.slow}
                />
              </div>
              <input
                id={progressId}
                type="range"
                className="player-card__slider"
                min={0}
                max={100}
                step={0.1}
                value={progress * 100}
                onChange={handleProgressChange}
                aria-valuenow={currentTime}
                aria-valuetext={`${formatTime(currentTime)}, ${formatRemaining(currentTime, duration)} remaining`}
              />
              <div className="player-card__times">
                <AnimatedNumber value={currentTime} format={formatTime} />
                <AnimatedNumber
                  value={currentTime}
                  format={(t) => formatRemaining(t, duration)}
                />
              </div>
            </div>

            <div className="player-card__controls" role="group" aria-label="Playback controls">
              <button
                type="button"
                className="player-card__ctrl player-card__ctrl--speed"
                onClick={() => setSpeedOpen(true)}
                aria-label={`Playback speed ${playbackRate}x`}
                aria-haspopup="menu"
                aria-expanded={speedOpen}
              >
                {playbackRate}x
              </button>

              <div className="player-card__controls-core">
                <button
                  type="button"
                  className="player-card__ctrl player-card__ctrl--skip"
                  onClick={onRewind15}
                  aria-label="Rewind 15 seconds"
                >
                  <img src={feedAssets.controls.rewind15} alt="" />
                </button>
                <button
                  type="button"
                  className={`player-card__ctrl player-card__ctrl--play${isPlaying ? '' : ' player-card__ctrl--play-ready'}${playPulse ? ' player-card__ctrl--play--pulse' : ''}`}
                  onClick={handlePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button
                  type="button"
                  className="player-card__ctrl player-card__ctrl--skip"
                  onClick={onForward30}
                  aria-label="Forward 30 seconds"
                >
                  <img src={feedAssets.controls.forward30} alt="" />
                </button>
              </div>

              <button
                type="button"
                className="player-card__ctrl player-card__ctrl--output"
                aria-label="Choose audio output"
                onClick={() => setOutputOpen(true)}
              >
                <span className="player-card__output-icon" style={outputIconStyle} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </article>

      <ShopSheet open={shopOpen} products={products} onClose={() => setShopOpen(false)} />
      <SpeedPicker
        open={speedOpen}
        speed={playbackRate}
        onSelect={onSetSpeed}
        onClose={() => setSpeedOpen(false)}
      />
      <AudioOutputSheet
        open={outputOpen}
        episode={episode}
        themeStyle={playerStyle}
        outputs={MOCK_OUTPUTS.map((o) => ({ ...o, active: o.id === activeOutputId }))}
        activeId={activeOutputId}
        onSelect={setActiveOutputId}
        onClose={() => setOutputOpen(false)}
      />
      <MoreMenu
        open={moreOpen}
        following={following}
        onAction={handleMore}
        onClose={() => setMoreOpen(false)}
      />
      <TranscriptSheet
        open={transcriptOpen}
        episodeTitle={episode.episodeTitle}
        onClose={() => setTranscriptOpen(false)}
      />
    </>
  )
}
