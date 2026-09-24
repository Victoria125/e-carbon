/**
 * Arquivo centralizado com todos os dados de saúde compartilhados
 * entre as jornadas de população e paciente.
 *
 * Fonte: docs/FATORES-EMISSAO-INSUMOS.md - Tabela "Impacto final por insumo"
 */

import TRANSLATIONS from '@/shared/assets/translations'

// ==================== FATORES DE EMISSÃO ====================

/**
 * Fatores de emissão padrão (kg CO₂e/unidade)
 * Baseado em "Fatores de Emissão - Insumos.pdf"
 */
export const EMISSION_FACTORS = {
  // Insumos (valores únicos por material)
  VACUTAINER: 0.03332, // Tubos de coleta a vácuo: 33,32 g CO₂e/un
  NEEDLE: 0.00524, // Agulhas descartáveis: 5,24 g CO₂e/un
  LANCET: 0.0008, // Lancetas: 0,80 g CO₂e/un
  SYRINGE: 0.01397, // Seringas descartáveis: 13,97 g CO₂e/un
  ALCOHOL: 0.00103, // Álcool 70%: 1,03 g CO₂e/un
  COTTON: 0.00185, // Algodão: 1,85 g CO₂e/un
  STERILE_GAUZE: 0.00185, // Gaze estéril: 1,85 g CO₂e/un
  BANDAGE: 0.00205, // Curativo adesivo: 2,05 g CO₂e/un
  TAPE: 0.00185, // Esparadrapo: 1,85 g CO₂e/un
  GLOVES: 0.02975, // Luvas descartáveis (Nitrila): 29,75 g CO₂e/un
  TOURNIQUET: 0.0123, // Garrote: 12,30 g CO₂e/un
  LABEL: 0.00069, // Etiquetas de identificação: 0,69 g CO₂e/un
  PIPETTE: 0.00322, // Pipeta: 3,22 g CO₂e/un
  GLUCOSE_SENSOR: 0.0043, // Sensor para Glicose: 4,30 g CO₂e/un
  CAPSULE: 0.02772, // Cápsula: 27,72 g CO₂e/un
  CASSETTE: 0.00645, // Cassete: 6,45 g CO₂e/un
  FUNDUS_EYE: 0.0001925, // Fundo de Olho: 0,19 g CO₂e/un
  FUNDUS_EYE_EASY: 0.0000004081, // Fundo de Olho: 0,0004081 g CO₂e/un

  XRAY: 0.051, // Raio X: 51,32 g CO₂e/un
  TOMOGRAPHY: 0.385, // Tomografia: 51,32 g CO₂e/un
  RESONANCE: 1.201, // Ressonância: 1201,20 g CO₂e/un
  THERMOGRAPHY: 0.0000010703, // 0,0010703 g CO₂e/un

  // Serviços e procedimentos
  HOSPITALIZATION_LOWERBACKPAIN: 180,
  HOSPITALIZATION_HYPERTENSION: 363,
  HOSPITALIZATION_OVERWEIGHT: 90,
  HOSPITALIZATION_DIABETES: 138,

  // Média de todas as internações ((180 + 363 + 90 + 138) / 4 = 192.75) para quem relata não ter comorbidade mas falha na rotina preventiva
  HOSPITALIZATION_NOCHRONICCONDITIONS: 192.75
} as const

// ==================== CONFIGURAÇÃO DE ACOMPANHAMENTO ====================

/**
 * Retorna a configuração de acompanhamento com textos traduzidos
 * @param language - Código do idioma ('br', 'en', 'es', 'cn')
 * @returns Configuração com textos no idioma especificado
 */
export function getFollowUpConfig(language: string = 'br'): Record<string, { text: string, badgeClass: string, frequencyMultiplier: number }> {
  const translations = TRANSLATIONS as Record<string, Record<string, unknown>>
  const followUpTypes = translations[language]?.followUpTypes as Record<string, string> || translations.br.followUpTypes as Record<string, string>

  return {
    none: {
      text: followUpTypes.none,
      badgeClass: 'bg-[#FF0000]/40',
      frequencyMultiplier: 1
    },
    annual: {
      text: followUpTypes.annual,
      badgeClass: 'bg-[#00c3ff]/20 px-4',
      frequencyMultiplier: 1
    },
    semiannual: {
      text: followUpTypes.semiannual,
      badgeClass: 'bg-[#79DB11]/15 px-4',
      frequencyMultiplier: 2
    }
  }
}

