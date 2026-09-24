import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  originX: number
  originY: number
}

interface LowPolyBackgroundProps {
  /**
   * Controla o tamanho dos triângulos.
   * Valores menores = triângulos maiores
   * Valores maiores = triângulos menores
   * @default 15
   */
  triangleSize?: number
  /**
   * Duração da animação em milissegundos
   * @default 32000
   */
  animationDuration?: number
}

export function LowPolyBackground({
  triangleSize = 6,
  animationDuration = 15000
}: Readonly<LowPolyBackgroundProps>) {
  const bgRef = useRef<HTMLDivElement>(null)
  const refreshTimeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const refreshDuration = animationDuration
    let numPointsX: number
    let numPointsY: number
    let unitWidth: number
    let unitHeight: number
    let points: Point[]

    const initializePoints = () => {
      points = []
      for (let y = 0; y < numPointsY; y++) {
        for (let x = 0; x < numPointsX; x++) {
          points.push({
            x: unitWidth * x,
            y: unitHeight * y,
            originX: unitWidth * x,
            originY: unitHeight * y
          })
        }
      }
    }

    const adjustPointPosition = (point: Point, index: number) => {
      // Validação: verifica se o ponto não está muito próximo de pontos adjacentes
      const adjacentIndices = [
        index - 1, // esquerda
        index + 1, // direita
        index - numPointsX, // cima
        index + numPointsX // baixo
      ]

      for (const adjIndex of adjacentIndices) {
        if (adjIndex >= 0 && adjIndex < points.length) {
          const adjPoint = points[adjIndex]
          const dx = point.x - adjPoint.x
          const dy = point.y - adjPoint.y
          const distance = Math.hypot(dx, dy)
          const minDistance = Math.min(unitWidth, unitHeight) * 0.4

          // Se muito próximo, afasta ligeiramente
          if (distance < minDistance && distance > 0) {
            const angle = Math.atan2(dy, dx)
            const pushDistance = (minDistance - distance) * 0.5
            point.x += Math.cos(angle) * pushDistance
            point.y += Math.sin(angle) * pushDistance
          }
        }
      }
    }

    const randomize = () => {
      // Limita o movimento para 30% do tamanho da célula para evitar sobreposições
      const maxDisplacementX = unitWidth * 0.3
      const maxDisplacementY = unitHeight * 0.3

      for (const point of points) {
        // Não move os pontos das bordas
        if (point.originX !== 0 && point.originX !== unitWidth * (numPointsX - 1)) {
          // Movimento limitado em X
          const randomOffsetX = (Math.random() - 0.5) * 2 * maxDisplacementX
          point.x = point.originX + randomOffsetX

          // Garante que não ultrapasse os limites das células adjacentes
          const minX = point.originX - maxDisplacementX
          const maxX = point.originX + maxDisplacementX
          point.x = Math.max(minX, Math.min(maxX, point.x))
        }

        if (point.originY !== 0 && point.originY !== unitHeight * (numPointsY - 1)) {
          // Movimento limitado em Y
          const randomOffsetY = (Math.random() - 0.5) * 2 * maxDisplacementY
          point.y = point.originY + randomOffsetY

          // Garante que não ultrapasse os limites das células adjacentes
          const minY = point.originY - maxDisplacementY
          const maxY = point.originY + maxDisplacementY
          point.y = Math.max(minY, Math.min(maxY, point.y))
        }

        // Ajusta posição para evitar sobreposições
        const index = points.indexOf(point)
        adjustPointPosition(point, index)
      }
    }

    const createPolygonPoints = (
      i: number,
      n: number,
      rando: number,
      coords: {
        topLeft: { x: number, y: number }
        topRight: { x: number, y: number }
        bottomLeft: { x: number, y: number }
        bottomRight: { x: number, y: number }
      }
    ) => {
      const { topLeft, topRight, bottomLeft, bottomRight } = coords

      if (rando === 0) {
        if (n === 0) {
          return {
            point1: i,
            point2: i + numPointsX,
            point3: i + numPointsX + 1,
            points: `${topLeft.x},${topLeft.y} ${bottomLeft.x},${bottomLeft.y} ${bottomRight.x},${bottomRight.y}`
          }
        }
        return {
          point1: i,
          point2: i + 1,
          point3: i + numPointsX + 1,
          points: `${topLeft.x},${topLeft.y} ${topRight.x},${topRight.y} ${bottomRight.x},${bottomRight.y}`
        }
      }

      if (n === 0) {
        return {
          point1: i,
          point2: i + numPointsX,
          point3: i + 1,
          points: `${topLeft.x},${topLeft.y} ${bottomLeft.x},${bottomLeft.y} ${topRight.x},${topRight.y}`
        }
      }
      return {
        point1: i + numPointsX,
        point2: i + 1,
        point3: i + numPointsX + 1,
        points: `${bottomLeft.x},${bottomLeft.y} ${topRight.x},${topRight.y} ${bottomRight.x},${bottomRight.y}`
      }
    }

    const createPolygon = (
      svg: SVGSVGElement,
      i: number,
      n: number,
      rando: number,
      coords: {
        topLeft: { x: number, y: number }
        topRight: { x: number, y: number }
        bottomLeft: { x: number, y: number }
        bottomRight: { x: number, y: number }
      }
    ) => {
      const polygon = document.createElementNS(svg.namespaceURI, 'polygon') as SVGPolygonElement & {
        point1: number
        point2: number
        point3: number
      }

      const polygonData = createPolygonPoints(i, n, rando, coords)
      polygon.point1 = polygonData.point1
      polygon.point2 = polygonData.point2
      polygon.point3 = polygonData.point3
      polygon.setAttribute('points', polygonData.points)
      polygon.setAttribute('fill', `rgba(0,0,0,${Math.random() / 3})`)

      const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
      animate.setAttribute('fill', 'freeze')
      animate.setAttribute('attributeName', 'points')
      animate.setAttribute('dur', `${refreshDuration}ms`)
      animate.setAttribute('calcMode', 'linear')
      polygon.appendChild(animate)
      svg.appendChild(polygon)
    }

    const createPolygons = (svg: SVGSVGElement) => {
      for (let i = 0; i < points.length; i++) {
        const point = points[i]
        if (
          point.originX !== unitWidth * (numPointsX - 1)
          && point.originY !== unitHeight * (numPointsY - 1)
        ) {
          const coords = {
            topLeft: { x: points[i].x, y: points[i].y },
            topRight: { x: points[i + 1].x, y: points[i + 1].y },
            bottomLeft: { x: points[i + numPointsX].x, y: points[i + numPointsX].y },
            bottomRight: { x: points[i + numPointsX + 1].x, y: points[i + numPointsX + 1].y }
          }

          const rando = Math.floor(Math.random() * 2)

          for (let n = 0; n < 2; n++) {
            createPolygon(svg, i, n, rando, coords)
          }
        }
      }
    }

    const refresh = () => {
      if (!bgRef.current) return

      randomize()
      const svg = bgRef.current.querySelector('svg')
      if (!svg) return

      for (const node of Array.from(svg.childNodes)) {
        const polygon = node as SVGPolygonElement & {
          point1: number
          point2: number
          point3: number
        }
        const animate = polygon.childNodes[0] as SVGAnimateElement
        const toValue = animate.getAttribute('to')
        if (toValue) {
          animate.setAttribute('from', toValue)
        }
        animate.setAttribute(
          'to',
          `${points[polygon.point1].x},${points[polygon.point1].y} ${points[polygon.point2].x},${points[polygon.point2].y} ${points[polygon.point3].x},${points[polygon.point3].y}`
        )
        animate.beginElement()
      }

      refreshTimeoutRef.current = Number(globalThis.setTimeout(() => {
        refresh()
      }, refreshDuration))
    }

    const onLoad = () => {
      if (!bgRef.current) return

      bgRef.current.innerHTML = ''

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('width', String(window.innerWidth))
      svg.setAttribute('height', String(window.innerHeight))
      bgRef.current.appendChild(svg)

      const unitSize = (window.innerWidth + window.innerHeight) / triangleSize
      numPointsX = Math.ceil(window.innerWidth / unitSize) + 1
      numPointsY = Math.ceil(window.innerHeight / unitSize) + 1
      unitWidth = Math.ceil(window.innerWidth / (numPointsX - 1))
      unitHeight = Math.ceil(window.innerHeight / (numPointsY - 1))

      initializePoints()
      randomize()
      createPolygons(svg)
      refresh()
    }

    const onResize = () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
      onLoad()
    }

    onLoad()

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
    }
  }, [triangleSize, animationDuration])

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 w-screen h-screen min-h-screen min-w-full -z-10"
      style={{
        background: 'linear-gradient(0deg, rgba(9, 45, 84) 0%, rgba(1, 54, 114) 70%)'
      }} />
  )
}
