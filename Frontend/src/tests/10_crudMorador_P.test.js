import { test, expect } from '@playwright/test';

test('BttnUsuario - fluxo estável sem dependência de POST id', async ({ page, request }) => {

    const base = Date.now();
    const usuarioInicial = `user_${base}`;
    const usuarioEditado = `user_${base + 1}`;

    // -----------------------------
    // 1. CREATE usuário
    // -----------------------------
    await request.post('http://localhost:3000/moradores', {
        data: {
            nome: 'Teste E2E',
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

    // anchor real da tela (substitui panel)
    await expect(page.getByText(/gerencia suas informações cadastradas/i)).toBeVisible();

    // -----------------------------
    // 4. PEGAR ID (SEM PANEL)
    // -----------------------------
    const idText = await page.locator('text=/#[0-9]+/').textContent();
    const id = idText?.replace('#', '').trim();

    expect(id).toBeTruthy();

    // -----------------------------
    // 5. EDITAR
    // -----------------------------
    await page.getByRole('button', { name: /alterar informações/i }).click();

    const novoNome = 'Nome Alterado E2E';

    await page.getByLabel('Nome Completo:').fill(novoNome);
    await page.getByLabel('Usuário:').fill(usuarioEditado);
    await page.getByLabel('Bloco:').selectOption('B');
    await page.getByLabel('Apartamento:').fill('202');

    await page.getByRole('button', { name: /salvar alterações/i }).click();

    // -----------------------------
    // 6. ASSERT UI
    // -----------------------------
    await expect(page.getByText(novoNome)).toBeVisible();
    await expect(page.getByText(usuarioEditado)).toBeVisible();

    // -----------------------------
    // 7. ASSERT BACKEND
    // -----------------------------
    const updated = await request.get(`http://localhost:3000/moradores/${id}`);
    const data = await updated.json();

    expect(data.nome).toBe(novoNome);
    expect(data.usuario).toBe(usuarioEditado);
    expect(data.bloco).toBe('B');
    expect(data.num_ap).toBe('202');

    // -----------------------------
    // 8. DELETAR USUÁRIO
    // -----------------------------

    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toContain(
            'Tem certeza que deseja excluir sua conta?'
        );

        await dialog.accept();
    });

    await page.getByRole('button', { name: /excluir usuário/i }).click();

    await page.waitForLoadState('networkidle');


    // -----------------------------
    // 9. ASSERT BACKEND DELETE
    // -----------------------------

    const deleted = await request.get(
        `http://localhost:3000/moradores/${id}`
    );

    expect(deleted.status()).toBe(404);
});