// ==================== CHAVES DE TRADUÇÃO PARA PRODUTOS ====================

/**
 * Chaves de tradução para produtos e serviços médicos
 * Usadas para buscar nomes traduzidos em TRANSLATIONS[lang].products
 */
export const PRODUCT_KEYS = {
  VACUTAINER: 'vacutainer',
  NEEDLE: 'needle',
  LANCET: 'lancet',
  SYRINGE: 'syringe',
  ALCOHOL: 'alcohol',
  COTTON: 'cotton',
  STERILE_GAUZE: 'sterileGauze',
  BANDAGE: 'bandage',
  TAPE: 'tape',
  GLOVES: 'gloves',
  TOURNIQUET: 'tourniquet',
  LABEL: 'label',
  PIPETTE: 'pipette',
  GLUCOSE_SENSOR: 'glucoseSensor',
  CAPSULE: 'capsule',
  CASSETTE: 'cassette',
  FUNDUS_EYE: 'fundusEye',
  FUNDUS_EYE_EASY: 'fundusEyeEasy',
  XRAY: 'xray',
  TOMOGRAPHY: 'tomography',
  RESONANCE: 'resonance',
  THERMOGRAPHY: 'thermography',
  HOSPITALIZATION_LOWERBACKPAIN: 'hospitalizationLowerBackPain',
  HOSPITALIZATION_HYPERTENSION: 'hospitalizationHypertension',
  HOSPITALIZATION_DIABETES: 'hospitalizationDiabetes',
  HOSPITALIZATION_OVERWEIGHT: 'hospitalizationOverweight',
  HOSPITALIZATION_NOCHRONICCONDITIONS: 'hospitalizationNoChronicConditions'
} as const

// ==================== PRODUTOS BASE ====================

/**
 * Interface para produtos base
 */
export interface BaseProduct {
  name: string // Chave para tradução em TRANSLATIONS[lang].products
  category: 'material' | 'service'
  emissionFactor: number
  quantity: number
}

/**
 * Função auxiliar para obter o nome traduzido de um produto
 * @param name - Chave do produto (ex: 'vacutainer')
 * @param language - Código do idioma ('br', 'en', 'es', 'cn')
 * @returns Nome traduzido do produto
 */
export function getProductName(name: string, language: string = 'br'): string {
  const translations = TRANSLATIONS as Record<string, Record<string, unknown>>
  const products = translations[language]?.products as Record<string, string> || translations.br.products as Record<string, string>
  return products?.[name] || name
}

/**
 * Função auxiliar para obter o nome traduzido de uma categoria de produto
 * @param name - Chave da categoria (ex: 'material', 'service')
 * @param language - Código do idioma ('br', 'en', 'es', 'cn')
 * @returns Nome traduzida categoria
 */
export function getProductCategory(name: string, language: string = 'br'): string {
  const translations = TRANSLATIONS as Record<string, Record<string, unknown>>
  const products = translations[language]?.category as Record<string, string> || translations.br.category as Record<string, string>
  return products?.[name] || name
}

/**
 * Produtos laboratoriais convencionais
 * Usados em exames de sangue comuns às condições metabólicas
 */
export const LAB_PRODUCTS_CONVENTIONAL_OVERWEIGHT: BaseProduct[] = [
  {
    name: PRODUCT_KEYS.VACUTAINER,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.VACUTAINER,
    quantity: 5
  },
  {
    name: PRODUCT_KEYS.NEEDLE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.NEEDLE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.SYRINGE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.SYRINGE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.ALCOHOL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.ALCOHOL,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.COTTON,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.COTTON,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.STERILE_GAUZE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.STERILE_GAUZE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.TAPE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.TAPE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.BANDAGE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.BANDAGE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLOVES,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLOVES,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.TOURNIQUET,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.TOURNIQUET,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.LABEL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.LABEL,
    quantity: 5
  },
  {
    name: PRODUCT_KEYS.FUNDUS_EYE,
    category: 'service',
    emissionFactor: EMISSION_FACTORS.FUNDUS_EYE,
    quantity: 1
  }
]

