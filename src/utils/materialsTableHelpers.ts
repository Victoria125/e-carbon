import type { FollowUpConfig, MaterialProduct } from '@/types/materialsTable'
import { getFollowUpConfig } from '@/constants/healthcareData'

/**
 * Configuração de tipos de acompanhamento
 * Define cores, labels e multiplicadores de frequência
 */
export const followUpConfig: Record<string, FollowUpConfig> = getFollowUpConfig()

/**
 * Consolida produtos agrupando por "name" e categoria
 * Soma as quantidades de produtos duplicados
 * Ordena primeiro por emissão (decrescente), depois por quantidade (decrescente)
 *
 * @param products - Array de produtos a serem consolidados
 * @returns Array com produtos consolidados e ordenados
 */
export function consolidateProducts(products: MaterialProduct[]): MaterialProduct[] {
  const consolidated: Record<string, MaterialProduct> = {}

  // Somar quantidades de produtos com mesmo "name" e categoria
  for (const product of products) {
    const key = `${product.name}_${product.category}`

    if (consolidated[key]) {
      // Produto já existe - somar quantidade
      consolidated[key] = {
        ...consolidated[key],
        quantity: consolidated[key].quantity + product.quantity
      }
    } else {
      // Primeira ocorrência do produto
      consolidated[key] = { ...product }
    }
  }

  // Converter para array e ordenar: primeiro por emissão (maior para menor), depois por quantidade (maior para menor)
  return Object.values(consolidated).sort((a, b) => {
    // Calcular emissões totais de cada produto
    const emissionsA = a.emissionFactor * a.quantity
    const emissionsB = b.emissionFactor * b.quantity

    // Se as emissões forem diferentes, ordenar por emissão
    if (emissionsB !== emissionsA) {
      return emissionsB - emissionsA
    }
    // Se as emissões forem iguais, ordenar por quantidade
    return b.quantity - a.quantity
  })
}

/**
 * Calcula emissões totais de um produto considerando o multiplicador de frequência
 * Fórmula: emissionFactor × quantity × frequencyMultiplier
 *
 * Multiplicadores:
 * - none: 1x (baseline)
 * - annual: 1x (uma vez ao ano)
 * - semiannual: 2x (duas vezes ao ano)
 *
 * @param product - Produto para calcular emissões
 * @param followUpType - Tipo de acompanhamento
 * @returns Total de emissões em kg CO₂e
 */
export function calculateProductEmissions(
  product: MaterialProduct,
  followUpType: string
): number {
  const config = getFollowUpConfig()
  const frequencyMultiplier = config[followUpType]?.frequencyMultiplier || 1
  return product.emissionFactor * product.quantity * frequencyMultiplier
}

/**
 * Calcula a quantidade final de um produto considerando a frequência
 *
 * @param quantity - Quantidade base do produto
 * @param followUpType - Tipo de acompanhamento
 * @returns Quantidade final ajustada pela frequência
 */
export function calculateFinalQuantity(quantity: number, followUpType: string): number {
  const config = getFollowUpConfig()
  const frequencyMultiplier = config[followUpType]?.frequencyMultiplier || 1
  return quantity * frequencyMultiplier
}

/**
 * Gera o título da tabela baseado no tipo de exame
 *
 * @param examType - Tipo de exame (conventional ou pointOfCare)
 * @param customTitle - Título customizado opcional
 * @returns String com o título formatado
 */
export function getTableTitle(
  examType: 'conventional' | 'pointOfCare',
  customTitle?: string
): string {
  if (customTitle) return customTitle

  const examTypeLabel = examType === 'conventional' ? 'Convencional' : 'Point of Care'
  return `${examTypeLabel} - Produtos Consolidados`
}

/**
 * Mapeamento padrão de condições médicas para labels
 */
export const conditionLabels: Record<string, string> = {
  lowerBackPain: 'Dor Lombar',
  hypertension: 'Hipertensão',
  diabetes: 'Diabetes',
  overweight: 'Sobrepeso/Obesidade',
  noChronicConditions: 'Sem Diagnóstico'
}

/**
 * Gera título consolidado baseado em condições selecionadas
 * Formata automaticamente:
 * - 0 condições: "Produtos e Serviços"
 * - 1 condição: "Dor Lombar"
 * - 2+ condições: "Dor Lombar / Hipertensão / Diabetes"
 *
 * @param selectedConditions - Array de chaves das condições selecionadas
 * @param customLabels - Mapeamento customizado de labels (opcional)
 * @param defaultTitle - Título padrão quando nenhuma condição está selecionada
 * @returns Título formatado com condições
 */
export function getConsolidatedConditionsTitle(
  selectedConditions: string[],
  customLabels?: Record<string, string>,
  defaultTitle = 'Produtos e Serviços'
): string {
  const labels = customLabels || conditionLabels

  const conditionNames = selectedConditions
    .map((condition) => labels[condition])
    .filter(Boolean) // Remove undefined/null

  if (conditionNames.length === 0) return defaultTitle
  if (conditionNames.length === 1) return conditionNames[0]

  // Usar "/" como separador para múltiplas condições
  return conditionNames.join(' / ')
}
