import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Exercise } from '../data/exercises'

export async function getExercises(): Promise<Exercise[]> {
  const snap = await getDocs(collection(db, 'exercises'))
  return snap.docs.map(d => d.data() as Exercise)
}
