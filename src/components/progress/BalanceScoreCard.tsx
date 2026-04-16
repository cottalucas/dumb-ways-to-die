import { Card } from '../ui/Card'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

interface WeekScore {
  label: string
  balanceScore: number
}

interface BalanceScoreCardProps {
  weeklyData: WeekScore[]
}

export function BalanceScoreCard({ weeklyData }: BalanceScoreCardProps) {
  if (weeklyData.length === 0) return null

  const sparkData = weeklyData.map(w => ({ score: w.balanceScore, week: w.label }))
  const current = weeklyData[weeklyData.length - 1].balanceScore
  const prev = weeklyData[0].balanceScore
  const pct = prev > 0 ? Math.round(((current - prev) / prev) * 100) : 0

  return (
    <Card variant="elevated" className="overflow-hidden">
      <div className="flex items-end gap-2 mb-1">
        <span className="font-serif text-[64px] leading-none text-teal font-bold">{current}</span>
        <span className="font-serif text-2xl text-text-muted mb-3">/ 100</span>
      </div>
      <p className="text-sm text-text-secondary mb-3">Your balance confidence score</p>
      {pct !== 0 && (
        <span className="inline-flex items-center gap-1 bg-green-50 text-accent-green text-xs font-semibold px-3 py-1 rounded-full mb-4">
          ↑ {pct}% from 4 weeks ago
        </span>
      )}
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Line
              type="monotone"
              dataKey="score"
              stroke="#1A8A7D"
              strokeWidth={2.5}
              dot={{ fill: '#1A8A7D', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 4 }}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
              formatter={(v) => [v, 'Balance score']}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.week ?? ''}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
