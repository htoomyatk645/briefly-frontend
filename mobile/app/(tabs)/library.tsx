import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/src/theme';

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text} accessibilityRole="header">
        Library
      </Text>
      <Text style={styles.subtext}>Saved episodes appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.zoneDark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.white,
  },
  subtext: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.overlay.strong,
    marginTop: 8,
  },
});
