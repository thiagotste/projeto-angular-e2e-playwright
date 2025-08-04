import test, { expect } from '@playwright/test';

test.describe('Página inicial', () => {
  test('deve visitar a página inicial', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Jornada Milhas');

    // const tituloPassagens = page.getByRole('heading', { name: 'Passagens' });

    const tituloPassagens = page.getByTestId('titulo-passagens');
    await expect(tituloPassagens).toBeVisible();

    const tituloPromocoes = page.getByTestId('titulo-promocoes');
    await expect(tituloPromocoes).toBeVisible();

    const tituloDepoimentos = page.getByTestId('titulo-depoimentos');
    await expect(tituloDepoimentos).toBeVisible();
  });
});
