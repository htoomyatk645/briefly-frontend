import { Feather } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { NowPlayingEpisode } from '@/src/mockData';
import type { PlayerActions } from '@/src/hooks/usePlayerActions';
import { colors, fonts, layout, radius } from '@/src/theme';

import { PlayerIconColumn } from './PlayerIconColumn';

type PlayerArtworkRowProps = {
  episode: NowPlayingEpisode;
  actions: PlayerActions;
  onShopPress: () => void;
  onSpeedPress: () => void;
  onAudioPress: () => void;
  onMorePress: () => void;
};

export const PlayerArtworkRow = ({
  episode,
  actions,
  onShopPress,
  onSpeedPress,
  onAudioPress,
  onMorePress,
}: PlayerArtworkRowProps) => (
  <View style={styles.row}>
    <View style={styles.center}>
      <View style={styles.artworkShadow}>
        <Image source={episode.artwork} style={styles.artwork} accessibilityLabel={episode.show} />
      </View>
      <Pressable
        style={styles.showPill}
        accessibilityRole="button"
        accessibilityLabel={`Open ${episode.show}`}
      >
        <Text style={styles.showText}>{episode.show.toUpperCase()}</Text>
        <Feather name="chevron-right" size={12} color={colors.white} />
      </Pressable>
    </View>
    <PlayerIconColumn
      actions={actions}
      onShopPress={onShopPress}
      onSpeedPress={onSpeedPress}
      onAudioPress={onAudioPress}
      onMorePress={onMorePress}
    />
  </View>
);

const styles = StyleSheet.create({
  row: {
    position: 'relative',
    paddingHorizontal: 24,
    marginTop: 8,
    minHeight: layout.artworkSize + 40,
  },
  center: {
    alignItems: 'center',
  },
  artworkShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  artwork: {
    width: layout.artworkSize,
    height: layout.artworkSize,
    borderRadius: radius.cardSm,
    borderWidth: 1.5,
    borderColor: colors.overlay.border,
  },
  showPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.overlay.light,
  },
  showText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.white,
  },
});
