import { useState } from 'react'
import { ChevronRight, ChevronDown, ChevronUp, Shield, Bell, Globe } from 'lucide-react'
import { otagoExercises, ExerciseCategory } from '../data/otago'

const categoryColor: Record<ExerciseCategory, string> = {
  Balance:    'bg-blue-50 text-blue-700',
  Kraft:      'bg-orange-50 text-orange-700',
  Stabilität: 'bg-green-50 text-green-700',
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="text-xs font-bold text-warm-muted uppercase tracking-widest mb-3 px-1">
      {title}
    </p>
  )
}

function SettingsRow({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button className="w-full flex items-center gap-4 px-5 py-5 border-b border-warm-border last:border-0 hover:bg-warm-bg">
      <Icon size={22} className="text-warm-muted flex-shrink-0" />
      <p className="flex-1 text-left text-lg font-medium text-warm-text">{label}</p>
      <ChevronRight size={22} className="text-warm-muted" />
    </button>
  )
}

function ExerciseLibrary() {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-card border border-warm-border bg-white overflow-hidden mb-6">
      {/* Toggle header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-4 px-5 py-5"
        aria-expanded={open}
      >
        <div className="flex-1 text-left">
          <p className="text-lg font-semibold text-warm-text">Übungsbibliothek</p>
          <p className="text-sm text-warm-muted mt-0.5">{otagoExercises.length} Übungen · Otago-Programm</p>
        </div>
        {open
          ? <ChevronUp size={22} className="text-warm-muted flex-shrink-0" />
          : <ChevronDown size={22} className="text-warm-muted flex-shrink-0" />
        }
      </button>

      {/* Exercise list */}
      {open && (
        <div className="border-t border-warm-border divide-y divide-warm-border">
          {otagoExercises.map(ex => (
            <div key={ex.id} className="flex items-start gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-warm-text">{ex.name}</p>
                <p className="text-sm text-warm-muted mt-0.5 leading-relaxed line-clamp-2">
                  {ex.description}
                </p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-[10px] flex-shrink-0 mt-0.5 ${categoryColor[ex.category]}`}>
                {ex.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Profile() {
  return (
    <div className="px-5 pt-8 pb-8 bg-warm-bg min-h-full">
      <h1 className="font-display text-3xl text-warm-text mb-8">Mein Profil</h1>

      {/* Exercise library accordion */}
      <SectionHeader title="Meine Übungen" />
      <ExerciseLibrary />

      {/* Settings */}
      <SectionHeader title="Einstellungen" />
      <div className="rounded-card border border-warm-border bg-white overflow-hidden mb-6">
        <SettingsRow icon={Globe} label="Sprache" />
        <SettingsRow icon={Bell} label="Benachrichtigungen" />
        <SettingsRow icon={Shield} label="Datenschutz" />
      </div>

      <p className="text-center text-sm text-warm-muted">SteadyStep Prototype v0.1</p>
    </div>
  )
}
