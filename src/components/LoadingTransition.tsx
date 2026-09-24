import useLanguage from '@/hooks/useLanguage'

export function LoadingTransition() {
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="glass-container !rounded-3xl !mx-[35%]">
        <div className="glass-filter"></div>
        <div className="glass-overlay"></div>
        <div className="glass-specular"></div>
        <div className="glass-content !flex-col !gap-6 p-12">
          {/* Spinner animado */}
          <div className="relative w-20 h-20 mt-2">
            <div className="absolute inset-0 border-4 border-[#52AE32]/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-[#52AE32] rounded-full animate-spin"></div>
          </div>

          {/* Texto */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">{t('nav.processing')}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
