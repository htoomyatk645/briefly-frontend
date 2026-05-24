import { StyleSheet, View } from 'react-native';

import { colors } from '@/src/theme';

type PaginationDotsProps = {
  count: number;
  activeIndex: number;
};

export const PaginationDots = ({ count, activeIndex }: PaginationDotsProps) => (
  <View style={styles.container} accessibilityRole="tablist">
    {Array.from({ length: count }).map((_, index) => (
      <View
        key={index}
        style={[styles.dot, index === activeIndex ? styles.dotActive : styles.dotInactive]}
        accessibilityRole="tab"
        accessibilityState={{ selected: index === activeIndex }}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    height: 6,
    borderRadius: 999,
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.white,
  },
  dotInactive: {
    width: 6,
    backgroundColor: colors.overlay.medium,
  },
});
