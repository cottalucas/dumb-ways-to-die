import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, X, Square } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { ExerciseIllustration } from '../components/exercise/ExerciseIllustration'
import { useLang } from '../context/LanguageContext'
import { useUser } from '../context/UserContext'
import { todaySession, OtagoExercise } from '../data/otago'
import { logClinicalCheck, type ClinicalCheck } from '../services/clinicalService'
import { logSession } from '../services/sessionService'

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase =
  | 'clinical'
  | 'intro'
  | 'active'
  | 'rest'
  | 'complete'

interface SessionState {
  exerciseIndex: number
  currentSet: number
  phase: Phase
}

// ─── Clinical check ───────────────────────────────────────────────────────────
type DizzAnswer = 'none' | 'some' | 'strong'
type PainAnswer = 'none' | 'some' | 'yes'
type EnergyAnswer = 'good' | 'ok' | 'tired'

function ClinicalCheck({ onDone }: { onDone: (c: ClinicalCheck) => void }) {
  const { t } = useLang()
  const [dizz, setDizz] = useState<DizzAnswer | null>(null)
  const [pain, setPain] = useState<PainAnswer | null>(null)
  const [energy, setEnergy] = useState<EnergyAnswer | null>(null)

  const canProceed = dizz !== null && pain !== null && energy !== null

  function OptionBtn<T extends string>({
    value, current, onSelect, label,
  }: { value: T; current: T | null; onSelect: (v: T) => void; label: string }) {
    const active = current === value
    return (
      <button
        onClick={() => onSelect(value)}
        className={`flex-1 h-14 rounded-btn border-2 text-base font-semibold transition-all ${
          active
            ? 'border-warm-text bg-warm-text text-warm-off-white'
            : 'border-warm-border bg-white text-warm-text hover:border-warm-text/40'
        }`}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-warm-bg px-5 pt-8 pb-8 overflow-y-auto">
      <h1 className="font-display text-3xl text-warm-text mb-2 leading-tight">
        {t.clinical.title}
      </h1>
      <p className="text-base text-warm-muted mb-8 leading-relaxed">
        {t.clinical.subtitle}
      </p>

      {/* Q1 */}
      <div className="mb-6">
        <p className="text-base font-semibold text-warm-text mb-3">{t.clinical.q1}</p>
        <div className="flex gap-2">
          <OptionBtn value="none"   current={dizz} onSelect={setDizz} label={t.clinical.none} />
          <OptionBtn value="some"   current={dizz} onSelect={setDizz} label={t.clinical.some} />
          <OptionBtn value="strong" current={dizz} onSelect={setDizz} label={t.clinical.strong} />
        </div>
      </div>

      {/* Q2 */}
      <div className="mb-6">
        <p className="text-base font-semibold text-warm-text mb-3">{t.clinical.q2}</p>
        <div className="flex gap-2">
          <OptionBtn value="none" current={pain} onSelect={setPain} label={t.clinical.none} />
          <OptionBtn value="some" current={pain} onSelect={setPain} label={t.clinical.some} />
          <OptionBtn value="yes"  current={pain} onSelect={setPain} label={t.clinical.strong} />
        </div>
      </div>

      {/* Q3 */}
      <div className="mb-8">
        <p className="text-base font-semibold text-warm-text mb-3">{t.clinical.q3}</p>
        <div className="flex gap-2">
          <OptionBtn value="good" current={energy} onSelect={setEnergy} label={t.clinical.good} />
          <OptionBtn value="ok"   current={energy} onSelect={setEnergy} label={t.clinical.ok} />
          <OptionBtn value="tired" current={energy} onSelect={setEnergy} label={t.clinical.tired} />
        </div>
      </div>

      <Button
        variant="primary"
        fullWidth
        disabled={!canProceed}
        onClick={() => onDone({ dizziness: dizz!, pain: pain!, energy: energy! })}
      >
        {t.clinical.cta}
      </Button>
    </div>
  )
}

// ─── Exercise intro ───────────────────────────────────────────────────────────
interface IntroProps {
  exercise: OtagoExercise
  exerciseIndex: number
  total: number
  onStart: () => void
  onExit: () => void
}

function ExerciseIntro({ exercise, exerciseIndex, total, onStart, onExit }: IntroProps) {
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
      <div className="flex items-center justify-between px-5 pt-5 pb-2 flex-shrink-0">
        <span className="text-sm font-medium text-warm-muted">
          {t.session.exerciseOf(exerciseIndex + 1, total)}
        </span>
        <button onClick={onExit} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-warm-accent-light">
          <X size={20} className="text-warm-muted" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 mx-5 rounded-full bg-warm-border mb-5 flex-shrink-0">
        <div
          className="h-full rounded-full bg-warm-accent transition-all duration-500"
          style={{ width: `${((exerciseIndex + 1) / total) * 100}%` }}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <p className="text-sm font-medium text-warm-muted mb-1">{category}</p>
        <h2 className="font-display text-3xl text-warm-text leading-tight mb-1">{name}</h2>
        <p className="text-base text-warm-muted mb-5">{subtitle}</p>

        <ExerciseIllustration exerciseId={exercise.illustrationId} warm className="mb-5" />

        {/* 2-line instruction pills */}
        <div className="flex gap-2 mb-5">
          {instructions.map((step, i) => (
            <div key={i} className="flex-1 rounded-[12px] bg-warm-accent-light px-3 py-3 text-center">
              <p className="text-sm font-semibold text-warm-text leading-tight">{step.action}</p>
              <p className="text-xs text-warm-muted mt-0.5 leading-tight">{step.detail}</p>
            </div>
          ))}
        </div>

        <p className="text-base text-warm-muted leading-relaxed">{description}</p>
      </div>

      <div className="px-5 pb-8 pt-4 flex-shrink-0">
        <Button variant="primary" fullWidth onClick={onStart}>
          {t.session.startExercise}
        </Button>
      </div>
    </div>
  )
}

