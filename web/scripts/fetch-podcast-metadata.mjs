/**
 * Fetches real podcast artwork + episode titles from iTunes/RSS.
 * Run: node scripts/fetch-podcast-metadata.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'feed', 'covers')

const PODCASTS = {
  huberman: {
    search: 'Huberman Lab',
    file: 'huberman.jpg',
    fallbackTitle: 'Essentials: Master Your Sleep & Be More Alert When Awake | Dr. Matthew Walker',
  },
  wsj: {
    search: 'WSJ Tech News Briefing',
    file: 'wsj.jpg',
    fallbackTitle: '02/16: Silicon Valley Bank Goes Bankrupt',
  },
  fa: {
    search: 'The Foreign Affairs Interview',
    file: 'foreign-affairs.jpg',
    fallbackTitle: 'Prof. Mearsheimer on: Why Realist Leaders Fail',
  },
  jay: {
    search: 'On Purpose with Jay Shetty',
    file: 'jay-shetty.jpg',
    fallbackTitle: 'Why Monks Meditate in Early Sunrise & How You Can Too',
  },
}

const EPISODE_QUERIES = {
  huberman: /sleep|walker|rest/i,
  wsj: /silicon valley bank|svb|02\/16.*bankrupt/i,
  fa: /mearsheimer|realist leaders fail/i,
  jay: /monk|sunrise|meditat/i,
}

function decodeTitle(raw) {
  return raw
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
}

function parseTitles(xml) {
  return [...xml.matchAll(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/g)]
    .map((m) => decodeTitle(m[1]))
    .filter((t) => t && t.length > 5)
}

async function searchPodcast(term) {
  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=podcast&limit=1`,
  )
  const json = await res.json()
  const p = json.results?.[0]
  if (!p) throw new Error(`Podcast not found: ${term}`)
  return {
    showName: p.collectionName,
    artworkUrl: p.artworkUrl600?.replace('600x600bb', '1000x1000bb') ?? p.artworkUrl600,
    feedUrl: p.feedUrl,
  }
}

async function findEpisodeTitle(feedUrl, pattern, fallback) {
  if (!feedUrl) return fallback
  try {
    const xml = await (await fetch(feedUrl)).text()
    const titles = parseTitles(xml).slice(1)
    const match = titles.find((t) => pattern.test(t))
    return match ?? titles[0] ?? fallback
  } catch {
    return fallback
  }
}

async function downloadImage(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Image download failed: ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(dest, buf)
}

await mkdir(outDir, { recursive: true })

const metadata = {}

for (const [key, cfg] of Object.entries(PODCASTS)) {
  const podcast = await searchPodcast(cfg.search)
  const dest = join(outDir, cfg.file)
  await downloadImage(podcast.artworkUrl, dest)

  const episodeTitle = await findEpisodeTitle(
    podcast.feedUrl,
    EPISODE_QUERIES[key],
    cfg.fallbackTitle ?? podcast.showName,
  )

  metadata[key] = {
    showName: podcast.showName,
    episodeTitle,
    coverPath: `/feed/covers/${cfg.file}`,
    artworkUrl: podcast.artworkUrl,
  }

  console.log(`${key}:`, podcast.showName)
  console.log('  cover ->', dest)
  console.log('  episode ->', episodeTitle)
}

await writeFile(
  join(root, 'public', 'feed', 'podcast-metadata.json'),
  JSON.stringify(metadata, null, 2),
)

console.log('Done')
