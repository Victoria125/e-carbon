import type { PdfPayload } from '@/utils/buildPdfPayload.ts'
import { Document, Font, Image, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

import TRANSLATIONS from '@/shared/assets/translations.js'
import { LOGO_BASE64 } from '@/utils/logoBase64.js'

// === CONFIGURAÇÃO DE FONTES ===
// Registrar fontes que suportam chinês
Font.register({
  family: 'NotoSansSC',
  src: 'https://fonts.gstatic.com/ea/notosanssc/v1/NotoSansSC-Regular.otf'
})

Font.register({
  family: 'NotoSansSC-Bold',
  src: 'https://fonts.gstatic.com/ea/notosanssc/v1/NotoSansSC-Bold.otf',
  fontWeight: 'bold'
})

// Fonte fallback para outras línguas
Font.register({
  family: 'Helvetica-Unicode',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf'
})

// === CONSTANTES E CONFIGURAÇÕES ===
const BRAND_BLUE = '#072244'
const BRAND_GREEN = '#52AE32'
const BRAND_GREEN_ALT = '#22C55E'
const LOGO_URL = LOGO_BASE64

const LOCALE = { br: 'pt-BR', en: 'en-US', es: 'es-ES', cn: 'zh-CN' } as const

// === TRADUÇÕES ===
const CONDITION_LABELS = {
  br: {
    lowerBackPain: 'Dor lombar',
    overweight: 'Sobrepeso',
    diabetes: 'Diabetes',
    hypertension: 'Hipertensão',
    noChronicConditions: 'Sem diagnóstico'
  },
  en: {
    lowerBackPain: 'Lower back pain',
    overweight: 'Overweight',
    diabetes: 'Diabetes',
    hypertension: 'Hypertension',
    noChronicConditions: 'No chronic conditions'
  },
  es: {
    lowerBackPain: 'Dolor lumbar',
    overweight: 'Sobrepeso',
    diabetes: 'Diabetes',
    hypertension: 'Hipertensión',
    noChronicConditions: 'Ningún diagnóstico'
  },
  cn: {
    lowerBackPain: '下背痛',
    overweight: '超重',
    diabetes: '糖尿病',
    hypertension: '高血压',
    noChronicConditions: '无慢性病'
  }
} as const

const PDF_TEXTS = {
  br: {
    reportTitle: 'Relatório da Simulação de Pegada de Carbono',
    summary: 'Resumo',
    conditions: 'Condições Crônicas',
    productsGenerated: 'Produtos Gerados',
    followUp: 'Acompanhamento',
    examType: 'Tipo de Exame',
    transport: 'Transporte',
    emissions: 'Emissões (kg CO₂e)',
    current: 'Com Acompanhamento',
    withFollowUp: 'Emissões Totais',
    conventional: 'Convencional',
    pointOfCare: 'Point of Care',
    withoutFU: 'Sem acompanhamento',
    avoidableHosp: 'Emissões Evitáveis por Internação',
    treesEq: 'Equivalente em árvores',
    productsTitle: 'Produtos/Serviços do Cenário Atual',
    name: 'Nome',
    category: 'Categoria',
    quantity: 'Quantidade',
    factor: 'Fator (kg)',
    total: 'Total (kg)',
    suggestions: 'Recomendações para seu Plano de Cuidados',
    anamnesis: 'Anamnese',
    km: 'km',
    dash: '—',
    transportTypes: {
      walking: 'Caminhada',
      motorcycle: 'Motocicleta',
      car: 'Carro',
      public: 'Transporte Público'
    },
    referencesText: 'Para mais informações e referências técnicas:',
    referencesButton: 'Acessar Documentação Técnica'
  },
  en: {
    reportTitle: 'Carbon Footprint Simulation Report',
    summary: 'Summary',
    conditions: 'Conditions',
    productsGenerated: 'Products Generated',
    followUp: 'Follow-up',
    examType: 'Exam Type',
    transport: 'Transport',
    emissions: 'Emissions (kg CO₂e)',
    current: 'Current scenario',
    withFollowUp: 'Total emissions',
    conventional: 'Conventional',
    pointOfCare: 'Point of Care',
    alternative: 'Alternative scenario',
    withoutFU: 'No follow-up',
    avoidableHosp: 'Avoidable hospitalizations',
    treesEq: 'Equivalent trees',
    productsTitle: 'Products/Services of Current Scenario',
    name: 'Name',
    category: 'Category',
    quantity: 'Quantity',
    factor: 'Factor (kg)',
    total: 'Total (kg)',
    suggestions: 'Recommendations for your Care Plan',
    anamnesis: 'Anamnesis',
    km: 'km',
    dash: '—',
    transportTypes: {
      walking: 'Walking',
      motorcycle: 'Motorcycle',
      car: 'Car',
      public: 'Public Transport'
    },
    referencesText: 'For more information and technical references:',
    referencesButton: 'Access Technical Documentation'
  },
  es: {
    reportTitle: 'Informe de Simulación de Huella de Carbono',
    summary: 'Resumen',
    conditions: 'Condiciones',
    productsGenerated: 'Productos Generados',
    followUp: 'Seguimiento',
    examType: 'Tipo de Examen',
    transport: 'Transporte',
    emissions: 'Emisiones (kg CO₂e)',
    current: 'Escenario actual',
    withFollowUp: 'Totales emisiones',
    conventional: 'Convencional',
    pointOfCare: 'Point of Care',
    alternative: 'Escenario alternativo',
    withoutFU: 'Sin seguimiento',
    avoidableHosp: 'Ev. por hospitalizaciones',
    treesEq: 'Árboles equivalentes',
    productsTitle: 'Productos/Servicios del Escenario Actual',
    name: 'Nombre',
    category: 'Categoría',
    quantity: 'Cantidade',
    factor: 'Factor (kg)',
    total: 'Total (kg)',
    suggestions: 'Recomendaciones para su plan de cuidados',
    anamnesis: 'Anamnesis',
    km: 'km',
    dash: '—',
    transportTypes: {
      walking: 'Caminata',
      motorcycle: 'Motocicleta',
      car: 'Coche',
      public: 'Transporte Público'
    },
    referencesText: 'Para más información y referencias técnicas:',
    referencesButton: 'Acceder a Documentación Técnica'
  },
  cn: {
    reportTitle: '碳足迹模拟报告',
    summary: '摘要',
    conditions: '疾病/情况',
    productsGenerated: '生成的产品',
    followUp: '随访',
    examType: '检查类型',
    transport: '交通',
    emissions: '排放（kg CO₂e）',
    current: '当前情景',
    withFollowUp: '总排放',
    conventional: '常规',
    pointOfCare: '即时检测',
    alternative: '替代情景',
    withoutFU: '无随访',
    avoidableHosp: '可避免的住院',
    treesEq: '等效树木',
    productsTitle: '当前情景的产品/服务',
    name: '名称',
    category: '类别',
    quantity: '数量',
    factor: '系数（kg）',
    total: '合计（kg）',
    suggestions: '护理计划建议',
    anamnesis: '问诊记录',
    km: '公里',
    dash: '—',
    transportTypes: {
      walking: '步行',
      motorcycle: '摩托车',
      car: '汽车',
      public: '公共交通'
    },
    referencesText: '更多信息和技术参考：',
    referencesButton: '访问技术文档'
  }
} as const

const SUGGESTION_TEXTS = {
  br: {
    prefer_poc: { title: 'Priorize Point of Care (POC)', description: 'Reduz deslocamentos, resíduos e emissões do processo.' },
    increase_followup: { title: 'Aumente o acompanhamento regular', description: 'Consultas e exames periódicos evitam internações.' },
    prefer_telemedicine: { title: 'Use telemedicina quando possível', description: 'Diminui deslocamentos e emissões associadas.' },
    correct_followup: { title: 'Acompanhamento correto para paciente compensado', description: 'Manter consultas e exames regulares conforme orientação.' },
    med_adherence: { title: 'Siga a prescrição do medicamento', description: 'Uso correto melhora controle e reduz complicações.' },
    check_glucose: { title: 'Meça sua glicemia ao menos duas vezes ao dia', description: 'Ajuda a manter a glicemia dentro das metas.' },
    rotate_injection_sites: { title: 'Alterne o local de aplicação da insulina', description: 'Previne lipodistrofia e melhora absorção.' },
    annual_ophthalmology: { title: 'Consulta anual com oftalmologista', description: 'Rastreamento e prevenção de retinopatia diabética.' },
    foot_care: { title: 'Cuidados com os pés (higiene e hidratação)', description: 'Previne lesões e infecções.' },
    exam_method_suitability: { title: 'Escolha do método de exame mais adequado', description: 'Priorize métodos que reduzam deslocamentos e resíduos quando possível.' },
    healthy_lifestyle: { title: 'Alimentação saudável e atividade física', description: 'Hábitos que auxiliam no controle metabólico.' }
  },
  en: {
    prefer_poc: { title: 'Prioritize Point of Care (POC)', description: 'Reduces travel, waste, and process emissions.' },
    increase_followup: { title: 'Increase regular follow-up', description: 'Regular visits and tests help avoid hospitalizations.' },
    prefer_telemedicine: { title: 'Use telemedicine when possible', description: 'Lowers travel needs and related emissions.' },
    correct_followup: { title: 'Maintain proper regular follow-up', description: 'Keep visits and tests as recommended.' },
    med_adherence: { title: 'Follow medication as prescribed', description: 'Proper use improves control and reduces complications.' },
    check_glucose: { title: 'Check your blood glucose at least twice a day', description: 'Helps keep glucose within targets.' },
    rotate_injection_sites: { title: 'Rotate insulin injection sites', description: 'Prevents lipodystrophy and improves absorption.' },
    annual_ophthalmology: { title: 'Annual ophthalmology check', description: 'Screening and prevention of diabetic retinopathy.' },
    foot_care: { title: 'Foot care (hygiene and hydration)', description: 'Prevents lesions and infections.' },
    exam_method_suitability: { title: 'Choose the most appropriate exam method', description: 'Prefer methods that reduce travel and waste when possible.' },
    healthy_lifestyle: { title: 'Healthy diet and physical activity', description: 'Habits that support metabolic control.' }
  },
  es: {
    prefer_poc: { title: 'Priorice Point of Care (POC)', description: 'Reduce desplazamientos, residuos y emisiones.' },
    increase_followup: { title: 'Aumente el seguimiento regular', description: 'Controles y exámenes periódicos evitan hospitalizaciones.' },
    prefer_telemedicine: { title: 'Use la telemedicina cuando sea posible', description: 'Disminuye desplazamientos y emisiones asociadas.' },
    correct_followup: { title: 'Seguimiento regular adecuado', description: 'Mantenga consultas y exámenes según indicación.' },
    med_adherence: { title: 'Siga la medicación según prescripción', description: 'El uso correcto mejora el control y reduce complicaciones.' },
    check_glucose: { title: 'Controle su glucosa al menos dos veces al día', description: 'Ayuda a mantener las metas glucémicas.' },
    rotate_injection_sites: { title: 'Rote los sitios de inyección de insulina', description: 'Previene lipodistrofia y mejora la absorción.' },
    annual_ophthalmology: { title: 'Control anual con oftalmólogo', description: 'Pesquisa y prevención de retinopatía diabética.' },
    foot_care: { title: 'Cuidado de los pies (higiene e hidratación)', description: 'Previene lesiones e infecciones.' },
    exam_method_suitability: { title: 'Elegir el método de examen más adecuado', description: 'Prefiera métodos que reduzcan desplazamientos y residuos.' },
    healthy_lifestyle: { title: 'Alimentación saludable y actividad física', description: 'Hábitos que apoyan el control metabólico.' }
  },
  cn: {
    prefer_poc: { title: '优先选择即时检测 (POC)', description: '减少出行、废弃物和流程排放。' },
    increase_followup: { title: '增加规律随访', description: '定期就诊与检查可减少住院。' },
    prefer_telemedicine: { title: '尽可能采用远程医疗', description: '减少出行及相关排放。' },
    correct_followup: { title: '保持规范的定期随访', description: '按医嘱进行复诊与检查。' },
    med_adherence: { title: '按处方规律用药', description: '规范用药有助于控制并减少并发症。' },
    check_glucose: { title: '每日至少监测两次血糖', description: '有助于维持目标范围。' },
    rotate_injection_sites: { title: '轮换胰岛素注射部位', description: '预防脂肪营养不良并改善吸收。' },
    annual_ophthalmology: { title: '每年眼科检查', description: '筛查并预防糖网病。' },
    foot_care: { title: '足部护理（清洁与保湿）', description: '预防损伤与感染。' },
    exam_method_suitability: { title: '选择更合适的检查方式', description: '尽量选择可减少出行与废弃物的方法。' },
    healthy_lifestyle: { title: '健康饮食与运动', description: '有助于代谢控制。' }
  }
} as const

// === ESTILOS BASE ===
const baseStyles = StyleSheet.create({
  page: {
    padding: 28,
    paddingTop: 30,
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: BRAND_BLUE
  },
  header: {
    left: 0,
    right: 0,
    top: 0,
    height: 84,
    paddingHorizontal: 28,
    paddingVertical: 12,
    backgroundColor: BRAND_BLUE,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: { width: 700, height: 125, objectFit: 'contain' },
  h1: { fontSize: 18, marginBottom: 14, color: BRAND_GREEN, marginTop: 8 },
  h2: { fontSize: 14, marginTop: 12, marginBottom: 14, color: BRAND_GREEN },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  small: { fontSize: 10, color: '#C6D5F4' },
  tableHead: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    paddingBottom: 4,
    marginTop: 6
  },
  th: { fontSize: 10, flexGrow: 1, color: '#FFFFFF' },
  tr: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 3
  },
  td: { fontSize: 10, flexGrow: 1, color: '#FFFFFF' },
  sugItem: { marginBottom: 14, paddingLeft: 8 },
  sugTitleRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  sugTitleText: { fontSize: 12, color: BRAND_GREEN, fontWeight: 'bold', flex: 1, marginBottom: 2 },
  sugText: { fontSize: 12, color: '#FFFFFF', marginBottom: 2, marginLeft: 11 },
  sugSub: { fontSize: 12, color: BRAND_GREEN_ALT, marginLeft: 11, paddingRight: 8, borderLeftWidth: 2, borderLeftColor: `${BRAND_GREEN_ALT}80`, paddingLeft: 6 },
  referencesSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)'
  },
  referencesText: { fontSize: 10, color: '#C6D5F4', textAlign: 'center', marginBottom: 8 },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 4
  },
  button: {
    backgroundColor: BRAND_GREEN,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: BRAND_GREEN_ALT
  },
  buttonText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

