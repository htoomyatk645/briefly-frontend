import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSavedClipsContext } from './SavedClipsContext'
import BookCard from './BookCard'
import { BookDetailSheet } from './BookDetailSheet'
import { LibrarySection } from './LibrarySection'
import { LibrarySectionReveal } from './LibrarySectionReveal'
import { MentionPreview } from './MentionPreview'
import ResourceCard from './ResourceCard'
import { ResourceDetailSheet } from './ResourceDetailSheet'
import { IconBookOpen } from './icons'
import {
  MENTIONED_READING,
  READING_RAIL_LIMIT,
  type MentionedBook,
  type MentionedReadingItem,
  type MentionedResource,
} from './libraryReadingData'
import { MentionPreviewAudioEngine } from './mentionPreviewAudio'
import { SkeletonShimmer } from './SkeletonShimmer'
import './mentionedReading.css'

export type MentionedReadingProps = {
  layout?: 'rail' | 'grid'
  showSectionHead?: boolean
}

function isBook(item: MentionedReadingItem): item is MentionedBook {
  return item.kind === 'book'
}

export default function MentionedReading({
  layout = 'rail',
  showSectionHead = true,
}: MentionedReadingProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef(new MentionPreviewAudioEngine())
  const { playMoment } = useSavedClipsContext()

  const [isLoading, setIsLoading] = useState(true)
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null)
  const [previewPlayback, setPreviewPlayback] = useState<
    Awaited<ReturnType<MentionPreviewAudioEngine['play']>> | null
  >(null)
  const [detailBook, setDetailBook] = useState<MentionedBook | null>(null)
  const [detailResource, setDetailResource] = useState<MentionedResource | null>(null)

  const items = MENTIONED_READING
  const railItems = items.slice(0, READING_RAIL_LIMIT)
  const isEmpty = !isLoading && items.length === 0
  const listItems = layout === 'rail' ? railItems : items
  const activeItem = items.find((item) => item.id === activePreviewId)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    return () => {
      audioRef.current.dispose()
    }
  }, [])

  const closePreview = useCallback(async () => {
    await audioRef.current.stop()
    setActivePreviewId(null)
    setPreviewPlayback(null)
  }, [])

  useEffect(() => {
    if (!activePreviewId) return

    const handleScroll = () => {
      void closePreview()
    }

    const rail = scrollRef.current
    rail?.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      rail?.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activePreviewId, closePreview])

  const handleHearMention = useCallback(
    async (item: MentionedReadingItem) => {
      if (activePreviewId === item.id) {
        await closePreview()
        return
      }

      await closePreview()
      const playback = await audioRef.current.play(
        item.id,
        item.episodeId,
        item.mentionOffsetSeconds,
      )
      setActivePreviewId(item.id)
      setPreviewPlayback(playback)
    },
    [activePreviewId, closePreview],
  )

  const handleOpenClip = useCallback(() => {
    if (!activeItem) return
    void closePreview()
    playMoment({
      episodeId: activeItem.episodeId,
      seekSeconds: Math.max(0, activeItem.mentionOffsetSeconds - 4),
    })
  }, [activeItem, closePreview, playMoment])

  const handleHeardInEpisode = useCallback(() => {
    if (!detailBook) return
    setDetailBook(null)
    playMoment({
      episodeId: detailBook.episodeId,
      seekSeconds: Math.max(0, detailBook.mentionOffsetSeconds - 4),
    })
  }, [detailBook, playMoment])

  const renderPreview = (item: MentionedReadingItem) => (
    <AnimatePresence>
      {activePreviewId === item.id && previewPlayback ? (
        <div className="mention-preview-wrap">
          <MentionPreview
            mentionLabel={item.title}
            hostName={item.hostName}
            episodeTitle={item.episodeTitle}
            playback={previewPlayback}
            onClose={() => void closePreview()}
            onOpenClip={handleOpenClip}
          />
        </div>
      ) : null}
    </AnimatePresence>
  )

  const renderCard = (item: MentionedReadingItem) => {
    const itemClass =
      layout === 'rail'
        ? `reading-rail__item reading-rail__item--${item.kind}`
        : `reading-grid__item reading-grid__item--${item.kind}`

    if (isBook(item)) {
      return (
        <div key={item.id} role="listitem" className={itemClass}>
          <BookCard
            book={item}
            isPreviewOpen={activePreviewId === item.id}
            onOpenDetail={setDetailBook}
            onHearMention={handleHearMention}
          />
          {renderPreview(item)}
        </div>
      )
    }

    return (
      <div key={item.id} role="listitem" className={itemClass}>
        <ResourceCard
          resource={item}
          isPreviewOpen={activePreviewId === item.id}
          onOpenDetail={setDetailResource}
          onHearMention={handleHearMention}
        />
        {renderPreview(item)}
      </div>
    )
  }

  const content = isLoading ? (
    <div
      className={`reading-rail reading-rail--loading${layout === 'grid' ? ' reading-grid--loading' : ''}`}
      role="presentation"
    >
      <SkeletonShimmer className="book-card__skeleton" />
      <SkeletonShimmer className="book-card__skeleton" />
      <SkeletonShimmer className="resource-card__skeleton" />
    </div>
  ) : isEmpty ? (
    <div className="reading-empty" role="status">
      <IconBookOpen />
      <p className="reading-empty__title">
        Books and articles cited in clips will collect here.
      </p>
      <p className="reading-empty__caption">
        Once you&apos;ve listened to a few clips, this shelf will fill up.
      </p>
    </div>
  ) : (
    <div
      ref={scrollRef}
      className={layout === 'rail' ? 'reading-rail library-rail' : 'reading-grid'}
      role="list"
      aria-label="Books and articles mentioned in clips"
    >
      {listItems.map((item) => renderCard(item))}
    </div>
  )

  const section = (
    <>
      {content}
      <BookDetailSheet
        book={detailBook}
        open={detailBook != null}
        onClose={() => setDetailBook(null)}
        onHeardInEpisode={handleHeardInEpisode}
      />
      <ResourceDetailSheet
        resource={detailResource}
        open={detailResource != null}
        onClose={() => setDetailResource(null)}
      />
    </>
  )

  if (!showSectionHead) {
    return <div className="mentioned-reading mentioned-reading--embedded">{section}</div>
  }

  return (
    <LibrarySectionReveal>
      <LibrarySection
        id="worth-a-read"
        title="Worth a read"
        subtitle="Books and links cited in your listened clips."
        seeAllHref={items.length > 0 ? '/library/reading' : undefined}
      >
        {section}
      </LibrarySection>
    </LibrarySectionReveal>
  )
}
