// ✅ CORRETO - sem conflitos de nomes
import { env as processEnv } from 'node:process'
import { z } from 'zod'

// Schema básico
const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatória'),
  SMTP_USER: z.string().min(1, 'SMTP_USER é obrigatório'),
  SMTP_PASS: z.string().min(1, 'SMTP_PASS é obrigatório'),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().default('5174')
})

// Validar e exportar
export const env = envSchema.parse(processEnv)

// Log seguro
console.warn('[ENV] NODE_ENV:', env.NODE_ENV)
console.warn('[ENV] DATABASE_URL loaded:', '✓')
console.warn('[ENV] SMTP_USER loaded:', '✓')
console.warn('[ENV] SMTP_PASS loaded:', '✓')
