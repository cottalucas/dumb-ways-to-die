import { useState } from 'react'
import { ChevronRight, ChevronDown, ChevronUp, Shield, Bell, Globe } from 'lucide-react'
import { otagoExercises, ExerciseCategory } from '../data/otago'
import { useLang } from '../context/LanguageContext'

const categoryColor: Record<ExerciseCategory, string> = {
  Balance:    'bg-blue-50 text-blue-700',
  Kraft:      'bg-orange-50 text-orange-700',
  Stabilität: 'bg-green-50 text-green-700',
}

function ExerciseLibrary() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-card border border-warm-border bg-white overflow-hidden mb-6">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-4 px-5 py-5"
        aria-expanded={open}
      >
        <div className="flex-1 text-left">
          <p className="text-lg font-semibold text-warm-text">{t.profile.libraryTitle}</p>
          <p className="text-sm text-warm-muted mt-0.5">{t.profile.librarySubtitle(otagoExercises.length)}</p>
        </div>
        {open
          ? <ChevronUp size={22} className="text-warm-muted flex-shrink-0" />
          : <ChevronDown size={22} className="text-warm-muted flex-shrink-0" />
        }
      </button>

      {open && (
        <div className="border-t border-warm-border divide-y divide-warm-border">
          {otagoExercises.map(ex => {
            const name = lang === 'en' ? ex.name_en : ex.name
            const category = lang === 'en' ? ex.category_en : t.categories[ex.category]
            const description = lang === 'en' ? ex.description_en : ex.description
            return (
              <div key={ex.id} className="flex items-start gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-warm-text">{name}</p>
                  <p className="text-sm text-warm-muted mt-0.5 leading-relaxed line-clamp-2">{description}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-[10px] flex-shrink-0 mt-0.5 ${categoryColor[ex.category]}`}>
                  {category}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function LanguageRow() {
  const { lang, setLang, t } = useLang()
  return (
    <div className="flex items-center gap-4 px-5 py-5 border-b border-warm-border">
      <Globe size={22} className="text-warm-muted flex-shrink-0" />
      <p className="flex-1 text-lg font-medium text-warm-text">{t.profile.language}</p>
      <div className="flex rounded-btn overflow-hidden border border-warm-border">
        {(['de', 'en'] as const).map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-4 h-10 text-sm font-semibold transition-colors ${
              lang === l
                ? 'bg-warm-text text-warm-off-white'
                : 'bg-white text-warm-muted hover:bg-warm-bg'
            }`}
          >
            {l === 'de' ? 'DE' : 'EN'}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Profile() {
  const { t } = useLang()

  return (
    <div className="px-5 pt-8 pb-8 bg-warm-bg min-h-full">
      <h1 className="font-display text-3xl text-warm-text mb-8">{t.profile.title}</h1>

      <p className="text-xs font-bold text-warm-muted uppercase tracking-widest mb-3 px-1">
        {t.profile.librarySection}
      </p>
      <ExerciseLibrary />

      <p className="text-xs font-bold text-warm-muted uppercase tracking-widest mb-3 px-1">
        {t.profile.settingsSection}
      </p>
      <div className="rounded-card border border-warm-border bg-white overflow-hidden mb-6">
        <LanguageRow />
        <button className="w-full flex items-center gap-4 px-5 py-5 border-b border-warm-border hover:bg-warm-bg">
          <Bell size={22} className="text-warm-muted flex-shrink-0" />
          <p className="flex-1 text-left text-lg font-medium text-warm-text">{t.profile.notifications}</p>
          <ChevronRight size={22} className="text-warm-muted" />
        </button>
        <button className="w-full flex items-center gap-4 px-5 py-5 hover:bg-warm-bg">
          <Shield size={22} className="text-warm-muted flex-shrink-0" />
          <p className="flex-1 text-left text-lg font-medium text-warm-text">{t.profile.privacy}</p>
          <ChevronRight size={22} className="text-warm-muted" />
        </button>
      </div>

      <p className="text-center text-sm text-warm-muted">{t.profile.version}</p>
    </div>
  )
}
