import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { playbackSpeeds } from '@/src/mockData';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { colors, fonts, motion, radius } from '@/src/theme';

type SpeedSelectorProps = {
  visible: boolean;
  selectedSpeed: number;
  onSelect: (speed: number) => void;
  onClose: () => void;
};

export const SpeedSelector = ({
  visible,
  selectedSpeed,
  onSelect,
  onClose,
}: SpeedSelectorProps) => {
  const reducedMotion = useReducedMotion();
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: reducedMotion ? 0 : motion.duration.transition,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: reducedMotion ? 0 : motion.duration.transition,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      translateY.setValue(20);
      opacity.setValue(0);
    }
  }, [visible, opacity, reducedMotion, translateY]);

  if (!visible) return null;

  return (
    <>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close speed selector" />
      <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pills}>
          {playbackSpeeds.map((speed) => {
            const selected = speed === selectedSpeed;
            return (
              <Pressable
                key={speed}
                style={[styles.pill, selected && styles.pillSelected]}
                onPress={() => {
                  onSelect(speed);
                  onClose();
                }}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={`${speed} times speed`}
              >
                <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
                  {speed === 1 ? '1×' : `${speed}×`}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
  },
  container: {
    position: 'absolute',
    right: 24,
    top: '38%',
    zIndex: 11,
    maxWidth: 260,
  },
  pills: {
    gap: 8,
    paddingVertical: 4,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.overlay.light,
  },
  pillSelected: {
    backgroundColor: colors.white,
  },
  pillText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.white,
  },
  pillTextSelected: {
    color: colors.primary,
  },
});
