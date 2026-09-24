import type { PatientData } from '@/types/patient.js'
import type { ExamType, FollowUpType } from '@/types/shared.js'

import * as translationsModule from '@/shared/assets/translations'
import { calculateTransportationEmissions } from '@/utils/transportationEmissions.js'
// Definir tipo para as traduções baseado na estrutura real
interface TranslationDict {
  [key: string]: string | TranslationDict
}

interface Translations {
  br?: TranslationDict
  en?: TranslationDict
  es?: TranslationDict
  cn?: TranslationDict
}

const moduleWithDefault = translationsModule as { default?: unknown }
const translations: Translations = (moduleWithDefault.default as Translations) ?? (translationsModule as Translations)

function freqByFollowUp(followUp: FollowUpType | undefined): number {
  return followUp === 'semiannual' ? 2 : 1
}

/* -------------------- classificação de atividade física -------------------- */

type ActivityLevel = 'muito_ativo' | 'ativo' | 'irregularmente_ativo_a' | 'irregularmente_ativo_b' | 'sedentario'

function classifyActivityLevel(data: PatientData): ActivityLevel {
  const q = data.questionnaireData
  if (!q) return 'sedentario'

  const { walk_days, walk_minutes, mod_days, mod_minutes, vig_days, vig_minutes } = q

  // Verificar se há alguma atividade ≥10 min
  const hasAnyActivity = (walk_days > 0 && walk_minutes >= 10)
    || (mod_days > 0 && mod_minutes >= 10)
    || (vig_days > 0 && vig_minutes >= 10)

  if (!hasAnyActivity) return 'sedentario'

  // Muito Ativo
  const muitoAtivoVig = vig_days >= 5 && vig_minutes >= 30
  const muitoAtivoVigMod = vig_days >= 3 && vig_minutes >= 20 && mod_days >= 5 && mod_minutes >= 30

  if (muitoAtivoVig || muitoAtivoVigMod) return 'muito_ativo'

  // Ativo
  const ativoVig = vig_days >= 3 && vig_minutes >= 20
  const ativoMod = mod_days >= 5 && mod_minutes >= 30
  const ativoWalk = walk_days >= 5 && walk_minutes >= 30
  const totalDays = walk_days + mod_days + vig_days
  const totalMinutes = walk_minutes + mod_minutes + vig_minutes
  const ativoTotal = totalDays >= 5 && totalMinutes >= 150

  if (ativoVig || ativoMod || ativoWalk || ativoTotal) return 'ativo'

  // Irregularmente Ativo
  const irregularFreq = totalDays >= 5
  const irregularDuration = totalMinutes >= 150

  if (irregularFreq || irregularDuration) return 'irregularmente_ativo_a'

  return 'irregularmente_ativo_b'
}

type FoodLevel = 'alimentacao_saudavel' | 'alimentacao_ruim'

function classifyFoodLevel(data: PatientData): FoodLevel {
  const q = data.questionnaireData
  if (!q) return 'alimentacao_ruim'

  const { veg_portions, fruit_portions, ultra_processed } = q
  const totalFoodPortions = veg_portions + fruit_portions

  if (totalFoodPortions >= 5 && veg_portions > 0 && fruit_portions > 0 && ultra_processed <= 1) {
    return 'alimentacao_saudavel'
  } else {
    return 'alimentacao_ruim'
  }
}

type SmokingLevel = 'fumante'

function classifySmokingLevel(data: PatientData): SmokingLevel | null {
  const q = data.questionnaireData
  if (!q) return null

  const smoke = q.smoke_status
  if (smoke === 'fumante diario' || smoke === 'fumante ocasional') {
    return 'fumante'
  }
  return null
}

type AlcoholLevel = 'consumidor'

function classifyAlcoholLevel(data: PatientData): AlcoholLevel | null {
  const q = data.questionnaireData
  if (!q) return null

  const { alcohol_days_week, alcohol_drinks_day } = q
  if (alcohol_days_week >= 1 || alcohol_drinks_day >= 1) {
    return 'consumidor'
  }
  return null
}

type HypertensionLevel = 'controlada' | 'descompensada'

