import type { Language, LanguageConfig } from '@/types/language'
import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { LoadingTransition } from '@/components/LoadingTransition'
import { LowPolyBackground } from '@/components/LowPolyBackground'
import { RotateDeviceOverlay } from '@/components/ui/RotateDeviceOverlay'
import useLanguage from '@/hooks/useLanguage'

interface LanguageSelectorProps {
  onLanguageSelected: () => void
  isInitialSelection?: boolean
}

const flagsAlt = {
  br: 'Bandeira Brasil',
  en: 'Bandeira Estados Unidos',
  es: 'Bandeira Espanha',
  cn: 'Bandeira China'
} as const

const flags = {
  br: { src: '/flags/flag-br.png', alt: flagsAlt.br },
  en: { src: '/flags/flag-en.png', alt: flagsAlt.en },
  es: { src: '/flags/flag-es.png', alt: flagsAlt.es },
  cn: { src: '/flags/flag-cn.png', alt: flagsAlt.cn }
} as const

const smallFlags = {
  br: { src: '/flags/small-flag-br.png', alt: flagsAlt.br },
  en: { src: '/flags/small-flag-en.png', alt: flagsAlt.en },
  es: { src: '/flags/small-flag-es.png', alt: flagsAlt.es },
  cn: { src: '/flags/small-flag-cn.png', alt: flagsAlt.cn }
} as const

const LANGUAGES: LanguageConfig[] = [
  { code: 'br', name: 'BR', fullName: 'Português', flag: flags.br, smallFlag: smallFlags.br },
  { code: 'en', name: 'EUA', fullName: 'English', flag: flags.en, smallFlag: smallFlags.en },
  { code: 'es', name: 'ESP', fullName: 'Español', flag: flags.es, smallFlag: smallFlags.es },
  { code: 'cn', name: '中', fullName: '中文', flag: flags.cn, smallFlag: smallFlags.cn }
] as const

export function LanguageSelector({ onLanguageSelected, isInitialSelection = false }: Readonly<LanguageSelectorProps>) {
  const { language, setLanguage } = useLanguage()
  const [hasSelectedOnce, setHasSelectedOnce] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLanguageSelect = (langCode: Language) => {
    if (hasSelectedOnce && language === langCode) {
      setHasSelectedOnce(false)
      return
    }
    setLanguage(langCode)
    setHasSelectedOnce(true)
  }

  const handleStartClick = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    onLanguageSelected()
    setIsLoading(false)
  }

  if (isInitialSelection) {
    return (
      <>
        <InitialSelectionView
          languages={LANGUAGES}
          onLanguageSelect={handleLanguageSelect}
          onStartClick={handleStartClick} />
        {isLoading && <LoadingTransition />}
      </>
    )
  }

  return (
    <ModalSelectionView
      language={language}
      languages={LANGUAGES}
      onLanguageSelect={handleLanguageSelect}
      onLanguageSelected={onLanguageSelected} />
  )
}

interface InitialSelectionViewProps {
  languages: LanguageConfig[]
  onLanguageSelect: (langCode: Language) => void
  onStartClick: () => void
}

