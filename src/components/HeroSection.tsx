import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const style = document.createElement('style')
style.textContent = `
  @keyframes blurEffect {
    0% { filter: blur(20px); }
    25% { filter: blur(0px); }
    50% { filter: blur(10px); }
    75% { filter: blur(0px); }
    100% { filter: blur(20px); }
  }

  @keyframes rotateRing {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes ringPulse {
    0% { transform: scale(1.2); opacity: 0.8; }
    50% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.2); opacity: 0.8; }
  }

  .cta-ring {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border-radius: 9999px;
    background-color: #52AE32;
    touch-action: manipulation;
    padding-left: 4rem;
    padding-right: 4rem;
    padding-top: .6rem;
    padding-bottom: .6rem;
    color: white;
    cursor: pointer;
    overflow: visible;
    transition: transform .16s ease, box-shadow .16s ease;}

  .cta-ring:active {transform: scale(0.8);}

  .cta-ring::before {
    content: '';
    position: absolute;
    left: -2px; right: -2px; top: -2px; bottom: -2px;
    background: conic-gradient(from 0deg, #52ae32f2, #6ce56ae5, #2ebf6ae5, #52ae32f2);
    filter: blur(14px);
    z-index: -2;
    animation: rotateRing 1.0s linear infinite, ringPulse 1.6s ease-in-out infinite;
    pointer-events: none;
    border-radius: 9999px;
  }

  .cta-ring::after {
    content: '';
    position: absolute;
    left: 2px; right: 2px; top: 2px; bottom: 2px;
    z-index: -1;
    pointer-events: none;
  }

  .cta-ring > * { position: relative; z-index: 20; }

  @media (max-width: 640px) {
    .cta-ring {
      padding-left: 3rem;
      padding-right: 3rem;
      padding-top: .5rem;
      padding-bottom: .5rem;
    }
    .cta-ring::before {
      filter: blur(10px);
    }
      /* No mobile, manter ainda espesso, mas menor */
      .hero-letter {
        -webkit-text-stroke: 2px rgba(255,255,255,0.9);
      }
  }

  /* Título E-CARBON mais grosso (percepção de peso) */
  .hero-title { font-weight: 900; }
  .hero-letter {
    /* Base (pequenas telas > 640px herdarão valores maiores via media queries) */
    -webkit-text-stroke: 3px rgba(255,255,255,0.95);
    text-shadow:
      0 0 1px rgba(255,255,255,0.45),
      0 0 2px rgba(255,255,255,0.25);
  }

  /* Escalonamento progressivo de espessura por breakpoint */
  @media (min-width: 640px) { /* sm */
    .hero-letter { -webkit-text-stroke: 4px rgba(255,255,255,0.95); }
  }
  @media (min-width: 768px) { /* md */
    .hero-letter { -webkit-text-stroke: 6px rgba(255,255,255,0.98); }
  }
  @media (min-width: 1024px) { /* lg */
    .hero-letter { -webkit-text-stroke: 8px #ffffff; }
  }
  @media (min-width: 1280px) { /* xl */
    .hero-letter { -webkit-text-stroke: 10px #ffffff; }
  }

`
document.head.appendChild(style)

const LANGUAGES = [
  {
    code: 'br',
    label: 'BR',
    flag: '/flags/flag-small-br.png',
    frase1: 'Como sua saúde impacta a do planeta?',
    frase2: 'Calculadora de Pegada de Carbono na Cadeia de Insumos para a Saúde.'
  },
  {
    code: 'us',
    label: 'USA',
    flag: '/flags/flag-small-en.png',
    frase1: 'How does your health impact the planet\'s health?',
    frase2: 'Carbon Footprint Calculator in the Healthcare Supply Chain.'
  },
  {
    code: 'es',
    label: 'ESP',
    flag: '/flags/flag-small-es.png',
    frase1: '¿Cómo impacta tu salud en la salud del planeta?',
    frase2: 'Calculadora de Huella de Carbono en la Cadena de Suministro de Salud.'
  },
  {
    code: 'zh',
    label: 'ZH',
    flag: '/flags/flag-small-cn.png',
    frase1: '您的健康如何影响地球的健康？',
    frase2: '医疗供应链中的碳足迹计算器。'
  }
]

