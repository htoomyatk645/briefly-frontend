import { useCallback, useMemo, useRef, useState } from 'react'
import { EmailProfileScreen } from './EmailProfileScreen'
import { ForgotPasswordScreen } from './ForgotPasswordScreen'
import { InterestSelectionScreen } from './InterestSelectionScreen'
import { ListeningHabitsScreen } from './ListeningHabitsScreen'
import { NetworkSelectionScreen } from './NetworkSelectionScreen'
import { OnboardingShell } from './OnboardingShell'
import {
  PodcastImportScreen,
  type PodcastImportSource,
} from './PodcastImportScreen'
import { SignUpScreen } from './SignUpScreen'
import type { OnboardingStep, UserProfile } from './types'
import { WelcomeScreen } from './WelcomeScreen'
import './onboarding.css'

const STEPS: OnboardingStep[] = [
  'welcome',
  'signup',
  'profile',
  'interests',
  'networks',
  'habits',
  'import',
]
const SHELL_TOTAL_STEPS = 6

const emptyProfile: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  ageGroup: null,
}

type OnboardingFlowProps = {
  onComplete?: (data: {
    profile: UserProfile
    interests: string[]
    networks: string[]
    habits: string[]
    importSource: PodcastImportSource | null
  }) => void
  onAuthAction?: (provider: 'google' | 'apple' | 'facebook') => void
  onImportAction?: (source: PodcastImportSource) => void
}

export const OnboardingFlow = ({
  onComplete,
  onAuthAction,
  onImportAction,
}: OnboardingFlowProps) => {
  const [step, setStep] = useState<OnboardingStep>('welcome')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [profile, setProfile] = useState<UserProfile>(emptyProfile)
  const [interests, setInterests] = useState<string[]>([])
  const [networks, setNetworks] = useState<string[]>([])
  const [habits, setHabits] = useState<string[]>([])
  const forgotShellBackRef = useRef(() => setShowForgotPassword(false))

  const stepIndex = STEPS.indexOf(step)

  const goToStep = useCallback((next: OnboardingStep) => setStep(next), [])

  const finishOnboarding = useCallback(
    (importSource: PodcastImportSource | null) => {
      onComplete?.({ profile, interests, networks, habits, importSource })
    },
    [habits, interests, networks, onComplete, profile],
  )

  const handleEmailContinue = useCallback(() => goToStep('interests'), [goToStep])

  const handleInterestsComplete = useCallback(
    (selectedCategories: string[]) => {
      setInterests(selectedCategories)
      goToStep('networks')
    },
    [goToStep],
  )

  const handleNetworksComplete = useCallback(
    (selectedNetworks: string[]) => {
      setNetworks(selectedNetworks)
      goToStep('habits')
    },
    [goToStep],
  )

  const handleHabitsComplete = useCallback(
    (selectedHabits: string[]) => {
      setHabits(selectedHabits)
      goToStep('import')
    },
    [goToStep],
  )

  const handleImport = useCallback(
    (source: PodcastImportSource) => {
      onImportAction?.(source)
      finishOnboarding(source)
    },
    [finishOnboarding, onImportAction],
  )

  const handleImportSkip = useCallback(() => {
    finishOnboarding(null)
  }, [finishOnboarding])

  const handleForgotShellBack = useCallback(() => {
    forgotShellBackRef.current()
  }, [])

  const trackClassName = useMemo(
    () => `onboarding-track onboarding-track--step-${stepIndex}`,
    [stepIndex],
  )

  return (
    <div className="onboarding-root">
      <div
        className="onboarding-viewport"
        style={{ ['--onboarding-steps' as string]: String(STEPS.length) }}
      >
        <div
          className={trackClassName}
          role="group"
          aria-label="Briefly onboarding"
        >
          <div className="onboarding-panel onboarding-panel--welcome">
            <WelcomeScreen onGetStarted={() => goToStep('signup')} />
          </div>

          <div className="onboarding-panel">
            <OnboardingShell
              currentStep={1}
              totalSteps={SHELL_TOTAL_STEPS}
              onBack={
                showForgotPassword
                  ? handleForgotShellBack
                  : () => goToStep('welcome')
              }
            >
              {showForgotPassword ? (
                <ForgotPasswordScreen
                  onBackToSignIn={() => setShowForgotPassword(false)}
                  onBindShellBack={(handler) => {
                    forgotShellBackRef.current = handler
                  }}
                />
              ) : (
                <SignUpScreen
                  onGoogle={() => onAuthAction?.('google')}
                  onApple={() => onAuthAction?.('apple')}
                  onFacebook={() => onAuthAction?.('facebook')}
                  onEmail={() => goToStep('profile')}
                  onForgotPassword={() => setShowForgotPassword(true)}
                />
              )}
            </OnboardingShell>
          </div>

          <div className="onboarding-panel">
            <OnboardingShell
              currentStep={2}
              totalSteps={SHELL_TOTAL_STEPS}
              onBack={() => goToStep('signup')}
            >
              <EmailProfileScreen
                profile={profile}
                onChange={setProfile}
                onContinue={handleEmailContinue}
              />
            </OnboardingShell>
          </div>

          <div className="onboarding-panel">
            <OnboardingShell
              currentStep={3}
              totalSteps={SHELL_TOTAL_STEPS}
              onBack={() => goToStep('profile')}
            >
              <InterestSelectionScreen onComplete={handleInterestsComplete} />
            </OnboardingShell>
          </div>

          <div className="onboarding-panel">
            <OnboardingShell
              currentStep={4}
              totalSteps={SHELL_TOTAL_STEPS}
              onBack={() => goToStep('interests')}
            >
              <NetworkSelectionScreen onComplete={handleNetworksComplete} />
            </OnboardingShell>
          </div>

          <div className="onboarding-panel">
            <OnboardingShell
              currentStep={5}
              totalSteps={SHELL_TOTAL_STEPS}
              onBack={() => goToStep('networks')}
            >
              <ListeningHabitsScreen onComplete={handleHabitsComplete} />
            </OnboardingShell>
          </div>

          <div className="onboarding-panel">
            <OnboardingShell
              currentStep={6}
              totalSteps={SHELL_TOTAL_STEPS}
              onBack={() => goToStep('habits')}
            >
              <PodcastImportScreen
                onImport={handleImport}
                onSkip={handleImportSkip}
              />
            </OnboardingShell>
          </div>
        </div>
      </div>
    </div>
  )
}
