import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo, type ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { audioOutputs } from '@/src/mockData';
import { colors, fonts, radius, spacing } from '@/src/theme';

type AudioOutputSheetProps = {
  selectedId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export const AudioOutputSheet = forwardRef<BottomSheet, AudioOutputSheetProps>(
  ({ selectedId, onSelect, onClose }, ref) => {
    const snapPoints = useMemo(() => ['32%'], []);

    const renderBackdrop = useCallback(
      (props: ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      [],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={onClose}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handle}
      >
        <BottomSheetView style={styles.content}>
          <Text style={styles.title} accessibilityRole="header">
            Audio Output
          </Text>
          {audioOutputs.map((output) => {
            const selected = output.id === selectedId;
            return (
              <Pressable
                key={output.id}
                style={styles.row}
                onPress={() => {
                  onSelect(output.id);
                  onClose();
                }}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                accessibilityLabel={output.label}
              >
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected ? <View style={styles.radioDot} /> : null}
                </View>
                <Text style={styles.label}>{output.label}</Text>
              </Pressable>
            );
          })}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

AudioOutputSheet.displayName = 'AudioOutputSheet';

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: colors.neutral[900],
    borderTopLeftRadius: radius.card,
    borderTopRightRadius: radius.card,
  },
  handle: {
    backgroundColor: colors.overlay.medium,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.white,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    gap: spacing.md,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.overlay.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.white,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.white,
  },
});
