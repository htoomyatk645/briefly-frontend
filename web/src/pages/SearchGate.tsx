import { useSearchParams } from 'react-router-dom'
import { Search } from './Search'
import { SearchResults } from '../components/search/SearchResults'

export type SearchGateProps = {
  onPlayClip: (episodeId: string, seekSeconds?: number) => void
}

export function SearchGate({ onPlayClip }: SearchGateProps) {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  if (query.trim().length > 0) {
    return <SearchResults query={query} onPlayClip={onPlayClip} />
  }

  return <Search onPlayClip={onPlayClip} />
}
