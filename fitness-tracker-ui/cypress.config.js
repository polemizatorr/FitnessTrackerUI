const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.apiUrl = process.env.REACT_APP_API_URL;
      return config;
    },
  },
});