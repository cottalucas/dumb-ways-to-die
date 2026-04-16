import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Smartphone, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'

type Phase = 'intro' | 'measuring' | 'analyzing' | 'results'

export function BalanceCheck() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('intro')
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    if (phase === 'measuring') {
      if (countdown <= 0) {
        setPhase('analyzing')
        setTimeout(() => setPhase('results'), 700)
        return
      }
      const t = setInterval(() => setCountdown(c => c - 1), 1000)
      return () => clearInterval(t)
    }
  }, [phase, countdown])

  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex flex-col px-5 pt-4 pb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-divider mb-4">
          <ArrowLeft size={20} />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Smartphone illustration */}
          <div className="relative mb-8">
            <div className="w-20 h-20 rounded-full bg-teal-light flex items-center justify-center">
              <Smartphone size={36} className="text-teal" />
            </div>
            {/* Motion lines */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2">
              <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                <path d="M4 6 Q12 18 4 30" stroke="#1A8A7D" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <path d="M12 2 Q22 18 12 34" stroke="#1A8A7D" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
              </svg>
            </div>
            <div className="absolute -left-2 top-1/2 -translate-y-1/2">
              <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                <path d="M20 6 Q12 18 20 30" stroke="#1A8A7D" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <path d="M12 2 Q2 18 12 34" stroke="#1A8A7D" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
              </svg>
            </div>
          </div>

          <h1 className="font-serif text-3xl font-semibold text-text-primary mb-4">Quick Balance Check</h1>
          <p className="text-base text-text-secondary leading-relaxed max-w-xs mb-8">
            Stand on a flat surface and hold your phone against your chest. We'll measure your stability for 30 seconds.
          </p>

          <div className="w-full border-l-4 border-accent-orange bg-amber-50 p-4 rounded-r-card text-left mb-6">
            <p className="text-sm text-text-primary leading-relaxed">
              <span className="font-semibold">Before you start: </span>
              Stand near a wall or sturdy chair for support. Stop immediately if you feel unsteady.
            </p>
          </div>
        </div>

        <Button variant="primary" fullWidth onClick={() => { setCountdown(30); setPhase('measuring') }}>
          I'm Ready
        </Button>
      </div>
    )
  }

  if (phase === 'measuring' || phase === 'analyzing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5">
        {/* Pulsing rings */}
        <div className="relative mb-8">
          <div className="w-36 h-36 rounded-full bg-teal opacity-10 animate-pulse-ring2 absolute inset-0 -m-8" />
          <div className="w-36 h-36 rounded-full bg-teal opacity-15 animate-pulse-ring absolute inset-0 -m-4" />
          <div className="w-36 h-36 rounded-full bg-teal-light border-4 border-teal flex items-center justify-center relative">
            {phase === 'analyzing' ? (
              <p className="text-sm font-semibold text-teal">Analyzing...</p>
            ) : (
              <div className="text-center">
                <span className="font-serif text-5xl font-semibold text-teal leading-none">{countdown}</span>
                <p className="text-xs text-teal mt-1">seconds</p>
              </div>
            )}
          </div>
        </div>

        <p className="text-xl text-text-secondary font-medium">Hold steady...</p>
        <p className="text-sm text-text-muted mt-2">Keep the phone pressed to your chest</p>
      </div>
    )
  }

  // Results
  return (
    <div className="min-h-screen flex flex-col px-5 pt-6 pb-8">
      <div className="flex-1 flex flex-col">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center animate-scale-in">
            <CheckCircle size={32} className="text-accent-green" />
          </div>
        </div>

        {/* Score */}
        <div className="bg-white border border-surface-border rounded-card p-5 mb-4 text-center">
          <p className="text-sm text-text-secondary mb-2">Your sway score</p>
          <div className="flex items-end justify-center gap-1 mb-2">
            <span className="font-serif text-[52px] leading-none font-semibold text-teal">74</span>
            <span className="font-serif text-2xl text-text-muted mb-2">/ 100</span>
          </div>
          <span className="inline-flex items-center gap-1 bg-green-50 text-accent-green text-xs font-semibold px-3 py-1 rounded-full">
            ↑ 6 points better than your first check
          </span>
        </div>

        {/* Stability spectrum */}
        <div className="bg-white border border-surface-border rounded-card p-5 mb-4">
          <p className="text-sm font-semibold text-text-primary mb-3">Stability spectrum</p>
          <div className="relative h-4 rounded-full overflow-hidden mb-2" style={{
            background: 'linear-gradient(to right, #DC4F4F, #E8913A, #F5C842, #3BA676)'
          }}>
            {/* Marker at 74% */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-text-primary shadow-sm transition-all"
              style={{ left: 'calc(74% - 8px)' }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-muted">
            <span>Needs work</span>
            <span>Developing</span>
            <span>Strong</span>
          </div>
        </div>

        {/* AI message */}
        <div className="bg-ai-bubble rounded-card p-4 mb-6">
          <p className="text-sm text-text-primary leading-relaxed">
            Your lateral stability is improving. The side-step exercises are paying off.
          </p>
        </div>

        <button
          onClick={() => {}}
          className="text-sm text-text-muted text-center hover:text-text-secondary mb-4"
        >
          Learn more about this score
        </button>
      </div>

      <Button variant="primary" fullWidth onClick={() => navigate('/home')}>
        Done
      </Button>
    </div>
  )
}
