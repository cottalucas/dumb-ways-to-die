export interface Milestone {
  id: string
  title: string
  description: string
  achieved: boolean
  achievedDate?: string
  icon: string
}

export const milestones: Milestone[] = [
  {
    id: 'first-session',
    title: 'First Step',
    description: 'Completed your first exercise session.',
    achieved: true,
    achievedDate: '2026-03-20',
    icon: '🌱',
  },
  {
    id: 'five-sessions',
    title: 'Finding Your Rhythm',
    description: 'Completed 5 sessions.',
    achieved: true,
    achievedDate: '2026-03-28',
    icon: '🏃',
  },
  {
    id: 'ten-sessions',
    title: 'Building Momentum',
    description: 'Completed 10 sessions. Consistency is creating real change.',
    achieved: true,
    achievedDate: '2026-04-08',
    icon: '⚡',
  },
  {
    id: 'single-leg-15s',
    title: 'One-Legged Achiever',
    description: 'Held a single leg stand for the full 15 seconds.',
    achieved: true,
    achievedDate: '2026-04-05',
    icon: '🦩',
  },
  {
    id: 'four-week-streak',
    title: 'Monthly Milestone',
    description: 'Completed sessions in all 4 weeks of a month.',
    achieved: true,
    achievedDate: '2026-04-15',
    icon: '📅',
  },
  {
    id: 'five-in-one-week',
    title: 'Five-Day Week',
    description: 'Complete 5 sessions in a single week.',
    achieved: false,
    icon: '🗓️',
  },
  {
    id: 'twenty-sessions',
    title: 'Committed',
    description: 'Reach 20 total sessions.',
    achieved: false,
    icon: '🏅',
  },
  {
    id: 'balance-score-80',
    title: 'Balance Champion',
    description: 'Achieve a balance score of 80 or higher.',
    achieved: false,
    icon: '🎯',
  },
]
