import { useState } from 'react'
import { Button } from '../ui/Button'
import { CheckCircle } from 'lucide-react'

interface RepCounterProps {
  totalReps: number
  totalSets: number
  onSetComplete: () => void
  onAllComplete: () => void
}

export function RepCounter({ totalReps, totalSets, onSetComplete, onAllComplete }: RepCounterProps) {
  const [currentRep, setCurrentRep] = useState(1)
  const [currentSet, setCurrentSet] = useState(1)

  const handleRep = () => {
    if (currentRep < totalReps) {
      setCurrentRep(r => r + 1)
    } else if (currentSet < totalSets) {
      setCurrentSet(s => s + 1)
      setCurrentRep(1)
      onSetComplete()
    } else {
      onAllComplete()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <div className="font-serif text-5xl font-semibold text-text-primary leading-none">
          {currentRep}
          <span className="text-2xl text-text-muted font-normal"> / {totalReps}</span>
        </div>
        <p className="text-sm text-text-secondary mt-2">
          Set {currentSet} of {totalSets}
        </p>
      </div>
      <div className="flex gap-2 justify-center">
        {Array.from({ length: totalSets }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-10 rounded-full ${i < currentSet - 1 ? 'bg-teal' : i === currentSet - 1 ? 'bg-teal opacity-50' : 'bg-surface-border'}`}
          />
        ))}
      </div>
      <Button
        variant="primary"
        size="default"
        onClick={handleRep}
        leftIcon={<CheckCircle size={18} />}
        className="min-w-[200px]"
      >
        {currentRep < totalReps
          ? 'Completed Rep'
          : currentSet < totalSets
          ? 'Next Set'
          : 'Complete Exercise'}
      </Button>
    </div>
  )
}