function classifyHypertensionLevel(data: PatientData): HypertensionLevel | null {
  if (!data.conditions.hypertension) return null

  const emergencyVisits = data.conditions.hypertensionEmergencyVisits
  const controlled = data.conditions.hypertensionControlled

  if (emergencyVisits === undefined || controlled === undefined) return null

  if (emergencyVisits === 'none' && controlled === 'yes') {
    return 'controlada'
  }

  if ((emergencyVisits === 'once' || emergencyVisits === 'twiceOrMore')
    || (controlled === 'no' || controlled === 'unknown')) {
    return 'descompensada'
  }

  return 'descompensada'
}

type DiabetesLevel = 'controlada' | 'descompensada'

function classifyDiabetesLevel(data: PatientData): DiabetesLevel | null {
  if (!data.conditions.diabetes) return null

  const controlled = data.conditions.diabetesControlled
  const emergencyVisits = data.conditions.diabetesEmergencyVisits

  if (controlled === undefined || emergencyVisits === undefined) return null

  if (controlled === 'yes' && emergencyVisits === 'none') {
    return 'controlada'
  }

  // Diabetes Descompensada: 10a - qualquer não, 10b - qualquer sim.
  if ((controlled === 'no' || controlled === 'unknown')
    || (emergencyVisits === 'once' || emergencyVisits === 'twiceOrMore')) {
    return 'descompensada'
  }

  // Se não se encaixa, assumir descompensada
  return 'descompensada'
}

type OverweightLevel = 'recomendacao'

function classifyOverweightLevel(data: PatientData): OverweightLevel | null {
  if (!data.conditions.overweight) return null

  const measures = data.conditions.overweightMeasures || []

  if (measures.includes('Nenhuma')) {
    return 'recomendacao'
  }

  return null
}

type LowerBackPainLevel = 'presenca'

function classifyLowerBackPainLevel(data: PatientData): LowerBackPainLevel | null {
  if (!data.conditions.lowerBackPain) return null

  const medication = data.conditions.lowerBackPainMedication
  const imagingExams = data.conditions.lowerBackPainImagingExams || {}
  const emergencyVisits = data.conditions.lowerBackPainEmergencyVisits

  const hasMedication = medication === 'daily' || medication === 'occasional'
  const hasImaging = !imagingExams.none && Object.keys(imagingExams).some((key) => key !== 'none' && (imagingExams[key] as number) > 0)
  const hasEmergency = emergencyVisits === 'once' || emergencyVisits === 'twiceOrMore'

  if (hasMedication && hasImaging && hasEmergency) {
    return 'presenca'
  }

  return null
}

function getActivityRecommendation(level: ActivityLevel, lang: PdfPayload['language']): PdfSuggestion {
  const recommendations: Record<ActivityLevel, { title: string, description: string }> = {
    muito_ativo: {
      title: i18nGet(lang, 'healthRecommendations.activity.muito_ativo.title') || 'Parabéns pela sua atividade física!',
      description: i18nGet(lang, 'healthRecommendations.activity.muito_ativo.description') || 'Parabéns! Você está no caminho certo: suas atividades físicas seguem o padrão ideal da OMS. Continue assim para uma vida longa e saudável! '
    },
    ativo: {
      title: i18nGet(lang, 'healthRecommendations.activity.ativo.title') || 'Parabéns pela sua atividade física!',
      description: i18nGet(lang, 'healthRecommendations.activity.ativo.description') || 'Parabéns! Você está no caminho certo: suas atividades físicas seguem o padrão ideal da OMS. Continue assim para uma vida longa e saudável! '
    },
    irregularmente_ativo_a: {
      title: i18nGet(lang, 'healthRecommendations.activity.irregularmente_ativo_a.title') || 'Aumente sua atividade física',
      description: i18nGet(lang, 'healthRecommendations.activity.irregularmente_ativo_a.description') || 'Aumente seus exercícios na maioria dos dias. Você pode dividir em blocos ou fazer de uma vez, como preferir! Para mais benefícios, mantenha a regularidade e aumente o tempo progressivamente. Cada minuto conta!'
    },
    irregularmente_ativo_b: {
      title: i18nGet(lang, 'healthRecommendations.activity.irregularmente_ativo_b.title') || 'Inicie atividades físicas',
      description: i18nGet(lang, 'healthRecommendations.activity.irregularmente_ativo_b.description') || 'Aumente seus exercícios na maioria dos dias. Você pode dividir em blocos ou fazer de uma vez, como preferir! Para mais benefícios, mantenha a regularidade e aumente o tempo progressivamente. Cada minuto conta!'
    },
    sedentario: {
      title: i18nGet(lang, 'healthRecommendations.activity.sedentario.title') || 'Inicie atividades físicas',
      description: i18nGet(lang, 'healthRecommendations.activity.sedentario.description') || 'Se preferir exercícios moderados, pratique no mínimo 150 minutos por semana. Neles, você conversa com dificuldade, mas não canta, e a respiração/batimentos aumentam moderadamente. Já nas atividades vigorosas, o mínimo é de 75 minutos semanais; aqui, você não consegue conversar e a respiração/coração aceleram muito. Você pode combinar ambas as intensidades para bater a meta semanal. Além disso, não esqueça de incluir exercícios de fortalecimento dos músculos e ossos (como musculação ou peso do corpo) em pelo menos 2 dias da sua rotina. '
    }
  }

  const rec = recommendations[level]
  return {
    title: rec.title,
    description: rec.description,
    priority: level === 'muito_ativo' || level === 'ativo' ? 1 : 2
  }
}

