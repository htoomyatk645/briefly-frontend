import type { ComponentProps } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

import type { PlayerActions } from '@/src/hooks/usePlayerActions';
import { colors, layout, radius } from '@/src/theme';

type PlayerIconColumnProps = {
  actions: PlayerActions;
  onShopPress: () => void;
  onSpeedPress: () => void;
  onAudioPress: () => void;
  onMorePress: () => void;
};

type FeatherName = ComponentProps<typeof Feather>['name'];
type IonName = ComponentProps<typeof Ionicons>['name'];

const ICONS: Array<
  | { key: string; icon: FeatherName; lib: 'feather' }
  | { key: string; icon: IonName; lib: 'ionicons' }
> = [
  { key: 'shop', icon: 'shopping-bag', lib: 'feather' },
  { key: 'save', icon: 'bookmark', lib: 'feather' },
  { key: 'speed', icon: 'speedometer', lib: 'ionicons' },
  { key: 'audio', icon: 'bluetooth', lib: 'ionicons' },
  { key: 'more', icon: 'more-horizontal', lib: 'feather' },
];

export const PlayerIconColumn = ({
  actions,
  onShopPress,
  onSpeedPress,
  onAudioPress,
  onMorePress,
}: PlayerIconColumnProps) => {
  const handlers: Record<string, () => void> = {
    shop: onShopPress,
    save: actions.toggleSaved,
    speed: onSpeedPress,
    audio: onAudioPress,
    more: onMorePress,
  };

  const labels: Record<string, string> = {
    shop: 'Shop products mentioned in episode',
    save: actions.saved ? 'Remove from saved' : 'Save episode',
    speed: 'Playback speed',
    audio: 'Audio output',
    more: 'More options',
  };

  return (
    <View style={styles.column}>
      {ICONS.map(({ key, icon, lib }) => {
        const isSave = key === 'save';
        const iconNode =
          isSave ? (
            <Ionicons
              name={actions.saved ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={colors.white}
            />
          ) : lib === 'feather' ? (
            <Feather name={icon} size={18} color={colors.white} />
          ) : (
            <Ionicons name={icon} size={18} color={colors.white} />
          );

        const buttonInner = (
          <Pressable
            style={styles.button}
            onPress={handlers[key]}
            accessibilityRole="button"
            accessibilityLabel={labels[key]}
            accessibilityState={isSave ? { selected: actions.saved } : undefined}
          >
            {iconNode}
          </Pressable>
        );

        if (isSave) {
          return (
            <Animated.View key={key} style={{ transform: [{ scale: actions.saveScale }] }}>
              {buttonInner}
            </Animated.View>
          );
        }

        return <View key={key}>{buttonInner}</View>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -((layout.iconButtonSize * 5 + layout.iconColumnGap * 4) / 2) }],
    gap: layout.iconColumnGap,
  },
  button: {
    width: layout.iconButtonSize,
    height: layout.iconButtonSize,
    borderRadius: radius.pill,
    backgroundColor: colors.overlay.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
});