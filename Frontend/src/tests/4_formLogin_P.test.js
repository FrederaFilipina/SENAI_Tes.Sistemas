import { test, expect } from '@playwright/test';

test('Deve cadastrar e depois logar com sucesso', async ({ page }) => {

  // MOCK cadastro
  await page.route('**/moradores', async (route) => {
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Usuário cadastrado com sucesso',
      }),
    });
  });

  // MOCK login (sem token, apenas sucesso)
  await page.route('**/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Login realizado com sucesso',
      }),
    });
  });

  await page.goto('http://localhost:5173');

  // --- Cadastro ---
  await page.getByRole('button', { name: 'Cadastre-se' }).click();

  const uniqueUser = `Tst${Date.now()}`;

  await page.getByPlaceholder('Nome completo').fill('Sr. Teste');
  await page.getByRole('combobox', { name: 'Bloco:' }).selectOption('B');
  await page.getByPlaceholder('Ex: 102').fill('502');
  await page.getByPlaceholder('Seu usuário').fill(uniqueUser);
  await page.getByPlaceholder('********').fill('1');
  await page.getByRole('button', { name: 'Cadastrar' }).click();
  await expect( page.getByText('Usuário cadastrado com sucesso') ).toBeVisible();

  // --- Login ---
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByPlaceholder('Seu usuário').fill(uniqueUser);
  await page.getByPlaceholder('********').fill('1');
  await page.getByRole('button', { name: 'Entre' }).click();

  // validação de navegação
  await expect(page).toHaveURL(/\/homescreen/);
  await expect( page.getByText('Mural Condômino') ).toBeVisible(); });