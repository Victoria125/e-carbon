import type { PopulationContextType } from '@/types/population'
import { createContext } from 'react'

export const PopulationContext = createContext<PopulationContextType | undefined>(undefined)
