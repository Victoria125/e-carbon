import type { AnamnesisData, UpdateAnamnesisData } from '@server/modules/anamnesis/schema.js'
import { anamnesisRepository } from '@server/modules/anamnesis/repository.js'
import { NULLABLE_JSONB_FIELDS, UpdateAnamnesisSchema } from '@server/modules/anamnesis/schema.js'

export const anamnesisService = {
  async createAnamnesis(data: AnamnesisData) {
    return await anamnesisRepository.create(data)
  },

  async getAnamnesis(id: string) {
    return await anamnesisRepository.findById(id)
  },

  async getAllAnamnesis() {
    return await anamnesisRepository.findAll()
  },

  /**
   * Valida o body da request e atualiza a anamnese no banco.
   *
   * Campos JSONB (hipertensao, diabetes, sobrepeso, lombalgia) aceitam `null`
   * para limpar a condição desmarcada no banco.
   *
   * Quando `noChronicConditions` é selecionado, o `chronic_dx` vem como
   * `['noChronicConditions']` e todos os campos JSONB vêm como `null`,
   * resultando na limpeza dos dados das condições anteriores.
   *
   * @param id - ID da anamnese a atualizar
   * @param rawBody - body da request, validado internamente via Zod
   * @returns O documento atualizado ou null se não encontrado
   * @throws ZodError se a validação falhar
   */
  async parseAndUpdateAnamnesis(id: string, rawBody: UpdateAnamnesisData) {
    const validated = UpdateAnamnesisSchema.parse(rawBody)

    const repoData = this.buildRepoData(validated)

    if (Object.keys(repoData).length === 0) return null

    return await anamnesisRepository.update(id, repoData as Partial<AnamnesisData>)
  },

  /**
   * Filtra campos undefined (não enviados) e mantém null (para limpar no banco).
   */
  buildRepoData(validated: UpdateAnamnesisData): Record<string, unknown> {
    const result: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(validated)) {
      if (value === undefined) continue

      const isNullableJsonb = NULLABLE_JSONB_FIELDS.includes(key as typeof NULLABLE_JSONB_FIELDS[number])
      const shouldSetNull = value === null && isNullableJsonb

      result[key] = shouldSetNull ? null : value
    }

    return result
  }
}
