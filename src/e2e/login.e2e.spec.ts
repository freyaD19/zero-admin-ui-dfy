import { test, expect } from '@playwright/test';

test.describe('登录页面', () => {
  test.beforeEach(async ({ page }) => {
    // 使用相对路径，baseURL 已在配置中设置
    await page.goto('/user/login');
  });

  test('应该显示登录表单', async ({ page }) => {
    // 检查页面标题
    await expect(page).toHaveTitle(/登录/);

    // 检查登录表单元素
    await expect(page.locator('input[id="username"]')).toBeVisible();
    await expect(page.locator('input[id="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // 检查记住我选项
    await expect(page.locator('input[type="checkbox"]')).toBeVisible();
  });

  test('应该能够成功登录', async ({ page }) => {
    // 填写登录表单
    await page.fill('input[id="username"]', 'admin');
    await page.fill('input[id="password"]', 'ant.design');

    // 点击登录按钮
    await page.click('button[type="submit"]');

    // 等待跳转到欢迎页
    await page.waitForURL('**/welcome');

    // 验证登录成功
    await expect(page).toHaveURL(/welcome/);
  });

  test('应该显示错误信息当密码错误', async ({ page }) => {
    // 填写错误的登录信息
    await page.fill('input[id="username"]', 'admin');
    await page.fill('input[id="password"]', 'wrongpassword');

    // 点击登录按钮
    await page.click('button[type="submit"]');

    // 等待错误提示出现
    await expect(page.locator('.ant-message')).toBeVisible();

    // 验证仍在登录页
    await expect(page).toHaveURL(/user\/login/);
  });

  test('记住用户名功能应该正常工作', async ({ page }) => {
    // 填写登录表单
    await page.fill('input[id="username"]', 'testuser');
    await page.fill('input[id="password"]', 'testpass');

    // 勾选记住我
    await page.check('input[type="checkbox"]');

    // 刷新页面
    await page.reload();

    // 验证用户名仍然存在
    const usernameValue = await page.inputValue('input[id="username"]');
    expect(usernameValue).toBe('testuser');
  });
});
