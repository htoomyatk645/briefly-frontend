import { Route, Routes } from 'react-router-dom'
import { LibraryLayout } from './LibraryLayout'
import { Library } from './Library'
import SavedAll from './SavedAll'
import ContextAll from './ContextAll'
import ReadingAll from './ReadingAll'
import ShopAll from './ShopAll'
import ShowProfile from './ShowProfile'
import TuneFeed from './TuneFeed'
import type { ClipMoment } from '../components/library/savedClipsTypes'

export type LibraryRoutesProps = {
  onOpenFeed: () => void
  onPlaySavedClip: (moment: ClipMoment) => void
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
        <Route path="reading" element={<ReadingAll />} />
        <Route path="context" element={<ContextAll />} />
        <Route path="shows/:showId" element={<ShowProfile />} />
        <Route path="tune" element={<TuneFeed />} />
      </Route>
    </Routes>
  )
}
