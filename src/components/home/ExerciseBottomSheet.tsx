import { useEffect } from 'react'
import { Button } from '../ui/Button'
import { OtagoExercise } from '../../data/otago'

interface ExerciseBottomSheetProps {
  exercise: OtagoExercise | null
  onClose: () => void
}

export function ExerciseBottomSheet({ exercise, onClose }: ExerciseBottomSheetProps) {
  const visible = exercise !== null

  // Prevent body scroll while sheet is open
  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [visible])

  if (!exercise) return null

  const subtitle = exercise.duration
    ? `${exercise.sets} Sätze · ${exercise.duration} Sekunden`
    : `${exercise.sets} Sätze · ${exercise.reps} Wdh.`

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-warm-dark/50"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="relative w-full max-w-[430px] bg-white rounded-t-sheet pb-8 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-warm-border" />
        </div>

        <div className="px-6 pt-2">
          {/* Header */}
          <div className="mb-5">
            <p className="text-sm font-medium text-warm-muted mb-1">{exercise.category}</p>
            <h2 className="font-display text-3xl text-warm-text leading-tight">{exercise.name}</h2>
            <p className="text-base text-warm-muted mt-1">{subtitle}</p>
          </div>

          {/* Animation placeholder */}
          <div className="w-full h-40 rounded-card bg-warm-bg border border-warm-border flex items-center justify-center mb-5">
            <p className="text-sm text-warm-muted">Animation folgt</p>
          </div>

          {/* 3 instruction pills */}
          <div className="flex flex-col gap-2 mb-5">
            {exercise.instructions.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-warm-accent-light text-warm-text text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-base text-warm-text leading-snug">{step}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-base text-warm-muted leading-relaxed mb-6">
            {exercise.description}
          </p>

          {/* CTA */}
          <Button variant="primary" fullWidth onClick={onClose}>
            Diese Übung starten
          </Button>
        </div>
      </div>
    </div>
  )
}
