'use client'

import type React from 'react'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/lib/utils'

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
}

export default function SectionHeader(props: Readonly<SectionHeaderProps>) {
  const { t } = useLanguage()
  const { className, title, subtitle, ...restProps } = props

  return (
    <div
      className={cn(
        'flex items-start gap-1.5',
        className
      )}
      {...restProps}>
      <div className="flex items-start mt-[-1.75px]">
        <img src="/ui/green-dot.png" alt="Ponto Verde" className="w-4 h-4 flex-shrink-0" />
      </div>
      <div className="flex flex-col items-start gap-2 max-w-[600px] xl:max-w-[1000px]">
        <h3 className="md:text-md lg:text-lg font-light leading-3 text-[#52AE32]">
          {title || t('step1.totalDescription')}
        </h3>
        <h4 className="text-sm font-light text-white lg:text-md">
          {subtitle || t('step1.totalSubDescription')}
        </h4>
      </div>
    </div>
  )
}
