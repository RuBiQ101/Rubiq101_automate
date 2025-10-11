import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should signup and login', async ({ page }) => {
    // Go to signup page
    await page.goto('/signup');
    await expect(page).toHaveTitle(/AI Workflow Platform/);

    // Fill signup form
    await page.fill('input[placeholder="Name"]', 'E2E Test User');
    await page.fill('input[placeholder="Email"]', `e2e_${Date.now()}@example.com`);
    await page.fill('input[placeholder="Password"]', 'testpassword123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should redirect to workflows page
    await expect(page).toHaveURL(/\/workflows/);
    await expect(page.locator('h1')).toContainText('Your Workflows');
  });

  test('should login existing user', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[placeholder="Email"]', 'e2e@example.com');
    await page.fill('input[placeholder="Password"]', 'testpassword123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/\/workflows/);
  });
});
