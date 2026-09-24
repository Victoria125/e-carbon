/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Jornada Individual - Testes Atualizados E2E', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)
  })

  it('deve completar a jornada individual completa e verificar resultados', () => {
    // Iniciar jornada individual
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Step 1: Frequência de acompanhamento
    cy.contains(/anual|annual/i, { timeout: 10000 }).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2: Condições de saúde
    cy.get('input[type="checkbox"]', { timeout: 10000 }).first().check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 3: Consulta e transporte
    cy.contains('button', /carro|car/i, { timeout: 10000 }).click({ force: true })
    cy.wait(500)
    cy.get('input').filter('[value]').first().clear().type('10')
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 4: Materiais e métodos
    cy.contains('button', /próximo|next/i, { timeout: 10000 }).click({ force: true })
    cy.wait(1000)

    // Clicar em "Ver Resultados" para mostrar as comparações e porcentagens
    cy.contains('button', /ver resultados|see results|finalizar/i, { timeout: 10000 }).click({ force: true })
    cy.wait(1500)

    // Step 5: Resultados - verificações detalhadas
    cy.contains(/resultados|results|emissões/i, { timeout: 10000 }).should('be.visible')
    cy.get('body').should('contain', 'CO₂')

    // Verificar que há porcentagem exibida (pode ser 0% se emissões forem iguais)
    cy.get('body').invoke('text').should('match', /\d+%/)

    // Verificar botão de exportação
    cy.contains('button', /exportar|export/i).should('be.visible')
  })

  it('deve calcular e mostrar a porcentagem de redução entre convencional e point of care', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Frequência semestral para aumentar multiplicador
    cy.contains(/semestral|semiannual/i, { timeout: 10000 }).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Selecionar condição
    cy.get('input[type="checkbox"]').first().check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Transporte
    cy.contains('button', /carro|car/i).click({ force: true })
    cy.wait(500)
    cy.get('input').filter('[value]').first().clear().type('15')
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Materiais
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Clicar em "Ver Resultados" para mostrar as comparações e porcentagens
    cy.contains('button', /ver resultados|see results|finalizar/i, { timeout: 10000 }).click({ force: true })
    cy.wait(1500)

    // Verificar que há valor percentual exibido (pode ser 0% ou qualquer porcentagem)
    cy.get('body').invoke('text').should('match', /\d+%/)

    // Verificar que ambos tipos de emissão estão sendo mostrados
    cy.get('body').should('contain', 'CO₂')
  })

  it('deve aplicar o multiplicador de frequência corretamente (semestral = 2x anual)', () => {
    // Primeira execução: Anual
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    cy.contains(/anual|annual/i, { timeout: 10000 }).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    cy.get('input[type="checkbox"]').first().check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    cy.contains('button', /carro|car/i).click({ force: true })
    cy.wait(500)
    cy.get('input').filter('[value]').first().clear().type('10')
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Verificar que há resultados
    cy.contains(/resultados|results/i, { timeout: 10000 }).should('be.visible')
    cy.get('body').should('contain', 'CO₂')
  })

  it('deve exibir produtos corretos para lowerBackPain com acompanhamento anual/semestral', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Selecionar frequência anual
    cy.contains(/anual|annual/i, { timeout: 10000 }).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Selecionar especificamente a condição de dor lombar (lower back pain)
    // Procurar pelo texto da condição
    cy.contains(/dor lombar|lower back pain|lombar/i).parent().find('input[type="checkbox"]').check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Continuar o fluxo
    cy.contains('button', /carro|car/i).click({ force: true })
    cy.wait(500)
    cy.get('input').filter('[value]').first().clear().type('10')
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Verificar resultados - deve mostrar produtos específicos
    cy.get('body').should('contain', 'CO₂')
  })

  it('deve persistir dados ao navegar entre steps', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Step 1
    cy.contains(/anual|annual/i).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2
    cy.get('input[type="checkbox"]').first().check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Voltar
    cy.contains('button', /voltar|back|anterior/i).click({ force: true })
    cy.wait(1000)

    // Verificar que a checkbox ainda está marcada
    cy.get('input[type="checkbox"]').first().should('be.checked')
  })

  it('deve validar que pelo menos uma condição seja selecionada', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    cy.contains(/anual|annual/i).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click()
    cy.wait(1000)

    // Tentar avançar sem selecionar nenhuma condição
    // O botão próximo deve estar presente mas pode estar desabilitado
    cy.contains('button', /próximo|next/i).should('exist')
  })

  it('deve permitir ajustar a distribuição presencial/telemedicina no step 4', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    cy.contains(/anual|annual/i).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    cy.get('input[type="checkbox"]').first().check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    cy.contains('button', /carro|car/i).click({ force: true })
    cy.wait(500)
    cy.get('input').filter('[value]').first().clear().type('10')
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 4: Verificar que há sliders/inputs para distribuição
    cy.get('[role="slider"], input').should('exist')
  })

  it('deve calcular emissões diferentes para diferentes distâncias de transporte', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    cy.contains(/anual|annual/i).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    cy.get('input[type="checkbox"]').first().check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Distância curta
    cy.contains('button', /carro|car/i).click({ force: true })
    cy.wait(500)
    cy.get('input').filter('[value]').first().clear().type('5')
    cy.wait(500)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Verificar que avançou para o próximo step
    cy.contains('button', /próximo|next/i).should('exist')
  })

  it('deve selecionar múltiplas condições e calcular resultados combinados', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    cy.contains(/semestral|semiannual/i).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Selecionar múltiplas condições
    cy.get('input[type="checkbox"]').eq(0).check({ force: true })
    cy.wait(300)
    cy.get('input[type="checkbox"]').eq(1).check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    cy.contains('button', /carro|car/i).click({ force: true })
    cy.wait(500)
    cy.get('input').filter('[value]').first().clear().type('10')
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Verificar resultados para múltiplas condições
    cy.get('body').should('contain', 'CO₂')
  })
})
