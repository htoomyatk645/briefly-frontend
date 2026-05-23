import { type FormEvent, useCallback, useEffect, useState } from 'react'
import './forgot-password.css'

type ForgotPasswordStep = 'form' | 'sent'

type ForgotPasswordScreenProps = {
  onBackToSignIn: () => void
  onBindShellBack?: (handler: () => void) => void
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const ForgotPasswordScreen = ({
  onBackToSignIn,
  onBindShellBack,
}: ForgotPasswordScreenProps) => {
  const [step, setStep] = useState<ForgotPasswordStep>('form')
  const [email, setEmail] = useState('')

  const canSubmit = isValidEmail(email.trim())

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return
    setStep('sent')
  }

  const handleBackToSignIn = useCallback(() => {
    setStep('form')
    setEmail('')
    onBackToSignIn()
  }, [onBackToSignIn])

  useEffect(() => {
    onBindShellBack?.(() => {
      if (step === 'sent') {
        setStep('form')
        return
      }
      handleBackToSignIn()
    })
  }, [step, onBindShellBack, handleBackToSignIn])

  return (
    <section
      className="forgot-password-screen forgot-password-screen--shelled"
      aria-label="Reset your password"
    >
      <div className="forgot-password-viewport">
        <div
          className={`forgot-password-track${step === 'sent' ? ' forgot-password-track--sent' : ''}`}
          role="group"
          aria-live="polite"
        >
          {/* Step 1: Request reset */}
          <div
            className="forgot-password-panel"
            aria-hidden={step === 'sent'}
          >
            <div className="forgot-password-panel__inner">
              <header>
                <h1 className="forgot-password-title">Forgot password?</h1>
                <p className="forgot-password-copy">
                  Enter the email linked to your account. We&apos;ll send you a
                  link to reset your password.
                </p>
              </header>

              <form className="forgot-password-form" onSubmit={handleSubmit}>
                <label className="field">
                  <span className="field__label">Email</span>
                  <input
                    className="field__input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                  />
                </label>

                <div className="forgot-password-footer">
                  <button
                    type="submit"
                    className="btn-pill-primary"
                    disabled={!canSubmit}
                  >
                    Send reset link
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Step 2: Confirmation */}
          <div
            className="forgot-password-panel"
            aria-hidden={step === 'form'}
          >
            <div className="forgot-password-panel__inner forgot-password-panel__inner--centered">
              <div className="success-hero" role="img" aria-label="Reset link sent">
                <div className="success-hero__ring" aria-hidden />
                <svg
                  className="success-hero__svg"
                  viewBox="0 0 52 52"
                  aria-hidden
                >
                  <circle
                    className="success-check__circle"
                    cx="26"
                    cy="26"
                    r="25"
                  />
                  <path
                    className="success-check__check"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>

              <h2 className="forgot-password-title">Check your inbox</h2>
              <p className="forgot-password-copy">
                We sent a reset link to
              </p>
              <p className="success-email">{email.trim()}</p>
              <p className="success-hint">
                Didn&apos;t see it? Check spam, or wait a minute and try again.
              </p>

              <div className="forgot-password-footer">
                <button
                  type="button"
                  className="btn-pill-secondary"
                  onClick={handleBackToSignIn}
                >
                  Back to sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
