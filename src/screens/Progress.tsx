import { useState } from 'react'
import {
  BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts'
import { Info } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { BalanceScoreCard } from '../components/progress/BalanceScoreCard'
import { weeklyProgress, balanceChecks, recentSessions } from '../data/progress'
import { milestones } from '../data/milestones'

function DifficultyDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="flex gap-0.5 items-center">
      {[1, 2, 3].map(i => (
        <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= level ? 'bg-teal' : 'bg-surface-border'}`} />
      ))}
    </span>
  )
}

export function Progress() {
  const [showAllMilestones, setShowAllMilestones] = useState(false)
  const displayedMilestones = showAllMilestones ? milestones : milestones.slice(0, 5)

  const currentWeek = weeklyProgress[weeklyProgress.length - 1]

  return (
    <div className="px-5 pt-6 pb-6">
      <h1 className="font-serif text-3xl font-semibold text-text-primary mb-5">Progress</h1>

      {/* Balance Score Hero */}
      <div className="mb-4 animate-fade-slide-in">
        <BalanceScoreCard />
      </div>

      {/* Weekly Activity */}
      <Card className="mb-4 animate-fade-slide-in" style={{ animationDelay: '50ms' }}>
        <h2 className="text-base font-bold text-text-primary mb-1">Last 4 weeks</h2>
        <p className="text-xs text-text-secondary mb-4">Minutes of exercise per week</p>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyProgress} barSize={32}>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                formatter={(v) => [`${v} min`, 'Duration']}
              />
              <Bar
                dataKey="minutes"
                radius={[6, 6, 0, 0]}
                name="Minutes"
              >
                {weeklyProgress.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="#1A8A7D"
                    fillOpacity={entry.label === 'This week' ? 1 : 0.3}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-text-secondary mt-2">
          This week: {currentWeek.sessions} sessions, {currentWeek.minutes} minutes
        </p>
      </Card>

      {/* Balance Check Trend */}
      <Card className="mb-4 animate-fade-slide-in" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-base font-bold text-text-primary">Sway Score</h2>
          <Info size={14} className="text-text-muted" />
        </div>
        <p className="text-xs text-text-secondary mb-4">Lower sway = better stability</p>
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceChecks}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1EDE8" />
              <XAxis dataKey="weekLabel" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 80]} hide />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                formatter={(v) => [v, 'Sway score']}
              />
              <Line
                type="monotone"
                dataKey="swayScore"
                stroke="#1A8A7D"
                strokeWidth={2.5}
                dot={{ fill: '#1A8A7D', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-accent-green mt-2 font-medium">
          Your sway has decreased 12% — that means better stability
        </p>
      </Card>

      {/* Milestones */}
      <Card className="mb-4 animate-fade-slide-in" style={{ animationDelay: '150ms' }}>
        <h2 className="text-base font-bold text-text-primary mb-4">Milestones</h2>
        <div className="flex flex-col gap-3">
          {displayedMilestones.map(m => (
            <div key={m.id} className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5 ${
                m.achieved ? 'bg-green-50' : 'bg-surface-divider'
              }`}>
                {m.achieved ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7 L5.5 10 L11.5 4" stroke="#3BA676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className="text-xs text-text-muted">{m.icon}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-semibold ${m.achieved ? 'text-text-primary' : 'text-text-muted'}`}>
                    {m.achieved ? m.icon : ''} {m.title}
                  </p>
                </div>
                <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
        {milestones.length > 5 && (
          <button
            onClick={() => setShowAllMilestones(s => !s)}
            className="mt-4 text-sm font-semibold text-teal hover:underline"
          >
            {showAllMilestones ? 'Show less' : `View all (${milestones.length})`}
          </button>
        )}
      </Card>

      {/* Recent Sessions */}
      <Card className="animate-fade-slide-in" style={{ animationDelay: '200ms' }}>
        <h2 className="text-base font-bold text-text-primary mb-4">Recent Sessions</h2>
        <div className="flex flex-col divide-y divide-surface-divider">
          {recentSessions.map(s => (
            <div key={s.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary">{s.sessionName}</p>
                <p className="text-xs text-text-muted mt-0.5">{s.date} · {s.durationMinutes} min</p>
              </div>
              <DifficultyDots level={s.difficulty} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
