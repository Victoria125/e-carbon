import type { LanguageContextType } from '@/types/language'
import { createContext } from 'react'

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export default LanguageContext
