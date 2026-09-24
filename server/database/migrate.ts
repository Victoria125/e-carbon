import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import pkg from 'pg'

const { Pool } = pkg

const __dirname = dirname(fileURLToPath(import.meta.url))
const migrationsDir = join(__dirname, 'migrations')

console.warn('[INFO] - Configurando pool de conexão...')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function runMigrations() {
  const client = await pool.connect()
  console.warn('[OK!] - Conectado ao banco!')

  try {
    // Criar tabela de controle de migrations (se não existir)
    await client.query(`
      CREATE TABLE IF NOT EXISTS "_migrations" (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Listar arquivos de migration em ordem (ignora rollback)
    const files = readdirSync(migrationsDir)
      .filter((f) => f.endsWith('.sql') && !f.includes('rollback'))
      .sort()

    console.warn(`[INFO] - ${files.length} migration(s) encontrada(s): ${files.join(', ')}`)

    for (const file of files) {
      // Verificar se já foi executada
      const alreadyRan = await client.query(
        'SELECT 1 FROM "_migrations" WHERE filename = $1',
        [file]
      )

      if (alreadyRan.rows.length > 0) {
        console.warn(`[INFO] - ${file} — já executada, pulando`)
        continue
      }

      // Executar migration
      const sql = readFileSync(join(migrationsDir, file), 'utf-8')
      console.warn(`[INFO] - Executando ${file}...`)

      await client.query('BEGIN')
      try {
        await client.query(sql)
        await client.query(
          'INSERT INTO "_migrations" (filename) VALUES ($1)',
          [file]
        )
        await client.query('COMMIT')
        console.warn(`[OK!] ${file} — executada com sucesso`)
      } catch (error) {
        await client.query('ROLLBACK')
        console.error(`[ERRO]: ${file} — FALHOU, rollback aplicado`)
        throw error
      }
    }

    // Verificar tabela Anamnesis
    const check = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'Anamnesis'
    `)

    if (check.rows.length === 0) {
      console.warn('[ERRO] - Tabela "Anamnesis" NÃO encontrada')
    }

    if (check.rows.length > 0) {
      console.warn('[OK!] - Tabela "Anamnesis" existe')
    }
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      console.error('[ERRO]:', error)
      throw error
    }

    console.error('[ERRO]:', error.message)

    if ('code' in error) {
      const pgError = error as Record<string, unknown>
      console.error('Código PG:', pgError.code)
      console.error('Detalhe:', pgError.detail)
    }

    throw error
  } finally {
    client.release()
    await pool.end()
    console.warn('[INFO] - Conexão fechada!')
  }
}

console.warn('[PROCESSANDO] - Iniciando migrações...')
runMigrations()
  .then(() => {
    console.warn('[OK!] - Todas as migrações finalizadas!')
    process.exit(0)
  })
  .catch((error: unknown) => {
    console.error('[ERRO] - Falha nas migrações!', error instanceof Error ? error.message : error)
    process.exit(1)
  })
