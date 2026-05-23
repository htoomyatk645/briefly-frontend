import { motion, useReducedMotion } from 'framer-motion'
import { ThemeIndicator } from '../ui/ThemeIndicator'
import { BrieflyLogo } from './BrieflyLogo'
import { TypewriterText } from './TypewriterText'
import { useWelcomeSequence } from './useWelcomeSequence'

const TAGLINE = 'High-value content, at your fingertips'
const EASE = [0.22, 1, 0.36, 1] as const

type WelcomeScreenProps = {
  onGetStarted: () => void
}

export const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const prefersReducedMotion = useReducedMotion()
  const { showLogo, showTagline, showCta, setShowCta } = useWelcomeSequence()

  return (
    <section className="welcome-screen" aria-label="Welcome to Briefly">
      <div className="welcome-screen__theme">
        <ThemeIndicator />
      </div>

      <div className="welcome-hero">
        <div className="welcome-center">
          <motion.div
            initial={false}
            animate={{
              opacity: showLogo ? 1 : 0,
              scale: showLogo ? 1 : 0.88,
              y: showLogo ? 0 : 10,
            }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.42,
              ease: EASE,
            }}
          >
            <BrieflyLogo />
          </motion.div>

          {showTagline ? (
            <TypewriterText
              as="p"
              className="welcome-tagline"
              text={TAGLINE}
              onComplete={() => setShowCta(true)}
            />
          ) : (
            <p className="welcome-tagline welcome-tagline--placeholder" aria-hidden>
              {TAGLINE}
            </p>
          )}
        </div>
      </div>

      <div className="welcome-footer">
        <motion.button
          type="button"
          className="btn-pill-primary"
          onClick={onGetStarted}
          initial={false}
          animate={{
            opacity: showCta ? 1 : 0,
            y: showCta ? 0 : 12,
          }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.36,
            ease: EASE,
          }}
          style={{ pointerEvents: showCta ? 'auto' : 'none' }}
        >
          Get started
        </motion.button>
      </div>
    </section>
  )
}
