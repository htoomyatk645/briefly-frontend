import { useCallback, useState } from 'react'
import { TabShell } from './components/home/TabShell'
import { OnboardingFlow } from './components/onboarding/OnboardingFlow'
import type { PodcastImportSource } from './components/onboarding/PodcastImportScreen'
import type { UserProfile } from './components/onboarding/types'

type AppPhase = 'onboarding' | 'home'

const previewFeed =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('preview') === 'feed'

export const App = () => {
  const [phase, setPhase] = useState<AppPhase>(previewFeed ? 'home' : 'onboarding')
  const [toast, setToast] = useState<string | null>(null)

  const handleAuthAction = useCallback(
    (provider: 'google' | 'apple' | 'facebook') => {
      const label = `Continue with ${provider.charAt(0).toUpperCase()}${provider.slice(1)}`
      setToast(label)
      window.setTimeout(() => setToast(null), 2200)
    },
    [],
  )

  const handleImportAction = useCallback((source: PodcastImportSource) => {
    const label = source === 'apple-podcasts' ? 'Apple Podcasts' : 'Spotify'
    setToast(`Connecting ${label}…`)
    window.setTimeout(() => setToast(null), 2200)
  }, [])

  const handleComplete = useCallback(
    (data: {
      profile: UserProfile
      interests: string[]
      networks: string[]
      habits: string[]
      importSource: PodcastImportSource | null
    }) => {
      setPhase('home')
      const name = data.profile.firstName.trim() || 'friend'
      const importNote = data.importSource
        ? ` · ${data.importSource === 'apple-podcasts' ? 'Apple' : 'Spotify'} linked`
        : ''
      setToast(
        `Welcome, ${name} · ${data.interests.length} topics · ${data.networks.length} networks · ${data.habits.length} contexts${importNote}`,
      )
      window.setTimeout(() => setToast(null), 3200)
    },
    [],
  )

  const handlePlayEpisode = useCallback((id: string) => {
    setToast(`Playing episode ${id}`)
    window.setTimeout(() => setToast(null), 2000)
  }, [])

  const handleShowSelect = useCallback((id: string) => {
    setToast(`Opening show ${id}`)
    window.setTimeout(() => setToast(null), 2000)
  }, [])

  return (
    <>
      {phase === 'onboarding' ? (
        <OnboardingFlow
          onAuthAction={handleAuthAction}
          onImportAction={handleImportAction}
          onComplete={handleComplete}
        />
      ) : (
        <TabShell
          onPlayEpisode={handlePlayEpisode}
          onShowSelect={handleShowSelect}
          onNotifications={() => setToast('Notifications')}
          onProfile={() => setToast('Profile')}
        />
      )}
      {toast ? (
        <div className="app-toast" role="status">
          {toast}
        </div>
      ) : null}
    </>
  )
}
