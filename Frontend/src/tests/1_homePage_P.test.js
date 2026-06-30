import { test, expect } from '@playwright/test';


test('Deve iniciar na tela Home', async ({ page }) => {
    await page.goto('http://localhost:5173/'); // ajuste a URL conforme seu ambiente

    // Verifica se o título inicial está correto
    await expect(page.locator('h2')).toHaveText('Sinta-se em casa.');

    // Verifica se os botões "Entrar" e "Cadastre-se" estão visíveis
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cadastre-se' })).toBeVisible();
});

test('Deve navegar para tela Login', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.getByRole('button', { name: 'Entrar' }).click();

    // Verifica se o título mudou para a tela de login
    await expect(page.locator('h2')).toHaveText('e lembre-se de limpar os calçados!');

    // Verifica se o formulário de login está renderizado
    await expect(page.locator('form')).toBeVisible();
});

test('Deve navegar para tela Register', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.getByRole('button', { name: 'Cadastre-se' }).click();

    // Verifica se o título mudou para a tela de registro
    await expect(page.locator('h2')).toHaveText('É muito bom ter você aqui!');

    // Verifica se o formulário de registro está renderizado
    await expect(page.locator('form')).toBeVisible();
});

test('Deve voltar para Home a partir de Login', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.getByRole('button', { name: 'Entrar' }).click();

    // Clica no botão Voltar dentro do FormLogin
    await page.getByRole('button', { name: 'Voltar' }).click();

    await expect(page.locator('h2')).toHaveText('Sinta-se em casa.');
});

test('Deve voltar para Home a partir de Register', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.getByRole('button', { name: 'Cadastre-se' }).click();

    // Clica no botão Voltar dentro do FormRegister
    await page.getByRole('button', { name: 'Voltar' }).click();

    await expect(page.locator('h2')).toHaveText('Sinta-se em casa.');
});

test('Deve ir da tela Login para a tela Register', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Primeiro entra na tela de Login
    await page.getByRole('button', { name: 'Entrar' }).click();
    await expect(page.locator('h2')).toHaveText('e lembre-se de limpar os calçados!');

    // Agora clica no botão "Cadastre-se" dentro do FormLogin
    await page.getByRole('button', { name: 'Cadastre-se' }).click();

    // Verifica se mudou para a tela de Register
    await expect(page.locator('h2')).toHaveText('É muito bom ter você aqui!');
    await expect(page.locator('form')).toBeVisible();
});