const followUpStyles = StyleSheet.create({
  badge: { backgroundColor: '#EEE', borderRadius: 4, padding: '2 4', fontSize: 9 },
  badgeText: { color: '#06283D', fontWeight: 'bold' },
  followUpCell: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' },
  semiannual: { backgroundColor: '#D1FAE5', color: '#065F46' },
  annual: { backgroundColor: '#E0F2FE', color: '#075985' },
  none: { backgroundColor: '#FEE2E2', color: '#991B1B' },
  multiplier: { marginLeft: 2, opacity: 0.7 }
})

// === TIPOS ===
type LangKey = keyof typeof CONDITION_LABELS

interface Product {
  name: string
  category: string
  quantity: number
  followUpType?: 'semiannual' | 'annual' | 'none'
  emissionFactor: number
}

interface Suggestion {
  i18nKey?: string
  translationKey?: string
  title?: string
  description?: string
  subDescription?: string
  priority?: number
}

// === FUNÇÕES AUXILIARES ===
function translateConditions(lang: LangKey, keys: string[]): string[] {
  const dict = CONDITION_LABELS[lang] ?? CONDITION_LABELS.br
  return keys.map((k) => dict[k as keyof typeof dict] ?? k)
}

function translateProductName(name: string, lang: LangKey): string {
  // Usar TRANSLATIONS importado do arquivo compartilhado
  const translations = TRANSLATIONS as Record<string, Record<string, unknown>>
  const products = translations[lang]?.products as Record<string, string> || translations.br.products as Record<string, string>
  return products?.[name] || name
}

