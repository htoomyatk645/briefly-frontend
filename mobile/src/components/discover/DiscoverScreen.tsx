import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@briefly/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryChips } from '@/src/components/discover/CategoryChips';
import { BrieflyPicks } from '@/src/components/discover/BrieflyPicks';
import { CatalogMosaic } from '@/src/components/discover/CatalogMosaic';
import { EditorialHero } from '@/src/components/discover/EditorialHero';
import { TrendingBriefs } from '@/src/components/discover/TrendingBriefs';
import { VibeShelves } from '@/src/components/discover/VibeShelves';
import { DISCOVER_EASING, discoverMotion } from '@/src/components/discover/motion';
import {
  categories,
  getCategoryLabel,
  isCategoryId,
  type CategoryId,
} from '@/src/data/discoverData';
import {
  brieflyPicks,
  editorialHero,
  hasDiscoverFilterResults,
  trendingBriefs,
  vibeShelves,
} from '@/src/data/discoverFeed';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { colors, fonts, spacing } from '@/src/theme';

const t = theme.dark;
const SECTION_GAP = 32;

type DiscoverCategoryEmptyProps = {
  categoryLabel: string;
  onBrowseAll: () => void;
};

const DiscoverCategoryEmpty = ({
  categoryLabel,
  onBrowseAll,
}: DiscoverCategoryEmptyProps) => (
  <View style={styles.empty} accessibilityRole="text">
    <Text style={styles.emptyTitle}>Nothing in {categoryLabel} yet.</Text>
    <Text style={styles.emptyBody}>
      We&apos;re curating this category. Check back soon.
    </Text>
    <Pressable
      onPress={onBrowseAll}
      accessibilityRole="button"
      accessibilityLabel="Browse all briefs"
    >
      <Text style={styles.emptyAction}>Browse all briefs</Text>
    </Pressable>
  </View>
);

export const DiscoverScreen = () => {
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId | null>(null);
  const filterOpacity = useSharedValue(1);

  const handleCategorySelect = useCallback((id: string) => {
    if (!isCategoryId(id)) return;
    setActiveCategoryId((current) => (current === id ? null : id));
  }, []);

  const handleBrowseAll = useCallback(() => {
    setActiveCategoryId(null);
  }, []);

  const showCategoryEmpty = useMemo(
    () => activeCategoryId !== null && !hasDiscoverFilterResults(activeCategoryId),
    [activeCategoryId],
  );

  const categoryLabel = activeCategoryId ? getCategoryLabel(activeCategoryId) : '';

  const handleFilterTransition = useCallback(() => {
    if (reducedMotion) return;
    filterOpacity.value = 0;
    filterOpacity.value = withTiming(1, {
      duration: discoverMotion.filter,
      easing: DISCOVER_EASING,
    });
  }, [filterOpacity, reducedMotion]);

  const handleCategorySelectWithTransition = useCallback(
    (id: string) => {
      handleFilterTransition();
      handleCategorySelect(id);
    },
    [handleCategorySelect, handleFilterTransition],
  );

  const filteredSectionsStyle = useAnimatedStyle(() => ({
    opacity: filterOpacity.value,
  }));

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + 96 },
      ]}
      showsVerticalScrollIndicator={false}
      accessibilityLabel="Discover content"
    >
      <View style={styles.stickyChips}>
        <CategoryChips
          categories={categories}
          activeId={activeCategoryId}
          onSelect={handleCategorySelectWithTransition}
        />
      </View>

      <View style={styles.sections}>
        <EditorialHero hero={editorialHero} />

        <Animated.View style={[styles.filteredSections, filteredSectionsStyle]}>
          {showCategoryEmpty ? (
            <DiscoverCategoryEmpty
              categoryLabel={categoryLabel}
              onBrowseAll={handleBrowseAll}
            />
          ) : (
            <>
              <VibeShelves shelves={vibeShelves} activeCategoryId={activeCategoryId} />
              <BrieflyPicks picks={brieflyPicks} activeCategoryId={activeCategoryId} />
              <TrendingBriefs briefs={trendingBriefs} activeCategoryId={activeCategoryId} />
              <CatalogMosaic activeCategoryId={activeCategoryId} />
            </>
          )}
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.zoneDark,
  },
  content: {
    flexGrow: 1,
  },
  stickyChips: {
    backgroundColor: colors.zoneDark,
    zIndex: 10,
  },
  sections: {
    gap: SECTION_GAP,
    paddingBottom: spacing.xxl,
  },
  filteredSections: {
    gap: SECTION_GAP,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 240,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    fontFamily: fonts.display,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.36,
    color: t.text,
    textAlign: 'center',
  },
  emptyBody: {
    maxWidth: 260,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: t.textSecondary,
    textAlign: 'center',
  },
  emptyAction: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: t.primary,
    textDecorationLine: 'underline',
  },
});
