import { use } from 'react'
import { PopulationContext } from '@/context/Population/PopulationContext'

export function usePopulation() {
  const context = use(PopulationContext)
  if (!context) {
    throw new Error('usePopulation deve ser usado dentro de PopulationProvider')
  }
  return context
}
