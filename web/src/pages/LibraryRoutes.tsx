import { useEffect, useRef } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { LibraryLayout } from './LibraryLayout'
import { Library } from './Library'

export type LibraryRoutesProps = {
  onOpenFeed: () => void
}

type LibraryRoutePlaceholderProps = {
  title: string
  description: string
}

function LibraryRoutePlaceholder({ title, description }: LibraryRoutePlaceholderProps) {
  const navigate = useNavigate()
  const backRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    backRef.current?.focus()
  }, [])

  return (
    <div className="library-route-placeholder">
      <button
        ref={backRef}
        type="button"
        className="library-route-placeholder__back"
        onClick={() => navigate('/library')}
        aria-label="Back to Library"
      >
        Back to Library
      </button>
      <h2 className="library-route-placeholder__title">{title}</h2>
      <p className="library-route-placeholder__copy">{description}</p>
    </div>
  )
}

function LibrarySavedRoute() {
  return (
    <LibraryRoutePlaceholder
      title="Saved clips"
      description="Full saved-clips grid arrives in a later prompt."
    />
  )
}

function LibraryShowRoute() {
  const { showId } = useParams<{ showId: string }>()

  return (
    <LibraryRoutePlaceholder
      title="Show profile"
      description={`Profile for ${showId ?? 'this show'} arrives in a later prompt.`}
    />
  )
}

function LibraryTuneRoute() {
  return (
    <LibraryRoutePlaceholder
      title="Tune your feed"
      description="Feed tuning surface arrives in a later prompt."
    />
  )
}

export function LibraryRoutes({ onOpenFeed }: LibraryRoutesProps) {
  return (
    <Routes>
      <Route path="/library" element={<LibraryLayout onOpenFeed={onOpenFeed} />}>
        <Route index element={<Library />} />
        <Route path="saved" element={<LibrarySavedRoute />} />
        <Route path="shows/:showId" element={<LibraryShowRoute />} />
        <Route path="tune" element={<LibraryTuneRoute />} />
      </Route>
    </Routes>
  )
}
