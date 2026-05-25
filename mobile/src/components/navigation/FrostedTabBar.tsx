import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs/types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, spacing } from '@/src/theme';

const TAB_CONFIG: Record<
  string,
  { label: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  index: { label: 'Home', icon: 'home-outline' },
  library: { label: 'Library', icon: 'library-outline' },
  'now-playing': { label: 'Now Playing', icon: 'stop-outline' },
  discover: { label: 'Discover', icon: 'compass-outline' },
  search: { label: 'Search', icon: 'search-outline' },
};

export const FrostedTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.bar}>
        <View style={styles.row}>
          {state.routes.map((route, index) => {
            const focused = state.index === index;
            const config = TAB_CONFIG[route.name] ?? { label: route.name, icon: 'ellipse-outline' };
            const { options } = descriptors[route.key];

            return (
              <Pressable
                key={route.key}
                style={styles.tab}
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!focused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                }}
                accessibilityRole="button"
                accessibilityState={{ selected: focused }}
                accessibilityLabel={options.tabBarAccessibilityLabel ?? config.label}
              >
                {focused && route.name === 'now-playing' ? (
                  <View style={styles.activeDot} />
                ) : null}
                <Ionicons
                  name={config.icon}
                  size={22}
                  color={focused ? colors.white : colors.overlay.tabInactive}
                />
                <Text
                  style={[styles.label, { color: focused ? colors.white : colors.overlay.tabInactive }]}
                >
                  {config.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  bar: {
    overflow: 'hidden',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.overlay.border,
    backgroundColor: colors.zoneDark,
  },
  row: {
    flexDirection: 'row',
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    gap: 2,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
  },
  activeDot: {
    position: 'absolute',
    top: 2,
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
});
