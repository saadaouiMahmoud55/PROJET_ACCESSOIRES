// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      drag(subject: string, options?: Partial<Cypress.TypeOptions>): Chainable<Element>;
      dismiss(subject: string, options?: Partial<Cypress.TypeOptions>): Chainable<Element>;
      // Keep default `visit` signature from Cypress; don't redeclare here to avoid conflicts.
    }
  }
}

    export {}