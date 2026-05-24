import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { upNextEpisodes } from '@/src/mockData';
import { colors, fonts, layout, spacing } from '@/src/theme';

import { PaginationDots } from './PaginationDots';
import { UpNextCard } from './UpNextCard';

const SNAP_INTERVAL = layout.carouselCardWidth + layout.carouselGap;

export const UpNextCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SNAP_INTERVAL);
    setActiveIndex(Math.max(0, Math.min(index, upNextEpisodes.length - 1)));
  }, []);

  const handleQueue = useCallback((id: number) => {
    console.log('Queue episode', id);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header} accessibilityRole="header">
        Up Next
      </Text>
      <FlatList
        ref={listRef}
        data={upNextEpisodes}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        contentContainerStyle={styles.listContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => <UpNextCard episode={item} onQueue={handleQueue} />}
      />
      <PaginationDots count={upNextEpisodes.length} activeIndex={activeIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    color: colors.white,
    marginBottom: spacing.md,
  },
  listContent: {
    paddingRight: spacing.lg,
  },
});
