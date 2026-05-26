import type { CSSProperties } from 'react'

export type LibraryEmptyStateProps = {
  onOpenFeed: () => void
}

export function LibraryEmptyState({ onOpenFeed }: LibraryEmptyStateProps) {
  const surfaceStyle = {
    '--library-tab-surface': 'hsl(var(--surface-base-hsl) / 0.98)',
  } as CSSProperties

  return (
    <div className="library-page library-empty-wrap" style={surfaceStyle}>
      <div className="library-empty" role="status">
      <h2 className="library-empty__title">Nothing&apos;s washed up yet.</h2>
      <p className="library-empty__body">
        Save your first clip from the feed — it&apos;ll wait for you here.
      </p>
      <button type="button" className="library-empty__cta" onClick={onOpenFeed}>
        Open the feed
      </button>
      </div>
    </div>
  )
}
