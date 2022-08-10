const { defineConfig } = require('cypress')


module.exports = defineConfig({
  projectId: 'ndnpvo',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    //embeddedScreenshots: false,
    inlineAssets: true,
    charts: true,
    html:false,
    json:true,
    reportDir:"cypress/reports",
    reportFilename:"report",
    overwrite :false,
    //screenshotOnRunFailure:false,
  },
  video: false,
  screenshotOnRunFailure:false,
  responseTimeout: 30000,
  requestTimeout: 15000,

  e2e: {
    baseUrl: 'https://widgets-bm.dev.digitalsportstech.com',

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

    },

  },

})