export const LAB_PRODUCTS_CONVENTIONAL_HYPERTENSION: BaseProduct[] = [
  {
    name: PRODUCT_KEYS.VACUTAINER,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.VACUTAINER,
    quantity: 3
  },
  {
    name: PRODUCT_KEYS.NEEDLE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.NEEDLE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.SYRINGE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.SYRINGE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.ALCOHOL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.ALCOHOL,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.COTTON,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.COTTON,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.STERILE_GAUZE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.STERILE_GAUZE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.TAPE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.TAPE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.BANDAGE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.BANDAGE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLOVES,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLOVES,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.TOURNIQUET,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.TOURNIQUET,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.LABEL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.LABEL,
    quantity: 3
  },
  {
    name: PRODUCT_KEYS.FUNDUS_EYE,
    category: 'service',
    emissionFactor: EMISSION_FACTORS.FUNDUS_EYE,
    quantity: 1
  }
]

export const LAB_PRODUCTS_CONVENTIONAL_DIABETES: BaseProduct[] = [
  {
    name: PRODUCT_KEYS.VACUTAINER,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.VACUTAINER,
    quantity: 3
  },
  {
    name: PRODUCT_KEYS.NEEDLE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.NEEDLE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.SYRINGE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.SYRINGE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.ALCOHOL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.ALCOHOL,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.COTTON,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.COTTON,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.STERILE_GAUZE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.STERILE_GAUZE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.TAPE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.TAPE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.BANDAGE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.BANDAGE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLOVES,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLOVES,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.TOURNIQUET,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.TOURNIQUET,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.LABEL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.LABEL,
    quantity: 3
  },
  {
    name: PRODUCT_KEYS.FUNDUS_EYE,
    category: 'service',
    emissionFactor: EMISSION_FACTORS.FUNDUS_EYE,
    quantity: 1
  }
]

export const LAB_PRODUCTS_CONVENTIONAL_LOWERBACKPAIN: BaseProduct[] = [
  {
    name: PRODUCT_KEYS.XRAY,
    category: 'service',
    emissionFactor: EMISSION_FACTORS.XRAY,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.TOMOGRAPHY,
    category: 'service',
    emissionFactor: EMISSION_FACTORS.TOMOGRAPHY,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.RESONANCE,
    category: 'service',
    emissionFactor: EMISSION_FACTORS.RESONANCE,
    quantity: 1
  }
]

export const LAB_PRODUCTS_CONVENTIONAL_NOCHRONICCONDITIONS: BaseProduct[] = [
  {
    name: PRODUCT_KEYS.VACUTAINER,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.VACUTAINER,
    quantity: 5
  },
  {
    name: PRODUCT_KEYS.NEEDLE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.NEEDLE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.SYRINGE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.SYRINGE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.ALCOHOL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.ALCOHOL,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.COTTON,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.COTTON,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.STERILE_GAUZE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.STERILE_GAUZE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.TAPE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.TAPE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.BANDAGE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.BANDAGE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLOVES,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLOVES,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.TOURNIQUET,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.TOURNIQUET,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.LABEL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.LABEL,
    quantity: 5
  }
]

/**
 * Produtos para Point of Care (testes rápidos)
 * Usados em testes capilares e procedimentos simplificados
 */
export const LAB_PRODUCTS_POINT_OF_CARE_OVERWEIGHT: BaseProduct[] = [
  {
    name: PRODUCT_KEYS.PIPETTE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.PIPETTE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.LANCET,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.LANCET,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.ALCOHOL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.ALCOHOL,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.COTTON,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.COTTON,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLOVES,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLOVES,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLUCOSE_SENSOR,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLUCOSE_SENSOR,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.CAPSULE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.CAPSULE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.CASSETTE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.CASSETTE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.FUNDUS_EYE_EASY,
    category: 'service',
    emissionFactor: EMISSION_FACTORS.FUNDUS_EYE_EASY,
    quantity: 1
  }
]

