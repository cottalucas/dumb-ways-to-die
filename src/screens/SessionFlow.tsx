import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ChevronRight, X } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { ExerciseIllustration } from '../components/exercise/ExerciseIllustration'
import { useLang } from '../context/LanguageContext'
import { useUser } from '../context/UserContext'
import { todaySession, OtagoExercise } from '../data/otago'

type Phase = 'mood' | 'exercise' | 'complete'

// ─── Mood check ───────────────────────────────────────────────────────────────
function MoodCheck({ onSelect }: { onSelect: () => void }) {
  const { t } = useLang()
  const { name } = useUser()
  const h = new Date().getHours()
  const salutation = h < 12 ? t.greeting.morning : h < 18 ? t.greeting.afternoon : t.greeting.evening

  const options = [t.moodCheck.good, t.moodCheck.ok, t.moodCheck.tired]

  return (
    <div className="flex-1 flex flex-col bg-warm-dark px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-warm-accent flex items-center justify-center flex-shrink-0">
          <span className="text-warm-dark font-bold text-sm">SS</span>
        </div>
        <span className="text-warm-accent font-semibold tracking-wide">SteadyStep</span>
      </div>

      {/* Question */}
      <h1 className="font-display text-3xl text-warm-off-white leading-snug mb-10">
        {t.moodCheck.question(name, salutation)}
      </h1>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-8">
        {options.map(option => (
          <button
            key={option}
            onClick={onSelect}
            className="w-full h-16 rounded-btn border border-warm-accent/40 text-warm-off-white text-lg font-medium text-left px-5 hover:bg-warm-accent/10 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={onSelect}
        className="text-warm-muted text-base text-center hover:text-warm-accent transition-colors"
      >
        {t.moodCheck.skip}
      </button>
    </div>
  )
}

// ─── Exercise step ────────────────────────────────────────────────────────────
interface ExerciseStepProps {
  exercise: OtagoExercise
  index: number
  total: number
  onNext: () => void
  onExit: () => void
  isLast: boolean
}

function ExerciseStep({ exercise, index, onNext, onExit, total, isLast }: ExerciseStepProps) {
  const { t, lang } = useLang()
  const name = lang === 'en' ? exercise.name_en : exercise.name
  const description = lang === 'en' ? exercise.description_en : exercise.description
  const instructions = lang === 'en' ? exercise.instructions_en : exercise.instructions
  const category = lang === 'en' ? exercise.category_en : t.categories[exercise.category]

  const subtitle = exercise.duration
    ? `${exercise.sets} ${t.session.sets} · ${exercise.duration} ${t.session.seconds}`
    : `${exercise.sets} ${t.session.sets} · ${exercise.reps} ${t.session.reps}`

  return (
    <div className="flex-1 flex flex-col bg-warm-bg">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
        <span className="text-sm font-medium text-warm-muted">
          {t.session.exercise(index + 1, total)}
        </span>
        <button
          onClick={onExit}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-warm-accent-light"
        >
          <X size={20} className="text-warm-muted" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 mx-5 rounded-full bg-warm-border mb-5 flex-shrink-0">
        <div
          className="h-full rounded-full bg-warm-accent transition-all duration-500"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <p className="text-sm font-medium text-warm-muted mb-1">{category}</p>
        <h2 className="font-display text-3xl text-warm-text leading-tight mb-1">{name}</h2>
        <p className="text-base text-warm-muted mb-5">{subtitle}</p>

        {/* Illustration */}
        <ExerciseIllustration
          exerciseId={exercise.illustrationId}
          className="mb-5 rounded-card overflow-hidden"
        />

        {/* Instruction pills — 2 lines each */}
        <div className="flex gap-3 mb-5">
          {instructions.map((step, i) => (
            <div key={i} className="flex-1 rounded-[12px] bg-warm-accent-light px-3 py-3 text-center">
              <p className="text-sm font-semibold text-warm-text leading-tight">{step.action}</p>
              <p className="text-xs text-warm-muted mt-0.5 leading-tight">{step.detail}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-base text-warm-muted leading-relaxed">
          {description}
        </p>
      </div>

      {/* CTA */}
      <div className="px-5 pb-8 pt-4 flex-shrink-0">
        <Button variant="primary" fullWidth rightIcon={<ChevronRight size={18} />} onClick={onNext}>
          {isLast ? t.session.finish : t.session.next}
        </Button>
      </div>
    </div>
  )
}

// ─── Complete screen ──────────────────────────────────────────────────────────
function CompleteScreen({ onDone }: { onDone: () => void }) {
  const { t } = useLang()
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center bg-warm-bg">
      <div className="w-20 h-20 rounded-full bg-warm-accent-light flex items-center justify-center mb-6 animate-scale-in">
        <CheckCircle size={40} className="text-warm-accent" strokeWidth={1.5} />
      </div>
      <h1 className="font-display text-3xl text-warm-text mb-3">{t.session.complete}</h1>
      <p className="text-base text-warm-muted leading-relaxed max-w-xs mb-10">
        {t.session.completeSubtitle}
      </p>
      <Button variant="primary" fullWidth onClick={onDone}>
        {t.session.backHome}
      </Button>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function SessionFlow() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('mood')
  const [exerciseIndex, setExerciseIndex] = useState(0)

  const exercises = todaySession.exercises
  const current = exercises[exerciseIndex]

  const handleMoodSelect = () => setPhase('exercise')

  const handleNext = () => {
    if (exerciseIndex < exercises.length - 1) {
      setExerciseIndex(i => i + 1)
    } else {
      setPhase('complete')
    }
  }

  if (phase === 'mood') {
    return <MoodCheck onSelect={handleMoodSelect} />
  }

  if (phase === 'complete') {
    return <CompleteScreen onDone={() => navigate('/home')} />
  }

  return (
    <ExerciseStep
      exercise={current}
      index={exerciseIndex}
      total={exercises.length}
      isLast={exerciseIndex === exercises.length - 1}
      onNext={handleNext}
      onExit={() => navigate('/home')}
    />
  )
}
