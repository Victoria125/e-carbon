export type Language = 'br' | 'en' | 'es' | 'cn'

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  showLanguageSelector: boolean
  setShowLanguageSelector: (show: boolean) => void
  hasSelectedLanguage: boolean
  setHasSelectedLanguage: (selected: boolean) => void
}

interface ImageFlag { src: string, alt: string }

export interface LanguageConfig {
  code: Language
  name: string
  fullName: string
  flag: ImageFlag
  smallFlag: ImageFlag
}
