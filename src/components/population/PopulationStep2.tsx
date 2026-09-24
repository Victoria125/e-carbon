import type { FollowUpDistribution } from '@/types/population'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import AjudinhaPopover from '@/components/ui/ajudinha-popover'
import { Label } from '@/components/ui/label'
import SectionHeader from '@/components/ui/section-header'
import SliderWithControls from '@/components/ui/slider-with-controls'
import useLanguage from '@/hooks/useLanguage'
import { usePopulation } from '@/hooks/usePopulation'

const ACCORDION_SUFFIX = '-accordion'

type ConditionKey = 'lowerBackPain' | 'hypertension' | 'diabetes' | 'overweight' | 'noChronicConditions'

interface Condition {
  key: ConditionKey
  label: string
  people: number
}

interface SliderFieldProps {
  label: string
  value: number
  onChange: (value: number) => void
  maxValue: number
  color?: string
}

function SliderField({ label, value, onChange, maxValue, color }: Readonly<SliderFieldProps>) {
  return (
    <div>
      <Label>{label}</Label>
      <SliderWithControls type="decimal" value={value} onChange={onChange} maxValue={maxValue} color={color} enableDynamicInputBackground={true} />
    </div>
  )
}

export function PopulationStep2() {
  const { population, followUp, updateFollowUp } = usePopulation()
  const { t } = useLanguage()

  const conditions = useMemo<Condition[]>(
    () => [
      { key: 'lowerBackPain', label: t('step1.lowerBackPain'), people: population.lowerBackPain },
      { key: 'hypertension', label: t('step1.hypertension'), people: population.hypertension },
      { key: 'diabetes', label: t('step1.diabetes'), people: population.diabetes },
      { key: 'overweight', label: t('step1.overweight'), people: population.overweight },
      { key: 'noChronicConditions', label: t('step1.noChronicConditions'), people: population.noChronicConditions }
    ],
    [t, population]
  )

  const visibleConditions = useMemo(
    () => conditions.filter((condition) => condition.people > 0),
    [conditions]
  )

  // const initialOpenAccordions = useMemo(
  //   () => visibleConditions.slice(0, TOP_SECTION_COUNT).map((c) => `${c.key}${ACCORDION_SUFFIX}`),
  //   [visibleConditions]
  // )
  // const [openAccordions, setOpenAccordions] = useState<string[]>(initialOpenAccordions)

  // Todos os Accordions por padrão iniciam fechados, como alinhado com equipe de design.
  const [openAccordions, setOpenAccordions] = useState<string[]>([])

  const getRowAccordionIds = useCallback(
    (rowIndex: number): string[] => (
      visibleConditions
        .map((condition, index) => ({ condition, index }))
        .filter(({ index }) => Math.floor(index / 2) === rowIndex)
        .map(({ condition }) => `${condition.key}${ACCORDION_SUFFIX}`)
    ),
    [visibleConditions]
  )

  const findChangedAccordion = useCallback(
    (current: string[], previous: string[]) => {
      if (current.length > previous.length) {
        const opened = current.find((id) => !previous.includes(id))
        return opened ? { id: opened, action: 'open' } : null
      }

      if (current.length < previous.length) {
        const closed = previous.find((id) => !current.includes(id))
        return closed ? { id: closed, action: 'close' } : null
      }

      return null
    },
    []
  )

  const handleAccordionChange = useCallback(
    (value: string[]) => {
      const change = findChangedAccordion(value, openAccordions)

      if (!change) {
        setOpenAccordions(value)
        return
      }

      const accordionIndex = visibleConditions.findIndex((c) => `${c.key}${ACCORDION_SUFFIX}` === change.id)

      if (accordionIndex === -1) {
        setOpenAccordions(value)
        return
      }

      const rowIndex = Math.floor(accordionIndex / 2)

      if (change.action === 'open') {
        const rowIds = getRowAccordionIds(rowIndex)
        setOpenAccordions(rowIds)
        return
      }

      // Ao fechar um accordion, fechamos a linha inteira (nenhum fica aberto)
      setOpenAccordions([])
    },
    [openAccordions, visibleConditions, getRowAccordionIds, findChangedAccordion]
  )

  const createFollowUpUpdater = useCallback(
    (disease: ConditionKey, totalPeople: number) =>
      (type: keyof FollowUpDistribution, peopleCount: number) => {
        // Converter pessoas para porcentagem antes de salvar
        const percentage = totalPeople > 0 ? (peopleCount / totalPeople) * 100 : 0
        updateFollowUp(disease, type, percentage)
      },
    [updateFollowUp]
  )

  const renderCondition = (condition: Condition, index: number) => {
    if (condition.people === 0) return null

    const distribution = followUp[condition.key]
    const updateDisease = createFollowUpUpdater(condition.key, condition.people)
    const isFirstCondition = index === 0

    // Converter porcentagens para pessoas
    const noneCount = Math.round((distribution.none * condition.people) / 100)
    const annualCount = Math.round((distribution.annual * condition.people) / 100)
    const semiannualCount = Math.round((distribution.semiannual * condition.people) / 100)

    const sum = noneCount + annualCount + semiannualCount
    const isValid = sum === condition.people
    const isAllZero = noneCount === 0 && annualCount === 0 && semiannualCount === 0

    const barColor = (!isAllZero && !isValid) ? '#b10101' : '#52AE32'

    return (
      <div
        key={condition.key}
        className="transition-colors md:basis-[80%] xl:basis-[42.5%] my-2">
        <div className="flex">
          <Accordion
            className="w-full"
            type="multiple"
            value={openAccordions}
            onValueChange={handleAccordionChange}>
            <AccordionItem value={`${condition.key}${ACCORDION_SUFFIX}`}>
              <div className="flex items-center justify-between w-full">
                <motion.div
                  whileHover={{ scaleY: 1.1 }}
                  className="w-full">
                  <AccordionTrigger className="items-center h-11.25 cursor-pointer w-full rounded-full gradient-border uppercase">
                    <div className="glass-container">
                      <div className="glass-filter"></div>
                      <div className="glass-overlay"></div>
                      <div className="glass-specular"></div>
                      <div className="glass-content">
                        {`${condition.label} - ${sum.toLocaleString()} / ${condition.people.toLocaleString()} ${t('step2.people')} (${((sum / condition.people) * 100).toFixed(0)}%)`}
                      </div>
                    </div>
                  </AccordionTrigger>
                </motion.div>
                {isFirstCondition && (
                  <AjudinhaPopover
                    key={`popover-${condition.key}`}
                    defaultOpen={isFirstCondition}
                    hideTrigger={true}
                    triggerClassName="absolute"
                    side="right"
                    align="center"
                    contentClassName="w-full max-w-[200px] mt-35 rounded-4xl border-2 border-[#EE00FF] bg-[#01244CBA] shadow-lg"
                    contentText={(
                      <>
                        <img
                          src="ui/icon-hand-up.png"
                          alt="Purple Hand Up"
                          className="absolute -top-9 -left-12 w-17" />
                        <div className="flex flex-col gap-0 text-center font-light text-[15px] text-[#E0E0E0]">
                          <p className="text-light text-[12px]">
                            {t('step2.population.clickButtonsHint')}
                          </p>
                        </div>
                      </>
                    )} />
                )}
                <div
                  className="ml-2 flex items-center justify-center rounded-full sm:w-37.5 md:w-43.75"
                  style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 300, background: 'transparent' }}>
                  <AnimatePresence mode="wait">
                    {isAllZero && (
                      <motion.span
                        key="allZero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center ml-4 w-full text-[13px]"
                        style={{ color: '#9BEA15' }}>
                        {`${t('step2.population.total')} ${condition.people} ${t('step2.people')}`}
                      </motion.span>
                    )}
                    {isValid && !isAllZero && (
                      <motion.span
                        key="valid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-end mr-9 w-full text-[14px]"
                        style={{ color: '#9BEA15' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 25,
                            height: 25,
                            background: '#52AE32',
                            borderRadius: '50%',
                            color: '#fff',
                            border: '3px solid #FFFF',
                            fontWeight: 500,
                            fontSize: 20,
                            marginRight: 16
                          }}>
                          ✓
                        </span>
                      </motion.span>
                    )}
                    {!isAllZero && !isValid && (
                      <motion.span
                        key="invalid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, x: [0, -5, 5, -5, 5, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center w-full text-[12px]"
                        style={{ color: '#FF5A5A' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 25,
                            height: 25,
                            background: '#B10101',
                            borderRadius: '205px',
                            color: '#fff',
                            fontWeight: 500,
                            fontSize: 22,
                            marginLeft: 10,
                            marginRight: 10
                          }}>
                          !
                        </span>
                        <p className="w-22">
                          {`${t('step2.population.totalMustBe')} ${condition.people}`}
                        </p>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <AccordionContent className="w-full flex flex-col gap-y-2 pt-2 mb-0.5">
                <SliderField
                  label={t('followUpTypes.semiannual')}
                  value={semiannualCount}
                  onChange={(value) => updateDisease('semiannual', value)}
                  maxValue={condition.people}
                  color={barColor} />
                <SliderField
                  label={t('followUpTypes.annual')}
                  value={annualCount}
                  onChange={(value) => updateDisease('annual', value)}
                  maxValue={condition.people}
                  color={barColor} />
                <SliderField
                  label={t('followUpTypes.none')}
                  value={noneCount}
                  onChange={(value) => updateDisease('none', value)}
                  maxValue={condition.people}
                  color={barColor} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-start gap-0 pt-10 pb-6.5 lg:gap-5">
        <SectionHeader
          title={t('step2.population.sectionTitle')}
          subtitle={t('step2.population.sectionSubtitle')} />
        <AjudinhaPopover
          className=""
          imageSrc="/lightbulb.png"
          triggerText=""
          triggerClassName="flex items-end h-[36px] gap-1 px-2 text-white text-sm backdrop-blur rounded-lg"
          side="right"
          align="end"
          contentClassName="w-full max-w-[500px] mt-10 rounded-3xl border-2 border-[#9BEA15] bg-[#032F6200] shadow-lg"
          contentText={(
            <div className="flex flex-col gap-0 text-justify font-light text-[15px] text-[#E0E0E0]">
              <p className="text-light text-[12px]">
                <span className="text-[#9BEA15] font-semibold">
                  {t('step2.population.importantHint')}
                </span>
                <span>
                  {t('step2.population.importantHintText')}
                </span>
              </p>
              <p className="mt-2 text-light text-[12px]">
                <span className="font-semibold">
                  {t('step2.population.example')}
                </span>
                <span>
                  {t('step2.population.exampleText')}
                </span>
              </p>
            </div>
          )} />
      </div>
      <div className="flex flex-wrap gap-x-20 gap-y-1.5 justify-between items-center">
        {visibleConditions.map((condition, index) => renderCondition(condition, index))}
      </div>
    </div>
  )
}
