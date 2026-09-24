import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Circle {
  id: number
  x: number
  y: number
  delay: number // Delay ao invés de tempo de duração
  scale: number // Escala final diferente para cada círculo
}

interface CirclesSparklesProps {
  readonly children: ReactNode
}

export default function CirclesSparkles({ children }: Readonly<CirclesSparklesProps>) {
  const [circles, setCircles] = useState<Circle[]>([])
  const timeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set())

  // Cleanup de todos os timeouts ao desmontar
  useEffect(() => {
    const timeouts = timeoutsRef.current
    return () => {
      for (const timeout of timeouts) {
        clearTimeout(timeout)
      }
      timeouts.clear()
    }
  }, [])

  const removeCirclesByTimestamp = useCallback((timestamp: number) => {
    setCircles((prev) => prev.filter((c) =>
      c.id !== timestamp && c.id !== timestamp + 1 && c.id !== timestamp + 2
    ))
  }, [])

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const timestamp = Date.now()
    const { clientX, clientY } = event

    // ALTERNATIVA 1: Usando delay progressivo
    const newCircles: Circle[] = [
      { id: timestamp, x: clientX, y: clientY, delay: 0, scale: 1 },
      { id: timestamp + 1, x: clientX, y: clientY, delay: 0.15, scale: 1 },
      { id: timestamp + 2, x: clientX, y: clientY, delay: 0.25, scale: 1 }
    ]

    setCircles((prev) => [...prev, ...newCircles])

    // Agendar limpeza dos círculos
    const timeout = setTimeout(() => {
      removeCirclesByTimestamp(timestamp)
      timeoutsRef.current.delete(timeout)
    }, 1000)

    timeoutsRef.current.add(timeout)
  }, [removeCirclesByTimestamp])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const mouseEvent = {
        clientX: 0,
        clientY: 0
      } as React.MouseEvent<HTMLElement>
      handleClick(mouseEvent)
    }
  }, [handleClick])

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'default',
          width: '100%',
          display: 'block',
          textAlign: 'left'
        }}>
        {children}
      </button>

      <div
        style={{
          top: 0,
          left: 0,
          width: '100dvw',
          height: '100dvh',
          position: 'fixed',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 99
        }}
        aria-hidden="true">
        <AnimatePresence>
          {circles.map((circle) => (
            <motion.div
              key={circle.id}
              initial={{
                opacity: 0,
                scale: 0,
                x: circle.x - 30,
                y: circle.y - 30
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, circle.scale]
              }}
              exit={{ opacity: 0 }}
              transition={{
                delay: circle.delay,
                duration: 0.6,
                ease: 'easeOut'
              }}
              style={{
                position: 'absolute',
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: '2px solid #52AE32',
                backgroundColor: 'transparent',
                pointerEvents: 'none'
              }} />
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
