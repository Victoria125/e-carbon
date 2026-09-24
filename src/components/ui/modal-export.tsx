import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ open, title, onClose, children }: Readonly<ModalProps>) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    globalThis.addEventListener('keydown', onKey)
    return () => {
      globalThis.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const handleBackdropPointerDown: React.PointerEventHandler<HTMLDialogElement> = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const modal = (
    <dialog
      open={open}
      className="select-none fixed inset-0 z-[100] flex items-center justify-center bg-black/10 border-0 w-screen h-screen p-0 m-0"
      aria-label={title}
      onPointerDown={handleBackdropPointerDown}>
      <div className="relative w-[60%] h-[60%]">
        <div
          onPointerDown={(e) => e.stopPropagation()}
          className="flex items-center justify-center w-full h-full rounded-4xl overflow-hidden shadow-lg border border-[#52AE32] bg-[#082340]/65 backdrop-blur-sm">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer absolute top-10 right-10 text-white/80 hover:text-white focus:outline-none text-xl leading-none"
            aria-label="Fechar modal">
            ✕
          </button>
          <div className="flex flex-col items-center justify-center gap-8.5 max-w-[60%]">
            <h3 className="text-white text-center text-sm font-medium">{title}</h3>
            <div className="w-full px-15">
              {children}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )

  // Portal evita conflitos de clique com ancestrais
  return createPortal(modal, document.body)
}
