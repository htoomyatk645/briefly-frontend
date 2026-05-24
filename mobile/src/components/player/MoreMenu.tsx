import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { moreMenuItems } from '@/src/mockData';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { colors, fonts, motion, radius } from '@/src/theme';

type MoreMenuProps = {
  visible: boolean;
  onClose: () => void;
};

export const MoreMenu = ({ visible, onClose }: MoreMenuProps) => {
  const reducedMotion = useReducedMotion();
  const itemAnimations = useRef(moreMenuItems.map(() => new Animated.Value(0))).current;
  const closingRef = useRef(false);

  useEffect(() => {
    if (visible) {
      closingRef.current = false;
      if (reducedMotion) {
        itemAnimations.forEach((anim) => anim.setValue(1));
        return;
      }
      Animated.stagger(
        motion.stagger,
        itemAnimations.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: motion.duration.transition,
            useNativeDriver: true,
          }),
        ),
      ).start();
    } else if (!closingRef.current) {
      itemAnimations.forEach((anim) => anim.setValue(0));
    }
  }, [itemAnimations, reducedMotion, visible]);

  const closeWithAnimation = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    if (reducedMotion) {
      onClose();
      return;
    }

    Animated.stagger(
      motion.stagger,
      [...itemAnimations].reverse().map((anim) =>
        Animated.timing(anim, {
          toValue: 0,
          duration: motion.duration.micro,
          useNativeDriver: true,
        }),
      ),
    ).start(() => {
      closingRef.current = false;
      onClose();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 8,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 40) closeWithAnimation();
      },
    }),
  ).current;

  if (!visible) return null;

  return (
    <View style={styles.overlay} {...panResponder.panHandlers}>
      <Pressable style={StyleSheet.absoluteFill} onPress={closeWithAnimation} accessibilityLabel="Close menu" />
      <BlurView intensity={60} tint="dark" style={styles.menuCard}>
        <View style={styles.menuInner}>
          {moreMenuItems.map((item, index) => {
            const anim = itemAnimations[index];
            const translateX = anim.interpolate({
              inputRange: [0, 1],
              outputRange: [24, 0],
            });

            return (
              <Animated.View
                key={item.id}
                style={{ opacity: anim, transform: [{ translateX }] }}
              >
                {item.dividerBefore ? <View style={styles.divider} /> : null}
                <Pressable
                  style={styles.menuItem}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                >
                  <Feather
                    name={item.icon as keyof typeof Feather.glyphMap}
                    size={18}
                    color={colors.white}
                  />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: '36%',
    paddingRight: 24,
  },
  menuCard: {
    width: 240,
    borderRadius: radius.card,
    overflow: 'hidden',
    backgroundColor: colors.overlay.menu,
  },
  menuInner: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 48,
    paddingHorizontal: 16,
  },
  menuLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: colors.overlay.divider,
    marginVertical: 4,
    marginHorizontal: 16,
  },
});
