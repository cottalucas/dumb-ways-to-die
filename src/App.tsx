import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { UserProvider, useUser } from './context/UserContext'
import { Onboarding } from './screens/Onboarding'
import { Home } from './screens/Home'
import { Exercises } from './screens/Exercises'
import { ExerciseSession } from './screens/ExerciseSession'
import { Chat } from './screens/Chat'
import { Progress } from './screens/Progress'
import { BalanceCheck } from './screens/BalanceCheck'
import { Profile } from './screens/Profile'

function AppRoutes() {
  const { name } = useUser()

  return (
    <Routes>
      <Route
        path="/"
        element={
          name ? <Navigate to="/home" replace /> : (
            <AppShell showTabBar={false}>
              <Onboarding />
            </AppShell>
          )
        }
      />
      <Route
        path="/home"
        element={
          !name ? <Navigate to="/" replace /> : (
            <AppShell showTabBar>
              <Home />
            </AppShell>
          )
        }
      />
      <Route
        path="/exercises"
        element={
          !name ? <Navigate to="/" replace /> : (
            <AppShell showTabBar>
              <Exercises />
            </AppShell>
          )
        }
      />
      <Route
        path="/session/:sessionId"
        element={
          !name ? <Navigate to="/" replace /> : (
            <AppShell showTabBar={false}>
              <ExerciseSession />
            </AppShell>
          )
        }
      />
      <Route
        path="/chat"
        element={
          !name ? <Navigate to="/" replace /> : (
            <AppShell showTabBar={false}>
              <Chat />
            </AppShell>
          )
        }
      />
      <Route
        path="/progress"
        element={
          !name ? <Navigate to="/" replace /> : (
            <AppShell showTabBar>
              <Progress />
            </AppShell>
          )
        }
      />
      <Route
        path="/balance-check"
        element={
          !name ? <Navigate to="/" replace /> : (
            <AppShell showTabBar={false}>
              <BalanceCheck />
            </AppShell>
          )
        }
      />
      <Route
        path="/profile"
        element={
          !name ? <Navigate to="/" replace /> : (
            <AppShell showTabBar>
              <Profile />
            </AppShell>
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export function App() {
  return (
    <HashRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </HashRouter>
  )
}

export default App