function getNutritionRecommendation(level: FoodLevel, lang: PdfPayload['language']): PdfSuggestion {
  const recommendations: Record<FoodLevel, { title: string, description: string }> = {
    alimentacao_saudavel: {
      title: i18nGet(lang, 'healthRecommendations.nutrition.saudavel.title') || 'Alimentação saudável',
      description: i18nGet(lang, 'healthRecommendations.nutrition.saudavel.description') || 'Parabéns! Você está no caminho certo: suas atividades físicas seguem o padrão ideal da OMS. Continue assim para uma vida longa e saudável!'
    },
    alimentacao_ruim: {
      title: i18nGet(lang, 'healthRecommendations.nutrition.ruim.title') || 'Alimentação inadequada',
      description: i18nGet(lang, 'healthRecommendations.nutrition.ruim.description') || 'Priorize na sua dieta: frutas, verduras, leguminosas (como feijões/lentilhas), nozes e grãos integrais (como aveia e arroz integral). Consuma no mínimo 400 g (cinco porções) de frutas e vegetais por dia (exclua raízes ricas em amido, como batatas e mandioca). Evite ao máximo os ultraprocessados! O Guia Alimentar Brasileiro desaconselha esses produtos industriais, que são ricos em açúcar, gordura, sal/calorias e pobres em nutrientes (ex: refrigerantes, salgadinhos e macarrão instantâneo).'
    }
  }

  const rec = recommendations[level]
  return {
    title: rec.title,
    description: rec.description,
    priority: level === 'alimentacao_saudavel' ? 1 : 2
  }
}

function getSmokingRecommendation(level: SmokingLevel, lang: PdfPayload['language']): PdfSuggestion {
  const recommendations: Record<SmokingLevel, { title: string, description: string }> = {
    fumante: {
      title: i18nGet(lang, 'healthRecommendations.smoking.fumante.title') || 'Presença de tabagismo',
      description: i18nGet(lang, 'healthRecommendations.smoking.fumante.description') || 'É importantíssimo que você deixe de fumar, pois não existe tabagismo seguro. Reconhecemos que é uma luta difícil; procure ajuda médica e explore medicações que podem auxiliar nessa caminhada. O fumo é fator causal de aproximadamente 50 doenças fatais e incapacitantes. A OMS (Organização Mundial da Saúde) estima que ele é responsável por 71% das mortes por câncer de pulmão, 42% das doenças respiratórias crônicas e 10% das cardiovasculares, além de ser risco para doenças como tuberculose.'
    }
  }

  const rec = recommendations[level]
  return {
    title: rec.title,
    description: rec.description,
    priority: 2
  }
}