// ─── Timer (for duration exercises) ──────────────────────────────────────────
interface TimerProps {
  exercise: OtagoExercise
  currentSet: number
  onDone: () => void
}

function ExerciseTimer({ exercise, currentSet, onDone }: TimerProps) {
  const { t, lang } = useLang()
  const name = lang === 'en' ? exercise.name_en : exercise.name
  const [seconds, setSeconds] = useState(exercise.duration!)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            setRunning(false)
            clearInterval(intervalRef.current!)
            setTimeout(onDone, 400)
            return 0
          }
          return s - 1
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const progress = (exercise.duration! - seconds) / exercise.duration!
  const r = 54
  const circ = 2 * Math.PI * r

  return (
    <div className="flex-1 flex flex-col bg-warm-bg">
      <div className="flex-shrink-0 px-5 pt-5 pb-2">
        <p className="text-sm font-medium text-warm-muted">
          {t.session.setOf(currentSet, exercise.sets)}
        </p>
        <h2 className="font-display text-2xl text-warm-text mt-1">{name}</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5">
        {/* Circular progress */}
        <div className="relative mb-6">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={r} fill="none" stroke="#e0d9d0" strokeWidth="6" />
            <circle
              cx="70" cy="70" r={r} fill="none"
              stroke="#c8b89a" strokeWidth="6"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - progress)}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 0.9s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-5xl text-warm-text leading-none">{seconds}</span>
            <span className="text-sm text-warm-muted mt-1">{t.session.seconds}</span>
          </div>
        </div>

        <p className="text-lg font-medium text-warm-muted mb-8">{t.session.hold}</p>

        {!running ? (
          <Button variant="primary" fullWidth onClick={() => setRunning(true)}>
            {t.session.startExercise}
          </Button>
        ) : (
          <button
            onClick={() => { setRunning(false); onDone() }}
            className="w-full h-16 rounded-btn border-2 border-warm-border bg-white text-warm-text text-lg font-semibold flex items-center justify-center gap-2"
          >
            <Square size={18} />
            {t.session.stopExercise}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Rep counter (for rep-based exercises) ────────────────────────────────────
interface RepProps {
  exercise: OtagoExercise
  currentSet: number
  onDone: () => void
}

function ExerciseReps({ exercise, currentSet, onDone }: RepProps) {
  const { t, lang } = useLang()
  const name = lang === 'en' ? exercise.name_en : exercise.name
  const [currentRep, setCurrentRep] = useState(0)
  const [pulsing, setPulsing] = useState(false)
  const total = exercise.reps!

  // Pulse every 2.5s to guide pace
  useEffect(() => {
    const id = setInterval(() => {
      setPulsing(true)
      setTimeout(() => setPulsing(false), 300)
    }, 2500)
    return () => clearInterval(id)
  }, [])

  const handleTap = () => {
    if (currentRep >= total) { onDone(); return }
    const next = currentRep + 1
    setCurrentRep(next)
    if (next >= total) setTimeout(onDone, 600)
  }

  return (
    <div className="flex-1 flex flex-col bg-warm-bg">
      <div className="flex-shrink-0 px-5 pt-5 pb-2">
        <p className="text-sm font-medium text-warm-muted">
          {t.session.setOf(currentSet, exercise.sets)}
        </p>
        <h2 className="font-display text-2xl text-warm-text mt-1">{name}</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5">
        {/* Rep counter */}
        <div
          className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center mb-4 transition-all duration-200 cursor-pointer select-none ${
            pulsing ? 'border-warm-accent bg-warm-accent-light scale-105' : 'border-warm-border bg-white'
          }`}
          onClick={handleTap}
        >
          <span className="font-display text-5xl text-warm-text leading-none">{currentRep}</span>
          <span className="text-sm text-warm-muted mt-1">/ {total}</span>
        </div>

        <p className="text-sm text-warm-muted mb-2">
          {pulsing ? '●' : '○'} {t.session.repsLeft(total - currentRep)}
        </p>
        <p className="text-xs text-warm-muted mb-10">Tippen Sie den Kreis bei jeder Wiederholung</p>

        <button
          onClick={onDone}
          className="w-full h-16 rounded-btn border-2 border-warm-border bg-white text-warm-text text-lg font-semibold"
        >
          {t.session.stopExercise}
        </button>
      </div>
    </div>
  )
}

// ─── Rest between sets ────────────────────────────────────────────────────────
function SetRest({ exercise, currentSet, onContinue }: {
  exercise: OtagoExercise; currentSet: number; onContinue: () => void
}) {
  const { t, lang } = useLang()
  const name = lang === 'en' ? exercise.name_en : exercise.name
  const [seconds, setSeconds] = useState(10)

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) { clearInterval(id); setTimeout(onContinue, 200); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center bg-warm-bg">
      <p className="text-sm font-semibold text-warm-muted uppercase tracking-widest mb-4">
        {t.session.rest}
      </p>
      <p className="font-display text-2xl text-warm-text mb-2">{t.session.restDone}</p>
      <p className="text-base text-warm-muted mb-8">
        {t.session.setOf(currentSet + 1, exercise.sets)} · {name}
      </p>

      {/* Rest countdown ring */}
      <div className="relative mb-8">
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="36" fill="none" stroke="#e0d9d0" strokeWidth="4" />
          <circle
            cx="45" cy="45" r="36" fill="none"
            stroke="#c8b89a" strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 36}`}
            strokeDashoffset={`${2 * Math.PI * 36 * (seconds / 10)}`}
            strokeLinecap="round"
            transform="rotate(-90 45 45)"
            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl text-warm-text">{seconds}</span>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="text-base font-semibold text-warm-accent hover:text-warm-text transition-colors"
      >
        {t.session.restSkip}
      </button>
    </div>
  )
}

// ─── Complete screen ──────────────────────────────────────────────────────────
function CompleteScreen({ exercisesCompleted, onDone }: { exercisesCompleted: number; onDone: () => void }) {
  const { t } = useLang()
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center bg-warm-bg">
      <div className="w-20 h-20 rounded-full bg-warm-accent-light flex items-center justify-center mb-6 animate-scale-in">
        <CheckCircle size={40} className="text-warm-accent" strokeWidth={1.5} />
      </div>
      <h1 className="font-display text-3xl text-warm-text mb-3">{t.session.complete}</h1>
      <p className="text-base text-warm-muted leading-relaxed max-w-xs mb-2">
        {t.session.completeSubtitle}
      </p>
      <p className="text-sm text-warm-muted mb-10">
        {exercisesCompleted} {t.session.exercises}
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
  const { userId } = useUser()
  const exercises = todaySession.exercises

  const [state, setState] = useState<SessionState>({
    phase: 'clinical',
    exerciseIndex: 0,
    currentSet: 1,
  })

  const ex = exercises[state.exerciseIndex]
  const total = exercises.length

  const advance = (next: Partial<SessionState>) =>
    setState(s => ({ ...s, ...next }))

  // Clinical check done → write to Firestore, go to first exercise intro
  const handleClinicalDone = async (check: ClinicalCheck) => {
    logClinicalCheck(userId, check).catch(() => {}) // fire and forget
    advance({ phase: 'intro', exerciseIndex: 0, currentSet: 1 })
  }

  // User read intro → start active phase
  const handleStartExercise = () => advance({ phase: 'active' })

  // Active done → if more sets: rest, else next exercise or complete
  const handleSetDone = () => {
    if (state.currentSet < ex.sets) {
      advance({ phase: 'rest' })
    } else {
      // This exercise fully done
      const nextIndex = state.exerciseIndex + 1
      if (nextIndex >= total) {
        // All done — persist completed IDs so Home reflects them
        const today = new Date().toISOString().slice(0, 10)
        const ids = exercises.map(e => e.id)
        localStorage.setItem(`completedToday_${today}`, JSON.stringify(ids))
        logSession(userId, {
          sessionTemplateId: 'balance-kraft-4',
          sessionName: todaySession.title.de,
          durationMinutes: todaySession.durationMin,
          exercisesCompleted: total,
          totalExercises: total,
        }).catch(() => {})
        advance({ phase: 'complete' })
      } else {
        advance({ phase: 'intro', exerciseIndex: nextIndex, currentSet: 1 })
      }
    }
  }

  // Rest done → next set
  const handleRestDone = () => {
    advance({ phase: 'intro', currentSet: state.currentSet + 1 })
  }

  if (state.phase === 'clinical') return <ClinicalCheck onDone={handleClinicalDone} />

  if (state.phase === 'complete') {
    return <CompleteScreen exercisesCompleted={total} onDone={() => navigate('/home')} />
  }

  if (state.phase === 'intro') {
    return (
      <ExerciseIntro
        exercise={ex}
        exerciseIndex={state.exerciseIndex}
        total={total}
        onStart={handleStartExercise}
        onExit={() => navigate('/home')}
      />
    )
  }

  if (state.phase === 'rest') {
    return (
      <SetRest
        exercise={ex}
        currentSet={state.currentSet}
        onContinue={handleRestDone}
      />
    )
  }

  // active phase — timer or reps
  if (ex.duration) {
    return (
      <ExerciseTimer
        key={`${state.exerciseIndex}-${state.currentSet}`}
        exercise={ex}
        currentSet={state.currentSet}
        onDone={handleSetDone}
      />
    )
  }
  return (
    <ExerciseReps
      key={`${state.exerciseIndex}-${state.currentSet}`}
      exercise={ex}
      currentSet={state.currentSet}
      onDone={handleSetDone}
    />
  )
}
