import { Route, Routes } from 'react-router-dom'
import { Search } from './Search'

export function SearchRoutes() {
  return (
    <Routes>
      <Route path="/search" element={<Search />} />
    </Routes>
  )
}