function getAlcoholRecommendation(level: AlcoholLevel, lang: PdfPayload['language']): PdfSuggestion {
  const recommendations: Record<AlcoholLevel, { title: string, description: string }> = {
    consumidor: {
      title: i18nGet(lang, 'healthRecommendations.alcohol.consumidor.title') || 'Consumidores de álcool etílico',
      description: i18nGet(lang, 'healthRecommendations.alcohol.consumidor.description') || 'Atenção: Nenhum nível de consumo de álcool é seguro para a saúde. Os riscos e malefícios têm sido sistematicamente avaliados e estão bem documentados. A Organização Mundial da Saúde (OMS) declarou, inclusive na revista The Lancet Public Health, que não existe quantidade segura de álcool que não afete nossa saúde.'
    }
  }

  const rec = recommendations[level]
  return {
    title: rec.title,
    description: rec.description,
    priority: 2
  }
}

function getHypertensionRecommendation(level: HypertensionLevel, lang: PdfPayload['language']): PdfSuggestion {
  const recommendations: Record<HypertensionLevel, { title: string, description: string }> = {
    controlada: {
      title: i18nGet(lang, 'healthRecommendations.hypertension.controlada.title') || 'Hipertensão controlada',
      description: i18nGet(lang, 'healthRecommendations.hypertension.controlada.description') || 'Parabéns! Mantenha o bom controle da sua pressão, seguindo o acompanhamento profissional e medindo-a com frequência. Lembre-se: o tratamento da pressão alta exige mudança de comportamento, e não apenas medicação e consultas. É crucial seguir estas recomendações: Mantenha o peso com hábitos alimentares adequados. Reduza o sal, usando outros temperos no lugar. Pratique atividade física regularmente. Aproveite momentos de lazer. Abandone o fumo. Modere o consumo de álcool. Evite alimentos gordurosos. Controle o diabetes (se for o caso).'
    },
    descompensada: {
      title: i18nGet(lang, 'healthRecommendations.hypertension.descompensada.title') || 'Hipertensão descompensada',
      description: i18nGet(lang, 'healthRecommendations.hypertension.descompensada.description') || 'Atenção: É crucial que você assuma a gestão da sua saúde! Busque coordenar seu cuidado com a assistência médica, use corretamente as medicações e tire todas as suas dúvidas sobre a doença e o tratamento. Lembre-se: para evitar complicações, a adesão a um estilo de vida saudável é fundamental. Se for difícil, procure ajuda profissional. Para um melhor controle da sua pressão, siga estas recomendações: Mantenha o peso com hábitos alimentares adequados.Reduza o sal, usando outros temperos no lugar.Pratique atividade física regularmente.Aproveite momentos de lazer. Abandone o fumo. Modere o consumo de álcool. Evite alimentos gordurosos. Controle o diabetes (se for o caso).'
    }
  }

  const rec = recommendations[level]
  return {
    title: rec.title,
    description: rec.description,
    priority: level === 'controlada' ? 1 : 2
  }
}

function getDiabetesRecommendation(level: DiabetesLevel, lang: PdfPayload['language']): PdfSuggestion {
  const recommendations: Record<DiabetesLevel, { title: string, description: string }> = {
    controlada: {
      title: i18nGet(lang, 'healthRecommendations.diabetes.controlada.title') || 'Diabetes controlada',
      description: i18nGet(lang, 'healthRecommendations.diabetes.controlada.description') || 'Parabéns! Mantenha o bom controle do seu diabetes. Siga o acompanhamento profissional, faça seus exames regularmente e nunca se esqueça: o tratamento exige mudança de comportamento, não se resume a remédios e consultas. Um estilo de vida saudável é fundamental!'
    },
    descompensada: {
      title: i18nGet(lang, 'healthRecommendations.diabetes.descompensada.title') || 'Diabetes descompensada',
      description: i18nGet(lang, 'healthRecommendations.diabetes.descompensada.description') || 'É urgente iniciar mudanças no estilo de vida! Glicemia alta pode levar a sérias complicações (coração, rins, olhos, nervos e artérias). Por estar ligada ao estilo de vida, é essencial adotar hábitos saudáveis, diminuir carboidratos e eliminar o açúcar da dieta. Mantenha o acompanhamento profissional na periodicidade indicada. Para melhor controle, siga estas recomendações: Mantenha o peso com hábitos alimentares adequados. Pratique atividade física regularmente. Aproveite momentos de lazer. Modere o consumo de álcool. Use as medicações conforme a prescrição médica.'
    }
  }

  const rec = recommendations[level]
  return {
    title: rec.title,
    description: rec.description,
    priority: level === 'controlada' ? 1 : 2
  }
}