export const LAB_PRODUCTS_POINT_OF_CARE_HYPERTENSION: BaseProduct[] = [
  {
    name: PRODUCT_KEYS.PIPETTE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.PIPETTE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.LANCET,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.LANCET,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.ALCOHOL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.ALCOHOL,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.COTTON,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.COTTON,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLOVES,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLOVES,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLUCOSE_SENSOR,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLUCOSE_SENSOR,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.CAPSULE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.CAPSULE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.CASSETTE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.CASSETTE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.FUNDUS_EYE_EASY,
    category: 'service',
    emissionFactor: EMISSION_FACTORS.FUNDUS_EYE_EASY,
    quantity: 1
  }
]

export const LAB_PRODUCTS_POINT_OF_CARE_DIABETES: BaseProduct[] = [
  {
    name: PRODUCT_KEYS.PIPETTE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.PIPETTE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.LANCET,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.LANCET,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.ALCOHOL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.ALCOHOL,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.COTTON,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.COTTON,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLOVES,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLOVES,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLUCOSE_SENSOR,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLUCOSE_SENSOR,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.CAPSULE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.CAPSULE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.CASSETTE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.CASSETTE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.FUNDUS_EYE_EASY,
    category: 'service',
    emissionFactor: EMISSION_FACTORS.FUNDUS_EYE_EASY,
    quantity: 1
  }
]

export const LAB_PRODUCTS_POINT_OF_CARE_LOWERBACKPAIN: BaseProduct[] = [
  {
    name: PRODUCT_KEYS.THERMOGRAPHY,
    category: 'service',
    emissionFactor: EMISSION_FACTORS.THERMOGRAPHY,
    quantity: 1
  }
]

export const LAB_PRODUCTS_POINT_OF_CARE_NOCHRONICCONDITIONS: BaseProduct[] = [
  {
    name: PRODUCT_KEYS.PIPETTE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.PIPETTE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.LANCET,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.LANCET,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.ALCOHOL,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.ALCOHOL,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.COTTON,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.COTTON,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLOVES,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLOVES,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.GLUCOSE_SENSOR,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.GLUCOSE_SENSOR,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.CAPSULE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.CAPSULE,
    quantity: 1
  },
  {
    name: PRODUCT_KEYS.CASSETTE,
    category: 'material',
    emissionFactor: EMISSION_FACTORS.CASSETTE,
    quantity: 1
  }
]

/**
 * Produtos laboratoriais agrupados por tipo de exame
 */
export const LAB_PRODUCTS_OVERWEIGHT = {
  conventional: LAB_PRODUCTS_CONVENTIONAL_OVERWEIGHT,
  pointOfCare: LAB_PRODUCTS_POINT_OF_CARE_OVERWEIGHT
}

export const LAB_PRODUCTS_HYPERTENSION = {
  conventional: LAB_PRODUCTS_CONVENTIONAL_HYPERTENSION,
  pointOfCare: LAB_PRODUCTS_POINT_OF_CARE_HYPERTENSION
}

export const LAB_PRODUCTS_DIABETES = {
  conventional: LAB_PRODUCTS_CONVENTIONAL_DIABETES,
  pointOfCare: LAB_PRODUCTS_POINT_OF_CARE_DIABETES
}

export const LAB_PRODUCTS_LOWERBACKPAIN = {
  conventional: LAB_PRODUCTS_CONVENTIONAL_LOWERBACKPAIN,
  pointOfCare: LAB_PRODUCTS_POINT_OF_CARE_LOWERBACKPAIN
}

export const LAB_PRODUCTS_NOCHRONICCONDITIONS = {
  conventional: LAB_PRODUCTS_CONVENTIONAL_NOCHRONICCONDITIONS,
  pointOfCare: LAB_PRODUCTS_POINT_OF_CARE_NOCHRONICCONDITIONS
}

// ==================== PRODUTOS POR CONDIÇÃO ====================

/**
 * Interface para cenários de produtos (conventional e point of care)
 */
export interface ProductsByScenario {
  conventional: BaseProduct[]
  pointOfCare: BaseProduct[]
}

/**
 * Produtos específicos para cada condição médica e tipo de acompanhamento
 * Estrutura: { condição: { followUpType: { examType: produtos[] } } }
 */
