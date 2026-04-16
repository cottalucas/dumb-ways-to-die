import { BarChart2 } from 'lucide-react'

export function Progress() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center bg-warm-bg min-h-full py-16">
      <div className="w-16 h-16 rounded-full bg-warm-accent-light flex items-center justify-center mb-5">
        <BarChart2 size={28} className="text-warm-muted" />
      </div>
      <h2 className="font-display text-2xl text-warm-text mb-3">Fortschritt</h2>
      <p className="text-base text-warm-muted leading-relaxed max-w-xs">
        Hier werden Ihre Übungsfortschritte, Balance-Scores und Aktivitätstrends erscheinen.
      </p>
      <p className="text-sm text-warm-muted mt-4 font-medium">Demnächst verfügbar</p>
    </div>
  )
}
