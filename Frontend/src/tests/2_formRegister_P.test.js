import { test, expect } from '@playwright/test';

test('Deve cadastrar usuário com sucesso usando mock', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // MOCK da requisição de cadastro
  await page.route('**/moradores', async (route) => {
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Usuário cadastrado com sucesso',
        id: 1,
      }),
    });
  });

  await page.getByRole('button', { name: 'Cadastre-se' }).click();

  const uniqueName = `Sr. Teste`;
  const uniqueUser = `Tst`;

  await page.getByPlaceholder('Nome completo').fill(uniqueName);
  await page.getByRole('combobox', { name: 'Bloco:' }).selectOption('B');
  await page.getByPlaceholder('Ex: 102').fill('502');
  await page.getByPlaceholder('Seu usuário').fill(uniqueUser);
  await page.getByPlaceholder('********').fill('1');

  await page.getByRole('button', { name: 'Cadastrar' }).click();

  // validação do toast (vem do mock ou UI)
  await expect(page.getByText('Usuário cadastrado com sucesso')).toBeVisible();

  await expect(page.locator('h2')).toHaveText('Sinta-se em casa.');
});