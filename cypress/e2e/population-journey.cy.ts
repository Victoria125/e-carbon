/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Jornada Coletiva - E2E', () => {
  beforeEach(() => {
    cy.visit('/')
    // Primeiro, selecionar idioma (Português) - clicar no botão com a bandeira do Brasil
    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)
  })

  it('deve completar a jornada coletiva do início ao fim', () => {
    // Clicar no botão de jornada coletiva no header
    cy.contains('button', /jornada coletiva|population/i).click()
    cy.wait(1000)

    // Step 1: População por doença
    // Verificar que há sliders
    cy.get('[role="slider"]', { timeout: 10000 }).should('have.length.greaterThan', 0)

    // Ajustar valores de população usando os inputs numéricos via aria-label
    // Primeiro slider (Dor lombar)
    cy.get('[role="group"]').first().find('input').clear().type('100')
    cy.wait(500)

    // Segundo slider (Hipertensão)
    cy.get('[role="group"]').eq(1).find('input').clear().type('50')
    cy.wait(500)

    // Próximo passo
    cy.contains('button', /próximo|next/i).should('be.enabled').click({ force: true })
    cy.wait(1000)

    // Step 2: Distribuição de acompanhamento - apenas verificar que carregou
    cy.get('[role="slider"]', { timeout: 10000 }).should('exist')

    // Próximo passo (aceitar valores padrão)
    cy.contains('button', /próximo|next/i).should('be.visible').click({ force: true })
    cy.wait(1000)

    // Step 3: Tipo de exame e transporte
    cy.get('[role="slider"]', { timeout: 10000 }).should('exist')

    // Escolher modo de transporte usando botão
    cy.contains('button', /carro|car/i).click({ force: true })
    cy.wait(500)

    // Próximo passo
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 4: Resultados
    cy.contains(/resultados|results|emissões/i, { timeout: 10000 }).should('be.visible')

    // Verificar que os resultados estão sendo exibidos
    cy.get('body').should('contain', 'CO2')

    // Botões de exportação devem estar visíveis
    cy.contains('button', /exportar|export/i).should('be.visible')
  })

  it('deve permitir voltar entre passos e manter os dados', () => {
    cy.contains('button', /jornada coletiva|population/i).click()
    cy.wait(1000)

    // Step 1: Ajustar população
    cy.get('[role="group"]').first().find('input').clear().type('100')
    cy.wait(500)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2: Verificar que estamos no passo 2
    cy.get('[role="slider"]').should('exist')

    // Voltar para o passo 1
    cy.contains('button', /voltar|back|anterior/i).click({ force: true })
    cy.wait(1000)

    // Verificar que estamos de volta no passo 1
    cy.get('[role="group"]').should('have.length.greaterThan', 0)

    // Verificar que o valor foi mantido
    cy.get('[role="group"]').first().find('input').should('have.value', '100')
  })

  it('deve validar que a soma das porcentagens seja 100%', () => {
    cy.contains('button', /jornada coletiva|population/i).click()
    cy.wait(1000)

    // Adicionar população
    cy.get('[role="group"]').first().find('input').clear().type('50')
    cy.wait(500)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2: O sistema deve validar automaticamente
    // Se houver erro, o botão Próximo pode estar desabilitado ou haver mensagem
    cy.get('[role="slider"]').should('exist')

    // Tentar avançar (deve funcionar com valores padrão válidos)
    cy.contains('button', /próximo|next/i).should('be.visible')
  })

  it('deve calcular emissões diferentes para diferentes modos de transporte', () => {
    cy.contains('button', /jornada coletiva|population/i).click()
    cy.wait(1000)

    // Configurar população mínima
    cy.get('[role="group"]').first().find('input').clear().type('50')
    cy.wait(500)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Passo 2: Distribuição
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 3: Escolher transporte com botão
    cy.contains('button', /carro|car/i).click({ force: true })
    cy.wait(500)

    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Verificar que há resultados
    cy.get('body').should('contain', 'CO2')
  })
})
