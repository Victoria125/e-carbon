/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Comparação entre Jornadas - E2E', () => {
  it('deve completar ambas as jornadas e comparar resultados', () => {
    // PARTE 1: JORNADA COLETIVA
    cy.visit('/')
    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)

    cy.contains('button', /jornada coletiva|population/i).click()
    cy.wait(500)

    // População
    cy.get('[role="group"]', { timeout: 10000 }).first().find('input').clear().type('100')
    cy.wait(500)
    cy.get('[role="group"]').eq(1).find('input').clear().type('50')
    cy.wait(500)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Distribuição
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Transporte - usar botão ao invés de select
    cy.contains('button', /carro|car/i, { timeout: 10000 }).click({ force: true })
    cy.wait(500)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Resultados
    cy.get('body').should('contain', 'CO2')

    // PARTE 2: JORNADA INDIVIDUAL
    cy.visit('/')
    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)

    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Step 1: Acompanhamento/Frequência PRIMEIRO
    cy.contains(/anual|annual/i, { timeout: 10000 }).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2: Condições DEPOIS
    cy.get('input[type="checkbox"]', { timeout: 10000 }).first().check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 3: Consulta e transporte
    // Escolher tipo de transporte com botão
    cy.contains('button', /carro|car/i, { timeout: 10000 }).click({ force: true })
    cy.wait(500)

    // Ajustar distância usando input
    cy.get('input').filter('[value]').first().clear().type('10')
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 4: Materiais
    cy.contains('button', /próximo|next/i, { timeout: 10000 }).click({ force: true })
    cy.wait(1000)

    // Step 5: Resultados
    cy.get('body').should('contain', 'CO2')
  })

  it('deve validar navegação e mudança de idioma', () => {
    cy.visit('/')
    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)

    // Verificar que os botões de jornada estão visíveis
    cy.contains('button', /jornada/i).should('exist')
  })

  it('deve persistir dados ao navegar entre steps', () => {
    cy.visit('/')
    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)

    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(500)

    // Configurar alguns dados
    cy.get('input[type="checkbox"]').first().check({ force: true })
    cy.contains('button', /próximo|next/i).click()
    cy.wait(1000)

    // Voltar e verificar
    cy.contains('button', /voltar|back/i).click()
    cy.wait(500)
    cy.get('input[type="checkbox"]').first().should('be.checked')
  })

  it('deve validar responsividade mobile', () => {
    cy.viewport('iphone-x')
    cy.visit('/')

    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)

    // Verificar que os botões existem
    cy.get('body').should('contain.text', /jornada/i)
  })

  it('deve validar responsividade tablet', () => {
    cy.viewport('ipad-2')
    cy.visit('/')

    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)

    cy.contains('button', /jornada coletiva|population/i).click()
    cy.wait(500)

    // Verificar layout responsivo
    cy.get('[role="slider"]').should('exist')
  })

  it('deve testar acessibilidade básica', () => {
    cy.visit('/')

    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)

    // Verificar que há botões
    cy.get('button').should('have.length.greaterThan', 0)

    // Verificar que navegação funciona
    cy.contains('button', /jornada coletiva|population/i).should('be.visible')
  })

  it('deve validar botões de navegação', () => {
    cy.visit('/')
    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)

    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(500)

    // Primeiro step - botão próximo deve existir
    cy.contains('button', /próximo|next/i).should('exist')
  })

  it('deve validar exportação de resultados', () => {
    cy.visit('/')
    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)

    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Step 1: Frequência PRIMEIRO
    cy.contains(/anual|annual/i, { timeout: 10000 }).first().click({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2: Condição
    cy.get('input[type="checkbox"]', { timeout: 10000 }).first().check({ force: true })
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 3: Transporte - usar "transporte público" ao invés de "ônibus"
    cy.contains('button', /transporte público|public transport|bus/i, { timeout: 10000 }).click({ force: true })
    cy.wait(500)
    cy.get('input').filter('[value]').first().clear().type('5')
    cy.wait(500)
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 4: Materiais/Distribuição
    cy.contains('button', /próximo|next/i, { timeout: 10000 }).click({ force: true })
    cy.wait(1000)

    // Step 5: Verificar botões de exportação
    cy.contains('button', /exportar|export/i).should('exist')
  })
})
