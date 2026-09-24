import type { LanguageContextType } from '@/types/language'
import { use } from 'react'
import LanguageContext from '@/context/Language/LanguageContext'

export default function useLanguage(): LanguageContextType {
  const context = use(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
