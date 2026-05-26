import { useEffect, useRef, type CSSProperties } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {
  LibraryEmptyState,
  LibraryPageSkeleton,
  SavedClipsProvider,
  useLibraryPageState,
} from '../components/library'
import type { ClipMoment } from '../components/library/savedClipsTypes'
import '../components/library/library.css'

export type LibraryLayoutProps = {
  onOpenFeed: () => void
  onPlaySavedClip: (moment: ClipMoment) => void
}

export function LibraryLayout({ onOpenFeed, onPlaySavedClip }: LibraryLayoutProps) {
  const status = useLibraryPageState()
  const location = useLocation()
  const introRef = useRef<HTMLDivElement>(null)
  const isLibraryIndex =
    location.pathname === '/library' || location.pathname === '/library/'

  useEffect(() => {
    if (isLibraryIndex) {
      introRef.current?.focus()
    }
  }, [isLibraryIndex])

  if (status === 'loading') {
    return <LibraryPageSkeleton />
  }

  if (status === 'empty') {
    return <LibraryEmptyState onOpenFeed={onOpenFeed} />
  }

  const surfaceStyle = {
    '--library-tab-surface': 'hsl(var(--surface-base-hsl) / 0.98)',
  } as CSSProperties

  return (
    <SavedClipsProvider onPlayClip={onPlaySavedClip}>
      {isLibraryIndex ? (
        <div className="library-page" style={surfaceStyle}>
          <header className="library-page__intro" ref={introRef} tabIndex={-1}>
            <h1 className="library-page__title">Library</h1>
            <p className="library-page__subtitle">The shoreline of your listening.</p>
          </header>
          <Outlet />
        </div>
      ) : (
        <div className="library-page library-page--nested" style={surfaceStyle}>
          <Outlet />
        </div>
      )}
    </SavedClipsProvider>
  )
}
