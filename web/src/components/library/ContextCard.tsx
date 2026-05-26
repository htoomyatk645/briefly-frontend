import type { EpisodeContext } from '../feed/episodeContextData'

export type ContextCardProps = {
  context: EpisodeContext
  onOpen: (context: EpisodeContext) => void
}

export default function ContextCard({ context, onOpen }: ContextCardProps) {
  const referencePreview = context.references[0]?.label ?? 'References inside'

  return (
    <article className="context-card">
      <button
        type="button"
        className="context-card__hit"
        onClick={() => onOpen(context)}
        aria-label={`Open context for ${context.episodeTitle}`}
      >
        <span className="context-card__eyebrow">{context.showName}</span>
        <h3 className="context-card__title">{context.episodeTitle}</h3>
        <p className="context-card__teaser">{context.showContext}</p>
        <span className="context-card__meta">{referencePreview}</span>
      </button>
    </article>
  )
}
