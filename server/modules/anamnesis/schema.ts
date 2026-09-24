import { z } from 'zod'

/**
 * Schema Zod da tabela Anamnesis.
 *
 * INTEGRIDADE DOS DADOS:
 * Registros com created_at < '2025-03-24' usam estrutura ANTIGA dos campos JSONB
 * e podem ter dados incompletos ou com chaves incorretas.
 * Registros com created_at >= '2025-03-24' são 100% íntegros.
 * Detalhes completos em: server/database/migrations/002_fix_anamnesis_fields.sql
 */
export const AnamnesisSchema = z.object({
  // 1. Dados Pessoais
  age: z.number().int().min(0).max(120),
  gender: z.enum(['feminino', 'masculino', 'outro']),

  // 3. Atividade Física - Caminhada
  walk_days: z.number().int().min(0).max(7),
  walk_minutes: z.number().int().min(0).max(1440),

  // 4. Atividade Física - Moderada
  mod_days: z.number().int().min(0).max(7),
  mod_minutes: z.number().int().min(0).max(1440),

  // 5. Atividade Física - Vigorosa
  vig_days: z.number().int().min(0).max(7),
  vig_minutes: z.number().int().min(0).max(1440),

  // 6. Alimentação - Verduras/Legumes
  veg_portions: z.number().int().min(0).max(6),

  // 7. Alimentação - Frutas
  fruit_portions: z.number().int().min(0).max(6),

  // 8. Alimentação - Ultraprocessados
  ultra_processed: z.number().int().min(0).max(6),

  // 9. Doenças Crônicas - Aceitar qualquer string
  chronic_dx: z.array(z.string()),

  // Hipertensão
  hipertensao: z.object({
    tratamento: z.string().optional(), // hypertensionTreatment (array joined as string)
    controlado: z.union([z.boolean(), z.string()]).optional(), // hypertensionControlled
    emergencias: z.string().optional() // hypertensionEmergencyVisits
  }).optional(),

  // Diabetes
  diabetes: z.object({
    controlado: z.union([z.boolean(), z.string()]).optional(), // diabetesControlled
    emergencias: z.string().optional(), // diabetesEmergencyVisits
    tratamento: z.string().optional() // diabetesTreatment (array joined as string)
  }).optional(),

  // Sobrepeso
  sobrepeso: z.object({
    cirurgia_bariatrica: z.string().optional(), // overweightBariatricSurgery
    recomendacao: z.string().optional(), // overweightRecommendation
    medicacao: z.string().optional(), // overweightMedication
    medidas: z.string().optional() // overweightMeasures (array joined as string)
  }).optional(),

  // Lombalgia
  lombalgia: z.object({
    medicacao: z.string().optional(), // lowerBackPainMedication
    exames_imagem: z.string().optional(), // lowerBackPainImagingExams (JSON stringified)
    emergencias: z.string().optional() // lowerBackPainEmergencyVisits
  }).optional(),

  // 13. Tabagismo - Aceitar valores existentes
  smoke_status: z.string(),

  // 14. Álcool - Dias/Semana
  alcohol_days_week: z.number().int().min(0).max(7),

  // 15. Álcool - Doses/Dia
  alcohol_drinks_day: z.number().int().min(0).max(7),

  // 16. Acompanhamento - Aceitar valores existentes
  followup: z.string(),

  // 17. Exames de Sangue
  blood_tests_year: z.number().int().min(0).max(12),

  // 17a. Tipo de Laboratório - Aceitar valores existentes
  lab_type: z.string().optional()
})

// Extrair o tipo TypeScript do schema Zod
export type AnamnesisData = z.infer<typeof AnamnesisSchema>

// Validação condicional com tipo correto
export function validateChronicConditions(data: AnamnesisData) {
  const errors: string[] = []

  if (data.chronic_dx?.includes('hipertensao') && !data.hipertensao) {
    errors.push('Dados de hipertensão são obrigatórios quando a doença é selecionada')
  }

  if (data.chronic_dx?.includes('diabetes') && !data.diabetes) {
    errors.push('Dados de diabetes são obrigatórios quando a doença é selecionada')
  }

  return errors
}

// Schema final
export const AnamnesisCompleteSchema = AnamnesisSchema

// Campos JSONB que podem ser null (para limpar condições desmarcadas no banco)
const NULLABLE_JSONB_FIELDS = ['hipertensao', 'diabetes', 'sobrepeso', 'lombalgia'] as const
export type NullableJsonbField = typeof NULLABLE_JSONB_FIELDS[number]
export { NULLABLE_JSONB_FIELDS }

// Schema para updates parciais — campos JSONB aceitam null para limpar no banco
export const UpdateAnamnesisSchema = AnamnesisSchema.partial().extend({
  hipertensao: AnamnesisSchema.shape.hipertensao.nullable().optional(),
  diabetes: AnamnesisSchema.shape.diabetes.nullable().optional(),
  sobrepeso: AnamnesisSchema.shape.sobrepeso.nullable().optional(),
  lombalgia: AnamnesisSchema.shape.lombalgia.nullable().optional()
})

export type UpdateAnamnesisData = z.infer<typeof UpdateAnamnesisSchema>
