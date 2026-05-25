import { colors, theme } from '@briefly/tokens'

const tintColorLight = colors.primary
const tintColorDark = theme.dark.primary

export default {
  light: {
    text: theme.light.text,
    background: theme.light.bgPage,
    tint: tintColorLight,
    tabIconDefault: theme.light.textMuted,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: theme.dark.text,
    background: theme.dark.bgPage,
    tint: tintColorDark,
    tabIconDefault: theme.dark.textMuted,
    tabIconSelected: tintColorDark,
  },
}
