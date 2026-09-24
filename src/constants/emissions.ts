/**
 * Constantes de Emissão de Carbono
 *
 * Este arquivo centraliza todos os valores relacionados a cálculos de emissão de carbono.
 * Valores baseados em estudos e documentação do projeto.
 *
 * @see docs/CALCULO_CARBONO_CIS_MS.md
 * @see docs/DOMAIN_RULES.md
 */

/**
 * Multiplicadores para diferentes tipos de descarte
 *
 * Representa o impacto ambiental relativo de cada método de descarte:
 * - Incineração: maior impacto (1.5x)
 * - Autoclave: impacto moderado (1.2x)
 * - Aterro: impacto base (1.0x)
 * - Reciclagem: menor impacto (0.3x)
 */
// export const DISPOSAL_MULTIPLIERS = { incineration: 1.5, autoclave: 1.2, landfill: 1, recycling: 0.3 } as const

/**
 * Multiplicador de acompanhamento
 *
 * Representa o aumento de emissões quando o paciente não tem acompanhamento regular.
 * Sem acompanhamento preventivo, as emissões são 80% maiores devido a:
 * - Emergências médicas
 * - Internações evitáveis
 * - Tratamentos mais invasivos
 *
 * Valor: 1.8 (180% das emissões com acompanhamento)
 */
// export const FOLLOW_UP_MULTIPLIER = 1.8

/**
 * Taxa de internações evitáveis
 *
 * Percentual da população que pode evitar internações com acompanhamento adequado.
 *
 * Valor: 15% (0.15)
 * Fonte: Estudos de saúde pública sobre prevenção
 */
// export const AVOIDABLE_HOSPITALIZATIONS_RATE = 0.15

/**
 * Taxa de emissões por internações (Hospitalization Emission Share)
 *
 * Percentual das emissões totais que são atribuídas a internações hospitalares.
 *
 * Valor: 35% (0.35)
 */
// export const HOSPITALIZATION_EMISSION_RATE = 0.35
// export const HOSPITALIZATION_EMISSION_SHARE = HOSPITALIZATION_EMISSION_RATE

/**
 * Fator de equivalência em árvores (Tree Absorption)
 *
 * Quantos kg de CO₂ uma árvore absorve por ano.
 * Usado para converter emissões em "equivalente em árvores".
 *
 * Valor: 24 kg CO₂/árvore/ano
 * Fonte: Média de absorção de árvore adulta em clima tropical
 */
export const TREES_EQUIVALENT_FACTOR = 24
export const TREE_ABSORPTION_KG_CO2_YEAR = TREES_EQUIVALENT_FACTOR

/**
 * Taxa de emissões evitáveis sem acompanhamento
 *
 * Percentual das emissões que pode ser evitado se o paciente iniciar acompanhamento.
 * Aplicado apenas quando followUpType === 'none'.
 *
 * Valor: 40% (0.40)
 */
// export const AVOIDABLE_WITHOUT_FOLLOWUP_RATE = 0.4

/**
 * Multiplicador de ida e volta
 *
 * Usado no cálculo de transporte para considerar a viagem de ida e volta.
 *
 * Valor: 2
 */
// export const ROUND_TRIP_MULTIPLIER = 2

/**
 * Multiplicador de frequência por tipo de acompanhamento
 *
 * Representa quantas vezes por ano o paciente usa os produtos/serviços:
 * - Semestral: 2x por ano
 * - Anual: 1x por ano
 * - Sem acompanhamento: 0x (só em emergências)
 */
export const FREQUENCY_MULTIPLIERS = {
  semiannual: 2,
  annual: 1,
  none: 1
} as const

/**
 * Limiares de conversão de unidades
 *
 * Usado para decidir quando mostrar kg vs g.
 */
export const UNIT_THRESHOLDS = {
  /** Abaixo deste valor (em kg), mostrar em gramas */
  showInGrams: 1,
  /** Fator de conversão kg → g */
  kgToGrams: 1000
} as const

/**
 * Helper: Converter kg para árvores equivalentes
 *
 * @param kgCO2e - Emissões em kg CO₂e
 * @returns Número de árvores equivalentes (arredondado para cima)
 */
export function convertToTreesEquivalent(kgCO2e: number): number {
  return Math.ceil(kgCO2e / TREES_EQUIVALENT_FACTOR)
}

/**
 * Helper: Formatar emissões com unidade apropriada
 *
 * @param kgValue - Valor em kg CO₂e
 * @returns Objeto com value (string formatado) e unit
 */
export function formatEmissions(kgValue: number): { value: string, unit: string } {
  if (kgValue < UNIT_THRESHOLDS.showInGrams) {
    const grams = kgValue * UNIT_THRESHOLDS.kgToGrams
    return {
      value: grams.toFixed(1),
      unit: 'g CO₂e'
    }
  }
  return {
    value: kgValue.toFixed(1),
    unit: 'kg CO₂e'
  }
}
