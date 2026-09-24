import { env } from '@server/env.js'
import { Pool } from 'pg'

export const pool = new Pool({
  connectionString: env.DATABASE_URL
})
