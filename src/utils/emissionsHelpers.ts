/**
 * Funções auxiliares para cálculos de emissões
 *
 * Este arquivo centraliza funções que são compartilhadas entre
 * a jornada coletiva (Wizard) e a jornada individual (Patient).
 */

/**
 * Interface para produtos com emissões e doença associada
 */
interface ProductWithEmissions {
  totalEmissions: number
  disease: string
}

/**
 * Interface para produtos do paciente com emissões
 */
interface PatientProductWithEmissions {
  emissionFactor: number
  quantity: number
  condition: string
}

/**
 * Calcula emissões agrupadas por doença
 *
 * Esta função é usada tanto na jornada coletiva quanto na jornada individual
 * para agregar emissões por doença/condição.
 *
 * @param products - Array de produtos com emissões e doença associada
 * @param frequencyMultiplier - Multiplicador de frequência (ex: 2 para semestral)
 * @returns Objeto com emissões totais por doença
 *
 * @example
 * const products = [
 *   { totalEmissions: 10, disease: 'diabetes' },
 *   { totalEmissions: 15, disease: 'diabetes' },
 *   { totalEmissions: 20, disease: 'hypertension' }
 * ]
 * calculateEmissionsByDisease(products, 1)
 * // { diabetes: 25, hypertension: 20 }
 */
export function calculateEmissionsByDisease(
  products: ProductWithEmissions[],
  frequencyMultiplier: number
): Record<string, number> {
  return products.reduce((acc, product) => {
    const disease = product.disease
    const emissions = product.totalEmissions * frequencyMultiplier
    acc[disease] = (acc[disease] || 0) + emissions
    return acc
  }, {} as Record<string, number>)
}

/**
 * Calcula emissões agrupadas por condição do paciente
 *
 * Versão alternativa para produtos do paciente que têm estrutura diferente
 *
 * @param products - Array de produtos do paciente
 * @param frequencyMultiplier - Multiplicador de frequência
 * @returns Objeto com emissões totais por condição
 */
export function calculateEmissionsByCondition(
  products: PatientProductWithEmissions[],
  frequencyMultiplier: number
): Record<string, number> {
  return products.reduce((acc, product) => {
    const condition = product.condition
    const emissions = product.emissionFactor * product.quantity * frequencyMultiplier
    acc[condition] = (acc[condition] || 0) + emissions
    return acc
  }, {} as Record<string, number>)
}

/**
 * Calcula soma total de emissões de produtos
 *
 * @param products - Array de produtos com emissionFactor e quantity
 * @param frequencyMultiplier - Multiplicador de frequência
 * @returns Total de emissões em kg CO₂e
 */
export function calculateProductEmissionsSum(
  products: Array<{ emissionFactor: number, quantity: number }>,
  frequencyMultiplier: number
): number {
  return products.reduce((sum, product) => {
    return sum + (product.emissionFactor * product.quantity * frequencyMultiplier)
  }, 0)
}
