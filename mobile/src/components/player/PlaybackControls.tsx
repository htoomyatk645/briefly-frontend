import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, layout, radius } from '@/src/theme';

type PlaybackControlsProps = {
  isPlaying: boolean;
  playScale: Animated.Value;
  onTogglePlay: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onRewind?: () => void;
  onForward?: () => void;
};

const SkipLabelButton = ({
  label,
  onPress,
  accessibilityLabel,
}: {
  label: string;
  onPress?: () => void;
  accessibilityLabel: string;
}) => (
  <Pressable
    style={styles.skipCircle}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
  >
    <Text style={styles.skipLabel}>{label}</Text>
  </Pressable>
);

export const PlaybackControls = ({
  isPlaying,
  playScale,
  onTogglePlay,
  onPrevious,
  onNext,
  onRewind,
  onForward,
}: PlaybackControlsProps) => (
  <View style={styles.row}>
    <Pressable
      style={styles.iconButton}
      onPress={onPrevious}
      accessibilityRole="button"
      accessibilityLabel="Previous episode"
    >
      <Ionicons name="play-skip-back" size={22} color={colors.white} />
    </Pressable>

    <SkipLabelButton label="15" onPress={onRewind} accessibilityLabel="Rewind 15 seconds" />

    <Pressable
      onPress={onTogglePlay}
      accessibilityRole="button"
      accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
    >
      <Animated.View style={[styles.playButton, { transform: [{ scale: playScale }] }]}>
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={28}
          color={colors.primary}
          style={isPlaying ? undefined : styles.playIconOffset}
        />
      </Animated.View>
    </Pressable>

    <SkipLabelButton label="30" onPress={onForward} accessibilityLabel="Skip forward 30 seconds" />

    <Pressable
      style={styles.iconButton}
      onPress={onNext}
      accessibilityRole="button"
      accessibilityLabel="Next episode"
    >
      <Ionicons name="play-skip-forward" size={22} color={colors.white} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  iconButton: {
    width: layout.touchMin,
    height: layout.touchMin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipCircle: {
    width: layout.touchMin,
    height: layout.touchMin,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.overlay.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.white,
  },
  playButton: {
    width: layout.playButtonSize,
    height: layout.playButtonSize,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconOffset: {
    marginLeft: 3,
  },
});
