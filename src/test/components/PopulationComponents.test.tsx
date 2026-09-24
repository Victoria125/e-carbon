/**
 * Testes de Componentes - Jornada Populacional
 *
 * Este arquivo testa a renderização e comportamento dos componentes
 * da jornada populacional (Population Journey).
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PopulationStep1 } from '@/components/population/PopulationStep1'
import { PopulationStep4 } from '@/components/population/PopulationStep4'
import LanguageProvider from '@/context/Language/LanguageProvider'
import { PopulationProvider } from '@/context/Population/PopulationProvider'

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <LanguageProvider>
      <PopulationProvider>
        {ui}
      </PopulationProvider>
    </LanguageProvider>
  )
}

describe('population step 1 - population input', () => {
  it('should render all disease labels', () => {
    renderWithProviders(<PopulationStep1 />)

    // Verificar se os labels das doenças estão presentes
    expect(screen.getByText(/dor lombar/i)).toBeInTheDocument()
    expect(screen.getByText(/hipertensão/i)).toBeInTheDocument()
    expect(screen.getByText(/diabetes/i)).toBeInTheDocument()
    expect(screen.getByText(/sobrepeso\/obesidade/i)).toBeInTheDocument()
  })

  it('should display initial total as zero', () => {
    renderWithProviders(<PopulationStep1 />)

    // Deve mostrar "0 pessoas" inicialmente
    expect(screen.getByText(/0\s+pessoas/i)).toBeInTheDocument()
  })

  it('should render sliders for all diseases', () => {
    renderWithProviders(<PopulationStep1 />)

    // Deve ter 5 sliders (um por doença/condição)
    const sliders = screen.getAllByRole('slider')
    expect(sliders).toHaveLength(5)
  })

  it('should have all sliders starting at zero', () => {
    renderWithProviders(<PopulationStep1 />)

    const sliders = screen.getAllByRole('slider')

    for (const slider of sliders) {
      expect(slider).toHaveAttribute('aria-valuenow', '0')
    }
  })

  it('should render increment/decrement buttons', () => {
    renderWithProviders(<PopulationStep1 />)

    // Deve haver botões de incremento e decremento
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})

describe('population step 4 - results display', () => {
  it('should not render when no valid data', () => {
    const { container } = renderWithProviders(<PopulationStep4 />)

    // Com população = 0 e sem dados válidos, não deve renderizar
    expect(container.firstChild).toBeNull()
  })

  it('should return null without validation', () => {
    const { container } = renderWithProviders(<PopulationStep4 />)

    // Sem dados validados, o componente retorna null
    expect(container.firstChild).toBeNull()
  })
})
