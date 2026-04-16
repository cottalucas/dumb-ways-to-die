import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Clock, Dumbbell, Smartphone, Play, ChevronRight } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { StreakBar } from '../components/progress/StreakBar'
import { useUser } from '../context/UserContext'
import { todaySession } from '../data/sessions'
import { weeklyProgress as mockWeekly } from '../data/progress'
import { greetings } from '../data/messages'
import { getWeeklyProgress, WeeklyProgressRecord } from '../services/progressService'

function DifficultyDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3].map(i => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${i <= level ? 'bg-teal' : 'bg-surface-border'}`}
        />
      ))}
    </span>
  )
}

export function Home() {
  const navigate = useNavigate()
  const { userId, name, currentStreak } = useUser()
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-CH', { weekday: 'long', month: 'long', day: 'numeric' })
  const todayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1
  const aiMessage = greetings.streak(name, currentStreak)

  const [currentWeek, setCurrentWeek] = useState<WeeklyProgressRecord | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getWeeklyProgress(userId)
      .then(weeks => {
        if (weeks.length > 0) {
          setCurrentWeek(weeks[weeks.length - 1])
        } else {
          // Fallback to mock for demo if Firestore is empty
          const mock = mockWeekly[mockWeekly.length - 1]
          setCurrentWeek({ ...mock, weekId: 'mock' })
        }
      })
      .catch(() => setError("Could not load this week's data."))
  }, [userId])

  const weekData = currentWeek ?? { ...mockWeekly[mockWeekly.length - 1], weekId: 'fallback' }

  return (
    <div className="px-5 pt-6 pb-6">
      {error && <p className="text-sm text-accent-red mb-3">{error}</p>}

      {/* Greeting */}
      <div className="mb-5 stagger-children">
        <h1 className="font-serif text-2xl font-semibold text-text-primary animate-fade-slide-in">
          Good morning, {name} 👋
        </h1>
        <p className="text-sm text-text-secondary mt-1 animate-fade-slide-in">{dateStr}</p>
      </div>

      {/* AI Companion card */}
      <Card className="mb-4 animate-fade-slide-in" style={{ animationDelay: '50ms' }}>
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-teal flex-shrink-0 flex items-center justify-center">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base text-text-primary leading-relaxed">{aiMessage}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/chat')}
          className="mt-4 w-full flex items-center justify-between py-3 px-4 rounded-btn bg-teal-light text-teal font-semibold text-base hover:bg-teal hover:text-white transition-colors"
        >
          <span>Chat with me</span>
          <ChevronRight size={18} />
        </button>
      </Card>

      {/* Today's Session — hero */}
      <Card variant="elevated" className="mb-4 animate-fade-slide-in" style={{ animationDelay: '100ms' }}>
        <span className="text-xs font-bold tracking-widest text-teal uppercase">Today's Session</span>
        <h2 className="font-serif text-2xl font-semibold text-text-primary mt-1 mb-3">
          {todaySession.name}
        </h2>
        <div className="flex items-center gap-5 text-sm text-text-secondary mb-4">
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {todaySession.durationMinutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <Dumbbell size={14} /> {todaySession.exerciseIds.length} exercises
          </span>
          <DifficultyDots level={todaySession.difficulty} />
        </div>
        <Button
          variant="primary"
          fullWidth
          rightIcon={<Play size={16} fill="white" />}
          onClick={() => navigate(`/session/${todaySession.id}`)}
        >
          Start Session
        </Button>
      </Card>

      {/* Weekly streak */}
      <Card className="mb-4 animate-fade-slide-in" style={{ animationDelay: '150ms' }}>
        <h3 className="text-lg font-semibold text-text-primary mb-4">This week</h3>
        <StreakBar dailyActivity={weekData.dailyActivity} todayIndex={todayIndex} />
        <p className="text-sm text-text-secondary mt-4">
          {weekData.sessions} of 5 days completed this week
        </p>
      </Card>

      {/* Balance Check card */}
      <button
        onClick={() => navigate('/balance-check')}
        className="w-full text-left animate-fade-slide-in"
        style={{ animationDelay: '200ms' }}
      >
        <Card className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-teal-light flex items-center justify-center flex-shrink-0">
            <Smartphone size={20} className="text-teal" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-text-primary">Quick Balance Check</h3>
            <p className="text-sm text-text-secondary mt-0.5 leading-tight">
              30-second assessment using your phone's motion sensors
            </p>
          </div>
          <ChevronRight size={18} className="text-text-muted flex-shrink-0" />
        </Card>
      </button>
    </div>
  )
}
