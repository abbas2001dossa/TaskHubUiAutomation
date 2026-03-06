    // playwright.config.js
    const { defineConfig } = require('@playwright/test');

    module.exports = defineConfig({
      testDir: './tests', // Directory where your test files are located
      timeout: 30 * 1000, // Maximum time for a test to run
      expect: {
        timeout: 5000, // Maximum time for an assertion to pass
      },
      use: {
        browserName: 'chromium', // Default browser to use
        headless: true, // Run tests in headless mode (no browser UI)
        screenshot: 'on', // Capture screenshots on every test action
        trace: 'on-first-retry', // Capture trace on first retry
      },
      projects: [
        {
          name: 'chromium',
          use: { 
            ...require('@playwright/test').devices['Desktop Chrome'],
            screenshot: 'on',
            trace: 'on-first-retry',
          },
        },
        {
          name: 'firefox',
          use: { 
            ...require('@playwright/test').devices['Desktop Firefox'],
            screenshot: 'on',
            trace: 'on-first-retry',
          },
        },
        {
          name: 'webkit',
          use: { 
            ...require('@playwright/test').devices['Desktop Safari'],
            screenshot: 'on',
            trace: 'on-first-retry',
          },
        },
      ],
      reporter: [
        ['html'], // Generate an HTML report
        ['json', { outputFile: 'test-results/results.json' }], // JSON report
      ],
    });