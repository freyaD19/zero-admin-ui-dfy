// playwright.config.ts
import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // 指定测试目录
  testDir: './src/e2e',
  // 只匹配 .e2e.spec.ts 文件
  testMatch: '**/*.e2e.spec.ts',

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
    // 添加基础 URL
    baseURL: 'http://localhost:8001',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
};
export default config;
