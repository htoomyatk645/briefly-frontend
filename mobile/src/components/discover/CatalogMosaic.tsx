import { useMemo } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { theme } from '@briefly/tokens';

import type { CategoryId } from '@/src/data/discoverData';
import { MOSAIC_ITEMS } from '@/src/data/discoverFeed';
import {
  filterMosaicByCategory,
  layoutMosaicTiles,
  tileMosaicLibrary,
  type MosaicItem,
} from '@/src/data/discoverMosaic';
import { fonts, radius, spacing } from '@/src/theme';

const t = theme.dark;
const HEADING_ID = 'catalog-mosaic-heading';
const MOSAIC_COLS = 5;
const CATALOG_TILE_COUNT = 40;
const TILE_SIZE = 72;
const TILE_GAP = 8;

type MosaicTileProps = {
  item: MosaicItem;
  size: number;
  left: number;
  top: number;
  onSelect?: (id: string) => void;
};

const MosaicTile = ({ item, size, left, top, onSelect }: MosaicTileProps) => (
  <Pressable
    onPress={() => onSelect?.(item.id)}
    style={[styles.tile, { width: size, height: size, left, top }]}
    accessibilityRole="button"
    accessibilityLabel={`${item.showName}: ${item.episodeTitle}`}
  >
    <Image source={item.cover} style={styles.tileArt} accessibilityIgnoresInvertColors />
  </Pressable>
);

export type CatalogMosaicProps = {
  activeCategoryId?: CategoryId | null;
  onTileSelect?: (id: string) => void;
  loading?: boolean;
};

export const CatalogMosaic = ({
  activeCategoryId = null,
  onTileSelect,
  loading = false,
}: CatalogMosaicProps) => {
  const { width } = useWindowDimensions();

  const filteredItems = useMemo(
    () => filterMosaicByCategory(MOSAIC_ITEMS, activeCategoryId),
    [activeCategoryId],
  );

  const mosaicItems = useMemo(
    () => tileMosaicLibrary(filteredItems, CATALOG_TILE_COUNT),
    [filteredItems],
  );

  const layout = useMemo(
    () => layoutMosaicTiles(mosaicItems, MOSAIC_COLS, TILE_SIZE, TILE_GAP),
    [mosaicItems],
  );

  if (!loading && mosaicItems.length === 0) {
    return null;
  }

  return (
    <View style={styles.section} accessibilityLabelledBy={HEADING_ID}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header" nativeID={HEADING_ID}>
          Browse the Catalog
        </Text>
        <Text style={styles.subtitle}>Every brief, organized.</Text>
      </View>

      {loading ? (
        <View style={styles.loadingWrap} accessibilityRole="progressbar">
          <View style={styles.skeleton} />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View
            style={[
              styles.mosaicCanvas,
              {
                width: Math.max(layout.width, width - spacing.lg * 2),
                height: layout.height,
              },
            ]}
            accessibilityRole="list"
            accessibilityLabel="Browse catalog"
          >
            {layout.tiles.map((tile) => (
              <MosaicTile
                key={tile.id}
                item={tile.item}
                size={TILE_SIZE}
                left={tile.left}
                top={tile.top}
                onSelect={onTileSelect}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
  header: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 22,
    lineHeight: 25,
    letterSpacing: -0.44,
    color: t.text,
  },
  subtitle: {
    marginTop: 6,
    fontFamily: fonts.body,
    fontSize: 13,
    color: t.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  mosaicCanvas: {
    position: 'relative',
  },
  tile: {
    position: 'absolute',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: t.surfaceAlt,
  },
  tileArt: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loadingWrap: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  skeleton: {
    width: '100%',
    maxWidth: 420,
    height: 240,
    borderRadius: radius.cardSm,
    backgroundColor: t.surfaceAlt,
  },
});
