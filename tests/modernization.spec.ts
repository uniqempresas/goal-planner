import { test, expect } from '@playwright/test';

test('Goal Form Modernization Verification', async ({ page }) => {
  // 1. Login
  await page.goto('http://localhost:5173/login');
  await page.fill('input[id="email"]', 'joao@example.com');
  await page.fill('input[id="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('http://localhost:5173/dashboard');

  // 2. Navigate to Create Annual Goal
  await page.goto('http://localhost:5173/metas/anual/criar');

  // Verify page title
  await expect(page.locator('h1')).toContainText('Criar Meta Anual');

  // 3. Verify Wizard UI (Buttons)
  await expect(page.getByRole('button', { name: 'Próximo' })).toBeVisible();

  // 4. Verify form fields exist
  await expect(page.getByLabel('Título')).toBeVisible();

  console.log('Modernization Verification: SUCCESS');
});