function getOverweightRecommendation(level: OverweightLevel, lang: PdfPayload['language']): PdfSuggestion {
  const recommendations: Record<OverweightLevel, { title: string, description: string }> = {
    recomendacao: {
      title: i18nGet(lang, 'healthRecommendations.overweight.recomendacao.title') || 'Sobrepeso e obesidade',
      description: i18nGet(lang, 'healthRecommendations.overweight.recomendacao.description') || 'Os pilares para tratar o sobrepeso e a obesidade são: educação alimentar (foco no déficit calórico), atividade física rotineira e mudança de estilo de vida. O sucesso depende da motivação e da adoção de hábitos adequados de alimentação e exercícios (incluindo aeróbicos e resistidos). Lembre-se: pequenas perdas de peso (5 a 10%) já trazem uma melhora significativa nas patologias associadas.'
    }
  }

  const rec = recommendations[level]
  return {
    title: rec.title,
    description: rec.description,
    priority: 2
  }
}

function getLowerBackPainRecommendation(level: LowerBackPainLevel, lang: PdfPayload['language']): PdfSuggestion {
  const recommendations: Record<LowerBackPainLevel, { title: string, description: string }> = {
    presenca: {
      title: i18nGet(lang, 'healthRecommendations.lowerBackPain.presenca.title') || 'Lombalgia',
      description: i18nGet(lang, 'healthRecommendations.lowerBackPain.presenca.description') || 'Para prevenir a lombalgia, mantenha-se ativo, adote uma postura adequada e siga as recomendações ergonômicas no trabalho. Em caso de dor, procure atendimento médico e siga o tratamento prescrito. Mesmo com a medicação, estas medidas são cruciais para sua recuperação: Permaneça ativo e mantenha o peso ideal. Exercite-se: fortalece o corpo (flexibilidade, força) e a mente (melhora ansiedade e autoestima). Use bolsa térmica (se for o caso, sob orientação profissional). Faça aquecimento antes e relaxamento após a atividade física. Para mais detalhes sobre um estilo de vida ativo, consulte o Guia de Atividade Física para a População Brasileira.'
    }
  }

  const rec = recommendations[level]
  return {
    title: rec.title,
    description: rec.description,
    priority: 2
  }
}
function getNoChronicConditionsRecommendation(lang: PdfPayload['language']): PdfSuggestion {
  const recommendations: Record<string, { title: string, description: string }> = {
    br: {
      title: 'Prevenção e cuidado contínuo',
      description: 'Parabéns por manter sua saúde em dia! A ausência de doenças crônicas é um ótimo indicador. Continue investindo em um estilo de vida saudável, alimentação balanceada e atividades físicas regulares. Não se esqueça de realizar seus exames de rotina anualmente ou conforme orientação médica para prevenção.'
    },
    en: {
      title: 'Prevention and ongoing care',
      description: 'Congratulations on keeping your health on track! The absence of chronic diseases is a great indicator. Keep investing in a healthy lifestyle, balanced diet, and regular physical activities. Don\'t forget to perform your routine check-ups annually or as directed by your physician for prevention.'
    },
    es: {
      title: 'Prevención y cuidado continuo',
      description: '¡Felicitaciones por mantener su salud al día! La ausencia de enfermedades crónicas es un excelente indicador. Siga invirtiendo en un estilo de vida saludable, dieta equilibrada y actividad física regular. No olvide realizar sus exámenes de rutina anualmente o según la indicación médica para la prevención.'
    },
    cn: {
      title: '预防与持续护理',
      description: '祝贺您保持良好的健康状况！没有慢性疾病是一个很好的指标。请继续坚持健康的生活方式、均衡饮食和规律的体育锻炼。别忘了每年或按照医生的建议进行常规体检以预防疾病。'
    }
  }

  const rec = recommendations[lang] || recommendations.br
  return {
    title: rec.title,
    description: rec.description,
    priority: 1
  }
}

