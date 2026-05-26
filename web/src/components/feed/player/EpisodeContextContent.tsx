import type { EpisodeContext } from '../episodeContextData'

export type EpisodeContextContentProps = {
  context: EpisodeContext
}

export function EpisodeContextContent({ context }: EpisodeContextContentProps) {
  return (
    <div className="episode-context">
      <p className="player-sheet__subtitle">{context.episodeTitle}</p>

      <section className="episode-context__section" aria-labelledby="episode-context-show">
        <h4 id="episode-context-show" className="episode-context__heading">
          Show
        </h4>
        <p className="episode-context__body">{context.showContext}</p>
      </section>

      <section className="episode-context__section" aria-labelledby="episode-context-speakers">
        <h4 id="episode-context-speakers" className="episode-context__heading">
          Speakers
        </h4>
        <ul className="episode-context__list">
          {context.speakers.map((speaker) => (
            <li key={speaker.id} className="episode-context__speaker">
              <p className="episode-context__speaker-name">{speaker.name}</p>
              <p className="episode-context__speaker-role">{speaker.role}</p>
              <p className="episode-context__body">{speaker.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="episode-context__section" aria-labelledby="episode-context-refs">
        <h4 id="episode-context-refs" className="episode-context__heading">
          References mentioned
        </h4>
        <ul className="episode-context__list">
          {context.references.map((reference) => (
            <li key={reference.id} className="episode-context__reference">
              <p className="episode-context__reference-label">{reference.label}</p>
              <p className="episode-context__body">{reference.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
