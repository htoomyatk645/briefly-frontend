import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@briefly/tokens';

import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { fonts, spacing } from '@/src/theme';

import { SEARCH_VOICE_ACCENT, SEARCH_EASING, searchMotion } from './searchMotion';

const t = theme.dark;

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onVoiceCommit?: (transcript: string) => void;
};

/**
 * Voice search stub — expo-speech-recognition not installed.
 * Surfaces a demo transcript when mic is tapped.
 */
function useVoiceSearchStub(
  onChange: (value: string) => void,
  onVoiceCommit?: (transcript: string) => void,
) {
  const [isListening, setIsListening] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopListening = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsListening(false);
  }, []);

  useEffect(() => () => stopListening(), [stopListening]);

  const handleMicPress = useCallback(() => {
    if (isListening) {
      stopListening();
      return;
    }

    Alert.alert(
      'Voice search',
      'Speech recognition is not configured yet. Use a demo query?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Try "sleep debt"',
          onPress: () => {
            setIsListening(true);
            timerRef.current = setTimeout(() => {
              const transcript = 'sleep debt';
              onChange(transcript);
              onVoiceCommit?.(transcript);
              setIsListening(false);
              timerRef.current = null;
            }, 900);
          },
        },
      ],
    );
  }, [isListening, onChange, onVoiceCommit, stopListening]);

  return { isListening, handleMicPress, stopListening };
}

export const SearchInput = ({
  value,
  onChange,
  onSubmit,
  onVoiceCommit,
}: SearchInputProps) => {
  const reducedMotion = useReducedMotion();
  const { isListening, handleMicPress } = useVoiceSearchStub(onChange, onVoiceCommit);
  const borderOpacity = useSharedValue(1);

  useEffect(() => {
    if (reducedMotion || !isListening) {
      borderOpacity.value = 1;
      return;
    }
    borderOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 625, easing: SEARCH_EASING }),
        withTiming(0.55, { duration: 625, easing: SEARCH_EASING }),
      ),
      -1,
      false,
    );
  }, [borderOpacity, isListening, reducedMotion]);

  const listeningBorderStyle = useAnimatedStyle(() => ({
    borderColor: isListening ? SEARCH_VOICE_ACCENT : t.border,
    opacity: isListening ? borderOpacity.value : 1,
  }));

  const handleSubmitEditing: TextInputProps['onSubmitEditing'] = () => {
    onSubmit?.();
  };

  return (
    <View style={styles.sticky} accessibilityLabel="Search clips">
      <Text style={styles.srOnly} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        Search clips
      </Text>
      <Animated.View style={[styles.inputWrap, listeningBorderStyle]}>
        <TextInput
          style={styles.field}
          value={value}
          onChangeText={onChange}
          placeholder="Search clips, shows, ideas..."
          placeholderTextColor={t.textMuted}
          returnKeyType="search"
          onSubmitEditing={handleSubmitEditing}
          autoCorrect={false}
          autoCapitalize="none"
          accessibilityLabel="Search clips, shows, ideas"
          accessibilityRole="search"
        />
        <Pressable
          onPress={handleMicPress}
          style={styles.mic}
          accessibilityRole="button"
          accessibilityLabel={isListening ? 'Stop voice search' : 'Search with voice'}
          accessibilityState={{ selected: isListening }}
        >
          <Ionicons
            name={isListening ? 'mic' : 'mic-outline'}
            size={22}
            color={isListening ? SEARCH_VOICE_ACCENT : t.textSecondary}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  sticky: {
    zIndex: 40,
    marginBottom: spacing.lg,
  },
  srOnly: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: t.surface,
    gap: spacing.sm,
  },
  field: {
    flex: 1,
    paddingVertical: spacing.md,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 22,
    color: t.text,
  },
  mic: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
