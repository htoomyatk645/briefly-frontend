import { useCallback, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { useReducedMotion } from './useReducedMotion';

export const usePlayerActions = () => {
  const reducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);
  const [saved, setSaved] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedOutput, setSelectedOutput] = useState('airpods');
  const [showSpeedSelector, setShowSpeedSelector] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showShopSheet, setShowShopSheet] = useState(false);
  const [showAudioSheet, setShowAudioSheet] = useState(false);
  const saveScale = useRef(new Animated.Value(1)).current;
  const playScale = useRef(new Animated.Value(1)).current;

  const animateSave = useCallback(() => {
    if (reducedMotion) return;
    Animated.sequence([
      Animated.spring(saveScale, { toValue: 1.3, useNativeDriver: true, friction: 4 }),
      Animated.spring(saveScale, { toValue: 1, useNativeDriver: true, friction: 4 }),
    ]).start();
  }, [reducedMotion, saveScale]);

  const toggleSaved = useCallback(() => {
    setSaved((prev) => {
      const next = !prev;
      if (next) animateSave();
      return next;
    });
  }, [animateSave]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
    if (!reducedMotion) {
      Animated.sequence([
        Animated.timing(playScale, { toValue: 0.92, duration: 80, useNativeDriver: true }),
        Animated.timing(playScale, { toValue: 1, duration: 120, useNativeDriver: true }),
      ]).start();
    }
  }, [playScale, reducedMotion]);

  return {
    isPlaying,
    saved,
    playbackSpeed,
    selectedOutput,
    showSpeedSelector,
    showMoreMenu,
    showShopSheet,
    showAudioSheet,
    saveScale,
    playScale,
    setPlaybackSpeed,
    setSelectedOutput,
    setShowSpeedSelector,
    setShowMoreMenu,
    setShowShopSheet,
    setShowAudioSheet,
    toggleSaved,
    togglePlay,
  };
};

export type PlayerActions = ReturnType<typeof usePlayerActions>;
