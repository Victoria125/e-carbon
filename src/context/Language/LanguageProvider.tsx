import type { ReactNode } from 'react'
import type { Language, LanguageContextType } from '@/types/language'
import { useCallback, useMemo, useState } from 'react'
import LanguageContext from '@/context/Language/LanguageContext'
import TRANSLATIONS from '@/shared/assets/translations'

interface TranslationObject {
  [key: string]: string | TranslationObject
}

type TranslationValue = string | TranslationObject

// Função auxiliar para navegar no objeto de traduções
function getNestedValue(obj: TranslationObject, keys: string[]): TranslationValue | undefined {
  let value: TranslationValue = obj
  for (const key of keys) {
    if (typeof value === 'object' && value !== null && key in value) {
      value = value[key]
    } else {
      return undefined
    }
  }
  return value
}

// Função auxiliar para obter tradução com fallback
function getTranslation(language: Language, key: string): string {
  const keys = key.split('.')
  const translationsByLanguage = TRANSLATIONS as Record<string, TranslationObject>
  const value = getNestedValue(translationsByLanguage[language], keys)

  if (typeof value === 'string') {
    return value
  }

  const fallbackValue = getNestedValue(translationsByLanguage.br, keys)
  return typeof fallbackValue === 'string' ? fallbackValue : key
}

// Função para obter o idioma inicial (sem persistência)
function getInitialLanguage(): Language {
  return 'br' // Idioma padrão ao carregar a aplicação
}

export default function LanguageProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false)

  // Função para alterar o idioma (sem salvar em localStorage)
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage)
  }, [])

  const translate = useCallback((key: string): string => {
    return getTranslation(language, key)
  }, [language])

  const contextValue: LanguageContextType = useMemo(() => ({
    language,
    setLanguage,
    t: translate,
    showLanguageSelector,
    setShowLanguageSelector,
    hasSelectedLanguage,
    setHasSelectedLanguage
  }), [
    translate,
    language,
    setLanguage,
    showLanguageSelector,
    hasSelectedLanguage
  ])

  return (
    <LanguageContext value={contextValue}>
      {children}
    </LanguageContext>
  )
}
