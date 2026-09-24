import { motion } from 'framer-motion'
import { User, Users } from 'lucide-react'
import useLanguage from '@/hooks/useLanguage'

type Journey = 'patient' | 'population'

interface StepsIntroProps {
  onSelectJourney: (journey: Journey) => void
}

// IDs das etapas são usados para buscar traduções: stepsIntro.steps.step{id}
const steps = [
  { id: 1, gif: '/calendar.gif' },
  { id: 2, gif: '/medical.gif' },
  { id: 3, gif: '/car.gif' },
  { id: 4, gif: '/comparison.gif' },
  { id: 5, gif: '/dashboard.gif' }
]

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 1
    }
  }
}

const stepRoot = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.4 } }
}

const innerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function StepsIntro({ onSelectJourney }: Readonly<StepsIntroProps>) {
  const { t } = useLanguage()
  return (
    <div className="px-4 py-4 mx-auto lg:px-10 w-full h-[calc(100vh - 64px)] ">
      <div className="mx-auto max-w-10xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full p-2">

          <h2 className="px-4 mx-auto mt-4 mb-4 font-semibold text-center text-white text-md sm:text-2xl md:text-sm">
            {t('stepsIntro.heading')}
          </h2>

          <div className="flex flex-row flex-wrap justify-center items-center mb-4 overflow-hidden mx-auto">
            {steps.map((s) => {
              return (
                <motion.div key={s.id} variants={stepRoot} className="lg:max-w-[20%] md:max-w-[49%] flex flex-col items-center text-center z-20 px-6 py-8">
                  <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-[#0f1724]/40">
                    <span className="font-bold text-white text-md">{s.id}</span>
                  </div>

                  <motion.div variants={innerItem} className="mb-2 text-white">
                    <motion.img src={s.gif} alt={`step-${s.id}`} className="w-24 md:w-20 mx-auto" />
                  </motion.div>

                  <motion.p variants={innerItem} transition={{ delay: 0.2 }} className="font-semibold sm:text-[10px] md:text-[12px] w-70 md:w-55 px-4 text-[#52AE32]">{t(`stepsIntro.steps.step${s.id}`)}</motion.p>
                </motion.div>
              )
            })}
          </div>

          <div className="flex flex-col items-center justify-center space-y-8 h-full">
            <span className="px-4 mb-4 font-semibold text-center text-base md:text-md text-white/80">{t('stepsIntro.chooseJourney')}</span>
            <div className="flex flex-row flex-wrap items-center justify-center w-full max-w-2xl gap-4 px-4 md:gap-8 ">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => onSelectJourney('patient')}
                className="flex flex-col items-center justify-center w-full h-35 p-6 text-center border shadow-2xl cursor-pointer sm:w-40 md:w-40 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-white/10 glass-container">
                <div className="absolute inset-0 pointer-events-none glass-filter rounded-2xl" />
                <div className="absolute inset-0 pointer-events-none glass-overlay rounded-2xl" />
                <div className="absolute inset-0 pointer-events-none glass-specular rounded-2xl" />

                <User className="z-20 w-12 h-12 mb-3 text-white/90" />
                <div className="z-20 text-sm text-white ">{t('stepsIntro.individual')}</div>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => onSelectJourney('population')}
                className="flex flex-col items-center justify-center w-full h-35 p-6 text-center border shadow-2xl cursor-pointer sm:w-40 md:w-40 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-white/10 glass-container">
                <div className="absolute inset-0 pointer-events-none glass-filter rounded-2xl" />
                <div className="absolute inset-0 pointer-events-none glass-overlay rounded-2xl" />
                <div className="absolute inset-0 pointer-events-none glass-specular rounded-2xl" />

                <Users className="z-20 w-12 h-12 mb-3 text-white/90" />
                <div className="z-20 text-sm text-white ">{t('stepsIntro.population')}</div>
              </motion.button>
            </div>
            <span className="my-2 bottom-0 text-center text-white text-xs md:text-sm">{t('stepsIntro.footer')}</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
