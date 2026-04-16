import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Bell, Shield, Info, AlertTriangle, User } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useUser } from '../context/UserContext'

const CONFIDENCE_LABELS = ['', 'Not at all', 'Somewhat', 'Neutral', 'Confident', 'Very confident']

function PrivacyScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center h-14 px-4 border-b border-surface-border gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-divider">
          <span className="text-xl">←</span>
        </button>
        <h1 className="text-base font-semibold text-text-primary">Your Data & Privacy</h1>
      </div>
      <div className="flex-1 px-5 py-6">
        <div className="flex flex-col gap-5 text-base text-text-secondary leading-relaxed">
          <p>
            <strong className="text-text-primary">On-device processing.</strong> All your exercise data, balance scores, and personal information are stored only on your device. Nothing is transmitted to external servers.
          </p>
          <p>
            <strong className="text-text-primary">No account required.</strong> SteadyStep doesn't require you to create an account or provide an email address. You remain anonymous.
          </p>
          <p>
            <strong className="text-text-primary">Swiss data protection (FADP).</strong> This prototype is designed with the Federal Act on Data Protection in mind — data minimization, purpose limitation, and your right to erasure.
          </p>
          <p>
            <strong className="text-text-primary">Motion sensor data.</strong> During Balance Check, your phone's accelerometer and gyroscope measure body sway. This data is processed immediately and never stored.
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
        <div className="w-20 h-20 rounded-full bg-teal flex items-center justify-center mb-4">
          <User size={32} className="text-white" />
        </div>
        {editingName ? (
          <div className="flex items-center gap-2">
            <input
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              className="border-b-2 border-teal text-xl font-serif text-center bg-transparent outline-none py-1 min-w-0 w-40"
              autoFocus
              onBlur={handleSaveName}
              onKeyDown={e => e.key === 'Enter' && handleSaveName()}
            />
          </div>
        ) : (
          <button onClick={() => { setEditingName(true); setNameInput(name) }} className="group">
            <h1 className="font-serif text-2xl font-semibold text-text-primary group-hover:text-teal transition-colors">
              {name}
            </h1>
          </button>
        )}
        <p className="text-sm text-text-muted mt-1">Tap name to edit</p>
      </div>

      {/* Settings section */}
      <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 px-1">Your Profile</h2>
      <Card padding="none" className="mb-5 overflow-hidden">
        <div className="divide-y divide-surface-divider">
          <button
            onClick={() => setEditingName(true)}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-surface"
          >
            <User size={16} className="text-text-muted flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="text-sm text-text-secondary">Name</p>
              <p className="text-base font-medium text-text-primary">{name}</p>
            </div>
            <ChevronRight size={16} className="text-text-muted" />
          </button>

          <div className="w-full flex items-center gap-3 px-5 py-4">
            <span className="text-sm text-text-muted flex-shrink-0">⚖️</span>
            <div className="flex-1 text-left">
              <p className="text-sm text-text-secondary">Balance confidence</p>
              <p className="text-base font-medium text-text-primary">{CONFIDENCE_LABELS[balanceConfidence] || 'Not set'}</p>
            </div>
          </div>

          <div className="w-full flex items-center gap-3 px-5 py-4">
            <Bell size={16} className="text-text-muted flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="text-base font-medium text-text-primary">Exercise reminders</p>
              <p className="text-sm text-text-secondary">Daily at 9:00 AM</p>
            </div>
            <button
              onClick={() => setRemindersOn(r => !r)}
              className={`relative w-11 h-6 rounded-full transition-colors ${remindersOn ? 'bg-teal' : 'bg-surface-border'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${remindersOn ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>
      </Card>

      <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 px-1">About</h2>
      <Card padding="none" className="mb-5 overflow-hidden">
        <div className="divide-y divide-surface-divider">
          <div className="w-full flex items-center gap-3 px-5 py-4">
            <Info size={16} className="text-text-muted flex-shrink-0" />
            <div className="flex-1">
              <p className="text-base font-medium text-text-primary">About SteadyStep</p>
              <p className="text-sm text-text-secondary mt-0.5 leading-relaxed">
                A fall-prevention exercise app for adults 65+, developed for clinical co-design.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPrivacy(true)}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-surface"
          >
            <Shield size={16} className="text-text-muted flex-shrink-0" />
            <p className="flex-1 text-left text-base font-medium text-text-primary">Your Data & Privacy</p>
            <ChevronRight size={16} className="text-text-muted" />
          </button>
        </div>
      </Card>

      <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 px-1">Danger Zone</h2>
      <Card padding="none" className="mb-8 overflow-hidden">
        <button
          onClick={() => setShowResetConfirm(true)}
          className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50"
        >
          <AlertTriangle size={16} className="text-accent-red flex-shrink-0" />
          <p className="text-base font-medium text-accent-red">Reset Progress</p>
        </button>
      </Card>

      <p className="text-center text-xs text-text-muted">SteadyStep Prototype v0.1</p>

      {/* Reset confirm dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6" onClick={() => setShowResetConfirm(false)}>
          <div className="bg-white rounded-card p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-text-primary text-lg mb-2">Reset all progress?</h3>
            <p className="text-sm text-text-secondary mb-5 leading-relaxed">
              This will delete all your session history, balance data, and personal settings. This cannot be undone.
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="destructive" fullWidth onClick={handleReset} className="border border-accent-red">
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
