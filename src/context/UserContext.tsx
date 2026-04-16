import React, { createContext, useContext, useState, useEffect } from 'react'
import { getOrCreateUserId } from '../lib/userId'
import { getProfile, createProfile, updateProfile, UserProfile } from '../services/userService'

interface UserContextType {
  userId: string
  name: string
  balanceConfidence: number
  hasFallenLastYear: boolean
  completedSessions: number
  currentStreak: number
  loading: boolean
  // Called once from Onboarding on final submit — writes all three values to Firestore at once
  completeOnboarding: (name: string, confidence: number, fallen: boolean) => Promise<void>
  // Called from Profile for post-onboarding edits
  setName: (name: string) => void
  setBalanceConfidence: (level: number) => void
  setCompletedSessions: (n: number) => void
  setCurrentStreak: (n: number) => void
  reset: () => void
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId] = useState(() => getOrCreateUserId())
  const [name, setNameState] = useState('')
  const [balanceConfidence, setBalanceConfidenceState] = useState(0)
  const [hasFallenLastYear, setHasFallenLastYear] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  // Load profile from Firestore on mount
  useEffect(() => {
    getProfile(userId)
      .then(profile => {
        if (profile) {
          setNameState(profile.name)
          setBalanceConfidenceState(profile.balanceConfidence)
          setHasFallenLastYear(profile.hasFallenLastYear)
          setCompletedSessions(profile.completedSessions)
          setCurrentStreak(profile.currentStreak)
        }
      })
      .catch(err => console.error('Failed to load profile:', err))
      .finally(() => setLoading(false))
  }, [userId])

  // Called once from Onboarding — writes profile + seeds demo data
  const completeOnboarding = async (n: string, confidence: number, fallen: boolean) => {
    const profile: UserProfile = {
      name: n,
      balanceConfidence: confidence,
      hasFallenLastYear: fallen,
      completedSessions: 12,
      currentStreak: 3,
    }
    await createProfile(userId, profile)
    setNameState(n)
    setBalanceConfidenceState(confidence)
    setHasFallenLastYear(fallen)
    setCompletedSessions(12)
    setCurrentStreak(3)
  }

  // Called from Profile screen — partial Firestore update
  const setName = (n: string) => {
    setNameState(n)
    updateProfile(userId, { name: n }).catch(err => console.error('updateProfile failed:', err))
  }

  const setBalanceConfidence = (level: number) => {
    setBalanceConfidenceState(level)
    updateProfile(userId, { balanceConfidence: level }).catch(err => console.error('updateProfile failed:', err))
  }

  const reset = () => {
    setNameState('')
    setBalanceConfidenceState(0)
    setHasFallenLastYear(false)
    setCompletedSessions(0)
    setCurrentStreak(0)
    localStorage.removeItem('steadystep_user_id')
  }

  return (
    <UserContext.Provider
      value={{
        userId,
        name,
        balanceConfidence,
        hasFallenLastYear,
        completedSessions,
        currentStreak,
        loading,
        completeOnboarding,
        setName,
        setBalanceConfidence,
        setCompletedSessions,
        setCurrentStreak,
        reset,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside UserProvider')
  return ctx
}
