export interface SessionTemplate {
  id: string
  name: string
  focus: string
  exerciseIds: string[]
  durationMinutes: number
  difficulty: 1 | 2 | 3
  description: string
}

export const sessionTemplates: SessionTemplate[] = [
  {
    id: 'session-balance-focus',
    name: 'Balance Builder',
    focus: 'Balance focus',
    exerciseIds: ['heel-to-toe-walk', 'single-leg-stand', 'side-steps', 'heel-raises'],
    durationMinutes: 12,
    difficulty: 2,
    description: 'A session focused on improving your dynamic balance and stability through progressive challenges.',
  },
  {
    id: 'session-strength-stability',
    name: 'Strength & Stability',
    focus: 'Strength',
    exerciseIds: ['sit-to-stand', 'heel-raises', 'seated-knee-extension', 'single-leg-stand'],
    durationMinutes: 14,
    difficulty: 1,
    description: 'Build the lower-body strength that supports every step you take. Suitable for beginners.',
  },
  {
    id: 'session-gentle-movement',
    name: 'Gentle Movement',
    focus: 'Low intensity',
    exerciseIds: ['seated-knee-extension', 'heel-raises', 'sit-to-stand'],
    durationMinutes: 10,
    difficulty: 1,
    description: 'A lighter session for days when you want to keep moving without overexerting. All exercises can be done seated or with support.',
  },
]

export const todaySession = sessionTemplates[0]

export function getSessionById(id: string): SessionTemplate | undefined {
  return sessionTemplates.find(s => s.id === id)
}
