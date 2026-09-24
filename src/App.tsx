import { motion } from 'framer-motion'
import { Globe, Menu } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { LanguageSelector } from '@/components/LanguageSelector'
import { LoadingTransition } from '@/components/LoadingTransition'
import { LowPolyBackground } from '@/components/LowPolyBackground'
import { PatientQuestionnaire } from '@/components/patient/PatientQuestionnaire'
import { PopulationNavigation } from '@/components/population/PopulationNavigation'
import { ProgressBar } from '@/components/ProgressBar'
import StepsIntro from '@/components/StepsIntro'
import LanguageProvider from '@/context/Language/LanguageProvider'
import { PatientProvider } from '@/context/PatientContext'
import { PopulationProvider } from '@/context/Population/PopulationProvider'
import useLanguage from '@/hooks/useLanguage'
import { usePopulation } from '@/hooks/usePopulation'

const PopulationStep1 = lazy(() => import('@/components/population/PopulationStep1').then((m) => ({ default: m.PopulationStep1 })))
const PopulationStep2 = lazy(() => import('@/components/population/PopulationStep2').then((m) => ({ default: m.PopulationStep2 })))
const PopulationStep3 = lazy(() => import('@/components/population/PopulationStep3').then((m) => ({ default: m.PopulationStep3 })))
const PopulationStep4 = lazy(() => import('@/components/population/PopulationStep4').then((m) => ({ default: m.PopulationStep4 })))
const PatientJourney = lazy(() => import('@/components/PatientJourney').then((m) => ({ default: m.PatientJourney })))

type AppView = 'population' | 'patient'

interface NavigationHeaderProps {
  hasSelectedLanguage: boolean
  currentView: AppView
  setCurrentView: (view: AppView) => void | Promise<void>
  showMenu: boolean
  setShowMenu: (show: boolean) => void
  hideJourneyButtons?: boolean
}

function Logo() {
  return (
    <div className="flex items-center">
      <motion.img
        whileHover={{ scale: 1.25 }}
        whileTap={{ scale: 0.925 }}
        src="/logo-ecarbon.png"
        alt="E-carbon Logo"
        className="object-contain w-16 h-12" />
    </div>
  )
}

function DesktopNavigation({ hasSelectedLanguage, currentView, setCurrentView }: Readonly<Pick<NavigationHeaderProps, 'hasSelectedLanguage' | 'currentView' | 'setCurrentView'>>) {
  const { t } = useLanguage()

  const getButtonClasses = (view: AppView): string => {
    const baseClasses = `
      px-1 w-[150px] lg:w-[200px] h-[32px] font-normal text-xs lg:text-sm transition-colors cursor-pointer
      !flex !py-5 !rounded-full !place-content-center place-items-center
    `
    const activeClasses = 'text-white bg-[#52AE32]'
    const inactiveClasses = `
      text-[#52AE32] bg-white/5 hover:text-white hover:bg-green-500/30 whitespace-nowrap
      gradient-container glass-overlay glass-specular glass-content
    `

    return `${baseClasses} ${currentView === view ? activeClasses : inactiveClasses}`
  }

  return (
    <div className="flex items-center space-x-2">
      {hasSelectedLanguage && (
        <>
          <motion.button
            whileHover={{ scaleX: 1.035 }}
            whileTap={{ scaleX: 0.925 }}
            type="button"
            onClick={() => {
              setCurrentView('patient')
            }}
            className={getButtonClasses('patient')}>
            {t('nav.patientJourney')}
          </motion.button>

          <motion.button
            whileHover={{ scaleX: 1.035 }}
            whileTap={{ scaleX: 0.925 }}
            type="button"
            onClick={() => {
              setCurrentView('population')
            }}
            className={getButtonClasses('population')}>
            {t('nav.populationSimulator')}
          </motion.button>
        </>
      )}

    </div>
  )
}

