/** Real podcast show + episode metadata with local cover art in /public/feed/covers/ */
export const PODCAST_COVERS = {
  huberman: '/feed/covers/huberman.jpg',
  wsj: '/feed/covers/wsj.jpg',
  foreignAffairs: '/feed/covers/foreign-affairs.jpg',
  jayShetty: '/feed/covers/jay-shetty.jpg',
  theDaily: '/feed/covers/the-daily.jpg',
  acquired: '/feed/covers/acquired.jpg',
  revisionistHistory: '/feed/covers/revisionist-history.jpg',
  hardFork: '/feed/covers/hard-fork.jpg',
  howIBuiltThis: '/feed/covers/how-i-built-this.jpg',
  invisible: '/feed/covers/99-invisible.jpg',
  ezraKlein: '/feed/covers/ezra-klein.jpg',
  workLife: '/feed/covers/worklife.jpg',
  decoder: '/feed/covers/decoder.jpg',
  radiolab: '/feed/covers/radiolab.jpg',
  planetMoney: '/feed/covers/planet-money.jpg',
  freshAir: '/feed/covers/fresh-air.jpg',
  smartLess: '/feed/covers/smartless.jpg',
  restIsHistory: '/feed/covers/rest-is-history.jpg',
  crimeJunkie: '/feed/covers/crime-junkie.jpg',
  myFavoriteMurder: '/feed/covers/my-favorite-murder.jpg',
  darknetDiaries: '/feed/covers/darknet-diaries.jpg',
  callHerDaddy: '/feed/covers/call-her-daddy.jpg',
} as const

export type PodcastCoverKey = keyof typeof PODCAST_COVERS

export const PLAYER_EPISODES = {
  huberman: {
    showName: 'Huberman Lab',
    episodeTitle: 'Essentials: Master Your Sleep & Be More Alert When Awake',
    coverSrc: PODCAST_COVERS.huberman,
  },
  wsj: {
    showName: 'WSJ Tech News Briefing',
    episodeTitle: '03/10/23: Regulators Shut Down Silicon Valley Bank',
    coverSrc: PODCAST_COVERS.wsj,
  },
  foreignAffairs: {
    showName: 'The Foreign Affairs Interview',
    episodeTitle: 'Prof. Mearsheimer on: Why Realist Leaders Fail',
    coverSrc: PODCAST_COVERS.foreignAffairs,
  },
  jayShetty: {
    showName: 'On Purpose with Jay Shetty',
    episodeTitle: 'Why Monks Meditate in Early Sunrise & How You Can Too',
    coverSrc: PODCAST_COVERS.jayShetty,
  },
} as const
