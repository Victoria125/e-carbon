// src/components/patient/ExportResults.tsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import Modal from '@/components/ui/modal-export'
import useLanguage from '@/hooks/useLanguage'
import { usePatient } from '@/hooks/usePatient'
import { buildPdfPayload } from '@/utils/buildPdfPayload'

function normalizeLang(raw?: unknown): 'br' | 'en' | 'es' | 'cn' {
  if (typeof raw !== 'string' && typeof raw !== 'number')
    return 'br'
  const s = String(raw).toLowerCase()
  if (!s) return 'br'
  if (s === 'br' || s === 'pt-br' || s === 'pt') return 'br'
  if (s.startsWith('en')) return 'en'
  if (s.startsWith('es')) return 'es'
  if (s.startsWith('zh') || s.startsWith('cn') || s.includes('han')) return 'cn'
  return (['br', 'en', 'es', 'cn'].includes(s) ? s as 'br' | 'en' | 'es' | 'cn' : 'br')
}

export default function ExportResultsButton() {
  const { data } = usePatient()
  const { t, language } = useLanguage()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const resetModal = () => {
    setOpen(false)
    setEmail('')
    setMsg(null)
    setLoading(false)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setMsg(null)

    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMsg(t('export.invalidEmail'))
      return
    }

    setLoading(true)
    try {
      const lang = normalizeLang(language)
      const payload = buildPdfPayload(data, lang)

      const res = await fetch('http://localhost:5174/api/export-results', { // ajustar  para produção
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          payload: { ...payload, language: lang }
        })
      })
      if (!res.ok) throw new Error(t('export.fail'))
      setMsg(t('export.success'))
      setTimeout(resetModal, 1500)
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : t('export.fail'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex gap-2 justify-center items-center text-white hover:text-[#9BEA15] transition-colors duration-200 text-[14px] cursor-pointer">
        {t('export.openButtonLabel')}
        <img src="ui/icon-pdf.png" alt="PDF Icon" className="w-5 -mt-0.25" />
      </button>

      <Modal open={open} title={t('export.modalTitle')} onClose={resetModal}>
        <form onSubmit={submit} className="space-y-4" autoComplete="off">
          <label className="text-sm text-white flex flex-col">
            <span>{t('export.emailLabel')}</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('export.emailPlaceholder')}
              required
              className="w-full rounded-xl bg-white border border-white/20 px-3 py-2 text-black outline-none placeholder-black/50" />
          </label>

          {msg && <p className="text-xs text-[#9BEA15] mt-1">{msg}</p>}

          <div className="flex flex-col justify-center items-center gap-3 pt-2">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center hover:opacity-75 active:opacity-65 disabled:opacity-60">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-36 py-4 cursor-pointer text-[#092D54] disabled:opacity-50 disabled:cursor-default">
                <img src="/ui/button-next.png" alt="Next Button" className="absolute w-34 h-13" />
                <span className="z-1 text-[14px] whitespace-nowrap">
                  {loading ? t('export.sending') : t('export.sendPdf')}
                </span>
              </button>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.95 }}
              className="hover:opacity-75 active:opacity-65 disabled:opacity-60">
              <button type="button" onClick={resetModal} className="w-1/2 text-white/80 hover:opacity-80 cursor-pointer px-2 py-1">
                {t('export.cancel')}
              </button>
            </motion.div>
          </div>
        </form>
      </Modal>
    </>
  )
}
