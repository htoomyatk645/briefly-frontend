import { Route, Routes } from 'react-router-dom'
import { LibraryLayout } from './LibraryLayout'
import { Library } from './Library'
import SavedAll from './SavedAll'
import type { ClipMoment } from '../components/library/savedClipsTypes'

export type LibraryRoutesProps = {
  onOpenFeed: () => void
  onPlaySavedClip: (moment: ClipMoment) => void
}

function LibraryShowRoute() {
  return (
    <div className="library-route-placeholder">
      <h2 className="library-route-placeholder__title">Show profile</h2>
      <p className="library-route-placeholder__copy">
        Show profile arrives in a later prompt.
      </p>
    </div>
  )
}

function LibraryTuneRoute() {
  return (
    <div className="library-route-placeholder">
      <h2 className="library-route-placeholder__title">Tune your feed</h2>
      <p className="library-route-placeholder__copy">
        Feed tuning surface arrives in a later prompt.
      </p>
    </div>
  )
}

export function LibraryRoutes({ onOpenFeed, onPlaySavedClip }: LibraryRoutesProps) {
  return (
    <Routes>
      <Route
        path="/library"
        element={<LibraryLayout onOpenFeed={onOpenFeed} onPlaySavedClip={onPlaySavedClip} />}
      >
        <Route index element={<Library />} />
        <Route path="saved" element={<SavedAll />} />
        <Route path="shows/:showId" element={<LibraryShowRoute />} />
        <Route path="tune" element={<LibraryTuneRoute />} />
      </Route>
    </Routes>
  )
}
