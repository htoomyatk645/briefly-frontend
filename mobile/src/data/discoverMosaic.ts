import type { ImageSourcePropType } from 'react-native';

import type { CategoryId } from './discoverData';
import { matchesCategoryId } from './discoverData';
import { PODCAST_COVERS, PLAYER_EPISODES } from './podcastCovers';

export type BriefForMosaic = {
  id: string;
  showName: string;
  episodeTitle: string;
  artworkTone: string;
  cover: ImageSourcePropType;
  durationLabel?: string;
  categoryId: CategoryId;
};

export type MosaicItem = {
  id: string;
  showName: string;
  episodeTitle: string;
  artworkTone: string;
  cover: ImageSourcePropType;
  durationLabel?: string;
  categoryId: CategoryId;
};

const EXTRA_CATALOG: MosaicItem[] = [
  {
    id: 'cat-daily',
    showName: 'The Daily',
    episodeTitle: 'Nicolas Cage Made Himself a Legend.',
    artworkTone: 'ocean',
    cover: PODCAST_COVERS.theDaily,
    durationLabel: '32 min',
    categoryId: 'news',
  },
  {
    id: 'cat-acquired',
    showName: 'Acquired',
    episodeTitle: 'NVIDIA',
    artworkTone: 'forest',
    cover: PODCAST_COVERS.acquired,
    durationLabel: '3h 12 min',
    categoryId: 'business',
  },
  {
    id: 'cat-crime',
    showName: 'Crime Junkie',
    episodeTitle: 'MURDERED: Hanna Harris',
    artworkTone: 'berry',
    cover: PODCAST_COVERS.crimeJunkie,
    durationLabel: '44 min',
    categoryId: 'true-crime',
  },
  {
    id: 'cat-huberman',
    showName: PLAYER_EPISODES.huberman.showName,
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    artworkTone: 'moss',
    cover: PODCAST_COVERS.huberman,
    durationLabel: '14 min',
    categoryId: 'health',
  },
  {
    id: 'cat-jay',
    showName: PLAYER_EPISODES.jayShetty.showName,
    episodeTitle: PLAYER_EPISODES.jayShetty.episodeTitle,
    artworkTone: 'terracotta',
    cover: PODCAST_COVERS.jayShetty,
    durationLabel: '36 min',
    categoryId: 'health',
  },
];

function briefsToMosaic(briefs: BriefForMosaic[]): MosaicItem[] {
  return briefs.map((brief) => ({
    id: brief.id,
    showName: brief.showName,
    episodeTitle: brief.episodeTitle,
    artworkTone: brief.artworkTone,
    cover: brief.cover,
    durationLabel: brief.durationLabel,
    categoryId: brief.categoryId,
  }));
}

export function createMosaicItems(briefs: BriefForMosaic[]): MosaicItem[] {
  return [...briefsToMosaic(briefs), ...EXTRA_CATALOG];
}

export function buildMosaicRows<T>(items: T[], cols: number): T[][] {
  const rows: T[][] = [];
  let index = 0;
  let rowIdx = 0;

  while (index < items.length) {
    const isOffset = rowIdx % 2 === 1;
    const rowLen = isOffset ? cols - 1 : cols;
    rows.push(items.slice(index, index + rowLen));
    index += rowLen;
    rowIdx += 1;
  }

  return rows;
}

export function tileMosaicLibrary(items: MosaicItem[], targetCount: number): MosaicItem[] {
  if (items.length === 0) return [];

  const count = Math.max(targetCount, items.length);
  const result: MosaicItem[] = [];
  const stride = items.length;

  for (let i = 0; i < count; i += 1) {
    const offset = (i * 7) % stride;
    const source = items[(i + offset) % stride];
    const cycle = Math.floor(i / stride);

    if (cycle === 0) {
      result.push(source);
      continue;
    }

    result.push({
      ...source,
      id: `${source.id}~dup-${cycle}-${i}`,
    });
  }

  return result;
}

export function filterMosaicByCategory(
  items: MosaicItem[],
  activeCategoryId: CategoryId | null,
): MosaicItem[] {
  if (activeCategoryId === null) return items;
  return items.filter((item) => matchesCategoryId(item.categoryId, activeCategoryId));
}

export type MosaicTileLayout = {
  id: string;
  item: MosaicItem;
  left: number;
  top: number;
};

export function layoutMosaicTiles(
  items: MosaicItem[],
  cols: number,
  tileSize: number,
  tileGap: number,
): { tiles: MosaicTileLayout[]; width: number; height: number } {
  const rows = buildMosaicRows(items, cols);
  const hexStep = (tileSize + tileGap) * 0.866050403784439;
  const tiles: MosaicTileLayout[] = [];
  let maxWidth = 0;

  rows.forEach((row, rowIdx) => {
    const offsetX = rowIdx % 2 === 1 ? (tileSize + tileGap) / 2 : 0;
    const rowWidth = offsetX + row.length * tileSize + Math.max(0, row.length - 1) * tileGap;
    maxWidth = Math.max(maxWidth, rowWidth);

    row.forEach((item, colIdx) => {
      tiles.push({
        id: item.id,
        item,
        left: offsetX + colIdx * (tileSize + tileGap),
        top: rowIdx * hexStep,
      });
    });
  });

  const height =
    rows.length > 0 ? (rows.length - 1) * hexStep + tileSize : 0;

  return { tiles, width: maxWidth, height };
}