export function HeroSection({ onStart }: Readonly<{ onStart: () => void }>) {
  const [langIndex, setLangIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % LANGUAGES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const video = videoRef.current
        if (video) video.preload = 'auto'
      }
    })

    if (videoRef.current) observer.observe(videoRef.current)

    return () => observer.disconnect()
  }, [])

  const currentLang = LANGUAGES[langIndex]

  const formattedFrase1 = (() => {
    const s = currentLang.frase1
    if (s.includes('impacta')) {
      const [before, after] = s.split('impacta')
      return (
        <>
          {before}
          impacta
          {after}
        </>
      )
    }
    if (s.includes('impact')) {
      const match = /impact[a-z]*/.exec(s)?.[0] ?? 'impact'
      const parts = s.split(/impact[a-z]*/)
      return (
        <>
          {parts[0]}
          {match}
          {parts[1] ?? ''}
        </>
      )
    }
    return s
  })()

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        preload="none"
        poster="/Hero_BG_Thumbnail.jpg"
        className="absolute z-0 object-cover w-full h-full"
        style={{ filter: 'brightness(1)' }}>
        <source src="/Hero_BG.webm" type="video/webm" />
      </video>

      <div className="absolute inset-0 z-10 bg-black/20" />

      <div className="relative z-20 flex flex-col items-center justify-center w-full">

        <div className="relative z-30 flex flex-wrap items-center justify-center mb-2 md:mb-3">
          <img src="/logo-partners.png" alt="SESI e parceiros" className="h-8 sm:h-10 md:h-20 w-auto max-w-[90vw] object-contain" />
        </div>

        <div className="relative flex justify-center w-full mb-6">
          <div className="flex items-center justify-center px-4 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-8 sm:py-8 md:py-12 lg:py-14 shadow-2xl glass-container ml-6 mr-6 w-[92vw] sm:w-[88vw] md:w-auto md:min-w-[600px] max-w-[1500px] overflow-visible">
            <div className="hero-title flex font-black text-[50px] sm:text-[60px] md:text-[100px] lg:text-[120px] xl:text-[140px] uppercase tracking-[12px] sm:tracking-[20px] md:tracking-[32px] lg:tracking-[40px] xl:tracking-[60px] text-white drop-shadow-lg z-20 lg:ml-10 xl:ml-14 md:ml-8 leading-[0.9] ml-2">
              {Array.from('E-CARBON').map((letter) => {
                const uniqueKey = `letter-${letter}-${Math.random()}`
                return (
                  <span
                    key={uniqueKey}
                    className="transition-all duration-100 hover:blur-lg hero-letter"
                    style={{
                      animation: `blurEffect 8s ease-in-out infinite ${Math.random() * 1}s`,
                      display: 'inline-block'
                    }}>
                    {letter}
                  </span>
                )
              })}
            </div>
            <div className="absolute inset-0 pointer-events-none glass-filter rounded-2xl" />
            <div className="absolute inset-0 pointer-events-none glass-overlay rounded-2xl" />
            <div className="absolute inset-0 pointer-events-none glass-specular rounded-2xl" />
          </div>
        </div>

        <p className="max-w-6xl mb-4 font-black text-center transition-all duration-500 text-md lg:text-4xl sm:text-2xl md:text-3xl">
          {formattedFrase1}
        </p>

        <p className="max-w-2xl mb-4 transition-all duration-500 text-[10px] center sm:text-base md:text-md">
          {currentLang.frase2}
        </p>

        <div className="flex flex-row flex-wrap items-center justify-center mb-8">
          <div className="flex flex-col items-center justify-center select-none" key={currentLang.code}>
            <div className="flex items-center gap-2 px-6 py-2 text-base font-semibold text-white">
              <span>{currentLang.label}</span>
              <img src={currentLang.flag} alt={currentLang.label} className="object-contain h-5 w-7" />
            </div>
            <div className="w-full h-[1px] mt-1 bg-white rounded" style={{ maxWidth: 50 }} />
          </div>
        </div>

        <motion.div
          whileTap={{ scale: 0.85 }}>
          <button
            type="button"
            onClick={onStart}
            aria-label="Começar"
            className="flex items-center justify-center py-4 cursor-pointer w-42">
            <img src="/ui/button-next.png" alt="Next Button" className="absolute w-40 h-15" />
            <span className="text-lg font-black z-1 sm:text-md md:text-lg">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

// --- Apresentação das quatro bandeiras (versão anterior) ---
/*
<div className="flex flex-row flex-wrap items-center justify-center gap-2 mb-6 sm:gap-3 md:gap-4">
  {LANGUAGES.map((lang, idx) => (
    <div
      key={lang.code}
      className={`
        flex items-center gap-2 px-4 sm:px-6 py-1 sm:py-2 font-semibold text-sm sm:text-base transition-all duration-300
        ${idx === langIndex
          ? 'text-white scale-100 border-b border-white'
          : 'text-white/60 border-b border-transparent'
        }
        select-none min-w-[72px] sm:min-w-[96px] justify-center
      `}>
      <span>{lang.label}</span>
      <img src={lang.flag} alt={lang.label} className="object-contain w-6 h-4 sm:h-5 sm:w-7" />
    </div>
  ))}
</div>
*/
// --- Fim da apresentação das quatro bandeiras ---
