'use client'

import { Slider, SliderRange, SliderThumb, SliderTrack } from '@radix-ui/react-slider'
import { ChevronLeft, ChevronRight, MinusIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Button, Group, Input, NumberField } from 'react-aria-components'

export interface SliderWithControlsProps {
  type?: 'percent' | 'decimal'
  label?: string
  value?: number
  onChange?: (value: number) => void
  maxValue?: number
  usePositionColumn?: boolean
  color?: string
  enableDynamicInputBackground?: boolean
}

const MAX_VALUE = 250

export default function SliderWithControls(props: Readonly<SliderWithControlsProps>) {
  const { type = 'percent', label = '', value, onChange, maxValue, usePositionColumn = false, color = '#52AE32', enableDynamicInputBackground = false } = props

  const [internalValue, setInternalValue] = useState(0)

  const isControlled = value !== undefined

  const currentValue = isControlled ? value : internalValue

  const handleChange = (newValue: number = 0) => {
    if (onChange) {
      onChange(newValue)
    }

    if (!isControlled) {
      setInternalValue(newValue)
    }
  }

  const effectiveMaxValue = maxValue ?? ((type === 'percent') ? 100 : MAX_VALUE)

  // Para o NumberField com formatOptions percent, precisa converter entre 0-100 e 0-1
  const displayValue = type === 'percent' ? currentValue / 100 : currentValue
  const displayMaxValue = type === 'percent' ? effectiveMaxValue / 100 : effectiveMaxValue
  const displayStep = type === 'percent' ? 0.01 : 1 // 0.01 = 1% quando multiplicado por 100

  const handleNumberFieldChange = (newValue: number) => {
    // Converter de volta de 0-1 para 0-100 quando é percent
    if (type === 'percent') {
      const internalValue = Math.round(newValue * 1000) / 10 // Arredondar para 1 casa decimal
      handleChange(internalValue)
    } else {
      handleChange(newValue)
    }
  }

  return (
    <div
      className={`
        flex h-[45px] items-center justify-between
        ${usePositionColumn ? 'position-column' : ''}
      `}>
      <div className="w-full h-[5px] flex bg-white/5 track-small-mobile flex-col items-center gradient-container glass-overlay glass-specular glass-content !px-2.5 !py-3.5 !rounded-full">
        <Slider
          min={0}
          max={effectiveMaxValue}
          step={1}
          value={[currentValue]}
          onValueChange={(newValue) => handleChange(newValue[0])}
          className="relative flex w-full h-full touch-none select-none items-center px-1">
          <SliderTrack className="slider-bar cursor-pointer relative h-5 w-full grow overflow-hidden rounded-full bg-black/8">
            <SliderRange className="absolute h-full shadow-[inset_0_-4px_4px_rgba(0,0,0,0.25)] rounded-full" style={{ backgroundColor: color }} />
          </SliderTrack>

          <SliderThumb className="cursor-pointer text-white text-lg h-12 w-12 thumb-small-mobile flex items-center justify-center rounded-full transition-colors focus-visible:outline-none">
            <div className="glass-filter"></div>
            <div className="glass-overlay"></div>
            <div className="glass-specular"></div>
            <div className="glass-content">
              <div className="flex">
                <ChevronLeft />
                <ChevronRight />
              </div>
            </div>
          </SliderThumb>
        </Slider>
      </div>

      <div className="ml-2 w-[150px] md:w-[175px] h-full flex flex-col items-center rounded-full">
        <NumberField
          minValue={0}
          maxValue={displayMaxValue}
          step={displayStep}
          formatOptions={{ style: type }}
          validationBehavior="aria"
          value={displayValue}
          onChange={handleNumberFieldChange}
          className="h-full w-full"
          aria-label={`Input ${label}`}>
          <Group className="w-full justify-end text-white gap-2 px-0.5 py-2.5 relative inline-flex h-full items-center overflow-hidden rounded-full text-sm whitespace-nowrap transition-[color,box-shadow] outline-none data-disabled:opacity-50">
            <Button
              slot="decrement"
              className="cursor-pointer h-[25px] hover:bg-accent gradient-container glass-filter glass-overlay glass-specular glass-content !p-0 bg-white/5 hover:text-white/80 -ms-px flex aspect-square items-center justify-center rounded-full text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
              <MinusIcon size={16} aria-hidden="true" />
            </Button>
            <div className="rounded-full">
              <Input className="gradient-container glass-overlay glass-specular glass-content leading-10 !px-0 w-[60px] h-[25px] translate-y-[-1px] outline-0 text-center tabular-nums" style={enableDynamicInputBackground ? { backgroundColor: currentValue > 0 ? color : 'transparent' } : {}} />
            </div>
            <Button
              slot="increment"
              className="cursor-pointer h-[25px] hover:bg-accent gradient-container glass-filter glass-overlay glass-specular glass-content !p-0 bg-white/5 hover:text-white/80 -me-px flex aspect-square items-center justify-center rounded-full text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
              <PlusIcon size={16} aria-hidden="true" />
            </Button>
          </Group>
        </NumberField>
      </div>
    </div>
  )
}
