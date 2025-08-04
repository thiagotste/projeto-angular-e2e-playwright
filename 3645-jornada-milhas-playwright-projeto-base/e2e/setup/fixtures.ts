import { test as base } from '@playwright/test';
import PaginaLogin from '../page-objects/PaginaLogin';
import PaginaPrincipal from 'e2e/page-objects/PaginaPrincipal';
import PaginaCadastro from 'e2e/page-objects/PaginaCadastro';

export const test = base.extend<{
  paginaLogin: PaginaLogin;
  paginaPrincipal: PaginaPrincipal;
  paginaCadastro: PaginaCadastro;
}>({
  paginaLogin: async ({ page }, use) => {
    const paginaLogin = new PaginaLogin(page);
    await paginaLogin.visitar();
    await use(paginaLogin);
  },

  paginaPrincipal: async ({ page }, use) => {
    const paginaPrincipal = new PaginaPrincipal(page);
    await paginaPrincipal.visitar();
    await use(paginaPrincipal);
  },

  paginaCadastro: async ({ page }, use) => {
    const paginaCadastro = new PaginaCadastro(page);
    await paginaCadastro.visitar();
    await use(paginaCadastro);
  },
});
