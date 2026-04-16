import React, { createContext, useContext, useState } from 'react'

interface UserContextType {
  name: string
  balanceConfidence: number
  hasFallenLastYear: boolean
  completedSessions: number
  currentStreak: number
  setName: (name: string) => void
  setBalanceConfidence: (level: number) => void
  setHasFallenLastYear: (val: boolean) => void
  setCompletedSessions: (n: number) => void
  setCurrentStreak: (n: number) => void
  reset: () => void
}

const UserContext = createContext<UserContextType | null>(null)

const DEFAULT_STATE = {
  name: '',
  balanceConfidence: 0,
  hasFallenLastYear: false,
  completedSessions: 12,
  currentStreak: 3,
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState(DEFAULT_STATE.name)
  const [balanceConfidence, setBalanceConfidence] = useState(DEFAULT_STATE.balanceConfidence)
  const [hasFallenLastYear, setHasFallenLastYear] = useState(DEFAULT_STATE.hasFallenLastYear)
  const [completedSessions, setCompletedSessions] = useState(DEFAULT_STATE.completedSessions)
  const [currentStreak, setCurrentStreak] = useState(DEFAULT_STATE.currentStreak)

  const reset = () => {
    setName(DEFAULT_STATE.name)
    setBalanceConfidence(DEFAULT_STATE.balanceConfidence)
    setHasFallenLastYear(DEFAULT_STATE.hasFallenLastYear)
    setCompletedSessions(DEFAULT_STATE.completedSessions)
    setCurrentStreak(DEFAULT_STATE.currentStreak)
  }

  return (
    <UserContext.Provider
      value={{
        name, setName,
        balanceConfidence, setBalanceConfidence,
        hasFallenLastYear, setHasFallenLastYear,
        completedSessions, setCompletedSessions,
        currentStreak, setCurrentStreak,
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
