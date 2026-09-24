import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

/**
 * Componente de diálogo de ajuda (Ajudinha)
 *
 * @example
 * // Uso básico com botão de trigger
 * <AjudinhaDialog
 *   title="Como funciona?"
 *   description="Descrição breve"
 *   content={<div>Conteúdo detalhado aqui</div>}
 * />
 *
 * @example
 * // Abertura automática ao entrar no step (com botão visível)
 * <AjudinhaDialog
 *   title="Bem-vindo ao Step 4"
 *   description="Instruções importantes"
 *   content={<div>Informações sobre este passo</div>}
 *   defaultOpen={true}
 * />
 *
 * @example
 * // Abertura automática SEM botão visível
 * <AjudinhaDialog
 *   title="Instruções"
 *   content={<div>Leia antes de continuar</div>}
 *   defaultOpen={true}
 *   hideTrigger={true}
 * />
 */
interface AjudinhaDialogProps {
  className?: string
  title?: string
  description?: string
  content?: React.ReactNode
  /** Se true, abre o dialog automaticamente ao montar o componente */
  defaultOpen?: boolean
  /** Se true, esconde o botão de trigger (útil para dialogs apenas auto-open) */
  hideTrigger?: boolean
}

export default function AjudinhaDialog({
  className,
  title = 'Ajuda',
  description = 'Informações adicionais sobre este campo',
  content,
  defaultOpen = false,
  hideTrigger = false
}: Readonly<AjudinhaDialogProps>) {
  const [open, setOpen] = useState(defaultOpen)

  // Abre o dialog automaticamente se defaultOpen for true (apenas na montagem)
  useEffect(() => {
    if (defaultOpen) {
      const timer = setTimeout(() => setOpen(true), 100)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cn(className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        {!hideTrigger && (
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Icon icon="fluent:chat-help-24-filled" className="h-5 w-5" />
            </button>
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {content || (
              <p className="text-sm text-muted-foreground">
                Coloque o conteúdo da ajuda aqui.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
