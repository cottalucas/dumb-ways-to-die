import { useEffect, useRef, useState } from 'react'
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

  // Drag state
  const sheetRef = useRef<HTMLDivElement>(null)
  const dragStartY = useRef<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)
  const isDragging = useRef(false)

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
      setDragOffset(0)
    }
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

  // ── Drag handlers ──────────────────────────────────────────────
  const onDragStart = (clientY: number) => {
    dragStartY.current = clientY
    isDragging.current = true
  }

  const onDragMove = (clientY: number) => {
    if (!isDragging.current || dragStartY.current === null) return
    const delta = clientY - dragStartY.current
    if (delta > 0) setDragOffset(delta)
  }

  const onDragEnd = (clientY: number) => {
    if (!isDragging.current || dragStartY.current === null) return
    isDragging.current = false
    const delta = clientY - dragStartY.current
    const sheetH = sheetRef.current?.offsetHeight ?? 400
    // Dismiss if dragged more than 30% of sheet height
    if (delta > sheetH * 0.3) {
      onClose()
    } else {
      setDragOffset(0)
    }
    dragStartY.current = null
  }

  // Touch
  const onTouchStart = (e: React.TouchEvent) => onDragStart(e.touches[0].clientY)
  const onTouchMove = (e: React.TouchEvent) => onDragMove(e.touches[0].clientY)
  const onTouchEnd = (e: React.TouchEvent) => onDragEnd(e.changedTouches[0].clientY)

  // Mouse (desktop testing)
  const onMouseDown = (e: React.MouseEvent) => onDragStart(e.clientY)
  const onMouseMove = (e: React.MouseEvent) => onDragMove(e.clientY)
  const onMouseUp = (e: React.MouseEvent) => onDragEnd(e.clientY)

  const opacity = Math.max(0, 1 - dragOffset / 300)
  const transition = isDragging.current ? 'none' : 'transform 0.25s cubic-bezier(0.32,0.72,0,1)'

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-warm-dark/60 transition-opacity duration-250"
        style={{ opacity }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="relative w-full max-w-[430px] bg-warm-bg rounded-t-sheet pb-10 max-h-[88vh] flex flex-col animate-slide-up"
        style={{
          transform: `translateY(${dragOffset}px)`,
          transition,
        }}
        onClick={e => e.stopPropagation()}
        onMouseLeave={e => { if (isDragging.current) onDragEnd(e.clientY) }}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {/* Drag handle — interaction target */}
        <div
          className="flex justify-center pt-3 pb-2 flex-shrink-0 cursor-grab active:cursor-grabbing select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
        >
          <div className="w-10 h-1.5 rounded-full bg-warm-border" />
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 pt-2 pb-4">
          <p className="text-sm font-semibold text-warm-muted mb-1">{category}</p>
          <h2 className="font-display text-3xl text-warm-text leading-tight mb-1">{name}</h2>
          <p className="text-sm text-warm-muted mb-5">{subtitle}</p>

          {/* Illustration */}
          <ExerciseIllustration
            exerciseId={exercise.illustrationId}
            warm
            className="mb-5"
          />

          {/* 3 instruction pills */}
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

        {/* CTA */}
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
