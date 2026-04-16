import { cn } from '../../lib/utils'

interface ExerciseIllustrationProps {
  exerciseId: string
  className?: string
}

// Simple CSS-animated SVG illustrations for each exercise
const illustrations: Record<string, () => JSX.Element> = {
  'heel-raises': () => (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      <g className="animate-stand-balance" style={{ transformOrigin: '100px 130px' }}>
        {/* Body */}
        <circle cx="100" cy="40" r="16" fill="#E6F5F3" stroke="#1A8A7D" strokeWidth="2.5" />
        <line x1="100" y1="56" x2="100" y2="100" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        {/* Arms */}
        <line x1="100" y1="68" x2="70" y2="88" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="68" x2="130" y2="88" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        {/* Legs — heels raised */}
        <line x1="100" y1="100" x2="84" y2="130" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="100" y1="100" x2="116" y2="130" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        {/* Feet on tiptoe */}
        <ellipse cx="84" cy="133" rx="7" ry="4" fill="#1A8A7D" opacity="0.7" />
        <ellipse cx="116" cy="133" rx="7" ry="4" fill="#1A8A7D" opacity="0.7" />
      </g>
      {/* Chair back (support) */}
      <rect x="135" y="50" width="5" height="90" rx="2.5" fill="#1A8A7D" opacity="0.25" />
      <rect x="128" y="50" width="19" height="4" rx="2" fill="#1A8A7D" opacity="0.25" />
      {/* Up arrows */}
      <text x="60" y="100" fill="#1A8A7D" fontSize="18" opacity="0.5">↑</text>
    </svg>
  ),
  'sit-to-stand': () => (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      {/* Chair */}
      <rect x="55" y="95" width="90" height="8" rx="4" fill="#1A8A7D" opacity="0.2" />
      <rect x="57" y="103" width="6" height="40" rx="3" fill="#1A8A7D" opacity="0.2" />
      <rect x="137" y="103" width="6" height="40" rx="3" fill="#1A8A7D" opacity="0.2" />
      <rect x="130" y="55" width="5" height="48" rx="2.5" fill="#1A8A7D" opacity="0.2" />
      <g className="animate-walk" style={{ transformOrigin: '95px 100px' }}>
        {/* Figure rising */}
        <circle cx="95" cy="35" r="15" fill="#E6F5F3" stroke="#1A8A7D" strokeWidth="2.5" />
        <line x1="95" y1="50" x2="95" y2="95" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="95" y1="65" x2="70" y2="82" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="95" y1="65" x2="118" y2="80" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="95" y1="95" x2="78" y2="130" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="95" y1="95" x2="110" y2="128" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  ),
  'heel-to-toe-walk': () => (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      {/* Line on floor */}
      <line x1="30" y1="140" x2="170" y2="140" stroke="#1A8A7D" strokeWidth="2" strokeDasharray="4,4" opacity="0.4" />
      <g className="animate-walk" style={{ transformOrigin: '90px 100px' }}>
        <circle cx="90" cy="32" r="15" fill="#E6F5F3" stroke="#1A8A7D" strokeWidth="2.5" />
        <line x1="90" y1="47" x2="90" y2="90" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="90" y1="60" x2="68" y2="76" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="90" y1="60" x2="112" y2="74" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="90" y1="90" x2="78" y2="130" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="78" y1="130" x2="80" y2="140" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="90" y1="90" x2="104" y2="120" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="104" y1="120" x2="95" y2="128" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text x="145" y="135" fill="#1A8A7D" fontSize="22" opacity="0.4">→</text>
    </svg>
  ),
  'single-leg-stand': () => (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      <g className="animate-stand-balance" style={{ transformOrigin: '100px 120px' }}>
        <circle cx="100" cy="30" r="16" fill="#E6F5F3" stroke="#1A8A7D" strokeWidth="2.5" />
        <line x1="100" y1="46" x2="100" y2="92" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="100" y1="62" x2="74" y2="80" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="62" x2="126" y2="80" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        {/* Standing leg */}
        <line x1="100" y1="92" x2="92" y2="130" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="92" y1="130" x2="84" y2="138" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="84" y1="138" x2="104" y2="140" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        {/* Lifted leg */}
        <line x1="100" y1="92" x2="116" y2="110" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="116" y1="110" x2="128" y2="100" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  ),
  'side-steps': () => (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      <line x1="30" y1="145" x2="170" y2="145" stroke="#1A8A7D" strokeWidth="1.5" opacity="0.2" />
      <g className="animate-side-step" style={{ transformOrigin: '95px 100px' }}>
        <circle cx="95" cy="32" r="15" fill="#E6F5F3" stroke="#1A8A7D" strokeWidth="2.5" />
        <line x1="95" y1="47" x2="95" y2="92" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="95" y1="62" x2="72" y2="72" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="95" y1="62" x2="118" y2="72" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        {/* Feet spread apart */}
        <line x1="95" y1="92" x2="78" y2="132" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="78" y1="132" x2="68" y2="138" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="95" y1="92" x2="112" y2="130" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="112" y1="130" x2="122" y2="136" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text x="40" y="100" fill="#1A8A7D" fontSize="18" opacity="0.35">←</text>
      <text x="148" y="100" fill="#1A8A7D" fontSize="18" opacity="0.35">→</text>
    </svg>
  ),
  'seated-knee-extension': () => (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
      {/* Chair */}
      <rect x="50" y="90" width="80" height="7" rx="3.5" fill="#1A8A7D" opacity="0.2" />
      <rect x="52" y="97" width="6" height="48" rx="3" fill="#1A8A7D" opacity="0.2" />
      <rect x="122" y="97" width="6" height="48" rx="3" fill="#1A8A7D" opacity="0.2" />
      <rect x="122" y="48" width="5" height="50" rx="2.5" fill="#1A8A7D" opacity="0.2" />
      {/* Seated figure */}
      <circle cx="90" cy="48" r="15" fill="#E6F5F3" stroke="#1A8A7D" strokeWidth="2.5" />
      <line x1="90" y1="63" x2="90" y2="90" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
      <line x1="90" y1="70" x2="68" y2="82" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="90" y1="70" x2="112" y2="82" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bent leg */}
      <line x1="90" y1="90" x2="74" y2="110" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
      <line x1="74" y1="110" x2="68" y2="128" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
      {/* Extended leg (animated) */}
      <g className="animate-walk" style={{ transformOrigin: '90px 90px' }}>
        <line x1="90" y1="90" x2="105" y2="108" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
        <line x1="105" y1="108" x2="140" y2="100" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="145" cy="100" rx="6" ry="4" fill="#1A8A7D" opacity="0.6" />
      </g>
    </svg>
  ),
}

const defaultIllustration = () => (
  <svg viewBox="0 0 200 160" fill="none" className="w-full h-full">
    <g className="animate-stand-balance" style={{ transformOrigin: '100px 100px' }}>
      <circle cx="100" cy="40" r="18" fill="#E6F5F3" stroke="#1A8A7D" strokeWidth="2.5" />
      <line x1="100" y1="58" x2="100" y2="105" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="72" x2="76" y2="90" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="72" x2="124" y2="90" stroke="#1A8A7D" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="105" x2="84" y2="140" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="105" x2="116" y2="140" stroke="#1A8A7D" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
)

export function ExerciseIllustration({ exerciseId, className }: ExerciseIllustrationProps) {
  const IllustrationComponent = illustrations[exerciseId] || defaultIllustration

  return (
    <div
      className={cn(
        'w-full aspect-video bg-teal-light rounded-card flex items-center justify-center overflow-hidden',
        className,
      )}
    >
      <div className="w-40 h-32">
        <IllustrationComponent />
      </div>
    </div>
  )
}
