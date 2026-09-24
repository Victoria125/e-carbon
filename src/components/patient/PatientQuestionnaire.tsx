import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import useLanguage from '@/hooks/useLanguage'
import { usePatient } from '@/hooks/usePatient'

type GenderOption = 'feminino' | 'masculino' | 'outro'

interface PatientQuestionnaireProps {
  onContinue: () => void
}

interface QuestionBlockProps {
  label: string
  description?: string
  children: ReactNode
  layout?: 'stack' | 'inline'
}

function QuestionBlock({ label, description, children, layout = 'stack' }: Readonly<QuestionBlockProps>) {
  if (layout === 'inline') {
    return (
      <div className="ml-2 space-y-2">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {label && <p className="text-sm tracking-wide text-white font-400 ">{label}</p>}
          {children}
        </div>
        {description && (
          <span className="text-xs font-medium text-white/60">{description}</span>
        )}
      </div>
    )
  }

  return (
    <div className="ml-2 space-y-3">
      {(label || description) && (
        <div>
          {label && <p className="text-sm tracking-wide text-white font-400 ">{label}</p>}
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
  children: ReactNode
  size?: 'default' | 'compact'
  disabled?: boolean
  inactiveClasses?: string | undefined
}

function ToggleButton({ active, onClick, children, size = 'default', disabled = false, inactiveClasses }: Readonly<ToggleButtonProps>) {
  const baseClasses = `
    font-semibold uppercase rounded-full transition-colors duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.15)]
    ${!disabled && 'cursor-pointer'}
  `

  const sizeClasses = size === 'compact'
    ? 'h-7 w-[100px] px-4 text-[11px] sm:text-xs leading-none'
    : 'px-5 sm:px-6 py-2 text-xs sm:text-sm'

  const activeClasses = 'bg-[#52AE32] text-white shadow-[0_0_25px_rgba(82,174,50,0.35)]'

  inactiveClasses = inactiveClasses || 'bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${active ? activeClasses : inactiveClasses}`}
      disabled={disabled}>
      {children}
    </button>
  )
}

interface InlineSelectOption {
  value: string
  label: string
}

interface InlineSelectProps {
  value: string
  placeholder: string
  options: InlineSelectOption[]
  onChange: (value: string) => void
}

function InlineSelect({ value, placeholder, options, onChange }: Readonly<InlineSelectProps>) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const selectedOption = options.find((option) => option.value === value)

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-37.5">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="w-full h-7 px-5 flex items-center justify-between rounded-full border border-white/10 bg-white/5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#94CF5B]/50">
        <span className={selectedOption ? '' : 'text-white/50'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`text-[#94CF5B] text-lg transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-30 mt-2">
          <div className="glass-container rounded-[18px]!">
            <div className="glass-filter"></div>
            <div className="glass-overlay"></div>
            <div className="glass-specular"></div>
            <div className="glass-content items-stretch! gap-2! p-2!">
              <ul className="flex flex-col w-full gap-2">
                {options.map((option) => {
                  const isActive = option.value === value
                  return (
                    <li
                      key={option.value}
                      className="w-full">
                      <button
                        type="button"
                        className={`w-full rounded-full px-5 py-2 text-left text-xs sm:text-sm font-semibold uppercase transition-colors ${isActive
                          ? 'bg-[#52AE32] text-white shadow-[0_0_20px_rgba(82,174,50,0.35)]'
                          : 'bg-white/5 text-white/85 hover:bg-white/12'}
                        `}
                        onClick={() => handleSelect(option.value)}>
                        {option.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// As opções dependem de tradução; serão definidas dentro do componente para reagir à troca de idioma

export function PatientQuestionnaire({ onContinue }: Readonly<PatientQuestionnaireProps>) {
  const { t } = useLanguage()
  const { setAnamnesisId, updateQuestionnaireData } = usePatient()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [age, setAge] = useState('')
  const [gender, setGender] = useState<GenderOption | ''>('')
  const [walkDays, setWalkDays] = useState('')
  const [walkMinutes, setWalkMinutes] = useState('')
  const [moderateDays, setModerateDays] = useState('')
  const [moderateMinutes, setModerateMinutes] = useState('')
  const [vigorousDays, setVigorousDays] = useState('')
  const [vigorousMinutes, setVigorousMinutes] = useState('')
  const [vegetableServings, setVegetableServings] = useState('')
  const [fruitServings, setFruitServings] = useState('')
  const [processedServings, setProcessedServings] = useState('')

  const [smoking, setSmoking] = useState('')
  const [alcoholDays, setAlcoholDays] = useState('')
  const [alcoholDoses, setAlcoholDoses] = useState('')
  const [consultations, setConsultations] = useState('')
  const [bloodTests, setBloodTests] = useState('')
  const [bloodTestsType, setBloodTestsType] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Funções auxiliares para mapear valores
  const mapSmokingStatus = (value: string) => {
    switch (value) {
      case 'nao': return 'nunca fumou'
      case 'diariamente': return 'fumante diario'
      case 'ocasionalmente': return 'fumante ocasional'
      case 'ex-fumante': return 'ex-fumante'
      default: return value
    }
  }

  const mapFollowup = (value: string) => {
    switch (value) {
      case 'presencial': return 'semestral'
      case 'teleconsulta': return 'semestral'
      case 'nao': return 'nenhum'
      default: return value
    }
  }

  const mapLabType = (value: string) => {
    switch (value) {
      case 'convencionais': return 'laboratório público'
      case 'point-of-care': return 'point of care'
      default: return value
    }
  }

  const preparePayload = () => {
    return {
      age: Number.parseInt(age, 10),
      gender: gender as 'feminino' | 'masculino' | 'outro',
      walk_days: Number.parseInt(walkDays, 10),
      walk_minutes: Number.parseInt(walkMinutes, 10),
      mod_days: Number.parseInt(moderateDays, 10),
      mod_minutes: Number.parseInt(moderateMinutes, 10),
      vig_days: Number.parseInt(vigorousDays, 10),
      vig_minutes: Number.parseInt(vigorousMinutes, 10),
      veg_portions: Number.parseInt(vegetableServings, 10),
      fruit_portions: Number.parseInt(fruitServings, 10),
      ultra_processed: Number.parseInt(processedServings, 10),
      chronic_dx: [], // Adicionar campos de doenças crônicas se necessário
      smoke_status: mapSmokingStatus(smoking),
      alcohol_days_week: Number.parseInt(alcoholDays, 10),
      alcohol_drinks_day: Number.parseInt(alcoholDoses, 10),
      followup: mapFollowup(consultations),
      blood_tests_year: Number.parseInt(bloodTests, 10),
      lab_type: mapLabType(bloodTestsType)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const payload = preparePayload()

      const response = await fetch('/api/anamnesis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        let errText = `${response.status} ${response.statusText}`
        try {
          const errJson = await response.json()
          errText += ` - ${errJson && (errJson.error || JSON.stringify(errJson))}`
        } catch {
          try {
            const errPlain = await response.text()
            if (errPlain) errText += ` - ${errPlain}`
          } catch {
            // ignore
          }
        }
        throw new Error(`Erro: ${errText}`)
      }

      const { id } = await response.json()
      setAnamnesisId(id)
      updateQuestionnaireData(payload)
      onContinue() // Prossegue para a próxima etapa
    } catch (error) {
      console.error('Erro ao enviar anamnese:', error)
      setSubmitError(error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
      setIsSubmitting(false)
    }
  }

  const numericInputBaseClasses = 'w-full pl-4 pr-4 text-sm font-semibold tracking-widest uppercase rounded-full border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-[#94CF5B] focus:outline-none focus:ring-2 focus:ring-[#94CF5B]/50 disabled:cursor-not-allowed disabled:text-white/40 disabled:border-white/10 disabled:bg-white/5'
  const numericInputShortClasses = `h-7 ${numericInputBaseClasses}`

  const sanitizeNumeric = (rawValue: string, maxDigits: number) => Array
    .from(rawValue)
    .filter((char) => char >= '0' && char <= '9')
    .join('')
    .slice(0, maxDigits)

  const handleAgeChange = (rawValue: string) => {
    const numericValue = sanitizeNumeric(rawValue, 3)
    if (!numericValue) {
      setAge('')
      return
    }

    setAge(String(Number(numericValue)))
  }

  const updateDays = (
    rawValue: string,
    setDays: Dispatch<SetStateAction<string>>,
    setMinutes: Dispatch<SetStateAction<string>>
  ) => {
    const numericValue = sanitizeNumeric(rawValue, 2)

    if (!numericValue) {
      setDays('')
      setMinutes('')
      return
    }

    const clampedValue = Math.min(Number(numericValue), 7)
    const nextValue = String(clampedValue)

    setDays(nextValue)
    setMinutes((prev) => {
      if (clampedValue === 0) {
        return '0'
      }

      return prev === '0' ? '' : prev
    })
  }

  const updateMinutes = (
    rawValue: string,
    setMinutes: Dispatch<SetStateAction<string>>
  ) => {
    const numericValue = sanitizeNumeric(rawValue, 4)

    if (!numericValue) {
      setMinutes('')
      return
    }

    const clampedValue = Math.min(Number(numericValue), 1440)
    setMinutes(String(clampedValue))
  }

  const handleNoneSelection = (
    setDays: Dispatch<SetStateAction<string>>,
    setMinutes: Dispatch<SetStateAction<string>>
  ) => {
    setDays((prev) => {
      const nextValue = prev === '0' ? '' : '0'
      setMinutes(nextValue === '0' ? '0' : '')
      return nextValue
    })
  }

  const hasAnsweredActivity = (days: string, minutes: string) => {
    if (days === '') {
      return false
    }

    if (days === '0') {
      return true
    }

    return minutes !== '' && Number(minutes) > 0
  }

  const handleFrequencySelect = (
    setter: Dispatch<SetStateAction<string>>,
    value: string
  ) => {
    setter(value)
  }

  const handleAlcoholDaysChange = (value: string) => {
    setAlcoholDays(value)
    if (value === '0') {
      setAlcoholDoses('0')
      return
    }
    if (value !== '0' && alcoholDoses === '0') {
      setAlcoholDoses('1')
      return
    }
  }

  const isComplete = Boolean(
    age
    && gender
    && hasAnsweredActivity(walkDays, walkMinutes)
    && hasAnsweredActivity(moderateDays, moderateMinutes)
    && hasAnsweredActivity(vigorousDays, vigorousMinutes)
    && vegetableServings
    && fruitServings
    && processedServings
    && smoking
    && alcoholDays
    && (alcoholDays === '0' || alcoholDoses)
    && consultations
    && bloodTests
    && bloodTestsType
  )

  useEffect(() => {
    if (isComplete && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [isComplete])

  const questionGridClasses = ' grid h-full gap-8 sm:gap-10 pr-6 sm:pr-8 lg:pr-10 pt-1 overflow-y-auto scrollbar-dark lg:grid-cols-2 lg:gap-12'

  const genderOptions: InlineSelectOption[] = [
    { value: 'feminino', label: t('patientQuestionnaire.options.gender.female') },
    { value: 'masculino', label: t('patientQuestionnaire.options.gender.male') },
    { value: 'outro', label: t('patientQuestionnaire.options.gender.other') }
  ]

  const nutritionFrequencyOptions = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5+', label: t('patientQuestionnaire.options.nutrition.fivePlus') }
  ]

  const smokingOptions = [
    { value: 'nao', label: t('patientQuestionnaire.options.smoking.no') },
    { value: 'diariamente', label: t('patientQuestionnaire.options.smoking.daily') },
    { value: 'ocasionalmente', label: t('patientQuestionnaire.options.smoking.occasionally') },
    { value: 'ex-fumante', label: t('patientQuestionnaire.options.smoking.former') }
  ]

  const weekDaysOptions = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' }
  ]

  const alcoholDosesOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7+', label: '7+' }
  ]

  const consultationsOptions = [
    { value: 'presencial', label: t('patientQuestionnaire.options.consultations.inPerson') },
    { value: 'teleconsulta', label: t('patientQuestionnaire.options.consultations.telehealth') },
    { value: 'nao', label: t('patientQuestionnaire.options.consultations.none') }
  ]

  const bloodTestsOptions: InlineSelectOption[] = Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }))

  const bloodTestsTypeOptions = [
    { value: 'convencionais', label: t('patientQuestionnaire.options.bloodTestsType.conventional') },
    { value: 'point-of-care', label: t('patientQuestionnaire.options.bloodTestsType.poc') }
  ]

  return (
    <div className="container px-4 mx-auto text-white lg:px-12 flex flex-col gap-6 sm:gap-8 pt-4 sm:pt-6 pb-6 sm:pb-10 min-h-[calc(min(100svh,950px)-120px)] lg:h-[calc(min(100svh,950px)-120px)] lg:overflow-hidden">
      <div className="max-w-5xl text-center mx-auto space-y-3 sm:space-y-4 text-[13px] sm:text-sm leading-relaxed text-white/85">
        <p>{t('patientQuestionnaire.intro.p1')}</p>
        <p>{t('patientQuestionnaire.intro.p2')}</p>
        <p className="text-center font-semibold uppercase tracking-[0.35em] text-white/60">{t('patientQuestionnaire.intro.start')}</p>
      </div>

      <div className="max-w-5xl mx-auto flex-1 w-full overflow-hidden min-h-55 sm:min-h-65">
        <div className="glass-container flex-col! items-stretch! rounded-[36px]! h-full">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>
          <div className="glass-content items-stretch! h-full! justify-between!">
            <div className="flex-1 overflow-hidden">
              <div ref={scrollContainerRef} className={questionGridClasses}>
                <QuestionBlock
                  label={t('patientQuestionnaire.questions.q1.label')}
                  layout="inline">
                  <div className="relative w-20">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={3}
                      value={age}
                      onChange={(event) => handleAgeChange(event.target.value)}
                      className={numericInputShortClasses} />
                    {/*
                      <span
                        className="absolute inset-y-0 flex items-center text-xs font-semibold uppercase pointer-events-none right-6 text-white/60"
                      >
                        anos
                      </span>
                    */}
                  </div>
                </QuestionBlock>

                <QuestionBlock
                  label={t('patientQuestionnaire.questions.q2.label')}
                  layout="inline">
                  <InlineSelect
                    value={gender}
                    placeholder={t('patientQuestionnaire.common.select')}
                    options={genderOptions}
                    onChange={(optionValue) => setGender(optionValue as GenderOption)} />
                </QuestionBlock>

                <QuestionBlock label={t('patientQuestionnaire.questions.q3a.label')}>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <div className="relative w-20">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={2}
                        value={walkDays}
                        onChange={(event) => updateDays(event.target.value, setWalkDays, setWalkMinutes)}
                        className={numericInputShortClasses}
                        placeholder="0" />
                      {/*
                        <span
                          className="absolute inset-y-0 flex items-center text-xs font-semibold uppercase pointer-events-none right-6 text-white/60"
                        >
                          dias
                        </span>
                      */}
                    </div>
                    <ToggleButton
                      active={walkDays === '0'}
                      onClick={() => handleNoneSelection(setWalkDays, setWalkMinutes)}
                      size="compact">
                      {t('patientQuestionnaire.common.none')}
                    </ToggleButton>
                  </div>
                </QuestionBlock>

                <div className={`${walkDays === '' || walkDays === '0' ? 'opacity-50 pointer-events-none blur-sm' : ''}`}>
                  <QuestionBlock label={t('patientQuestionnaire.questions.q3b.label')}>
                    <div className="relative w-20">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={4}
                        value={walkMinutes}
                        onChange={(event) => updateMinutes(event.target.value, setWalkMinutes)}
                        className={numericInputShortClasses}
                        placeholder="0"
                        disabled={walkDays === '0'} />
                      {/*
                        <span
                          className={`
                            pointer-events-none absolute inset-y-0 right-6
                            flex items-center text-xs font-semibold uppercase
                            ${walkDays === '0' ? 'text-white/35' : 'text-white/60'}
                          `}
                        >
                          minutos
                        </span>
                      */}
                    </div>
                  </QuestionBlock>
                </div>

                <QuestionBlock label={t('patientQuestionnaire.questions.q4a.label')}>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <div className="relative w-20">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={2}
                        value={moderateDays}
                        onChange={(event) => updateDays(event.target.value, setModerateDays, setModerateMinutes)}
                        className={numericInputShortClasses}
                        placeholder="0" />
                      {/*
                        <span
                          className="absolute inset-y-0 flex items-center text-xs font-semibold uppercase pointer-events-none right-6 text-white/60"
                        >
                          dias
                        </span>
                      */}
                    </div>
                    <ToggleButton
                      active={moderateDays === '0'}
                      onClick={() => handleNoneSelection(setModerateDays, setModerateMinutes)}
                      size="compact">
                      {t('patientQuestionnaire.common.none')}
                    </ToggleButton>
                  </div>
                </QuestionBlock>

                <div className={`${moderateDays === '' || moderateDays === '0' ? 'opacity-50 pointer-events-none blur-sm' : ''}`}>
                  <QuestionBlock label={t('patientQuestionnaire.questions.q4b.label')}>
                    <div className="relative w-20">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={4}
                        value={moderateMinutes}
                        onChange={(event) => updateMinutes(event.target.value, setModerateMinutes)}
                        className={numericInputShortClasses}
                        placeholder="0"
                        disabled={moderateDays === '0'} />
                      {/*
                        <span
                          className={`
                            pointer-events-none absolute inset-y-0 right-6
                            flex items-center text-xs font-semibold uppercase
                            ${moderateDays === '0' ? 'text-white/35' : 'text-white/60'}
                          `}
                        >
                          minutos
                        </span>
                      */}
                    </div>
                  </QuestionBlock>
                </div>

                <QuestionBlock label={t('patientQuestionnaire.questions.q5a.label')}>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <div className="relative w-20">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={2}
                        value={vigorousDays}
                        onChange={(event) => updateDays(event.target.value, setVigorousDays, setVigorousMinutes)}
                        className={numericInputShortClasses}
                        placeholder="0" />
                      {/*
                        <span
                          className="absolute inset-y-0 flex items-center text-xs font-semibold uppercase pointer-events-none right-6 text-white/60"
                        >
                          dias
                        </span>
                      */}
                    </div>
                    <ToggleButton
                      active={vigorousDays === '0'}
                      onClick={() => handleNoneSelection(setVigorousDays, setVigorousMinutes)}
                      size="compact">
                      {t('patientQuestionnaire.common.none')}
                    </ToggleButton>
                  </div>
                </QuestionBlock>

                <div className={`${vigorousDays === '' || vigorousDays === '0' ? 'opacity-50 pointer-events-none blur-sm' : ''}`}>
                  <QuestionBlock label={t('patientQuestionnaire.questions.q5b.label')}>
                    <div className="relative w-20">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={4}
                        value={vigorousMinutes}
                        onChange={(event) => updateMinutes(event.target.value, setVigorousMinutes)}
                        className={numericInputShortClasses}
                        placeholder="0"
                        disabled={vigorousDays === '0'} />
                      {/*
                        <span
                          className={`
                            pointer-events-none absolute inset-y-0 right-6
                            flex items-center text-xs font-semibold uppercase
                            ${vigorousDays === '0' ? 'text-white/35' : 'text-white/60'}
                          `}
                        >
                          minutos
                        </span>
                      */}
                    </div>
                  </QuestionBlock>
                </div>

                <QuestionBlock label={t('patientQuestionnaire.questions.q6.label')}>
                  <div className="flex flex-wrap gap-3">
                    {nutritionFrequencyOptions.map((option) => (
                      <ToggleButton
                        key={option.value}
                        active={vegetableServings === option.value}
                        onClick={() => handleFrequencySelect(setVegetableServings, option.value)}>
                        {option.label}
                      </ToggleButton>
                    ))}
                  </div>
                </QuestionBlock>

                <QuestionBlock label={t('patientQuestionnaire.questions.q7.label')}>
                  <div className="flex flex-wrap gap-3">
                    {nutritionFrequencyOptions.map((option) => (
                      <ToggleButton
                        key={option.value}
                        active={fruitServings === option.value}
                        onClick={() => handleFrequencySelect(setFruitServings, option.value)}>
                        {option.label}
                      </ToggleButton>
                    ))}
                  </div>
                </QuestionBlock>

                <QuestionBlock label={t('patientQuestionnaire.questions.q8.label')}>
                  <div className="flex flex-wrap gap-3">
                    {nutritionFrequencyOptions.map((option) => (
                      <ToggleButton
                        key={option.value}
                        active={processedServings === option.value}
                        onClick={() => handleFrequencySelect(setProcessedServings, option.value)}>
                        {option.label}
                      </ToggleButton>
                    ))}
                  </div>
                </QuestionBlock>

                <QuestionBlock label={t('patientQuestionnaire.questions.q9.label')}>
                  <div className="flex flex-wrap gap-3">
                    {smokingOptions.map((option) => (
                      <ToggleButton
                        key={option.value}
                        active={smoking === option.value}
                        onClick={() => handleFrequencySelect(setSmoking, option.value)}>
                        {option.label}
                      </ToggleButton>
                    ))}
                  </div>
                </QuestionBlock>

                <QuestionBlock label={t('patientQuestionnaire.questions.q10.label')}>
                  <div className="flex flex-wrap gap-3">
                    {weekDaysOptions.map((option) => (
                      <ToggleButton
                        key={option.value}
                        active={alcoholDays === option.value}
                        onClick={() => handleAlcoholDaysChange(option.value)}>
                        {option.label}
                      </ToggleButton>
                    ))}
                  </div>
                </QuestionBlock>

                <div className={`${alcoholDays === '' || alcoholDays === '0' ? 'opacity-50 pointer-events-none blur-sm' : ''}`}>
                  <QuestionBlock label={t('patientQuestionnaire.questions.q11.label')}>
                    <div className="flex flex-wrap gap-3">
                      {alcoholDosesOptions.map((option) => {
                        const isDisabled = Number(alcoholDays) === 0
                        return (
                          <ToggleButton
                            key={option.value}
                            active={alcoholDoses === option.value && Number(alcoholDays) >= 1}
                            inactiveClasses={isDisabled ? 'text-white/40 hover:bg-white/5 hover:text-white/40 hover:cursor-not-allowed' : undefined}
                            onClick={() => handleFrequencySelect(setAlcoholDoses, option.value)}
                            disabled={isDisabled /* Desabilita caso a quantidade da questão 10 seja 0 */}>
                            {option.label}
                          </ToggleButton>
                        )
                      })}
                    </div>
                  </QuestionBlock>
                </div>

                <QuestionBlock label={t('patientQuestionnaire.questions.q12.label')}>
                  <div className="flex flex-wrap gap-3">
                    {consultationsOptions.map((option) => (
                      <ToggleButton
                        key={option.value}
                        active={consultations === option.value}
                        onClick={() => handleFrequencySelect(setConsultations, option.value)}>
                        {option.label}
                      </ToggleButton>
                    ))}
                  </div>
                </QuestionBlock>

                <QuestionBlock label={t('patientQuestionnaire.questions.q13.label')} layout="inline">
                  <InlineSelect
                    value={bloodTests}
                    placeholder="Selecione"
                    options={bloodTestsOptions}
                    onChange={setBloodTests} />
                </QuestionBlock>

                <QuestionBlock label={t('patientQuestionnaire.questions.q14.label')}>
                  <div className="flex flex-wrap gap-3">
                    {bloodTestsTypeOptions.map((option) => (
                      <ToggleButton
                        key={option.value}
                        active={bloodTestsType === option.value}
                        onClick={() => handleFrequencySelect(setBloodTestsType, option.value)}>
                        {option.label}
                      </ToggleButton>
                    ))}
                  </div>
                </QuestionBlock>
              </div>
            </div>

            {isComplete && (
              <div className="flex flex-col items-end">
                {submitError && (
                  <p className="text-sm font-medium text-red-400">
                    {t('patientQuestionnaire.common.saveErrorPrefix')}
                    {' '}
                    {submitError}
                  </p>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center justify-center px-8 py-3 text-white transition-colors rounded-full cursor-pointer w-38 sm:px-12 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                    <img src="/ui/button-next.png" alt="Next Button" className="absolute w-36 h-13" />
                    <span className="font-light z-1 text-md sm:text-md md:text-md">
                      {isSubmitting ? t('patientQuestionnaire.common.saving') : t('patientQuestionnaire.common.continue')}
                    </span>
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientQuestionnaire
