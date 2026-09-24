/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    selectLanguage: (language: 'br' | 'en' | 'es' | 'cn') => Chainable<void>
    goToStep: (step: number) => Chainable<void>
    waitForCalculation: () => Chainable<void>
  }
}
