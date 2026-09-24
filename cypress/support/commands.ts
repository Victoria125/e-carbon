/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

// Custom command to select language
// @ts-expect-error - Custom command declared in commands.d.ts
Cypress.Commands.add('selectLanguage', (language: 'br' | 'en' | 'es' | 'cn') => {
  cy.get('[data-testid="language-selector"]').should('be.visible')
  cy.get(`[data-testid="language-${language}"]`).click()
})

// Custom command to navigate to a step
// @ts-expect-error - Custom command declared in commands.d.ts
Cypress.Commands.add('goToStep', (step: number) => {
  for (let i = 1; i < step; i++) {
    cy.contains('button', /próximo|next|siguiente/i).click()
  }
})

// Custom command to wait for calculations
// @ts-expect-error - Custom command declared in commands.d.ts
Cypress.Commands.add('waitForCalculation', () => {
  cy.wait(500) // Wait for React state updates
})
