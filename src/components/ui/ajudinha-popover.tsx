import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface AjudinhaPopoverProps extends React.ComponentProps<'button'> {
  icon?: string
  imageSrc?: string
  triggerText?: string
  contentText?: React.ReactNode
  triggerClassName?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  contentClassName?: string
  /** Se true, abre o popover automaticamente ao montar o componente */
  defaultOpen?: boolean
  /** Se true, esconde o botão de trigger (útil para popovers apenas auto-open) */
  hideTrigger?: boolean
}

export default function AjudinhaPopover(props: Readonly<AjudinhaPopoverProps>) {
  const {
    icon = 'fluent:chat-help-24-filled',
    imageSrc,
    triggerText = 'Ajuda',
    contentText = `!Ayúdame`,
    triggerClassName = 'flex items-center gap-1 py-1.5 px-2 text-white text-sm border border-white/40 backdrop-blur place-content-center rounded-lg',
    side = 'bottom',
    align = 'center',
    className,
    contentClassName,
    defaultOpen = false,
    hideTrigger = false
  } = props

  const [open, setOpen] = useState(defaultOpen)

  // Abre o popover automaticamente se defaultOpen for true (apenas na montagem)
  useEffect(() => {
    if (defaultOpen) {
      const timer = setTimeout(() => setOpen(true), 100)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cn('z-40', className)} aria-label="Ajudinha">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={hideTrigger ? 'w-1 h-1 opacity-0 pointer-events-none' : triggerClassName}>
          {!hideTrigger && triggerText}
          {!hideTrigger && (
            imageSrc
              ? (<img src={imageSrc} className="w-[30px] h-auto" alt="Help icon" />)
              : (<Icon icon={icon} className="text-xl text-white" />)
          )}
        </PopoverTrigger>
        <PopoverContent
          side={side}
          align={align}
          className={cn('text-white border-3 border-[#9BEA15] backdrop-blur bg-transparent rounded-2xl', contentClassName)}>
          {contentText}
        </PopoverContent>
      </Popover>
    </div>
  )
}
