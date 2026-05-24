import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { UpNextEpisode } from '@/src/mockData';
import { colors, fonts, layout, radius } from '@/src/theme';

type UpNextCardProps = {
  episode: UpNextEpisode;
  onQueue: (id: number) => void;
};

export const UpNextCard = ({ episode, onQueue }: UpNextCardProps) => (
  <View style={styles.card}>
    <Image source={episode.artwork} style={styles.artwork} accessibilityLabel={episode.show} />
    <LinearGradient
      colors={['rgba(0,0,0,0)', colors.overlay.dark]}
      style={styles.overlay}
    />
    <Text style={styles.title} numberOfLines={2}>
      {episode.title}
    </Text>
    <Pressable
      style={styles.queueButton}
      onPress={() => onQueue(episode.id)}
      accessibilityRole="button"
      accessibilityLabel={`Queue ${episode.title} next`}
      hitSlop={8}
    >
      <Feather name="plus" size={12} color={colors.white} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: layout.carouselCardWidth,
    height: layout.carouselCardHeight,
    borderRadius: radius.cardSm,
    overflow: 'hidden',
    marginRight: layout.carouselGap,
  },
  artwork: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
  },
  title: {
    position: 'absolute',
    left: 8,
    right: 32,
    bottom: 8,
    fontFamily: fonts.bodySemiBold,
    fontSize: 10,
    lineHeight: 13,
    color: colors.white,
  },
  queueButton: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.overlay.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
