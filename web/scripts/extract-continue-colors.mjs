/**
 * Extract dominant colors from continue-listening cover art.
 * Run: node scripts/extract-continue-colors.mjs
 */
import { getColor } from 'colorthief'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const coversDir = join(root, 'public', 'feed', 'covers')

const COVERS = [
  'huberman.jpg',
  'the-daily.jpg',
  'acquired.jpg',
  'hard-fork.jpg',
  'radiolab.jpg',
  'crime-junkie.jpg',
  'planet-money.jpg',
  'smartless.jpg',
]

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1))
    switch (max) {
      case r:
        h = ((g - b) / delta) % 6
        break
      case g:
        h = (b - r) / delta + 2
        break
      default:
        h = (r - g) / delta + 4
        break
    }
    h *= 60
    if (h < 0) h += 360
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

for (const file of COVERS) {
  const path = join(coversDir, file)
  const color = await getColor(path)
  const r = color.r ?? color._r
  const g = color.g ?? color._g
  const b = color.b ?? color._b
  const { h, s, l } = rgbToHsl(r, g, b)
  console.log(`${file}: rgb(${r}, ${g}, ${b}) -> hsl(${h} ${s}% ${l}%)`)
}
