import { BottomSheet, useBodyScrollLock } from '../feed/player/BottomSheet'
import type { MentionedResource } from './libraryReadingData'

export type ResourceDetailSheetProps = {
  resource: MentionedResource | null
  open: boolean
  onClose: () => void
}

export function ResourceDetailSheet({ resource, open, onClose }: ResourceDetailSheetProps) {
  useBodyScrollLock(open)

  return (
    <BottomSheet open={open} title={resource?.title ?? 'Article'} onClose={onClose}>
      {resource ? (
        <div className="reading-detail-sheet">
          <div className="reading-detail-sheet__resource-head">
            <div className="reading-detail-sheet__favicon-wrap">
              {resource.faviconUrl ? (
                <img src={resource.faviconUrl} alt="" className="reading-detail-sheet__favicon" />
              ) : (
                <div className="reading-detail-sheet__favicon reading-detail-sheet__favicon--placeholder" />
              )}
            </div>
            <div>
              <p className="reading-detail-sheet__source">{resource.domain}</p>
            </div>
          </div>

          <p className="reading-detail-sheet__snippet">{resource.snippet}</p>

          <p className="reading-detail-sheet__meta">
            Cited on <strong>{resource.showName}</strong>
          </p>

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="reading-detail-sheet__cta"
          >
            Read
          </a>
        </div>
      ) : null}
    </BottomSheet>
  )
}
