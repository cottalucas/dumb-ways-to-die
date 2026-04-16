import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footprints, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useUser } from '../context/UserContext'
import { useLang } from '../context/LanguageContext'

const CONFIDENCE_EMOJIS = ['😟', '😐', '🙂', '😊', '😄']

export function Onboarding() {
  const navigate = useNavigate()
  const { completeOnboarding } = useUser()
  const { t, lang, setLang } = useLang()
  const o = t.onboarding

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
      <div className="flex-1 flex flex-col px-6 bg-warm-bg">
        {/* Language toggle — top right */}
        <div className="flex justify-end pt-6 flex-shrink-0">
          <div className="flex rounded-full border border-warm-border overflow-hidden">
            {(['de', 'en'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-1.5 text-sm font-semibold transition-colors ${
                  lang === l
                    ? 'bg-warm-dark text-warm-bg'
                    : 'bg-transparent text-warm-muted'
                }`}
              >
                {l === 'de' ? 'DE' : 'EN'}
              </button>
            ))}
          </div>
        </div>

        {/* Wordmark */}
        <div className="flex items-center gap-2 pt-6 flex-shrink-0">
          <Footprints size={24} className="text-teal" />
          <span className="font-display text-3xl text-warm-text tracking-tight">SteadyStep</span>
        </div>

        {/* Hero content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="mb-8">
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
              <path d="M10 70 Q30 20 60 40 Q90 60 110 10" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
              <path d="M10 55 Q35 30 60 48 Q85 65 110 25" stroke="#1A8A7D" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.35" />
              <circle cx="60" cy="42" r="6" fill="#1A8A7D" opacity="0.5" />
              <circle cx="20" cy="65" r="4" fill="#1A8A7D" opacity="0.3" />
              <circle cx="100" cy="18" r="4" fill="#1A8A7D" opacity="0.3" />
            </svg>
          </div>

          <h1 className="font-display text-[28px] text-warm-text leading-tight mb-4">
            {o.tagline}
          </h1>
          <p className="text-base text-warm-muted leading-relaxed max-w-xs">
            {o.taglineSubtitle}
          </p>
        </div>

        {/* Pinned CTA */}
        <div className="pb-8 pt-3 flex-shrink-0">
          <Button variant="primary" fullWidth onClick={() => setStep('setup')}>
            {o.cta}
          </Button>
          <p className="text-center text-sm text-warm-muted mt-3">{o.noAccount}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col px-6 bg-warm-bg">
      {/* Back arrow */}
      <div className="pt-10 pb-4 flex items-center flex-shrink-0">
        <button
          onClick={() => setStep('welcome')}
          className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-warm-accent-light"
        >
          <ArrowLeft size={22} className="text-warm-text" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <h1 className="font-display text-2xl text-warm-text mb-8">
          {o.setup}
        </h1>

        <div className="flex flex-col gap-8 pb-4">
          {/* Name */}
          <Input
            label={o.nameLabel}
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            placeholder={o.namePlaceholder}
          />

          {/* Balance confidence */}
          <div>
            <p className="text-sm font-semibold text-warm-text mb-3">
              {o.confidenceLabel}
            </p>
            <div className="flex gap-2">
              {CONFIDENCE_EMOJIS.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => setConfidence(i + 1)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-card border-2 transition-all ${
                    confidence === i + 1
                      ? 'border-teal bg-teal-light'
                      : 'border-warm-border bg-white'
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-[10px] text-warm-muted leading-tight text-center px-1">
                    {o.confidence[i]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Fallen last year */}
          <div>
            <p className="text-sm font-semibold text-warm-text mb-3">
              {o.fallenLabel}
            </p>
            <div className="flex gap-3">
              {[o.yes, o.no].map((label, i) => {
                const val = i === 0
                return (
                  <button
                    key={label}
                    onClick={() => setFallen(val)}
                    className={`flex-1 h-16 rounded-btn border-2 font-semibold text-lg transition-all ${
                      fallen === val
                        ? 'border-teal bg-teal-light text-teal'
                        : 'border-warm-border bg-white text-warm-muted'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Pinned CTA */}
      <div className="pb-8 pt-3 flex-shrink-0">
        <Button variant="primary" fullWidth onClick={handleStart} disabled={!canSubmit}>
          {o.submit}
        </Button>
      </div>
    </div>
  )
}
