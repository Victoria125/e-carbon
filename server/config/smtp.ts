// ✅ CORRETO - usando import do process
import { env } from 'node:process'
import nodemailer from 'nodemailer'

const isDev = env.NODE_ENV !== 'production'

// Debug: verificar se as env vars estão carregadas
if (isDev) {
  console.warn('[SMTP Config] SMTP_USER:', env.SMTP_USER ? '✓ definido' : '✗ undefined')
  console.warn('[SMTP Config] SMTP_PASS:', env.SMTP_PASS ? '✓ definido' : '✗ undefined')
}

/**
 * Configuração do transportador SMTP para envio de emails
 */
export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(env.SMTP_PORT ?? 465),
  secure: String(env.SMTP_SECURE ?? 'true') === 'true',
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS
  },
  logger: isDev,
  debug: isDev
})

// ... resto do seu código SMTP permanece IGUAL
export async function verifySmtpConnection(): Promise<void> {
  try {
    await transporter.verify()
    if (isDev) {
      console.warn('SMTP pronto para enviar')
    }
  } catch (err) {
    console.error('Falha ao conectar no SMTP:', err)
  }
}

export const EMAIL_TEXTS = {
  br: {
    subject: 'Seu relatório de pegada de carbono na saúde',
    html: `<p>Olá!</p><p>Segue em anexo o PDF com os resultados da sua simulação.</p><p>Obrigado por utilizar o simulador!</p>`
  },
  en: {
    subject: 'Your healthcare carbon footprint report',
    html: `<p>Hello!</p><p>Attached is the PDF with your simulation results.</p><p>Thank you for using the simulator!</p>`
  },
  es: {
    subject: 'Su informe de huella de carbono en salud',
    html: `<p>¡Hola!</p><p>Adjunto el PDF con los resultados de su simulación.</p><p>¡Gracias por usar el simulador!</p>`
  },
  cn: {
    subject: '您的医疗健康碳足迹报告',
    html: `<p>您好！</p><p>附件是您的模拟结果 PDF。</p><p>感谢您使用本模拟器!</p>`
  }
} as const
