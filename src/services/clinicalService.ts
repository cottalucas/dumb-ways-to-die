import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

export type DizzinessLevel = 'none' | 'some' | 'strong'
export type PainLevel = 'none' | 'some' | 'yes'
export type EnergyLevel = 'good' | 'ok' | 'tired'

export interface ClinicalCheck {
  dizziness: DizzinessLevel
  pain: PainLevel
  energy: EnergyLevel
}

export async function logClinicalCheck(
  userId: string,
  check: ClinicalCheck,
): Promise<string> {
  const ref = await addDoc(
    collection(db, 'users', userId, 'clinicalChecks'),
    { ...check, recordedAt: serverTimestamp() },
  )
  return ref.id
}
