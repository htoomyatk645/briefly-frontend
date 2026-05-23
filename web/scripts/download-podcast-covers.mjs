/**
 * Downloads real podcast cover art from Apple Podcasts into public/feed/covers/
 * Run: node scripts/download-podcast-covers.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'feed', 'covers')

const SHOWS = [
  { file: 'huberman.jpg', search: 'Huberman Lab' },
  { file: 'wsj.jpg', search: 'WSJ Tech News Briefing' },
  { file: 'foreign-affairs.jpg', search: 'The Foreign Affairs Interview' },
  { file: 'jay-shetty.jpg', search: 'On Purpose with Jay Shetty' },
  { file: 'the-daily.jpg', search: 'The Daily' },
  { file: 'acquired.jpg', search: 'Acquired' },
  { file: 'revisionist-history.jpg', search: 'Revisionist History' },
  { file: 'hard-fork.jpg', search: 'Hard Fork' },
  { file: 'how-i-built-this.jpg', search: 'How I Built This' },
  { file: '99-invisible.jpg', search: '99% Invisible' },
  { file: 'ezra-klein.jpg', search: 'The Ezra Klein Show' },
  { file: 'worklife.jpg', search: 'WorkLife with Adam Grant' },
  { file: 'decoder.jpg', search: 'Decoder' },
  { file: 'radiolab.jpg', search: 'Radiolab' },
  { file: 'planet-money.jpg', search: 'Planet Money' },
  { file: 'fresh-air.jpg', search: 'Fresh Air' },
  { file: 'smartless.jpg', search: 'SmartLess' },
  { file: 'rest-is-history.jpg', search: 'The Rest Is History' },
  { file: 'crime-junkie.jpg', search: 'Crime Junkie' },
  { file: 'my-favorite-murder.jpg', search: 'My Favorite Murder' },
  { file: 'darknet-diaries.jpg', search: 'Darknet Diaries' },
  { file: 'call-her-daddy.jpg', search: 'Call Her Daddy' },
]

async function lookupArtwork(search) {
  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(search)}&media=podcast&limit=1`,
  )
  const json = await res.json()
  const p = json.results?.[0]
  if (!p?.artworkUrl600) throw new Error(`No artwork for ${search}`)
  return p.artworkUrl600.replace('600x600bb', '1000x1000bb')
}

await mkdir(outDir, { recursive: true })

for (const show of SHOWS) {
  const url = await lookupArtwork(show.search)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed ${show.file}`)
  await writeFile(join(outDir, show.file), Buffer.from(await res.arrayBuffer()))
  console.log('ok', show.file, '←', show.search)
}

console.log('Done →', outDir)
