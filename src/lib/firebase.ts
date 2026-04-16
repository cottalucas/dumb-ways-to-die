import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBFBhFkGCAZ-829cVp7_v1RQuPkJA8kUyw',
  authDomain: 'dumb-ways-to-die-81794.firebaseapp.com',
  projectId: 'dumb-ways-to-die-81794',
  storageBucket: 'dumb-ways-to-die-81794.firebasestorage.app',
  messagingSenderId: '838312861104',
  appId: '1:838312861104:web:1bf0569b415468ef714a75',
  measurementId: 'G-7PNYVPJVFL',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Analytics: only load in browser environments
if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics }) => getAnalytics(app))
}

export default app
