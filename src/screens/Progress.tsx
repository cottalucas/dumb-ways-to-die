import { BarChart2 } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export function Progress() {
  const { t } = useLang()
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center bg-warm-bg min-h-full py-16">
      <div className="w-16 h-16 rounded-full bg-warm-accent-light flex items-center justify-center mb-5">
        <BarChart2 size={28} className="text-warm-muted" />
      </div>
      <h2 className="font-display text-2xl text-warm-text mb-3">{t.progress.title}</h2>
      <p className="text-base text-warm-muted leading-relaxed max-w-xs">{t.progress.description}</p>
      <p className="text-sm text-warm-muted mt-4 font-medium">{t.progress.comingSoon}</p>
    </div>
  )
}
