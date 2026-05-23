import { AppleIcon, EmailIcon, FacebookIcon, GoogleIcon } from './AuthIcons'

type SignUpScreenProps = {
  onGoogle: () => void
  onApple: () => void
  onFacebook: () => void
  onEmail: () => void
  onForgotPassword?: () => void
}

export const SignUpScreen = ({
  onGoogle,
  onApple,
  onFacebook,
  onEmail,
  onForgotPassword,
}: SignUpScreenProps) => (
  <section className="signup-screen signup-screen--shelled" aria-label="Sign up or log in">
    <div className="signup-content">
      <h2 className="signup-title">Sign up or log in</h2>

      <div className="signup-actions">
        <button
          type="button"
          className="btn-auth btn-auth--google"
          onClick={onGoogle}
        >
          <span className="btn-auth__icon">
            <GoogleIcon />
          </span>
          Continue with Google
        </button>

        <button
          type="button"
          className="btn-auth btn-auth--apple"
          onClick={onApple}
        >
          <span className="btn-auth__icon">
            <AppleIcon />
          </span>
          Continue with Apple
        </button>

        <button
          type="button"
          className="btn-auth btn-auth--facebook"
          onClick={onFacebook}
        >
          <span className="btn-auth__icon">
            <FacebookIcon />
          </span>
          Continue with Facebook
        </button>

        <div className="signup-divider" role="separator">
          or
        </div>

        <button
          type="button"
          className="btn-auth btn-auth--email"
          onClick={onEmail}
        >
          <span className="btn-auth__icon">
            <EmailIcon />
          </span>
          Use Email
        </button>

        {onForgotPassword ? (
          <button
            type="button"
            className="signup-forgot"
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
        ) : null}
      </div>
    </div>
  </section>
)
