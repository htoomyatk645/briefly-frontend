import { Easing } from 'react-native-reanimated';

export const DISCOVER_EASING = Easing.bezier(0.22, 1, 0.36, 1);

export const discoverMotion = {
  fast: 220,
  base: 260,
  slow: 320,
  filter: 220,
  stagger: 40,
  press: 120,
} as const;
