/** Local library media under /public/library — used by products and reading data */

export const LIBRARY_BOOK_COVERS = {
  whyWeSleep: '/library/books/why-we-sleep.jpg',
  thinkingFastAndSlow: '/library/books/thinking-fast-and-slow.jpg',
  atomicHabits: '/library/books/atomic-habits.jpg',
  chipWar: '/library/books/chip-war.jpg',
  meditations: '/library/books/meditations.jpg',
} as const

export const LIBRARY_PRODUCT_IMAGES = {
  magnesium: '/library/products/magnesium-threonate.jpg',
  whyWeSleep: '/library/products/why-we-sleep.jpg',
  redLamp: '/library/products/red-spectrum-lamp.jpg',
  ag1: '/library/products/ag1.jpg',
  notion: '/library/products/notion.jpg',
  headspace: '/library/products/headspace.jpg',
  oura: '/library/products/oura-ring.jpg',
  audible: '/library/products/audible.jpg',
  hydroFlask: '/library/products/hydro-flask.jpg',
} as const

export function faviconForDomain(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`
}
