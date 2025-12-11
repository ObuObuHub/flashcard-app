interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 80,
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const dimension = sizes[size]

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Brain silhouette */}
      <path
        d="M32 8C20 8 12 16 12 26c0 6 3 11 7 14v8c0 2 2 4 4 4h18c2 0 4-2 4-4v-8c4-3 7-8 7-14 0-10-8-18-20-18z"
        fill="url(#brainGradient)"
        filter="url(#glow)"
      />

      {/* Brain folds - left hemisphere */}
      <path
        d="M20 20c0-2 2-4 5-4s5 2 5 4c0 1-1 2-2 3 1 1 2 2 2 4 0 3-2 5-5 5s-5-2-5-5c0-2 1-3 2-4-1-1-2-2-2-3z"
        fill="#4338ca"
        opacity="0.5"
      />

      {/* Brain folds - right hemisphere */}
      <path
        d="M34 20c0-2 2-4 5-4s5 2 5 4c0 1-1 2-2 3 1 1 2 2 2 4 0 3-2 5-5 5s-5-2-5-5c0-2 1-3 2-4-1-1-2-2-2-3z"
        fill="#4338ca"
        opacity="0.5"
      />

      {/* Center divide */}
      <line
        x1="32"
        y1="12"
        x2="32"
        y2="40"
        stroke="#4338ca"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Ebbinghaus curve (memory retention over time) */}
      <path
        d="M16 54 Q 24 48, 28 50 T 36 48 T 44 46 T 52 44"
        stroke="url(#curveGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
      />

      {/* Spaced repetition dots */}
      <circle cx="28" cy="50" r="2" fill="#10b981" />
      <circle cx="36" cy="48" r="2" fill="#10b981" />
      <circle cx="44" cy="46" r="2" fill="#10b981" />
    </svg>
  )
}

export function LogoWithText({ className, size = 'md' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <Logo size={size} />
      <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
        EbbiMed
      </span>
    </div>
  )
}
