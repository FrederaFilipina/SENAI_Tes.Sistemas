import { test, expect } from '@playwright/test';

test('CRUD Recado - fluxo completo', async ({ page, request }) => {

    const base = Date.now();
    const usuario = `user_${base}`;
    const recadoOriginal = 'Conteúdo do recado E2E';
    const recadoEditado = 'Conteúdo do recado alterado E2E';

    // -----------------------------
    // CREATE USUÁRIO
    // -----------------------------

    const userRes = await request.post(
        'http://localhost:3000/moradores',
        {
            data: {
                nome: 'Usuário Recado',
                bloco: 'A',
                num_ap: '101',
                usuario,
                senha: '123456'
            }
        }
    );

    expect(userRes.ok()).toBeTruthy();

    const usuarios = await (
        await request.get('http://localhost:3000/moradores')
    ).json();

    const usuarioCriado = usuarios.find(
        u => u.usuario === usuario
    );

    expect(usuarioCriado).toBeDefined();
    const usuarioId = usuarioCriado.id;

    // -----------------------------
    // CREATE RECADO
    // -----------------------------

    const recadoRes = await request.post(
        'http://localhost:3000/recados',
        {
            data: {
                responsavel: usuarioId,
                tipo_recado: 'Aviso',
                recado: recadoOriginal
            }
        }
    );

    expect(recadoRes.ok()).toBeTruthy();

    // -----------------------------
    // LOGIN
    // -----------------------------

    await page.goto('http://localhost:5173');

    await page.getByRole('button', {
        name: 'Entrar'
    }).click();

    await page.getByPlaceholder('Seu usuário')
        .fill(usuario);

    await page.getByPlaceholder('********')
        .fill('123456');

    await page.getByRole('button', {
        name: 'Entre'
    }).click();

    await expect(page)
        .toHaveURL(/homescreen/);

    // -----------------------------
    // ABRIR MEUS RECADOS
    // -----------------------------

    await page.getByRole('button', {
        name: /meus recados/i
    }).click();

    await expect(
        page.getByRole('heading', {
            name: 'Recados Ativos:'
        })
    ).toBeVisible();

    // -----------------------------
    // VALIDAR CREATE
    // -----------------------------

    await expect(
        page.getByText(recadoOriginal)
    ).toBeVisible();

    // -----------------------------
    // EDITAR RECADO
    // -----------------------------

    const card = page
        .getByText(recadoOriginal)
        .locator(
            'xpath=ancestor::*[.//button[contains(., "Editar")]]'
        );

    await card
        .getByRole('button', {
            name: 'Editar'
        })
        .click();

    // pega textarea do CardRecado
    const textareaEdicao = page
        .locator('textarea')
        .nth(1);

    await expect(textareaEdicao)
        .toBeVisible();

    await textareaEdicao
        .fill(recadoEditado);

    // -----------------------------
    // SALVAR UPDATE
    // -----------------------------

    await page
        .getByRole('button', {
            name: 'Salvar'
        })
        .click();

    await expect(
        page.getByText(recadoEditado)
    ).toBeVisible();

    // -----------------------------
    // DELETE RECADO
    // -----------------------------

    const cardEditado = page
        .getByText(recadoEditado)
        .locator(
            'xpath=ancestor::*[.//button[contains(., "Excluir")]]'
        );

    await cardEditado
        .getByRole('button', {
            name: 'Excluir'
        })
        .click();

    // -----------------------------
    // VALIDAR DELETE UI
    // -----------------------------

    await expect(
        page.getByText(recadoEditado)
    ).toHaveCount(0);

    // -----------------------------
    // VALIDAR DELETE BACKEND
    // -----------------------------

    const recados = await (
        await request.get('http://localhost:3000/recados')
    ).json();
    const recadoExiste = recados.find(
        r => r.recado === recadoEditado
    );

    expect(recadoExiste) .toBeUndefined();

});