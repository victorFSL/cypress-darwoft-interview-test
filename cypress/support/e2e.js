// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// The mercado libre website has an error and is being caught by cypress, I am just ignoring it.
Cypress.on('uncaught:exception', (e, runnable) => {
  if(e.message.includes("Cannot read properties of undefined")) {
    return false;
  }
})
// Alternatively you can use CommonJS syntax:
// require('./commands')
