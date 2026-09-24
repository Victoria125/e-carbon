interface StatCardProps {
  value: string | number
  icon: string
  label: string
  size?: '10px' | '11px' | '12px'
  showUnity?: boolean
  unit?: string
}

export default function StatCard({ value, icon, label, size = '12px', showUnity = false, unit = 'kg CO₂e' }: Readonly<StatCardProps>) {
  const displayValue = typeof value === 'string' ? value : value.toString()

  // Separar parte inteira e decimal
  const dotIndex = displayValue.indexOf('.')
  const integerPart = dotIndex >= 0 ? displayValue.substring(0, dotIndex) : displayValue
  const decimalPart = dotIndex >= 0 ? displayValue.substring(dotIndex) : ''

  const fontSizeMobile = 'text-[34px]'
  const fontSizeDesktop = 'text-[34px]'
  const decimalSizeMobile = 'text-[20px]'
  const decimalSizeDesktop = 'text-[20px]'

  return (
    <div className="glass-container rounded-2xl min-h-32">
      {/* <div className="glass-filter"></div> */}
      <div className="glass-overlay"></div>
      <div className="glass-specular"></div>
      <div className="glass-content p-0!">
        <div className="flex justify-center items-center gap-2 lg:gap-4 px-2 lg:px-3">
          <div
            className={`w-21.25 lg:w-22.5 ${showUnity && 'mt-2'}`}>
            <div className="text-center leading-1 font-bold text-[#52AE32]">
              <p className={`${fontSizeMobile} lg:${fontSizeDesktop}`}>
                {integerPart}
                {decimalPart && (
                  <span className={`${decimalSizeMobile} lg:${decimalSizeDesktop}`}>{decimalPart}</span>
                )}
              </p>
              {showUnity && (<p className="mt-5">{unit}</p>)}
            </div>
          </div>
          <div className="w-20 lg:w-22 flex flex-col items-center text-center">
            <img src={icon} alt={label} className="w-12 lg:w-14" />
            <p className={`text-[${size}] font-serif font-medium capitalize mt-1`}>{label}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
