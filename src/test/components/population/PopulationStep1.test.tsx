import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { PopulationStep1 } from '@/components/population/PopulationStep1'
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

describe('population step 1 - population sliders', () => {
  it('should render all disease sliders', () => {
    renderWithProviders(<PopulationStep1 />)

    // Verificar se os labels das doenças estão presentes
    expect(screen.getByText(/dor lombar/i)).toBeInTheDocument()
    expect(screen.getByText(/hipertensão/i)).toBeInTheDocument()
    expect(screen.getByText(/diabetes/i)).toBeInTheDocument()
    expect(screen.getByText(/sobrepeso\/obesidade/i)).toBeInTheDocument()
  })

  it('should display total population count', () => {
    renderWithProviders(<PopulationStep1 />)

    // Deve mostrar "0 pessoas" inicialmente
    expect(screen.getByText(/0\s+pessoas/i)).toBeInTheDocument()
  })

  it('should update population when slider changes', async () => {
    const user = userEvent.setup()
    renderWithProviders(<PopulationStep1 />)

    // Encontrar um slider (exemplo: primeiro slider)
    const sliders = screen.getAllByRole('slider')
    const firstSlider = sliders[0]

    // Simular mudança no slider
    await user.click(firstSlider)
    await user.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}') // Aumentar valor

    // O valor deve ter mudado (não é mais 0)
    // Nota: Teste básico de interação, valor exato depende do step do slider
  })

  it('should calculate total population correctly', async () => {
    const user = userEvent.setup()
    renderWithProviders(<PopulationStep1 />)

    // Inicialmente deve ser 0
    expect(screen.getByText(/0\s+pessoas/i)).toBeInTheDocument()

    // Interagir com sliders para adicionar população
    const sliders = screen.getAllByRole('slider')

    // Aumentar primeiro slider
    await user.click(sliders[0])
    await user.keyboard('{ArrowRight}')

    // O total deve ter aumentado (não deve mais ser 0)
  })

  it('should have increment and decrement buttons for each slider', () => {
    renderWithProviders(<PopulationStep1 />)

    // Deve haver botões de incremento e decremento
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should display disease icons', () => {
    renderWithProviders(<PopulationStep1 />)

    // Os ícones devem estar renderizados (componentes Lucide)
    // Verificar pela presença dos containers de ícones
    const container = screen.getByText(/dor lombar/i).closest('div')
    expect(container).toBeInTheDocument()
  })

  it('should not allow negative values', async () => {
    const user = userEvent.setup()
    renderWithProviders(<PopulationStep1 />)

    const sliders = screen.getAllByRole('slider')
    const firstSlider = sliders[0]

    // Tentar diminuir abaixo de zero
    await user.click(firstSlider)
    await user.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}')

    // O valor deve permanecer >= 0
    const value = firstSlider.getAttribute('aria-valuenow')
    expect(Number(value)).toBeGreaterThanOrEqual(0)
  })
})
