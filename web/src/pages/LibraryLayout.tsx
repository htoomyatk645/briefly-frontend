import { useEffect, useRef, type CSSProperties } from 'react'
import { Outlet } from 'react-router-dom'
import {
  LibraryEmptyState,
  LibraryPageSkeleton,
  useLibraryPageState,
} from '../components/library'
import '../components/library/library.css'

export type LibraryLayoutProps = {
  onOpenFeed: () => void
}

export function LibraryLayout({ onOpenFeed }: LibraryLayoutProps) {
  const status = useLibraryPageState()
  const introRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    introRef.current?.focus()
  }, [])

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
    <div className="library-page" style={surfaceStyle}>
      <header className="library-page__intro" ref={introRef} tabIndex={-1}>
        <h1 className="library-page__title">Library</h1>
        <p className="library-page__subtitle">The shoreline of your listening.</p>
      </header>
      <Outlet />
    </div>
  )
}
