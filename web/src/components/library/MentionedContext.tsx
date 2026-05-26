import { useEffect, useState } from 'react'
import {
  CONTEXT_RAIL_LIMIT,
  getAllEpisodeContexts,
  type EpisodeContext,
} from '../feed/episodeContextData'
import ContextCard from './ContextCard'
import { ContextDetailSheet } from './ContextDetailSheet'
import { LibrarySection } from './LibrarySection'
import { LibrarySectionReveal } from './LibrarySectionReveal'
import { SkeletonShimmer } from './SkeletonShimmer'
import './mentionedContext.css'

export type MentionedContextProps = {
  layout?: 'rail' | 'grid'
  showSectionHead?: boolean
}

export default function MentionedContext({
  layout = 'rail',
  showSectionHead = true,
}: MentionedContextProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [detailContext, setDetailContext] = useState<EpisodeContext | null>(null)

  const contexts = getAllEpisodeContexts()
  const railContexts = contexts.slice(0, CONTEXT_RAIL_LIMIT)
  const isEmpty = !isLoading && contexts.length === 0
  const listContexts = layout === 'rail' ? railContexts : contexts

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false))
    return () => cancelAnimationFrame(frame)
  }, [])

  const section = (
  <>
      {isLoading ? (
        <div className={layout === 'rail' ? 'library-rail context-rail' : 'context-grid'}>
          {Array.from({ length: layout === 'rail' ? 3 : 4 }, (_, index) => (
            <SkeletonShimmer
              key={index}
              className={layout === 'rail' ? 'context-rail__skeleton' : 'context-grid__skeleton'}
            />
          ))}
        </div>
      ) : isEmpty ? (
        <p className="context-empty">Context from your episodes will appear here.</p>
      ) : (
        <div className={layout === 'rail' ? 'library-rail context-rail' : 'context-grid'}>
          {listContexts.map((context) => (
            <div
              key={context.episodeId}
              className={layout === 'rail' ? 'context-rail__item' : 'context-grid__item'}
            >
              <ContextCard context={context} onOpen={setDetailContext} />
            </div>
          ))}
        </div>
      )}

      <ContextDetailSheet
        context={detailContext}
        open={Boolean(detailContext)}
        onClose={() => setDetailContext(null)}
      />
    </>
  )

  if (!showSectionHead) {
    return section
  }

  return (
    <LibrarySectionReveal>
      <LibrarySection
        id="context"
        title="Context"
        subtitle="Show background, speakers, and references from your clips."
        seeAllHref={contexts.length > 0 ? '/library/context' : undefined}
      >
        {section}
      </LibrarySection>
    </LibrarySectionReveal>
  )
}
