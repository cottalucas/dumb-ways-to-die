// Run once: npx ts-node src/scripts/seedExercises.ts
// Writes all exercises from src/data/exercises.ts to Firestore exercises/ collection.

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { exercises } from '../data/exercises'

const firebaseConfig = {
  apiKey: 'AIzaSyBFBhFkGCAZ-829cVp7_v1RQuPkJA8kUyw',
  authDomain: 'dumb-ways-to-die-81794.firebaseapp.com',
  projectId: 'dumb-ways-to-die-81794',
  storageBucket: 'dumb-ways-to-die-81794.firebasestorage.app',
  messagingSenderId: '838312861104',
  appId: '1:838312861104:web:1bf0569b415468ef714a75',
}

async function seed() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  for (const exercise of exercises) {
    await setDoc(doc(db, 'exercises', exercise.id), exercise)
    console.log(`✓ Seeded: ${exercise.name}`)
  }

  console.log(`\nDone — ${exercises.length} exercises written to Firestore exercises/ collection.`)
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
