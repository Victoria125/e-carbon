/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Debug - Verificar onde os testes param', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('img[alt="BR"]').first().click()
    cy.wait(1000)
  })

  it('deve completar step por step com logs detalhados', () => {
    cy.log('🚀 Iniciando jornada individual')
    cy.contains('button', /jornada individual|patient/i).click()
    cy.wait(1000)

    // Step 1
    cy.log('📍 STEP 1: Selecionando frequência')
    cy.contains(/anual|annual/i, { timeout: 10000 }).first().click({ force: true })
    cy.wait(500)
    cy.get('body').then(($body) => {
      cy.log('Step 1 - Body HTML:', $body.text().substring(0, 200))
    })
    cy.contains('button', /próximo|next/i).should('exist').then(($btn) => {
      cy.log('Botão próximo encontrado:', $btn.text())
    })
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 2
    cy.log('📍 STEP 2: Selecionando condições')
    cy.get('input[type="checkbox"]', { timeout: 10000 }).should('exist')
    cy.get('input[type="checkbox"]').first().check({ force: true })
    cy.wait(500)
    cy.get('body').then(($body) => {
      cy.log('Step 2 - Body HTML:', $body.text().substring(0, 200))
    })
    cy.contains('button', /próximo|next/i).should('exist')
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 3
    cy.log('📍 STEP 3: Selecionando transporte')
    cy.contains('button', /carro|car/i, { timeout: 10000 }).should('exist').then(($btn) => {
      cy.log('Botão carro encontrado:', $btn.text())
    })
    cy.contains('button', /carro|car/i).click({ force: true })
    cy.wait(500)

    cy.get('input').filter('[value]').first().should('exist').then(($input) => {
      cy.log('Input de distância encontrado:', $input.val())
    })
    cy.get('input').filter('[value]').first().clear().type('10')
    cy.wait(500)

    cy.get('body').then(($body) => {
      cy.log('Step 3 - Body HTML:', $body.text().substring(0, 200))
    })

    cy.contains('button', /próximo|next/i).should('exist').then(($btn) => {
      cy.log('Botão próximo step 3:', $btn.text())
    })
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(1000)

    // Step 4
    cy.log('📍 STEP 4: Materiais e métodos')
    cy.get('body', { timeout: 10000 }).then(($body) => {
      cy.log('Step 4 - Body HTML:', $body.text().substring(0, 500))
      cy.log('Step 4 - Há sliders?', $body.find('[role="slider"]').length)
      cy.log('Step 4 - Há inputs?', $body.find('input').length)
      cy.log('Step 4 - Há botão próximo?', $body.find('button').text().includes('Próximo') || $body.find('button').text().includes('Next'))
    })

    // Verificar se o botão próximo existe e está habilitado
    cy.contains('button', /próximo|next/i, { timeout: 10000 }).should('exist').then(($btn) => {
      cy.log('Botão próximo step 4:', $btn.text())
      cy.log('Botão desabilitado?', $btn.is(':disabled'))
    })

    // Tentar clicar no botão próximo
    cy.contains('button', /próximo|next/i).click({ force: true })
    cy.wait(2000)

    // Step 5
    cy.log('📍 STEP 5: Resultados')
    cy.get('body', { timeout: 10000 }).then(($body) => {
      cy.log('Step 5 - Body HTML completo:', $body.text())
      cy.log('Step 5 - Contém CO2?', $body.text().includes('CO₂'))
      cy.log('Step 5 - Contém emissões?', $body.text().includes('emissões') || $body.text().includes('emissions'))
    })

    // Verificar se chegou ao step de resultados
    cy.get('body').should('contain', 'CO₂')
  })
})
