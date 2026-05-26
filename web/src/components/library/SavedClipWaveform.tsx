import './savedClipCard.css'

const BAR_DELAYS_MS = [0, 120, 240, 80, 200] as const

type SavedClipWaveformProps = {
  active?: boolean
}

export function SavedClipWaveform({ active = false }: SavedClipWaveformProps) {
  return (
    <span
      className={`saved-clip-waveform${active ? ' saved-clip-waveform--active' : ''}`}
      aria-hidden
    >
      {BAR_DELAYS_MS.map((delay) => (
        <span
          key={delay}
          className="saved-clip-waveform__bar"
          style={{ ['--saved-wave-delay' as string]: `${delay}ms` }}
        />
      ))}
    </span>
  )
}
