interface IconProps {
  className?: string
  size?: number | string
  [key: string]: string | number | undefined
}

interface ComparisonCardProps {
  title: string
  subtitle?: string
  icon: React.ComponentType<IconProps> | string
  children: React.ReactNode
}

export default function ComparisonCard({ title, subtitle, icon: _icon, children }: Readonly<ComparisonCardProps>) {
  return (
    <div className="glass-container w-full rounded-2xl min-w-0">
      {/* <div className="glass-filter"></div> */}
      <div className="glass-overlay"></div>
      <div className="glass-specular"></div>
      <div className="glass-content">
        <div className="flex flex-row items-center border-b border-white/50 w-[96%] gap-1">
          {/*
            isIconComponent && IconComponent
            ? <IconComponent className="w-8 mr-2 text-green-200" />
            : <img src={_icon as string} alt="" className="w-8" />
            */}
          <div>
            <h3 className="text-xs font-light uppercase text-white">
              {title}
            </h3>
            <p className="-mt-0.5 text-[9px] text-left text-white/80">
              {subtitle}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