export type SuggestionKey =
  | 'annual_ophthalmology'
  | 'check_glucose'
  | 'correct_followup'
  | 'exam_method_suitability'
  | 'foot_care'
  | 'healthy_lifestyle'
  | 'increase_followup'
  | 'med_adherence'
  | 'prefer_poc'
  | 'prefer_telemedicine'
  | 'rotate_injection_sites'

export interface PdfI18nSuggestion {
  i18nKey: SuggestionKey
}

export interface PdfCustomSuggestion {
  title: string
  description?: string
  pretitle?: string
  reduction?: string
  priority?: number
  iconPath?: string
  subDescription?: string
}

export type PdfSuggestion = PdfI18nSuggestion | PdfCustomSuggestion

export interface PdfProductRow {
  name: string
  category: 'material' | 'service'
  quantity: number
  emissionFactor: number
  followUpType: FollowUpType
  examType: ExamType
}

export interface PdfPayload {
  language: 'br' | 'en' | 'es' | 'cn'

  productsGenerated: number
  hospitalizationEmissions: number
  chronicConditions: number

  totalEmissions: {
    total: number
    products: number
    transportation: number
  }

  examsComparison: {
    conventional: number
    pointOfCare: number
    reductionPercent: number
  }

  followUpImpact: {
    withFollowUp: number
    withoutFollowUp: number
    reductionPercent: number
  }

  products: {
    items: PdfProductRow[]
    followUpType: FollowUpType
    examType: ExamType
  }

  suggestions: PdfSuggestion[]

  treesEquivalent: number
  conditions: string[]
  transportation: { type: string | undefined, distanceKm: number }
}

function getDeepTranslation(obj: TranslationDict | string | undefined, path: string[]): string {
  if (!path.length) return typeof obj === 'string' ? obj : ''
  if (typeof obj !== 'object' || !obj) return ''
  return getDeepTranslation(obj[path[0]], path.slice(1))
}

function i18nGet(lang: PdfPayload['language'], key?: string): string {
  if (!key) return ''
  return getDeepTranslation(translations[lang] || translations.br, key.split('.'))
}

function normalizeSuggestionKey(raw?: string): SuggestionKey | undefined {
  if (!raw) return undefined
  let k = String(raw).trim()
  k = k.replace(/^suggestions?[./:_-]/i, '')
  k = k.replace(/[.\-/\s]+/g, '_')
  k = k.replace(/([a-z0-9])([A-Z])/g, '$1_$2')
  k = k.toLowerCase()

  const map: Record<string, SuggestionKey> = {
    prefer_poc: 'prefer_poc',
    poc: 'prefer_poc',
    use_poc: 'prefer_poc',
    prioritize_poc: 'prefer_poc',
    prefer_point_of_care: 'prefer_poc',
    point_of_care: 'prefer_poc',
    prefer_pointofcare: 'prefer_poc',

    increase_followup: 'increase_followup',
    increase_follow_up: 'increase_followup',
    more_followup: 'increase_followup',
    regular_followup: 'increase_followup',
    improve_followup: 'increase_followup',

    prefer_telemedicine: 'prefer_telemedicine',
    use_telemedicine: 'prefer_telemedicine',
    telemedicine: 'prefer_telemedicine',
    prefer_telemed: 'prefer_telemedicine',

    correct_followup: 'correct_followup',
    med_adherence: 'med_adherence',
    check_glucose: 'check_glucose',
    rotate_injection_sites: 'rotate_injection_sites',
    annual_ophthalmology: 'annual_ophthalmology',
    foot_care: 'foot_care',
    exam_method_suitability: 'exam_method_suitability',
    healthy_lifestyle: 'healthy_lifestyle'
  }
  return map[k]
}