function InitialSelectionView({
  onLanguageSelect,
  onStartClick
}: Readonly<InitialSelectionViewProps>) {
  const [showRotate, setShowRotate] = useState(false)

  const shouldShowRotate = useCallback(() => {
    // Detecta apenas celulares Android e iPhones, exclui tablets Android e iPads
    const ua = navigator.userAgent
    const isAndroidPhone = /Android/i.test(ua) && /Mobile/i.test(ua)
    const isIphone = /iPhone/i.test(ua)
    // iPad e tablets Android não entram
    const isMobile = isAndroidPhone || isIphone || /iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
    const isPortrait = globalThis.matchMedia('(orientation: portrait)').matches
    return isMobile && isPortrait
  }, [])

  const handleFlagClick = (lang: Language) => {
    onLanguageSelect(lang)
    if (shouldShowRotate()) {
      setShowRotate(true)
    } else {
      // Aguardar um pouco para garantir que o idioma foi alterado
      setTimeout(() => {
        onStartClick()
      }, 100)
    }
  }

  return (
    <div className="relative flex items-center justify-center w-full py-5 overflow-hidden mt-22 ">
      <LowPolyBackground />
      <BackgroundPattern />

      <div className="flex flex-row gap-8 sm:gap-28 items-center justify-center w-full pl-2.5 pr-2.5 sm:pl-0 sm:pr-0">
        <div className="text-white">
          <img src="ui/icon-world.png" alt="BR Line" className="w-16" />
          <h1 className="mt-6 mb-2 text-4xl ">
            ESCOLHA
            <br />
            SEU
            <br />
            IDIOMA
            <br />
          </h1>
          <p>Choose your language</p>
          <p>Elija su idioma</p>
          <p>选择您的语言</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="hover:cursor-pointer active:ring-2 ring-[#52AE32] rounded-2xl"
            onClick={() => handleFlagClick('br')}>
            <div className="glass-container !rounded-2xl !max-w-85">
              <div className="glass-filter"></div>
              <div className="glass-overlay"></div>
              <div className="glass-specular"></div>
              <div className="glass-content !p-0 !px-10 !py-5 !w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <img src="flags/BR.png" alt="BR" className="w-11" />
                  <img src="flags/flag-small-br.png" alt="BR Flag" className="w-16" />
                </div>
                <img src="flags/br-line.png" alt="BR Line" className="w-full h-0.1" />
              </div>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="hover:cursor-pointer active:ring-2 ring-[#52AE32] rounded-2xl"
            onClick={() => handleFlagClick('en')}>
            <div className="glass-container !rounded-2xl !max-w-85">
              <div className="glass-filter"></div>
              <div className="glass-overlay"></div>
              <div className="glass-specular"></div>
              <div className="glass-content !p-0 !px-10 !py-5 !w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <img src="flags/USA.png" alt="USA" className="w-15" />
                  <img src="flags/flag-small-en.png" alt="BR Flag" className="w-16" />
                </div>
                <img src="flags/usa-line.png" alt="BR Line" className="w-full h-0.1" />
              </div>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="hover:cursor-pointer active:ring-2 ring-[#52AE32] rounded-2xl"
            onClick={() => handleFlagClick('es')}>
            <div className="glass-container !rounded-2xl !max-w-85">
              <div className="glass-filter"></div>
              <div className="glass-overlay"></div>
              <div className="glass-specular"></div>
              <div className="glass-content !p-0 !px-10 !py-5 !w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <img src="flags/ESP.png" alt="ESP" className="w-14" />
                  <img src="flags/flag-small-es.png" alt="BR Flag" className="w-16" />
                </div>
                <img src="flags/esp-line.png" alt="BR Line" className="w-full h-0.1" />
              </div>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="hover:cursor-pointer active:ring-2 ring-[#52AE32] rounded-2xl"
            onClick={() => handleFlagClick('cn')}>
            <div className="glass-container !rounded-2xl !max-w-85">
              <div className="glass-filter"></div>
              <div className="glass-overlay"></div>
              <div className="glass-specular"></div>
              <div className="glass-content !p-0 !px-10 !py-5 !w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <img src="flags/ZH.png" alt="ZH" className="w-15" />
                  <img src="flags/flag-small-cn.png" alt="BR Flag" className="w-16" />
                </div>
                <img src="flags/zh-line.png" alt="BR Line" className="w-full h-0.1" />
              </div>
            </div>
          </motion.button>
        </div>
      </div>
      <RotateDeviceOverlay
        show={showRotate}
        onClose={() => {
          setShowRotate(false)
          onStartClick()
        }} />
      {/* <div className="w-full mt-14">
          <TextScroll
            className="font-display text-center font-semibold tracking-tighter text-white/10 italic dark:text-white md:text-5xl md:leading-[4rem]"
            text="
              VAMOS CONVERSAR EM QUAL IDIOMA ? &nbsp;&nbsp;
              我们用哪种语言交流 ? &nbsp;&nbsp;
              IN WHICH LANGUAGE ARE WE GOING TO TALK ? &nbsp;&nbsp;
              ¿EN QUÉ IDIOMA VAMOS A HABLAR ? &nbsp;&nbsp;
            "
            default_velocity={0.5} />
        </div> */}
    </div>
  )
}

function BackgroundPattern() {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute border rounded-full top-1/4 left-1/4 w-96 h-96 border-white/10 backdrop-blur-sm" />
      <div className="absolute w-64 h-64 border rounded-full top-1/3 right-1/4 border-white/10 backdrop-blur-sm" />
      <div className="absolute w-48 h-48 border rounded-full bottom-1/4 left-1/3 border-white/10 backdrop-blur-sm" />
      <div className="absolute w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 border rounded-full top-1/2 left-1/2 border-white/5 backdrop-blur-sm" />
    </div>
  )
}

interface ModalSelectionViewProps {
  language: Language
  languages: LanguageConfig[]
  onLanguageSelect: (langCode: Language) => void
  onLanguageSelected: () => void
}

export function ModalSelectionView({ language, languages, onLanguageSelect, onLanguageSelected }: Readonly<ModalSelectionViewProps>) {
  return (
    <div className="relative space-y-6">
      <div className="flex">
        {languages.map((lang) => (
          <ModalLanguageOption
            key={lang.code}
            language={lang}
            isSelected={language === lang.code}
            onLanguageSelect={onLanguageSelect}
            onLanguageSelected={onLanguageSelected} />
        ))}
      </div>
    </div>
  )
}

interface ModalLanguageOptionProps {
  language: LanguageConfig
  isSelected: boolean
  onLanguageSelect: (langCode: Language) => void
  onLanguageSelected: () => void
}

function ModalLanguageOption({ language, isSelected, onLanguageSelect, onLanguageSelected }: Readonly<ModalLanguageOptionProps>) {
  return (
    <button
      type="button"
      onClick={() => {
        onLanguageSelect(language.code)
        onLanguageSelected()
      }}>
      <div className="flex items-center">
        <div
          className={`
            ${isSelected ? 'border-green-400 rounded-2xl' : ''}
            w-10 h-10 rounded-full overflow-hidden transition-all duration-300
          `}>
          <motion.img
            src={language.smallFlag.src}
            alt={language.smallFlag.alt}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.1 }}
            className="object-cover w-full h-full cursor-pointer" />
        </div>
      </div>
    </button>
  )
}
