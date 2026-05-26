import { MENTION_PREVIEW_SECONDS } from './libraryProductsData'

const RAMP_UP_S = 0.3
const RAMP_DOWN_S = 0.25
const bufferCache = new Map<string, AudioBuffer>()

function hashKey(key: string): number {
  let hash = 0
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  return hash
}

function createEpisodeBuffer(ctx: AudioContext, episodeId: string, durationS: number): AudioBuffer {
  const cached = bufferCache.get(`ep-${episodeId}`)
  if (cached) return cached

  const seed = hashKey(episodeId)
  const sampleRate = ctx.sampleRate
  const length = Math.floor(sampleRate * durationS)
  const buffer = ctx.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate
    const noise = Math.sin(i * 0.017 + seed) * Math.cos(i * 0.009 + seed * 0.37)
    const envelope = 0.55 + 0.45 * Math.sin(t * 0.6 + seed * 0.01)
    data[i] = noise * envelope * 0.06
  }

  bufferCache.set(`ep-${episodeId}`, buffer)
  return buffer
}

type PreviewSession = {
  source: AudioBufferSourceNode
  gain: GainNode
  startedAt: number
  offsetSeconds: number
  durationSeconds: number
}

export type MentionPreviewPlayback = {
  stop: () => Promise<void>
  getProgress: () => number
}

export class MentionPreviewAudioEngine {
  private ctx: AudioContext | null = null
  private session: PreviewSession | null = null

  private async getContext(): Promise<AudioContext> {
    if (!this.ctx) {
      this.ctx = new AudioContext()
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }
    return this.ctx
  }

  async play(
    _productId: string,
    episodeId: string,
    mentionOffsetSeconds: number,
    episodeDurationSeconds = 20 * 60,
  ): Promise<MentionPreviewPlayback> {
    await this.stop()

    const ctx = await this.getContext()
    const fullBuffer = createEpisodeBuffer(ctx, episodeId, episodeDurationSeconds)
    const half = MENTION_PREVIEW_SECONDS / 2
    const offsetSeconds = Math.max(0, mentionOffsetSeconds - half)

    const source = ctx.createBufferSource()
    source.buffer = fullBuffer

    const gain = ctx.createGain()
    source.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(1, now + RAMP_UP_S)
    source.start(now, offsetSeconds, MENTION_PREVIEW_SECONDS)

    const startedAt = now
    this.session = {
      source,
      gain,
      startedAt,
      offsetSeconds,
      durationSeconds: MENTION_PREVIEW_SECONDS,
    }

    const stopAt = now + MENTION_PREVIEW_SECONDS
    gain.gain.setValueAtTime(1, stopAt - RAMP_DOWN_S)
    gain.gain.linearRampToValueAtTime(0, stopAt)

    return {
      stop: () => this.stop(),
      getProgress: () => {
        if (!this.session) return 0
        const elapsed = ctx.currentTime - this.session.startedAt
        return Math.min(1, Math.max(0, elapsed / MENTION_PREVIEW_SECONDS))
      },
    }
  }

  async stop(): Promise<void> {
    const session = this.session
    if (!session) return

    const ctx = await this.getContext()
    const now = ctx.currentTime
    const { source, gain } = session

    gain.gain.cancelScheduledValues(now)
    gain.gain.setValueAtTime(gain.gain.value, now)
    gain.gain.linearRampToValueAtTime(0, now + RAMP_DOWN_S)

    try {
      source.stop(now + RAMP_DOWN_S + 0.01)
    } catch {
      // already stopped
    }

    this.session = null
  }

  dispose(): void {
    void this.stop()
    void this.ctx?.close()
    this.ctx = null
  }
}