function mapIncomingSuggestions(data: PatientData, lang: PdfPayload['language']): PdfSuggestion[] {
  const incoming = data.results?.suggestions ?? []

  return incoming.map((s) => {
    const norm = normalizeSuggestionKey(s.translationKey)
    if (norm) return { i18nKey: norm }

    const title =
      s.title
      || i18nGet(lang, s.titleKey)
      || i18nGet('br', s.titleKey)

    const description =
      s.description
      || i18nGet(lang, s.descriptionKey)
      || i18nGet('br', s.descriptionKey)

    const subDescription =
      s.subDescription
      || i18nGet(lang, s.subDescriptionKey)
      || i18nGet('br', s.subDescriptionKey)

    return {
      title: title || '',
      description: description || '',
      pretitle: s.pretitle || '',
      reduction: s.reduction || '',
      priority: s.priority,
      iconPath: s.iconPath,
      subDescription
    }
  })
}

function dedupSuggestions(arr: PdfSuggestion[]): PdfSuggestion[] {
  const seen = new Set<string>()

  return arr.filter((s) => {
    const key = 'i18nKey' in s
      ? `k:${s.i18nKey}`
      : `t:${s.title}|${s.description ?? ''}`

    if (seen.has(key)) return false

    seen.add(key)
    return true
  })
}

function mapTransportType(type: string | undefined): string {
  if (type === 'bus') return 'public'
  return type || 'public'
}

function buildRecommendations(data: PatientData, lang: PdfPayload['language']): PdfSuggestion[] {
  const hypertensionLevel = classifyHypertensionLevel(data)
  const diabetesLevel = classifyDiabetesLevel(data)
  const overweightLevel = classifyOverweightLevel(data)
  const lowerBackPainLevel = classifyLowerBackPainLevel(data)
  const smokingLevel = classifySmokingLevel(data)
  const alcoholLevel = classifyAlcoholLevel(data)

  return dedupSuggestions([
    ...mapIncomingSuggestions(data, lang),
    getActivityRecommendation(classifyActivityLevel(data), lang),
    getNutritionRecommendation(classifyFoodLevel(data), lang),
    ...(hypertensionLevel ? [getHypertensionRecommendation(hypertensionLevel, lang)] : []),
    ...(diabetesLevel ? [getDiabetesRecommendation(diabetesLevel, lang)] : []),
    ...(overweightLevel ? [getOverweightRecommendation(overweightLevel, lang)] : []),
    ...(lowerBackPainLevel ? [getLowerBackPainRecommendation(lowerBackPainLevel, lang)] : []),
    ...(data.conditions.noChronicConditions ? [getNoChronicConditionsRecommendation(lang)] : []),
    ...(smokingLevel ? [getSmokingRecommendation(smokingLevel, lang)] : []),
    ...(alcoholLevel ? [getAlcoholRecommendation(alcoholLevel, lang)] : [])
  ])
}

interface Product {
  name: string
  category: 'material' | 'service'
  quantity: number
  emissionFactor: number
}

function consolidateProducts(currentProducts: Product[]): Product[] {
  const consolidated = currentProducts.reduce<Record<string, Product>>((acc, product) => {
    const key = `${product.name}_${product.category}`

    if (acc[key]) {
      acc[key].quantity += product.quantity
      return acc
    }

    acc[key] = { ...product }
    return acc
  }, {})

  return Object.values(consolidated)
}

function calculateEmissions(products: Product[], multiplier = 1): number {
  return products.reduce((sum, p) => sum + p.emissionFactor * p.quantity * multiplier, 0)
}

function calcReductionPercent(oldVal: number, newVal: number): number {
  if (oldVal <= 0) return 0
  return Number((((oldVal - newVal) / oldVal) * 100).toFixed(2))
}

interface EmptyPayloadParams {
  lang: PdfPayload['language']
  selectedConditions: string[]
  suggestions: PdfSuggestion[]
  mappedTransportType: string
  distanceKm: number
  followUpType?: FollowUpType
  examType?: ExamType
}

function getEmptyPayload(params: EmptyPayloadParams): PdfPayload {
  return {
    language: params.lang,
    productsGenerated: 0,
    hospitalizationEmissions: 0,
    chronicConditions: params.selectedConditions.length,
    totalEmissions: { total: 0, products: 0, transportation: 0 },
    examsComparison: { conventional: 0, pointOfCare: 0, reductionPercent: 0 },
    followUpImpact: { withFollowUp: 0, withoutFollowUp: 0, reductionPercent: 0 },
    products: {
      items: [],
      followUpType: params.followUpType ?? 'none',
      examType: params.examType ?? 'conventional'
    },
    suggestions: params.suggestions,
    treesEquivalent: 0,
    conditions: params.selectedConditions,
    transportation: {
      type: params.mappedTransportType,
      distanceKm: params.distanceKm
    }
  }
}