function MobileMenu({ currentView, setCurrentView, setShowMenu, hideJourneyButtons }: Readonly<Pick<NavigationHeaderProps, 'currentView' | 'setCurrentView' | 'setShowMenu' | 'hideJourneyButtons'>>) {
  const { t, setShowLanguageSelector } = useLanguage()

  const getButtonClasses = (view: AppView): string => {
    const baseClasses = 'w-full text-left px-4 py-2 rounded-lg transition-colors'
    const activeClasses = 'bg-green-600/90 text-white font-bold border-2 border-green-300 ring-2 ring-green-300/50'
    const inactiveClasses = 'text-white hover:text-white hover:bg-green-500/20 font-semibold'

    return `${baseClasses} ${currentView === view ? activeClasses : inactiveClasses}`
  }

  const handleViewChange = (view: AppView) => {
    setCurrentView(view)
    setShowMenu(false)
  }

  const handleLanguageClick = () => {
    setShowLanguageSelector(true)
    setShowMenu(false)
  }

  return (
    <div className="py-4 transition-colors duration-300 border-t md:hidden border-white/20 bg-linear-to-r from-teal-700/90 via-green-700/90 to-emerald-800/90">
      <nav className="space-y-2">
        {!hideJourneyButtons && (
          <>
            <button
              type="button"
              onClick={() => handleViewChange('population')}
              className={getButtonClasses('population')}>
              {t('nav.populationSimulator')}
            </button>

            <button
              type="button"
              onClick={() => handleViewChange('patient')}
              className={getButtonClasses('patient')}>
              {t('nav.patientJourney')}
            </button>
          </>
        )}
      </nav>

      <div className="pt-2 border-t border-white/30">
        <button
          type="button"
          onClick={handleLanguageClick}
          className="flex items-center w-full px-4 py-2 font-semibold text-left text-white transition-colors rounded-lg hover:text-white hover:bg-white/20">
          <Globe className="w-5 h-5 mr-2" />
          {t('nav.changeLanguage')}
        </button>
      </div>
    </div>
  )
}

function NavigationHeader({
  hasSelectedLanguage,
  currentView,
  setCurrentView,
  showMenu,
  setShowMenu,
  hideJourneyButtons
}: Readonly<NavigationHeaderProps>) {
  const { setShowLanguageSelector } = useLanguage()

  return (
    <div className="border-b border-[#52AE32] sticky top-0 z-50 transition-colors duration-300">
      <div className="container px-4 mx-auto lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {hasSelectedLanguage && (
              <motion.img
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.925 }}
                src="/logo-partners.png"
                alt="SESI Logo"
                className="h-12 sm:h-6 md:h-8 lg:h-8 xl:h-18 2xl:h-20" />
            )}
          </div>

          {hasSelectedLanguage && <Logo />}

          <div className="flex items-center space-x-8">
            {!hideJourneyButtons && (
              <DesktopNavigation
                hasSelectedLanguage={hasSelectedLanguage}
                currentView={currentView}
                setCurrentView={setCurrentView} />
            )}
            {hasSelectedLanguage && (
              <nav className="hidden space-x-2 md:flex">
                <LanguageSelector
                  isInitialSelection={false}
                  onLanguageSelected={() => setShowLanguageSelector(false)} />
              </nav>
            )}
          </div>

          <button
            type="button"
            className="hidden p-2 ml-2 font-semibold text-white border-2 rounded-lg shadow-lg md:hidden hover:text-white hover:bg-white/20 border-white/40 hover:border-white/60"
            onClick={() => setShowMenu(!showMenu)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {showMenu && (
          <MobileMenu
            currentView={currentView}
            setCurrentView={setCurrentView}
            setShowMenu={setShowMenu}
            hideJourneyButtons={hideJourneyButtons} />
        )}
      </div>
    </div>
  )
}

function PopulationSimulator() {
  const { currentStep } = usePopulation()

  const renderStep = () => {
    const steps = {
      1: (
        <Suspense fallback={<LoadingTransition />}>
          <PopulationStep1 />
        </Suspense>
      ),
      2: (
        <Suspense fallback={<LoadingTransition />}>
          <PopulationStep2 />
        </Suspense>
      ),
      3: (
        <Suspense fallback={<LoadingTransition />}>
          <PopulationStep3 />
        </Suspense>
      ),
      4: (
        <Suspense fallback={<LoadingTransition />}>
          <PopulationStep4 />
        </Suspense>
      )
    }

    return steps[currentStep as keyof typeof steps] || (
      <Suspense fallback={<LoadingTransition />}>
        <PopulationStep1 />
      </Suspense>
    )
  }

  return (
    <div className="container px-1 mx-auto lg:px-12">
      <div className="mb-8 overflow-hidden">
        <ProgressBar currentStep={currentStep} totalSteps={4} />
        {renderStep()}
        <PopulationNavigation />
      </div>
    </div>
  )
}

