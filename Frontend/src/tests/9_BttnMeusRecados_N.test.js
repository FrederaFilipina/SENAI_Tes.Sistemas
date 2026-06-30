import { test, expect } from '@playwright/test';

test('Não deve exibir recados no mural quando usuário não possui recados', async ({ page, request }) => {

  const base = Date.now();
  const usuario = `user_${base}`;

  // -----------------------------
  // 1. CRIA USUÁRIO
  // -----------------------------
  const userRes = await request.post('http://localhost:3000/moradores', {
    data: {
      nome: 'Usuário Sem Recado',
      bloco: 'B',
      num_ap: '202',
      usuario,
      senha: '123456'
    }
  });

  expect(userRes.ok()).toBeTruthy();

  const usersRes = await request.get('http://localhost:3000/moradores');
  const users = await usersRes.json();

  const createdUser = users.find(u => u.usuario === usuario);
  expect(createdUser).toBeDefined();

  // ❌ NÃO criar recado para esse usuário

  // -----------------------------
  // 2. LOGIN UI
  // -----------------------------
  await page.goto('http://localhost:5173');

  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByPlaceholder('Seu usuário').fill(usuario);
  await page.getByPlaceholder('********').fill('123456');
  await page.getByRole('button', { name: 'Entre' }).click();

  await expect(page).toHaveURL(/homescreen/);

  // -----------------------------
  // 3. ABRIR MURAL
  // -----------------------------
  await page.getByRole('button', { name: /meus recados/i }).click();

  await expect(
    page.getByRole('heading', { name: 'Recados Ativos:' })
  ).toBeVisible();

  // -----------------------------
  // 4. ASSERT NEGATIVA
  // -----------------------------
  const recado = page.locator('text=Conteúdo do recado E2E');

  await expect(recado).toHaveCount(0);
});