export const PRODUCTS_BY_CONDITION = {
  lowerBackPain: {
    none: {
      conventional: [
        {
          name: PRODUCT_KEYS.HOSPITALIZATION_LOWERBACKPAIN,
          category: 'service' as const,
          emissionFactor: EMISSION_FACTORS.HOSPITALIZATION_LOWERBACKPAIN,
          quantity: 1
        }
      ],
      pointOfCare: [
        {
          name: PRODUCT_KEYS.HOSPITALIZATION_LOWERBACKPAIN,
          category: 'service' as const,
          emissionFactor: EMISSION_FACTORS.HOSPITALIZATION_LOWERBACKPAIN,
          quantity: 1
        }
      ]
    },
    annual: LAB_PRODUCTS_LOWERBACKPAIN,
    semiannual: LAB_PRODUCTS_LOWERBACKPAIN
  },
  hypertension: {
    none: {
      conventional: [
        {
          name: PRODUCT_KEYS.HOSPITALIZATION_HYPERTENSION,
          category: 'service' as const,
          emissionFactor: EMISSION_FACTORS.HOSPITALIZATION_HYPERTENSION,
          quantity: 1
        }
      ],
      pointOfCare: [
        {
          name: PRODUCT_KEYS.HOSPITALIZATION_HYPERTENSION,
          category: 'service' as const,
          emissionFactor: EMISSION_FACTORS.HOSPITALIZATION_HYPERTENSION,
          quantity: 1
        }
      ]
    },
    annual: LAB_PRODUCTS_HYPERTENSION,
    semiannual: LAB_PRODUCTS_HYPERTENSION
  },
  diabetes: {
    none: {
      conventional: [
        {
          name: PRODUCT_KEYS.HOSPITALIZATION_DIABETES,
          category: 'service' as const,
          emissionFactor: EMISSION_FACTORS.HOSPITALIZATION_DIABETES,
          quantity: 1
        }
      ],
      pointOfCare: [
        {
          name: PRODUCT_KEYS.HOSPITALIZATION_DIABETES,
          category: 'service' as const,
          emissionFactor: EMISSION_FACTORS.HOSPITALIZATION_DIABETES,
          quantity: 1
        }
      ]
    },
    annual: LAB_PRODUCTS_DIABETES,
    semiannual: LAB_PRODUCTS_DIABETES
  },
  overweight: {
    none: {
      conventional: [
        {
          name: PRODUCT_KEYS.HOSPITALIZATION_OVERWEIGHT,
          category: 'service' as const,
          emissionFactor: EMISSION_FACTORS.HOSPITALIZATION_OVERWEIGHT,
          quantity: 1
        }
      ],
      pointOfCare: [
        {
          name: PRODUCT_KEYS.HOSPITALIZATION_OVERWEIGHT,
          category: 'service' as const,
          emissionFactor: EMISSION_FACTORS.HOSPITALIZATION_OVERWEIGHT,
          quantity: 1
        }
      ]
    },
    annual: LAB_PRODUCTS_OVERWEIGHT,
    semiannual: LAB_PRODUCTS_OVERWEIGHT
  },
  noChronicConditions: {
    none: {
      conventional: [
        {
          name: PRODUCT_KEYS.HOSPITALIZATION_NOCHRONICCONDITIONS,
          category: 'service' as const,
          emissionFactor: EMISSION_FACTORS.HOSPITALIZATION_NOCHRONICCONDITIONS,
          quantity: 1
        }
      ],
      pointOfCare: [
        {
          name: PRODUCT_KEYS.HOSPITALIZATION_NOCHRONICCONDITIONS,
          category: 'service' as const,
          emissionFactor: EMISSION_FACTORS.HOSPITALIZATION_NOCHRONICCONDITIONS,
          quantity: 1
        }
      ]
    },
    annual: {
      conventional: LAB_PRODUCTS_CONVENTIONAL_NOCHRONICCONDITIONS,
      pointOfCare: LAB_PRODUCTS_POINT_OF_CARE_NOCHRONICCONDITIONS
    },
    semiannual: {
      conventional: LAB_PRODUCTS_CONVENTIONAL_NOCHRONICCONDITIONS,
      pointOfCare: LAB_PRODUCTS_POINT_OF_CARE_NOCHRONICCONDITIONS
    }
  }
}
