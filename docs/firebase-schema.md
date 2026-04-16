# Firebase Schema

All data lives under `users/{userId}/` subcollections, except the shared exercise library.

## `exercises/{exerciseId}` (top-level, read-only)
Seeded once via `src/scripts/seedExercises.ts`. Mirrors `src/data/exercises.ts`.

```ts
{
  id: string
  name: string
  description: string
  instructions: [string, string, string]
  duration: number | null
  reps: number | null
  sets: number
  difficulty: 1 | 2 | 3
  muscleGroup: string
  safetyTip: string
}
```

## `users/{userId}` (document)
Created on first onboarding submit. Updated via `updateProfile`.

```ts
{
  name: string
  balanceConfidence: number          // 1–5
  hasFallenLastYear: boolean
  completedSessions: number
  currentStreak: number
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

## `users/{userId}/sessions/{autoId}`
Written on session complete.

```ts
{
  sessionTemplateId: string
  sessionName: string
  durationMinutes: number
  exercisesCompleted: number
  totalExercises: number
  completedAt: Timestamp
}
```

## `users/{userId}/balanceChecks/{autoId}`
Written when balance check completes.

```ts
{
  swayScore: number
  completedAt: Timestamp
}
```

## `users/{userId}/weeklyProgress/{weekId}`
`weekId` format: `"YYYY-WNN"` e.g. `"2026-W15"`.
Created or merged via `upsertWeeklyProgress`.

```ts
{
  weekId: string
  label: string                      // e.g. "Week 1", "This week"
  sessions: number
  minutes: number
  balanceScore: number
  dailyActivity: boolean[]           // length 7, Mon–Sun
  updatedAt: Timestamp
}
```

## `users/{userId}/chatMessages/{autoId}`
Written by both user taps and AI responses.

```ts
{
  sender: 'ai' | 'user'
  text: string
  timestamp: Timestamp
}
```
