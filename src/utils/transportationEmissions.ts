import type { TransportationType } from '@/types/shared'

/**
 * Fatores de emissão para transporte baseados no documento
 * "Relatório de Cálculo de Emissões de Gases de Efeito Estufa (GEE) em Deslocamentos"
 *
 * Metodologia: GHG Protocol (Well-to-Wheel)
 *
 * Valores em kg CO₂e/km
 */

export const TRANSPORTATION_EMISSION_FACTORS: Record<TransportationType, number> = {
  car: 0.1345, // Carro: 1,345 kg CO₂e/L ÷ 10 km/L
  motorcycle: 0.0611, // Motocicleta: 1,345 kg CO₂e/L ÷ 22 km/L
  bus: 0.016, // Transporte Público (por passageiro): emissão compartilhada
  walking: 0 // Caminhada: sem emissões
}

/**
 * Fatores de combustível (Well-to-Wheel)
 * Valores em kg CO₂e/L
 */
export const FUEL_EMISSION_FACTORS = {
  gasoline: 2.13,
  ethanol: 0.56,
  diesel: 3.2,
  average: 1.345 // Média simples entre gasolina e etanol
} as const

/**
 * Eficiência de consumo por modal
 * Valores em km/L
 */
export const VEHICLE_FUEL_EFFICIENCY = {
  car: 10,
  motorcycle: 22,
  publicTransportVehicle: 3
} as const

/**
 * Ocupação média do transporte público
 * Usado para calcular emissão por passageiro
 */
export const PUBLIC_TRANSPORT_AVERAGE_OCCUPANCY = 66.7

/**
 * Calcula as emissões de CO₂e para um deslocamento
 *
 * @param transportType - Tipo de transporte utilizado
 * @param distanceKm - Distância percorrida em km (ida e volta)
 * @returns Emissões totais em kg CO₂e
 *
 * @example
 * // Deslocamento de 100 km de carro
 * calculateTransportationEmissions('car', 100) // retorna 13.45 kg CO₂e
 *
 * @example
 * // Deslocamento de 100 km de transporte público
 * calculateTransportationEmissions('bus', 100) // retorna 1.60 kg CO₂e
 */
export function calculateTransportationEmissions(
  transportType: TransportationType | undefined,
  distanceKm: number
): number {
  if (!transportType || distanceKm <= 0) {
    return 0
  }

  const emissionFactor = TRANSPORTATION_EMISSION_FACTORS[transportType]
  return emissionFactor * distanceKm
}

/**
 * Calcula a diferença de emissões entre dois modais de transporte
 *
 * @param fromType - Tipo de transporte atual
 * @param toType - Tipo de transporte alternativo
 * @param distanceKm - Distância percorrida em km
 * @returns Redução de emissões em kg CO₂e (positivo = redução, negativo = aumento)
 *
 * @example
 * // Comparar carro vs transporte público para 100 km
 * compareTransportationEmissions('car', 'bus', 100) // retorna 11.85 kg CO₂e de redução
 */
export function compareTransportationEmissions(
  fromType: TransportationType,
  toType: TransportationType,
  distanceKm: number
): number {
  const fromEmissions = calculateTransportationEmissions(fromType, distanceKm)
  const toEmissions = calculateTransportationEmissions(toType, distanceKm)
  return fromEmissions - toEmissions
}

/**
 * Calcula o percentual de redução de emissões ao trocar de modal
 *
 * @param fromType - Tipo de transporte atual
 * @param toType - Tipo de transporte alternativo
 * @returns Percentual de redução (0-100)
 *
 * @example
 * // Redução percentual de carro para transporte público
 * calculateEmissionReductionPercentage('car', 'bus') // retorna 88.1%
 */
export function calculateEmissionReductionPercentage(
  fromType: TransportationType,
  toType: TransportationType
): number {
  const fromFactor = TRANSPORTATION_EMISSION_FACTORS[fromType]
  const toFactor = TRANSPORTATION_EMISSION_FACTORS[toType]

  if (fromFactor === 0) return 0

  return ((fromFactor - toFactor) / fromFactor) * 100
}

/**
 * Retorna um label descritivo do modal de transporte
 */
export const transportationLabels: Record<TransportationType, string> = {
  car: 'Carro',
  motorcycle: 'Motocicleta',
  bus: 'Transporte Público',
  walking: 'Caminhada'
}

/**
 * Retorna informações detalhadas sobre o modal de transporte
 */
export function getTransportationInfo(transportType: TransportationType) {
  return {
    label: transportationLabels[transportType],
    emissionFactor: TRANSPORTATION_EMISSION_FACTORS[transportType],
    unit: 'kg CO₂e/km'
  }
}
