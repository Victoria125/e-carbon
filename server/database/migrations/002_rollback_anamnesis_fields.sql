-- Rollback da Migration 002: Reverte os campos JSONB para a estrutura original
--
-- DEPOIS (estado atual, novo):
--   hipertensao: { tratamento, controlado, emergencias }
--   diabetes:    { controlado, emergencias, tratamento }
--   sobrepeso:   { cirurgia_bariatrica, recomendacao, medicacao, medidas }
--   lombalgia:   { medicacao, exames_imagem, emergencias }
--
-- ANTES (estado original, destino do rollback):
--   hipertensao: { medicacao, controlado, diagnostico }
--   diabetes:    { tipo, medicacao, glicemia_jejum }
--   sobrepeso:   { imc, diagnostico, acompanhamento }
--   lombalgia:   { diagnostico, tratamento, frequencia }
--
-- SEGURANÇA:
--   Idempotente — cada UPDATE só atua em linhas com chaves NOVAS (WHERE ? operator)

-- =============================================================================
-- ROLLBACK (reverter para formato antigo)
-- =============================================================================

-- 1. Hipertensão: { tratamento → medicacao, emergencias → diagnostico, controlado mantém }
UPDATE "Anamnesis"
SET hipertensao = jsonb_build_object(
    'medicacao', hipertensao->'tratamento',
    'controlado', hipertensao->'controlado',
    'diagnostico', hipertensao->'emergencias'
),
updated_at = CURRENT_TIMESTAMP
WHERE hipertensao IS NOT NULL
  AND hipertensao ? 'emergencias';

-- 2. Diabetes: { controlado → tipo, tratamento → medicacao, adiciona glicemia_jejum }
UPDATE "Anamnesis"
SET diabetes = jsonb_build_object(
    'tipo', diabetes->'controlado',
    'medicacao', diabetes->'tratamento',
    'glicemia_jejum', NULL
),
updated_at = CURRENT_TIMESTAMP
WHERE diabetes IS NOT NULL
  AND diabetes ? 'tratamento'
  AND NOT diabetes ? 'tipo';

-- 3. Sobrepeso: { cirurgia_bariatrica → diagnostico, medicacao → acompanhamento, adiciona imc }
UPDATE "Anamnesis"
SET sobrepeso = jsonb_build_object(
    'imc', NULL,
    'diagnostico', sobrepeso->'cirurgia_bariatrica',
    'acompanhamento', sobrepeso->'medicacao'
),
updated_at = CURRENT_TIMESTAMP
WHERE sobrepeso IS NOT NULL
  AND sobrepeso ? 'cirurgia_bariatrica';

-- 4. Lombalgia: { medicacao → diagnostico, exames_imagem → tratamento, emergencias → frequencia }
UPDATE "Anamnesis"
SET lombalgia = jsonb_build_object(
    'diagnostico', lombalgia->'medicacao',
    'tratamento', lombalgia->'exames_imagem',
    'frequencia', lombalgia->'emergencias'
),
updated_at = CURRENT_TIMESTAMP
WHERE lombalgia IS NOT NULL
  AND lombalgia ? 'exames_imagem';
