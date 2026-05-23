/**
 * Downloads Figma Feed screen assets into web/public/feed/
 * Run: node scripts/download-feed-assets.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'feed')

const assets = {
  'huberman-art.jpg': 'https://www.figma.com/api/mcp/asset/0de8d188-8548-4c90-9f8d-1a48fd1c41c3',
  'play.png': 'https://www.figma.com/api/mcp/asset/0dabd05c-c7ed-48b2-869f-5d319cb8aefc',
  'skip-end.png': 'https://www.figma.com/api/mcp/asset/70257cae-2115-46e4-b409-2352b51e80d1',
  'rewind-15.png': 'https://www.figma.com/api/mcp/asset/6b755829-69d3-4072-a8a6-5497542bf023',
  'forward-30.png': 'https://www.figma.com/api/mcp/asset/c56e673d-9c9a-4cff-87f8-6381bc950e42',
  'skip-start.png': 'https://www.figma.com/api/mcp/asset/d79b055a-48a5-4ef1-b987-0f339855179f',
  'chevron.png': 'https://www.figma.com/api/mcp/asset/c91f2a1a-885b-4e71-a2d8-ee2158ae3f9b',
  'up-wsj.jpg': 'https://www.figma.com/api/mcp/asset/0023bc3a-b3ae-499e-a1c5-6099e7918aec',
  'up-fa.jpg': 'https://www.figma.com/api/mcp/asset/57b56bc2-54f6-438c-b23e-c0ac78f34005',
  'up-jay.jpg': 'https://www.figma.com/api/mcp/asset/1f26a97b-4035-4db2-8456-6a2ad96fe4f4',
  'bag.png': 'https://www.figma.com/api/mcp/asset/ee4c8ba2-8e55-4339-bb62-84c4651f175d',
  'bookmark.png': 'https://www.figma.com/api/mcp/asset/1edafc08-80e5-4ad4-8247-15e8b294e1f6',
  'speed.png': 'https://www.figma.com/api/mcp/asset/64389500-2d44-4c06-890e-fada56d21093',
  'airpods.png': 'https://www.figma.com/api/mcp/asset/083eb61e-b97f-4dce-8aee-f1f9dba61991',
  'more.png': 'https://www.figma.com/api/mcp/asset/fc5cd671-a1e3-43da-b1ab-f1507c7cabf8',
  'search.png': 'https://www.figma.com/api/mcp/asset/3edaacbc-30fb-46d9-b5db-1506ecf3c597',
  'home.png': 'https://www.figma.com/api/mcp/asset/7eb528bc-8e4a-4248-a56b-844e7b7a0142',
  'books.png': 'https://www.figma.com/api/mcp/asset/cc5278dc-9899-4ccf-bf6e-10a2fc24a98b',
  'compass.png': 'https://www.figma.com/api/mcp/asset/2c0104a8-51cd-46f5-aaf2-0f312ee627e2',
  'library.png': 'https://www.figma.com/api/mcp/asset/9ad62879-dd3d-4e6f-9f3a-01a05d112aff',
}

await mkdir(outDir, { recursive: true })

for (const [name, url] of Object.entries(assets)) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed ${name}: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(join(outDir, name), buf)
  console.log('ok', name)
}

console.log('Done →', outDir)
