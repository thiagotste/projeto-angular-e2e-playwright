import { expect, Locator, Page } from '@playwright/test';



export default class PaginaLogin {
  private readonly page: Page;
  private readonly botaoLogin: Locator;
  private readonly inputEmail: Locator;
  private readonly inputSenha: Locator;
  private readonly botaoAcessarConta: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botaoLogin = this.page.getByTestId('botao-login');
    this.inputEmail = this.page.getByTestId('input-email');
    this.inputSenha = this.page.getByTestId('input-senha');
    this.botaoAcessarConta = this.page.getByTestId('botao-acessar-conta');
  }

  async visitar() {
    await this.page.goto('/');
    await this.botaoLogin.click();
    await expect(this.page).toHaveURL('/auth/login');
  }

  async fazerLogin(email: string, senha: string) {
    await this.inputEmail.fill(email);
    await this.inputSenha.fill(senha);
    await this.botaoAcessarConta.click();
  }

  async loginFeitoComSucesso() {
    await expect(this.page).toHaveURL('/home');
  }

  async estaMostrandoMensagemDeErro(mensagem: string) {
    const elementoErro = this.page.getByText(mensagem);
    await expect(elementoErro).toBeVisible();
  }

  async mostrarMensagemDeEmailInvalido(
    email: string,
    senha: string,
    mensagem: string
  ) {
    const elEmailInvalido = this.page.getByText(mensagem);
    await this.inputEmail.fill(email);
    await this.inputSenha.fill(senha);
    await expect(elEmailInvalido).toBeVisible();
  }

  async mostrarMensagemDeErroQaundoCampoVazio(
    email: string,
    senha: string,
    mensagem: string
  ) {
    const elCampoVazio = this.page.getByText(mensagem);
    if (senha) {
      await this.inputEmail.fill(email);
      await this.inputSenha.fill(senha);
    } else {
      await this.inputEmail.fill(email);
      await this.inputSenha.fill(senha);
      await this.inputEmail.fill(email);
    }

    await expect(elCampoVazio).toBeVisible();
  }
}
