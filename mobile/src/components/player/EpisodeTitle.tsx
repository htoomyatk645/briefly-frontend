import { StyleSheet, Text } from 'react-native';

import { colors, fonts } from '@/src/theme';

type EpisodeTitleProps = {
  title: string;
};

export const EpisodeTitle = ({ title }: EpisodeTitleProps) => (
  <Text style={styles.title} numberOfLines={2} accessibilityRole="header">
    {title}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 17,
    lineHeight: 22,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
});
