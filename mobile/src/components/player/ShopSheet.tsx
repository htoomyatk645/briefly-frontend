import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo, type ComponentProps } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { shopProducts } from '@/src/mockData';
import { colors, fonts, layout, radius, spacing } from '@/src/theme';

type ShopSheetProps = {
  onClose: () => void;
};

export const ShopSheet = forwardRef<BottomSheet, ShopSheetProps>(({ onClose }, ref) => {
  const snapPoints = useMemo(() => ['45%'], []);

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
          Mentioned in this episode
        </Text>
        {shopProducts.map((product) => (
          <View key={product.id} style={styles.productRow}>
            <Image source={product.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle} numberOfLines={2}>
                {product.title}
              </Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
            <Pressable
              style={styles.cta}
              accessibilityRole="button"
              accessibilityLabel={`View product ${product.title}`}
            >
              <Text style={styles.ctaText}>View Product</Text>
            </Pressable>
          </View>
        ))}
      </BottomSheetView>
    </BottomSheet>
  );
});

ShopSheet.displayName = 'ShopSheet';

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
    gap: spacing.lg,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: radius.cardSm,
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
  productTitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.white,
  },
  productPrice: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.overlay.strong,
  },
  cta: {
    minHeight: layout.touchMin,
    paddingHorizontal: 12,
    borderRadius: radius.cardSm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.onPrimary,
  },
});
