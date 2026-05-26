import { Route, Routes } from 'react-router-dom'
import { LibraryLayout } from './LibraryLayout'
import { Library } from './Library'
import SavedAll from './SavedAll'
import ShopAll from './ShopAll'
import ShowProfile from './ShowProfile'
import type { ClipMoment } from '../components/library/savedClipsTypes'

export type LibraryRoutesProps = {
  onOpenFeed: () => void
  onPlaySavedClip: (moment: ClipMoment) => void
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
        <Route path="shop" element={<ShopAll />} />
        <Route path="shows/:showId" element={<ShowProfile />} />
        <Route path="tune" element={<LibraryTuneRoute />} />
      </Route>
    </Routes>
  )
}
