import {
  doc, getDoc, updateDoc, serverTimestamp,
  collection, writeBatch,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { weeklyProgress as mockWeeklyProgress, balanceChecks as mockBalanceChecks } from '../data/progress'

export interface UserProfile {
  name: string
  balanceConfidence: number
  hasFallenLastYear: boolean
  completedSessions: number
  currentStreak: number
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', userId))
  if (!snap.exists()) return null
  const d = snap.data()
  return {
    name: d.name,
    balanceConfidence: d.balanceConfidence,
    hasFallenLastYear: d.hasFallenLastYear,
    completedSessions: d.completedSessions,
    currentStreak: d.currentStreak,
  }
}

// Called once on first onboarding submit.
// Also seeds initial demo progress data so the Progress screen looks populated.
export async function createProfile(userId: string, data: UserProfile): Promise<void> {
  const batch = writeBatch(db)

  // Write user profile
  batch.set(doc(db, 'users', userId), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  // Seed 4 weeks of demo weekly progress
  mockWeeklyProgress.forEach((week, i) => {
    const weekId = `2026-W${(13 + i).toString().padStart(2, '0')}`
    batch.set(doc(db, 'users', userId, 'weeklyProgress', weekId), {
      weekId,
      label: week.label,
      sessions: week.sessions,
      minutes: week.minutes,
      balanceScore: week.balanceScore,
      dailyActivity: week.dailyActivity,
      updatedAt: serverTimestamp(),
    })
  })

  // Seed demo balance checks
  mockBalanceChecks.forEach((check) => {
    const ref = doc(collection(db, 'users', userId, 'balanceChecks'))
    batch.set(ref, {
      swayScore: check.swayScore,
      completedAt: new Date(check.date),
    })
  })

  await batch.commit()
}

export async function updateProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
  await updateDoc(doc(db, 'users', userId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}
