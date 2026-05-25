import { motion, useReducedMotion } from 'framer-motion'
import { useId, useState, type ChangeEvent, type CSSProperties } from 'react'
import { AnimatedNumber } from '../motion/AnimatedNumber'
import { transition } from '../../styles/motion'
import type { FeedEpisode } from './feedData'
import { feedAssetsRemote } from './feedAssets'
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
import { useCoverCardBackground } from './useCoverGradient'
import { formatRemaining, formatTime } from './usePlayback'

const ACCENT_WARM = '#FF6640'

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
  onShowPage?: (showId: string) => void
}

const PlayIcon = () => (
  <svg className="player-card__play-icon" viewBox="0 0 24 24" aria-hidden>
    <path d="M8 5.5v13l10.5-6.5L8 5.5z" fill={ACCENT_WARM} />
  </svg>
)

const PauseIcon = () => (
  <svg className="player-card__play-icon" viewBox="0 0 24 24" aria-hidden>
    <path d="M7 6h3.5v12H7V6zm6.5 0H17v12h-3.5V6z" fill={ACCENT_WARM} />
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
  onPrev,
  onNext,
  onSetSpeed,
  onToggleSaved,
  onToggleFollow,
  onMoreAction,
  onShowPage,
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

  const playerStyle = {
    '--player-cover-tint': coverTint,
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
            {prefersReducedMotion ? (
              <div className="player-card__art-frame">
                {artwork}
                {hasProducts ? (
                  <button
                    type="button"
                    className="player-card__shop-badge"
                    aria-label="Products mentioned in episode"
                    onClick={() => setShopOpen(true)}
                  >
                    <img src={feedAssetsRemote.actions.bag} alt="" />
                  </button>
                ) : null}
              </div>
            ) : (
              <motion.div
                layoutId={`player-artwork-${episode.id}`}
                className="player-card__art-frame"
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                {artwork}
                {hasProducts ? (
                  <button
                    type="button"
                    className="player-card__shop-badge"
                    aria-label="Products mentioned in episode"
                    onClick={() => setShopOpen(true)}
                  >
                    <img src={feedAssetsRemote.actions.bag} alt="" />
                  </button>
                ) : null}
              </motion.div>
            )}

            <header className="player-card__toolbar" role="toolbar" aria-label="Player actions">
              <button
                type="button"
                className={`player-card__toolbar-btn${saved ? ' player-card__toolbar-btn--saved' : ''}`}
                onClick={handleSave}
                aria-label={saved ? 'Remove from saved' : 'Save episode'}
                aria-pressed={saved}
              >
                <img
                  src={feedAssetsRemote.actions.bookmark}
                  alt=""
                  className={`player-card__bookmark-icon${saved ? ' player-card__bookmark-icon--filled' : ''}${saveAnim ? ' player-card__bookmark-icon--spring' : ''}`}
                />
              </button>
              <button
                type="button"
                className="player-card__toolbar-btn"
                onClick={() => setSpeedOpen(true)}
                aria-label={`Playback speed ${playbackRate}x`}
                aria-haspopup="menu"
                aria-expanded={speedOpen}
              >
                <img src={feedAssetsRemote.actions.speed} alt="" />
              </button>
              <button
                type="button"
                className="player-card__toolbar-btn"
                aria-label="Choose audio output"
                onClick={() => setOutputOpen(true)}
              >
                <img src={feedAssetsRemote.actions.airpods} alt="" />
              </button>
              <button
                type="button"
                className="player-card__toolbar-btn"
                aria-label="More options"
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen(true)}
              >
                <img src={feedAssetsRemote.actions.more} alt="" />
              </button>
            </header>
          </div>

          <div className="player-card__meta">
            <button
              type="button"
              className="player-card__source"
              aria-label={`Show: ${episode.showName}`}
              onClick={() => onShowPage?.(episode.showId)}
            >
              <span className="player-card__source-text">{episode.showName.toUpperCase()}</span>
            </button>
            <h2 className="player-card__title">{episode.episodeTitle}</h2>
          </div>

          <div className="player-card__lower">
            <div className="player-card__controls" role="group" aria-label="Playback controls">
              <button
                type="button"
                className="player-card__ctrl player-card__ctrl--track"
                onClick={onPrev}
                aria-label="Previous episode"
              >
                <img src={feedAssetsRemote.controls.skipStart} alt="" />
              </button>
              <button
                type="button"
                className="player-card__ctrl player-card__ctrl--skip"
                onClick={onRewind15}
                aria-label="Rewind 15 seconds"
              >
                <img src={feedAssetsRemote.controls.rewind15} alt="" />
              </button>
              <button
                type="button"
                className={`player-card__ctrl player-card__ctrl--play${playPulse ? ' player-card__ctrl--play--pulse' : ''}`}
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
                <img src={feedAssetsRemote.controls.forward30} alt="" />
              </button>
              <button
                type="button"
                className="player-card__ctrl player-card__ctrl--track"
                onClick={onNext}
                aria-label="Next episode"
              >
                <img src={feedAssetsRemote.controls.skipEnd} alt="" />
              </button>
            </div>

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
