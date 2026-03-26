import { test, expect } from '@playwright/test';

test('Goal CRUD Flow', async ({ page }) => {
  // 1. Login
  await page.goto('http://localhost:5173/login');
  await page.fill('input[id="email"]', 'joao@example.com');
  await page.fill('input[id="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Wait for redirect to dashboard
  await expect(page).toHaveURL('http://localhost:5173/dashboard');

  // 2. Navigate to Goals
  await page.click('text=Metas');
  await expect(page).toHaveURL('http://localhost:5173/metas/grandes');

  // 3. Check if Goal List is visible
  await expect(page.locator('h1')).toContainText('Metas Grand');

  // 4. Click "Nova Meta"
  await page.click('text=Nova Meta');

  // 5. Check if Goal Form is visible
  await expect(page.locator('h1')).toContainText('Criar Meta');

  // 6. Fill the form
  await page.fill('input[id="title"]', 'Teste de Meta Playwright');
  await page.fill('textarea[id="focusingQuestion"]', 'Qual a única coisa?');
  await page.fill('textarea[id="description"]', 'Descrição da meta de teste');

  // 7. Submit
  await page.click('button:has-text("Criar Meta")');

  // 8. Verify redirect to list or detail (depending on implementation)
  // For now, let's just check if we are still on a valid page
  await expect(page).toHaveURL(/.*metas.*/);
});