function consolidateProducts<T extends { name: string, category: string, quantity: number, emissionFactor: number }>(products: T[]): T[] {
  const consolidated: Record<string, T> = {}

  for (const product of products) {
    const key = `${product.name}_${product.category}`
    if (consolidated[key]) {
      consolidated[key] = {
        ...consolidated[key],
        quantity: consolidated[key].quantity + product.quantity
      }
    } else {
      consolidated[key] = { ...product }
    }
  }

  return Object.values(consolidated).sort((a, b) => {
    const totalEmissionsA = a.quantity * a.emissionFactor
    const totalEmissionsB = b.quantity * b.emissionFactor
    return totalEmissionsB - totalEmissionsA
  })
}

function formatEmissions(kgValue: number): string {
  return kgValue < 1 ? `${(kgValue * 1000).toFixed(1)} g CO₂e` : `${kgValue.toFixed(1)} kg CO₂e`
}

function getEmissionBreakdown(kgValue: number) {
  return kgValue < 1
    ? { value: (kgValue * 1000).toFixed(1), unit: 'g CO₂e' }
    : { value: kgValue.toFixed(1), unit: 'kg CO₂e' }
}

// === COMPONENTE PRINCIPAL ===
export function ResultsPdf({ payload }: Readonly<{ payload: PdfPayload }>) {
  const lang: LangKey = payload.language ?? 'br'
  const L = PDF_TEXTS[lang] || PDF_TEXTS.br
  const nf = new Intl.NumberFormat(LOCALE[lang], { maximumFractionDigits: 2 })
  const c = (n: number) => nf.format(n)

  // Definir fonte baseada no idioma
  const fontFamily = lang === 'cn' ? 'NotoSansSC' : 'Helvetica'

  // Criar estilos dinâmicos com a fonte correta - VERSÃO LIMPA
  const styles = {
    ...baseStyles,
    page: {
      ...baseStyles.page,
      fontFamily
    },
    h1: {
      ...baseStyles.h1,
      fontFamily
    },
    h2: {
      ...baseStyles.h2,
      fontFamily
    },
    row: {
      ...baseStyles.row,
      fontFamily
    },
    th: {
      ...baseStyles.th,
      fontFamily
    },
    td: {
      ...baseStyles.td,
      fontFamily
    },
    sugTitleText: {
      ...baseStyles.sugTitleText,
      fontFamily
    },
    sugText: {
      ...baseStyles.sugText,
      fontFamily
    },
    sugSub: {
      ...baseStyles.sugSub,
      fontFamily
    },
    referencesText: {
      ...baseStyles.referencesText,
      fontFamily
    },
    buttonText: {
      ...baseStyles.buttonText,
      fontFamily
    }
  }

  const sortedSuggestions = [...(payload.suggestions ?? [])].sort((a: Suggestion, b: Suggestion) => {
    const pa = a?.priority ?? 99
    const pb = b?.priority ?? 99
    return pa - pb
  })

  // Lógica SIMPLES: só quebra página se tiver MUITAS sugestões
  const hasSuggestions = !!sortedSuggestions.length
  const hasManySuggestions = sortedSuggestions.length > 12

  const renderProductRow = (p: Product) => {
    const multiplier = p.followUpType === 'semiannual' ? 2 : 1
    const quantity = p.quantity * multiplier
    const total = p.emissionFactor * quantity

    const emissionFactor = getEmissionBreakdown(p.emissionFactor)
    const totalEmissions = getEmissionBreakdown(total)

    const getBadgeStyle = () => {
      switch (p.followUpType) {
        case 'semiannual': return followUpStyles.semiannual
        case 'annual': return followUpStyles.annual
        default: return followUpStyles.none
      }
    }

    // TRADUZIR TEXTO DO FOLLOW-UP
    const getBadgeText = () => {
      const followUpTranslations = {
        br: { semiannual: 'Semestral x2', annual: 'Anual', none: 'Nenhum' },
        en: { semiannual: 'Semiannual x2', annual: 'Annual', none: 'None' },
        es: { semiannual: 'Semestral x2', annual: 'Anual', none: 'Ninguno' },
        cn: { semiannual: '半年 x2', annual: '年度', none: '无' }
      }

      const dict = followUpTranslations[lang] ?? followUpTranslations.en
      return dict[p.followUpType || 'none']
    }

    // TRADUZIR CATEGORIA
    const getCategoryText = () => {
      const categoryTranslations = {
        br: { material: 'Material', service: 'Serviço' },
        en: { material: 'Material', service: 'Service' },
        es: { material: 'Material', service: 'Servicio' },
        cn: { material: '材料', service: '服务' }
      }

      const dict = categoryTranslations[lang] ?? categoryTranslations.en
      return dict[p.category as keyof typeof dict] ?? p.category
    }

    return (
      <View key={`${p.name}_${p.category}`} style={styles.tr}>
        <Text style={[styles.td, { flexBasis: '20%' }]}>{translateProductName(p.name, lang)}</Text>
        <Text style={[styles.td, { flexBasis: '15%', textAlign: 'center' }]}>
          {getCategoryText()}
        </Text>
        <Text style={[styles.td, { flexBasis: '15%', textAlign: 'center' }]}>
          {(() => {
            const quantityText = c(p.quantity)
            if (p.category !== 'material') return quantityText
            const unit = lang === 'cn' ? ' 个' : ' und'
            return `${quantityText}${unit}`
          })()}
        </Text>

        <View style={[styles.td, { flexBasis: '20%', alignItems: 'center' }]}>
          <View style={[followUpStyles.badge, getBadgeStyle()]}>
            <Text style={followUpStyles.badgeText}>{getBadgeText()}</Text>
            {' '}
            {/* ← USAR FOLLOW-UP TRADUZIDO */}
          </View>
        </View>

        <Text style={[styles.td, { flexBasis: '13%', textAlign: 'center' }]}>
          {`${emissionFactor.value} ${emissionFactor.unit}`}
        </Text>
        <Text style={[styles.td, { flexBasis: '12%', textAlign: 'center' }]}>
          {`${totalEmissions.value} ${totalEmissions.unit}`}
        </Text>
      </View>
    )
  }

  const renderSuggestion = (s: Suggestion) => {
    const dict = SUGGESTION_TEXTS[lang] as Record<string, { title: string, description?: string }>
    const key = s?.i18nKey ?? s?.translationKey

    // Filtro específico para telemedicina
    if (key === 'prefer_telemedicine' && payload.products.followUpType === 'none') {
      return null
    }

    const translated = key && dict?.[key] ? dict[key] : undefined
    const title = translated?.title ?? s?.title ?? L.dash
    const description = translated?.description ?? s?.description ?? ''
    const sub = s?.subDescription ?? ''

    return (
      <View key={`suggestion-${key || title}`} style={styles.sugItem}>
        <View style={styles.sugTitleRow}>
          <Text style={styles.sugTitleText}>{`• ${title}`}</Text>
        </View>
        {!!description && <Text style={[styles.sugText, { marginBottom: 2 }]}>{description}</Text>}
        {!!sub && (
          <Text style={[styles.sugSub, { borderLeft: 2, borderColor: `${BRAND_GREEN_ALT}80`, paddingLeft: 6 }]}>
            {sub}
          </Text>
        )}
      </View>
    )
  }

  const renderReferences = () => (
    <View style={styles.referencesSection}>
      <Text style={styles.referencesText}>
        {L.referencesText}
      </Text>
      <View style={styles.buttonContainer}>
        <Link
          src="https://drive.google.com/file/d/1LJnmUfpor77nCRfwuU3lNMhodx3JTgms/view?usp=sharing"
          style={styles.button}>
          <Text style={styles.buttonText}>{L.referencesButton}</Text>
        </Link>
      </View>
    </View>
  )

  return (
    <Document>
      {/* PRIMEIRA PÁGINA - SEMPRE com logo */}
      <Page size="A4" style={styles.page}>
        {/* Header APENAS na primeira página */}
        <View style={styles.header}>
          <Image style={styles.logo} src={LOGO_URL} cache={false} />
        </View>

        {/* Título e resumo */}
        <Text style={styles.h1}>{L.reportTitle}</Text>
        <Text style={styles.h2}>{L.summary}</Text>

        <View style={styles.row}>
          <Text>{`${L.conditions} (${payload.conditions.length}): `}</Text>
          <Text>{translateConditions(lang, payload.conditions).join(', ') || L.dash}</Text>
        </View>

        <View style={styles.row}>
          <Text>{`${L.followUp}: `}</Text>
          <Text>{payload.products.followUpType === 'none' ? L.withoutFU : L.current}</Text>
        </View>

        <View style={styles.row}>
          <Text>{`${L.examType}: `}</Text>
          <Text>
            {(() => {
              if (payload.products.examType === 'pointOfCare') return L.pointOfCare
              if (payload.products.examType === 'conventional') return L.conventional
              return payload.products.examType || L.dash
            })()}
          </Text>
        </View>

        <View style={styles.row}>
          <Text>{`${L.transport}: `}</Text>
          <Text>{`${payload.transportation.type ? L.transportTypes[payload.transportation.type as keyof typeof L.transportTypes] || payload.transportation.type : L.dash} • ${c(payload.transportation.distanceKm)} ${L.km}`}</Text>
        </View>

        {/* Emissões */}
        <Text style={styles.h2}>{L.emissions}</Text>

        <View style={styles.row}>
          <Text>{L.withFollowUp}</Text>
          <Text>{formatEmissions(payload.totalEmissions.total)}</Text>
        </View>

        <View style={styles.row}>
          <Text>{L.conventional}</Text>
          <Text>{formatEmissions(payload.examsComparison.conventional)}</Text>
        </View>

        <View style={styles.row}>
          <Text>{L.pointOfCare}</Text>
          <Text>{formatEmissions(payload.examsComparison.pointOfCare)}</Text>
        </View>

        <View style={styles.row}>
          <Text>{L.withoutFU}</Text>
          <Text>{formatEmissions(payload.followUpImpact.withoutFollowUp)}</Text>
        </View>

        <View style={styles.row}>
          <Text>{L.avoidableHosp}</Text>
          <Text>{formatEmissions(payload.hospitalizationEmissions)}</Text>
        </View>

        <View style={styles.row}>
          <Text>{L.treesEq}</Text>
          <Text>{c(payload.treesEquivalent)}</Text>
        </View>

        {/* Tabela de produtos */}
        {!!payload.products.items.length && (
          <>
            <Text style={styles.h2}>{L.productsTitle}</Text>
            <View style={styles.tableHead}>
              <Text style={[styles.th, { flexBasis: '20%' }]}>{L.name}</Text>
              <Text style={[styles.th, { flexBasis: '15%', textAlign: 'center' }]}>{L.category}</Text>
              <Text style={[styles.th, { flexBasis: '15%', textAlign: 'center' }]}>{L.quantity}</Text>
              <Text style={[styles.th, { flexBasis: '20%', textAlign: 'center' }]}>{L.followUp}</Text>
              <Text style={[styles.th, { flexBasis: '13%', textAlign: 'center' }]}>{`${L.factor}/un`}</Text>
              <Text style={[styles.th, { flexBasis: '12%', textAlign: 'center' }]}>{L.total}</Text>
            </View>

            {consolidateProducts(payload.products.items).map(renderProductRow)}
          </>
        )}

        {/* Sugestões - maioria dos casos fica na primeira página */}
        {hasSuggestions && !hasManySuggestions && (
          <>
            <Text style={styles.h2}>{L.suggestions}</Text>
            {sortedSuggestions.map(renderSuggestion)}
          </>
        )}

        {/* Referências na primeira página para casos normais */}
        {!hasManySuggestions && renderReferences()}
      </Page>

      {/* SEGUNDA PÁGINA - APENAS se tiver MUITAS sugestões (>12) */}
      {hasManySuggestions && (
        <Page size="A4" style={styles.page}>
          {/* SEM header nesta página */}

          {/* Sugestões na segunda página */}
          <Text style={styles.h1}>{L.suggestions}</Text>
          {sortedSuggestions.map(renderSuggestion)}

          {/* Referências no final da segunda página */}
          {renderReferences()}
        </Page>
      )}
    </Document>
  )
}
