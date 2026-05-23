import { TypewriterText } from './TypewriterText'
import { TOPIC_OPTIONS } from './types'

type InterestsScreenProps = {
  firstName: string
  selectedTopics: string[]
  onToggleTopic: (topicId: string) => void
  onContinue: () => void
}

const MIN_TOPICS = 3

export const InterestsScreen = ({
  firstName,
  selectedTopics,
  onToggleTopic,
  onContinue,
}: InterestsScreenProps) => {
  const displayName = firstName.trim() || 'there'
  const greeting = `Nice to meet you ${displayName}. Let's see your feed with your interests!`
  const canContinue = selectedTopics.length >= MIN_TOPICS

  return (
    <section
      className="interests-screen interests-screen--shelled"
      aria-label="Choose your interests"
    >
      <div className="interests-screen__body">
        <TypewriterText
          as="h2"
          className="interests-screen__title"
          text={greeting}
        />

        <div className="topics-panel">
          <div className="topics-panel__header">
            <h3 className="topics-panel__title">Topics of interest</h3>
            <p className="topics-panel__hint">
              Choose at least {MIN_TOPICS} to continue ({selectedTopics.length}/
              {MIN_TOPICS})
            </p>
          </div>

          <div className="topics-grid" role="group" aria-label="Topics of interest">
            {TOPIC_OPTIONS.map((topic) => {
              const isSelected = selectedTopics.includes(topic.id)

              return (
                <button
                  key={topic.id}
                  type="button"
                  className={`topic-chip${isSelected ? ' topic-chip--selected' : ''}`}
                  aria-pressed={isSelected}
                  onClick={() => onToggleTopic(topic.id)}
                >
                  <span className="topic-chip__check" aria-hidden>
                    {isSelected ? '✓' : ''}
                  </span>
                  <span className="topic-chip__emoji" aria-hidden>
                    {topic.emoji}
                  </span>
                  <span className="topic-chip__label">{topic.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="interests-screen__footer">
        <button
          type="button"
          className="btn-pill-primary"
          disabled={!canContinue}
          onClick={onContinue}
        >
          Continue to personalize the feed
        </button>
      </div>
    </section>
  )
}
