/**
 * Benchmark mosaic lens frame timings (iPhone 12 viewport).
 * Run: node web/scripts/benchmark-mosaic-lens.mjs
 * Requires dev server at http://localhost:5173
 */
import { chromium, devices } from 'playwright'

const TARGET_URL = process.env.BENCHMARK_URL ?? 'http://localhost:5173/?preview=feed'
const DURATION_MS = 5000
const FRAME_BUDGET_MS = 16.7

const iPhone12 = devices['iPhone 12']

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  ...iPhone12,
  reducedMotion: 'no-preference',
})
const page = await context.newPage()

await page.addInitScript(() => {
  localStorage.setItem('briefly-mosaic-onboarded', '1')
})

await page.goto(TARGET_URL, { waitUntil: 'networkidle' })

const homeTab = page.getByRole('tab', { name: 'Home' })
if (await homeTab.count()) await homeTab.click()

await page.waitForSelector('.discover__mosaic-region', { timeout: 15000 })
await page.locator('.discover__mosaic-region').scrollIntoViewIfNeeded()
await page.waitForSelector('.mosaic-grid--visible', { timeout: 5000 })

const results = await page.evaluate(async ({ durationMs, frameBudgetMs }) => {
  const region = document.querySelector('.discover__mosaic-region')
  if (!region) throw new Error('mosaic region not found')

  const frameDeltas = []
  let last = performance.now()
  let running = true

  const rafLoop = () => {
    if (!running) return
    const now = performance.now()
    frameDeltas.push(now - last)
    last = now
    requestAnimationFrame(rafLoop)
  }
  requestAnimationFrame(rafLoop)

  const start = performance.now()
  let direction = -1

  while (performance.now() - start < durationMs) {
    const elapsed = performance.now() - start
    if (elapsed > durationMs / 2) direction = 1

    region.dispatchEvent(
      new WheelEvent('wheel', {
        deltaY: direction * 10,
        bubbles: true,
        cancelable: true,
      }),
    )

    await new Promise((r) => requestAnimationFrame(r))
  }

  running = false
  await new Promise((r) => setTimeout(r, 50))

  const sorted = [...frameDeltas].sort((a, b) => a - b)
  const overBudget = frameDeltas.filter((d) => d > frameBudgetMs)
  const sum = frameDeltas.reduce((a, b) => a + b, 0)

  const wrapper = document.querySelector('.discover__zoom-wrapper')
  const transform = wrapper instanceof HTMLElement ? wrapper.style.transform : ''

  return {
    sampleCount: frameDeltas.length,
    avgMs: frameDeltas.length ? sum / frameDeltas.length : 0,
    p50Ms: sorted[Math.floor(sorted.length * 0.5)] ?? 0,
    p95Ms: sorted[Math.floor(sorted.length * 0.95)] ?? 0,
    maxMs: sorted[sorted.length - 1] ?? 0,
    overBudgetCount: overBudget.length,
    overBudgetFrames: overBudget.slice(0, 25).map((d) => Math.round(d * 100) / 100),
    finalTransform: transform,
  }
}, { durationMs: DURATION_MS, frameBudgetMs: FRAME_BUDGET_MS })

await browser.close()

console.log('Mosaic lens performance (iPhone 12 emulation, 5s zoom 1.0→2.5→1.0)')
console.log('Viewport:', `${iPhone12.viewport.width}×${iPhone12.viewport.height} @${iPhone12.deviceScaleFactor}x`)
console.log('Samples:', results.sampleCount)
console.log(`Avg: ${results.avgMs.toFixed(2)}ms | p50: ${results.p50Ms.toFixed(2)}ms | p95: ${results.p95Ms.toFixed(2)}ms | max: ${results.maxMs.toFixed(2)}ms`)
console.log(`Final wrapper transform: ${results.finalTransform || '(css only)'}`)
console.log(`Frames over ${FRAME_BUDGET_MS}ms: ${results.overBudgetCount}`)

if (results.overBudgetCount > 0) {
  console.log('Flagged deltas (ms):', results.overBudgetFrames.join(', '))
  if (results.overBudgetCount > results.overBudgetFrames.length) {
    console.log(`…and ${results.overBudgetCount - results.overBudgetFrames.length} more`)
  }
} else {
  console.log('No frames exceeded 16.7ms budget.')
}
