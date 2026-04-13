import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Scenario 1: Chrome Only - PARALLEL (Fast)
    {
      name: 'chromium-parallel',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/gallery.spec.js',
      fullyParallel: true,
      workers: 4,
    },
    
    // Scenario 2: Multi-Browser - SEQUENTIAL (Comprehensive)
    {
      name: 'chromium-sequential',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/gallery.spec.js',
      fullyParallel: false,
      workers: 1,
    },
    {
      name: 'firefox-sequential',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/gallery.spec.js',
      fullyParallel: false,
      workers: 1,
    },
    {
      name: 'webkit-sequential',
      use: { ...devices['Desktop Safari'] },
      testMatch: '**/gallery.spec.js',
      fullyParallel: false,
      workers: 1,
    },
  ],

  webServer: process.env.CI ? {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 300000,
    stdout: 'pipe',
    stderr: 'pipe',
  } : undefined,
});
