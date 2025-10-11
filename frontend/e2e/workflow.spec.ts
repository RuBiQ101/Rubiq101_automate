import { test, expect } from '@playwright/test';

test.describe('Workflow Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[placeholder="Email"]', 'e2e@example.com');
    await page.fill('input[placeholder="Password"]', 'testpassword123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/workflows/);
  });

  test('should create new workflow', async ({ page }) => {
    await page.click('text=Create New');
    await expect(page).toHaveURL(/\/workflows\/new/);
    
    await page.fill('input[placeholder="Name"]', 'Test Workflow');
    await page.fill('textarea[placeholder="Description"]', 'E2E test workflow');
    await page.click('button:text("Create")');
    
    // Should redirect to editor
    await expect(page).toHaveURL(/\/workflows\/[^/]+$/);
    await expect(page.locator('h1')).toContainText('Test Workflow');
  });

  test('should add nodes to workflow canvas', async ({ page }) => {
    // Assuming we're on a workflow editor page
    await page.goto('/workflows/new');
    await page.fill('input[placeholder="Name"]', 'Canvas Test');
    await page.click('button:text("Create")');
    
    // Add trigger node
    await page.click('button:text("+ Trigger")');
    await expect(page.locator('[data-testid="node"]')).toHaveCount(1);
    
    // Add AI node
    await page.click('button:text("+ AI Step")');
    await expect(page.locator('[data-testid="node"]')).toHaveCount(2);
  });
});
