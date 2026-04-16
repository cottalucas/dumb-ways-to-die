import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '../ui/Button'
import { ExerciseIllustration } from '../exercise/ExerciseIllustration'
import { useLang } from '../../context/LanguageContext'
import { OtagoExercise } from '../../data/otago'

interface ExerciseBottomSheetProps {
  exercise: OtagoExercise | null
  onClose: () => void
  onComplete: (exerciseId: string) => void
}

export function ExerciseBottomSheet({ exercise, onClose, onComplete }: ExerciseBottomSheetProps) {
  const { t, lang } = useLang()
  const visible = exercise !== null

  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [visible])

  if (!exercise) return null

  const name = lang === 'en' ? exercise.name_en : exercise.name
  const description = lang === 'en' ? exercise.description_en : exercise.description
  const instructions = lang === 'en' ? exercise.instructions_en : exercise.instructions
  const category = lang === 'en' ? exercise.category_en : t.categories[exercise.category]

  const subtitle = `${category} · ${exercise.sets} ${t.session.sets} · ${
    exercise.duration
      ? `${exercise.duration} ${t.session.seconds}`
      : `${exercise.reps} ${t.session.reps}`
  }`

  const handleCTA = () => {
    onComplete(exercise.id)
    onClose()
  }

  // Rendered via portal — escapes all overflow:hidden ancestors (AppShell, scroll wrappers).
  // z-index layer: sheet (z-50) > tab bar (z-10) > content (z-0).
  // See docs/design-system.md for the full z-index table.
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-warm-dark/60" onClick={onClose} />

      {/* Sheet — max-width mirrors phone frame */}
      <div
        className="relative w-full max-w-[430px] bg-warm-bg rounded-t-sheet pb-10 animate-slide-up max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-warm-border" />
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 pt-3 pb-4">
          <p className="text-sm font-medium text-warm-muted mb-1">{category}</p>
          <h2 className="font-display text-3xl text-warm-text leading-tight mb-1">{name}</h2>
          <p className="text-base text-warm-muted mb-5">{subtitle}</p>

          {/* Illustration */}
          <ExerciseIllustration
            exerciseId={exercise.illustrationId}
            warm
            className="mb-5"
          />

          {/* 3 instruction pills — 2-line format */}
          <div className="flex gap-3 mb-5">
            {instructions.map((step, i) => (
              <div key={i} className="flex-1 rounded-[12px] bg-warm-accent-light px-3 py-3 text-center">
                <p className="text-sm font-semibold text-warm-text leading-tight">{step.action}</p>
                <p className="text-xs text-warm-muted mt-0.5 leading-tight">{step.detail}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-base text-warm-muted leading-relaxed">{description}</p>
        </div>

        {/* CTA — always visible, never hidden behind tab bar */}
        <div className="px-6 pt-4 flex-shrink-0">
          <Button variant="primary" fullWidth onClick={handleCTA}>
            {t.sheet.cta}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
