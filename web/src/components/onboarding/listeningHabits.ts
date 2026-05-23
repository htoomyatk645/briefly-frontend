import type { ComponentType, SVGProps } from 'react'
import {
  IconCommute,
  IconSleep,
  IconWork,
  IconWorkout,
} from './ListeningHabitIcons'

export type ListeningHabit = {
  id: string
  label: string
  description: string
  tone: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const LISTENING_HABITS: ListeningHabit[] = [
  {
    id: 'commute',
    label: 'On my commute',
    description: 'Short episodes under 30 min',
    tone: 'commute',
    Icon: IconCommute,
  },
  {
    id: 'work',
    label: 'While I work',
    description: 'Focused listens between meetings',
    tone: 'work',
    Icon: IconWork,
  },
  {
    id: 'sleep',
    label: 'Before I sleep',
    description: 'Calm stories to wind down',
    tone: 'sleep',
    Icon: IconSleep,
  },
  {
    id: 'workout',
    label: 'During workouts',
    description: 'High-energy episodes that move with you',
    tone: 'workout',
    Icon: IconWorkout,
  },
]

export const MIN_HABIT_SELECTIONS = 1
