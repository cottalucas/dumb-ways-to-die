import {
  collection, getDocs, query, orderBy, doc, setDoc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export interface WeeklyProgressRecord {
  weekId: string
  label: string
  sessions: number
  minutes: number
  balanceScore: number
  dailyActivity: boolean[]
}

export async function getWeeklyProgress(userId: string): Promise<WeeklyProgressRecord[]> {
  const q = query(
    collection(db, 'users', userId, 'weeklyProgress'),
    orderBy('weekId', 'asc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => {
    const data = d.data()
    return {
      weekId: data.weekId,
      label: data.label,
      sessions: data.sessions,
      minutes: data.minutes,
      balanceScore: data.balanceScore,
      dailyActivity: data.dailyActivity,
    }
  })
}

export async function upsertWeeklyProgress(
  userId: string,
  weekId: string,
  data: Partial<Omit<WeeklyProgressRecord, 'weekId'>>,
): Promise<void> {
  await setDoc(
    doc(db, 'users', userId, 'weeklyProgress', weekId),
    { weekId, ...data, updatedAt: serverTimestamp() },
    { merge: true },
  )
}
