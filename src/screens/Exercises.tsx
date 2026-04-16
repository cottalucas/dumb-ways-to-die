import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Dumbbell, ChevronRight, X, Plus } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { exercises, Exercise } from '../data/exercises'
import { sessionTemplates, todaySession } from '../data/sessions'

function DifficultyDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="flex gap-0.5 items-center">
      {[1, 2, 3].map(i => (
        <span key={i} className={`w-2 h-2 rounded-full ${i <= level ? 'bg-teal' : 'bg-surface-border'}`} />
      ))}
    </span>
  )
}

const MUSCLE_COLORS: Record<string, string> = {
  'Calves & ankles': '#1A8A7D',
  'Quadriceps & glutes': '#E8913A',
  'Balance & coordination': '#3BA676',
  'Core & balance': '#5B8DEF',
  'Hip abductors': '#9B6CF9',
  'Quadriceps': '#E8913A',
}

function ExerciseDetailSheet({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative w-full bg-white rounded-t-[24px] p-6 max-h-[80vh] overflow-y-auto animate-fade-slide-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-text-primary">{exercise.name}</h2>
            <p className="text-sm text-text-secondary mt-1">{exercise.muscleGroup}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-divider">
            <X size={18} />
          </button>
        </div>
        <p className="text-base text-text-secondary mb-5 leading-relaxed">{exercise.description}</p>
        <h3 className="font-semibold text-text-primary mb-3">How to do it</h3>
        <ol className="flex flex-col gap-3 mb-5">
          {exercise.instructions.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-light text-teal text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-base text-text-primary leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
        <div className="bg-amber-50 border-l-4 border-accent-orange p-4 rounded-r-card mb-5">
          <p className="text-sm text-text-primary leading-relaxed">
            <span className="font-semibold">Safety tip: </span>{exercise.safetyTip}
          </p>
        </div>
        <Button variant="secondary" fullWidth leftIcon={<Plus size={16} />}>
          Add to next session
        </Button>
      </div>
    </div>
  )
}

export function Exercises() {
  const navigate = useNavigate()
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const otherSessions = sessionTemplates.filter(s => s.id !== todaySession.id)

  return (
    <div className="px-5 pt-6 pb-6">
      <h1 className="font-serif text-3xl font-semibold text-text-primary mb-1">Exercises</h1>
      <p className="text-sm text-text-secondary mb-5">Choose a session or browse individual exercises</p>

      {/* Today's session */}
      <Card variant="elevated" className="mb-5">
        <span className="text-xs font-bold tracking-widest text-teal uppercase">Today's Session</span>
        <h2 className="font-serif text-xl font-semibold text-text-primary mt-1 mb-3">{todaySession.name}</h2>
        <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
          <span className="flex items-center gap-1.5"><Clock size={13} /> {todaySession.durationMinutes} min</span>
          <span className="flex items-center gap-1.5"><Dumbbell size={13} /> {todaySession.exerciseIds.length} exercises</span>
          <DifficultyDots level={todaySession.difficulty} />
        </div>
        <Button variant="primary" fullWidth onClick={() => navigate(`/session/${todaySession.id}`)}>
          Start Session
        </Button>
      </Card>

      {/* Other sessions */}
      <h2 className="text-base font-bold text-text-primary mb-3">Other Sessions</h2>
      <div className="flex flex-col gap-3 mb-6">
        {otherSessions.map(session => (
          <Card key={session.id} className="flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary">{session.name}</h3>
              <div className="flex items-center gap-3 text-sm text-text-secondary mt-1">
                <span className="flex items-center gap-1"><Clock size={12} /> {session.durationMinutes} min</span>
                <span className="flex items-center gap-1"><Dumbbell size={12} /> {session.exerciseIds.length} exercises</span>
              </div>
            </div>
            <button
              onClick={() => navigate(`/session/${session.id}`)}
              className="text-sm font-bold text-teal hover:underline flex-shrink-0"
            >
              Start
            </button>
          </Card>
        ))}
      </div>

      {/* All exercises */}
      <h2 className="text-base font-bold text-text-primary mb-3">All Exercises</h2>
      <div className="flex flex-col gap-2">
        {exercises.map(exercise => (
          <button
            key={exercise.id}
            onClick={() => setSelectedExercise(exercise)}
            className="w-full text-left"
          >
            <Card className="flex items-center gap-3 py-3">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: MUSCLE_COLORS[exercise.muscleGroup] || '#1A8A7D' }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text-primary">{exercise.name}</p>
                <div className="flex items-center gap-3 text-sm text-text-secondary mt-0.5">
                  <span>{exercise.reps ? `${exercise.reps} reps × ${exercise.sets}` : `${exercise.duration}s × ${exercise.sets}`}</span>
                  <DifficultyDots level={exercise.difficulty} />
                </div>
              </div>
              <ChevronRight size={16} className="text-text-muted flex-shrink-0" />
            </Card>
          </button>
        ))}
      </div>

      {selectedExercise && (
        <ExerciseDetailSheet exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
      )}
    </div>
  )
}