function WizardContent() {
  const { hasSelectedLanguage, setHasSelectedLanguage, showLanguageSelector, setShowLanguageSelector } = useLanguage()
  const [currentView, setCurrentView] = useState<AppView>('patient')
  const [showMenu, setShowMenu] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  const [showHero, setShowHero] = useState(true)
  const [showStepsIntro, setShowStepsIntro] = useState(false)

  const handleViewChange = async (view: AppView) => {
    if (view === currentView) return

    setShowQuestionnaire(view === 'patient')
    setIsTransitioning(true)

    await new Promise((resolve) => setTimeout(resolve, 600))

    setCurrentView(view)
    setIsTransitioning(false)
  }

  const handleSelectJourney = (journey: AppView) => {
    if (journey === 'patient') {
      setCurrentView('patient')
      setShowQuestionnaire(true)
    } else {
      setCurrentView('population')
    }
    setShowStepsIntro(false)
  }

  const renderContent = () => {
    if (currentView === 'population') {
      return <PopulationSimulator />
    }

    if (showQuestionnaire) {
      return <PatientQuestionnaire onContinue={() => setShowQuestionnaire(false)} />
    }

    return (
      <Suspense fallback={<LoadingTransition />}>
        <PatientJourney />
      </Suspense>
    )
  }

  // Ao "Finalizar Simulação" é exibida a HeroSection
  useEffect(() => {
    if (!hasSelectedLanguage && !showLanguageSelector && !showHero) {
      const id = setTimeout(() => {
        setShowHero(true)
      }, 0)
      return () => clearTimeout(id)
    }
    return undefined
  }, [hasSelectedLanguage, showLanguageSelector, showHero])

  // Mostra a HeroSection antes de tudo
  useEffect(() => {
    if (showHero) {
      const id = setTimeout(() => {
        setShowLanguageSelector(true)
      }, 0)
      return () => clearTimeout(id)
    }
    return undefined
  }, [showHero, setShowLanguageSelector])

  if (showHero) {
    return <HeroSection onStart={() => setShowHero(false)} />
  }

  if (!hasSelectedLanguage) {
    return (
      <>
        <NavigationHeader
          hasSelectedLanguage={hasSelectedLanguage}
          currentView={currentView}
          setCurrentView={handleViewChange}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          hideJourneyButtons={showStepsIntro} />
        <LanguageSelector
          isInitialSelection={true}
          onLanguageSelected={() => {
            setHasSelectedLanguage(true)
            // Removido: setCurrentView('patient')
            // Justificativa: Ao selecionar o idioma pela primeira vez, mostramos a tela de etapas
            setShowStepsIntro(true)
          }} />
      </>
    )
  }

  return (
    <>
      {/*
        LowPolyBackground: Background animado com triângulos
        - triangleSize: controla o tamanho dos triângulos (menor = maior, maior = menor). Default: 15
        - animationDuration: duração da animação em ms. Default: 32000
        Exemplo: <LowPolyBackground triangleSize={20} animationDuration={20000} />
      */}
      <LowPolyBackground />

      <NavigationHeader
        hasSelectedLanguage={hasSelectedLanguage}
        currentView={currentView}
        setCurrentView={handleViewChange}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        hideJourneyButtons={showStepsIntro} />

      <div>
        {showStepsIntro && (
          <StepsIntro onSelectJourney={handleSelectJourney} />
        )}

        {!showStepsIntro && renderContent()}
      </div>

      {/* Loading durante mudança de view */}
      {isTransitioning && <LoadingTransition />}
    </>
  )
}

export default function App() {
  return (
    <div className="select-none">
      <LanguageProvider>
        <PopulationProvider>
          <PatientProvider>
            <WizardContent />
          </PatientProvider>
        </PopulationProvider>
      </LanguageProvider>
    </div>
  )
}
