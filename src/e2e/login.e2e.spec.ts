import { test, expect } from '@playwright/test';

test.describe('登录功能测试', () => {
  test.beforeEach(async ({ page }) => {
    // 访问登录页面
    await page.goto('http://localhost:8000/user/login');
  });

  test('应该显示登录表单', async ({ page }) => {
    // 检查页面标题
    await expect(page).toHaveTitle(/Ant Design Pro/);

    // 检查用户名输入框
    const usernameInput = page.locator('#username');
    await expect(usernameInput).toBeVisible();

    // 检查密码输入框
    const passwordInput = page.locator('#password');
    await expect(passwordInput).toBeVisible();

    // 检查登录按钮
    const loginButton = page.locator('button[type="submit"]');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toHaveText('登录');
  });

  test('应该能使用默认账户登录', async ({ page }) => {
    // 输入用户名
    await page.fill('#username', 'admin');

    // 输入密码
    await page.fill('#password', 'ant.design');

    // 点击登录按钮
    await page.click('button[type="submit"]');

    // 等待页面跳转
    await page.waitForNavigation();

    // 验证登录成功后跳转到首页
    await expect(page).toHaveURL(/\/$/);

    // 验证用户信息显示
    const userDropdown = page.locator('.ant-dropdown-trigger');
    await expect(userDropdown).toBeVisible();
  });

  test('应该显示错误信息当密码错误时', async ({ page }) => {
    // 输入用户名
    await page.fill('#username', 'admin');

    // 输入错误的密码
    await page.fill('#password', 'wrongpassword');

    // 点击登录按钮
    await page.click('button[type="submit"]');

    // 等待错误提示
    const errorMessage = page.locator('.ant-alert-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('账户或密码错误');
  });

  test('应该能够记住用户名', async ({ page }) => {
    // 输入用户名
    await page.fill('#username', 'testuser');

    // 勾选记住用户名
    await page.check('input[type="checkbox"]');

    // 输入密码并登录
    await page.fill('#password', 'ant.design');
    await page.click('button[type="submit"]');

    // 再次访问登录页面
    await page.goto('http://localhost:8000/user/login');

    // 验证用户名被记住
    const usernameInput = page.locator('#username');
    await expect(usernameInput).toHaveValue('testuser');
  });
});
