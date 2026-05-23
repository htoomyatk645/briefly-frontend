import { BottomSheet } from './BottomSheet'

const MOCK_TRANSCRIPT = `Welcome back to the show. Today we're discussing sleep architecture and how light exposure shapes your circadian rhythm.

When you wake at the same time each day, you anchor your cortisol pulse. That single habit often matters more than any supplement.

Magnesium threonate was mentioned as one option some listeners use before bed — not a prescription, just a tool worth understanding with your physician.

Let's talk about temperature next. Your core body temperature must drop slightly to initiate deep sleep...`

type TranscriptSheetProps = {
  open: boolean
  episodeTitle: string
  onClose: () => void
}

export const TranscriptSheet = ({ open, episodeTitle, onClose }: TranscriptSheetProps) => (
  <BottomSheet open={open} title="Transcript" onClose={onClose}>
    <p className="player-sheet__subtitle">{episodeTitle}</p>
    <div className="player-transcript">
      {MOCK_TRANSCRIPT.split('\n\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  </BottomSheet>
)
