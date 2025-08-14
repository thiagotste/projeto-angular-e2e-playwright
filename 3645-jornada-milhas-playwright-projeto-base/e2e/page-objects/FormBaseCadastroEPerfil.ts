import { Locator, Page } from '@playwright/test';
import { Genero, Perfil } from 'e2e/operacoes/gerarPerfils';

export default class FormBaseCadastroEPerfil {
  readonly inputNome: Locator;
  readonly inputDataNascimento: Locator;
  readonly inputCpf: Locator;
  readonly inputCidade: Locator;
  readonly inputTelefone: Locator;
  readonly inputEstado: Locator;
  readonly inputEmail: Locator;
  readonly inputSenha: Locator;
  readonly inputConfirmarEmail: Locator;
  readonly inputConfirmarSenha: Locator;
  readonly radioGenero: { [chave in Genero]: Locator };
  private readonly botaoSubmeterForm: Locator;

  constructor(page: Page) {
    const radioGeneroFeminino = page
      .getByTestId('form-base-radio-genero-feminino')
      .getByLabel('Feminino');

    const radioGeneroMasculino = page
      .getByTestId('form-base-radio-genero-masculino')
      .getByLabel('Masculino');

    const radioGeneroNaoInformado = page
      .getByTestId('form-base-radio-genero-nao-informado')
      .getByLabel('Prefiro não informar');
    this.radioGenero = {
      [Genero.FEMININO]: radioGeneroFeminino,
      [Genero.MASCULINO]: radioGeneroMasculino,
      [Genero.OUTRO]: radioGeneroNaoInformado,
    };

    this.inputNome = page.getByTestId('form-base-input-nome');
    this.inputDataNascimento = page.getByTestId(
      'form-base-input-data-nascimento'
    );

    this.inputCpf = page.getByTestId('form-base-input-cpf');
    this.inputCidade = page.getByTestId('form-base-input-cidade');
    this.inputTelefone = page.getByTestId('form-base-input-telefone');

    this.inputEstado = page
      .getByTestId('form-base-container-estado')
      .getByLabel('Estado');

    this.inputEmail = page.getByTestId('form-base-input-email');
    this.inputSenha = page.getByTestId('form-base-input-senha');
    this.inputConfirmarEmail = page.getByTestId(
      'form-base-input-confirmar-email'
    );
    this.inputConfirmarSenha = page.getByTestId(
      'form-base-input-confirmar-senha'
    );

    this.botaoSubmeterForm = page.getByTestId('form-base-botao-submeter-form');
  }

  async definirNome(nome: string) {
    await this.inputNome.fill(nome);
  }

  async definirDataNascimento(data: Date) {
    const dataFormatada = data.toLocaleString('eng-US', { dateStyle: 'short' });
    await this.inputDataNascimento.fill(dataFormatada);
  }

  async definitGenero(genero: Genero) {
    const radioGenero = this.radioGenero[genero];
    await radioGenero.check();
  }

  async definirCpf(cpf: string) {
    await this.inputCpf.fill(cpf);
  }

  async definirCidade(cidade: string) {
    await this.inputCidade.fill(cidade);
  }

  async definirTelefone(telefone: string) {
    await this.inputTelefone.fill(telefone);
  }

  async definirEstado(estado: string) {
    await this.inputEstado.fill(estado);
  }

  async definirEmail(email: string) {
    await this.inputEmail.fill(email);
  }

  async definirSenha(senha: string) {
    await this.inputSenha.fill(senha);
  }

  async confirmarEmail(email: string) {
    await this.inputConfirmarEmail.fill(email);
  }

  async confirmarSenha(senha: string) {
    await this.inputConfirmarSenha.fill(senha);
  }

  async submeterForm() {
    this.botaoSubmeterForm.click();
  }

  async preencherForm(dados: Perfil) {
    await this.definirNome(dados.nome);
    await this.definirDataNascimento(new Date());
    await this.definitGenero(dados.genero);
    await this.definirCpf(dados.cpf);
    await this.definirCidade(dados.cidade);
    await this.definirTelefone(dados.telefone);
    await this.definirEstado(dados.estado);
    await this.definirEmail(dados.email);
    await this.confirmarEmail(dados.email);
    await this.definirSenha(dados.senha);
    await this.confirmarSenha(dados.senha);
  }

  async obterValorInputEmail() {
    return this.inputEmail.inputValue();
  }
}
