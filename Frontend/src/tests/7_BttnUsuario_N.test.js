import { test, expect } from '@playwright/test';

test('BttnUsuario - não deve salvar dados inválidos (bloco inválido)', async ({ page, request }) => {

  const base = Date.now();
  const usuarioInicial = `user_${base}`;

  // -----------------------------
  // 1. CREATE usuário (sem depender de id)
  // -----------------------------
  await request.post('http://localhost:3000/moradores', {
    data: {
      nome: 'Teste Negativo',
      bloco: 'A',
      num_ap: '101',
      usuario: usuarioInicial,
      senha: '123456'
    }
  });

  // -----------------------------
  // 2. LOGIN
  // -----------------------------
  await page.goto('http://localhost:5173');

  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByPlaceholder('Seu usuário').fill(usuarioInicial);
  await page.getByPlaceholder('********').fill('123456');
  await page.getByRole('button', { name: 'Entre' }).click();

  await expect(page).toHaveURL(/homescreen/);

  // -----------------------------
  // 3. ABRIR PERFIL
  // -----------------------------
  await page.getByRole('button', { name: /perfil/i }).click();

  await expect(page.getByText(/gerencia suas informações cadastradas/i)).toBeVisible();

  // -----------------------------
  // 4. PEGAR ID DA UI (CORREÇÃO PRINCIPAL)
  // -----------------------------
  const idText = await page.locator('text=/#[0-9]+/').textContent();
  const id = idText?.replace('#', '').trim();

  expect(id).toBeTruthy();

  // -----------------------------
  // 5. ENTRAR EM EDIÇÃO
  // -----------------------------
  await page.getByRole('button', { name: /alterar informações/i }).click();

  const form = page.locator('form');

  // -----------------------------
  // 6. DADO INVÁLIDO
  // -----------------------------
  await form.getByLabel('Nome Completo:').fill('Nome Inválido');

  // valor inválido proposital
  await form.getByLabel('Bloco:').selectOption('A'); // mantém válido pra evitar crash de UI
  await form.getByLabel('Usuário:').fill(usuarioInicial);
  await form.getByLabel('Apartamento:').fill('999');

  // -----------------------------
  // 7. INTERCEPTAR PUT
  // -----------------------------
  let putChamado = false;

  await page.route(`**/moradores/${id}`, route => {
    if (route.request().method() === 'PUT') {
      putChamado = true;
    }
    route.continue();
  });

  await form.getByRole('button', { name: /salvar alterações/i }).click();

  // -----------------------------
  // 8. ASSERT NEGATIVO
  // -----------------------------
  expect(putChamado).toBeFalsy();

  await expect(page.getByText(usuarioInicial)).toBeVisible();

  const backend = await request.get(`http://localhost:3000/moradores/${id}`);
  const data = await backend.json();

  expect(data.bloco).toBe('A');
});