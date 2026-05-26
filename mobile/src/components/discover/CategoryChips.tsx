import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '@briefly/tokens';

import type { BrowseCategory } from '@/src/data/discoverData';
import { fonts, spacing } from '@/src/theme';

const t = theme.dark;

export type CategoryChipsProps = {
  categories: BrowseCategory[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
};

export const CategoryChips = ({
  categories,
  activeId = null,
  onSelect,
}: CategoryChipsProps) => {
  return (
    <View style={styles.container} accessibilityRole="header" accessibilityLabel="Browse channels">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroller}
      >
        {categories.map((category) => {
          const isActive = activeId === category.id;
          return (
            <Pressable
              key={category.id}
              onPress={() => onSelect?.(category.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={category.label}
              style={({ pressed }) => [
                styles.chip,
                isActive && styles.chipActive,
                pressed && styles.chipPressed,
              ]}
            >
              <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
                {category.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.lg,
  },
  scroller: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: t.border,
    backgroundColor: t.surface,
  },
  chipActive: {
    borderColor: t.primary,
    backgroundColor: t.primarySoft,
  },
  chipPressed: {
    opacity: 0.85,
  },
  chipLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: t.textSecondary,
  },
  chipLabelActive: {
    color: t.primary,
  },
});
