import { expect, Locator, Page } from '@playwright/test';
import { Perfil } from 'e2e/operacoes/gerarPerfils';
import FormBaseCadastroEPerfil from './FormBaseCadastroEPerfil';

export default class PaginaCadastro {
  private readonly page: Page;
  private readonly botaoVisitarPaginaCadastro: Locator;
  private readonly checkboxTermos: Locator;
  private readonly formBase: FormBaseCadastroEPerfil;

  constructor(page: Page) {
    this.formBase = new FormBaseCadastroEPerfil(page);
    this.page = page;
    this.botaoVisitarPaginaCadastro = page.getByTestId(
      'header-botao-cadastre-se'
    );
    this.checkboxTermos = page
      .getByTestId('form-base-checkbox-termos')
      .getByLabel('Li e aceito os termos e condições deste cadastro');
  }

  async visitar() {
    await this.page.goto('/');
    await this.botaoVisitarPaginaCadastro.click();
    await expect(this.page).toHaveURL('/auth/cadastro');
  }

  async estaMostrandoMensagemDeErro(mensagem: string) {
    const elementoErro = this.page.getByText(mensagem);
    await expect(elementoErro).toBeVisible();
  }

  async confirmarTermoCondicaoCadastro() {
    await this.checkboxTermos.check();
  }

  async cadasdtroFeitoComSucesso() {
    await expect(this.page).toHaveURL('/auth/login');
  }

  async cadastrarUsuario(usuario: Perfil) {
    await this.formBase.preencherForm(usuario);
    await this.confirmarTermoCondicaoCadastro();
    await this.formBase.submeterForm();
  }
}
