import { test, expect } from '@playwright/test';

test('Deve criar, exibir e excluir recado no mural', async ({ page, request }) => {

  const base = Date.now();
  const usuario = `user_${base}`;
  const recadoText = 'Conteúdo do recado E2E';

  // -----------------------------
  // 1. CRIA USUÁRIO
  // -----------------------------
  const userRes = await request.post('http://localhost:3000/moradores', {
    data: {
      nome: 'Usuário Recado',
      bloco: 'A',
      num_ap: '101',
      usuario,
      senha: '123456'
    }
  });

  expect(userRes.ok()).toBeTruthy();

  const users = await (await request.get('http://localhost:3000/moradores')).json();
  const createdUser = users.find(u => u.usuario === usuario);

  expect(createdUser).toBeDefined();
  const userId = createdUser.id;

  // -----------------------------
  // 2. CRIA RECADO
  // -----------------------------
  await request.post('http://localhost:3000/recados', {
    data: {
      responsavel: userId,
      tipo_recado: 'Aviso',
      recado: recadoText
    }
  });

  // -----------------------------
  // 3. LOGIN UI
  // -----------------------------
  await page.goto('http://localhost:5173');

  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByPlaceholder('Seu usuário').fill(usuario);
  await page.getByPlaceholder('********').fill('123456');
  await page.getByRole('button', { name: 'Entre' }).click();

  await expect(page).toHaveURL(/homescreen/);

  // -----------------------------
  // 4. ABRIR MURAL
  // -----------------------------
  await page.getByRole('button', { name: /meus recados/i }).click();

  await expect(page.getByRole('heading', { name: 'Recados Ativos:' }))
    .toBeVisible();

  // -----------------------------
  // 5. ASSERT POSITIVO (EXISTE)
  // -----------------------------
  const recado = page.getByText(recadoText);
  await expect(recado).toBeVisible();

  // -----------------------------
  // 6. EXCLUIR RECADO
  // -----------------------------
  await recado
    .locator('xpath=ancestor::*[.//button[contains(., "Excluir")]]')
    .getByRole('button', { name: 'Excluir' })
    .click();

  // -----------------------------
  // 7. ASSERT NEGATIVO (FOI REMOVIDO)
  // -----------------------------
  await expect(page.getByText(recadoText)).toHaveCount(0);
});