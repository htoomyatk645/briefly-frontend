import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePlayerActions } from '@/src/hooks/usePlayerActions';
import { nowPlaying } from '@/src/mockData';
import { colors, radius } from '@/src/theme';

import { AudioOutputSheet } from './AudioOutputSheet';
import { EpisodeTitle } from './EpisodeTitle';
import { MoreMenu } from './MoreMenu';
import { PlaybackControls } from './PlaybackControls';
import { PlayerArtworkRow } from './PlayerArtworkRow';
import { ProgressScrubber } from './ProgressScrubber';
import { ShopSheet } from './ShopSheet';
import { SpeedSelector } from './SpeedSelector';
import { UpNextCarousel } from './UpNextCarousel';

export const NowPlayingScreen = () => {
  const insets = useSafeAreaInsets();
  const actions = usePlayerActions();
  const shopSheetRef = useRef<BottomSheet>(null);
  const audioSheetRef = useRef<BottomSheet>(null);
  const tabBarPadding = 72 + insets.bottom;

  const openShop = useCallback(() => {
    shopSheetRef.current?.snapToIndex(0);
    actions.setShowShopSheet(true);
  }, [actions]);

  const openAudio = useCallback(() => {
    audioSheetRef.current?.snapToIndex(0);
    actions.setShowAudioSheet(true);
  }, [actions]);

  const closeShop = useCallback(() => {
    shopSheetRef.current?.close();
    actions.setShowShopSheet(false);
  }, [actions]);

  const closeAudio = useCallback(() => {
    audioSheetRef.current?.close();
    actions.setShowAudioSheet(false);
  }, [actions]);

  return (
    <View style={styles.root}>
      <View style={[styles.topZone, { paddingTop: insets.top }]}>
        <UpNextCarousel />
      </View>

      <View style={styles.bottomZone}>
        <ScrollView
          contentContainerStyle={[styles.playerContent, { paddingBottom: tabBarPadding }]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <PlayerArtworkRow
            episode={nowPlaying}
            actions={actions}
            onShopPress={openShop}
            onSpeedPress={() => actions.setShowSpeedSelector(true)}
            onAudioPress={openAudio}
            onMorePress={() => actions.setShowMoreMenu(true)}
          />
          <EpisodeTitle title={nowPlaying.title} />
          <ProgressScrubber elapsed={nowPlaying.elapsed} duration={nowPlaying.duration} />
          <PlaybackControls
            isPlaying={actions.isPlaying}
            playScale={actions.playScale}
            onTogglePlay={actions.togglePlay}
          />
        </ScrollView>
      </View>

      <SpeedSelector
        visible={actions.showSpeedSelector}
        selectedSpeed={actions.playbackSpeed}
        onSelect={actions.setPlaybackSpeed}
        onClose={() => actions.setShowSpeedSelector(false)}
      />

      <MoreMenu visible={actions.showMoreMenu} onClose={() => actions.setShowMoreMenu(false)} />

      <ShopSheet ref={shopSheetRef} onClose={closeShop} />
      <AudioOutputSheet
        ref={audioSheetRef}
        selectedId={actions.selectedOutput}
        onSelect={actions.setSelectedOutput}
        onClose={closeAudio}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.zoneDark,
  },
  topZone: {
    flex: 0.35,
  },
  bottomZone: {
    flex: 0.65,
    backgroundColor: colors.playerBg,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    overflow: 'hidden',
  },
  playerContent: {
    paddingBottom: 24,
  },
});
