export type EpisodeSpeaker = {
  id: string
  name: string
  role: string
  bio: string
}

export type EpisodeReference = {
  id: string
  label: string
  detail: string
}

export type EpisodeContext = {
  episodeId: string
  showId: string
  showName: string
  episodeTitle: string
  showContext: string
  speakers: EpisodeSpeaker[]
  references: EpisodeReference[]
}

export const EPISODE_CONTEXTS: EpisodeContext[] = [
  {
    episodeId: 'feed-huberman',
    showId: 'show-huberman',
    showName: 'Huberman Lab',
    episodeTitle: 'Essentials: Master Your Sleep & Be More Alert When Awake',
    showContext:
      'Huberman Lab translates neuroscience into practical protocols for sleep, focus, stress, and performance. Episodes blend peer-reviewed mechanisms with field-tested habits listeners can try the same week.',
    speakers: [
      {
        id: 'sp-huberman',
        name: 'Andrew Huberman, Ph.D.',
        role: 'Host',
        bio: 'Professor of neurobiology and ophthalmology at Stanford. Research spans vision, stress, and neural circuits that regulate sleep and alertness.',
      },
    ],
    references: [
      {
        id: 'ref-circadian',
        label: 'Circadian anchoring',
        detail: 'Morning light within 30–60 minutes of waking sets the cortisol pulse that stabilizes sleep onset later.',
      },
      {
        id: 'ref-mag',
        label: 'Magnesium threonate',
        detail: 'Discussed as a sleep-support tool; framed as optional and worth discussing with a clinician.',
      },
      {
        id: 'ref-walker',
        label: 'Why We Sleep (Matthew Walker)',
        detail: 'Cited for sleep architecture basics and the cost of chronic sleep debt on cognition.',
      },
      {
        id: 'ref-temp',
        label: 'Core temperature drop',
        detail: 'A slight drop in core body temperature is required to initiate deep slow-wave sleep.',
      },
    ],
  },
  {
    episodeId: 'feed-wsj',
    showId: 'show-wsj',
    showName: 'The Journal',
    episodeTitle: 'Why Tech Layoffs Keep Coming',
    showContext:
      'The Journal’s daily show explains business and tech news with reporters on the beat. Stories emphasize incentives, balance sheets, and second-order effects on workers and markets.',
    speakers: [
      {
        id: 'sp-wsj-host',
        name: 'Kate Linebaugh',
        role: 'Co-host',
        bio: 'Deputy editor of audio and co-host covering companies, labor markets, and tech industry shifts.',
      },
      {
        id: 'sp-wsj-guest',
        name: 'Chip Cutter',
        role: 'Guest',
        bio: 'WSJ management reporter tracking restructuring, hiring freezes, and executive messaging.',
      },
    ],
    references: [
      {
        id: 'ref-big-tech',
        label: 'Big Tech hiring cycles',
        detail: 'Post-pandemic over-hiring followed by margin pressure and investor demands for efficiency.',
      },
      {
        id: 'ref-ai-spend',
        label: 'AI infrastructure spend',
        detail: 'Capital redirected toward GPUs and models while headcount in other divisions is trimmed.',
      },
    ],
  },
  {
    episodeId: 'feed-fa',
    showId: 'show-fa',
    showName: 'Foreign Affairs Interview',
    episodeTitle: 'The New Middle East Order',
    showContext:
      'Foreign Affairs Interview convenes policymakers and scholars on geopolitics, security, and economics. Conversations assume familiarity with history but define terms when stakes are high.',
    speakers: [
      {
        id: 'sp-fa-host',
        name: 'Dan Ephron',
        role: 'Host',
        bio: 'Executive editor of Foreign Affairs and former Newsweek Jerusalem bureau chief.',
      },
    ],
    references: [
      {
        id: 'ref-abraham',
        label: 'Abraham Accords',
        detail: 'Framework for normalization between Israel and several Arab states, reshaping regional alliances.',
      },
      {
        id: 'ref-energy',
        label: 'Energy corridors',
        detail: 'Gulf capital and European demand influencing diplomacy beyond traditional security blocs.',
      },
    ],
  },
  {
    episodeId: 'feed-jay',
    showId: 'show-jay',
    showName: 'On Purpose',
    episodeTitle: 'Stop Waiting for Permission',
    showContext:
      'On Purpose pairs Jay Shetty’s framing questions with guests from culture, wellness, and entrepreneurship. Episodes focus on identity, habits, and meaning rather than news cycles.',
    speakers: [
      {
        id: 'sp-jay',
        name: 'Jay Shetty',
        role: 'Host',
        bio: 'Author and former monk translating contemplative practice into daily routines for a broad audience.',
      },
    ],
    references: [
      {
        id: 'ref-permission',
        label: 'Permission traps',
        detail: 'Deferring action until external validation arrives—a pattern tied to social comparison.',
      },
      {
        id: 'ref-micro',
        label: 'Micro-commitments',
        detail: 'Five-minute daily practices used to rebuild agency without overwhelming willpower.',
      },
    ],
  },
]

export const CONTEXT_RAIL_LIMIT = 6

export function getContextForEpisode(episodeId: string): EpisodeContext | undefined {
  return EPISODE_CONTEXTS.find((entry) => entry.episodeId === episodeId)
}

export function getAllEpisodeContexts(): EpisodeContext[] {
  return EPISODE_CONTEXTS
}
