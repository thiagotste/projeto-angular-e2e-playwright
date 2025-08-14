import { expect, Locator, Page } from '@playwright/test';
import FormBaseCadastroEPerfil from './FormBaseCadastroEPerfil';
import { Perfil } from 'e2e/operacoes/gerarPerfils';
import { formatarDataParaForm } from 'e2e/operacoes/datas';

export class PaginaPerfil {
  private readonly page: Page;
  readonly formBase: FormBaseCadastroEPerfil;
  private readonly linkPerfil: Locator;
  private readonly botaoDeslogar: Locator;
  private readonly botaoLogin: Locator;

  constructor(page: Page) {
    this.formBase = new FormBaseCadastroEPerfil(page);
    this.page = page;
    this.linkPerfil = page.getByTestId('header-link-perfil');
    this.botaoDeslogar = page.getByTestId('form-base-botao-deslogar');
    this.botaoLogin = this.page.getByTestId('botao-login');
  }

  async visitar() {
    await this.page.goto('/');
    await this.linkPerfil.click();
    await expect(this.page).toHaveURL('/auth/perfil');
  }

  async atualizarUsuario(novosDados: Perfil) {
    await this.formBase.preencherForm(novosDados);
    await this.formBase.submeterForm();
  }

  async atualizadoComSucesso() {
    await expect(this.page).toHaveURL('/home');
  }

  async dadosEstaoCorretos({
    nome,
    dataNascimento,
    genero,
    cpf,
    telefone,
    cidade,
    estado,
    email,
  }: Perfil) {
    const dataNascimentoFormatada = formatarDataParaForm(dataNascimento);
    const radioGenero = this.formBase.radioGenero[genero];

    await expect(this.formBase.inputNome).toHaveValue(nome);
    await expect(this.formBase.inputDataNascimento).toHaveValue(
      dataNascimentoFormatada
    );
    await expect(radioGenero).toBeChecked();
    await expect(this.formBase.inputCpf).toHaveValue(cpf);
    await expect(this.formBase.inputTelefone).toHaveValue(telefone);
    await expect(this.formBase.inputCidade).toHaveValue(cidade);
    await expect(this.formBase.inputEstado).toHaveValue(estado);
    await expect(this.formBase.inputEmail).toHaveValue(email);
  }

  async deslogar() {
    await this.botaoDeslogar.click();
  }

  async delogadoComSucesso() {
    await expect(this.page).toHaveURL('/auth/login');
    await expect(this.botaoLogin).toHaveText('Login', { ignoreCase: true });
    await expect(this.linkPerfil).not.toBeVisible();
  }
}
