import type {
  FollowUpData,
  PopulationByDisease,
  PopulationProduct,
  PopulationResults,
  PopulationValidation
} from '@/types/population'
import type { ExamType, FollowUpType } from '@/types/shared'
import { FREQUENCY_MULTIPLIERS } from '@/constants/emissions'
import { PRODUCTS_BY_CONDITION } from '@/constants/healthcareData'

/**
 * Calcula produtos e emissões para a jornada coletiva (Population)
 *
 * LÓGICA:
 * - Para cada doença com população > 0
 * - Para cada tipo de acompanhamento (none, annual, semiannual)
 * - Calcula quantas pessoas estão nesse acompanhamento (população × percentual / 100)
 * - Para cada produto dessa combinação (doença + acompanhamento + tipo de exame)
 * - Calcula quantidade total: pessoas × quantity (do PRODUCTS_BY_CONDITION)
 * - Calcula emissões: quantidade × emissionFactor × FREQUENCY_MULTIPLIERS[acompanhamento]
 *
 * IMPORTANTE:
 * - Usa MESMOS produtos do patient journey (PRODUCTS_BY_CONDITION de healthcareData.ts)
 * - Usa MESMOS fatores de emissão do markdown
 * - Usa FREQUENCY_MULTIPLIERS (none: 1, annual: 1, semiannual: 2)
 * - NÃO usa DISPOSAL_MULTIPLIERS (não aplicável)
 * - NÃO usa FOLLOW_UP_MULTIPLIER (usa FREQUENCY_MULTIPLIERS)
 * - NÃO usa AVOIDABLE_HOSPITALIZATIONS_RATE (não aplicável)
 *
 * @param population - População por doença
 * @param followUp - Distribuição percentual de acompanhamento por doença
 * @param examType - Tipo de exame ('conventional' ou 'pointOfCare')
 * @returns Array de produtos calculados com quantidades e emissões totais
 */
export function calculatePopulationProducts(
  population: PopulationByDisease,
  followUp: FollowUpData,
  examType: ExamType
): PopulationProduct[] {
  const products: PopulationProduct[] = []

  // Iterar por cada doença
  for (const [disease, totalPeople] of Object.entries(population)) {
    if (totalPeople === 0) continue

    const diseaseProducts = PRODUCTS_BY_CONDITION[disease as keyof typeof PRODUCTS_BY_CONDITION]
    if (!diseaseProducts) continue

    const followUpDistribution = followUp[disease as keyof FollowUpData]

    // Iterar por cada tipo de acompanhamento
    for (const [followUpType, percentage] of Object.entries(followUpDistribution)) {
      if (percentage === 0) continue

      // Calcular quantas pessoas estão neste tipo de acompanhamento
      const peopleInThisFollowUp = Math.round((totalPeople * percentage) / 100)

      // Pegar os produtos para esta combinação específica
      const followUpProducts = diseaseProducts[followUpType as FollowUpType]
      const scenarioProducts = followUpProducts[examType]

      // Calcular para cada produto
      for (let index = 0; index < scenarioProducts.length; index++) {
        const product = scenarioProducts[index]

        // Quantidade total: pessoas × quantidade por produto (PRODUCTS_BY_CONDITION usa "quantity")
        const totalQuantity = peopleInThisFollowUp * product.quantity

        // Emissões: quantidade × fator de emissão × multiplicador de frequência
        const frequencyMultiplier = FREQUENCY_MULTIPLIERS[followUpType as FollowUpType]
        const totalEmissions = totalQuantity * product.emissionFactor * frequencyMultiplier

        products.push({
          id: `${disease}_${followUpType}_${examType}_${index}`,
          name: product.name,
          category: product.category,
          weight: 0, // PRODUCTS_BY_CONDITION não tem weight
          emissionFactor: product.emissionFactor,
          disease,
          followUpType: followUpType as FollowUpType,
          examType,
          totalQuantity,
          totalEmissions
        })
      }
    }
  }

  return products
}

/**
 * Agrupa emissões por doença
 */
function calculateEmissionsByDisease(products: PopulationProduct[]): Record<string, number> {
  return products.reduce(
    (acc, product) => {
      const current = acc[product.disease] || 0
      return {
        ...acc,
        [product.disease]: current + product.totalEmissions
      }
    },
    {} as Record<string, number>
  )
}

/**
 * Calcula totais e agrupamentos de emissões para a população
 */
export function calculatePopulationResults(
  population: PopulationByDisease,
  followUp: FollowUpData,
  examType: ExamType
): PopulationResults {
  // Calcular todos os produtos
  const products = calculatePopulationProducts(population, followUp, examType)

  // Calcular total de emissões
  const totalEmissions = products.reduce((sum, product) => sum + product.totalEmissions, 0)

  // Agrupar emissões por doença
  const emissionsByDisease = calculateEmissionsByDisease(products)

  // Para comparação conventional vs pointOfCare, precisamos calcular ambos
  const conventionalProducts = calculatePopulationProducts(population, followUp, 'conventional')
  const pointOfCareProducts = calculatePopulationProducts(population, followUp, 'pointOfCare')

  const conventionalEmissions = conventionalProducts.reduce(
    (sum, product) => sum + product.totalEmissions,
    0
  )
  const pointOfCareEmissions = pointOfCareProducts.reduce(
    (sum, product) => sum + product.totalEmissions,
    0
  )

  return {
    products,
    totalEmissions,
    emissionsByDisease,
    conventionalVsPointOfCare: {
      conventional: conventionalEmissions,
      pointOfCare: pointOfCareEmissions
    }
  }
}

/**
 * Valida os dados de entrada da jornada coletiva
 *
 * VALIDAÇÕES:
 * - População não-negativa
 * - Pelo menos uma doença com população > 0
 * - Percentuais entre 0 e 100
 * - Percentuais somam 100% para cada doença (com tolerância para arredondamento)
 */
export function validatePopulationInputs(
  population: PopulationByDisease,
  followUp: FollowUpData
): PopulationValidation {
  const errors: string[] = []

  // Validar população
  for (const [disease, count] of Object.entries(population)) {
    if (count < 0) {
      errors.push(`População para ${disease} não pode ser negativa`)
    }
    if (!Number.isInteger(count)) {
      errors.push(`População para ${disease} deve ser um número inteiro`)
    }
  }

  // Validar que pelo menos uma doença tem população
  const totalPopulation = Object.values(population).reduce((sum, count) => sum + count, 0)
  if (totalPopulation === 0) {
    errors.push('Pelo menos uma doença deve ter população > 0')
  }

  // Validar percentuais de acompanhamento
  for (const [disease, distribution] of Object.entries(followUp)) {
    // Só validar percentuais se a doença tiver população
    const diseasePopulation = population[disease as keyof PopulationByDisease]
    if (diseasePopulation === 0) continue

    const sum = distribution.none + distribution.annual + distribution.semiannual

    // Tolerância de 0.1% para pequenos erros de arredondamento
    if (Math.abs(sum - 100) > 0.1) {
      errors.push(`Percentuais para ${disease} devem somar 100% (atual: ${sum.toFixed(1)}%)`)
    }

    if (distribution.none < 0 || distribution.annual < 0 || distribution.semiannual < 0) {
      errors.push(`Percentuais para ${disease} não podem ser negativos`)
    }

    if (distribution.none > 100 || distribution.annual > 100 || distribution.semiannual > 100) {
      errors.push(`Percentuais para ${disease} não podem ser maiores que 100%`)
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
