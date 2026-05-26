import { Stack } from 'expo-router';

export default function SearchStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="results" />
    </Stack>
  );
}
