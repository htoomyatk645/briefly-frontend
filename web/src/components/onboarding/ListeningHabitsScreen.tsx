import { useCallback, useMemo, useState } from 'react'
import { ListeningHabitCard } from './ListeningHabitCard'
import {
  LISTENING_HABITS,
  MIN_HABIT_SELECTIONS,
} from './listeningHabits'
import './listening-habits.css'

export type ListeningHabitsScreenProps = {
  onComplete: (habits: string[]) => void
}

export const ListeningHabitsScreen = ({
  onComplete,
}: ListeningHabitsScreenProps) => {
  const [selected, setSelected] = useState<string[]>([])

  const canContinue = selected.length >= MIN_HABIT_SELECTIONS

  const ctaLabel = useMemo(() => {
    if (selected.length === 0) return 'Pick at least 1'
    return 'Continue'
  }, [selected.length])

  const handleToggle = useCallback((id: string) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }, [])

  const handleContinue = () => {
    if (!canContinue) return
    onComplete(selected)
  }

  return (
    <section
      className="listening-habits listening-habits--shelled"
      aria-label="How do you listen?"
    >
      <header className="listening-habits__header">
        <h1 className="listening-habits__title">How do you listen?</h1>
        <p className="listening-habits__subtitle">
          Choose every context that fits. We&apos;ll shape length and pacing
          around your routine.
        </p>
      </header>

      <div className="listening-habits__scroll">
        <div
          className="listening-habits__grid"
          role="group"
          aria-label="Listening contexts"
        >
          {LISTENING_HABITS.map((habit, index) => (
            <ListeningHabitCard
              key={habit.id}
              id={habit.id}
              label={habit.label}
              description={habit.description}
              icon={habit.Icon}
              tone={habit.tone}
              isSelected={selected.includes(habit.id)}
              onToggle={handleToggle}
              index={index}
            />
          ))}
        </div>
      </div>

      <footer className="listening-habits__footer">
        <button
          type="button"
          className="btn-pill-primary"
          disabled={!canContinue}
          onClick={handleContinue}
        >
          {ctaLabel}
        </button>
      </footer>
    </section>
  )
}
