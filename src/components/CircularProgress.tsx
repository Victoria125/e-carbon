interface CircularProgressProps {
  percent: number
  size?: number
  strokeWidth?: number
  color?: string
  isPointOfCare?: boolean
}

export function CircularProgress({
  percent,
  size = 120,
  strokeWidth = 10,
  color = 'rgba(251, 75, 75, 1)',
  isPointOfCare = false
}: Readonly<CircularProgressProps>) {
  const clampPercent = Math.max(0, Math.min(100, percent))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // valor do progresso
  const progress = (clampPercent / 100) * circumference

  // começa embaixo (90°) e gira pra esquerda (convencional) ou direita (poc)
  const rotation = 90
  const direction = isPointOfCare ? 1 : -1 // pointOfCare = horário, convencional = anti-horário

  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(${rotation} ${size / 2} ${size / 2})`}>
          {/* Círculo de fundo */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - 0.5}
            stroke="rgba(255, 255, 255, 1)"
            strokeWidth={strokeWidth}
            fill="none" />

          {/* Círculo do progresso */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - 0.5}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{
              transform: direction === -1 ? 'rotate(180deg) scaleY(-1) scaleX(-1)' : 'rotate(180deg) scaleX(-1) scaleY(1)',
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 0.9s ease-out'
            }} />
        </g>
      </svg>
    </div>
  )
}

export default CircularProgress
