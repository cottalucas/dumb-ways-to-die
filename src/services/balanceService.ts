import {
  collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export interface BalanceCheckRecord {
  id?: string
  swayScore: number
  completedAt: Date
}

export async function logBalanceCheck(userId: string, check: { swayScore: number }): Promise<void> {
  await addDoc(collection(db, 'users', userId, 'balanceChecks'), {
    swayScore: check.swayScore,
    completedAt: serverTimestamp(),
  })
}

export async function getBalanceChecks(userId: string): Promise<BalanceCheckRecord[]> {
  const q = query(
    collection(db, 'users', userId, 'balanceChecks'),
    orderBy('completedAt', 'asc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => {
    const data = d.data()
    return {
      id: d.id,
      swayScore: data.swayScore,
      completedAt: (data.completedAt as Timestamp)?.toDate() ?? new Date(),
    }
  })
}
