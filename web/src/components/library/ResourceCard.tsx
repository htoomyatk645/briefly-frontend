import type { MentionedResource } from './libraryReadingData'
import { ReadingMentionFooter } from './ReadingMentionFooter'

export type ResourceCardProps = {
  resource: MentionedResource
  isPreviewOpen?: boolean
  onOpenDetail: (resource: MentionedResource) => void
  onHearMention: (resource: MentionedResource) => void
}

export default function ResourceCard({
  resource,
  isPreviewOpen = false,
  onOpenDetail,
  onHearMention,
}: ResourceCardProps) {
  return (
    <article className={`resource-card${isPreviewOpen ? ' resource-card--preview-open' : ''}`}>
      <button
        type="button"
        className="resource-card__hit"
        onClick={() => onOpenDetail(resource)}
        aria-label={`View ${resource.title} on ${resource.domain}`}
      >
        <div className="resource-card__main">
          <div className="resource-card__favicon-wrap">
            {resource.faviconUrl ? (
              <img src={resource.faviconUrl} alt="" className="resource-card__favicon" />
            ) : (
              <div className="resource-card__favicon resource-card__favicon--placeholder" aria-hidden />
            )}
          </div>
          <div className="resource-card__copy">
            <h3 className="resource-card__title">{resource.title}</h3>
            <p className="resource-card__domain">{resource.domain}</p>
          </div>
        </div>
      </button>
      <ReadingMentionFooter
        hostLabel={`Mentioned by ${resource.hostFirstName}`}
        isPreviewOpen={isPreviewOpen}
        onHearMention={() => onHearMention(resource)}
      />
    </article>
  )
}
