import { Easing } from 'react-native-reanimated';

/** Briefly search easing — cubic-bezier(0.22, 1, 0.36, 1) */
export const SEARCH_EASING = Easing.bezier(0.22, 1, 0.36, 1);

export const searchMotion = {
  micro: 120,
  transition: 240,
  entrance: 360,
  sectionStagger: 40,
  rowStagger: 40,
  editorialFade: 180,
  clipCrossfade: 200,
} as const;

/** Voice search accent — acid chartreuse */
export const SEARCH_VOICE_ACCENT = '#B8FF3C';

/** Hero play control — warm accent */
export const SEARCH_PLAY_ACCENT = '#FF6640';
