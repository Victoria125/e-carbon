import type { AnamnesisData } from '@server/modules/anamnesis/schema.js'
import { pool } from '@server/config/database.js'

export const anamnesisRepository = {
  async create(data: AnamnesisData) {
    const result = await pool.query(`
      INSERT INTO "Anamnesis"
      (age, gender, walk_days, walk_minutes, mod_days, mod_minutes, vig_days, vig_minutes,
       veg_portions, fruit_portions, ultra_processed, chronic_dx, smoke_status,
       alcohol_days_week, alcohol_drinks_day, followup, blood_tests_year, lab_type,
       hipertensao, diabetes, sobrepeso, lombalgia)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      RETURNING *
    `, [
      data.age, data.gender, data.walk_days, data.walk_minutes,
      data.mod_days, data.mod_minutes, data.vig_days, data.vig_minutes,
      data.veg_portions, data.fruit_portions, data.ultra_processed,
      data.chronic_dx, data.smoke_status, data.alcohol_days_week,
      data.alcohol_drinks_day, data.followup, data.blood_tests_year,
      data.lab_type || null,
      data.hipertensao ? JSON.stringify(data.hipertensao) : null,
      data.diabetes ? JSON.stringify(data.diabetes) : null,
      data.sobrepeso ? JSON.stringify(data.sobrepeso) : null,
      data.lombalgia ? JSON.stringify(data.lombalgia) : null
    ])
    return result.rows[0]
  },

  async findById(id: string) {
    const result = await pool.query('SELECT * FROM "Anamnesis" WHERE id = $1', [id])
    return result.rows[0]
  },

  async findAll() {
    const result = await pool.query('SELECT * FROM "Anamnesis" ORDER BY created_at DESC')
    return result.rows
  },

  ALLOWED_COLUMNS: new Set([
    'age', 'gender', 'walk_days', 'walk_minutes', 'mod_days', 'mod_minutes',
    'vig_days', 'vig_minutes', 'veg_portions', 'fruit_portions', 'ultra_processed',
    'chronic_dx', 'smoke_status', 'alcohol_days_week', 'alcohol_drinks_day',
    'followup', 'blood_tests_year', 'lab_type',
    'hipertensao', 'diabetes', 'sobrepeso', 'lombalgia'
  ]),

  async update(id: string, data: Partial<AnamnesisData>) {
    const fields = Object.keys(data).filter((key) => {
      const isAllowed = this.ALLOWED_COLUMNS.has(key)
      const hasValue = data[key as keyof typeof data] !== undefined
      return isAllowed && hasValue
    })

    if (fields.length === 0) return null

    const setClause = fields.map((key, index) => `"${key}" = $${index + 2}`).join(', ')
    const values = fields.map((key) => {
      const value = data[key as keyof typeof data]

      if (value === null) return null

      if (typeof value === 'object' && !Array.isArray(value)) {
        return JSON.stringify(value)
      }

      return value
    })

    const result = await pool.query(
      `UPDATE "Anamnesis" SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id, ...values]
    )

    return result.rows[0] || null
  }
}
