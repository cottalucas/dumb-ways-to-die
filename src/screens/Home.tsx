import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Circle, ChevronRight, Clock, Dumbbell } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { ExerciseBottomSheet } from '../components/home/ExerciseBottomSheet'
import { useUser } from '../context/UserContext'
import { todaySession, OtagoExercise, ExerciseCategory } from '../data/otago'

// ─── AI companion ─────────────────────────────────────────────────────────────
// Replace this function body with a real API call when ready.
function getAIGreeting(): string {
  return 'Beim letzten Mal haben Sie beim Tandem-Stand 11 Sekunden gehalten. Heute versuchen wir, das zu toppen.'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function germanGreeting(name: string): string {
  const h = new Date().getHours()
  const salutation = h < 12 ? 'Guten Morgen' : h < 18 ? 'Guten Tag' : 'Guten Abend'
  return `${salutation}, ${name}`
}

const categoryColor: Record<ExerciseCategory, string> = {
  Balance:    'bg-blue-50 text-blue-700',
  Kraft:      'bg-orange-50 text-orange-700',
  Stabilität: 'bg-green-50 text-green-700',
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function AICard() {
  return (
    <div className="rounded-card bg-warm-dark p-5 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-warm-accent flex-shrink-0" />
        <span className="text-xs font-semibold tracking-wide text-warm-accent uppercase">SteadyStep</span>
      </div>
      <p className="text-base leading-relaxed text-warm-off-white">
        {getAIGreeting()}
      </p>
    </div>
  )
}

function DifficultyPill({ label }: { label: string }) {
  return (
    <span className="h-8 px-3 rounded-[12px] bg-warm-accent-light text-warm-text text-sm font-medium flex items-center">
      {label}
    </span>
  )
}

function SessionCard() {
  const navigate = useNavigate()
  return (
    <div className="rounded-card border border-warm-border bg-white p-5 mb-5">
      <p className="text-xs font-bold tracking-widest text-warm-muted uppercase mb-2">Heutiges Programm</p>
      <h2 className="font-display text-2xl text-warm-text leading-tight mb-4">
        {todaySession.title}
      </h2>
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <DifficultyPill label={`${todaySession.durationMin} Min`} />
        <DifficultyPill label={`${todaySession.exercises.length} Übungen`} />
        <DifficultyPill label={todaySession.difficulty} />
      </div>
      <Button
        variant="primary"
        fullWidth
        rightIcon={<ChevronRight size={18} />}
        onClick={() => navigate('/session/balance-builder')}
      >
        Einheit starten
      </Button>
    </div>
  )
}

interface ExerciseRowProps {
  exercise: OtagoExercise & { done: boolean }
  onTap: (ex: OtagoExercise) => void
}

function ExerciseRow({ exercise, onTap }: ExerciseRowProps) {
  return (
    <button
      onClick={() => onTap(exercise)}
      className="w-full flex items-center gap-4 py-4 border-b border-warm-border last:border-0 text-left"
    >
      {exercise.done
        ? <CheckCircle size={24} className="text-warm-accent flex-shrink-0" strokeWidth={2} />
        : <Circle size={24} className="text-warm-border flex-shrink-0" strokeWidth={1.5} />
      }
      <div className="flex-1 min-w-0">
        <p className={`text-base font-semibold leading-tight ${exercise.done ? 'text-warm-muted line-through' : 'text-warm-text'}`}>
          {exercise.name}
        </p>
      </div>
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-[10px] flex-shrink-0 ${categoryColor[exercise.category]}`}>
        {exercise.category}
      </span>
    </button>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export function Home() {
  const { name } = useUser()
  const [selectedExercise, setSelectedExercise] = useState<OtagoExercise | null>(null)

  return (
    <>
      <div className="px-5 pt-8 pb-4 bg-warm-bg">
        {/* Greeting */}
        <h1 className="font-display text-3xl text-warm-text mb-5 leading-tight">
          {germanGreeting(name)}
        </h1>

        {/* AI companion message */}
        <AICard />

        {/* Today's session card */}
        <SessionCard />

        {/* Exercise list */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} className="text-warm-muted" />
            <p className="text-sm text-warm-muted font-medium">Übungen heute</p>
            <Dumbbell size={14} className="text-warm-muted ml-auto" />
            <p className="text-sm text-warm-muted">
              {todaySession.exercises.filter(e => e.done).length}/{todaySession.exercises.length} erledigt
            </p>
          </div>
          <div className="rounded-card border border-warm-border bg-white px-4">
            {todaySession.exercises.map(ex => (
              <ExerciseRow key={ex.id} exercise={ex} onTap={setSelectedExercise} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <ExerciseBottomSheet
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </>
  )
}
