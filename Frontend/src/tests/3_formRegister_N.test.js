import { test, expect } from '@playwright/test';

test('Não deve cadastrar usuário com apartamento inválido', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.getByRole('button', { name: 'Cadastre-se' }).click();
  await page.getByPlaceholder('Nome completo').fill('Usuário Inválido');
  await page.getByRole('combobox', { name: 'Bloco:' }).selectOption('A');
  await page.getByPlaceholder('Ex: 102').fill('999');
  await page.getByPlaceholder('Seu usuário').fill('userInv');
  await page.getByPlaceholder('********').fill('senhaInvalida123');
  await page.getByRole('button', { name: 'Cadastrar' }).click();
  await expect( page.getByText(/Apartamento inválido/i) ).toBeVisible();
  await expect(page.locator('h2')).not.toHaveText('Sinta-se em casa.');
});


test('Não deve cadastrar usuário já existente', async ({ page }) => {

  let firstCall = true;

  await page.route('**/moradores', async (route) => {
    if (firstCall) {
      firstCall = false;

      // primeiro cadastro OK
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'ok' }),
      });
    } else {
      // segundo cadastro (duplicado)
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Usuário já existente',
        }),
      });
    }
  });

  await page.goto('http://localhost:5173');

  await page.getByRole('button', { name: 'Cadastre-se' }).click();

  const name = 'Sr. Teste';
  const user = 'Tst';

  // primeiro cadastro
  await page.getByPlaceholder('Nome completo').fill(name);
  await page.getByRole('combobox', { name: 'Bloco:' }).selectOption('B');
  await page.getByPlaceholder('Ex: 102').fill('502');
  await page.getByPlaceholder('Seu usuário').fill(user);
  await page.getByPlaceholder('********').fill('1');

  await page.getByRole('button', { name: 'Cadastrar' }).click();
  await expect( page.getByText('Usuário cadastrado com sucesso') ).toBeVisible();

  // segundo cadastro (duplicado)
  await page.getByRole('button', { name: 'Cadastre-se' }).click();
  await page.getByPlaceholder('Nome completo').fill(name);
  await page.getByRole('combobox', { name: 'Bloco:' }).selectOption('B');
  await page.getByPlaceholder('Ex: 102').fill('502');
  await page.getByPlaceholder('Seu usuário').fill(user);
  await page.getByPlaceholder('********').fill('1');
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  // valida erro via UI (toast)
  await expect( page.getByText('Usuário já existente') ).toBeVisible();
});