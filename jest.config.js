module.exports = {
  // Base URL used by tests
  testURL: 'http://localhost:8000',

  // Display individual test results with the test suite hierarchy.
  verbose: false,

  // Jest >= v28 renamed `extraSetupFiles` to `setupFilesAfterEnv`.
  setupFilesAfterEnv: ['./tests/setupTests.js'],

  // Ignore E2E Playwright specs when running `npm test`.
  // They are executed separately via `npm run test:e2e`.
  testPathIgnorePatterns: ['/node_modules/', '/src/e2e/'],

  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false,
    localStorage: null,
  },
};
