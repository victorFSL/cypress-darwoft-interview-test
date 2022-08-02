const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  userAgent: 'Chrome/51.0.2704.103',
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'https://www.mercadolibre.com',
    setupNodeEvents(on, config) {
    },
  },
});
