const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  responseTimeout: 30000,
  requestTimeout: 15000,
  e2e: {
    baseUrl: 'https://widgets-bm.dev.digitalsportstech.com'
  },
})
