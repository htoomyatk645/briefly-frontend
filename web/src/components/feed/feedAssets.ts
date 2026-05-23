/** Podcast artwork + UI assets for the feed player */
export const feedAssets = {
  hubermanArt: '/feed/covers/huberman.jpg',
  upNext: {
    wsj: '/feed/covers/wsj.jpg',
    fa: '/feed/covers/foreign-affairs.jpg',
    jay: '/feed/covers/jay-shetty.jpg',
  },
  controls: {
    play: '/feed/play.png',
    skipStart: '/feed/skip-start.png',
    skipEnd: '/feed/skip-end.png',
    rewind15: '/feed/rewind-15.png',
    forward30: '/feed/forward-30.png',
    chevron: '/feed/chevron.png',
  },
  actions: {
    bag: '/feed/bag.png',
    bookmark: '/feed/bookmark.png',
    speed: '/feed/speed.png',
    airpods: '/feed/airpods.png',
    more: '/feed/more.png',
  },
  tabs: {
    home: '/feed/home.png',
    books: '/feed/books.png',
    library: '/feed/library.png',
    compass: '/feed/compass.png',
    search: '/feed/search.png',
  },
} as const

/** Remote fallbacks for player chrome icons (Figma MCP export) */
export const feedAssetsRemote = {
  hubermanArt: '/feed/covers/huberman.jpg',
  upNext: {
    wsj: '/feed/covers/wsj.jpg',
    fa: '/feed/covers/foreign-affairs.jpg',
    jay: '/feed/covers/jay-shetty.jpg',
  },
  controls: {
    play: 'https://www.figma.com/api/mcp/asset/0dabd05c-c7ed-48b2-869f-5d319cb8aefc',
    skipStart: 'https://www.figma.com/api/mcp/asset/d79b055a-48a5-4ef1-b987-0f339855179f',
    skipEnd: 'https://www.figma.com/api/mcp/asset/70257cae-2115-46e4-b409-2352b51e80d1',
    rewind15: 'https://www.figma.com/api/mcp/asset/6b755829-69d3-4072-a8a6-5497542bf023',
    forward30: 'https://www.figma.com/api/mcp/asset/c56e673d-9c9a-4cff-87f8-6381bc950e42',
    chevron: 'https://www.figma.com/api/mcp/asset/c91f2a1a-885b-4e71-a2d8-ee2158ae3f9b',
  },
  actions: {
    bag: 'https://www.figma.com/api/mcp/asset/ee4c8ba2-8e55-4339-bb62-84c4651f175d',
    bookmark: 'https://www.figma.com/api/mcp/asset/1edafc08-80e5-4ad4-8247-15e8b294e1f6',
    speed: 'https://www.figma.com/api/mcp/asset/64389500-2d44-4c06-890e-fada56d21093',
    airpods: 'https://www.figma.com/api/mcp/asset/083eb61e-b97f-4dce-8aee-f1f9dba61991',
    more: 'https://www.figma.com/api/mcp/asset/fc5cd671-a1e3-43da-b1ab-f1507c7cabf8',
  },
  tabs: {
    home: 'https://www.figma.com/api/mcp/asset/7eb528bc-8e4a-4248-a56b-844e7b7a0142',
    books: 'https://www.figma.com/api/mcp/asset/cc5278dc-9899-4ccf-bf6e-10a2fc24a98b',
    library: 'https://www.figma.com/api/mcp/asset/9ad62879-dd3d-4e6f-9f3a-01a05d112aff',
    compass: 'https://www.figma.com/api/mcp/asset/2c0104a8-51cd-46f5-aaf2-0f312ee627e2',
    search: 'https://www.figma.com/api/mcp/asset/3edaacbc-30fb-46d9-b5db-1506ecf3c597',
  },
} as const
