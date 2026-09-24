import { AnimatePresence, motion } from 'framer-motion'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useEffect, useReducer, useRef, useState } from 'react'
import { Button, Group, Input, NumberField } from 'react-aria-components'
import useLanguage from '@/hooks/useLanguage'
import { usePatient } from '@/hooks/usePatient'

interface QuestionBlockProps {
  label: string
  description?: string
  children: React.ReactNode
  layout?: 'stack' | 'inline'
}

function QuestionBlock({ label, description, children, layout = 'stack' }: Readonly<QuestionBlockProps>) {
  if (layout === 'inline') {
    return (
      <div className="ml-2 space-y-2">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {label && <p className="text-sm font-light text-white ">{label}</p>}
          {children}
        </div>
        {description && (
          <span className="text-xs font-medium text-white/60">{description}</span>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3 text-left">
      {(label || description) && (
        <div>
          {label && <p className="text-xs font-light text-white ">{label}</p>}
          {description && (
            <span className="text-xs font-medium text-white/60">{description}</span>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

interface ToggleButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  size?: 'default' | 'compact'
}

function ToggleButton({ active, onClick, children, size = 'default' }: Readonly<ToggleButtonProps>) {
  const baseClasses = 'text-xs rounded-full font-light transition-colors duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.15)]'
  const sizeClasses = size === 'compact'
    ? 'h-7 w-[100px] px-4 text-[11px] sm:text-xs leading-none'
    : 'px-5 sm:px-2 py-1 text-xs sm:text-xs'
  const activeClasses = 'bg-[#52AE32] text-white shadow-[0_0_25px_rgba(82,174,50,0.35)]'
  const inactiveClasses = 'bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${active ? activeClasses : inactiveClasses}`}>
      {children}
    </button>
  )
}

interface StepProgressState {
  currentStep: number
  maxStep: number
}

type StepProgressAction =
  | { type: 'reset' }
  | { type: 'advance' }
  | { type: 'prev' }
  | { type: 'goTo', step: number }

function stepProgressReducer(state: StepProgressState, action: StepProgressAction): StepProgressState {
  switch (action.type) {
    case 'reset':
      return { currentStep: 0, maxStep: 0 }
    case 'advance':
      return { currentStep: state.currentStep + 1, maxStep: state.maxStep + 1 }
    case 'prev':
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) }
    case 'goTo':
      return { currentStep: action.step, maxStep: Math.max(state.maxStep, action.step) }
    default:
      return state
  }
}

export function PatientStep2() {
  const { data, updateConditions } = usePatient()
  const { t } = useLanguage()

  const leftConditions = ['lowerBackPain', 'diabetes'] as const
  const rightConditions = ['hypertension', 'overweight'] as const

  // Inicializar a ordem de seleção com as condições já marcadas (para quando volta do Step3)
  const [selectedLeftOrder, setSelectedLeftOrder] = useState<string[]>(() =>
    leftConditions.filter((key) => data.conditions[key])
  )

  const [selectedRightOrder, setSelectedRightOrder] = useState<string[]>(() =>
    rightConditions.filter((key) => data.conditions[key])
  )

  const previousLeftConditions = useRef<string[]>(
    leftConditions.filter((key) => data.conditions[key])
  )
  const previousRightConditions = useRef<string[]>(
    rightConditions.filter((key) => data.conditions[key])
  )

  const [leftProgress, dispatchLeftProgress] = useReducer(stepProgressReducer, { currentStep: 0, maxStep: 0 })

  const [rightProgress, dispatchRightProgress] = useReducer(stepProgressReducer, { currentStep: 0, maxStep: 0 })

  const handleConditionChange = (condition: keyof typeof data.conditions, checked: boolean) => {
    if (condition === 'noChronicConditions') {
      updateConditions({
        ...data.conditions,
        lowerBackPain: false,
        hypertension: false,
        diabetes: false,
        overweight: false,
        noChronicConditions: checked,
        hypertensionEmergencyVisits: undefined,
        hypertensionControlled: undefined,
        hypertensionTreatment: [],
        diabetesControlled: undefined,
        diabetesEmergencyVisits: undefined,
        diabetesTreatment: [],
        overweightBariatricSurgery: undefined,
        overweightRecommendation: undefined,
        overweightMedication: undefined,
        overweightMeasures: [],
        lowerBackPainMedication: undefined,
        lowerBackPainImagingExams: {},
        lowerBackPainEmergencyVisits: undefined
      })
      setSelectedLeftOrder([])
      setSelectedRightOrder([])
      return
    }

    // Ao desmarcar, limpar as respostas da condição desmarcada
    const clearedFields: Partial<typeof data.conditions> = {}
    if (!checked) {
      switch (condition) {
        case 'hypertension':
          clearedFields.hypertensionEmergencyVisits = undefined
          clearedFields.hypertensionControlled = undefined
          clearedFields.hypertensionTreatment = []
          break
        case 'diabetes':
          clearedFields.diabetesControlled = undefined
          clearedFields.diabetesEmergencyVisits = undefined
          clearedFields.diabetesTreatment = []
          break
        case 'overweight':
          clearedFields.overweightBariatricSurgery = undefined
          clearedFields.overweightRecommendation = undefined
          clearedFields.overweightMedication = undefined
          clearedFields.overweightMeasures = []
          break
        case 'lowerBackPain':
          clearedFields.lowerBackPainMedication = undefined
          clearedFields.lowerBackPainImagingExams = {}
          clearedFields.lowerBackPainEmergencyVisits = undefined
          break
      }
    }

    updateConditions({
      ...data.conditions,
      ...clearedFields,
      [condition]: checked,
      noChronicConditions: false // Deve desmarcar caso qualquer outra opção seja marcada.
    })

    if (checked) {
      if (leftConditions.includes(condition as typeof leftConditions[number])) {
        setSelectedLeftOrder((prev) => prev.includes(condition) ? prev : [...prev, condition])
      } else if (rightConditions.includes(condition as typeof rightConditions[number])) {
        setSelectedRightOrder((prev) => prev.includes(condition) ? prev : [...prev, condition])
      }
    } else {
      if (leftConditions.includes(condition as typeof leftConditions[number])) {
        setSelectedLeftOrder((prev) => prev.filter((k) => k !== condition))
      } else if (rightConditions.includes(condition as typeof rightConditions[number])) {
        setSelectedRightOrder((prev) => prev.filter((k) => k !== condition))
      }
    }
  }

  const handleHypertensionEmergencyVisits = (value: 'none' | 'once' | 'twiceOrMore') => {
    updateConditions({
      ...data.conditions,
      hypertensionEmergencyVisits: value
    })
  }

  const handleHypertensionControlled = (value: 'yes' | 'no' | 'unknown') => {
    updateConditions({
      ...data.conditions,
      hypertensionControlled: value
    })
  }

  const handleHypertensionTreatment = (treatment: string) => {
    const current = data.conditions.hypertensionTreatment || []
    const updated = current.includes(treatment)
      ? current.filter((t) => t !== treatment)
      : [...current, treatment]
    updateConditions({
      ...data.conditions,
      hypertensionTreatment: updated
    })
  }

  const handleDiabetesControlled = (value: 'yes' | 'no' | 'unknown') => {
    updateConditions({
      ...data.conditions,
      diabetesControlled: value
    })
  }

  const handleDiabetesEmergencyVisits = (value: 'none' | 'once' | 'twiceOrMore') => {
    updateConditions({
      ...data.conditions,
      diabetesEmergencyVisits: value
    })
  }

  const handleDiabetesTreatment = (treatment: string) => {
    const current = data.conditions.diabetesTreatment || []
    const updated = current.includes(treatment)
      ? current.filter((t) => t !== treatment)
      : [...current, treatment]
    updateConditions({
      ...data.conditions,
      diabetesTreatment: updated
    })
  }

  const handleOverweightBariatricSurgery = (value: 'no' | 'lessThan1Year' | 'moreThan1Year') => {
    updateConditions({
      ...data.conditions,
      overweightBariatricSurgery: value
    })
  }

  const handleOverweightRecommendation = (value: 'formallyIndicated' | 'considered' | 'no') => {
    updateConditions({
      ...data.conditions,
      overweightRecommendation: value
    })
  }

  const handleOverweightMedication = (value: 'no' | 'oral' | 'injectable' | 'both') => {
    updateConditions({
      ...data.conditions,
      overweightMedication: value
    })
  }

  const handleOverweightMeasures = (measure: string) => {
    const current = data.conditions.overweightMeasures || []
    const updated = current.includes(measure)
      ? current.filter((m) => m !== measure)
      : [...current, measure]
    updateConditions({
      ...data.conditions,
      overweightMeasures: updated
    })
  }

  const handleLowerBackPainMedication = (value: 'daily' | 'occasional' | 'no' | 'unknown') => {
    updateConditions({
      ...data.conditions,
      lowerBackPainMedication: value
    })
  }

  const handleLowerBackPainImagingExams = (exam: string, quantity: number) => {
    const current = data.conditions.lowerBackPainImagingExams || {}
    if (quantity === 0) {
      const updated = { ...current }
      delete updated[exam]
      delete updated.none
      updateConditions({
        ...data.conditions,
        lowerBackPainImagingExams: updated
      })
    } else {
      const updated = { ...current, [exam]: quantity }
      delete updated.none
      updateConditions({
        ...data.conditions,
        lowerBackPainImagingExams: updated
      })
    }
  }

  const handleLowerBackPainEmergencyVisits = (value: 'none' | 'once' | 'twiceOrMore') => {
    updateConditions({
      ...data.conditions,
      lowerBackPainEmergencyVisits: value
    })
  }

  const hypertensionQuestions = [
    {
      key: 'hypertension-emergencyVisits',
      component: (
        <QuestionBlock label={t('step2q.hypertension.emergencyVisits.label')}>
          <div className="flex flex-wrap gap-2">
            <ToggleButton
              active={data.conditions.hypertensionEmergencyVisits === 'none'}
              onClick={() => handleHypertensionEmergencyVisits('none')}>
              {t('step2q.hypertension.emergencyVisits.none')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.hypertensionEmergencyVisits === 'once'}
              onClick={() => handleHypertensionEmergencyVisits('once')}>
              {t('step2q.hypertension.emergencyVisits.once')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.hypertensionEmergencyVisits === 'twiceOrMore'}
              onClick={() => handleHypertensionEmergencyVisits('twiceOrMore')}>
              {t('step2q.hypertension.emergencyVisits.twiceOrMore')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: data.conditions.hypertensionEmergencyVisits !== undefined
    },
    {
      key: 'hypertension-controlled',
      component: (
        <QuestionBlock label={t('step2q.hypertension.controlled.label')}>
          <div className="flex flex-wrap gap-3">
            <ToggleButton
              active={data.conditions.hypertensionControlled === 'yes'}
              onClick={() => handleHypertensionControlled('yes')}>
              {t('step2q.hypertension.controlled.yes')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.hypertensionControlled === 'no'}
              onClick={() => handleHypertensionControlled('no')}>
              {t('step2q.hypertension.controlled.no')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.hypertensionControlled === 'unknown'}
              onClick={() => handleHypertensionControlled('unknown')}>
              {t('step2q.hypertension.controlled.unknown')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: data.conditions.hypertensionControlled !== undefined
    },
    {
      key: 'hypertension-treatment',
      component: (
        <QuestionBlock label={t('step2q.hypertension.treatment.label')}>
          <div className="space-y-4 overflow-auto max-h-20 scrollbar-dark">
            <div className="flex flex-wrap gap-3">
              <ToggleButton
                active={(data.conditions.hypertensionTreatment || []).includes('Mudança de hábitos (dieta, exercício)')}
                onClick={() => handleHypertensionTreatment('Mudança de hábitos (dieta, exercício)')}>
                {t('step2q.hypertension.treatment.lifestyle')}
              </ToggleButton>
              <ToggleButton
                active={(data.conditions.hypertensionTreatment || []).includes('Medicamentos orais, comprimidos.')}
                onClick={() => handleHypertensionTreatment('Medicamentos orais, comprimidos.')}>
                {t('step2q.hypertension.treatment.oralMeds')}
              </ToggleButton>
              <ToggleButton
                active={(data.conditions.hypertensionTreatment || []).includes('Gerenciamento do estresse')}
                onClick={() => handleHypertensionTreatment('Gerenciamento do estresse')}>
                {t('step2q.hypertension.treatment.stressMgmt')}
              </ToggleButton>
              <ToggleButton
                active={(data.conditions.hypertensionTreatment || []).includes('Gerenciamento do sono')}
                onClick={() => handleHypertensionTreatment('Gerenciamento do sono')}>
                {t('step2q.hypertension.treatment.sleepMgmt')}
              </ToggleButton>
            </div>
          </div>
        </QuestionBlock>
      ),
      isAnswered: (data.conditions.hypertensionTreatment || []).length > 0
    }
  ]

  const diabetesQuestions = [
    {
      key: 'diabetes-controlled',
      component: (
        <QuestionBlock label={t('step2q.diabetes.controlled.label')}>
          <div className="flex flex-wrap gap-3">
            <ToggleButton
              active={data.conditions.diabetesControlled === 'yes'}
              onClick={() => handleDiabetesControlled('yes')}>
              {t('step2q.diabetes.controlled.yes')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.diabetesControlled === 'no'}
              onClick={() => handleDiabetesControlled('no')}>
              {t('step2q.diabetes.controlled.no')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.diabetesControlled === 'unknown'}
              onClick={() => handleDiabetesControlled('unknown')}>
              {t('step2q.diabetes.controlled.unknown')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: data.conditions.diabetesControlled !== undefined
    },
    {
      key: 'diabetes-emergencyVisits',
      component: (
        <QuestionBlock label={t('step2q.diabetes.emergencyVisits.label')}>
          <div className="flex flex-wrap gap-2">
            <ToggleButton
              active={data.conditions.diabetesEmergencyVisits === 'none'}
              onClick={() => handleDiabetesEmergencyVisits('none')}>
              {t('step2q.diabetes.emergencyVisits.none')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.diabetesEmergencyVisits === 'once'}
              onClick={() => handleDiabetesEmergencyVisits('once')}>
              {t('step2q.diabetes.emergencyVisits.once')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.diabetesEmergencyVisits === 'twiceOrMore'}
              onClick={() => handleDiabetesEmergencyVisits('twiceOrMore')}>
              {t('step2q.diabetes.emergencyVisits.twiceOrMore')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: data.conditions.diabetesEmergencyVisits !== undefined
    },
    {
      key: 'diabetes-treatment',
      component: (
        <QuestionBlock label={t('step2q.diabetes.treatment.label')}>
          <div className="flex flex-wrap gap-3">
            <ToggleButton
              active={(data.conditions.diabetesTreatment || []).includes('Mudança de hábitos (dieta, exercício)')}
              onClick={() => handleDiabetesTreatment('Mudança de hábitos (dieta, exercício)')}>
              {t('step2q.diabetes.treatment.lifestyle')}
            </ToggleButton>
            <ToggleButton
              active={(data.conditions.diabetesTreatment || []).includes('Medicamentos orais, comprimidos.')}
              onClick={() => handleDiabetesTreatment('Medicamentos orais, comprimidos.')}>
              {t('step2q.diabetes.treatment.oralMeds')}
            </ToggleButton>
            <ToggleButton
              active={(data.conditions.diabetesTreatment || []).includes('Medicamentos injetáveis')}
              onClick={() => handleDiabetesTreatment('Medicamentos injetáveis')}>
              {t('step2q.diabetes.treatment.injectables')}
            </ToggleButton>
            <ToggleButton
              active={(data.conditions.diabetesTreatment || []).includes('outros')}
              onClick={() => handleDiabetesTreatment('outros')}>
              {t('step2q.diabetes.treatment.other')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: (data.conditions.diabetesTreatment || []).length > 0
    }
  ]

  const overweightQuestions = [
    {
      key: 'overweight-bariatricSurgery',
      component: (
        <QuestionBlock label={t('step2q.overweight.bariatricSurgery.label')}>
          <div className="flex flex-wrap gap-3">
            <ToggleButton
              active={data.conditions.overweightBariatricSurgery === 'no'}
              onClick={() => handleOverweightBariatricSurgery('no')}>
              {t('step2q.overweight.bariatricSurgery.no')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.overweightBariatricSurgery === 'lessThan1Year'}
              onClick={() => handleOverweightBariatricSurgery('lessThan1Year')}>
              {t('step2q.overweight.bariatricSurgery.lessThan1Year')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.overweightBariatricSurgery === 'moreThan1Year'}
              onClick={() => handleOverweightBariatricSurgery('moreThan1Year')}>
              {t('step2q.overweight.bariatricSurgery.moreThan1Year')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: data.conditions.overweightBariatricSurgery !== undefined
    },
    {
      key: 'overweight-recommendation',
      component: (
        <QuestionBlock label={t('step2q.overweight.recommendation.label')}>
          <div className="flex flex-wrap gap-3">
            <ToggleButton
              active={data.conditions.overweightRecommendation === 'formallyIndicated'}
              onClick={() => handleOverweightRecommendation('formallyIndicated')}>
              {t('step2q.overweight.recommendation.formallyIndicated')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.overweightRecommendation === 'considered'}
              onClick={() => handleOverweightRecommendation('considered')}>
              {t('step2q.overweight.recommendation.considered')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.overweightRecommendation === 'no'}
              onClick={() => handleOverweightRecommendation('no')}>
              {t('step2q.overweight.recommendation.no')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: data.conditions.overweightRecommendation !== undefined
    },
    {
      key: 'overweight-medication',
      component: (
        <QuestionBlock label={t('step2q.overweight.medication.label')}>
          <div className="flex flex-wrap gap-3">
            <ToggleButton
              active={data.conditions.overweightMedication === 'no'}
              onClick={() => handleOverweightMedication('no')}>
              {t('step2q.overweight.medication.no')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.overweightMedication === 'oral'}
              onClick={() => handleOverweightMedication('oral')}>
              {t('step2q.overweight.medication.oral')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.overweightMedication === 'injectable'}
              onClick={() => handleOverweightMedication('injectable')}>
              {t('step2q.overweight.medication.injectable')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.overweightMedication === 'both'}
              onClick={() => handleOverweightMedication('both')}>
              {t('step2q.overweight.medication.both')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: data.conditions.overweightMedication !== undefined
    },
    {
      key: 'overweight-measures',
      component: (
        <QuestionBlock label={t('step2q.overweight.measures.label')}>
          <div className="flex flex-wrap gap-3">
            <ToggleButton
              active={(data.conditions.overweightMeasures || []).includes('Nenhuma')}
              onClick={() => handleOverweightMeasures('Nenhuma')}>
              {t('step2q.overweight.measures.none')}
            </ToggleButton>
            <ToggleButton
              active={(data.conditions.overweightMeasures || []).includes('Exercícios físicos')}
              onClick={() => handleOverweightMeasures('Exercícios físicos')}>
              {t('step2q.overweight.measures.exercise')}
            </ToggleButton>
            <ToggleButton
              active={(data.conditions.overweightMeasures || []).includes('Alimentação saudável')}
              onClick={() => handleOverweightMeasures('Alimentação saudável')}>
              {t('step2q.overweight.measures.healthyDiet')}
            </ToggleButton>
            <ToggleButton
              active={(data.conditions.overweightMeasures || []).includes('Dieta e exercícios físicos combinados')}
              onClick={() => handleOverweightMeasures('Dieta e exercícios físicos combinados')}>
              {t('step2q.overweight.measures.dietAndExercise')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: (data.conditions.overweightMeasures || []).length > 0
    }
  ]

  const lowerBackPainQuestions = [
    {
      key: 'lowerBackPain-medication',
      component: (
        <QuestionBlock label={t('step2q.lowerBackPain.medication.label')}>
          <div className="flex flex-wrap gap-3">
            <ToggleButton
              active={data.conditions.lowerBackPainMedication === 'daily'}
              onClick={() => handleLowerBackPainMedication('daily')}>
              {t('step2q.lowerBackPain.medication.daily')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.lowerBackPainMedication === 'occasional'}
              onClick={() => handleLowerBackPainMedication('occasional')}>
              {t('step2q.lowerBackPain.medication.occasional')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.lowerBackPainMedication === 'no'}
              onClick={() => handleLowerBackPainMedication('no')}>
              {t('step2q.lowerBackPain.medication.no')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.lowerBackPainMedication === 'unknown'}
              onClick={() => handleLowerBackPainMedication('unknown')}>
              {t('step2q.lowerBackPain.medication.unknown')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: data.conditions.lowerBackPainMedication !== undefined
    },
    {
      key: 'lowerBackPain-imagingExams',
      component: (
        <QuestionBlock label={t('step2q.lowerBackPain.imagingExams.label')}>
          <div className="space-y-4 overflow-auto max-h-20 scrollbar-dark">
            {[
              { id: 'Raio-X', label: t('step2q.lowerBackPain.imagingExams.xray') },
              { id: 'Tomografia', label: t('step2q.lowerBackPain.imagingExams.tomography') },
              { id: 'Ressonância magnética', label: t('step2q.lowerBackPain.imagingExams.mri') }
            ].map(({ id, label }) => {
              const exams = data.conditions.lowerBackPainImagingExams || {}
              const isActive = exams[id] !== undefined && !exams.none
              return (
                <div key={id} className="flex items-center gap-4">
                  <ToggleButton
                    active={isActive}
                    onClick={() => {
                      if (isActive) {
                        const updated = { ...exams }
                        delete updated[id]
                        updateConditions({
                          ...data.conditions,
                          lowerBackPainImagingExams: updated
                        })
                      } else {
                        const updated = { ...exams, [id]: 0 }
                        delete updated.none
                        updateConditions({
                          ...data.conditions,
                          lowerBackPainImagingExams: updated
                        })
                      }
                    }}>
                    {label}
                  </ToggleButton>
                  {isActive && (
                    <NumberField
                      minValue={0}
                      maxValue={100}
                      step={1}
                      value={(exams[id] as number) || 0}
                      onChange={(val) => handleLowerBackPainImagingExams(id, val)}
                      className="w-20"
                      aria-label={`Quantidade de ${label}`}>
                      <Group className="w-37.5 flex items-center gap-1">
                        <Button
                          slot="decrement"
                          className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full cursor-pointer bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed">
                          <MinusIcon size={12} aria-hidden="true" />
                        </Button>
                        <Input className="w-12 px-2 py-1 text-xs text-center text-white rounded-full bg-white/5 outline-0" />
                        <Button
                          slot="increment"
                          className="flex items-center justify-center w-6 h-6 text-sm text-white rounded-full cursor-pointer bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed">
                          <PlusIcon size={12} aria-hidden="true" />
                        </Button>
                      </Group>
                    </NumberField>
                  )}
                </div>
              )
            })}
            <ToggleButton
              active={data.conditions.lowerBackPainImagingExams?.none === true}
              onClick={() => {
                updateConditions({
                  ...data.conditions,
                  lowerBackPainImagingExams: { none: true }
                })
              }}>
              {t('step2q.lowerBackPain.imagingExams.none')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: (() => {
        const exams = data.conditions.lowerBackPainImagingExams || {}
        const selectedExams = Object.keys(exams).filter((k) => k !== 'none' && exams[k] !== undefined)
        return exams.none || (selectedExams.length > 0 && selectedExams.every((k) => typeof exams[k] === 'number' && exams[k] > 0))
      })()
    },
    {
      key: 'lowerBackPain-emergencyVisits',
      component: (
        <QuestionBlock label={t('step2q.lowerBackPain.emergencyVisits.label')}>
          <div className="flex flex-wrap gap-2">
            <ToggleButton
              active={data.conditions.lowerBackPainEmergencyVisits === 'none'}
              onClick={() => handleLowerBackPainEmergencyVisits('none')}>
              {t('step2q.lowerBackPain.emergencyVisits.none')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.lowerBackPainEmergencyVisits === 'once'}
              onClick={() => handleLowerBackPainEmergencyVisits('once')}>
              {t('step2q.lowerBackPain.emergencyVisits.once')}
            </ToggleButton>
            <ToggleButton
              active={data.conditions.lowerBackPainEmergencyVisits === 'twiceOrMore'}
              onClick={() => handleLowerBackPainEmergencyVisits('twiceOrMore')}>
              {t('step2q.lowerBackPain.emergencyVisits.twiceOrMore')}
            </ToggleButton>
          </div>
        </QuestionBlock>
      ),
      isAnswered: data.conditions.lowerBackPainEmergencyVisits !== undefined
    }
  ]

  const selectedLeftConditions = selectedLeftOrder.filter(
    (key) =>
      data.conditions[key as keyof typeof data.conditions]
      && leftConditions.includes(key as typeof leftConditions[number])
  )
  const leftQuestions = selectedLeftConditions.flatMap((condition) => {
    if (condition === 'lowerBackPain') return lowerBackPainQuestions
    if (condition === 'diabetes') return diabetesQuestions
    return []
  })

  // Reset left steps when conditions change
  useEffect(() => {
    const prev = previousLeftConditions.current
    const current = selectedLeftConditions
    const hasRemoved = prev.some((cond) => !current.includes(cond))
    if (hasRemoved) {
      dispatchLeftProgress({ type: 'reset' })
    }
    previousLeftConditions.current = current
  }, [selectedLeftConditions])

  const handlePrevLeft = () => {
    if (leftProgress.currentStep > 0) {
      dispatchLeftProgress({ type: 'prev' })
    }
  }

  useEffect(() => {
    const currentQuestion = leftQuestions[leftProgress.currentStep]
    if (currentQuestion?.isAnswered && !currentQuestion.key.includes('imagingExams') && leftProgress.currentStep < leftQuestions.length - 1 && leftProgress.currentStep === leftProgress.maxStep) {
      dispatchLeftProgress({ type: 'advance' })
    }
  }, [data.conditions, leftProgress.currentStep, leftProgress.maxStep, leftQuestions])

  const selectedRightConditions = selectedRightOrder.filter(
    (key) =>
      data.conditions[key as keyof typeof data.conditions]
      && rightConditions.includes(key as typeof rightConditions[number])
  )
  const rightQuestions = selectedRightConditions.flatMap((condition) => {
    if (condition === 'hypertension') return hypertensionQuestions
    if (condition === 'overweight') return overweightQuestions
    return []
  })

  // Reset right steps when conditions change
  useEffect(() => {
    const prev = previousRightConditions.current
    const current = selectedRightConditions
    const hasRemoved = prev.some((cond) => !current.includes(cond))
    if (hasRemoved) {
      dispatchRightProgress({ type: 'reset' })
    }
    previousRightConditions.current = current
  }, [selectedRightConditions])

  const handlePrevRight = () => {
    if (rightProgress.currentStep > 0) {
      dispatchRightProgress({ type: 'prev' })
    }
  }

  useEffect(() => {
    const currentQuestion = rightQuestions[rightProgress.currentStep]
    if (currentQuestion?.isAnswered && rightProgress.currentStep < rightQuestions.length - 1 && rightProgress.currentStep === rightProgress.maxStep) {
      dispatchRightProgress({ type: 'advance' })
    }
  }, [data.conditions, rightProgress.currentStep, rightProgress.maxStep, rightQuestions])

  const conditions = [
    {
      key: 'lowerBackPain' as const,
      label: t('step2.lowerBackPain'),
      img: '/ui/patient/icon-xray',
      description: t('step2.lowerBackPainDesc')
    },
    {
      key: 'diabetes' as const,
      label: t('step2.diabetes'),
      img: '/ui/patient/icon-sugar',
      description: t('step2.diabetesDesc')
    },
    {
      key: 'hypertension' as const,
      label: t('step2.hypertension'),
      img: '/ui/patient/icon-hyper',
      description: t('step2.hypertensionDesc')
    },
    {
      key: 'overweight' as const,
      label: t('step2.overweight'),
      img: '/ui/patient/icon-weight',
      description: t('step2.overweightDesc')
    },
    {
      key: 'noChronicConditions' as const,
      label: t('step2.noChronicConditions'),
      img: '/ui/patient/icon-check',
      description: t('step2.noChronicConditionsDesc')
    }
  ]

  return (
    <div className="mb-40 space-y-6 lg:mb-20">
      <div className="h-12 mb-10 mt-14">
        <h1 className="text-center w-full text-[#D7D7D7] font-thin text-xl m-auto">
          {t('step2.title')}
        </h1>
      </div>
      <div className="flex justify-center gap-10">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="flex items-center justify-center gap-2 select-none sm:gap-4 md:gap-6 lg:gap-10">
              {conditions.slice(0, 2).map(({ key, label, img }) => (
                <button
                  type="button"
                  key={key}
                  className={`
                    rounded-4xl w-32 sm:w-36 md:w-40 shrink-0 cursor-pointer transition-all
                    ${data.conditions[key]
                      ? 'border-[#94CF5B] ring-2 ring-[#94CF5B] scale-105'
                      : 'border-white/20 hover:border-white/30 hover:scale-102'
                    }
                  `}
                  onClick={() => handleConditionChange(key, !data.conditions[key])}>
                  <input
                    type="checkbox"
                    checked={data.conditions[key]}
                    onChange={(e) => handleConditionChange(key, e.target.checked)}
                    className="hidden"
                    onClick={(e) => e.stopPropagation()} />

                  <div className="glass-container">
                    {!data.conditions[key] && (<div className="glass-filter"></div>)}
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content">
                      <img
                        src={`${img}${data.conditions[key] ? '-active' : ''}.png`}
                        alt={`${key}-img`}
                        className="mt-2 w-18 h-18" />
                      <h3
                        className={`
                          -mt-1.25 text-xs font-light whitespace-nowrap uppercase
                          ${data.conditions[key] ? 'text-[#52AE32]' : 'text-white'}
                        `}>
                        {label}
                      </h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="absolute left-0 right-0 mt-4 text-center pointer-events-auto top-full">
              {selectedLeftConditions.length > 0 && (
                <div className="relative">
                  <div className="flex items-center max-w-md gap-4">
                    {leftProgress.currentStep > 0 && (
                      <button
                        type="button"
                        onClick={handlePrevLeft}
                        className="text-2xl text-white transition-colors hover:text-white/80">
                        ‹
                      </button>
                    )}
                    <div className="flex-1">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={leftProgress.currentStep}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.5, delay: 0.2 }}>
                          {leftQuestions[leftProgress.currentStep]?.component}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {leftProgress.currentStep < leftQuestions.length - 1
                      && (leftQuestions[leftProgress.currentStep]?.isAnswered
                        || leftQuestions[leftProgress.currentStep]?.key.includes('imagingExams')) && (
                      <button
                        type="button"
                        onClick={() => {
                          dispatchLeftProgress({ type: 'advance' })
                        }}
                        className="text-2xl text-white transition-colors hover:text-white/80">
                        ›
                      </button>
                    )}
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {leftQuestions.map((question, index) => (
                      <button
                        aria-label={`leftQuestions-${index + 1}`}
                        key={question.key}
                        type="button"
                        onClick={() => {
                          if (index < leftProgress.currentStep) {
                            dispatchLeftProgress({ type: 'goTo', step: index })
                          } else if (index > leftProgress.currentStep && leftQuestions.slice(0, index).every((q) => q.isAnswered)) {
                            dispatchLeftProgress({ type: 'goTo', step: index })
                          }
                        }}
                        disabled={index > leftProgress.currentStep && !leftQuestions.slice(0, index).every((q) => q.isAnswered)}
                        className={`
                          w-2 h-2 rounded-full transition-colors ${index === leftProgress.currentStep ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}
                          disabled:opacity-30 disabled:cursor-not-allowed
                        `} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="flex items-center justify-center gap-2 select-none sm:gap-4 md:gap-6 lg:gap-10">
              {conditions.slice(2).map(({ key, label, img }) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => handleConditionChange(key, !data.conditions[key])}
                  className={`
                    rounded-4xl w-32 sm:w-36 md:w-40 shrink-0 cursor-pointer transition-all
                    ${data.conditions[key]
                      ? 'border-[#94CF5B] ring-2 ring-[#94CF5B] scale-105'
                      : 'border-white/20 hover:border-white/30 hover:scale-102'
                    }
                  `}>
                  <input
                    type="checkbox"
                    checked={data.conditions[key]}
                    onChange={(e) => handleConditionChange(key, e.target.checked)}
                    className="hidden"
                    onClick={(e) => e.stopPropagation()} />

                  <div className="glass-container">
                    {!data.conditions[key] && (<div className="glass-filter"></div>)}
                    <div className="glass-overlay"></div>
                    <div className="glass-specular"></div>
                    <div className="glass-content">
                      <img
                        src={`${img}${data.conditions[key] ? '-active' : ''}.png`}
                        alt={`${key}-img`}
                        className="mt-2 w-18 h-18" />
                      <h3
                        className={`
                          -mt-1.25 text-xs font-light whitespace-nowrap uppercase
                          ${data.conditions[key] ? 'text-[#52AE32]' : 'text-white'}
                        `}>
                        {label}
                      </h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="absolute left-0 right-0 mt-4 text-center pointer-events-auto top-full">
              {selectedRightConditions.length > 0 && (
                <div className="relative">
                  <div className="flex items-center max-w-md gap-4">
                    {rightProgress.currentStep > 0 && (
                      <button
                        type="button"
                        onClick={handlePrevRight}
                        className="text-2xl text-white transition-colors hover:text-white/80">
                        ‹
                      </button>
                    )}
                    <div className="flex-1">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={rightProgress.currentStep}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.5, delay: 0.2 }}>
                          {rightQuestions[rightProgress.currentStep]?.component}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {rightProgress.currentStep < rightQuestions.length - 1 && rightQuestions[rightProgress.currentStep]?.isAnswered && (
                      <button
                        type="button"
                        onClick={() => dispatchRightProgress({ type: 'advance' })}
                        className="text-2xl text-white transition-colors hover:text-white/80">
                        ›
                      </button>
                    )}
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {rightQuestions.map((question, index) => (
                      <button
                        aria-label={`rightQuestions-${index + 1}`}
                        key={question.key}
                        type="button"
                        onClick={() => {
                          if (index < rightProgress.currentStep) {
                            dispatchRightProgress({ type: 'goTo', step: index })
                          } else if (index > rightProgress.currentStep && rightQuestions.slice(0, index).every((q) => q.isAnswered)) {
                            dispatchRightProgress({ type: 'goTo', step: index })
                          }
                        }}
                        disabled={index > rightProgress.currentStep && !rightQuestions.slice(0, index).every((q) => q.isAnswered)}
                        className={`
                          ${index === rightProgress.currentStep ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}
                          w-2 h-2 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed
                        `} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
