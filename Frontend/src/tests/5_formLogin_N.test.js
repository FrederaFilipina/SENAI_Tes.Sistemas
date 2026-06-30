import { test, expect } from '@playwright/test';

test('Não deve logar com credenciais inválidas (mock)', async ({ page }) => {

  // MOCK correto e amplo
  await page.route('**/*login*', async (route) => {
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Usuário ou senha inválidos',
      }),
    });
  });

  await page.goto('http://localhost:5173');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByPlaceholder('Seu usuário').fill('usuarioInvalido');
  await page.getByPlaceholder('********').fill('senhaErrada');
  await page.getByRole('button', { name: 'Entre' }).click();
  await expect(page).not.toHaveURL(/\/homescreen/);
  await expect( page.locator('.Toastify__toast', { hasText: 'Usuário ou senha inválidos', }) ).toBeVisible();
});