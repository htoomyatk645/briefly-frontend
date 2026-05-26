import './feedCardAmbient.css'

const BAR_DURATIONS_MS = [900, 700, 1100, 800, 950] as const

type FeedCardWaveformProps = {
  active?: boolean
}

export const FeedCardWaveform = ({ active = false }: FeedCardWaveformProps) => (
  <span
    className={`feed-card-waveform${active ? ' feed-card-waveform--active' : ''}`}
    aria-hidden
  >
    {BAR_DURATIONS_MS.map((duration) => (
      <span
        key={duration}
        className="feed-card-waveform__bar"
        style={{ ['--feed-wave-duration' as string]: `${duration}ms` }}
      />
    ))}
  </span>
)
