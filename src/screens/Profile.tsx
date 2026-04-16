import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Bell, Shield, Info, AlertTriangle, User, ArrowLeft } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useUser } from '../context/UserContext'

const CONFIDENCE_LABELS = ['', 'Not at all', 'Somewhat', 'Neutral', 'Confident', 'Very confident']

function PrivacyScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center h-16 px-4 border-b border-surface-border gap-3">
        <button
          onClick={onBack}
          className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-divider"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold text-text-primary">Your Data & Privacy</h1>
      </div>
      <div className="flex-1 px-5 py-6">
        <div className="flex flex-col gap-5 text-lg text-text-secondary leading-relaxed">
          <p>
            <strong className="text-text-primary">Anonymous by design.</strong> SteadyStep doesn't require an account, email address, or name verification. Your data is linked only to a random identifier stored on your device.
          </p>
          <p>
            <strong className="text-text-primary">Cloud storage.</strong> Your progress, sessions, and balance data are stored securely in Firebase (Google Cloud) in order to persist across devices and app reinstalls.
          </p>
          <p>
            <strong className="text-text-primary">Swiss data protection (FADP).</strong> This prototype is designed with the Federal Act on Data Protection in mind — data minimization, purpose limitation, and your right to erasure.
          </p>
          <p>
            <strong className="text-text-primary">Balance check data.</strong> Sway scores are saved to your profile after each check. Raw motion sensor readings are never stored — only the computed score.
          </p>
          <p>
            <strong className="text-text-primary">Prototype notice.</strong> This is a demonstration prototype and is not intended for medical use. Always consult a healthcare professional for medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}

export function Profile() {
  const navigate = useNavigate()
  const { name, balanceConfidence, setName, reset } = useUser()
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(name)
  const [remindersOn, setRemindersOn] = useState(true)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  if (showPrivacy) return <PrivacyScreen onBack={() => setShowPrivacy(false)} />

  const handleSaveName = () => {
    if (nameInput.trim()) setName(nameInput.trim())
    setEditingName(false)
  }

  const handleReset = () => {
    reset()
    navigate('/')
  }

  return (
    <div className="px-5 pt-6 pb-8">
      {/* Avatar + name */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-teal flex items-center justify-center mb-4">
          <User size={40} className="text-white" />
        </div>
        {editingName ? (
          <div className="flex items-center gap-2">
            <input
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              className="border-b-2 border-teal text-2xl font-serif text-center bg-transparent outline-none py-1 min-w-0 w-48"
              autoFocus
              onBlur={handleSaveName}
              onKeyDown={e => e.key === 'Enter' && handleSaveName()}
            />
          </div>
        ) : (
          <button
            onClick={() => { setEditingName(true); setNameInput(name) }}
            className="group py-2 px-4"
            aria-label="Edit name"
          >
            <h1 className="font-serif text-3xl font-semibold text-text-primary group-hover:text-teal transition-colors">
              {name}
            </h1>
          </button>
        )}
        <p className="text-base text-text-muted mt-1">Tap your name to edit</p>
      </div>

      {/* Profile section */}
      <p className="text-sm font-bold text-text-muted uppercase tracking-widest mb-3 px-1">Your Profile</p>
      <Card padding="none" className="mb-6 overflow-hidden">
        <div className="divide-y divide-surface-divider">
          <button
            onClick={() => { setEditingName(true); setNameInput(name) }}
            className="w-full flex items-center gap-4 px-5 py-5 hover:bg-surface"
          >
            <User size={22} className="text-text-muted flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="text-sm text-text-secondary">Name</p>
              <p className="text-lg font-medium text-text-primary">{name}</p>
            </div>
            <ChevronRight size={22} className="text-text-muted" />
          </button>

          <div className="w-full flex items-center gap-4 px-5 py-5">
            <span className="text-xl flex-shrink-0">⚖️</span>
            <div className="flex-1 text-left">
              <p className="text-sm text-text-secondary">Balance confidence</p>
              <p className="text-lg font-medium text-text-primary">{CONFIDENCE_LABELS[balanceConfidence] || 'Not set'}</p>
            </div>
          </div>

          {/* Reminders toggle */}
          <div className="w-full flex items-center gap-4 px-5 py-5">
            <Bell size={22} className="text-text-muted flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="text-lg font-medium text-text-primary">Daily reminder</p>
              <p className="text-sm text-text-secondary">9:00 AM each morning</p>
            </div>
            <button
              onClick={() => setRemindersOn(r => !r)}
              className={`relative w-16 h-9 rounded-full transition-colors flex-shrink-0 ${remindersOn ? 'bg-teal' : 'bg-surface-border'}`}
              aria-label={remindersOn ? 'Turn off reminders' : 'Turn on reminders'}
              role="switch"
              aria-checked={remindersOn}
            >
              <div className={`absolute top-1 w-7 h-7 rounded-full bg-white shadow-sm transition-all ${remindersOn ? 'left-8' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </Card>

      {/* About section */}
      <p className="text-sm font-bold text-text-muted uppercase tracking-widest mb-3 px-1">About</p>
      <Card padding="none" className="mb-6 overflow-hidden">
        <div className="divide-y divide-surface-divider">
          <div className="w-full flex items-center gap-4 px-5 py-5">
            <Info size={22} className="text-text-muted flex-shrink-0" />
            <div className="flex-1">
              <p className="text-lg font-medium text-text-primary">About SteadyStep</p>
              <p className="text-base text-text-secondary mt-0.5 leading-relaxed">
                A fall-prevention exercise app for adults 65+.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPrivacy(true)}
            className="w-full flex items-center gap-4 px-5 py-5 hover:bg-surface"
          >
            <Shield size={22} className="text-text-muted flex-shrink-0" />
            <p className="flex-1 text-left text-lg font-medium text-text-primary">Your Data & Privacy</p>
            <ChevronRight size={22} className="text-text-muted" />
          </button>
        </div>
      </Card>

      {/* Danger zone */}
      <Card padding="none" className="mb-8 overflow-hidden">
        <button
          onClick={() => setShowResetConfirm(true)}
          className="w-full flex items-center gap-4 px-5 py-5 hover:bg-red-50"
        >
          <AlertTriangle size={22} className="text-accent-red flex-shrink-0" />
          <p className="text-lg font-medium text-accent-red">Reset My Progress</p>
        </button>
      </Card>

      <p className="text-center text-sm text-text-muted">SteadyStep Prototype v0.1</p>

      {/* Reset confirm dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6" onClick={() => setShowResetConfirm(false)}>
          <div className="bg-white rounded-card p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-text-primary text-xl mb-3">Reset all progress?</h3>
            <p className="text-base text-text-secondary mb-6 leading-relaxed">
              This will delete all your sessions, balance scores, and settings. It cannot be undone.
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="destructive" fullWidth onClick={handleReset} className="border-2 border-accent-red">
                Yes, reset everything
              </Button>
              <Button variant="ghost" fullWidth onClick={() => setShowResetConfirm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
