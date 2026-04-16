import { useState } from 'react'
import { X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { Button } from '../components/ui/Button'

// Mock data — 30 days: 1=done, 0.5=partial, 0=skipped
const activityData: number[] = [
  1, 0, 1, 1, 0.5, 1, 0,
  1, 1, 0, 1, 1, 0.5, 1,
  0, 1, 1, 1, 0, 0.5, 1,
  1, 0, 1, 1, 1, 0.5, 1,
  1, 0.5, 1,
]

// Balance trend — single-leg stand seconds, 8 sessions over 4 weeks
const balanceData = [7, 8, 7, 9, 10, 11, 10, 12]

const CHART_W = 280
const CHART_H = 100
const PAD_X = 12
const PAD_Y = 10

function BalanceChart() {
  const min = Math.min(...balanceData) - 2
  const max = Math.max(...balanceData) + 2
  const n = balanceData.length

  const x = (i: number) => PAD_X + (i / (n - 1)) * (CHART_W - PAD_X * 2)
  const y = (v: number) => PAD_Y + (1 - (v - min) / (max - min)) * (CHART_H - PAD_Y * 2)

  const points = balanceData.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  const areaPoints = [
    `${x(0)},${CHART_H}`,
    ...balanceData.map((v, i) => `${x(i)},${y(v)}`),
    `${x(n - 1)},${CHART_H}`,
  ].join(' ')

  // Week labels
  const weekLabels = ['W1', 'W2', 'W3', 'W4']
  const weekXs = [0, 2, 4, 6].map(i => x(i))

  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H + 16}`} className="w-full">
      {/* Area fill */}
      <polygon points={areaPoints} fill="#1A8A7D" opacity="0.08" />
      {/* Grid lines */}
      {[min + 2, min + 4, min + 6].map(v => (
        <line
          key={v}
          x1={PAD_X} y1={y(v)}
          x2={CHART_W - PAD_X} y2={y(v)}
          stroke="#c8b89a" strokeWidth="1" opacity="0.4" strokeDasharray="3,3"
        />
      ))}
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke="#1A8A7D"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Data points */}
      {balanceData.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={i === n - 1 ? 5 : 3.5}
          fill={i === n - 1 ? '#1A8A7D' : '#f7f5f0'}
          stroke="#1A8A7D" strokeWidth="2"
        />
      ))}
      {/* Week labels */}
      {weekLabels.map((label, i) => (
        <text key={i} x={weekXs[i]} y={CHART_H + 13}
          textAnchor="middle" fontSize="10" fill="#7a6f64">
          {label}
        </text>
      ))}
    </svg>
  )
}

export function Progress() {
  const { t, lang } = useLang()
  const [modalOpen, setModalOpen] = useState(false)

  const currentVal = balanceData[balanceData.length - 1]
  const firstVal = balanceData[0]
  const pctChange = Math.round(((currentVal - firstVal) / firstVal) * 100)
  const unit = t.progress.balanceTrendUnit

  return (
    <div className="px-5 pt-6 pb-6 space-y-6">
      {/* Title */}
      <h1 className="font-display text-3xl text-warm-text">{t.progress.title}</h1>

      {/* — Section 1: Activity consistency strip — */}
      <div className="bg-white rounded-2xl px-5 py-5 shadow-sm border border-warm-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-warm-muted mb-1">
          {t.progress.activity}
        </p>
        <p className="text-sm text-warm-muted mb-4">{t.progress.activitySubtitle}</p>

        {/* 30-day strip: 5 rows × 6 cols + 5 trailing */}
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: 5 }).map((_, row) => (
            <div key={row} className="flex gap-1.5">
              {activityData.slice(row * 6, row * 6 + 6).map((val, col) => {
                const idx = row * 6 + col
                return (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        val === 1
                          ? '#1A8A7D'
                          : val === 0.5
                          ? 'linear-gradient(135deg, #1A8A7D 50%, #e0d9d0 50%)'
                          : '#e0d9d0',
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-3">
          {[
            { color: '#1A8A7D', label: lang === 'en' ? 'Done' : 'Erledigt' },
            { color: 'linear-gradient(135deg, #1A8A7D 50%, #e0d9d0 50%)', label: lang === 'en' ? 'Partial' : 'Teilweise' },
            { color: '#e0d9d0', label: lang === 'en' ? 'Skipped' : 'Ausgelassen' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: color }} />
              <span className="text-xs text-warm-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* — Section 2: Balance trend chart — */}
      <div className="bg-white rounded-2xl px-5 py-5 shadow-sm border border-warm-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-warm-muted mb-1">
          {t.progress.balanceTrend}
        </p>

        {/* Big stat */}
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-display text-4xl text-warm-text">
            {currentVal} {unit}
          </span>
          <span className="text-base font-semibold text-teal">
            +{pctChange}%
          </span>
        </div>

        <BalanceChart />
      </div>

      {/* — Section 3: Doctor report CTA — */}
      <Button variant="primary" fullWidth onClick={() => setModalOpen(true)}>
        {t.progress.doctorReport}
      </Button>

      {/* Doctor report modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-warm-dark/60" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-[380px] bg-warm-bg rounded-2xl p-6 shadow-xl">
            <button
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-warm-accent-light text-warm-muted"
              onClick={() => setModalOpen(false)}
            >
              <X size={18} />
            </button>
            <h2 className="font-display text-2xl text-warm-text mb-3 pr-8">
              {t.progress.doctorModalTitle}
            </h2>
            <p className="text-base text-warm-muted leading-relaxed">
              {t.progress.doctorModalBody}
            </p>
            <div className="mt-6">
              <Button variant="secondary" fullWidth onClick={() => setModalOpen(false)}>
                {t.progress.close}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
