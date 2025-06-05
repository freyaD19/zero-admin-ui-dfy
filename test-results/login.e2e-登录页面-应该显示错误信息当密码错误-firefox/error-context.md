# Test info

- Name: 登录页面 >> 应该显示错误信息当密码错误
- Location: /workspace/src/e2e/login.e2e.spec.ts:37:7

# Error details

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[id="username"]')

    at /workspace/src/e2e/login.e2e.spec.ts:39:16
```

# Page snapshot

```yaml
- text: Cannot GET /user/login
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('登录页面', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // 使用相对路径，baseURL 已在配置中设置
   6 |     await page.goto('/user/login');
   7 |   });
   8 |
   9 |   test('应该显示登录表单', async ({ page }) => {
  10 |     // 检查页面标题
  11 |     await expect(page).toHaveTitle(/登录/);
  12 |
  13 |     // 检查登录表单元素
  14 |     await expect(page.locator('input[id="username"]')).toBeVisible();
  15 |     await expect(page.locator('input[id="password"]')).toBeVisible();
  16 |     await expect(page.locator('button[type="submit"]')).toBeVisible();
  17 |
  18 |     // 检查记住我选项
  19 |     await expect(page.locator('input[type="checkbox"]')).toBeVisible();
  20 |   });
  21 |
  22 |   test('应该能够成功登录', async ({ page }) => {
  23 |     // 填写登录表单
  24 |     await page.fill('input[id="username"]', 'admin');
  25 |     await page.fill('input[id="password"]', 'ant.design');
  26 |
  27 |     // 点击登录按钮
  28 |     await page.click('button[type="submit"]');
  29 |
  30 |     // 等待跳转到欢迎页
  31 |     await page.waitForURL('**/welcome');
  32 |
  33 |     // 验证登录成功
  34 |     await expect(page).toHaveURL(/welcome/);
  35 |   });
  36 |
  37 |   test('应该显示错误信息当密码错误', async ({ page }) => {
  38 |     // 填写错误的登录信息
> 39 |     await page.fill('input[id="username"]', 'admin');
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
  40 |     await page.fill('input[id="password"]', 'wrongpassword');
  41 |
  42 |     // 点击登录按钮
  43 |     await page.click('button[type="submit"]');
  44 |
  45 |     // 等待错误提示出现
  46 |     await expect(page.locator('.ant-message')).toBeVisible();
  47 |
  48 |     // 验证仍在登录页
  49 |     await expect(page).toHaveURL(/user\/login/);
  50 |   });
  51 |
  52 |   test('记住用户名功能应该正常工作', async ({ page }) => {
  53 |     // 填写登录表单
  54 |     await page.fill('input[id="username"]', 'testuser');
  55 |     await page.fill('input[id="password"]', 'testpass');
  56 |
  57 |     // 勾选记住我
  58 |     await page.check('input[type="checkbox"]');
  59 |
  60 |     // 刷新页面
  61 |     await page.reload();
  62 |
  63 |     // 验证用户名仍然存在
  64 |     const usernameValue = await page.inputValue('input[id="username"]');
  65 |     expect(usernameValue).toBe('testuser');
  66 |   });
  67 | });
  68 |
```