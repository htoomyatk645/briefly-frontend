import type { FormEvent } from 'react'
import type { AgeGroup, UserProfile } from './types'

type EmailProfileScreenProps = {
  profile: UserProfile
  onChange: (profile: UserProfile) => void
  onContinue: () => void
}

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const EmailProfileScreen = ({
  profile,
  onChange,
  onContinue,
}: EmailProfileScreenProps) => {
  const canContinue =
    profile.firstName.trim().length > 0 &&
    profile.lastName.trim().length > 0 &&
    isValidEmail(profile.email.trim()) &&
    profile.ageGroup !== null

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canContinue) return
    onContinue()
  }

  return (
    <section
      className="form-screen form-screen--shelled"
      aria-label="Create your profile"
    >
      <form className="form-screen__body" onSubmit={handleSubmit}>
        <header className="form-screen__header">
          <h1 className="form-screen__title">
            <span className="form-screen__title-line">
              <em>Hello!</em> Welcome to
            </span>
            <span className="form-screen__title-brand">Briefly</span>
          </h1>
          <p className="form-screen__subtitle">A few things first...</p>
        </header>

        <div className="form-fields">
          <label className="field">
            <span className="field__label">First name</span>
            <input
              className="field__input"
              type="text"
              name="firstName"
              autoComplete="given-name"
              value={profile.firstName}
              onChange={(e) =>
                onChange({ ...profile, firstName: e.target.value })
              }
              placeholder="Alex"
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Last name</span>
            <input
              className="field__input"
              type="text"
              name="lastName"
              autoComplete="family-name"
              value={profile.lastName}
              onChange={(e) =>
                onChange({ ...profile, lastName: e.target.value })
              }
              placeholder="Smith"
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Email</span>
            <input
              className="field__input"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={profile.email}
              onChange={(e) => onChange({ ...profile, email: e.target.value })}
              placeholder="alex@email.com"
              required
            />
          </label>

          <fieldset className="field field--radio">
            <legend className="field__label">Age</legend>
            <label className="radio-option">
              <input
                type="radio"
                name="ageGroup"
                value="over18"
                checked={profile.ageGroup === 'over18'}
                onChange={() =>
                  onChange({ ...profile, ageGroup: 'over18' as AgeGroup })
                }
              />
              <span className="radio-option__control" aria-hidden />
              <span>I am 18 years old or over</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="ageGroup"
                value="under18"
                checked={profile.ageGroup === 'under18'}
                onChange={() =>
                  onChange({ ...profile, ageGroup: 'under18' as AgeGroup })
                }
              />
              <span className="radio-option__control" aria-hidden />
              <span>I am under 18 years old</span>
            </label>
          </fieldset>
        </div>

        <div className="form-screen__footer">
          <button
            type="submit"
            className="btn-pill-primary"
            disabled={!canContinue}
          >
            Continue
          </button>
        </div>
      </form>
    </section>
  )
}
