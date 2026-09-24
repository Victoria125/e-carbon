-- Migration 002: Corrige campos JSONB da tabela Anamnesis
-- Objetivo: garantir que os campos reflitam corretamente as perguntas do questionário
--
-- NOTA: As colunas hipertensao, diabetes, sobrepeso, lombalgia são JSONB,
-- portanto os "campos internos" não são colunas reais do banco —
-- são chaves dentro do JSON. A estrutura interna do JSONB é controlada
-- pelo schema Zod e pelo payload do frontend, não por DDL.
--
-- ANTES:
--   hipertensao: { medicacao, controlado, diagnostico }
--   diabetes:    { tipo, medicacao, glicemia_jejum }
--   sobrepeso:   { imc, diagnostico, acompanhamento }
--   lombalgia:   { diagnostico, tratamento, frequencia }
--
-- DEPOIS:
--   hipertensao: { tratamento, controlado, emergencias }
--   diabetes:    { controlado, emergencias, tratamento }
--   sobrepeso:   { cirurgia_bariatrica, recomendacao, medicacao, medidas }
--   lombalgia:   { medicacao, exames_imagem, emergencias }
--
-- SEGURANÇA:
--   Idempotente — cada UPDATE só atua em linhas com chaves antigas (WHERE ? operator)
--   Não-destrutiva — rollback disponível em 002_rollback_anamnesis_fields.sql
--
-- INTEGRIDADE DOS DADOS:
--   Data de corte: 2025-03-24
--
--   Registros com created_at < '2025-03-24' possuem os seguintes problemas:
--
--     HIPERTENSAO:
--       "diagnostico" → renomeado para "emergencias"
--
--     DIABETES:
--       "tipo"        → renomeado para "controlado"
--       emergencias   → campo novo (não era salvo)
--
--     SOBREPESO:
--       "diagnostico"    → renomeado para "cirurgia_bariatrica"
--       "acompanhamento" → renomeado para "medicacao"
--       "imc"            → removido (não existe no questionário)
--       recomendacao     → campo novo (não era salvo)
--       medidas          → campo novo (não era salvo)
--
--     LOMBALGIA:
--       "diagnostico" → renomeado para "medicacao"
--       "tratamento"  → renomeado para "exames_imagem"
--       "frequencia"  → renomeado para "emergencias"
--
--     GERAL:
--       Dados de condições desmarcadas não eram limpos (ficavam no banco)
--
--   Registros com created_at >= '2025-03-24' são 100% íntegros:
--     - Todos os campos mapeados corretamente
--     - Todas as perguntas do questionário salvas
--     - Condições desmarcadas limpas (NULL) no banco
--
--   Para filtrar apenas dados válidos:
--     SELECT * FROM "Anamnesis" WHERE created_at >= '2025-03-24';
--
--   Para filtrar dados da versão antiga (possivelmente inconsistentes):
--     SELECT * FROM "Anamnesis" WHERE created_at < '2025-03-24';

-- =============================================================================
-- MIGRAÇÃO (para frente)
-- =============================================================================

-- 1. Hipertensão: { medicacao → tratamento, diagnostico → emergencias, controlado mantém }
-- Só atualiza se a chave antiga 'medicacao' existir (indicando formato antigo)
UPDATE "Anamnesis"
SET hipertensao = jsonb_build_object(
    'tratamento', hipertensao->'medicacao',
    'controlado', hipertensao->'controlado',
    'emergencias', hipertensao->'diagnostico'
),
updated_at = CURRENT_TIMESTAMP
WHERE hipertensao IS NOT NULL
  AND hipertensao ? 'medicacao';

-- 2. Diabetes: { tipo → controlado, medicacao → tratamento, glicemia_jejum removido }
-- Só atualiza se a chave antiga 'tipo' existir
UPDATE "Anamnesis"
SET diabetes = jsonb_build_object(
    'controlado', diabetes->'tipo',
    'emergencias', NULL,
    'tratamento', diabetes->'medicacao'
),
updated_at = CURRENT_TIMESTAMP
WHERE diabetes IS NOT NULL
  AND diabetes ? 'tipo';

-- 3. Sobrepeso: { diagnostico → cirurgia_bariatrica, acompanhamento → medicacao, imc removido }
-- Só atualiza se a chave antiga 'imc' ou 'acompanhamento' existir
UPDATE "Anamnesis"
SET sobrepeso = jsonb_build_object(
    'cirurgia_bariatrica', sobrepeso->'diagnostico',
    'recomendacao', NULL,
    'medicacao', sobrepeso->'acompanhamento',
    'medidas', NULL
),
updated_at = CURRENT_TIMESTAMP
WHERE sobrepeso IS NOT NULL
  AND (sobrepeso ? 'imc' OR sobrepeso ? 'acompanhamento');

-- 4. Lombalgia: { diagnostico → medicacao, tratamento → exames_imagem, frequencia → emergencias }
-- Só atualiza se a chave antiga 'frequencia' existir
UPDATE "Anamnesis"
SET lombalgia = jsonb_build_object(
    'medicacao', lombalgia->'diagnostico',
    'exames_imagem', lombalgia->'tratamento',
    'emergencias', lombalgia->'frequencia'
),
updated_at = CURRENT_TIMESTAMP
WHERE lombalgia IS NOT NULL
  AND lombalgia ? 'frequencia';
