import type { AudioOutput } from './playerMocks'
import { BottomSheet } from './BottomSheet'

type AudioOutputSheetProps = {
  open: boolean
  outputs: AudioOutput[]
  activeId: string
  onSelect: (id: string) => void
  onClose: () => void
}

export const AudioOutputSheet = ({
  open,
  outputs,
  activeId,
  onSelect,
  onClose,
}: AudioOutputSheetProps) => (
  <BottomSheet open={open} title="Audio output" onClose={onClose}>
    <ul className="player-output-list" role="listbox" aria-label="Choose output">
      {outputs.map((o) => (
        <li key={o.id}>
          <button
            type="button"
            role="option"
            aria-selected={o.id === activeId}
            className={`player-output-item${o.id === activeId ? ' player-output-item--active' : ''}`}
            onClick={() => {
              onSelect(o.id)
              onClose()
            }}
          >
            <span className="player-output-item__radio" aria-hidden />
            <span>{o.label}</span>
          </button>
        </li>
      ))}
    </ul>
  </BottomSheet>
)
