import type { ReactNode } from 'react'
import { ThemeIndicator } from '../ui/ThemeIndicator'
import './onboarding-shell.css'

export type OnboardingShellProps = {
  currentStep: number
  totalSteps: number
  onBack: () => void
  showBackButton?: boolean
  children: ReactNode
}

export const OnboardingShell = ({
  currentStep,
  totalSteps,
  onBack,
  showBackButton = true,
  children,
}: OnboardingShellProps) => {
  const safeCurrent = Math.min(Math.max(currentStep, 1), totalSteps)
  const safeTotal = Math.max(totalSteps, 1)
  const progressPercent = (safeCurrent / safeTotal) * 100

  return (
    <div className="onboarding-shell">
      <header className="onboarding-shell__chrome">
        <div className="onboarding-shell__back-slot">
          {showBackButton ? (
            <button
              type="button"
              className="onboarding-shell__back"
              onClick={onBack}
              aria-label="Go back"
            >
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <span className="onboarding-shell__back-placeholder" aria-hidden />
          )}
        </div>

        <div
          className="onboarding-shell__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPercent)}
          aria-label={`Step ${safeCurrent} of ${safeTotal}`}
        >
          <div className="onboarding-shell__track">
            <div
              className="onboarding-shell__fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="onboarding-shell__tools">
          <ThemeIndicator />
        </div>
      </header>

      <main className="onboarding-shell__content">{children}</main>
    </div>
  )
}
