import { Route, Routes } from 'react-router-dom'
import { SearchGate } from './SearchGate'

export type SearchRoutesProps = {
  onPlayClip: (episodeId: string, seekSeconds?: number) => void
}

export function SearchRoutes({ onPlayClip }: SearchRoutesProps) {
  return (
    <Routes>
      <Route path="/search" element={<SearchGate onPlayClip={onPlayClip} />} />
    </Routes>
  )
}
