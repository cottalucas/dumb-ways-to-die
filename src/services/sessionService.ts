import {
  collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export interface SessionRecord {
  id?: string
  sessionTemplateId: string
  sessionName: string
  durationMinutes: number
  exercisesCompleted: number
  totalExercises: number
  completedAt: Date
}

export async function logSession(userId: string, session: Omit<SessionRecord, 'id' | 'completedAt'>): Promise<void> {
  await addDoc(collection(db, 'users', userId, 'sessions'), {
    ...session,
    completedAt: serverTimestamp(),
  })
}

export async function getSessions(userId: string): Promise<SessionRecord[]> {
  const q = query(
    collection(db, 'users', userId, 'sessions'),
    orderBy('completedAt', 'desc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => {
    const data = d.data()
    return {
      id: d.id,
      sessionTemplateId: data.sessionTemplateId,
      sessionName: data.sessionName,
      durationMinutes: data.durationMinutes,
      exercisesCompleted: data.exercisesCompleted,
      totalExercises: data.totalExercises,
      completedAt: (data.completedAt as Timestamp)?.toDate() ?? new Date(),
    }
  })
}
