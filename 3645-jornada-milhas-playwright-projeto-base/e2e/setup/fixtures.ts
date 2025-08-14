import { test as base } from '@playwright/test';
import PaginaLogin from '../page-objects/PaginaLogin';
import PaginaPrincipal from 'e2e/page-objects/PaginaPrincipal';
import PaginaCadastro from 'e2e/page-objects/PaginaCadastro';
import { PaginaPerfil } from 'e2e/page-objects/PaginaPerfil';

export const test = base.extend<{
  paginaLogin: PaginaLogin;
  paginaPrincipal: PaginaPrincipal;
  paginaCadastro: PaginaCadastro;
  paginaPerfil: PaginaPerfil;
}>({
  paginaLogin: async ({ page }, use) => {
    const paginaLogin = new PaginaLogin(page);
    await use(paginaLogin);
  },

  paginaPrincipal: async ({ page }, use) => {
    const paginaPrincipal = new PaginaPrincipal(page);
    await use(paginaPrincipal);
  },

  paginaCadastro: async ({ page }, use) => {
    const paginaCadastro = new PaginaCadastro(page);
    await use(paginaCadastro);
  },

  paginaPerfil: async ({ page }, use) => {
    const paginaPerfil = new PaginaPerfil(page);
    await use(paginaPerfil);
  },
});
