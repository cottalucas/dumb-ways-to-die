import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Circle, Clock, Dumbbell } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { ExerciseBottomSheet } from '../components/home/ExerciseBottomSheet'
import { useLang } from '../context/LanguageContext'
import { useUser } from '../context/UserContext'
import { todaySession, OtagoExercise, ExerciseCategory } from '../data/otago'

// ─── AI companion ─────────────────────────────────────────────────────────────
// Swap this function body for a real API call when ready.
function getAIGreeting(lang: 'de' | 'en'): string {
  if (lang === 'en') {
    return 'Last time you held the tandem stand for 11 seconds. Today let\'s beat that.'
  }
  return 'Beim letzten Mal haben Sie beim Tandem-Stand 11 Sekunden gehalten. Heute versuchen wir, das zu toppen.'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useGreeting() {
  const { t } = useLang()
  const h = new Date().getHours()
  return h < 12 ? t.greeting.morning : h < 18 ? t.greeting.afternoon : t.greeting.evening
}

const categoryColor: Record<ExerciseCategory, string> = {
  Balance:    'bg-blue-50 text-blue-700',
  Kraft:      'bg-orange-50 text-orange-700',
  Stabilität: 'bg-green-50 text-green-700',
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function AICard() {
  const { t, lang } = useLang()
  return (
    <div className="rounded-card bg-warm-dark p-5 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-warm-accent flex-shrink-0" />
        <span className="text-xs font-semibold tracking-wide text-warm-accent uppercase">
          {t.home.aiLabel}
        </span>
      </div>
      <p className="text-base leading-relaxed text-warm-off-white">
        {getAIGreeting(lang)}
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

function SessionCard({ onStart }: { onStart: () => void }) {
  const { t, lang } = useLang()
  return (
    <div className="rounded-card border border-warm-border bg-white p-5 mb-5">
      <p className="text-xs font-bold tracking-widest text-warm-muted uppercase mb-2">
        {t.home.program}
      </p>
      <h2 className="font-display text-2xl text-warm-text leading-tight mb-4">
        {lang === 'en' ? todaySession.title.en : todaySession.title.de}
      </h2>
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <DifficultyPill label={`${todaySession.durationMin} ${t.session.minutes}`} />
        <DifficultyPill label={`${todaySession.exercises.length} ${t.session.exercises}`} />
        <DifficultyPill label={lang === 'en' ? todaySession.difficulty.en : todaySession.difficulty.de} />
      </div>
      <Button variant="primary" fullWidth onClick={onStart}>
        {t.home.startSession}
      </Button>
    </div>
  )
}

interface ExerciseRowProps {
  exercise: OtagoExercise
  done: boolean
  onTap: (ex: OtagoExercise) => void
  lang: 'de' | 'en'
  categoryLabel: string
}

function ExerciseRow({ exercise, done, onTap, lang, categoryLabel }: ExerciseRowProps) {
  const name = lang === 'en' ? exercise.name_en : exercise.name
  return (
    <button
      onClick={() => onTap(exercise)}
      className="w-full flex items-center gap-4 py-4 border-b border-warm-border last:border-0 text-left"
    >
      {done
        ? <CheckCircle size={24} className="text-warm-accent flex-shrink-0" strokeWidth={2} />
        : <Circle size={24} className="text-warm-border flex-shrink-0" strokeWidth={1.5} />
      }
      <p className={`flex-1 text-base font-semibold leading-tight min-w-0 ${done ? 'text-warm-muted line-through' : 'text-warm-text'}`}>
        {name}
      </p>
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-[10px] flex-shrink-0 ${categoryColor[exercise.category]}`}>
        {categoryLabel}
      </span>
    </button>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export function Home() {
  const navigate = useNavigate()
  const { name } = useUser()
  const { t, lang } = useLang()
  const salutation = useGreeting()

  const [selectedExercise, setSelectedExercise] = useState<OtagoExercise | null>(null)
  const [doneIds, setDoneIds] = useState<Set<string>>(
    new Set(todaySession.exercises.filter(e => e.done).map(e => e.id))
  )

  const handleComplete = (id: string) => {
    setDoneIds(prev => new Set([...prev, id]))
  }

  return (
    <>
      <div className="px-5 pt-8 pb-4 bg-warm-bg">
        {/* Greeting */}
        <h1 className="font-display text-3xl text-warm-text mb-5 leading-tight">
          {salutation}, {name}
        </h1>

        {/* AI companion */}
        <AICard />

        {/* Today's session card */}
        <SessionCard onStart={() => navigate('/session/today')} />

        {/* Exercise list */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} className="text-warm-muted" />
            <p className="text-sm text-warm-muted font-medium">{t.home.exercisesHeader}</p>
            <Dumbbell size={14} className="text-warm-muted ml-auto" />
            <p className="text-sm text-warm-muted">
              {doneIds.size}/{todaySession.exercises.length} {t.home.done}
            </p>
          </div>
          <div className="rounded-card border border-warm-border bg-white px-4">
            {todaySession.exercises.map(ex => (
              <ExerciseRow
                key={ex.id}
                exercise={ex}
                done={doneIds.has(ex.id)}
                onTap={setSelectedExercise}
                lang={lang}
                categoryLabel={lang === 'en' ? ex.category_en : t.categories[ex.category]}
              />
            ))}
          </div>
        </div>
      </div>

      <ExerciseBottomSheet
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        onComplete={handleComplete}
      />
    </>
  )
}
