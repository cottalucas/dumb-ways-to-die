export interface WeekData {
  label: string
  sessions: number
  minutes: number
  balanceScore: number
  dailyActivity: boolean[]
}

export const weeklyProgress: WeekData[] = [
  {
    label: 'Week 1',
    sessions: 2,
    minutes: 22,
    balanceScore: 58,
    dailyActivity: [false, true, false, false, true, false, false],
  },
  {
    label: 'Week 2',
    sessions: 3,
    minutes: 35,
    balanceScore: 63,
    dailyActivity: [true, false, true, false, false, true, false],
  },
  {
    label: 'Week 3',
    sessions: 4,
    minutes: 48,
    balanceScore: 68,
    dailyActivity: [true, true, false, true, false, true, false],
  },
  {
    label: 'This week',
    sessions: 3,
    minutes: 38,
    balanceScore: 72,
    dailyActivity: [true, false, true, true, false, false, false],
  },
]

export interface BalanceCheck {
  date: string
  swayScore: number
  weekLabel: string
}

export const balanceChecks: BalanceCheck[] = [
  { date: '2026-03-25', swayScore: 62, weekLabel: 'Week 1' },
  { date: '2026-04-02', swayScore: 68, weekLabel: 'Week 2' },
  { date: '2026-04-10', swayScore: 74, weekLabel: 'Week 4' },
]

export interface RecentSession {
  id: string
  date: string
  sessionName: string
  durationMinutes: number
  difficulty: 1 | 2 | 3
}

export const recentSessions: RecentSession[] = [
  { id: '1', date: 'Today', sessionName: 'Balance Builder', durationMinutes: 12, difficulty: 2 },
  { id: '2', date: 'Yesterday', sessionName: 'Strength & Stability', durationMinutes: 14, difficulty: 1 },
  { id: '3', date: '2 days ago', sessionName: 'Balance Builder', durationMinutes: 12, difficulty: 2 },
  { id: '4', date: 'Apr 12', sessionName: 'Gentle Movement', durationMinutes: 10, difficulty: 1 },
  { id: '5', date: 'Apr 10', sessionName: 'Strength & Stability', durationMinutes: 14, difficulty: 1 },
]
