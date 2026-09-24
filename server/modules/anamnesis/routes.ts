import type { ZodError } from 'zod'
import { AnamnesisSchema } from '@server/modules/anamnesis/schema.js'
import { anamnesisService } from '@server/modules/anamnesis/service.js'
import { Router } from 'express'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const data = AnamnesisSchema.parse(req.body)
    const saved = await anamnesisService.createAnamnesis(data)
    res.json({ ok: true, id: saved.id })
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ZodError') {
      const zodError = error as ZodError
      return res.status(400).json({
        error: 'Payload inválido',
        issues: zodError.issues
      })
    }
    console.error(error)
    res.status(500).json({ error: 'Erro ao salvar anamnese' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const anamnesis = await anamnesisService.getAnamnesis(req.params.id)
    if (!anamnesis) return res.status(404).json({ error: 'Anamnese não encontrada' })
    res.json(anamnesis)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar anamnese' })
  }
})

router.get('/', async (_req, res) => {
  try {
    const anamneses = await anamnesisService.getAllAnamnesis()
    res.json(anamneses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar anamneses' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    // Toda validação e lógica de negócio fica no service
    const updated = await anamnesisService.parseAndUpdateAnamnesis(req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Anamnese não encontrada' })
    res.json({ ok: true, id: updated.id })
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ZodError') {
      const zodError = error as ZodError
      return res.status(400).json({ error: 'Payload inválido', issues: zodError.issues })
    }
    console.error(error)
    res.status(500).json({ error: 'Erro ao atualizar anamnese' })
  }
})

export default router
