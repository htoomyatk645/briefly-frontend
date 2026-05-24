import { Tabs } from 'expo-router';

import { FrostedTabBar } from '@/src/components/navigation/FrostedTabBar';
import { colors } from '@/src/theme';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="now-playing"
      tabBar={(props) => <FrostedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.zoneDark },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="library" options={{ title: 'Library' }} />
      <Tabs.Screen name="now-playing" options={{ title: 'Now Playing' }} />
      <Tabs.Screen name="discover" options={{ title: 'Discover' }} />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
    </Tabs>
  );
}