export function buildPdfPayload(data: PatientData, language?: PdfPayload['language']): PdfPayload {
  const lang = language ?? data.language
  const followUp = data.followUp.type
  const examType = data.examData.type
  const all = data.examData.allProductsByFollowUp

  const validConditions = new Set(['lowerBackPain', 'hypertension', 'diabetes', 'overweight', 'noChronicConditions'])
  const selectedConditions = Object.entries(data.conditions)
    .filter(([k, v]) => Boolean(v) && validConditions.has(k))
    .map(([k]) => k)

  const suggestions = buildRecommendations(data, lang)
  const mappedTransportType = mapTransportType(data.transportation?.type)

  if (!followUp || !examType || !all) {
    return getEmptyPayload({
      lang,
      selectedConditions,
      suggestions,
      mappedTransportType,
      distanceKm: data.transportation?.distanceKm ?? 0,
      followUpType: followUp,
      examType
    })
  }

  const currentProducts = all[followUp][examType] as Product[]
  const freq = freqByFollowUp(followUp)

  // Emissões principais (produtos)
  const currentEmissions = calculateEmissions(currentProducts, freq)
  const withoutFollowUpEmissions = calculateEmissions(all.none[examType])

  const hospitalizationEmissions = Math.max(0, withoutFollowUpEmissions - currentEmissions)
  const treesEquivalent = Math.round((followUp === 'none' ? currentEmissions : hospitalizationEmissions) / 24)

  // Comparação por tipo de exame
  const conventionalEmissions = calculateEmissions(all[followUp].conventional, freq)
  const pointOfCareEmissions = calculateEmissions(all[followUp].pointOfCare, freq)

  const { type: trType, distanceKm = 0 } = data.transportation || {}
  let transportationEmissions = 0
  if (distanceKm > 0) {
    transportationEmissions = calculateTransportationEmissions(trType, distanceKm)
  }

  const conventionalTotalForChart = conventionalEmissions + transportationEmissions
  const pointOfCareTotalForChart = pointOfCareEmissions + transportationEmissions

  // Reduções
  const reductionPercent = Math.round(calcReductionPercent(conventionalEmissions, pointOfCareEmissions))
  const followUpReductionPercent = calcReductionPercent(withoutFollowUpEmissions, currentEmissions)

  // Consolidar produtos por nome+categoria (para tabela do PDF)
  const consolidatedItems = consolidateProducts(currentProducts)
  consolidatedItems.sort((a, b) => b.quantity - a.quantity)

  return {
    language: lang,

    // Métricas
    productsGenerated: currentProducts.length * freq,
    hospitalizationEmissions,
    chronicConditions: selectedConditions.length,

    // Emissões
    totalEmissions: {
      total: currentEmissions + transportationEmissions,
      products: currentEmissions,
      transportation: transportationEmissions
    },

    // Comparações
    examsComparison: {
      conventional: conventionalTotalForChart,
      pointOfCare: pointOfCareTotalForChart,
      reductionPercent
    },
    followUpImpact: {
      withFollowUp: currentEmissions + transportationEmissions,
      withoutFollowUp: withoutFollowUpEmissions,
      reductionPercent: followUpReductionPercent
    },

    // Produtos - MANTER CHAVES ORIGINAIS (tradução acontece no PDF)
    products: {
      items: consolidatedItems.map((p) => ({
        name: p.name,
        category: p.category,
        quantity: p.quantity,
        emissionFactor: p.emissionFactor,
        followUpType: followUp,
        examType
      })),
      followUpType: followUp,
      examType
    },

    // Recomendações (APENAS as que vieram do front)
    suggestions,

    // Auxiliares
    treesEquivalent,
    conditions: selectedConditions,
    transportation: {
      type: mappedTransportType,
      distanceKm: data.transportation?.distanceKm ?? 0
    }
  }
}
