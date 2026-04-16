export interface AIMessage {
  text: string
  followUp?: string[]
}

export const greetings: Record<string, (name: string, streak?: number) => string> = {
  firstDay: (name) =>
    `Welcome, ${name}. You've taken the first step — that matters more than you know. Let's keep it simple today and build from here.`,
  returning: (name) =>
    `Good to see you again, ${name}. Your body adapts a little more each time you show up. Ready to continue?`,
  streak: (name, streak = 3) =>
    `That's ${streak} days in a row, ${name}. Your consistency is building real strength. Today let's work on balance.`,
  afterBreak: (name) =>
    `Welcome back, ${name}. Rest is part of the process — you're here now, and that's what counts.`,
  milestone: (name) =>
    `${name}, you've just hit a milestone. This kind of steady effort is exactly what improves long-term stability.`,
}

export const chatResponses: Record<string, AIMessage> = {
  'How am I doing?': {
    text: `Your balance score has improved by 8 points over the past month — from 64 to 72. You've completed 12 sessions total, and your sway during balance checks has decreased noticeably. The data shows real progress.`,
    followUp: ['Why does this matter?', 'Tell me about today\'s exercises', 'I feel unsteady today'],
  },
  'I feel unsteady today': {
    text: `That's worth paying attention to. Unsteadiness can happen after a poor night's sleep, dehydration, or just an off day. I'd suggest the Gentle Movement session today — it's low intensity and keeps you moving without pushing hard. And as always, stay near support during exercises.`,
    followUp: ['Make it easier', 'Tell me about today\'s exercises', 'Why does this matter?'],
  },
  'Make it easier': {
    text: `Of course. I'll note that for today. The Gentle Movement session uses seated and supported exercises only. You can also reduce reps on any exercise — doing 6 well is better than 10 poorly. Progress isn't always linear, and easier days are part of a good program.`,
    followUp: ['How am I doing?', 'Tell me about today\'s exercises'],
  },
  'Tell me about today\'s exercises': {
    text: `Today is the Balance Builder session: Heel-to-Toe Walk, Single Leg Stand, Side Steps, and Heel Raises. It takes about 12 minutes. The session focuses on dynamic balance — the kind that helps most when navigating everyday environments. All exercises can be done near a chair or wall.`,
    followUp: ['How am I doing?', 'Why does this matter?', 'I feel unsteady today'],
  },
  'Why does this matter?': {
    text: `Falls are the leading cause of injury-related hospital admissions in people over 65 — but they're largely preventable. The exercises in SteadyStep specifically target the muscles and reflexes that catch you when you stumble. Each session makes those systems a little faster and more reliable.`,
    followUp: ['How am I doing?', 'Tell me about today\'s exercises'],
  },
  'Something hurts': {
    text: `Please stop exercising and rest. If the pain is sharp, persistent, or in your chest, contact your doctor or emergency services. For mild discomfort after exercise, that's often normal muscle fatigue — but when in doubt, err on the side of caution. Your safety always comes first.`,
    followUp: ['How am I doing?', 'Make it easier'],
  },
}

export const exerciseEncouragement = [
  'Good form. Take your time.',
  'Breathing steadily? That helps.',
  'Your balance improves a little each session.',
  'Slow and controlled — that\'s the goal.',
  'The muscles working here support every step you take.',
  'You\'re building something real with each repetition.',
  'Consistency matters more than intensity.',
]

export const quickReplies = [
  'How am I doing?',
  'I feel unsteady today',
  'Make it easier',
  'Tell me about today\'s exercises',
  'Why does this matter?',
]
