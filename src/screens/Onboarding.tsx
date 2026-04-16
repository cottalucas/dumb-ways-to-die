import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footprints, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useUser } from '../context/UserContext'

const CONFIDENCE_OPTIONS = [
  { emoji: '😟', label: 'Not at all' },
  { emoji: '😐', label: 'Somewhat' },
  { emoji: '🙂', label: 'Neutral' },
  { emoji: '😊', label: 'Confident' },
  { emoji: '😄', label: 'Very confident' },
]

export function Onboarding() {
  const navigate = useNavigate()
  const { completeOnboarding } = useUser()
  const [step, setStep] = useState<'welcome' | 'setup'>('welcome')
  const [nameInput, setNameInput] = useState('')
  const [confidence, setConfidence] = useState<number | null>(null)
  const [fallen, setFallen] = useState<boolean | null>(null)

  const canSubmit = nameInput.trim().length > 0 && confidence !== null && fallen !== null

  const handleStart = async () => {
    await completeOnboarding(nameInput.trim(), confidence!, fallen!)
    navigate('/home')
  }

  if (step === 'welcome') {
    return (
      <div className="flex-1 flex flex-col px-6">
          {/* Wordmark */}
          <div className="flex items-center gap-2 pt-12 flex-shrink-0">
            <Footprints size={24} className="text-teal" />
            <span className="font-serif text-3xl font-semibold text-text-primary tracking-tight">SteadyStep</span>
          </div>

          {/* Hero content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Decorative SVG */}
            <div className="mb-8">
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                <path d="M10 70 Q30 20 60 40 Q90 60 110 10" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
                <path d="M10 55 Q35 30 60 48 Q85 65 110 25" stroke="#1A8A7D" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35" />
                <circle cx="60" cy="42" r="6" fill="#1A8A7D" opacity="0.5" />
                <circle cx="20" cy="65" r="4" fill="#1A8A7D" opacity="0.3" />
                <circle cx="100" cy="18" r="4" fill="#1A8A7D" opacity="0.3" />
              </svg>
            </div>

            <h1 className="font-serif text-[28px] font-semibold text-text-primary leading-tight mb-4">
              Your daily balance companion
            </h1>
            <p className="text-base text-text-secondary leading-relaxed max-w-xs">
              Ten minutes a day to build strength, improve balance, and stay independent.
            </p>
          </div>

        {/* Pinned CTA — never scrolls */}
        <div className="px-0 pb-8 pt-3 bg-surface flex-shrink-0">
          <Button variant="primary" fullWidth onClick={() => setStep('setup')}>
            Get Started
          </Button>
          <p className="text-center text-sm text-text-muted mt-3">No account needed for this demo.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col px-6">
      {/* Back arrow */}
      <div className="pt-12 pb-4 flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => setStep('welcome')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-divider"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <h1 className="font-serif text-2xl font-semibold text-text-primary mb-8">
          Let's get to know you
        </h1>

        <div className="flex flex-col gap-8 pb-4">
          {/* Name */}
          <Input
            label="What should we call you?"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            placeholder="Your first name"
          />

          {/* Balance confidence */}
          <div>
            <p className="text-sm font-semibold text-text-secondary mb-3">
              How confident do you feel about your balance?
            </p>
            <div className="flex gap-2">
              {CONFIDENCE_OPTIONS.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setConfidence(i + 1)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-card border-2 transition-all ${
                    confidence === i + 1
                      ? 'border-teal bg-teal-light'
                      : 'border-surface-border bg-white'
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-[10px] text-text-secondary leading-tight text-center px-1">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Fallen last year */}
          <div>
            <p className="text-sm font-semibold text-text-secondary mb-3">
              Have you fallen in the past 12 months?
            </p>
            <div className="flex gap-3">
              {(['Yes', 'No'] as const).map(option => (
                <button
                  key={option}
                  onClick={() => setFallen(option === 'Yes')}
                  className={`flex-1 h-16 rounded-btn border-2 font-semibold text-lg transition-all ${
                    fallen === (option === 'Yes')
                      ? 'border-teal bg-teal-light text-teal'
                      : 'border-surface-border bg-white text-text-secondary'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pinned CTA — never scrolls */}
      <div className="pb-8 pt-3 bg-surface flex-shrink-0">
        <Button variant="primary" fullWidth onClick={handleStart} disabled={!canSubmit}>
          Start My Program
        </Button>
      </div>
    </div>
  )
}
