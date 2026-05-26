import { FEED_GAIN_RAMP_DOWN_S, FEED_GAIN_RAMP_UP_S } from './feedAutoplayConfig'

const PREVIEW_DURATION_S = 24
const bufferCache = new Map<string, AudioBuffer>()

function hashCardId(cardId: string): number {
  let hash = 0
  for (let i = 0; i < cardId.length; i += 1) {
    hash = (hash * 31 + cardId.charCodeAt(i)) >>> 0
  }
  return hash
}

function createPreviewBuffer(ctx: AudioContext, cardId: string): AudioBuffer {
  const cached = bufferCache.get(cardId)
  if (cached) return cached

  const seed = hashCardId(cardId)
  const sampleRate = ctx.sampleRate
  const length = Math.floor(sampleRate * PREVIEW_DURATION_S)
  const buffer = ctx.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate
    const noise = Math.sin(i * 0.017 + seed) * Math.cos(i * 0.009 + seed * 0.37)
    const envelope = 0.55 + 0.45 * Math.sin(t * 0.6 + seed * 0.01)
    data[i] = noise * envelope * 0.06
  }

  bufferCache.set(cardId, buffer)
  return buffer
}

type AutoplaySession = {
  source: AudioBufferSourceNode
  gain: GainNode
}

export class FeedAutoplayAudioEngine {
  private ctx: AudioContext | null = null
  private sessions = new Map<string, AutoplaySession>()

  private async getContext(): Promise<AudioContext> {
    if (!this.ctx) {
      this.ctx = new AudioContext()
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }
    return this.ctx
  }

  async start(cardId: string): Promise<void> {
    await this.stop(cardId)

    const ctx = await this.getContext()
    const buffer = createPreviewBuffer(ctx, cardId)
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const gain = ctx.createGain()
    source.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(1, now + FEED_GAIN_RAMP_UP_S)
    source.start(now)

    this.sessions.set(cardId, { source, gain })
  }

  async stop(cardId: string): Promise<void> {
    const session = this.sessions.get(cardId)
    if (!session) return

    const ctx = await this.getContext()
    const now = ctx.currentTime
    const { source, gain } = session

    gain.gain.cancelScheduledValues(now)
    gain.gain.setValueAtTime(gain.gain.value, now)
    gain.gain.linearRampToValueAtTime(0, now + FEED_GAIN_RAMP_DOWN_S)
    source.stop(now + FEED_GAIN_RAMP_DOWN_S + 0.01)

    this.sessions.delete(cardId)
  }

  dispose(): void {
    for (const cardId of [...this.sessions.keys()]) {
      void this.stop(cardId)
    }
    void this.ctx?.close()
    this.ctx = null
    this.sessions.clear()
  }
}
