const HERO_PREVIEW_SECONDS = 30
const RAMP_UP_S = 0.4
const RAMP_DOWN_S = 0.35
const PREVIEW_GAIN = 0.22

const bufferCache = new Map<string, AudioBuffer>()

function hashKey(key: string): number {
  let hash = 0
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  return hash
}

function createEpisodeBuffer(ctx: AudioContext, episodeId: string, durationS: number): AudioBuffer {
  const cached = bufferCache.get(`hero-${episodeId}`)
  if (cached) return cached

  const seed = hashKey(episodeId)
  const sampleRate = ctx.sampleRate
  const length = Math.floor(sampleRate * durationS)
  const buffer = ctx.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate
    const noise = Math.sin(i * 0.013 + seed) * Math.cos(i * 0.008 + seed * 0.41)
    const envelope = 0.5 + 0.5 * Math.sin(t * 0.45 + seed * 0.008)
    data[i] = noise * envelope * 0.05
  }

  bufferCache.set(`hero-${episodeId}`, buffer)
  return buffer
}

type PreviewSession = {
  source: AudioBufferSourceNode
  gain: GainNode
  startedAt: number
  durationSeconds: number
}

export type HeroPreviewPlayback = {
  stop: () => Promise<void>
}

export class SearchHeroPreviewAudio {
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
    episodeId: string,
    mentionOffsetSeconds: number,
    episodeDurationSeconds = 20 * 60,
  ): Promise<HeroPreviewPlayback> {
    await this.stop()

    const ctx = await this.getContext()
    const fullBuffer = createEpisodeBuffer(ctx, episodeId, episodeDurationSeconds)
    const half = HERO_PREVIEW_SECONDS / 2
    const offsetSeconds = Math.max(0, mentionOffsetSeconds - half)

    const source = ctx.createBufferSource()
    source.buffer = fullBuffer

    const gain = ctx.createGain()
    source.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(PREVIEW_GAIN, now + RAMP_UP_S)
    source.start(now, offsetSeconds, HERO_PREVIEW_SECONDS)

    const startedAt = now
    this.session = {
      source,
      gain,
      startedAt,
      durationSeconds: HERO_PREVIEW_SECONDS,
    }

    const stopAt = now + HERO_PREVIEW_SECONDS
    gain.gain.setValueAtTime(PREVIEW_GAIN, stopAt - RAMP_DOWN_S)
    gain.gain.linearRampToValueAtTime(0, stopAt)

    return {
      stop: () => this.stop(),
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
