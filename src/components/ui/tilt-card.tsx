import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  tiltIntensity?: number
  springConfig?: {
    stiffness?: number
    damping?: number
  }
  perspective?: number
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const defaultSpringConfig = { stiffness: 300, damping: 30 }

export function TiltCard({
  children,
  className = '',
  tiltIntensity = 10,
  springConfig = defaultSpringConfig,
  perspective = 1000,
  onClick,
  onMouseEnter,
  onMouseLeave
}: TiltCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, springConfig)
  const mouseYSpring = useSpring(y, springConfig)

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${tiltIntensity}deg`, `-${tiltIntensity}deg`]
  )
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${tiltIntensity}deg`, `${tiltIntensity}deg`]
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    x.set(0)
    y.set(0)
    onMouseLeave?.(e)
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(e)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.925 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
        perspective: `${perspective}px`
      }}
      className={`transform-gpu ${className}`}>
      {children}
    </motion.div>
  )
}
