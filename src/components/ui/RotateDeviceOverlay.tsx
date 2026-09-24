import React, { useEffect } from 'react'

interface RotateDeviceOverlayProps {
  show: boolean
  onClose: () => void
}

export const RotateDeviceOverlay: React.FC<RotateDeviceOverlayProps> = ({ show, onClose }) => {
  useEffect(() => {
    if (!show) return
    const handleOrientation = () => {
      if (window.matchMedia('(orientation: landscape)').matches) {
        onClose()
      }
    }
    window.addEventListener('orientationchange', handleOrientation)
    window.addEventListener('resize', handleOrientation)
    return () => {
      window.removeEventListener('orientationchange', handleOrientation)
      window.removeEventListener('resize', handleOrientation)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000b3] bg-opacity-80 animate-fade-in">
      <div className="flex flex-col items-center">
        <div className="phone-modern" />
        <div className="message-modern">Por favor, gire seu dispositivo!</div>
      </div>
    </div>
  )
}
