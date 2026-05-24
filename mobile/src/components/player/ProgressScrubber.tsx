import { useCallback, useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';

import { formatElapsed, formatRemaining } from '@/src/utils/formatTime';
import { colors, fonts } from '@/src/theme';

type ProgressScrubberProps = {
  elapsed: number;
  duration: number;
  onSeek?: (value: number) => void;
};

export const ProgressScrubber = ({ elapsed, duration, onSeek }: ProgressScrubberProps) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const progress = duration > 0 ? elapsed / duration : 0;

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  }, []);

  const seekAt = useCallback(
    (locationX: number) => {
      if (trackWidth <= 0) return;
      const ratio = Math.max(0, Math.min(locationX / trackWidth, 1));
      onSeek?.(ratio * duration);
    },
    [duration, onSeek, trackWidth],
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.trackWrapper}
        onLayout={handleLayout}
        onPress={(event) => seekAt(event.nativeEvent.locationX)}
        accessibilityRole="adjustable"
        accessibilityLabel="Playback progress"
        accessibilityValue={{
          min: 0,
          max: duration,
          now: elapsed,
          text: `${formatElapsed(elapsed)} of ${formatElapsed(duration)}`,
        }}
      >
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress * 100}%` }]} />
          <View style={[styles.thumb, { left: `${progress * 100}%` }]} />
        </View>
      </Pressable>
      <View style={styles.labels}>
        <Text style={styles.time}>{formatElapsed(elapsed)}</Text>
        <Text style={styles.time}>{formatRemaining(elapsed, duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  trackWrapper: {
    height: 24,
    justifyContent: 'center',
  },
  track: {
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.overlay.border,
    overflow: 'visible',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderRadius: 999,
  },
  thumb: {
    position: 'absolute',
    top: -2.5,
    width: 8,
    height: 8,
    marginLeft: -4,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  time: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.overlay.strong,
  },
});
