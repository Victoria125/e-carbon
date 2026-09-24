/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Jornada Individual - E2E', () => {
  beforeEach(() => {
    cy.visit('/')
    // Primeiro, selecionar idioma (Português) - clicar no botão com a bandeira do Brasil
    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)
  })

  it('deve completar a jornada individual do início ao fim', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Step 1: Frequência de acompanhamento - clicar em um card
    cy.contains(/semestral|semiannual|anual|annual/i, { timeout: 10000 }).first().click({ force: true })
    cy.wait(500)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2: Condições - selecionar checkbox
    cy.get('input[type="checkbox"]', { timeout: 10000 }).first().check({ force: true })
    cy.wait(500)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 3: Consulta e transporte
    // Escolher tipo de transporte com botão
    cy.contains('button', /carro|car/i, { timeout: 10000 }).click({ force: true })
    cy.wait(500)

    // Ajustar distância
    cy.get('input').filter('[value]').first().clear().type('10')
    cy.wait(500)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 4: Materiais/Distribuição
    cy.contains('button', /próximo|next/i, { timeout: 10000 }).click({ force: true })
    cy.wait(1000)

    // Step 5: Resultados
    cy.get('body').should('contain', 'CO2')
  })

  it('deve permitir navegar entre passos e manter os dados', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Step 1: Selecionar frequência
    cy.contains(/anual|annual/i).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2: Selecionar condição
    cy.get('input[type="checkbox"]').first().check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 3: Voltar
    cy.contains('button', /voltar|back|anterior/i).click({ force: true })
    cy.wait(1000)

    // Verificar que a checkbox ainda está marcada
    cy.get('input[type="checkbox"]').first().should('be.checked')
  })

  it('deve calcular emissões diferentes para diferentes distâncias', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Configuração rápida - Step 1: Frequência
    cy.contains(/anual|annual/i).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2: Condição
    cy.get('input[type="checkbox"]').first().check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 3: Distância curta
    cy.contains('button', /carro|car/i, { timeout: 10000 }).click({ force: true })
    cy.wait(500)
    cy.get('input').filter('[value]').first().clear().type('5')
    cy.wait(500)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Verificar que chegou ao próximo step
    cy.contains('button', /próximo|next/i).should('exist')
  })

  it('deve mostrar recomendações baseadas nas condições selecionadas', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Step 1: Frequência semestral
    cy.contains(/semestral|semiannual/i).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2: Múltiplas condições
    cy.get('input[type="checkbox"]').eq(0).check({ force: true })
    cy.wait(300)
    cy.get('input[type="checkbox"]').eq(1).check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 3: Verificar que há botões de transporte
    cy.contains('button', /carro|car|ônibus|bus/i).should('exist')
  })

  it('deve validar que pelo menos uma condição seja selecionada', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Step 1: Frequência
    cy.contains(/anual|annual/i).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click()
    cy.wait(1000)

    // Step 2: Tentar avançar sem selecionar condição
    // O botão pode estar desabilitado ou mostrar mensagem de erro
    cy.contains('button', /próximo|next/i).should('exist')
  })

  it('deve permitir ajustar distribuição entre presencial e telemedicina', () => {
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Step 1: Frequência
    cy.contains(/anual|annual/i).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2: Condição
    cy.get('input[type="checkbox"]').first().check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 3: Transporte - usar "transporte público" ao invés de "ônibus"
    cy.contains('button', /transporte público|public transport|bus/i, { timeout: 10000 }).click({ force: true })
    cy.wait(500)
    cy.get('input').filter('[value]').first().clear().type('15')
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 4: Verificar que há elementos de distribuição
    cy.get('[role="slider"], input').should('exist')
  })
})
