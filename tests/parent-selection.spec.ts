import { test, expect } from '@playwright/test';

test('Goal Parent Selection (Command Menu)', async ({ page }) => {
  // 1. Login
  await page.goto('http://localhost:5173/login');
  await page.fill('input[id="email"]', 'joao@example.com');
  await page.fill('input[id="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('http://localhost:5173/dashboard');

  // 2. Navigate to Annual Goals
  await page.goto('http://localhost:5173/metas/anual/criar');
  await expect(page.locator('h1')).toContainText('Criar Meta Anual');

  // 3. Click "Selecionar Meta Grande" button
  await page.getByText('Selecionar Meta Grande').click();

  // 4. Verify Modal is Open (check for dialog title)
  await expect(
    page.getByRole('heading', { name: 'Vincular a uma Meta Grande' })
  ).toBeVisible();

  // 5. Select the Grand Goal
  await page
    .getByRole('button', { name: 'Tornar-se referência em React' })
    .click();

  // 6. Verify selection is made (check that the button text now contains the goal title)
  await expect(
    page.locator('button:has-text("Tornar-se referência em React")').first()
  ).toBeVisible();

  console.log('Annual Goal parent selection: SUCCESS');
});
