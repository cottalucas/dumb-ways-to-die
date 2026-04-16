import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { X, Play, Pause, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { CircularTimer } from '../components/exercise/CircularTimer'
import { RepCounter } from '../components/exercise/RepCounter'
import { ExerciseIllustration } from '../components/exercise/ExerciseIllustration'
import { Toast } from '../components/ui/Toast'
import { useUser } from '../context/UserContext'
import { getSessionById } from '../data/sessions'
import { getExerciseById, Exercise } from '../data/exercises'
import { exerciseEncouragement } from '../data/messages'

type Phase = 'overview' | 'transition' | 'active' | 'complete'

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="h-1.5 bg-surface-border mx-5 rounded-full overflow-hidden">
      <div
        className="h-full bg-teal rounded-full transition-all duration-500"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  )
}

export function ExerciseSession() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const { name, setCompletedSessions, completedSessions } = useUser()

  const session = sessionId ? getSessionById(sessionId) : null
  const exerciseList: Exercise[] = (session?.exerciseIds ?? [])
    .map(id => getExerciseById(id))
    .filter(Boolean) as Exercise[]

  const [phase, setPhase] = useState<Phase>('overview')
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [toast, setToast] = useState('')
  const [timerKey, setTimerKey] = useState(0)

  const currentExercise = exerciseList[exerciseIndex]
  const encouragement = exerciseEncouragement[exerciseIndex % exerciseEncouragement.length]

  // Auto-advance transition
  useEffect(() => {
    if (phase === 'transition') {
      const t = setTimeout(() => {
        setPhase('active')
        setTimerKey(k => k + 1)
      }, 2500)
      return () => clearTimeout(t)
    }
  }, [phase])

  const handleNextExercise = useCallback(() => {
    if (exerciseIndex < exerciseList.length - 1) {
      setExerciseIndex(i => i + 1)
      setPaused(false)
      setPhase('transition')
    } else {
      setCompletedSessions(completedSessions + 1)
      setPhase('complete')
    }
  }, [exerciseIndex, exerciseList.length, completedSessions])

  const handleExerciseComplete = useCallback(() => {
    handleNextExercise()
  }, [handleNextExercise])

  const handleExit = () => {
    if (phase === 'overview' || phase === 'complete') {
      navigate('/home')
    } else {
      setShowExitConfirm(true)
    }
  }

  if (!session || exerciseList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-text-secondary">Session not found.</p>
      </div>
    )
  }

  // PHASE: Overview
  if (phase === 'overview') {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex items-center h-14 px-4 gap-3">
          <button onClick={handleExit} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-divider">
            <X size={20} />
          </button>
          <h1 className="font-serif text-xl font-semibold text-text-primary">{session.name}</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6">
          <p className="text-sm text-text-secondary mb-6">{session.durationMinutes} minutes total</p>

          <div className="flex flex-col gap-3 mb-6">
            {exerciseList.map((ex, i) => (
              <div key={ex.id} className="flex items-center gap-4 p-4 bg-white border border-surface-border rounded-card">
                <span className="w-7 h-7 rounded-full bg-teal-light text-teal text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-text-primary">{ex.name}</p>
                  <p className="text-sm text-text-secondary mt-0.5">
                    {ex.reps ? `${ex.reps} reps × ${ex.sets} sets` : `${ex.duration}s × ${ex.sets} sets`}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-l-4 border-accent-orange bg-amber-50 p-4 rounded-r-card">
            <p className="text-sm text-text-primary leading-relaxed">
              <span className="font-semibold">Safety first: </span>
              Stop if you feel pain or dizziness. Your safety comes first.
            </p>
          </div>
        </div>

        <div className="px-5 pb-8 pt-4 border-t border-surface-divider">
          <Button
            variant="primary"
            fullWidth
            rightIcon={<Play size={16} fill="white" />}
            onClick={() => setPhase('active')}
          >
            Begin
          </Button>
        </div>
      </div>
    )
  }

  // PHASE: Transition
  if (phase === 'transition') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 bg-white animate-fade-slide-in"
        onClick={() => { setPhase('active'); setTimerKey(k => k + 1) }}
      >
        <p className="text-sm text-text-muted uppercase tracking-widest mb-3">Up next</p>
        <h2 className="font-serif text-3xl font-semibold text-text-primary text-center mb-4">
          {currentExercise.name}
        </h2>
        <p className="text-base text-text-secondary mb-8">Take a breath if you need it</p>
        <Play size={32} className="text-teal opacity-60" />
        <p className="text-xs text-text-muted mt-6">Tap to start now</p>
      </div>
    )
  }

  // PHASE: Active exercise
  if (phase === 'active') {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="flex items-center h-14 px-4 gap-2">
          <span className="text-sm font-semibold text-text-secondary flex-1">
            Exercise {exerciseIndex + 1} of {exerciseList.length}
          </span>
          <button
            onClick={handleExit}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-divider"
          >
            <X size={20} />
          </button>
        </div>

        <ProgressBar current={exerciseIndex + 1} total={exerciseList.length} />

        <div className="flex-1 overflow-y-auto px-5 pb-4 pt-4">
          <h2 className="font-serif text-[26px] font-semibold text-text-primary mb-4">
            {currentExercise.name}
          </h2>

          <ExerciseIllustration exerciseId={currentExercise.id} className="mb-5" />

          {/* Instructions */}
          <ul className="flex flex-col gap-3 mb-5">
            {currentExercise.instructions.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-teal-light text-teal text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-base text-text-primary leading-relaxed">{step}</p>
              </li>
            ))}
          </ul>

          {/* Timer or rep counter */}
          <div className="flex justify-center mb-5">
            {currentExercise.duration ? (
              <CircularTimer
                key={timerKey}
                totalSeconds={currentExercise.duration}
                autoStart={!paused}
                paused={paused}
                onComplete={handleExerciseComplete}
              />
            ) : (
              <RepCounter
                totalReps={currentExercise.reps!}
                totalSets={currentExercise.sets}
                onSetComplete={() => {}}
                onAllComplete={handleExerciseComplete}
              />
            )}
          </div>

          {/* AI Tip */}
          <div className="bg-ai-bubble px-4 py-3 rounded-card mb-4">
            <p className="text-sm text-text-secondary leading-relaxed">{encouragement}</p>
          </div>

          {/* Adjust difficulty */}
          <div className="flex justify-center gap-6">
            <button
              onClick={() => setToast("Got it, we'll adjust")}
              className="text-sm text-text-muted hover:text-text-secondary"
            >
              Too Easy
            </button>
            <button
              onClick={() => setToast("Got it, we'll adjust")}
              className="text-sm text-text-muted hover:text-text-secondary"
            >
              Too Hard
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="px-5 pb-8 pt-3 border-t border-surface-divider flex gap-3">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={paused ? <Play size={14} /> : <Pause size={14} />}
            onClick={() => setPaused(p => !p)}
            className="flex-1"
          >
            {paused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            rightIcon={<ChevronRight size={14} />}
            onClick={handleNextExercise}
            className="flex-1"
          >
            {exerciseIndex < exerciseList.length - 1 ? 'Next Exercise' : 'Finish'}
          </Button>
        </div>

        {/* Exit confirm */}
        {showExitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6" onClick={() => setShowExitConfirm(false)}>
            <div className="bg-white rounded-card p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
              <h3 className="font-semibold text-text-primary text-lg mb-2">Exit session?</h3>
              <p className="text-sm text-text-secondary mb-5">Your progress for this session won't be saved.</p>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" fullWidth onClick={() => setShowExitConfirm(false)}>
                  Keep going
                </Button>
                <Button variant="destructive" size="sm" fullWidth onClick={() => navigate('/home')}>
                  Exit
                </Button>
              </div>
            </div>
          </div>
        )}

        <Toast message={toast} visible={!!toast} onHide={() => setToast('')} />
      </div>
    )
  }

  // PHASE: Complete
  return (
    <div className="min-h-screen flex flex-col px-5 pb-8 pt-6 items-center">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Checkmark animation */}
        <div className="w-20 h-20 rounded-full bg-teal-light flex items-center justify-center mb-6 animate-scale-in">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path
              className="check-path"
              d="M10 22 L18 30 L34 14"
              stroke="#1A8A7D"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="font-serif text-4xl font-semibold text-text-primary mb-2">Session Complete</h1>
        <p className="text-lg text-text-secondary mb-6">Well done, {name}</p>

        {/* Stats */}
        <div className="w-full bg-white border border-surface-border rounded-card p-5 mb-4 text-left">
          <div className="flex justify-between mb-3">
            <span className="text-sm text-text-secondary">Duration</span>
            <span className="font-semibold text-text-primary">{session.durationMinutes} min</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm text-text-secondary">Exercises completed</span>
            <span className="font-semibold text-text-primary">{exerciseList.length} of {exerciseList.length}</span>
          </div>
          <div className="bg-ai-bubble p-3 rounded-btn">
            <p className="text-sm text-text-primary leading-relaxed">
              That's 3 days in a row! Your consistency is building real strength.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <Button variant="primary" fullWidth onClick={() => navigate('/home')}>
          Back to Home
        </Button>
        <Button variant="ghost" fullWidth onClick={() => navigate('/progress')}>
          View Progress
        </Button>
      </div>
    </div>
  )
}
