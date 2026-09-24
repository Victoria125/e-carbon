import '@server/env.ts' /* eslint-disable perfectionist/sort-imports */

import type { Request, Response } from 'express'
import type { PdfPayload } from '@/utils/buildPdfPayload.js'
import path from 'node:path'
import process from 'node:process'
import { renderToBuffer } from '@react-pdf/renderer'
import { EMAIL_TEXTS, transporter, verifySmtpConnection } from '@server/config/smtp.js'
import { ResultsPdf } from '@server/pdf/pdf-template.js'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import React from 'react'

import anamnesisRoutes from '@server/modules/anamnesis/routes.js'

type Language = 'br' | 'en' | 'es' | 'cn'

function normalizeLang(raw?: unknown): Language {
  if (raw === null || raw === undefined) return 'br'
  if (typeof raw === 'object') return 'br'
  if (typeof raw !== 'string' && typeof raw !== 'number') return 'br'
  const s = String(raw).toLowerCase()
  if (!s) return 'br'
  if (s === 'br' || s === 'pt-br' || s === 'pt') return 'br'
  if (s.startsWith('en')) return 'en'
  if (s.startsWith('es')) return 'es'
  if (s.startsWith('zh') || s.startsWith('cn') || s.includes('han')) return 'cn'
  const validLangs: Language[] = ['br', 'en', 'es', 'cn']
  return validLangs.includes(s as Language) ? (s as Language) : 'br'
}

const app = express()
app.use(express.json({ limit: '2mb' }))
app.use(cors({ origin: true }))
app.use(helmet({
  crossOriginOpenerPolicy: false,
  crossOriginEmbedderPolicy: false,
  originAgentCluster: false,
  hsts: false,
  contentSecurityPolicy: false
}))
app.use(compression())

const isDev = process.env.NODE_ENV !== 'production'

// Verificar conexão SMTP (não bloqueia inicialização)
verifySmtpConnection().catch(console.error)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.use('/api/anamnesis', anamnesisRoutes)

app.post('/api/export-results', async (req: Request, res: Response) => {
  try {
    const { email, payload } = req.body as { email?: string, payload?: unknown }
    const emailOk = typeof email === 'string' && /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)
    if (!emailOk) return res.status(400).json({ error: 'Email inválido' })
    if (!payload || typeof payload !== 'object') return res.status(400).json({ error: 'Payload ausente' })

    const element = React.createElement(ResultsPdf, { payload: payload as PdfPayload })
    // @ts-expect-error - renderToBuffer aceita qualquer ReactElement
    const pdfBuffer = await renderToBuffer(element)

    const lang = normalizeLang((payload as Record<string, unknown>)?.language)
    const emailText = EMAIL_TEXTS[lang]

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `Simulador <${process.env.SMTP_USER}>`,
      to: email,
      subject: emailText.subject,
      html: emailText.html,
      attachments: [{ filename: 'resultado-simulacao.pdf', content: pdfBuffer, contentType: 'application/pdf' }]
    })

    if (isDev) console.warn(`Email enviado para: ${email}`)
    res.json({ ok: true })
  } catch (err) {
    console.error('Erro no envio:', err)
    res.status(500).json({ error: 'Falha ao enviar o PDF por email' })
  }
})

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), 'dist')
  app.use(express.static(distPath))

  app.use((req, res, next) => {
    try {
      if (req.method !== 'GET') return next()
      const url = req.url || ''
      if (url.startsWith('/api') || url.startsWith('/assets') || url.includes('.')) return next()
      return res.sendFile(path.join(distPath, 'index.html'))
    } catch (err) {
      return next(err)
    }
  })
}

const PORT = Number(process.env.PORT ?? 5174)
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, () => {
  if (isDev) {
    console.warn(`API rodando em http://${HOST}:${PORT}`)
  } else {
    console.warn(`Servidor rodando na porta ${PORT}`)
  }
})
